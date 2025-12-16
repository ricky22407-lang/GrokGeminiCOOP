import { BackgroundId, CharacterConfig, CharacterId, ScriptNode } from './types';

// AUDIO ASSETS (Remote Hotlinks / Placeholders)
const AUDIO = {
  bgm_throne: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg', 
  bgm_dungeon: 'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a', 
  sfx_wet: 'https://freesound.org/data/previews/365/365659_6687986-lq.mp3', 
  sfx_slap: 'https://freesound.org/data/previews/608/608643_11082522-lq.mp3', 
  sfx_whip: 'https://freesound.org/data/previews/446/446116_7484183-lq.mp3', 
  sfx_gush: 'https://freesound.org/data/previews/398/398188_7563820-lq.mp3', 
  sfx_swallow: 'https://freesound.org/data/previews/173/173930_3219662-lq.mp3', 
  voice_velti_moan: 'https://freesound.org/data/previews/406/406085_7159781-lq.mp3', 
  voice_knight_scream: 'https://freesound.org/data/previews/167/167107_2437358-lq.mp3', 
};

// Character Definitions with STABLE CATBOX HOTLINKS
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
    color: '#e2e8f0', 
    avatar: 'https://files.catbox.moe/1q2w3e.jpg', // Explicit Stand
    expressions: {
      'normal': 'https://files.catbox.moe/1q2w3e.jpg',
      'kneel': 'https://files.catbox.moe/4t5y6u.jpg', // Using BJ as kneel/wet placeholder if needed
      'ahegao': 'https://files.catbox.moe/0a1s2d.jpg' // Squirt face
    },
    systemInstruction: "你是薇爾緹，絕對忠誠於王座的守護者...",
  },
  [CharacterId.KNIGHT]: {
    id: CharacterId.KNIGHT,
    name: '卡米拉', 
    color: '#ef4444', 
    avatar: 'https://files.catbox.moe/3f4g5h.jpg', // Nude Armor Broken
    expressions: {
      'normal': 'https://files.catbox.moe/3f4g5h.jpg',
      'angry': 'https://files.catbox.moe/3f4g5h.jpg', 
      'shame': 'https://files.catbox.moe/6j7k8l.jpg', 
      'broken': 'https://files.catbox.moe/2p3q4r.jpg' 
    },
    systemInstruction: "你是卡米拉，傲慢的王國騎士...",
  }
};

// Background/CG Assets - STABLE CATBOX HOTLINKS
export const BACKGROUNDS: Record<BackgroundId, string> = {
  [BackgroundId.THRONE]: 'https://files.catbox.moe/5s6t7u.jpg',
  [BackgroundId.DUNGEON]: 'https://i.pinimg.com/originals/4a/5b/6c/4a5b6c7d8e9f0g1h2i3j4k5l6m.jpg', // Keep pinimg as backup dungeon
  
  // Velti Explicit H
  [BackgroundId.CG_VELTI_KNEEL]: 'https://files.catbox.moe/4t5y6u.jpg', // Kneel/BJ Prep
  [BackgroundId.CG_VELTI_BJ]: 'https://files.catbox.moe/4t5y6u.jpg', 
  [BackgroundId.CG_VELTI_COWGIRL]: 'https://files.catbox.moe/7i8o9p.jpg',
  [BackgroundId.CG_VELTI_SQUIRT]: 'https://files.catbox.moe/0a1s2d.jpg',

  // Knight Explicit H
  [BackgroundId.CG_KNIGHT_BOUND]: 'https://files.catbox.moe/3f4g5h.jpg',
  [BackgroundId.CG_KNIGHT_HUMILIATION]: 'https://files.catbox.moe/3f4g5h.jpg',
  [BackgroundId.CG_KNIGHT_ORAL]: 'https://files.catbox.moe/6j7k8l.jpg',
  [BackgroundId.CG_KNIGHT_BDSM]: 'https://files.catbox.moe/9m0n1o.jpg', // Map to cowgirl/bdsm
  [BackgroundId.CG_KNIGHT_COWGIRL]: 'https://files.catbox.moe/9m0n1o.jpg',
  [BackgroundId.CG_KNIGHT_SQUIRT]: 'https://files.catbox.moe/2p3q4r.jpg',
};

