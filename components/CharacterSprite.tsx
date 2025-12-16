import React, { useEffect, useState } from 'react';
import { CharacterConfig } from '../types';
import { ImageOff } from 'lucide-react';

interface CharacterSpriteProps {
  character: CharacterConfig | null;
  expression?: string;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ character, expression }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false); // Reset error state on change
    if (character) {
      let source = character.avatar;
      if (expression && character.expressions && character.expressions[expression]) {
        source = character.expressions[expression];
      }
      setImgSrc(source);
      // Small delay for fade in animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [character, expression]);

  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}. Likely CORS or Hotlink protection.`);
    setHasError(true);
  };

  if (!character) return null;

  // Fallback UI when image fails to load (e.g. Hotlink protection)
  if (hasError) {
    return (
      <div 
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-end pb-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ height: '90vh', width: '400px' }}
      >
        <div className="bg-gray-900/80 border border-red-500/50 p-6 rounded text-center backdrop-blur-sm">
          <ImageOff className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-red-400 font-bold uppercase tracking-widest text-sm mb-1">Visual Signal Lost</p>
          <p className="text-gray-400 text-xs mb-2">Remote Asset Blocked (CORS)</p>
          <div className="text-xs text-gray-500 font-mono break-all bg-black/50 p-1 rounded">
            {imgSrc.substring(0, 30)}...
          </div>
          <a href={imgSrc} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-blue-400 hover:text-blue-300 underline">
            Open Original Link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out z-10 ${
        isVisible ? 'opacity-100 translate-y-0 filter brightness-100' : 'opacity-0 translate-y-8 filter brightness-50'
      }`}
      style={{ height: '90vh', pointerEvents: 'none' }}
    >
      <img 
        src={imgSrc} 
        alt={character.name}
        onError={handleError}
        className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
};