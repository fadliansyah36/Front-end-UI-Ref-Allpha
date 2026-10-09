import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Users,
  Bot,
  MapPin,
  ArrowRight,
  Radio,
  FileText
} from 'lucide-react';

interface WorldDetailScreenProps {
  onNavigate: (screen: ScreenId) => void;
  worldId?: string;
}

export const WorldDetailScreen: React.FC<WorldDetailScreenProps> = ({
  onNavigate,
  worldId = 'quantum_city'
}) => {
  const [activeTab, setActiveTab] = useState<'districts' | 'people' | 'live' | 'content'>('districts');

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* 3D World Skyline Header Viewport */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-900">
        <AllphaWorldRenderer preset="world" interactive={true} showControlsOverlay={true} />

        {/* Top Floating Action Bar */}
        <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between">
          <button
            onClick={() => onNavigate('galaxy_navigator')}
            className="p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* World Identity & Stats matching Screen 5 */}
      <div className="px-5 -mt-6 relative z-10 space-y-4">
        {/* World Badge & Name */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Future AI Innovation
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Theme: Crystal AI City
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl text-white">Quantum City</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            A next-generation city where humans and AI create, collaborate and build a better future together in real-time spatial sync.
          </p>
        </div>

        {/* 3 Metric Pills matching Reference */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl glass-panel-glow border border-slate-800 text-center">
          <div>
            <div className="text-base font-bold text-white font-orbitron">12</div>
            <div className="text-[10px] text-slate-400">Districts</div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-base font-bold text-cyan-400 font-orbitron">1.8K</div>
            <div className="text-[10px] text-slate-400">Agents</div>
          </div>
          <div>
            <div className="text-base font-bold text-purple-400 font-orbitron">25K</div>
            <div className="text-[10px] text-slate-400">Members</div>
          </div>
        </div>

        {/* Primary Action Button: Enter World */}
        <button
          onClick={() => onNavigate('district_selection')}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <span>Enter World</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Content Tabs (Districts | People | Live | Content) */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('districts')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'districts' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Districts (12)
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'people' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            People & Agents
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'live' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Live Stages
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'content' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Capsules
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'districts' && (
          <div className="space-y-2.5 pt-1">
            {[
              { name: 'AI Innovation District', tag: '1.2K online', desc: 'Autonomous labs, hackathons, smart city nodes' },
              { name: 'Creator District', tag: '890 online', desc: 'Spatial 3D fashion, generative architecture & sound' },
              { name: 'Marketplace District', tag: '812 online', desc: 'Agent hiring, service contracts, 3D theme store' },
            ].map((d) => (
              <div
                key={d.name}
                onClick={() => onNavigate('district_view_3d')}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{d.name}</div>
                  <div className="text-[10px] text-slate-400">{d.desc}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-medium block">{d.tag}</span>
                  <span className="text-cyan-400 text-xs font-bold group-hover:translate-x-0.5 inline-block transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="space-y-2 text-xs">
            <div
              onClick={() => onNavigate('my_agent')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center font-bold text-purple-300">
                  L
                </div>
                <div>
                  <div className="font-bold text-white">Luna @LunaAI</div>
                  <div className="text-[10px] text-slate-400">Creative Assistant · Online</div>
                </div>
              </div>
              <span className="text-[10px] text-cyan-400 font-semibold">Inspect</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
