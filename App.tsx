import React, { useState, useEffect, useRef } from 'react';
import { FileText, CheckSquare, GitBranch, Map, Book, File, Image, Palette, Layers, Folder, FolderOpen, Mic, Music, Volume2, PlayCircle, ShieldCheck, ClipboardCheck, Activity, Search, FileSearch, Flag, Code, Play, Save, Download, RotateCcw, AlertTriangle } from 'lucide-react';
import { DialogueBox } from './components/DialogueBox';
import { CharacterSprite } from './components/CharacterSprite';
import { AiChatOverlay } from './components/AiChatOverlay';
import { CHARACTERS, BACKGROUNDS, INITIAL_SCRIPT } from './constants';
import { BackgroundId, CharacterId, GameState, SaveSlot, VisualEffect } from './types';

// Asset manifest for Docs
const ASSET_PREVIEWS = {
  velti: [
    { name: 'velti_normal', url: CHARACTERS[CharacterId.VELTI].avatar, size: 'EXT' },
    { name: 'velti_bj', url: BACKGROUNDS[BackgroundId.CG_VELTI_BJ], size: 'EXT' },
    { name: 'velti_squirt', url: BACKGROUNDS[BackgroundId.CG_VELTI_SQUIRT], size: 'EXT' },
  ],
  knight: [
    { name: 'knight_broken', url: CHARACTERS[CharacterId.KNIGHT].avatar, size: 'EXT' },
    { name: 'knight_oral', url: BACKGROUNDS[BackgroundId.CG_KNIGHT_ORAL], size: 'EXT' },
    { name: 'knight_squirt', url: BACKGROUNDS[BackgroundId.CG_KNIGHT_SQUIRT], size: 'EXT' },
  ]
};

