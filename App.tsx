import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers, Folder, FolderOpen, Mic, Music, Volume2, PlayCircle, ShieldCheck } from 'lucide-react';

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
    title: 'README (Phase 5 Prep)',
    icon: <Book />,
    phase: 1,
    type: 'markdown',
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n\n## 當前階段\nPhase 5 - 整合測試期（準備進入）\n\n## 進度\n- [x] Phase 1 企劃期完成\n- [x] Phase 2 文本期完成\n- [x] Phase 3 美術參考與資源結構完成\n- [x] Phase 4 音效/配音規範完成\n- [ ] 角色一致性審核\n- [ ] H場景鐵律檢查`
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
    content: `# Phase 3 檢核表\n\n- [x] 角色立繪參考收集完成（描述 + URL）\n- [x] CG 參考收集完成（分層 + URL）\n- [x] 場景插畫參考完成\n- [x] 所有參考符合鐵律（成熟、煽情露骨、儀式姿態）\n- [x] 實際美術資源上傳/整合\n\nPhase 3 美術規格確立完成。`
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
    content: `# Phase 4 檢核表\n\n- [x] 角色語音方向表完成\n- [x] H場景喘息規範完成\n- [x] BGM 與環境音方向完成\n- [ ] 配音樣本收集/試錄（可選）\n- [x] 所有音效符合鐵律（情緒一致、儀式化、無誇張）\n\nPhase 4 完成，下一步 Phase 5 整合測試期。`
  },
  p4_voice: { 
    title: 'Specs: Voice Direction', 
    icon: <Mic />, 
    phase: 4, 
    type: 'markdown', 
    content: `# 角色語音方向表\n\n每位女主角限定聲線範圍（日語配音優先），情緒層級：低（冷靜/低語） / 中（偏移/試探） / 高（歸屬宣告）\n\n1. 薇爾緹（絕對忠誠型）\n   - 聲線：低沉冷靜女聲，軍事風格，語速緩慢。\n   - 低：平靜報告\n   - 中：輕微顫抖的渴望\n   - 高：儀式性宣誓（無高音尖叫）\n\n2. 塞蕾娜（理性交易型）\n   - 聲線：知性成熟女聲，眼鏡系冷靜。\n   - 低：理性分析\n   - 中：語氣微亂的計算\n   - 高：理性崩潰後的低語承認\n\n3. 艾莉婭（崇拜信仰型）\n   - 聲線：優雅聖潔女聲，輕柔。\n   - 低：神聖探求\n   - 中：信仰動搖的低喃\n   - 高：獻祭式宣告（平靜狂熱）\n\n4. 卡米拉（抗拒轉化型）\n   - 聲線：強勢高傲女聲，女王風。\n   - 低：挑釁否定\n   - 中：動搖壓抑\n   - 高：敗北後的低聲乞求\n\n5. 莉絲（扭曲依附型）\n   - 聲線：危險妖媚女聲，情緒波動。\n   - 低：不穩低語\n   - 中：恐懼與渴望交織\n   - 高：扭曲滿足的喘息宣告` 
  },
  p4_h_voice: { 
    title: 'Specs: H-Voice', 
    icon: <Mic />, 
    phase: 4, 
    type: 'markdown', 
    content: `# H場景喘息規範（鐵律重點）\n\n- 禁止過度誇張、尖叫式、破壞氛圍的喘音。\n- 所有 H 語音以「儀式化、低語、宣告」為主。\n- 喘息層級：輕微呼吸加速 → 壓抑低吟 → 歸屬宣告時短促喘息。\n- 關鍵語線必須清晰錄製（例如「請用您的精液標記我的子宮」需平靜而堅定）。\n- 禁止可愛化、嬌喘過頭，保持成熟支配氛圍。\n- 體液音效分離（可後製），語音本身不模擬濕潤聲。` 
  },
  p4_bgm: { 
    title: 'Specs: BGM/Env', 
    icon: <Music />, 
    phase: 4, 
    type: 'markdown', 
    content: `# BGM 與環境音方向\n\n風格整體：黑暗奇幻管弦，低音主導，冷靜壓抑。\n\n- 王座大廳 BGM：低沉弦樂 + 遙遠鐘聲，威嚴冷靜。\n- 私人殿室 BGM：低頻脈動 + 蠟燭燃燒環境音，儀式感。\n- 歸屬期 BGM：緩慢上升弦樂，內射瞬間短促高潮音（無過度激昂）。\n- 夜晚/支線 BGM：低沉鋼琴 + 風聲/遠處低語。\n- 環境音：石廳回音、鎖鏈輕響、呼吸迴響（增強支配感）。\n\n參考作品風格：類似《Overlord》OST 低沉版，或黑暗儀式音樂。` 
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
              Assets: Audio
              <Volume2 size={12} className="text-yellow-600" />
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 4.5).map((key) => (
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

          {/* Phase 4 Group (Done) */}
          <div>
            <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 4: Audio/Voice
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
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 3 || DOCS[k].phase === 3.5).map((key) => (
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
          Phase 5 Prep<br/>
          Integration Testing
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