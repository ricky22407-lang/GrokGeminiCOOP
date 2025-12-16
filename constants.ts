import { BackgroundId, CharacterConfig, CharacterId, ScriptNode } from './types';

// Character Definitions
export const CHARACTERS: Record<CharacterId, CharacterConfig> = {
  [CharacterId.NONE]: {
    id: CharacterId.NONE,
    name: '',
    color: '#ffffff',
    avatar: '',
  },
  [CharacterId.SYSTEM]: {
    id: CharacterId.SYSTEM,
    name: 'System',
    color: '#a0aec0',
    avatar: '',
  },
  [CharacterId.ELARA]: {
    id: CharacterId.ELARA,
    name: 'Elara',
    color: '#fb7185', // Rose-400
    avatar: 'https://picsum.photos/seed/elara/300/600',
    systemInstruction: "You are Elara, a tsundere high school student. You are secretly in love with the protagonist but act cold. You like spicy food and hate rain.",
  },
  [CharacterId.KAITO]: {
    id: CharacterId.KAITO,
    name: 'Kaito',
    color: '#60a5fa', // Blue-400
    avatar: 'https://picsum.photos/seed/kaito/300/600',
    systemInstruction: "You are Kaito, the protagonist's best friend. You are energetic and a bit of a troublemaker.",
  },
};

// Background Assets
export const BACKGROUNDS: Record<BackgroundId, string> = {
  [BackgroundId.CLASSROOM]: 'https://picsum.photos/seed/classroom/1920/1080',
  [BackgroundId.ROOFTOP]: 'https://picsum.photos/seed/rooftop/1920/1080',
  [BackgroundId.PARK]: 'https://picsum.photos/seed/park/1920/1080',
  [BackgroundId.BEDROOM]: 'https://picsum.photos/seed/bedroom/1920/1080',
};

// Script Content
export const INITIAL_SCRIPT: Record<string, ScriptNode> = {
  'start': {
    id: 'start',
    characterId: CharacterId.NONE,
    text: "The afternoon sun filters through the classroom windows. Another day is ending.",
    backgroundId: BackgroundId.CLASSROOM,
    nextId: 'meet_elara_1'
  },
  'meet_elara_1': {
    id: 'meet_elara_1',
    characterId: CharacterId.ELARA,
    text: "H-Hey! Don't just sit there spacing out. The bell rang five minutes ago.",
    characterExpression: 'angry',
    nextId: 'meet_elara_2'
  },
  'meet_elara_2': {
    id: 'meet_elara_2',
    characterId: CharacterId.NONE,
    text: "Elara stands over my desk, hands on her hips. She looks impatient as usual.",
    nextId: 'choice_1'
  },
  'choice_1': {
    id: 'choice_1',
    characterId: CharacterId.ELARA,
    text: "Are you listening to me? I said we have cleaning duty today!",
    choices: [
      { text: "Sorry, I was lost in thought.", nextId: 'path_apology' },
      { text: "Why are you always so loud?", nextId: 'path_argument' },
      { text: "[Enter AI Free Chat]", nextId: 'ai_mode_entry' }
    ]
  },
  'path_apology': {
    id: 'path_apology',
    characterId: CharacterId.ELARA,
    text: "Hmph. At least you admit it. Just grab a broom already.",
    characterExpression: 'blush',
    nextId: 'cleanup_scene'
  },
  'path_argument': {
    id: 'path_argument',
    characterId: CharacterId.ELARA,
    text: "L-Loud?! I'm only loud because you're so dense!",
    characterExpression: 'angry',
    nextId: 'cleanup_scene'
  },
  'cleanup_scene': {
    id: 'cleanup_scene',
    characterId: CharacterId.NONE,
    text: "We spent the next twenty minutes cleaning the chalkboard and arranging desks.",
    nextId: 'end_demo'
  },
  'ai_mode_entry': {
    id: 'ai_mode_entry',
    characterId: CharacterId.SYSTEM,
    text: "Entering AI Chat Mode. You can now talk freely with Elara.",
    isAiMode: true,
    nextId: 'end_demo' // Fallback
  },
  'end_demo': {
    id: 'end_demo',
    characterId: CharacterId.NONE,
    text: "End of Engineering Demo.",
    backgroundId: BackgroundId.BEDROOM
  }
};