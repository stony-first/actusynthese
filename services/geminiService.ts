import { GoogleGenAI } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";
import { Source, SummaryResult } from "../types";

export const generateSummary = async (topic: string): Promise<SummaryResult> => {
  if (!process.env.API_KEY) {
    throw new Error("Clé API manquante. Veuillez vérifier la configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Fais une recherche et une synthèse journalistique sur le sujet suivant : ${topic}` }
          ]
        }
      ]
    });

    const text = response.text;
    if (!text) {
      throw new Error("Aucune réponse générée par le modèle.");
    }

    // Extract sources from grounding metadata
    const sources: Source[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Source Web",
            uri: chunk.web.uri
          });
        }
      });
    }

    return { 
      text: text.trim(), 
      sources 
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Une erreur est survenue lors de la recherche et de la génération.");
  }
};
