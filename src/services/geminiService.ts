import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateWeeklyDigest(inflationData: any, pulseData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the "Lithuania Pulse" AI Analyst. Aggregated from the Seimas, OSP, Registry Center (RC), and Bank of Lithuania.
      Analyze the following datasets and provide a highly objective, actionable briefing.
      
      INSTRUCTIONS:
      1. Translate jargon into clear English.
      2. Identify correlations between inflation, housing market (Registry Center transactions), and mortgage rates (Bank of Lithuania).
      3. Track real estate heatmaps (BustoRadar) against demographic shifts.
      4. Strip government spin, present numerical reality.
      
      INFLATION DATA: ${JSON.stringify(inflationData)}
      PULSE & REAL ESTATE DATA: ${JSON.stringify(pulseData)}
      
      Output language: English. Format with clear headings and concise bullets.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The analyst is currently pondering the trends. Please try again in a moment.";
  }
}
