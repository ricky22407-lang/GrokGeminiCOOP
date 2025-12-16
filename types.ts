export enum CharacterId {
  NONE = 'none',
  ELARA = 'elara',
  KAITO = 'kaito',
  SYSTEM = 'system'
}

export enum BackgroundId {
  CLASSROOM = 'classroom',
  ROOFTOP = 'rooftop',
  PARK = 'park',
  BEDROOM = 'bedroom'
}

export interface ScriptNode {
  id: string;
  characterId: CharacterId;
  text: string; // The dialogue text
  backgroundId?: BackgroundId; // If set, changes background
  characterExpression?: string; // e.g., 'smile', 'angry', 'blush'
  choices?: Choice[];
  nextId?: string; // Linear progression ID
  music?: string;
  isAiMode?: boolean; // If true, triggers AI generation context
}

export interface Choice {
  text: string;
  nextId: string;
  requiredFlag?: string; // Advanced: conditional choices
}

export interface GameState {
  currentSceneId: string;
  history: string[]; // Array of scene IDs visited
  flags: Record<string, boolean>; // Game variables
  isAiChatActive: boolean;
  aiChatHistory: { role: 'user' | 'model'; parts: string }[];
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  color: string; // Text color
  avatar: string; // Base URL for avatar
  systemInstruction?: string; // For Gemini Persona
}