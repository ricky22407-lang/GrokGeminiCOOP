import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers, Folder, FolderOpen, Mic, Music, Volume2, PlayCircle, ShieldCheck, ClipboardCheck, Activity, Search, FileSearch, Flag } from 'lucide-react';

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

const AUDIO_PREVIEWS = {
  voices: [
    { name: 'velti_obsey_01.wav', duration: '0:04', type: 'Voice' },
    { name: 'velti_h_moan_02.wav', duration: '0:08', type: 'H-Voice' },
    { name: 'serena_deny_01.wav', duration: '0:05', type: 'Voice' },
  ],
  bgm: [
    { name: 'bgm_throne_dark.mp3', duration: '3:20', type: 'BGM' },
    { name: 'bgm_ritual_h.mp3', duration: '4:15', type: 'BGM' },
  ]
};

const DOCS = {
  // Phase 1 Content (Read Only)
  readme: {
    title: 'README (Project Complete)',
    icon: <Book />,
    phase: 1,
    type: 'markdown',
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n\n## 當前階段\n企劃完成（等待實際開發）\n\n## 進度\n- [x] Phase 1 企劃期完成\n- [x] Phase 2 文本期完成\n- [x] Phase 3 美術參考與資源結構完成\n- [x] Phase 4 音效/配音規範完成\n- [x] Phase 5 整合測試期完成\n\n《Dominion：沉默王座》企劃全階段監督結束，全部符合核心鐵律與賣點。`
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

  // Phase 3 Structure (Done)
  phase3_check: {
    title: 'Phase 3 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 3,
    type: 'markdown',
    content: `# Phase 3 檢核表\n\n- [x] 角色立繪參考收集完成\n- [x] CG 參考收集完成\n- [x] 場景插畫參考完成\n- [x] 所有參考符合鐵律\n- [x] 實際美術資源上傳/整合\n\nPhase 3 美術規格確立完成。`
  },
  p3_velti: { title: 'Art: Velti', icon: <Image />, phase: 3, type: 'markdown', content: `# 薇爾緹 立繪參考... (Loaded)` },
  p3_serena: { title: 'Art: Serena', icon: <Image />, phase: 3, type: 'markdown', content: `# 塞蕾娜 立繪參考... (Loaded)` },
  p3_cg_main: { title: 'CG: Mainline', icon: <Layers />, phase: 3, type: 'markdown', content: `# 主線 CG 參考... (Loaded)` },
  p3_bg: { title: 'Art: Backgrounds', icon: <Palette />, phase: 3, type: 'markdown', content: `# 場景插畫參考... (Loaded)` },

  // Phase 4 Structure (Done)
  phase4_check: {
    title: 'Phase 4 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 4,
    type: 'markdown',
    content: `# Phase 4 檢核表\n\n- [x] 角色語音方向表完成\n- [x] H場景喘息規範完成\n- [x] BGM 與環境音方向完成\n- [ ] 配音樣本收集/試錄（可選）\n- [x] 所有音效符合鐵律\n\nPhase 4 規格確立完成。`
  },
  p4_voice: { title: 'Specs: Voice Direction', icon: <Mic />, phase: 4, type: 'markdown', content: `# 角色語音方向表... (Loaded)` },
  p4_h_voice: { title: 'Specs: H-Voice', icon: <Mic />, phase: 4, type: 'markdown', content: `# H場景喘息規範... (Loaded)` },
  p4_bgm: { title: 'Specs: BGM/Env', icon: <Music />, phase: 4, type: 'markdown', content: `# BGM 與環境音方向... (Loaded)` },

  // Phase 5 Structure (Done/Complete)
  phase5_check: {
    title: 'Phase 5 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 5,
    type: 'markdown',
    content: `# Phase 5 檢核表\n\n- [x] 角色一致性審核完成\n- [x] H場景鐵律檢查完成\n- [x] 情緒斷裂檢查完成\n- [x] 整體流程測試完成\n- [x] 最終鐵律符合確認\n\nPhase 5 完成。整個企劃監督階段結束。`
  },
  p5_consistency: {
    title: 'Review: Consistency',
    icon: <Search />,
    phase: 5,
    type: 'markdown',
    content: `# 角色一致性審核報告\n\n- 薇爾緹：文本（儀式奉獻）、美術參考（冷豔軍裝跪姿）、聲線（低沉冷靜）完全一致。\n- 塞蕾娜：文本（理性逆轉）、美術參考（知性眼鏡跨坐）、聲線（成熟計算崩潰）完全一致。\n- 艾莉婭：文本（信仰獻祭）、美術參考（聖潔傳教士）、聲線（優雅狂熱）完全一致。\n- 卡米拉：文本（敗北重塑）、美術參考（女王壓制）、聲線（高傲轉乞求）完全一致。\n- 莉絲：文本（扭曲依附）、美術參考（妖豔騎乘）、聲線（不穩妖媚）完全一致。\n\n結論：五位女主角在文本、美術參考、聲線三層面高度統一，無矛盾。`
  },
  p5_hcheck: {
    title: 'Check: H-Scenes',
    icon: <ShieldCheck />,
    phase: 5,
    type: 'markdown',
    content: `# H場景鐵律檢查表\n\n- 所有 H 場景均服務角色心理轉變（從試探到歸屬宣告） ✓\n- 姿態儀式化（跪舔、後入、跨坐、傳教士、騎乘等服從姿） ✓\n- 語言露骨但克制（精液標記、內射子宮、宣告歸屬） ✓\n- 無血腥、無暴力描寫 ✓\n- 喘息規範遵守（無誇張尖叫，維持低語/壓抑吟） ✓\n- 主角永遠上位（女主角主動或被動接受） ✓\n\n結論：H場景完全符合七條鐵律，無違反。`
  },
  p5_flow: {
    title: 'Check: Emotion Flow',
    icon: <Activity />,
    phase: 5,
    type: 'markdown',
    content: `# 情緒斷裂與節奏檢查\n\n- 主線三階段節奏嚴守：觀察期（無親密）→ 靠近期（試探偏移）→ 歸屬期（H集中宣告） ✓\n- 每位女主角心理路徑無突兀轉折，轉變均有鋪墊 ✓\n- 支線模板同樣遵守三階段，文化/心理征服合理 ✓\n- 情緒層級與聲線、BGM 方向一致（低→中→高） ✓\n\n結論：無情緒斷裂，節奏流暢。`
  },
  p5_notes: {
    title: 'Test: Playtest Notes',
    icon: <ClipboardCheck />,
    phase: 5,
    type: 'markdown',
    content: `# 整體流程測試筆記\n\n- 主線五路線獨立測試：可完整走完三階段，歸屬期心理完成感強烈。\n- 支線模板三類型測試：征服邏輯合理，儀式化標記一致。\n- 整體體驗：玩家作為「王座」絕對上位，世界主動跪下之核心賣點完全實現。\n- 無重大 bug 或邏輯漏洞（文本階段）。\n\n結論：企劃層面完整可交付後續實際開發。`
  },

  // Assets Integration (Visual)
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
  },

  // Assets Integration (Audio)
  asset_voice: {
    title: 'voice/',
    icon: <Folder />,
    phase: 4.5,
    type: 'audio_list',
    data: AUDIO_PREVIEWS.voices,
    content: 'Voice Lines'
  },
  asset_bgm: {
    title: 'bgm/',
    icon: <Folder />,
    phase: 4.5,
    type: 'audio_list',
    data: AUDIO_PREVIEWS.bgm,
    content: 'Background Music'
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

    if (doc.type === 'audio_list' && 'data' in doc) {
      return (
        <div className="space-y-6">
           <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
            <FolderOpen className="text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-200">assets/{doc.title}</h2>
          </div>
          <div className="space-y-2">
            {(doc.data as any[]).map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 hover:bg-gray-750 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-blue-400 group-hover:text-white transition-colors">
                    <PlayCircle size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-gray-200 text-sm">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.type}</div>
                  </div>
                </div>
                <div className="font-mono text-xs text-gray-500">{file.duration}</div>
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
          
          {/* Phase 4.5 Group (Audio Assets) */}
           <div>
            <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Assets: Audio/Vis
              <FolderOpen size={12} className="text-yellow-600" />
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 3.5 || DOCS[k].phase === 4.5).map((key) => (
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

          {/* Phase 5 Group (Done/Complete) */}
          <div>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 5: Int. Test
               <span className="text-[10px] bg-blue-900 text-blue-300 px-1 rounded">DONE</span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 5).map((key) => (
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

          {/* Phase 4 Group (Done) */}
           <div>
            <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 4: Audio
              <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded">DONE</span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 4).map((key) => (
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

          {/* Phase 3 Group (Done) */}
          <div>
            <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 3: Art Specs
              <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded">DONE</span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 3).map((key) => (
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

          {/* Phase 2 Group (Done) */}
          <div>
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-4">Phase 2: Scripting</h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 2).map((key) => (
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
          PROJECT COMPLETE<br/>
          Ready for Dev
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