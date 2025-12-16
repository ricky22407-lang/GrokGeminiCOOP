import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, FolderOpen, File } from 'lucide-react';

const DOCS = {
  // Phase 1 Content (Read Only)
  readme: {
    title: 'README (Phase 2 Active)',
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
    content: `# Phase 2: 文本期\n\n## 主線腳本\n- [ ] 薇爾緹 (Velti)\n- [ ] 塞蕾娜 (Serena)\n- [ ] 艾莉婭 (Elia)\n- [ ] 卡米拉 (Camilla)\n- [ ] 莉絲 (Lys)\n\n## 支線模板\n- [ ] 征服 / 統治 / 制度重寫`
  },
  p2_velti: {
    title: 'Script: Velti',
    icon: <FileText />,
    phase: 2,
    content: `# 薇爾緹 (Velti) 主線腳本\n\n*狀態：待填寫*\n\n等待中間人提供初稿 (velti_script.md)`
  },
  p2_serena: {
    title: 'Script: Serena',
    icon: <FileText />,
    phase: 2,
    content: `# 塞蕾娜 (Serena) 主線腳本\n\n*狀態：待填寫*`
  },
  p2_others: {
    title: 'Script: Others',
    icon: <FolderOpen />,
    phase: 2,
    content: `# 其他角色腳本 (Pending)\n\n- Elia (艾莉婭)\n- Camilla (卡米拉)\n- Lys (莉絲)\n\n檔案已建立，等待內容填入。`
  },
  p2_templates: {
    title: 'Branch Templates',
    icon: <GitBranch />,
    phase: 2,
    content: `# 支線模板 (Pending)\n\n- Conquest (征戰)\n- Domination (統治)\n- System Rewrite (制度重寫)\n\n檔案已建立，等待內容填入。`
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
        
        <div className="space-y-6">
          {/* Phase 2 Group */}
          <div>
            <h3 className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2 px-4">Phase 2: Scripting</h3>
            <nav className="space-y-1">
              {(Object.keys(DOCS) as Array<keyof typeof DOCS>).filter(k => DOCS[k].phase === 2).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all ${
                    activeTab === key 
                      ? 'bg-green-900/20 text-green-400 border border-green-900/50' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  {DOCS[key].title}
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
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-all ${
                    activeTab === key 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'text-gray-500 hover:bg-gray-800 hover:text-gray-400'
                  }`}
                >
                  {React.cloneElement(DOCS[key].icon as React.ReactElement<any>, { size: 14 })}
                  {DOCS[key].title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-8 text-xs text-gray-600">
          Current Phase: 2<br/>
          Status: <span className="text-green-500">In Progress</span>
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