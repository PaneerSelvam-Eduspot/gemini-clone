// To run this code you need to install the following dependencies:
// npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBVjLIR0gPatYrgNjrvfLpjb1mI1d6PXBQ");

async function main(prompt) {
  const promptStr = String(prompt || '').trim();

  if (!promptStr) {
    throw new Error("Prompt cannot be empty!");
  }

  // For text-only input, use the gemini-1.5-flash model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(promptStr);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default main;
