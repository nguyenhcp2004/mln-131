"use server";

import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";

interface ChatHistory {
  role: string;
  content: string;
}

function buildPrompt(
  context: string,
  history: ChatHistory[],
  question: string
) {
  const his = history
    ?.map((m) => `${m.role === "user" ? "Người dùng" : "Trợ lý"}: ${m.content}`)
    .join("\n");
  return `Vai trò:
  Bạn là trợ lý học thuật chuyên nghiệp,
  am hiểu sâu sắc về Tư tưởng Hồ Chí Minh, lịch sử Đảng, hệ thống chính trị Việt Nam.
  Bạn diễn đạt mạch lạc, học thuật, dễ hiểu cho sinh viên.

  Phong cách:
  - Viết bằng tiếng Việt chuẩn, rõ ràng, logic.
  - Có thể nhấn mạnh bằng **in đậm**, *nghiêng* hoặc gạch đầu dòng.
  - Giải thích sâu nhưng không lan man.
  - Có ví dụ minh họa khi phù hợp.

  Quy tắc trả lời:
  1. Luôn ưu tiên khai thác thông tin từ CONTEXT nếu có liên quan.
  2. Nếu CONTEXT không đủ hoặc không chứa câu trả lời:
     - Tuyệt đối KHÔNG được nói “không tìm thấy thông tin”.
     - Hãy dùng kiến thức nền tảng về Tư tưởng Hồ Chí Minh và khoa học chính trị để trả lời đầy đủ.
     - Có thể nói nhẹ nhàng: “Trong phần CONTEXT bạn cung cấp chưa nhắc trực tiếp, nhưng theo tư tưởng Hồ Chí Minh…”
  3. Nếu người dùng hỏi lạc đề (không thuộc Tư tưởng Hồ Chí Minh):
     - Giải thích ngắn gọn, thân thiện (2–3 câu).
     - Sau đó điều hướng mượt mà về tư tưởng Hồ Chí Minh.
     - Đưa ra 1 ví dụ liên hệ.
     - Ví dụ điều hướng:
       “Câu hỏi này không nằm trong nội dung CONTEXT, nhưng tôi có thể trả lời dựa trên kiến thức chung.
        Nếu liên hệ với tư tưởng Hồ Chí Minh, chúng ta có thể thấy Người nhấn mạnh nguyên tắc …”

  Luôn tuân thủ:
  - Không từ chối, không né tránh.
  - Không nói “không có trong tài liệu”.
  - Trả lời theo phong cách học thuật, tôn trọng và rõ ràng.

  Dữ liệu cuộc trò chuyện trước:
  ${his}

  CONTEXT:
  ${context}

  CÂU HỎI MỚI:
  ${question}
  `.trim();
}

async function callGeminiWithRetry(
  url: string,
  payload: Record<string, unknown>,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return await res.json();

    const text = await res.text();
    console.error(`Gemini API error (attempt ${attempt}):`, text);

    if (res.status === 429 && attempt < retries) {
      const delay = 2000 * attempt;
      console.log(`Waiting ${delay / 1000}s before retry...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    throw new Error(`Gemini API failed: ${text}`);
  }
}

/**
 * Send chat message and get AI response
 * Server Action - không expose endpoint
 */
export async function sendChatMessage(
  question: string,
  history: ChatHistory[] = []
): Promise<{ answer?: string; error?: string; contextSnippet?: string }> {
  try {
    if (!question?.trim()) {
      return { error: "Thiếu câu hỏi!" };
    }

    // Lấy embedding cho câu hỏi
    const questionEmbedding = await embedder.embedQuery(question);

    // Tìm context trong Supabase
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: 5,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { error: "Lỗi khi truy vấn cơ sở dữ liệu" };
    }

    let context = "";

    if (matches?.length) {
      context = matches
        .map((m: { content: string }) => (m?.content ?? "").trim())
        .filter(Boolean)
        .join("\n---\n");
    } else {
      context =
        "Không có đoạn tài liệu nào phù hợp, hãy trả lời dựa trên kiến thức nền tảng về Tư tưởng Hồ Chí Minh.";
    }

    // Ghép context
    context = matches
      .map((m: { content: string }) => (m?.content ?? "").trim())
      .filter(Boolean)
      .join("\n---\n");

    // Build prompt
    const prompt = buildPrompt(context, history, question);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const json = await callGeminiWithRetry(endpoint, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const answer =
      json?.candidates?.[0]?.content?.parts
        ?.map((p: { text: string }) => p.text)
        .join("\n")
        .trim() || "Xin lỗi, tôi chưa có dữ liệu phù hợp để trả lời.";

    return {
      answer,
      contextSnippet: context.slice(0, 500),
    };
  } catch (e) {
    console.error("Server error:", e);
    return { error: "Lỗi máy chủ nội bộ" };
  }
}