// Merged Script with Visual Effects & Explicit Descriptions
export const INITIAL_SCRIPT: Record<string, ScriptNode> = {
  // --- Global Entry ---
  'start': {
    id: 'start',
    characterId: CharacterId.NONE,
    text: "Dominion: Silent Throne\n黑暗的王座之間。空氣中瀰漫著絕對支配的氣息。",
    backgroundId: BackgroundId.THRONE,
    music: AUDIO.bgm_throne,
    visualEffect: 'zoom-slow',
    choices: [
      { text: "【薇爾緹】絕對忠誠路線 (Velti Route)", nextId: 'v_start' },
      { text: "【卡米拉】傲慢騎士路線 (Knight Route)", nextId: 'k_start' }
    ]
  },

  // --- Velti Route ---
  'v_start': {
    id: 'v_start',
    characterId: CharacterId.NONE,
    text: "王座之下，那個身影已經跪候多時。",
    backgroundId: BackgroundId.THRONE,
    nextId: 'v_scene1'
  },
  'v_scene1': {
    id: 'v_scene1',
    characterId: CharacterId.VELTI,
    text: "主人...您終於醒了。屬下薇爾緹，身心都已準備好接受您的裁定。",
    characterExpression: 'kneel',
    voice: AUDIO.voice_velti_moan,
    visualEffect: 'zoom-slow',
    nextId: 'v_scene2'
  },
  'v_scene2': {
    id: 'v_scene2',
    characterId: CharacterId.VELTI,
    text: "請看...這就是我為您準備的身體...已經濕透了...",
    characterExpression: 'kneel',
    backgroundId: BackgroundId.CG_VELTI_KNEEL,
    visualEffect: 'pan-up',
    nextId: 'v_choice'
  },
  'v_choice': {
    id: 'v_choice',
    characterId: CharacterId.NONE,
    text: "她拉開軍裝領口，豐滿的乳房在空氣中顫抖，眼神中充滿了被支配的渴望。",
    choices: [
      { text: "命令：用嘴侍奉 (Oral)", nextId: 'v_oral' },
      { text: "命令：直接插入 (Penetration)", nextId: 'v_cowgirl' }
    ]
  },
  'v_oral': {
    id: 'v_oral',
    characterId: CharacterId.VELTI,
    text: "「唔...嗯...啾...（深喉吞嚥聲）」\n她毫無保留地將整根肉棒吞入喉嚨深處，舌頭瘋狂地纏繞著龜頭。",
    backgroundId: BackgroundId.CG_VELTI_BJ,
    visualEffect: 'zoom-in-hard',
    sfx: AUDIO.sfx_swallow,
    nextId: 'v_cowgirl'
  },
  'v_cowgirl': {
    id: 'v_cowgirl',
    characterId: CharacterId.VELTI,
    text: "「哈啊...！好深...主人的肉棒...頂到子宮了！」\n她主動跨坐上來，瘋狂地套弄著，每一次下落都伴隨著肉體撞擊的啪啪聲。",
    backgroundId: BackgroundId.CG_VELTI_COWGIRL,
    characterExpression: 'ahegao',
    visualEffect: 'shake', 
    sfx: AUDIO.sfx_slap,
    nextId: 'v_climax'
  },
  'v_climax': {
    id: 'v_climax',
    characterId: CharacterId.VELTI,
    text: "「要去了...要壞掉了！請射進來...全部射給薇爾緹！」",
    visualEffect: 'shake',
    sfx: AUDIO.voice_velti_moan,
    nextId: 'v_squirt'
  },
  'v_squirt': {
    id: 'v_squirt',
    characterId: CharacterId.NONE,
    text: "隨著一陣劇烈的痙攣，大量的愛液與潮吹如同噴泉般爆發，混合著濃稠的精液，將王座染得一塌糊塗。",
    backgroundId: BackgroundId.CG_VELTI_SQUIRT,
    visualEffect: 'flash-white',
    sfx: AUDIO.sfx_gush,
    nextId: 'end_save'
  },

  // --- Knight (Camilla) Route ---
  'k_start': {
    id: 'k_start',
    characterId: CharacterId.NONE,
    text: "地牢。曾經高傲的騎士，如今衣不蔽體。",
    backgroundId: BackgroundId.DUNGEON,
    music: AUDIO.bgm_dungeon,
    visualEffect: 'zoom-slow',
    nextId: 'k_scene1'
  },
  'k_scene1': {
    id: 'k_scene1',
    characterId: CharacterId.KNIGHT,
    text: "放開我...！就算你撕碎我的衣服，也別想得到我的靈魂！",
    characterExpression: 'angry',
    voice: AUDIO.voice_knight_scream,
    backgroundId: BackgroundId.CG_KNIGHT_HUMILIATION,
    visualEffect: 'shake',
    nextId: 'k_scene2_choice'
  },
  'k_scene2_choice': {
    id: 'k_scene2_choice',
    characterId: CharacterId.NONE,
    text: "她的裝甲早已破碎，露出大片雪白的肌膚。乳尖因為恐懼和寒冷而硬挺著。",
    choices: [
      { text: "強制口交 (Forced Oral)", nextId: 'k_oral' },
      { text: "BDSM 調教 (Punishment)", nextId: 'k_bdsm' }
    ]
  },
  'k_scene4_oral': {
    id: 'k_oral',
    characterId: CharacterId.NONE,
    text: "「唔...嘔...！」\n你強行按住她的頭，將肉棒捅入她的喉嚨。高傲的騎士發出屈辱的嗚咽聲，眼角泛起淚光。",
    backgroundId: BackgroundId.CG_KNIGHT_ORAL,
    sfx: AUDIO.sfx_swallow,
    visualEffect: 'zoom-in-hard',
    nextId: 'k_bdsm'
  },
  'k_bdsm': {
    id: 'k_bdsm',
    characterId: CharacterId.KNIGHT,
    text: "「呀啊啊！好痛...但是...身體...好熱...！」\n隨著皮鞭落下，她的身體染上淫靡的紅色，痛苦轉化為扭曲的快感。",
    backgroundId: BackgroundId.CG_KNIGHT_BDSM,
    sfx: AUDIO.sfx_whip,
    visualEffect: 'shake',
    nextId: 'k_cowgirl'
  },
  'k_cowgirl': {
    id: 'k_cowgirl',
    characterId: CharacterId.KNIGHT,
    text: "「哈啊...哈啊...我是...主人的母狗...！」\n理智斷裂。她主動跨坐上來，眼神已經完全變成了痴女的形狀，貪婪地索取著快樂。",
    characterExpression: 'broken',
    backgroundId: BackgroundId.CG_KNIGHT_COWGIRL,
    sfx: AUDIO.sfx_slap,
    visualEffect: 'zoom-slow',
    nextId: 'k_squirt'
  },
  'k_squirt': {
    id: 'k_squirt',
    characterId: CharacterId.KNIGHT,
    text: "「壞掉了...腦袋要融化了...！請射滿我的子宮...把騎士的尊嚴全部沖走吧！」\n（噗滋——嘩啦！）",
    backgroundId: BackgroundId.CG_KNIGHT_SQUIRT,
    sfx: AUDIO.sfx_gush,
    visualEffect: 'flash-white',
    nextId: 'end_save'
  },

  // --- Common End ---
  'end_save': {
    id: 'end_save',
    characterId: CharacterId.SYSTEM,
    text: "【路線結束】\n調教完成。王座已獲得新的所有物。",
    backgroundId: BackgroundId.THRONE,
    nextId: 'start'
  }
};