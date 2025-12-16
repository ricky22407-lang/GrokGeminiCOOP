import React, { useEffect, useState } from 'react';
import { CharacterConfig } from '../types';
import { ImageOff, Loader2 } from 'lucide-react';

interface CharacterSpriteProps {
  character: CharacterConfig | null;
  expression?: string;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ character, expression }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setLoaded(false);
    if (character) {
      setLoading(true);
      let source = character.avatar;
      if (expression && character.expressions && character.expressions[expression]) {
        source = character.expressions[expression];
      }
      setImgSrc(source);
    } else {
      setLoading(false);
    }
  }, [character, expression]);

  const handleLoad = () => {
    setLoading(false);
    setLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}. Likely broken link or CORS.`);
    setLoading(false);
    setHasError(true);
  };

  if (!character) return null;

  // Loading State
  if (loading && !loaded && !hasError) {
     return (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
     );
  }

  // Fallback UI when image fails
  if (hasError) {
    return (
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-end pb-20 animate-in fade-in duration-500"
        style={{ height: '90vh', width: '400px' }}
      >
        <div className="bg-gray-900/90 border-2 border-red-600/50 p-6 rounded text-center backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          <ImageOff className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-red-400 font-bold uppercase tracking-widest text-sm mb-1">Visual Signal Lost</p>
          <p className="text-gray-400 text-xs mb-2">Explicit Asset Blocked / Broken Link</p>
          <div className="text-[10px] text-gray-500 font-mono break-all bg-black/50 p-1 rounded mb-2">
            {imgSrc.substring(0, 40)}...
          </div>
          <div className="text-xs text-white/50 italic">
             (Character: {character.name})
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out z-10 ${
        loaded ? 'opacity-100 translate-y-0 filter brightness-100' : 'opacity-0 translate-y-8 filter brightness-50'
      }`}
      style={{ height: '90vh', pointerEvents: 'none' }}
    >
      <img 
        src={imgSrc} 
        alt={character.name}
        onLoad={handleLoad}
        onError={handleError}
        className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
};