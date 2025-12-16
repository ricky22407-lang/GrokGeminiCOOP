import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book } from 'lucide-react';

// Hardcoded content for preview purposes since we can't fs.read in browser easily without setup
// In a real app, this would parse the MD files.
const DOCS = {
  readme: {
    title: 'README',
    icon: <Book />,
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n核心賣點：你不是拯救世界，而是讓世界主跪下。\n\n## 核心鐵律\n1. 風格參考 Overlord\n2. H 場景必須服務角色心理轉變\n3. 所有女性角色成年、無蘿莉\n4. 主角永遠為上位者\n5. 無血腥，只有支配\n\n## 當前階段: Phase 1 (企劃)`
  },
  world: {
    title: 'World Setting',
    icon: <Map />,
    content: `# 世界觀：艾瑞西亞\n\n- **聖光都城**: 虛偽的信仰中心\n- **永恆尖塔**: 主角的魔王城\n- **精靈之森**: 傲慢的古老種族\n\n核心力量：支配值 (Dominance) vs 意志力 (Willpower)`
  },
  char: {
    title: 'Characters',
    icon: <FileText />,
    content: `# 角色設定\n\n1. **塞拉斯蒂亞 (聖女)**: 墮落/背德\n2. **艾琳諾 (精靈女王)**: 傲慢粉碎\n3. **瓦爾基里 (女將軍)**: 雌犬化\n4. **薇薇安 (法師)**: 知識換身體\n5. **娜蒂亞 (刺客)**: 依賴/所有物化`
  },
  flow: {
    title: 'Story Flow',
    icon: <GitBranch />,
    content: `# 故事流程\n\n序章 -> 實力檢測 -> 路線選擇 (教會/王國/森林) -> H事件/調教 -> 結局分支\n\n最終結局: 絕對支配 (True End)`
  },
  check: {
    title: 'Checklist',
    icon: <CheckSquare />,
    content: `# Phase 1 Checklist\n\n[x] World Setting\n[x] Character Profiles\n[x] Story Flowchart\n[x] README Setup\n\nReady for Phase 2: Prototype`
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof DOCS>('readme');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-red-600 mb-2 tracking-widest uppercase">Dominion</h1>
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">Project Documentation</div>
        
        <nav className="space-y-2">
          {(Object.keys(DOCS) as Array<keyof typeof DOCS>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                activeTab === key 
                  ? 'bg-red-900/20 text-red-400 border border-red-900/50' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 16 })}
              {DOCS[key].title}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 text-xs text-gray-600">
          Phase 1: Planning<br/>
          Status: <span className="text-green-500">Active</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-2xl">
            <pre className="font-mono whitespace-pre-wrap text-gray-300 leading-relaxed">
              {DOCS[activeTab].content}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;