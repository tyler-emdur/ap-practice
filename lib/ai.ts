import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is required");
}

export const ai = new GoogleGenAI({ apiKey });

export const MODEL = "gemini-2.5-flash";

export async function generateText(prompt: string, maxTokens = 4000): Promise<string> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { maxOutputTokens: maxTokens },
  });
  return response.text ?? "";
}
