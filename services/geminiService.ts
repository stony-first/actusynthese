import { GoogleGenAI } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";
import { Source, SummaryResult } from "../types";

export async function* streamSummary(topic: string): AsyncGenerator<SummaryResult, void, unknown> {
  if (!process.env.API_KEY) {
    throw new Error("Clé API manquante. Veuillez vérifier la configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const responseStream = await ai.models.generateContentStream({
      model: MODEL_NAME,
      config: {
        tools: [{ googleSearch: {} }],
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

    let fullText = '';
    let sources: Source[] = [];

    for await (const chunk of responseStream) {
      // Accumulate text
      if (chunk.text) {
        fullText += chunk.text;
      }

      // Check for grounding metadata (sources) in this chunk
      const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        groundingChunks.forEach((c: any) => {
          if (c.web) {
            sources.push({
              title: c.web.title || "Source Web",
              uri: c.web.uri
            });
          }
        });
      }

      // Remove duplicates from sources based on URI
      const uniqueSources = sources.filter((s, index, self) =>
        index === self.findIndex((t) => (
          t.uri === s.uri
        ))
      );

      yield {
        text: fullText,
        sources: uniqueSources
      };
    }

  } catch (error: any) {
    console.error("Gemini API Stream Error:", error);
     if (error.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED'))) {
       throw new Error("⚠️ Quota API gratuit dépassé. Veuillez attendre une minute.");
    }
    throw new Error(error.message || "Erreur lors de la génération du flux.");
  }
}

// Keep the non-streaming version just in case, or alias it if needed, 
// but App.tsx will use streamSummary now.
export const generateSummary = async (topic: string): Promise<SummaryResult> => {
  // Fallback implementation if needed, otherwise simplified to just call stream
  const generator = streamSummary(topic);
  let finalResult: SummaryResult = { text: '', sources: [] };
  
  for await (const result of generator) {
    finalResult = result;
  }
  return finalResult;
};