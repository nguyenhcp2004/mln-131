import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embedder = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});
