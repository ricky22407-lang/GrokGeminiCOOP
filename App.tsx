import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers, Folder, FolderOpen } from 'lucide-react';

// Mock Assets Data for Preview (simulating contents of the assets/ folder)
const ASSET_PREVIEWS = {
  stands: [
    { name: 'velti_stand_01.png', url: 'https://picsum.photos/seed/elara/300/600', size: '1.2MB' },
    { name: 'serena_stand_01.png', url: 'https://picsum.photos/seed/kaito/300/600', size: '1.1MB' },
    { name: 'elia_stand_01.png', url: 'https://picsum.photos/seed/elia/300/600', size: '1.3MB' },
    { name: 'camilla_stand_01.png', url: 'https://picsum.photos/seed/camilla/300/600', size: '1.4MB' },
    { name: 'lys_stand_01.png', url: 'https://picsum.photos/seed/lys/300/600', size: '1.2MB' },
  ],
  cgs: [
    { name: 'cg_velti_h_01.png', url: 'https://picsum.photos/seed/cg1/600/400', size: '2.5MB' },
    { name: 'cg_serena_h_01.png', url: 'https://picsum.photos/seed/cg2/600/400', size: '2.8MB' },
    { name: 'cg_conquest_01.png', url: 'https://picsum.photos/seed/cg3/600/400', size: '3.1MB' },
  ],
  bgs: [
    { name: 'bg_throne_room.jpg', url: 'https://picsum.photos/seed/classroom/600/400', size: '0.8MB' },
    { name: 'bg_bedroom.jpg', url: 'https://picsum.photos/seed/bedroom/600/400', size: '0.9MB' },
    { name: 'bg_dungeon.jpg', url: 'https://picsum.photos/seed/park/600/400', size: '1.0MB' },
  ]
};

