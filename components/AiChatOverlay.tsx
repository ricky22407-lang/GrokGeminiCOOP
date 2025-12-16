import React, { useState, useRef, useEffect } from 'react';
import { CharacterConfig } from '../types';
import { generateCharacterResponse } from '../services/geminiService';
import { Button } from './ui/Button';
import { X, Send, Loader2 } from 'lucide-react';

interface AiChatOverlayProps {
  character: CharacterConfig;
  onClose: () => void;
}

export const AiChatOverlay: React.FC<AiChatOverlayProps> = ({ character, onClose }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', parts: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setLoading(true);

    const newHistory = [...messages, { role: 'user' as const, parts: userMsg }];
    setMessages(newHistory);

    const responseText = await generateCharacterResponse(character, newHistory, userMsg);
    
    setMessages([...newHistory, { role: 'model' as const, parts: responseText }]);
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-white/20 rounded-lg shadow-2xl flex flex-col h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-800 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-lg font-bold text-white tracking-widest">
              LIVE LINK // {character.name.toUpperCase()}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p>Initialize conversation with {character.name}...</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-vn-accent text-white rounded-br-none' 
                    : 'bg-gray-700 text-gray-100 rounded-bl-none'
                }`}
              >
                {msg.parts}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-gray-400 text-xs">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-gray-800 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-vn-accent"
          />
          <Button onClick={handleSend} disabled={loading} className="px-4">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};