import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ESGEvaluation, UserAnswers } from '../../types';
import { ESG_GENERATE_EVALUATION_PROMPT_TEMPLATE, MODEL_NAME, QUESTIONNAIRE_CONTEXT_FOR_AI } from '../../../constants';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set. Please set it before running the application.");
  // Potentially throw an error or set a flag if running in a context where this is critical at startup
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" }); // Fallback only for local dev if key isn't set via env var injector

export const generateESGEvaluation = async (userAnswers: UserAnswers): Promise<ESGEvaluation> => {
  if (!process.env.API_KEY) { 
     throw new Error("API key is not configured. Please ensure process.env.API_KEY is set.");
  }
  
  const userAnswersJson = JSON.stringify(userAnswers, null, 2);
  
  const prompt = ESG_GENERATE_EVALUATION_PROMPT_TEMPLATE
    .replace("{{QUESTIONNAIRE_CONTEXT}}", QUESTIONNAIRE_CONTEXT_FOR_AI)
    .replace("{{USER_ANSWERS_JSON}}", userAnswersJson);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as Partial<ESGEvaluation>; // Use Partial for initial parsing

      // Validate required fields
      if (typeof parsedData.overallAssessment !== 'string') {
        throw new Error("La clé 'overallAssessment' est manquante ou n'est pas une chaîne de caractères.");
      }
      
      // Validate optional arrays
      if (parsedData.keyStrengths && !Array.isArray(parsedData.keyStrengths)) {
        throw new Error("La clé 'keyStrengths' n'est pas un tableau si présente.");
      }
      if (parsedData.areasForImprovement && !Array.isArray(parsedData.areasForImprovement)) {
        throw new Error("La clé 'areasForImprovement' n'est pas un tableau si présente.");
      }

      // Validate score fields (they can be optional as per the interface with "?")
      const validatedScores: Pick<ESGEvaluation, 'E_score' | 'S_score' | 'G_score' | 'overall_score'> = {};

      const scoreFields: (keyof Pick<ESGEvaluation, 'E_score' | 'S_score' | 'G_score' | 'overall_score'>)[] = ['E_score', 'S_score', 'G_score', 'overall_score'];
      
      for (const field of scoreFields) {
        if (parsedData[field] !== undefined) {
          if (typeof parsedData[field] !== 'number' || isNaN(parsedData[field] as number)) {
            throw new Error(`Le score '${field}' n'est pas un nombre valide.`);
          }
           if ((parsedData[field] as number) < 0 || (parsedData[field] as number) > 100) {
            throw new Error(`Le score '${field}' doit être compris entre 0 et 100.`);
          }
          validatedScores[field] = parsedData[field] as number;
        }
      }

      return {
        overallAssessment: parsedData.overallAssessment,
        keyStrengths: parsedData.keyStrengths,
        areasForImprovement: parsedData.areasForImprovement,
        ...validatedScores
      } as ESGEvaluation;

    } catch (e) {
      console.error("Failed to parse JSON response from API into ESGEvaluation:", e);
      console.error("Raw response text for debugging:", response.text);
      console.error("Prompt sent to API for debugging:", prompt);
      const errorMessage = e instanceof Error ? e.message : "Erreur inconnue lors du parsage.";
      throw new Error(`Le format de la réponse de l'IA n'est pas une évaluation ESG valide. Détail: ${errorMessage}. Réponse brute: ${response.text}`);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
     if (error instanceof Error) {
        throw new Error(`Erreur lors de la communication avec l'API Gemini: ${error.message}`);
    }
    throw new Error("Erreur inconnue lors de la communication avec l'API Gemini.");
  }
};