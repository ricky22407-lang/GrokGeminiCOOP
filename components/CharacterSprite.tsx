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
      // Small delay for fade in
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [character]);

  if (!character) return null;

  return (
    <div 
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out z-10 ${
        isVisible ? 'opacity-100 translate-y-0 filter brightness-100' : 'opacity-0 translate-y-8 filter brightness-50'
      }`}
      style={{ height: '90vh', pointerEvents: 'none' }}
    >
      <img 
        src={character.avatar} 
        alt={character.name}
        className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
      />
      
      {/* Expression Debug Overlay (Hidden in Production) */}
      {/* 
      {expression && (
        <div className="absolute top-10 right-10 bg-red-900/80 text-xs px-2 py-1 rounded text-white border border-red-500">
          State: {expression}
        </div>
      )} 
      */}
    </div>
  );
};