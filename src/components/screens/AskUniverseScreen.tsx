import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Search,
  Sparkles,
  HelpCircle,
  Mic,
  Send,
  Compass,
  ArrowRight
} from 'lucide-react';

interface AskUniverseScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AskUniverseScreen: React.FC<AskUniverseScreenProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const promptChips = [
    'What is this about?',
    'Explain this simply',
    'Find related worlds',
    'Meet the creator agent',
    'Explore this topic'
  ];

  const handleAsk = (text?: string) => {
    const q = text || query;
    if (!q.trim()) return;

    setAnswers((prev) => [
      ...prev,
      `Q: "${q}"\n\nA: Allpha Spatial AI: Quantum City leverages decentralized generative districts with persistent memory across 1.8K active agents. Themes are built using the canonical Blender Python pipeline and rendered smoothly via Three.js in your PWA.`
    ]);
    if (!text) setQuery('');
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 13 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center gap-2">
        <button
          onClick={() => onNavigate('content_capsule')}
          className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-display font-bold text-base text-white">Ask this Universe</h2>
          <p className="text-[10px] text-cyan-400 font-semibold">Grounded AI Spatial Knowledge</p>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 space-y-5 flex-1">
        {/* Visual Crystalline Emblem */}
        <div className="text-center py-4 space-y-2">
          <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-400/40 mx-auto flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Ask Anything About Allpha</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Interact with spatial intelligences, query world lore, district economics, or 3D theme pipelines.
          </p>
        </div>

        {/* Suggestion Prompt Chips matching Reference Screen 13 */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
            Prompt Suggestions
          </span>
          <div className="space-y-2">
            {promptChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleAsk(chip)}
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-left text-xs text-slate-200 hover:text-white flex items-center justify-between group transition-all"
              >
                <span>{chip}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Response History */}
        {answers.length > 0 && (
          <div className="space-y-3 pt-2">
            {answers.map((ans, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl glass-panel-glow border border-cyan-500/30 text-xs leading-relaxed text-slate-200 whitespace-pre-line animate-fadeIn">
                {ans}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Input Field matching Screen 13 */}
      <div className="sticky bottom-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="w-full py-2.5 pl-3.5 pr-9 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 transition-transform active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
