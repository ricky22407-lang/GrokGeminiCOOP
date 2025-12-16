import React, { useState, useEffect } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers, Folder, FolderOpen, Mic, Music, Volume2, PlayCircle, ShieldCheck, ClipboardCheck, Activity, Search, FileSearch, Flag, Code, Play, Save, Download, RotateCcw } from 'lucide-react';
import { DialogueBox } from './components/DialogueBox';
import { CharacterSprite } from './components/CharacterSprite';
import { AiChatOverlay } from './components/AiChatOverlay';
import { CHARACTERS, BACKGROUNDS, INITIAL_SCRIPT } from './constants';
import { BackgroundId, CharacterId, GameState, SaveSlot } from './types';

// Asset Data Updated for Knight Route
const ASSET_PREVIEWS = {
  velti: [
    { name: 'stand_normal.png', url: 'local/velti/stand.png', size: '1.2MB' },
    { name: 'cg_kneel.jpg', url: 'local/velti/cg_kneel.jpg', size: '2.5MB' },
    { name: 'cg_bj.jpg', url: 'local/velti/cg_bj.jpg', size: '2.1MB' },
  ],
  knight: [
    { name: 'stand_armor.png', url: 'local/knight/stand.png', size: '1.4MB' },
    { name: 'cg_bound.jpg', url: 'local/knight/cg_bound.jpg', size: '2.3MB' },
    { name: 'cg_broken.jpg', url: 'local/knight/cg_broken.jpg', size: '2.6MB' },
  ]
};

