export enum CharacterId {
  NONE = 'none',
  VELTI = 'velti', // Velti (Absolute Loyalty)
  KNIGHT = 'knight', // Camilla/Shalltear archetype (Pride -> Broken)
  SYSTEM = 'system'
}

export enum BackgroundId {
  THRONE = 'throne_room',
  DUNGEON = 'dungeon_room', // New for Knight route
  
  // Velti CGs
  CG_VELTI_KNEEL = 'cg_velti_kneel',
  CG_VELTI_BJ = 'cg_velti_bj',
  CG_VELTI_COWGIRL = 'cg_velti_cowgirl',
  CG_VELTI_SQUIRT = 'cg_velti_squirt',

  // Knight CGs
  CG_KNIGHT_BOUND = 'cg_knight_bound',
  CG_KNIGHT_HUMILIATION = 'cg_knight_humiliation',
  CG_KNIGHT_ORAL = 'cg_knight_oral',
  CG_KNIGHT_BDSM = 'cg_knight_bdsm',
  CG_KNIGHT_COWGIRL = 'cg_knight_cowgirl',
  CG_KNIGHT_SQUIRT = 'cg_knight_squirt'
}

export interface ScriptNode {
  id: string;
  characterId: CharacterId;
  text: string; 
  backgroundId?: BackgroundId; 
  characterExpression?: string; // e.g., 'normal', 'angry', 'shame', 'ahegao'
  choices?: Choice[];
  nextId?: string;
  music?: string;
  voice?: string; 
  sfx?: string; 
  isAiMode?: boolean; 
  showCg?: string; 
}

export interface Choice {
  text: string;
  nextId: string;
  requiredFlag?: string; 
}

export interface GameState {
  currentSceneId: string;
  history: string[]; 
  flags: Record<string, boolean>; 
  isAiChatActive: boolean;
  aiChatHistory: { role: 'user' | 'model'; parts: string }[];
}

export interface SaveSlot {
  id: number;
  date: string;
  nodeId: string;
  previewText: string;
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  color: string;
  avatar: string; 
  expressions?: Record<string, string>; // Map expression names to image URLs
  systemInstruction?: string; 
}