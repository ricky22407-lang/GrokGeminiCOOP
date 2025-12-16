import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CharacterConfig } from "../types";

// Safety check for API Key availability
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const generateCharacterResponse = async (
  character: CharacterConfig,
  history: { role: 'user' | 'model'; parts: string }[],
  userMessage: string
): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "Error: API_KEY not found in environment. Please configure your key.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct the prompt with system instructions
    const systemPrompt = `
      Character Name: ${character.name}
      Character Persona: ${character.systemInstruction || 'A helpful assistant.'}
      
      Current Situation: You are in a Visual Novel game. Interaction should be concise (2-3 sentences max) and fit the persona strictly.
      Do not break character. Do not describe actions in asterisks too much, focus on dialogue.
    `;

    // Convert history to Gemini format (simplified for 2.5 flash context)
    // We are essentially doing a single turn gen with context in the prompt for simplicity here,
    // or we could use the Chat API. Let's use Chat API for statefulness.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.9,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.parts }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    
    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I... I don't know what to say right now. (API Error)";
  }
};