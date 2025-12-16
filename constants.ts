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
    color: '#e2e8f0', // Silver
    avatar: 'https://media.craiyon.com/2025-08-06/Oy2EGlciQTOrY0v4YimuOQ.webp', // Base Stand
    expressions: {
      'normal': 'https://media.craiyon.com/2025-08-06/Oy2EGlciQTOrY0v4YimuOQ.webp',
      'kneel': 'https://anteikuanimereviews.com/wp-content/uploads/2022/10/albedo-snuggling-up-to-ainz-overlord.jpeg', // Placeholder for visual change
      'ahegao': 'placeholder_velti_ahegao.png'
    },
    systemInstruction: "你是薇爾緹，絕對忠誠於王座的守護者...",
  },
  [CharacterId.KNIGHT]: {
    id: CharacterId.KNIGHT,
    name: '卡米拉', // Knight/Shalltear Archetype
    color: '#ef4444', // Red
    avatar: 'https://i.pinimg.com/736x/8a/9b/0c/8a9b0c1d2e3f4g5h6i7j8k9l0m.jpg', // Placeholder Red Armor
    expressions: {
      'normal': 'placeholder_knight_normal.png',
      'angry': 'placeholder_knight_angry.png',
      'shame': 'placeholder_knight_shame.png',
      'broken': 'placeholder_knight_broken.png'
    },
    systemInstruction: "你是卡米拉，傲慢的王國騎士。你鄙視主角，但身體卻誠實地渴求調教。",
  }
};

// Background/CG Assets
export const BACKGROUNDS: Record<BackgroundId, string> = {
  [BackgroundId.THRONE]: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipb-mby1FCjpY43i6y_r0rsvpaou6WILJBVh34zuwIxP6T4wINC8kSu7CrszMll2LVNcN_tYvBRZToCgrVYaW88FkgbeZed4Cx-uSwOCqO68LmW_eYd5WDJUyIcm8jET-mWNerJy8I1S8/s1600/01.jpg',
  [BackgroundId.DUNGEON]: 'https://i.pinimg.com/originals/4a/5b/6c/4a5b6c7d8e9f0g1h2i3j4k5l6m.jpg', // Dark Dungeon placeholder
  
  // Velti CGs
  [BackgroundId.CG_VELTI_KNEEL]: 'https://anteikuanimereviews.com/wp-content/uploads/2022/10/albedo-snuggling-up-to-ainz-overlord.jpeg',
  [BackgroundId.CG_VELTI_BJ]: 'https://i.pinimg.com/736x/2a/3b/4c/2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7.jpg',
  [BackgroundId.CG_VELTI_COWGIRL]: 'https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6.jpg',
  [BackgroundId.CG_VELTI_SQUIRT]: 'https://i.pinimg.com/736x/9z/8y/7x/9z8y7x6w5v4u3t2s1r0q.jpg',

  // Knight CGs
  [BackgroundId.CG_KNIGHT_BOUND]: 'https://i.pinimg.com/736x/bound_knight_placeholder.jpg',
  [BackgroundId.CG_KNIGHT_HUMILIATION]: 'https://i.pinimg.com/736x/humiliation_placeholder.jpg',
  [BackgroundId.CG_KNIGHT_ORAL]: 'https://i.pinimg.com/736x/knight_oral_placeholder.jpg',
  [BackgroundId.CG_KNIGHT_BDSM]: 'https://i.pinimg.com/736x/knight_bdsm_placeholder.jpg',
  [BackgroundId.CG_KNIGHT_COWGIRL]: 'https://i.pinimg.com/736x/knight_cowgirl_placeholder.jpg',
  [BackgroundId.CG_KNIGHT_SQUIRT]: 'https://i.pinimg.com/736x/knight_squirt_placeholder.jpg',
};

