import React, { useState } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book } from 'lucide-react';

const DOCS = {
  readme: {
    title: 'README',
    icon: <Book />,
    content: `# Dominion：沉默王座\n\n18+ 黑暗奇幻 Galgame\n核心賣點：你不是拯救世界，而是讓世界主跪下。\n\n## 核心鐵律\n1. 風格參考 Overlord\n2. H 場景必須服務角色心理轉變\n3. 所有女性角色成年、無蘿莉\n4. 主角永遠為上位者\n5. 無血腥，只有支配\n\n## 當前階段: Phase 1 (企劃)`
  },
  world: {
    title: 'World Setting',
    icon: <Map />,
    content: `# 世界觀設定\n\n大陸名：埃爾多蘭（Eldoran）\n\n表面秩序：\n- 多個種族城邦割據：人類王國、精靈森域、獸人部落、矮人堡壘、異形地下城。\n- 存在虛偽的聯盟、貿易、信仰體系（多神教、王權宣稱正義）。\n- 實則腐敗：領主掠奪資源、神殿販賣赦免、戰爭僅為私利。\n\n王座的本質：\n- 非國家、非軍隊，而是一種絕對存在。\n- 主角（王座）擁有「裁定權」：能重寫規則、標記歸屬、剝奪反抗者的意志力。\n- 歸屬機制：\n  - 主動宣誓者：獲得保護、力量提升、慾望被滿足。\n  - 反抗者：被逐步消耗——資源流失、盟友背叛、身體與心智逐漸渴求支配。\n- 目標：讓「被支配」成為最合理的選擇。世界不會被摧毀，只會被重塑為跪姿。\n\n種族與征服重點：\n- 所有外族女代表均為成熟女性，無幼態。\n- 征服非武力，而是心理與慾望：讓她們親自獻上族群主權，交換個人歸屬。\n- H場景定位：儀式化交合，強調姿態服從（如跪舔、暴露宣誓）、體液標記、語言宣告歸屬。\n\n主角視角：\n- 世界是棋盤，所有人都是可被標記的棋子。\n- 支配即效率：屈服者獲得永續，不屈者被用盡。`
  },
  char: {
    title: 'Characters',
    icon: <FileText />,
    content: `# 五位女主角詳細設定\n\n所有角色：成年成熟女性，身材豐滿、氣場強勢，立繪強調曲線與威嚴。\n\n1. 絕對忠誠型（王座近侍）\n   - 名稱：薇爾緹（Velti）\n   - 外貌：銀長髮、冷豔軍裝、高挑軍事體型。\n   - 性格：沉默執行者，從一開始就渴望命令。\n   - 心理路徑：奉獻 → 儀式化臣服 → 主動要求標記。\n   - 關鍵詞：奉獻、儀式、宣誓。\n   - H定位：主動跪下張開雙腿，語線「請用您的精液標記我的子宮，作为永遠的誓約」。\n\n2. 理性交易型（策略顧問）\n   - 名稱：塞蕾娜（Serena）\n   - 外貌：黑長髮、知性眼鏡、緊身長袍凸顯胸臀。\n   - 性格：冷靜計算，一開始視主角為合作對象。\n   - 心理路徑：利益交換 → 發現掌控逆轉 → 自願獻上身體換取更高權力。\n   - 關鍵詞：交換、利益、掌控感逆轉。\n   - H定位：從後入式插入時低語「我的理性告訴我，這是最優解……請射進來，讓我徹底屬於您」。\n\n3. 崇拜信仰型（宗教代表）\n   - 名稱：艾莉婭（Elia）\n   - 外貌：金髮、聖潔長袍、優雅豐滿身材。\n   - 性格：精神潔癖，把主角視為唯一真理。\n   - 心理路徑：神格化 → 自我消解 → 用身體證明信仰。\n   - 關鍵詞：信仰、神格化、自我消解。\n   - H定位：傳教士體位眼神直視，喘息間宣告「您的精液是聖水，請灌滿我的子宮，讓我成為您的聖殿」。\n\n4. 抗拒轉化型（前敵對者）\n   - 名稱：卡米拉（Camilla）\n   - 外貌：紅短髮、女王裝甲、強勢驕傲體型。\n   - 性格：高傲戰士，從否定主角到被迫承認。\n   - 心理路徑：敗北 → 動搖 → 自尊重塑為歸屬。\n   - 關鍵詞：敗北、承認、重塑自尊。\n   - H定位：被壓制後強制高潮，語線「我……承認您是我的主人，請用您的肉棒懲罰我的傲慢，直到我乞求內射」。\n\n5. 扭曲依附型（情報／暗殺系）\n   - 名稱：莉絲（Lys）\n   - 外貌：紫髮、暴露皮衣、危險妖豔身材。\n   - 性格：情緒不穩，愛與恐懼交織。\n   - 心理路徑：依存 → 控制需求 → 錯位救贖。\n   - 關鍵詞：依存、控制、救贖錯位。\n   - H定位：騎乘位主動扭腰，語線「只有您的精液能平息我的瘋狂……請射進最深處，讓我永遠無法離開」。`
  },
  flow: {
    title: 'Story Flow',
    icon: <GitBranch />,
    content: `# 故事流程圖（Mermaid 語法）\n\ngraph TD\n    A[開始：觀察期] --> B[世界描述 + 女主角初登場<br>主角冷靜觀察，幾乎無親密]\n    B --> C[靠近期：合作/衝突/試探<br>女主角情緒偏移，開始產生渴求]\n    C --> D[歸屬期：身分轉換完成<br>H場景集中，心理宣告歸屬]\n    D --> E[個人主線結束：女主角徹底標記]\n\n    subgraph 支線系統\n        F[支線A：外族征戰] --> G[女代表戰敗 → 心理屈服 → 獻上族群<br>H：儀式化交合宣告新秩序]\n        H[支線B：心靈統治] --> I[女王主動庇護 → 私人交易 → 完全歸屬<br>H：多次內射標記]\n        J[支線C：制度重寫] --> K[改變婚姻/文化 → 女角成為象徵<br>H：公開儀式性交]\n    end\n\n    A --> F\n    A --> H\n    A --> J`
  },
  check: {
    title: 'Checklist',
    icon: <CheckSquare />,
    content: `# Phase 1 檢核表\n\n- [x] 世界觀文檔完成（符合支配合理化、露骨定位）\n- [x] 五女主角詳細設定（含H語線、心理路徑、關鍵詞）\n- [x] 故事流程圖（主線三階段 + 支線三類型）\n- [x] 所有內容符合七條鐵律（露骨、無血腥、主角上位、H服務心理）\n\n下一步：Phase 2 文本期（主線腳本撰寫）`
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