const DOCS: any = {
  readme: {
    title: 'README (V7.0 Stable)',
    icon: <Book />,
    phase: 1,
    type: 'markdown',
    content: `# Dominion：沉默王座 v7.0 (Stable)\n\n## 最終視覺實裝\n- **Stable Hotlinks**: 更新為 Catbox 直鏈。\n- **Smart Loading**: 確保特效與圖片載入同步。\n- **H-Core**: Explicit 內容完整實裝。\n\n## 警告\n本版本包含極度露骨內容 (Explicit)。請確保您已成年。`
  },
  renpy_export: {
    title: 'Export: script.rpy',
    icon: <Code />,
    phase: 6,
    type: 'code',
    content: `
# Dominion: Silent Throne - Ren'Py Export
# Generated from Web Prototype v7.0

define v = Character("薇爾緹", color="#e2e8f0", voice_tag="velti")
define k = Character("卡米拉", color="#ef4444", voice_tag="knight")

# Images mapped from Constants
image cg velti_bj = "velti_bj.jpg"
image cg velti_squirt = "velti_squirt.jpg"
image cg knight_oral = "knight_oral.jpg"
image cg knight_squirt = "knight_squirt.jpg"

label start:
    play music "bgm_throne.mp3"
    "Dominion: Silent Throne"
    menu:
        "薇爾緹路線":
            jump v_start
        "卡米拉路線":
            jump k_start
`
  }
};

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [showAiChat, setShowAiChat] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [mode, setMode] = useState<'docs' | 'play'>('docs');
  const [saves, setSaves] = useState<SaveSlot[]>([]);
  
  // Background State
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);
  
  // Animation Key
  const [animKey, setAnimKey] = useState(0);

  // Audio Ref
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('dominion_saves');
    if (saved) {
      setSaves(JSON.parse(saved));
    }
    // Initialize audio
    sfxRef.current = new Audio();
    bgmRef.current = new Audio();
    bgmRef.current.loop = true;
  }, []);

  const currentNode = INITIAL_SCRIPT[currentNodeId] || INITIAL_SCRIPT['start'];
  const currentCharacter = currentNode.characterId !== CharacterId.NONE ? CHARACTERS[currentNode.characterId] : null;
  const currentBackground = currentNode.backgroundId ? BACKGROUNDS[currentNode.backgroundId] : BACKGROUNDS[BackgroundId.THRONE];

  // Effect Trigger for Node Change
  useEffect(() => {
    setAnimKey(prev => prev + 1);
    setBgError(false); 
    setBgLoaded(false); // Reset load state

    // Handle Music
    if (currentNode.music && bgmRef.current) {
        if (!bgmRef.current.src.includes(currentNode.music)) {
            bgmRef.current.src = currentNode.music;
            bgmRef.current.volume = 0.3;
            bgmRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
    }

    // Handle SFX / Voice
    if ((currentNode.sfx || currentNode.voice) && sfxRef.current) {
        const audioSrc = currentNode.voice || currentNode.sfx;
        if (audioSrc) {
            sfxRef.current.src = audioSrc;
            sfxRef.current.volume = 0.6;
            sfxRef.current.play().catch(e => console.log("SFX autoplay blocked", e));
        }
    }

  }, [currentNodeId, currentNode]);

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

  const getVisualEffectClass = (effect?: VisualEffect) => {
    // Only apply animation if background is loaded to avoid weird jumps
    if (!bgLoaded) return '';
    
    switch (effect) {
      case 'zoom-slow': return 'animate-zoom-slow';
      case 'zoom-in-hard': return 'animate-zoom-hard';
      case 'pan-up': return 'animate-pan-up';
      case 'shake': return 'animate-shake';
      case 'flash-white': return 'animate-flash';
      default: return '';
    }
  };

  const renderGame = () => (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
      <style>{`
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes zoomHard {
          0% { transform: scale(1); filter: brightness(1); }
          100% { transform: scale(1.4); filter: brightness(1.1); }
        }
        @keyframes panUp {
          0% { background-position: center bottom; transform: scale(1.1); }
          100% { background-position: center center; transform: scale(1.1); }
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes flash {
          0% { opacity: 0; background-color: white; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-zoom-slow { animation: zoomSlow 15s ease-out forwards; }
        .animate-zoom-hard { animation: zoomHard 4s ease-out forwards; }
        .animate-pan-up { animation: panUp 8s ease-out forwards; }
        .animate-shake { animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-flash { animation: flash 0.8s ease-out; }
      `}</style>

      {/* Background Layer with Effects & Fallback */}
      {!bgError ? (
        <div 
            key={`bg-${animKey}`}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out ${getVisualEffectClass(currentNode.visualEffect)}`}
            style={{ 
                backgroundImage: `url(${currentBackground})`,
                opacity: bgLoaded ? 1 : 0 
            }}
        >
            {/* Hidden image to track load/error state */}
            <img 
                src={currentBackground} 
                onLoad={() => setBgLoaded(true)}
                onError={() => setBgError(true)} 
                className="hidden" 
                alt="bg-loader"
            />
            <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gray-900 flex items-center justify-center animate-pulse">
            <div className="text-center p-8 border border-red-900/50 rounded bg-black/50">
                <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4"/>
                <h2 className="text-xl text-red-500 font-bold uppercase tracking-widest">Background Signal Lost</h2>
                <p className="text-gray-500 text-sm mt-2">Remote asset blocked. Visualizing via Neural Interface.</p>
                <div className="text-[10px] text-gray-600 mt-2 font-mono">{currentBackground}</div>
            </div>
        </div>
      )}
      
      {/* Flash Overlay Effect - Triggers regardless of BG load to maintain impact */}
      {currentNode.visualEffect === 'flash-white' && (
        <div key={`flash-${animKey}`} className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none" />
      )}

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
               <span>NODE: {currentNodeId}</span>
               {currentNode.visualEffect && <span className="text-red-400 text-[10px] border border-red-500/50 px-1 rounded">FX: {currentNode.visualEffect}</span>}
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

        {/* Save Menu */}
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
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">H-Engine v7.0</div>
        
        <div className="space-y-6 flex-1">
          <div className="bg-gray-900 p-1 rounded-lg flex mb-6">
            <button onClick={() => setMode('docs')} className={`flex-1 py-2 text-xs font-bold uppercase rounded ${mode === 'docs' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}>Files</button>
            <button onClick={() => { setMode('play'); setCurrentNodeId('start'); }} className={`flex-1 py-2 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 ${mode === 'play' ? 'bg-red-900 text-white' : 'text-gray-500'}`}><Play size={10} /> Run</button>
          </div>

          {mode === 'docs' && (
             <>
               <div className="mb-4">
                 <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-4">Remote Assets</h3>
                 <div className="text-xs text-gray-500 px-4 space-y-1">
                   {ASSET_PREVIEWS.velti.map(a => (
                     <div key={a.name} className="flex items-center gap-2 text-red-400 break-all"><FolderOpen size={10}/> {a.name}</div>
                   ))}
                   {ASSET_PREVIEWS.knight.map(a => (
                      <div key={a.name} className="flex items-center gap-2 text-red-400 break-all"><FolderOpen size={10}/> {a.name}</div>
                   ))}
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