const DOCS: any = {
  readme: {
    title: 'README (V5.1 Update)',
    icon: <Book />,
    phase: 1,
    type: 'markdown',
    content: `# Dominion：沉默王座 v5.1\n\n## 新增內容\n- **素材包 V1 整合**：Velti 路線全美術替換。\n- **女騎士路線 (Knight)**：實裝 7 階段調教腳本。\n- **系統更新**：新增 Save/Load 功能。\n\n## Ren'Py 導出\n點擊下方 Export 分頁獲取包含雙路線的完整腳本。`
  },
  renpy_export: {
    title: 'Export: script.rpy',
    icon: <Code />,
    phase: 6,
    type: 'code',
    content: `
# Dominion: Silent Throne - Full Beta Script
# Generated from Web Prototype v5.1

# Character Definitions
define v = Character("薇爾緹", color="#e2e8f0", voice_tag="velti")
define k = Character("卡米拉", color="#ef4444", voice_tag="knight")
define narrator = Character(None)

# Backgrounds
image bg throne = "bg/throne_room.jpg"
image bg dungeon = "bg/dungeon_room.jpg"

# Velti Assets
image velti stand = "velti/stand_normal.png"
image cg velti_kneel = "velti/cg_kneel.jpg"
image cg velti_bj = "velti/cg_bj.jpg"
image cg velti_cowgirl = "velti/cg_cowgirl.jpg"
image cg velti_squirt = "velti/cg_squirt.jpg"

# Knight Assets
image knight stand = "knight/stand_armor.png"
image cg knight_bound = "knight/cg_bound.jpg"
image cg knight_humiliation = "knight/cg_humiliation.jpg"
image cg knight_oral = "knight/cg_oral.jpg"
image cg knight_bdsm = "knight/cg_bdsm.jpg"
image cg knight_cowgirl = "knight/cg_cowgirl.jpg"
image cg knight_squirt = "knight/cg_squirt.jpg"

label start:
    scene bg throne with fade
    "Dominion: Silent Throne"
    "選擇你的征服對象。"
    
    menu:
        "【薇爾緹】絕對忠誠路線":
            jump v_start
        "【卡米拉】傲慢騎士路線":
            jump k_start

label v_start:
    # Velti script content...
    jump v_scene1

label k_start:
    # Knight script content...
    jump k_scene1

# Note: Full node logic is handled by the web engine state machine.
# Copy specific node blocks from constants.ts to expand.
`
  }
};

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [showAiChat, setShowAiChat] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [mode, setMode] = useState<'docs' | 'play'>('docs');
  const [saves, setSaves] = useState<SaveSlot[]>([]);

  // Load saves from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dominion_saves');
    if (saved) {
      setSaves(JSON.parse(saved));
    }
  }, []);

  const currentNode = INITIAL_SCRIPT[currentNodeId] || INITIAL_SCRIPT['start'];
  const currentCharacter = currentNode.characterId !== CharacterId.NONE ? CHARACTERS[currentNode.characterId] : null;
  const currentBackground = currentNode.backgroundId ? BACKGROUNDS[currentNode.backgroundId] : BACKGROUNDS[BackgroundId.THRONE];

  const handleNext = () => {
    if (currentNode.choices && currentNode.choices.length > 0) return;
    if (currentNode.nextId) {
      setCurrentNodeId(currentNode.nextId);
    }
  };

  const handleChoice = (nextId: string) => {
    setCurrentNodeId(nextId);
  };

  const saveGame = (slotId: number) => {
    const newSave: SaveSlot = {
      id: slotId,
      date: new Date().toLocaleString(),
      nodeId: currentNodeId,
      previewText: currentNode.text.substring(0, 30) + '...'
    };
    const newSaves = [...saves.filter(s => s.id !== slotId), newSave].sort((a, b) => a.id - b.id);
    setSaves(newSaves);
    localStorage.setItem('dominion_saves', JSON.stringify(newSaves));
    alert(`Game saved to Slot ${slotId}`);
    setShowSaveMenu(false);
  };

  const loadGame = (slotId: number) => {
    const save = saves.find(s => s.id === slotId);
    if (save) {
      setCurrentNodeId(save.nodeId);
      setShowSaveMenu(false);
      setMode('play');
    }
  };

  const renderGame = () => (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
      {/* Background with Transition */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentBackground})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Character */}
      <CharacterSprite 
        character={currentCharacter} 
        expression={currentNode.characterExpression} 
      />

      {/* UI Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        {/* Top Bar */}
        <div className="w-full p-4 flex justify-between items-start pointer-events-auto bg-gradient-to-b from-black/80 to-transparent z-40">
          <div className="flex gap-2">
             <button onClick={() => setMode('docs')} className="text-white/70 hover:text-white bg-black/40 px-3 py-1 rounded text-xs border border-white/20">EXIT</button>
             <div className="text-white/50 text-xs font-mono p-1 px-2 bg-black/40 rounded border border-white/10 flex items-center gap-2">
               <span>SCENE: {currentNodeId}</span>
             </div>
          </div>
          
          <div className="flex gap-2">
             <button 
                onClick={() => setShowSaveMenu(!showSaveMenu)}
                className="bg-gray-800 text-white px-3 py-1 rounded-sm border border-white/20 hover:bg-gray-700 transition flex items-center gap-2 text-xs"
             >
                <Save size={12} /> SYSTEM
             </button>
             {currentCharacter && currentCharacter.id !== CharacterId.SYSTEM && currentCharacter.id !== CharacterId.NONE && (
                <button 
                  onClick={() => setShowAiChat(true)}
                  className="bg-vn-accent text-white px-4 py-1 rounded-sm border border-red-500/50 shadow-[0_0_10px_rgba(225,29,72,0.3)] hover:bg-rose-700 transition flex items-center gap-2 text-xs uppercase tracking-wider animate-pulse"
                >
                  <Activity size={12} /> Neural Link
                </button>
             )}
          </div>
        </div>

        {/* Save Menu Overlay */}
        {showSaveMenu && (
          <div className="absolute top-14 right-4 w-64 bg-gray-900/95 border border-red-900/50 rounded p-4 pointer-events-auto z-50 backdrop-blur-md shadow-2xl">
            <h3 className="text-red-500 text-sm font-bold mb-3 uppercase tracking-wider border-b border-red-900/30 pb-2">Data Management</h3>
            <div className="space-y-2">
              {[1, 2, 3].map(slot => {
                const save = saves.find(s => s.id === slot);
                return (
                  <div key={slot} className="group border border-gray-700 rounded bg-black/50 overflow-hidden">
                    <div className="p-2 text-xs text-gray-400 flex justify-between bg-gray-800/50">
                      <span>SLOT {slot}</span>
                      <span>{save?.date || 'EMPTY'}</span>
                    </div>
                    {save && <div className="p-2 text-xs text-gray-500 truncate">{save.previewText}</div>}
                    <div className="flex">
                      <button onClick={() => saveGame(slot)} className="flex-1 bg-gray-800 hover:bg-blue-900 text-white/70 py-1 text-xs transition-colors">SAVE</button>
                      <button onClick={() => loadGame(slot)} disabled={!save} className="flex-1 bg-gray-800 hover:bg-green-900 text-white/70 py-1 text-xs transition-colors disabled:opacity-30 disabled:hover:bg-gray-800">LOAD</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Choices */}
        {currentNode.choices && currentNode.choices.length > 0 && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-[3px] pointer-events-auto animate-in fade-in duration-300">
             <h2 className="text-red-500 text-2xl font-bold mb-4 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">Fate Decision</h2>
             {currentNode.choices.map((choice, idx) => (
               <button
                 key={idx}
                 onClick={() => handleChoice(choice.nextId)}
                 className="w-full max-w-xl bg-gradient-to-r from-transparent via-red-900/40 to-transparent border-y border-red-500/30 text-white py-4 px-8 text-lg font-medium hover:bg-red-900/60 hover:border-red-400 transition-all duration-200 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,0,0,0.8)]"
               >
                 {choice.text}
               </button>
             ))}
          </div>
        )}

        {/* Dialogue */}
        <div className="pointer-events-auto">
          <DialogueBox 
            character={currentCharacter} 
            text={currentNode.text} 
            onNext={handleNext}
          />
        </div>
      </div>

      {/* AI Chat */}
      {showAiChat && currentCharacter && (
        <AiChatOverlay 
          character={currentCharacter} 
          onClose={() => setShowAiChat(false)} 
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col h-screen z-50">
        <h1 className="text-2xl font-bold text-red-600 mb-2 tracking-widest uppercase">Dominion</h1>
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">H-Engine v5.1</div>
        
        <div className="space-y-6 flex-1">
          <div className="bg-gray-900 p-1 rounded-lg flex mb-6">
            <button onClick={() => setMode('docs')} className={`flex-1 py-2 text-xs font-bold uppercase rounded ${mode === 'docs' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>Files</button>
            <button onClick={() => { setMode('play'); setCurrentNodeId('start'); }} className={`flex-1 py-2 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 ${mode === 'play' ? 'bg-red-900 text-white' : 'text-gray-500'}`}><Play size={10} /> Run</button>
          </div>

          {mode === 'docs' && (
             <>
               <div className="mb-4">
                 <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-4">Assets (Loaded)</h3>
                 <div className="text-xs text-gray-500 px-4 space-y-1">
                   <div className="flex items-center gap-2"><FolderOpen size={10} className="text-green-500"/> /velti (OK)</div>
                   <div className="flex items-center gap-2"><FolderOpen size={10} className="text-green-500"/> /knight (OK)</div>
                   <div className="flex items-center gap-2"><FolderOpen size={10} className="text-green-500"/> /bg (OK)</div>
                 </div>
               </div>
               
               <button onClick={() => {
                   const content = DOCS['renpy_export'].content;
                   navigator.clipboard.writeText(content);
                   alert('Copied to clipboard!');
               }} className="w-full flex items-center gap-3 px-4 py-2 rounded text-sm bg-purple-900/20 text-purple-400 border border-purple-500/50 hover:bg-purple-900/40 transition-all">
                  <Code size={14} /> Export Script
               </button>
             </>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-hidden relative bg-black flex flex-col">
        {mode === 'docs' ? (
          <div className="flex-1 p-12 overflow-y-auto">
             <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-2xl">
               <pre className="font-mono whitespace-pre-wrap text-gray-300">{DOCS['readme'].content}</pre>
             </div>
          </div>
        ) : (
          renderGame()
        )}
      </main>
    </div>
  );
};

export default App;