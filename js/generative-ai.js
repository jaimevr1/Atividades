import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

let genAI;

export function initializeGenerativeAI(apiKey) {
  if (!apiKey) {
    throw new Error("API key is required to initialize GoogleGenerativeAI");
  }
  genAI = new GoogleGenerativeAI(apiKey);
}

export async function generateContent(prompt) {
  if (!genAI) {
    throw new Error("Generative AI not initialized. Call initializeGenerativeAI first.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "A imaginação falhou desta vez. Tente novamente!";
  }
}