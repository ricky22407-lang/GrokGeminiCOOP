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
    content: `# 世界觀設定\n\n大陸名：埃爾多蘭（Eldoran）\n\n表面秩序：\n- 多個種族城邦割據：人類王國、精靈森域、獸人部落、矮人堡壘、異形地下城。\n- 存在虛偽的聯盟、貿易、信仰體系。\n\n王座的本質：\n- 擁有「裁定權」：能重寫規則、標記歸屬、剝奪反抗者的意志力。\n- 目標：讓「被支配」成為最合理的選擇。世界不會被摧毀，只會被重塑為跪姿。\n\n主角視角：\n- 世界是棋盤，所有人都是可被標記的棋子。\n- 支配即效率。`
  },
  char: {
    title: 'Characters',
    icon: <FileText />,
    content: `# 五位女主角詳細設定\n\n1. **薇爾緹 (Velti)** - 王座近侍\n   - 絕對忠誠，渴求命令。\n   - H定位：主動跪下，要求精液標記作為誓約。\n\n2. **塞蕾娜 (Serena)** - 策略顧問\n   - 理性交易，掌控感逆轉。\n   - H定位：理性崩潰，承認最優解是徹底屬於主角。\n\n3. **艾莉婭 (Elia)** - 宗教代表\n   - 信仰崩塌與重塑。\n   - H定位：視精液為聖水，自我消解式性愛。\n\n4. **卡米拉 (Camilla)** - 前敵對者\n   - 高傲戰士，自尊粉碎。\n   - H定位：強制高潮，乞求懲罰與內射。\n\n5. **莉絲 (Lys)** - 情報/刺客\n   - 扭曲依附，錯位救贖。\n   - H定位：瘋狂騎乘，尋求精液平息瘋狂。`
  },
  flow: {
    title: 'Story Flow',
    icon: <GitBranch />,
    content: `# 故事流程\n\n主線三階段：\n1. **觀察期**：世界描述，主角冷靜觀察。\n2. **靠近期**：合作/衝突，女角產生渴求。\n3. **歸屬期**：H場景集中，身分轉換完成。\n\n支線系統：\n- 外族征戰 (儀式化交合)\n- 心靈統治 (完全歸屬)\n- 制度重寫 (公開儀式)`
  },
  check: {
    title: 'Checklist',
    icon: <CheckSquare />,
    content: `# Phase 1 檢核表\n\n[x] 世界觀文檔完成 (埃爾多蘭)\n[x] 五女主角詳細設定 (含H語線)\n[x] 故事流程圖 (主線+支線)\n[x] 符合七條鐵律\n\n下一步：Phase 2 文本期`
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
          Status: <span className="text-green-500">Complete</span>
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