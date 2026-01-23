// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

// export const embedder = new GoogleGenerativeAIEmbeddings({
//   apiKey: process.env.GOOGLE_API_KEY,
//   model: "text-embedding-004",
// });

// Dùng ZAI (OpenAI-compatible) thay vì Google
class ZAIEmbeddings {
  private baseUrl: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.ZAI_BASE_URL || "https://api.zai.com/v1";
    this.apiKey = process.env.ZAI_API_KEY || "";
    this.model = process.env.ZAI_EMBEDDING_MODEL || "text-embedding-3-small";
  }

  async embedQuery(text: string): Promise<number[]> {
    const res = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        input: text
      })
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`ZAI Embedding API failed: ${error}`);
    }

    const json = await res.json();
    return json?.data?.[0]?.embedding || [];
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const res = await fetch(`${this.baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        input: texts
      })
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`ZAI Embedding API failed: ${error}`);
    }

    const json = await res.json();
    return json?.data?.map((d: { embedding: number[] }) => d.embedding) || [];
  }
}

export const embedder = new ZAIEmbeddings();
