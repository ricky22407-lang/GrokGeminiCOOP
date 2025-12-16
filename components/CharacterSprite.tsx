import React, { useEffect, useState } from 'react';
import { CharacterConfig } from '../types';

interface CharacterSpriteProps {
  character: CharacterConfig | null;
  expression?: string;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ character, expression }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (character) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [character]);

  if (!character) return null;

  return (
    <div 
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ height: '85vh', pointerEvents: 'none' }}
    >
      {/* Placeholder Image Logic */}
      <img 
        src={character.avatar} 
        alt={character.name}
        className="h-full w-auto object-contain drop-shadow-2xl"
        // In a real app, 'expression' would change the src
      />
      
      {/* Expression Overlay (Visual Debug for Demo) */}
      {expression && (
        <div className="absolute top-10 right-10 bg-black/50 text-xs px-2 py-1 rounded text-white">
          Debug: {expression}
        </div>
      )}
    </div>
  );
};