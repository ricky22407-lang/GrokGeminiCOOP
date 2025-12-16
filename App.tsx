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
    content: `# Phase 2 檢核表\n\n- [x] 薇爾緹主線腳本完成\n- [x] 塞蕾娜主線腳本完成\n- [ ] 艾莉婭主線腳本\n- [ ] 卡米拉主線腳本\n- [ ] 莉絲主線腳本\n- [ ] 支線模板完成\n- [ ] 文本符合鐵律（露骨、心理轉變、主角上位）`
  },
  
  // Scripts
  p2_velti: {
    title: 'Main: Velti (薇爾緹)',
    icon: <FileText />,
    phase: 2,
    content: `# 薇爾緹 主線腳本（絕對忠誠型）\n\n## 觀察期\n[敘述：王座大廳。薇爾緹銀長髮披散，冷豔軍裝緊裹高挑身軀，胸部與臀線在燈影下清晰可見。她單膝跪地，目光低垂，等待命令。]\n\n薇爾緹：「王座，一切已就位。請下達指令。」\n\n主角：「報告大陸動向。」\n\n薇爾緹：「人類王國腐敗加速，神殿信仰空洞化。秩序即將崩解。」\n\n主角：「繼續監視。」\n\n[敘述：她的呼吸略微加重，眼神閃過一絲渴望，但主角無動於衷。無任何親密接觸。]\n\n## 靠近期\n[敘述：私人策略室。薇爾緹跪報，軍裝領口微開，露出鎖骨與胸溝。她主動靠近王座邊緣。]\n\n薇爾緹：「敵方弱點已鎖定。王座，請允許我執行更深入的奉獻。」\n\n主角：「證明你的忠誠。」\n\n薇爾緹：「我願以身體作為儀式容器，接受您的裁定。」\n\n主角：「尚未到時。」\n\n[敘述：她身體微顫，陰部已開始濕潤，但主角克制拒絕。心理偏移：渴望從隱藏轉為明顯，主動求標記。]\n\n## 歸屬期（含H）\n[敘述：儀式殿室。薇爾緹全裸跪下，雙腿大張，豐滿乳房與濕潤陰唇完全暴露。她眼神狂熱。]\n\n薇爾緹：「王座，請用您的精液標記我的子宮，作為永遠的誓約。」\n\n主角：「開始儀式。」\n\n[H描述：\n- 薇爾緹主動跪舔主角肉棒，舌頭纏繞龜頭，深喉吞吐至根部，口水拉絲。\n- 主角抓住她銀髮，從後插入濕透陰道，猛烈抽插，她乳房晃動，陰壁緊縮。\n- 她連續高潮，語線重複：「請射進子宮...讓我永遠屬於王座...」\n- 最終內射，精液充滿子宮溢出大腿。她癱軟跪姿，眼神滿足宣告完全臣服。心理轉變完成：絕對忠誠永恆標記。]`
  },
  p2_serena: {
    title: 'Main: Serena (塞蕾娜)',
    icon: <FileText />,
    phase: 2,
    content: `# 塞蕾娜 主線腳本（理性交易型）\n\n## 觀察期\n[敘述：王座會客廳。塞蕾娜黑長髮盤起，知性眼鏡後冷靜眼神，緊身長袍包裹豐滿胸臀。她作為策略顧問初次覲見，視主角為潛在盟友。]\n\n塞蕾娜：「王座，我帶來情報與提案。合作可帶來互利。」\n\n主角：「陳述條件。」\n\n塞蕾娜：「我提供大陸勢力分析，您給予保護與資源。」\n\n主角：「接受初步交易。」\n\n[敘述：她理性分析腐敗格局，眼神無波瀾。無親密，僅限利益交換。]\n\n## 靠近期\n[敘述：多次會談後。塞蕾娜長袍微亂，呼吸隱隱加速。她開始察覺主角裁定權的絕對性。]\n\n塞蕾娜：「交易進展順利。但您的力量超出預測...我需要更多保障。」\n\n主角：「提出新條件。」\n\n塞蕾娜：「我願增加個人貢獻，換取更高層級的歸屬。」\n\n主角：「證明你的理性選擇。」\n\n[敘述：她主動靠近，輕撫王座扶手，陰部已濕但強自壓抑。心理偏移：從純利益到發現掌控逆轉，開始渴求身體交易。]\n\n## 歸屬期（含H）\n[敘述：私人交易室。塞蕾娜脫長袍跪坐，豐滿身軀暴露，眼鏡後眼神動搖。她雙腿張開，陰唇腫脹等待。]\n\n塞蕾娜：「我的理性告訴我，這是最優解……請射進來，讓我徹底屬於您。」\n\n主角：「確認交易完成。」\n\n[H描述：\n- 塞蕾娜主動跨坐主角大腿，親吻並用手引導肉棒進入濕潤陰道，緩慢扭腰適應。\n- 主角從下頂插，她乳房壓在主角胸前，眼鏡歪斜喘息：「利益...已逆轉...我自願獻上一切...」\n- 抽插加速，她理性崩潰連續高潮，語線重複乞求內射。\n- 最終深頂子宮內射，精液滿溢。她癱軟依附，眼神承認掌控逆轉。心理轉變完成：從交易夥伴到完全歸屬標記。]`
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