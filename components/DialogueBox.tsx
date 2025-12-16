import React, { useEffect, useState } from 'react';
import { CharacterConfig } from '../types';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  character: CharacterConfig | null;
  text: string;
  onNext: () => void;
  isTyping?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ character, text, onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset typewriter on new text
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Click to complete immediately or go next
  const handleClick = () => {
    if (currentIndex < text.length) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    } else {
      onNext();
    }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20"
      onClick={handleClick}
    >
      {/* Name Box */}
      {character && character.name && (
        <div 
          className="w-fit px-8 py-2 mb-0 transform translate-y-2 z-10 relative"
          style={{ backgroundColor: character.color }}
        >
          <span className="text-white font-bold text-xl uppercase tracking-wider text-shadow">
            {character.name}
          </span>
        </div>
      )}

      {/* Text Box */}
      <div className="w-full h-48 bg-vn-glass border-t-2 border-white/20 backdrop-blur-md rounded-sm p-6 relative shadow-2xl flex flex-col cursor-pointer hover:border-white/40 transition-colors">
        <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-100 font-sans tracking-wide">
          {displayedText}
          <span className="animate-pulse inline-block ml-1">|</span>
        </p>

        {/* Continue Indicator */}
        {currentIndex >= text.length && (
          <div className="absolute bottom-4 right-4 animate-bounce">
            <ChevronRight className="w-8 h-8 text-vn-accent" />
          </div>
        )}
      </div>
    </div>
  );
};