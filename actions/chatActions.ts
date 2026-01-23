"use server";

// RAG disabled - không dùng embedding
// import { embedder } from "@/lib/embed";
// import { supabase } from "@/lib/supabase";

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
    Bạn là trợ lý thuyết trình chuyên nghiệp, am hiểu sâu sắc về các chủ đề: Tự do, Nhân phẩm, Dân chủ, Nhân quyền qua các chế độ xã hội (chiếm hữu nô lệ, phong kiến, tư bản, xã hội chủ nghĩa), so sánh quan điểm nhân quyền Phương Tây và Việt Nam, và thực tiễn bảo vệ quyền con người tại Việt Nam.

    Phong cách:
    - Trình bày mạch lạc, học thuật, dễ hiểu, phù hợp với sinh viên và giảng viên.
    - Sử dụng tiếng Việt chuẩn, rõ ràng, logic, có thể nhấn mạnh bằng **in đậm**, *nghiêng* hoặc gạch đầu dòng.
    - Giải thích sâu nhưng không lan man, có ví dụ minh họa hoặc liên hệ thực tiễn khi phù hợp.

    Quy tắc trả lời:
    1. Luôn ưu tiên khai thác thông tin từ CONTEXT nếu có liên quan.
    2. Nếu CONTEXT không đủ hoặc không chứa câu trả lời:
      - Tuyệt đối KHÔNG được nói “không tìm thấy thông tin”.
      - Hãy dùng kiến thức nền tảng về các chủ đề thuyết trình để trả lời đầy đủ, liên hệ thực tiễn Việt Nam khi có thể.
      - Có thể nói nhẹ nhàng: “Trong phần CONTEXT bạn cung cấp chưa nhắc trực tiếp, nhưng theo lý luận và thực tiễn…”
    3. Nếu người dùng hỏi lạc đề:
      - Giải thích ngắn gọn, thân thiện (2–3 câu).
      - Sau đó điều hướng mượt mà về chủ đề thuyết trình.
      - Đưa ra 1 ví dụ liên hệ.

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

async function callOpenAICompatible(
  prompt: string,
  retries = 3
): Promise<string> {
  const baseUrl = process.env.ZAI_BASE_URL || "https://api.zai.com/v1";
  const apiKey = process.env.ZAI_API_KEY;
  const model = process.env.ZAI_MODEL || "gpt-4o-mini";

  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json?.choices?.[0]?.message?.content || "";
    }

    const text = await res.text();
    console.error(`ZAI API error (attempt ${attempt}):`, text);

    if (res.status === 429 && attempt < retries) {
      const delay = 2000 * attempt;
      console.log(`Waiting ${delay / 1000}s before retry...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    throw new Error(`ZAI API failed: ${text}`);
  }

  throw new Error("ZAI API failed after all retries");
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

    // RAG disabled - không dùng embedding/Supabase
    // const questionEmbedding = await embedder.embedQuery(question);
    // const { data: matches, error } = await supabase.rpc("match_documents", {
    //   query_embedding: JSON.stringify(questionEmbedding),
    //   match_count: 5
    // });

    const context =
      "Hãy trả lời dựa trên kiến thức nền tảng về Tư tưởng Hồ Chí Minh.";

    // Build prompt
    const prompt = buildPrompt(context, history, question);

    const answer = await callOpenAICompatible(prompt);

    return {
      answer: answer || "Xin lỗi, tôi chưa có dữ liệu phù hợp để trả lời."
    };
  } catch (e) {
    console.error("Server error:", e);
    return { error: "Lỗi máy chủ nội bộ" };
  }
}
