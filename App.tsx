import React, { useState, useEffect } from 'react';
import { BACKGROUNDS, CHARACTERS, INITIAL_SCRIPT } from './constants';
import { BackgroundId, CharacterId, GameState } from './types';
import { DialogueBox } from './components/DialogueBox';
import { CharacterSprite } from './components/CharacterSprite';
import { Button } from './components/ui/Button';
import { AiChatOverlay } from './components/AiChatOverlay';
import { Settings, Play, Save, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  // Application State
  const [started, setStarted] = useState(false);
  
  // Game State
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'start',
    history: [],
    flags: {},
    isAiChatActive: false,
    aiChatHistory: []
  });

  // Derived State
  const currentScene = INITIAL_SCRIPT[gameState.currentSceneId];
  const currentCharacter = currentScene ? CHARACTERS[currentScene.characterId] : null;
  const currentBg = currentScene && currentScene.backgroundId ? BACKGROUNDS[currentScene.backgroundId] : null;
  
  // Persistent Background Logic (Keep last background if not defined in current scene)
  const [activeBg, setActiveBg] = useState<string>(BACKGROUNDS[BackgroundId.CLASSROOM]);

  useEffect(() => {
    if (currentScene?.backgroundId) {
      setActiveBg(BACKGROUNDS[currentScene.backgroundId]);
    }
  }, [currentScene]);

  // Actions
  const handleStart = () => {
    setStarted(true);
    setGameState(prev => ({ ...prev, currentSceneId: 'start' }));
  };

  const handleNext = () => {
    if (!currentScene) return;

    // Handle Linear Progression
    if (currentScene.nextId && !currentScene.choices) {
      // Check for Special AI Mode Trigger
      const nextScene = INITIAL_SCRIPT[currentScene.nextId];
      if (nextScene?.isAiMode) {
        setGameState(prev => ({ ...prev, isAiChatActive: true, currentSceneId: currentScene.nextId! }));
        return;
      }

      setGameState(prev => ({
        ...prev,
        history: [...prev.history, prev.currentSceneId],
        currentSceneId: currentScene.nextId!
      }));
    }
  };

  const handleChoice = (nextId: string) => {
    const nextScene = INITIAL_SCRIPT[nextId];
    if (nextScene?.isAiMode) {
       setGameState(prev => ({ ...prev, isAiChatActive: true }));
       // We might not advance the scene ID immediately if we want to stay in "choice context", 
       // but for this engine, let's treat AI mode as an overlay state.
       return;
    }

    setGameState(prev => ({
      ...prev,
      history: [...prev.history, prev.currentSceneId],
      currentSceneId: nextId
    }));
  };

  const closeAiChat = () => {
    setGameState(prev => ({ ...prev, isAiChatActive: false }));
    // Ideally jump to a post-chat scene, but for demo we stay
  };

  // --- RENDERING ---

  // Main Menu
  if (!started) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-pulse"
          style={{ backgroundImage: `url(${BACKGROUNDS[BackgroundId.ROOFTOP]})`, filter: 'blur(4px) brightness(0.6)' }}
        />
        
        <div className="z-10 text-center space-y-8 p-10 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl">
          <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-vn-accent to-purple-400 drop-shadow-lg tracking-tight">
            AETHELGARD
          </h1>
          <p className="text-xl text-gray-300 font-sans tracking-[0.2em] uppercase">Visual Novel Engine Preview</p>
          
          <div className="flex flex-col gap-4 w-64 mx-auto pt-8">
            <Button onClick={handleStart} className="w-full py-4 text-lg">
              <Play className="inline-block mr-2 w-4 h-4" /> Start Game
            </Button>
            <Button variant="secondary" className="w-full">
              <Save className="inline-block mr-2 w-4 h-4" /> Load Game
            </Button>
            <Button variant="ghost" className="w-full">
              <Settings className="inline-block mr-2 w-4 h-4" /> Settings
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-4 text-gray-500 text-xs">
          Engine Version 0.1.0 | React + Tailwind + Gemini
        </div>
      </div>
    );
  }

  // Gameplay Screen
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      
      {/* 1. Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out z-0"
        style={{ backgroundImage: `url(${activeBg})` }}
      />
      <div className="absolute inset-0 bg-black/20 z-0" /> {/* Dimmer */}

      {/* 2. Character Layer */}
      <div className="absolute inset-0 z-10">
        <CharacterSprite 
          character={currentCharacter} 
          expression={currentScene?.characterExpression} 
        />
      </div>

      {/* 3. UI Layer (Dialogue & Choices) */}
      {!gameState.isAiChatActive && (
        <>
          {/* Choices Overlay */}
          {currentScene?.choices ? (
            <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
              <div className="flex flex-col gap-4 w-full max-w-lg p-4">
                {currentScene.choices.map((choice, idx) => (
                  <Button 
                    key={idx} 
                    onClick={() => handleChoice(choice.nextId)}
                    className="w-full py-6 text-xl text-left pl-8 hover:translate-x-2 transition-transform"
                  >
                    <span className="text-vn-accent mr-4">▶</span> {choice.text}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            /* Dialogue Box */
            <DialogueBox 
              character={currentCharacter}
              text={currentScene?.text || "..."}
              onNext={handleNext}
            />
          )}
        </>
      )}

      {/* 4. AI Chat Overlay */}
      {gameState.isAiChatActive && currentCharacter && (
        <AiChatOverlay 
          character={currentCharacter}
          onClose={closeAiChat}
        />
      )}

      {/* 5. System UI (Top Right) */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        <Button variant="secondary" className="px-3 py-1 text-xs" onClick={() => setStarted(false)}>
          MENU
        </Button>
        <Button variant="secondary" className="px-3 py-1 text-xs">
          AUTO
        </Button>
        <Button variant="secondary" className="px-3 py-1 text-xs">
          LOG
        </Button>
      </div>

    </div>
  );
};

export default App;