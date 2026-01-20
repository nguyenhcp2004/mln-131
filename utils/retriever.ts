import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from "@/lib/supabase";
import { embedder } from "@/lib/embed";

export async function getRetriever() {
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(embedder, {
    client: supabase,
    tableName: "documents",
    // Hàm SQL đã tạo trong Supabase
    queryName: "match_documents",
  });

  // Trả về retriever top 5 document
  return vectorStore.asRetriever(8);
}
