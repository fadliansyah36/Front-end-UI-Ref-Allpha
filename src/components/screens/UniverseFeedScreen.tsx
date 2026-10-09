import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Search,
  Bell,
  Play,
  ArrowRight
} from 'lucide-react';

interface UniverseFeedScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const UniverseFeedScreen: React.FC<UniverseFeedScreenProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'for_you' | 'following' | 'worlds'>('for_you');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(2400);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950 pb-16">
      {/* Top Feed App Bar matching Screen 11 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-base text-white">Universe Moments</h2>
          <div className="flex items-center gap-3 text-xs font-semibold mt-1">
            {(['for_you', 'following', 'worlds'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`capitalize transition-colors ${
                  tab === t ? 'text-cyan-400 border-b border-cyan-400 pb-0.5' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('galaxy_navigator')}
            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Full-Height Spatial Moment Card */}
      <div className="relative flex-1 p-4 flex flex-col justify-end overflow-hidden">
        {/* Background Visual Graphic matching Reference Screen 11 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-950 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_75%)]" />

          {/* Central 3D Celestial Orbital Rings */}
          <div className="relative w-64 h-64 rounded-full border border-cyan-400/40 flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
            <div className="w-48 h-48 rounded-full border border-purple-500/40" />
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-600/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.5)]">
              <Play className="w-8 h-8 text-white fill-white ml-1 opacity-80" />
            </div>
          </div>
        </div>

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Right Vertical Action Bar matching Reference */}
        <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-4">
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-rose-400 transition-colors"
          >
            <div className={`w-11 h-11 rounded-full ${liked ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-900/80 text-white'} border border-slate-700 backdrop-blur-md flex items-center justify-center`}>
              <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500' : ''}`} />
            </div>
            <span className="text-[10px] font-bold">{(likesCount / 1000).toFixed(1)}k</span>
          </button>

          <button
            onClick={() => onNavigate('content_capsule')}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">128</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-purple-400 transition-colors">
            <div className="w-11 h-11 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">342</span>
          </button>
        </div>

        {/* Post Copy and Creator Bio matching Reference */}
        <div className="relative z-10 max-w-xs space-y-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center font-bold text-xs text-white">
              aV
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white">@astroVisual</span>
              <span className="text-[10px] text-cyan-300 block">Quantum City Explorer</span>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            Exploring the new frontier. Quantum City at night 🪐✨ Seamless spatial navigation and living agents.
          </p>

          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">#AI</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">#Space</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300">#Future</span>
          </div>

          {/* Quick link to Content Capsule */}
          <button
            onClick={() => onNavigate('content_capsule')}
            className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors"
          >
            <span>Inspect Content Capsule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
