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
  [CharacterId.VELTI]: {
    id: CharacterId.VELTI,
    name: '薇爾緹',
    color: '#e2e8f0', // Silver/White for Velti
    avatar: 'https://media.craiyon.com/2025-08-06/Oy2EGlciQTOrY0v4YimuOQ.webp', // Albedo Stand placeholder
    systemInstruction: "你是薇爾緹，絕對忠誠於王座的守護者。你說話冷靜、低沉，但對主角有著壓抑不住的狂熱渴求。稱呼主角為「王座」或「大人」。",
  },
};

// Background Assets
export const BACKGROUNDS: Record<BackgroundId, string> = {
  [BackgroundId.THRONE]: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipb-mby1FCjpY43i6y_r0rsvpaou6WILJBVh34zuwIxP6T4wINC8kSu7CrszMll2LVNcN_tYvBRZToCgrVYaW88FkgbeZed4Cx-uSwOCqO68LmW_eYd5WDJUyIcm8jET-mWNerJy8I1S8/s1600/01.jpg',
  [BackgroundId.CG_ALBEDO]: 'https://anteikuanimereviews.com/wp-content/uploads/2022/10/albedo-snuggling-up-to-ainz-overlord.jpeg',
};

// Script Content - Intro Scene
export const INITIAL_SCRIPT: Record<string, ScriptNode> = {
  'start': {
    id: 'start',
    characterId: CharacterId.NONE,
    text: "意識逐漸回歸。背後傳來冰冷堅硬的觸感——是王座。",
    backgroundId: BackgroundId.THRONE,
    nextId: 'intro_1'
  },
  'intro_1': {
    id: 'intro_1',
    characterId: CharacterId.NONE,
    text: "空氣中瀰漫著古老焚香與...某種甜膩的體液氣味。這不是夢，這是我統治的起點。",
    nextId: 'velti_enter'
  },
  'velti_enter': {
    id: 'velti_enter',
    characterId: CharacterId.VELTI,
    text: "王座...您終於甦醒了。",
    characterExpression: 'kneel',
    nextId: 'velti_desc'
  },
  'velti_desc': {
    id: 'velti_desc',
    characterId: CharacterId.NONE,
    text: "銀髮女子單膝跪在階下。緊身軍裝勒出令人窒息的胸部曲線，領口敞開，隨著她急促的呼吸，那抹雪白彷彿在邀請我的視線。",
    nextId: 'choice_awakening'
  },
  'choice_awakening': {
    id: 'choice_awakening',
    characterId: CharacterId.VELTI,
    text: "屬下薇爾緹，已在此守候千年...請下達您的第一個裁定。",
    choices: [
      { text: "冷靜詢問現狀", nextId: 'path_calm' },
      { text: "命令她靠近", nextId: 'path_dominate' },
      { text: "[AI 自由對話模式]", nextId: 'ai_mode_entry' }
    ]
  },
  'path_calm': {
    id: 'path_calm',
    characterId: CharacterId.VELTI,
    text: "是。目前大陸局勢混亂，人類王國腐敗，正是我們介入的最佳時機。",
    nextId: 'intro_end'
  },
  'path_dominate': {
    id: 'path_dominate',
    characterId: CharacterId.VELTI,
    text: "遵命...！",
    // In a real Ren'Py script this would trigger a move transition
    nextId: 'dominate_1'
  },
  'dominate_1': {
    id: 'dominate_1',
    characterId: CharacterId.NONE,
    text: "她膝行向前，臉頰泛紅，眼神中混合著恐懼與極度的渴望。軍裝下的身體在微微顫抖。",
    showCg: 'https://anteikuanimereviews.com/wp-content/uploads/2022/10/albedo-snuggling-up-to-ainz-overlord.jpeg', // Using placeholder CG
    nextId: 'intro_end'
  },
  'intro_end': {
    id: 'intro_end',
    characterId: CharacterId.NONE,
    text: "這就是統治的感覺...世界的膝蓋，終將為我而彎曲。",
    nextId: 'end_demo'
  },
  'ai_mode_entry': {
    id: 'ai_mode_entry',
    characterId: CharacterId.SYSTEM,
    text: "進入 AI 對話模式。現在你可以直接與薇爾緹對話，測試她的忠誠度。",
    isAiMode: true,
    nextId: 'end_demo'
  },
  'end_demo': {
    id: 'end_demo',
    characterId: CharacterId.NONE,
    text: "序章演示結束。",
    backgroundId: BackgroundId.THRONE
  }
};