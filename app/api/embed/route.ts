/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";
import { embedder } from "@/lib/embed";
import { chunkText } from "@/utils/chunkText";

export const runtime = "nodejs";
const BATCH_SIZE = 10;

export async function POST() {
  try {
    const pdfPath = path.join(process.cwd(), "data", "data-hcm.pdf");

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: "Không tìm thấy file PDF" },
        { status: 404 }
      );
    }

    // Dynamic import to avoid initialization issues with pdf-parse
    const pdf = (await import("pdf-parse")).default;
    const buffer = fs.readFileSync(pdfPath);
    const pdfData = await pdf(buffer);
    const content = pdfData.text?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "Không thể đọc nội dung PDF" },
        { status: 400 }
      );
    }

    // Chunk nội dung
    const chunks = chunkText(content, 1000, 200);
    console.log(`File có ${chunks.length} đoạn.`);

    const rows: {
      content: string;
      metadata: Record<string, any>;
      embedding: number[];
    }[] = [];

    // Embed từng batch để tránh timeout
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const batchEmbeddings = await embedder.embedDocuments(batch);

      batch.forEach((chunk, idx) => {
        rows.push({
          content: chunk,
          metadata: {
            fileName: path.basename(pdfPath),
            pageCount: pdfData.numpages || undefined,
            uploadedAt: new Date().toISOString(),
            chunkIndex: i + idx,
          },
          embedding: batchEmbeddings[idx],
        });
      });
    }

    // Lưu vào Supabase
    const { error } = await supabase.from("documents").insert(rows);
    if (error) throw error;

    console.log(`Upload thành công ${rows.length} chunks`);
    return NextResponse.json({ success: true, chunks: rows.length });
  } catch (err: any) {
    console.error("Lỗi xử lý PDF:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