// Merged Script
export const INITIAL_SCRIPT: Record<string, ScriptNode> = {
  // --- Global Entry ---
  'start': {
    id: 'start',
    characterId: CharacterId.NONE,
    text: "Dominion: Silent Throne\n選擇你的征服對象。",
    backgroundId: BackgroundId.THRONE,
    music: 'bgm_throne_dark.mp3',
    choices: [
      { text: "【薇爾緹】絕對忠誠路線", nextId: 'v_start' },
      { text: "【卡米拉】傲慢騎士路線", nextId: 'k_start' }
    ]
  },

  // --- Velti Route (Optimized) ---
  'v_start': {
    id: 'v_start',
    characterId: CharacterId.NONE,
    text: "意識在黑暗中重組。王座冰冷的觸感沿著脊椎傳來。",
    backgroundId: BackgroundId.THRONE,
    nextId: 'v_scene1'
  },
  'v_scene1': {
    id: 'v_scene1',
    characterId: CharacterId.VELTI,
    text: "主人...您終於醒了。屬下薇爾緹，已在此等候千年。",
    characterExpression: 'kneel',
    voice: 'velti_01.wav',
    nextId: 'v_scene2'
  },
  'v_scene2': {
    id: 'v_scene2',
    characterId: CharacterId.VELTI,
    text: "身體的渴望已經到達極限...請允許這卑微的肉體侍奉您。",
    nextId: 'v_choice'
  },
  'v_choice': {
    id: 'v_choice',
    characterId: CharacterId.NONE,
    text: "她抬起頭，銀髮散落在軍裝胸甲上，眼神中混合著敬畏與赤裸的情慾。",
    choices: [
      { text: "撫摸她的臉頰", nextId: 'v_touch' },
      { text: "命令：用嘴侍奉", nextId: 'v_oral' }
    ]
  },
  'v_touch': {
    id: 'v_touch',
    characterId: CharacterId.VELTI,
    text: "啊...主人的手...就是這樣，請更多地玷污我...",
    backgroundId: BackgroundId.CG_VELTI_KNEEL,
    nextId: 'v_cowgirl'
  },
  'v_oral': {
    id: 'v_oral',
    characterId: CharacterId.VELTI,
    text: "遵命！這張嘴就是為了吞嚥您的精華而存在的...啾...唔...",
    backgroundId: BackgroundId.CG_VELTI_BJ,
    sfx: 'wet.mp3',
    nextId: 'v_cowgirl'
  },
  'v_cowgirl': {
    id: 'v_cowgirl',
    characterId: CharacterId.VELTI,
    text: "主人，請允許我...更進一步。我想騎在您身上，感受您填滿我子宮的每一寸。",
    backgroundId: BackgroundId.CG_VELTI_COWGIRL,
    characterExpression: 'ahegao',
    nextId: 'v_climax'
  },
  'v_climax': {
    id: 'v_climax',
    characterId: CharacterId.VELTI,
    text: "要去了...不行...腦袋要融化了...主人...請授與我您的標記！",
    nextId: 'v_squirt'
  },
  'v_squirt': {
    id: 'v_squirt',
    characterId: CharacterId.NONE,
    text: "隨著一陣劇烈的痙攣，大量的愛液與潮吹噴濺而出，混合著精液的氣味瀰漫在王座之間。",
    backgroundId: BackgroundId.CG_VELTI_SQUIRT,
    sfx: 'gush.mp3',
    nextId: 'end_save'
  },

  // --- Knight (Camilla) Route ---
  'k_start': {
    id: 'k_start',
    characterId: CharacterId.NONE,
    text: "地牢。空氣中瀰漫著鐵鏽與血的味道。曾經高傲的王國騎士長，如今正被鎖鏈吊在半空。",
    backgroundId: BackgroundId.DUNGEON,
    music: 'bgm_dungeon.mp3',
    nextId: 'k_scene1'
  },
  'k_scene1': {
    id: 'k_scene1',
    characterId: CharacterId.KNIGHT,
    text: "放開我...！骯髒的魔王...我就算死，也不會屈服於你的淫威！",
    characterExpression: 'angry',
    voice: 'knight_01_resist.wav',
    backgroundId: BackgroundId.CG_KNIGHT_BOUND,
    nextId: 'k_scene2_choice'
  },
  'k_scene2_choice': {
    id: 'k_scene2_choice',
    characterId: CharacterId.NONE,
    text: "她的盔甲已經破碎，露出大片白皙的肌膚。雖然嘴上強硬，但大腿內側已經在微微顫抖。",
    choices: [
      { text: "撕碎她最後的遮羞布", nextId: 'k_humiliation' },
      { text: "嘲笑她的無力", nextId: 'k_humiliation' }
    ]
  },
  'k_scene3_humiliation': {
    id: 'k_humiliation',
    characterId: CharacterId.KNIGHT,
    text: "不...別看那裡...！我是騎士...我不是...你的母狗...",
    characterExpression: 'shame',
    backgroundId: BackgroundId.CG_KNIGHT_HUMILIATION,
    nextId: 'k_scene4_oral'
  },
  'k_scene4_oral': {
    id: 'k_scene4_oral',
    characterId: CharacterId.NONE,
    text: "你強行將肉棒塞入她的口中。高傲的嘴唇被迫包裹住龜頭，喉嚨發出嗚咽聲。",
    backgroundId: BackgroundId.CG_KNIGHT_ORAL,
    sfx: 'gag.mp3',
    nextId: 'k_scene5_bdsm'
  },
  'k_scene5_bdsm': {
    id: 'k_scene5_bdsm',
    characterId: CharacterId.KNIGHT,
    text: "呀啊啊！不要...好痛...但是...身體...好熱...",
    voice: 'knight_moan_pain.wav',
    backgroundId: BackgroundId.CG_KNIGHT_BDSM,
    nextId: 'k_scene5_bdsm_desc'
  },
  'k_scene5_bdsm_desc': {
    id: 'k_scene5_bdsm_desc',
    characterId: CharacterId.NONE,
    text: "隨著皮鞭落下，她的眼神開始渙散。痛苦轉化為了扭曲的快感。",
    backgroundId: BackgroundId.CG_KNIGHT_BDSM,
    nextId: 'k_scene6_cowgirl'
  },
  'k_scene6_cowgirl': {
    id: 'k_scene6_cowgirl',
    characterId: CharacterId.KNIGHT,
    text: "哈啊...哈啊...我是...主人的專屬母狗...請給我...更多...",
    characterExpression: 'broken',
    backgroundId: BackgroundId.CG_KNIGHT_COWGIRL,
    nextId: 'k_scene6_cowgirl_desc'
  },
  'k_scene6_cowgirl_desc': {
    id: 'k_scene6_cowgirl_desc',
    characterId: CharacterId.NONE,
    text: "她主動跨坐在你身上，瘋狂地扭動腰肢，眼神已經完全變成了痴女的形狀。",
    backgroundId: BackgroundId.CG_KNIGHT_COWGIRL,
    nextId: 'k_scene7_squirt'
  },
  'k_scene7_squirt': {
    id: 'k_scene7_squirt',
    characterId: CharacterId.KNIGHT,
    text: "壞掉了...要壞掉了...！請射滿我的子宮...把騎士的尊嚴全部沖走吧！",
    backgroundId: BackgroundId.CG_KNIGHT_SQUIRT,
    sfx: 'squirt.mp3',
    nextId: 'end_save'
  },

  // --- Common End ---
  'end_save': {
    id: 'end_save',
    characterId: CharacterId.SYSTEM,
    text: "【路線結束】\n調教完成。進度已保存。",
    backgroundId: BackgroundId.THRONE,
    nextId: 'start'
  }
};