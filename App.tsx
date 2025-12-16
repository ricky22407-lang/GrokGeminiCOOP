import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers } from 'lucide-react';

const DOCS = {
  // Phase 1 Content (Read Only)
  readme: {
    title: 'README (Phase 3)',
    icon: <Book />,
    phase: 1,
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n\n## 當前階段\nPhase 3 - 美術期（進行中）\n\n## 進度\n- [x] Phase 1 企劃期完成\n- [x] Phase 2 文本期完成\n- [ ] 角色立繪參考（5位女主角，各3-4狀態）\n- [ ] CG 參考（主線5 + 支線多張，約25張，分層支援）\n- [ ] 場景插畫參考（王座大廳、私人殿室、儀式室、外族戰場等）`
  },
  phase1_check: {
    title: 'Phase 1 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 1,
    content: `# Phase 1 檢核表\n\n- [x] 世界觀文檔完成\n- [x] 五女主角詳細設定\n- [x] 故事流程圖\n- [x] 所有內容符合七條鐵律\n\nPhase 1 正式完成。`
  },
  
  // Phase 2 Structure
  phase2_check: {
    title: 'Phase 2 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 2,
    content: `# Phase 2 檢核表\n\n- [x] 薇爾緹主線腳本完成\n- [x] 塞蕾娜主線腳本完成\n- [x] 艾莉婭主線腳本完成\n- [x] 卡米拉主線腳本完成\n- [x] 莉絲主線腳本完成\n- [x] 支線模板完成\n- [x] 文本符合鐵律（露骨、心理轉變、主角上位）\n\nPhase 2 正式結束。`
  },
  
  // Scripts (Phase 2)
  p2_velti: { title: 'Script: Velti', icon: <FileText />, phase: 2, content: `# 薇爾緹 主線腳本... (Loaded)` },
  p2_serena: { title: 'Script: Serena', icon: <FileText />, phase: 2, content: `# 塞蕾娜 主線腳本... (Loaded)` },
  p2_elia: { title: 'Script: Elia', icon: <FileText />, phase: 2, content: `# 艾莉婭 主線腳本... (Loaded)` },
  p2_camilla: { title: 'Script: Camilla', icon: <FileText />, phase: 2, content: `# 卡米拉 主線腳本... (Loaded)` },
  p2_lys: { title: 'Script: Lys', icon: <FileText />, phase: 2, content: `# 莉絲 主線腳本... (Loaded)` },
  p2_conquest: { title: 'Branch: Conquest', icon: <GitBranch />, phase: 2, content: `# 支線A 外族征戰... (Loaded)` },
  p2_domination: { title: 'Branch: Domination', icon: <GitBranch />, phase: 2, content: `# 支線B 心靈統治... (Loaded)` },
  p2_rewrite: { title: 'Branch: Rewrite', icon: <GitBranch />, phase: 2, content: `# 支線C 制度重寫... (Loaded)` },

  // Phase 3 Structure
  phase3_check: {
    title: 'Phase 3 Checklist',
    icon: <CheckSquare />,
    phase: 3,
    content: `# Phase 3 檢核表\n\n- [ ] 角色立繪參考收集（各3-4狀態：通常/親密/儀式/H）\n- [ ] CG 參考收集（分層：表情、肢體、體液、服裝）\n- [ ] 場景插畫參考\n- [ ] 所有美術符合鐵律（成熟、煽情露骨、儀式姿態）`
  },
  p3_velti: { title: 'Art: Velti', icon: <Image />, phase: 3, content: `# 薇爾緹 (Velti) 美術設定\n\n狀態：參考收集\n描述：(待填入)\n參考 URL：(待填入)` },
  p3_serena: { title: 'Art: Serena', icon: <Image />, phase: 3, content: `# 塞蕾娜 (Serena) 美術設定\n\n狀態：參考收集\n描述：(待填入)\n參考 URL：(待填入)` },
  p3_elia: { title: 'Art: Elia', icon: <Image />, phase: 3, content: `# 艾莉婭 (Elia) 美術設定\n\n狀態：參考收集\n描述：(待填入)\n參考 URL：(待填入)` },
  p3_camilla: { title: 'Art: Camilla', icon: <Image />, phase: 3, content: `# 卡米拉 (Camilla) 美術設定\n\n狀態：參考收集\n描述：(待填入)\n參考 URL：(待填入)` },
  p3_lys: { title: 'Art: Lys', icon: <Image />, phase: 3, content: `# 莉絲 (Lys) 美術設定\n\n狀態：參考收集\n描述：(待填入)\n參考 URL：(待填入)` },
  p3_cg_main: { title: 'CG: Mainline', icon: <Layers />, phase: 3, content: `# 主線 CG 參考列表\n\n狀態：參考收集\nH場景構圖參考：(待填入)\n關鍵劇情參考：(待填入)` },
  p3_cg_branch: { title: 'CG: Branch', icon: <Layers />, phase: 3, content: `# 支線 CG 參考列表\n\n狀態：參考收集\n外族征戰參考：(待填入)\n心靈統治參考：(待填入)\n制度重寫參考：(待填入)` },
  p3_bg: { title: 'Art: Backgrounds', icon: <Palette />, phase: 3, content: `# 場景插畫參考列表\n\n狀態：參考收集\n王座大廳：(待填入)\n私人寢殿：(待填入)\n儀式戰場：(待填入)\n神殿內室：(待填入)` },
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof DOCS>('readme');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col overflow-y-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-2 tracking-widest uppercase">Dominion</h1>
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">Project Documentation</div>
        
        <div className="space-y-6">
          {/* Phase 3 Group (Active) */}
          <div>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 3: Art
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
          Phase 3 Active<br/>
          Art Production in progress
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-2xl min-h-[500px]">
            <pre className="font-mono whitespace-pre-wrap text-gray-300 leading-relaxed text-sm md:text-base">
              {DOCS[activeTab].content}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;