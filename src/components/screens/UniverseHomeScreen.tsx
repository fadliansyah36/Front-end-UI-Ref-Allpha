import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  Search,
  Bell,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Globe,
  Radio,
  Flame,
  Palette
} from 'lucide-react';

interface UniverseHomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBlenderGenerator: () => void;
}

export const UniverseHomeScreen: React.FC<UniverseHomeScreenProps> = ({
  onNavigate,
  onOpenBlenderGenerator
}) => {
  const [activeTab, setActiveTab] = useState<'universe' | 'live' | 'for_you'>('universe');
  const [selectedCategory, setSelectedCategory] = useState<string>('Technology');

  const categories = [
    { name: 'Technology', count: '12 Worlds', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
    { name: 'Creative', count: '8 Worlds', color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
    { name: 'Business', count: '9 Worlds', color: 'text-blue-400 border-blue-500/40 bg-blue-950/40' },
    { name: 'Community', count: '10 Worlds', color: 'text-pink-400 border-pink-500/40 bg-pink-950/40' },
    { name: 'Gaming', count: '7 Worlds', color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40' },
    { name: 'Science', count: '11 Worlds', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950 pb-16">
      {/* 3D Cosmic Universe Canvas in Background */}
      <div className="absolute inset-0 z-0">
        <AllphaWorldRenderer
          preset="universe"
          interactive={true}
          showControlsOverlay={true}
          onNodeSelect={(nodeName) => setSelectedCategory(nodeName)}
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
      </div>

      {/* Top Header matching Reference Screen 3 */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-orbitron font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            ALLPHA.
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Spatial
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('galaxy_navigator')}
            className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
            title="Search Universe"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('universe_feed')}
            className="p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white relative"
            title="Moments"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs (Universe | Live | For You) */}
      <div className="relative z-10 px-5 py-1">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 w-fit mx-auto shadow-lg">
          <button
            onClick={() => setActiveTab('universe')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'universe'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Universe
          </button>
          <button
            onClick={() => {
              setActiveTab('live');
              onNavigate('live_experience');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>Live</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('for_you');
              onNavigate('universe_feed');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'for_you'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            For You
          </button>
        </div>
      </div>

      {/* Floating Category Pills overlaying the 3D scene */}
      <div className="relative z-10 px-5 flex-1 flex flex-col justify-between py-4 pointer-events-none">
        {/* Top Floating Nodes Pill */}
        <div className="flex justify-between items-start pointer-events-auto">
          <button
            onClick={() => {
              setSelectedCategory('Technology');
              onNavigate('world_detail');
            }}
            className="flex items-center gap-2 p-2 px-3 rounded-2xl glass-panel-glow border border-cyan-500/40 text-left hover:scale-105 transition-transform"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-xs">
              ⚡
            </div>
            <div>
              <div className="text-[11px] font-bold text-white">Technology</div>
              <div className="text-[9px] text-cyan-300">12 Worlds</div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('Creative');
              onNavigate('world_detail');
            }}
            className="flex items-center gap-2 p-2 px-3 rounded-2xl glass-panel-glow border border-purple-500/40 text-left hover:scale-105 transition-transform"
          >
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs">
              🎨
            </div>
            <div>
              <div className="text-[11px] font-bold text-white">Creative</div>
              <div className="text-[9px] text-purple-300">8 Worlds</div>
            </div>
          </button>
        </div>

        {/* Bottom Floating Card: Featured World preview */}
        <div className="pointer-events-auto space-y-2">
          {/* Quick theme pipeline banner */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-200 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Theme: <strong>Crystal AI City</strong> (V2 Golden)</span>
            </div>
            <button
              onClick={onOpenBlenderGenerator}
              className="text-cyan-400 hover:underline font-semibold flex items-center gap-0.5"
            >
              <span>Blender .py</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* World card */}
          <div className="p-3.5 rounded-2xl glass-panel-glow border border-cyan-500/30 backdrop-blur-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                <Globe className="w-3 h-3" />
                <span>Featured Hub</span>
              </div>
              <h3 className="font-display font-bold text-base text-white">Quantum City</h3>
              <p className="text-[11px] text-slate-400">12 Districts · 1.8K Agents · 25K Members</p>
            </div>

            <button
              onClick={() => onNavigate('world_detail')}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white font-bold text-xs shadow-md shadow-cyan-500/30 flex items-center gap-1.5 transition-all"
            >
              <span>Enter World</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
