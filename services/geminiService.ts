import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, API keys should be proxied via backend. 
// For this client-side demo, we rely on the injected process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnswer = async (query: string, systemInstruction: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please check your network or API key.";
  }
};