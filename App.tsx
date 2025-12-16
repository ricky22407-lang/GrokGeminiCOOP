import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File } from 'lucide-react';

const DOCS = {
  // Phase 1 Content (Read Only)
  readme: {
    title: 'README (Phase 2)',
    icon: <Book />,
    phase: 1,
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n\n## 當前階段\nPhase 2 - 文本期（進行中）\n\n## 進度\n- [x] Phase 1 企劃期完成\n- [ ] 主線五女主角腳本\n- [ ] 支線模板`
  },
  phase1_check: {
    title: 'Phase 1 Checklist (Done)',
    icon: <CheckSquare />,
    phase: 1,
    content: `# Phase 1 檢核表\n\n- [x] 世界觀文檔完成\n- [x] 五女主角詳細設定\n- [x] 故事流程圖\n- [x] 所有內容符合七條鐵律\n\nPhase 1 正式完成。`
  },
  
  // Phase 2 Structure
  phase2_check: {
    title: 'Phase 2 Checklist',
    icon: <CheckSquare />,
    phase: 2,
    content: `# Phase 2 檢核表\n\n- [ ] 主線腳本完成\n- [ ] 支線模板完成\n- [ ] 文本符合鐵律（露骨、心理轉變、主角上位）`
  },
  
  // Scripts
  p2_velti: {
    title: 'Main: Velti (薇爾緹)',
    icon: <FileText />,
    phase: 2,
    content: `# 薇爾緹 主線腳本（絕對忠誠型）\n\n## 觀察期\n主角視角：王座大廳，薇爾緹作為近侍初登場。她銀長髮披散，冷豔軍裝裹緊高挑身軀，胸臀曲線在燈光下隱隱凸顯。她的眼神固定在你腳邊，等待命令。\n\n薇爾緹： "王座，我已準備好執行任何指令。"\n\n主角： "觀察周邊腐敗。報告。"\n\n薇爾緹： "人類王國領主貪腐，神殿販賣信仰。秩序已破。"\n\n主角： "繼續監視。"\n\n(無親密，聚焦她的渴望眼神漸露。)\n\n## 靠近期\n主角視角：策略室，薇爾緹跪報。她軍裝微解，呼吸略亂，渴望命令的跡象明顯。\n\n薇爾緹： "王座，敵方動向確認。請求您的裁定。"\n\n主角： "執行標記初步計劃。"\n\n薇爾緹： "遵命。但...我個人請求更深層的奉獻。"\n\n主角： "證明你的價值。"\n\n(試探偏移：她主動接近，輕觸王座邊緣，眼神渴求，但主角克制未允。情緒偏移成儀式預備。)\n\n## 歸屬期（含H）\n主角視角：私人殿室，薇爾緹脫軍裝跪下，豐滿身軀暴露，雙腿張開，陰唇微濕等待標記。\n\n薇爾緹： "王座，請用您的精液標記我的子宮，作为永遠的誓約。"\n\n主角： "宣誓。"\n\n薇爾緹： "我奉獻一切，儀式開始。"\n\n(H描述：她跪舔主角肉棒，舌尖環繞龜頭，吞吐至喉深。主角插入她濕潤陰道，從後壓制抽插，她喘息宣告奉獻。高潮時內射子宮，體液溢出標記歸屬。心理轉變：從渴望命令到完全臣服，儀式完成後她眼神平靜，永屬王座。)`
  },
  p2_serena: {
    title: 'Main: Serena (塞蕾娜)',
    icon: <FileText />,
    phase: 2,
    content: `# 塞蕾娜 (Serena) 主線腳本\n\n*狀態：待填寫*\n*H定位：理性崩壞、掌控逆轉*`
  },
  p2_elia: {
    title: 'Main: Elia (艾莉婭)',
    icon: <FileText />,
    phase: 2,
    content: `# 艾莉婭 (Elia) 主線腳本\n\n*狀態：待填寫*\n*H定位：信仰重塑、聖水灌注*`
  },
  p2_camilla: {
    title: 'Main: Camilla (卡米拉)',
    icon: <FileText />,
    phase: 2,
    content: `# 卡米拉 (Camilla) 主線腳本\n\n*狀態：待填寫*\n*H定位：傲慢粉碎、強制高潮*`
  },
  p2_lys: {
    title: 'Main: Lys (莉絲)',
    icon: <FileText />,
    phase: 2,
    content: `# 莉絲 (Lys) 主線腳本\n\n*狀態：待填寫*\n*H定位：扭曲依賴、騎乘*`
  },

  // Templates
  p2_conquest: {
    title: 'Template: Conquest',
    icon: <GitBranch />,
    phase: 2,
    content: `# 支線模板：外族征戰 (Conquest)\n\n*狀態：待填寫*`
  },
  p2_domination: {
    title: 'Template: Domination',
    icon: <GitBranch />,
    phase: 2,
    content: `# 支線模板：心靈統治 (Domination)\n\n*狀態：待填寫*`
  },
  p2_rewrite: {
    title: 'Template: System Rewrite',
    icon: <GitBranch />,
    phase: 2,
    content: `# 支線模板：制度重寫 (System Rewrite)\n\n*狀態：待填寫*`
  }
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
          {/* Phase 2 Group */}
          <div>
            <h3 className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2 px-4 flex items-center justify-between">
              Phase 2: Scripting
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 2).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all text-left ${
                    activeTab === key 
                      ? 'bg-green-900/20 text-green-400 border-l-2 border-green-500' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-2 border-transparent'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  <span className="truncate">{DOCS[key].title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Phase 1 Group */}
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
          Phase 2 Active<br/>
          Scripting in progress
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