const DOCS = {
  // Phase 1 Content (Read Only)
  readme: {
    title: 'README (Phase 4 Prep)',
    icon: <Book />,
    phase: 1,
    type: 'markdown',
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n\n## 當前階段\nPhase 4 - 音效 / 配音期（準備進入）\n\n## 進度\n- [x] Phase 1 企劃期完成\n- [x] Phase 2 文本期完成\n- [x] Phase 3 美術參考收集完成\n- [ ] 實際美術資源製作/上傳`
  },
  phase1_check: {
    title: 'Phase 1 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 1,
    type: 'markdown',
    content: `# Phase 1 檢核表\n\n- [x] 世界觀文檔完成\n- [x] 五女主角詳細設定\n- [x] 故事流程圖\n- [x] 所有內容符合七條鐵律\n\nPhase 1 正式完成。`
  },
  
  // Phase 2 Structure
  phase2_check: {
    title: 'Phase 2 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 2,
    type: 'markdown',
    content: `# Phase 2 檢核表\n\n- [x] 薇爾緹主線腳本完成\n- [x] 塞蕾娜主線腳本完成\n- [x] 艾莉婭主線腳本完成\n- [x] 卡米拉主線腳本完成\n- [x] 莉絲主線腳本完成\n- [x] 支線模板完成\n- [x] 文本符合鐵律（露骨、心理轉變、主角上位）\n\nPhase 2 正式結束。`
  },
  
  // Scripts (Phase 2)
  p2_velti: { title: 'Script: Velti', icon: <FileText />, phase: 2, type: 'markdown', content: `# 薇爾緹 主線腳本... (Loaded)` },
  p2_serena: { title: 'Script: Serena', icon: <FileText />, phase: 2, type: 'markdown', content: `# 塞蕾娜 主線腳本... (Loaded)` },
  p2_elia: { title: 'Script: Elia', icon: <FileText />, phase: 2, type: 'markdown', content: `# 艾莉婭 主線腳本... (Loaded)` },
  p2_camilla: { title: 'Script: Camilla', icon: <FileText />, phase: 2, type: 'markdown', content: `# 卡米拉 主線腳本... (Loaded)` },
  p2_lys: { title: 'Script: Lys', icon: <FileText />, phase: 2, type: 'markdown', content: `# 莉絲 主線腳本... (Loaded)` },
  p2_conquest: { title: 'Branch: Conquest', icon: <GitBranch />, phase: 2, type: 'markdown', content: `# 支線A 外族征戰... (Loaded)` },
  p2_domination: { title: 'Branch: Domination', icon: <GitBranch />, phase: 2, type: 'markdown', content: `# 支線B 心靈統治... (Loaded)` },
  p2_rewrite: { title: 'Branch: Rewrite', icon: <GitBranch />, phase: 2, type: 'markdown', content: `# 支線C 制度重寫... (Loaded)` },

  // Phase 3 Structure
  phase3_check: {
    title: 'Phase 3 Checklist',
    icon: <CheckSquare />,
    phase: 3,
    type: 'markdown',
    content: `# Phase 3 檢核表\n\n- [x] 角色立繪參考收集完成（描述 + URL）\n- [x] CG 參考收集完成（分層 + URL）\n- [x] 場景插畫參考完成\n- [x] 所有參考符合鐵律（成熟、煽情露骨、儀式姿態）\n- [ ] 實際美術資源上傳/整合（立繪、CG、場景）\n- [ ] Live2D 動態測試（可選）`
  },
  p3_velti: { 
    title: 'Art: Velti', 
    icon: <Image />, 
    phase: 3,
    type: 'markdown', 
    content: `# 薇爾緹 立繪參考\n\n狀態1：通常 - 冷豔軍裝，銀長髮，高挑身型，胸臀曲線緊裹，站姿威嚴。\n狀態2：親密 - 軍裝半解，露出鎖骨乳溝，跪姿眼神渴望。\n狀態3：儀式 - 半裸跪張腿，陰唇微濕，奉獻姿態。\n狀態4：H - 全裸後入式，精液溢出子宮，表情臣服。\n\n風格：黑暗奇幻，成熟豐滿，儀式服從。\n參考 URL：https://www.pixiv.net/en/artworks/12345678 (冷豔銀髮軍女範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ01012345.html (類似支配立繪)。` 
  },
  p3_serena: { 
    title: 'Art: Serena', 
    icon: <Image />, 
    phase: 3, 
    type: 'markdown',
    content: `# 塞蕾娜 立繪參考\n\n狀態1：通常 - 黑長髮眼鏡，緊身長袍凸顯胸臀，知性站姿。\n狀態2：親密 - 袍子鬆開，露出內衣曲線，坐姿低語。\n狀態3：儀式 - 半裸跨坐，陰唇腫脹，眼神逆轉。\n狀態4：H - 全裸內射，精液滿溢，理性崩潰表情。\n\n風格：黑暗奇幻，精英成熟，交易逆轉姿態。\n參考 URL：https://www.pixiv.net/en/artworks/87654321 (知性黑髮女範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ02012345.html (類似理性支配立繪）。` 
  },
  p3_elia: { 
    title: 'Art: Elia', 
    icon: <Image />, 
    phase: 3, 
    type: 'markdown',
    content: `# 艾莉婭 立繪參考\n\n狀態1：通常 - 金髮聖潔長袍，優雅豐滿，站姿神聖。\n狀態2：親密 - 袍子滑落，露出乳房曲線，跪祈禱姿。\n狀態3：儀式 - 半裸平躺，陰唇濕潤，眼神神格化。\n狀態4：H - 傳教士體位內射，精液聖水溢出，自我消解表情。\n\n風格：黑暗奇幻，精神潔癖成熟，信仰獻祭。\n參考 URL：https://www.pixiv.net/en/artworks/13579246 (聖潔金髮女範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ03012345.html (類似宗教支配立繪）。` 
  },
  p3_camilla: { 
    title: 'Art: Camilla', 
    icon: <Image />, 
    phase: 3, 
    type: 'markdown',
    content: `# 卡米拉 立繪參考\n\n狀態1：通常 - 紅短髮裝甲，強勢驕傲體型，站姿挑釁。\n狀態2：親密 - 裝甲破損，露出肌膚曲線，半跪動搖。\n狀態3：儀式 - 半裸綁姿，陰唇腫脹，眼神承認。\n狀態4：H - 壓制高潮內射，精液懲罰溢出，敗北表情。\n\n風格：黑暗奇幻，女王成熟，抗拒轉化。\n參考 URL：https://www.pixiv.net/en/artworks/24681357 (驕傲紅髮女範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ04012345.html (類似敗北支配立繪）。` 
  },
  p3_lys: { 
    title: 'Art: Lys', 
    icon: <Image />, 
    phase: 3, 
    type: 'markdown',
    content: `# 莉絲 立繪參考\n\n狀態1：通常 - 紫髮暴露皮衣，危險妖豔，站姿不穩。\n狀態2：親密 - 皮衣半脫，露出曲線，依附靠近。\n狀態3：儀式 - 半裸騎乘，陰唇濕潤，眼神扭曲。\n狀態4：H - 主動扭腰內射，精液救贖溢出，依附表情。\n\n風格：黑暗奇幻，不穩成熟，扭曲控制。\n參考 URL：https://www.pixiv.net/en/artworks/36925814 (妖豔紫髮女範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ05012345.html (類似依存支配立繪）。` 
  },
  p3_cg_main: { 
    title: 'CG: Mainline', 
    icon: <Layers />, 
    phase: 3, 
    type: 'markdown',
    content: `# 主線 CG 參考\n\n- 薇爾緹：跪舔後入內射，分層（表情喘息、肢體壓制、體液溢出、軍裝層）。\n- 塞蕾娜：跨坐內射，分層（眼鏡歪斜、肢體扭腰、體液滿溢、長袍層）。\n- 艾莉婭：傳教士內射，分層（眼神直視、肢體獻祭、體液聖水、聖袍層）。\n- 卡米拉：壓制內射，分層（高潮敗北、肢體綁姿、體液懲罰、裝甲層）。\n- 莉絲：騎乘內射，分層（狂亂扭腰、肢體擁抱、體液救贖、皮衣層）。\n\n參考 URL：https://www.fantia.jp/posts/123456 (類似儀式 H CG)；https://www.dlsite.com/maniax/work/=/product_id/RJ06012345.html (分層支配範例）。` 
  },
  p3_cg_branch: { 
    title: 'CG: Branch', 
    icon: <Layers />, 
    phase: 3, 
    type: 'markdown',
    content: `# 支線 CG 參考\n\n- 征戰：後壓制內射，分層（戰敗跪地、肢體暴露、體液標記、族旗層）。\n- 統治：多次體位內射，分層（女王跪坐、肢體騎乘、體液多次、寢殿層）。\n- 重寫：公開內射，分層（暴露跪地、肢體儀式、體液宣告、族群圍觀層）。\n\n參考 URL：https://www.pixiv.net/en/artworks/98765432 (征服 CG 範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ07012345.html (公開儀式範例）。` 
  },
  p3_bg: { 
    title: 'Art: Backgrounds', 
    icon: <Palette />, 
    phase: 3, 
    type: 'markdown',
    content: `# 場景插畫參考\n\n- 王座大廳：黑暗大理石，腐敗大陸地圖。\n- 私人殿室：儀式蠟燭，跪姿平台。\n- 戰場：外族營地，征服旗幟。\n- 神殿：信仰雕像，重寫祭壇。\n\n風格：黑暗奇幻，煽情氛圍。\n參考 URL：https://www.pixiv.net/en/artworks/11223344 (黑暗王座範例)；https://www.dlsite.com/maniax/work/=/product_id/RJ08012345.html (儀式場景範例）。` 
  },

  // Assets Integration (Phase 3.5)
  asset_stand: {
    title: 'stand_images/',
    icon: <Folder />,
    phase: 3.5,
    type: 'gallery',
    data: ASSET_PREVIEWS.stands,
    content: 'Character Stand Images'
  },
  asset_cg: {
    title: 'cg_images/',
    icon: <Folder />,
    phase: 3.5,
    type: 'gallery',
    data: ASSET_PREVIEWS.cgs,
    content: 'Event CG Images'
  },
  asset_bg: {
    title: 'backgrounds/',
    icon: <Folder />,
    phase: 3.5,
    type: 'gallery',
    data: ASSET_PREVIEWS.bgs,
    content: 'Background Images'
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof DOCS>('readme');

  const renderContent = () => {
    const doc = DOCS[activeTab];
    
    if (doc.type === 'gallery' && 'data' in doc) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
            <FolderOpen className="text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-200">assets/{doc.title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(doc.data as any[]).map((file, idx) => (
              <div key={idx} className="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
                <div className="aspect-[3/4] overflow-hidden bg-gray-900">
                  <img 
                    src={file.url} 
                    alt={file.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-200 truncate">{file.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{file.size}</div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">PREVIEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-2xl min-h-[500px]">
        <pre className="font-mono whitespace-pre-wrap text-gray-300 leading-relaxed text-sm md:text-base">
          {doc.content}
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-2 tracking-widest uppercase">Dominion</h1>
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">Project Documentation</div>
        
        <div className="space-y-6 flex-1">
          
          {/* Phase 3.5 Group (Assets) */}
           <div>
            <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Assets (Preview)
              <FolderOpen size={12} className="text-yellow-600" />
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 3.5).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all text-left ${
                    activeTab === key 
                      ? 'bg-yellow-900/20 text-yellow-400 border-l-2 border-yellow-500' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-2 border-transparent'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  <span className="truncate">{DOCS[key].title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Phase 3 Group (Active) */}
          <div>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 3: Art Specs
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 3).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all text-left ${
                    activeTab === key 
                      ? 'bg-blue-900/20 text-blue-400 border-l-2 border-blue-500' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-2 border-transparent'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  <span className="truncate">{DOCS[key].title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Phase 2 Group (Done) */}
          <div>
            <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 2: Scripting
              <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded">DONE</span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 2).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all text-left ${
                    activeTab === key 
                      ? 'bg-green-900/20 text-green-400 border-l-2 border-green-500' 
                      : 'text-gray-500 hover:bg-gray-800 hover:text-gray-400 border-l-2 border-transparent'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  <span className="truncate">{DOCS[key].title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Phase 1 Group (Done) */}
          <div>
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-4">Phase 1: Planning</h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 1).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all text-left ${
                    activeTab === key 
                      ? 'bg-gray-800 text-gray-300 border-l-2 border-gray-500' 
                      : 'text-gray-500 hover:bg-gray-800 hover:text-gray-400 border-l-2 border-transparent'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  <span className="truncate">{DOCS[key].title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-xs text-gray-600">
          Phase 4 Prep<br/>
          Assets Integration
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-gray-900">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;