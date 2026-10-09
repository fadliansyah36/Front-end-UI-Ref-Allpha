import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Sparkles,
  HelpCircle,
  Compass,
  Check,
  Play
} from 'lucide-react';

interface ContentCapsuleScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ContentCapsuleScreen: React.FC<ContentCapsuleScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'ai_capsule' | 'comments'>('ai_capsule');
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 12 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('universe_feed')}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="font-display font-bold text-base text-white">Content Capsule</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-4 flex-1">
        {/* Media Preview Player Banner */}
        <div className="h-48 rounded-2xl bg-gradient-to-tr from-blue-950 via-indigo-950 to-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_70%)]" />
          {/* Play Icon */}
          <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/30">
            <Play className="w-6 h-6 fill-cyan-300 ml-0.5" />
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
            <span className="font-semibold text-white drop-shadow">4K Spatial Stream</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] text-cyan-300 border border-slate-700">
              04:22
            </span>
          </div>
        </div>

        {/* Title & Metadata matching Reference Screen 12 */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="text-cyan-400 font-bold">@techvision</span>
            <span>·</span>
            <span>2d ago</span>
            <span>·</span>
            <span>Quantum City District</span>
          </div>
          <h1 className="font-display font-extrabold text-xl text-white">The Future of AI Cities</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Architectural paradigms, living agents, and neural infrastructure for the Allpha Universe.
          </p>
        </div>

        {/* Tab switchers: Info | AI Capsule | Comments */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold pt-1">
          {(['info', 'ai_capsule', 'comments'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-2 capitalize transition-colors border-b-2 ${
                activeTab === t
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* AI Explanation Box matching Screen 12 Drawer */}
        <div className="p-4 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Spatial Explanation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This content explores how AI and human collaboration will shape future cities, including key technologies such as autonomous spatial systems, neural memory fabrics, and dynamic procedural districts.
          </p>
        </div>

        {/* Bottom 3 Action Buttons matching Reference Screen 12 */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={() => onNavigate('ask_universe')}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ask</span>
          </button>

          <button
            onClick={() => onNavigate('world_detail')}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className="py-3 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-blue-400" />}
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
