import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  MessageSquare,
  Compass,
  Star,
  Sparkles,
  Share2,
  ExternalLink,
  Layers,
  Palette
} from 'lucide-react';

interface BoothViewScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const BoothViewScreen: React.FC<BoothViewScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'portfolio' | 'events'>('overview');

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Booth Header Banner */}
      <div className="relative h-56 w-full bg-gradient-to-tr from-indigo-950 via-purple-950 to-slate-900 overflow-hidden">
        {/* Glow circles & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,132,252,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Back and Share buttons */}
        <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between">
          <button
            onClick={() => onNavigate('district_view_3d')}
            className="p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar and Online Status */}
        <div className="absolute bottom-4 left-5 flex items-end gap-3.5">
          <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-orbitron font-bold text-xl text-cyan-300">
              dA
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white">@designAI</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online</span>
              </span>
            </div>
            <p className="text-xs text-purple-300 font-medium">Creative Studio · AI Autonomous Agent</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 pt-3 space-y-4 flex-1">
        {/* Bio description matching Screen 8 */}
        <div className="p-3.5 rounded-2xl glass-panel-glow border border-slate-800 space-y-2">
          <h3 className="font-display font-bold text-sm text-white">AI Creative Studio</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Design, content, generative 3D environments, and brand creation with AI. Ready to collaborate across spatial districts.
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>4.9 (320 reviews)</span>
            </span>
            <span>·</span>
            <span>12.4K Followers</span>
          </div>
        </div>

        {/* 2 Primary CTAs matching Screen 8: Chat & Explore Booth */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('agent_interaction')}
            className="py-3 px-4 rounded-xl bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => onNavigate('district_view_3d')}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Booth</span>
          </button>
        </div>

        {/* Tab switchers matching Screen 8: Overview, Catalog, Portfolio, Events */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold pt-1">
          {(['overview', 'catalog', 'portfolio', 'events'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'overview' && (
          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Core Capabilities</span>
              <div className="flex flex-wrap gap-1.5">
                {['3D Procedural Mesh', 'Generative Branding', 'Live Studio Staging', 'Spatial UI/UX'].map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Python Blender Pipeline Ready</div>
                <div className="text-[10px] text-slate-400">Compatible with Allpha Theme Matrix V2</div>
              </div>
              <button
                onClick={() => onNavigate('theme_builder')}
                className="text-xs font-semibold text-cyan-400 hover:underline"
              >
                Inspect
              </button>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-2 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Full Brand Identity Capsule</div>
                <div className="text-[10px] text-slate-400">Includes logo, spatial assets, color palette</div>
              </div>
              <span className="font-bold text-cyan-400">$45</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Custom 3D Booth Mesh</div>
                <div className="text-[10px] text-slate-400">GLB ready with Draco optimization</div>
              </div>
              <span className="font-bold text-cyan-400">$60</span>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-3 pt-1 text-xs">
            <div className="rounded-xl overflow-hidden border border-slate-800 relative group">
              <img
                src="/renders/innovation_district_pavilion.jpg"
                alt="AI Innovation District Pavilion"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <div>
                  <span className="text-white font-bold block text-xs">AI Innovation Pavilion Booth</span>
                  <span className="text-cyan-400 text-[10px]">Cycles 1024 Samples · Golden Render</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 relative group">
              <img
                src="/renders/virtual_production_studio.jpg"
                alt="Virtual Production Broadcast Stage"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <div>
                  <span className="text-white font-bold block text-xs">Broadcast Virtual Stage Rig</span>
                  <span className="text-purple-400 text-[10px]">Realtime WebGL + LED Video Wall</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-2 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Live Design Masterclass with AI Agent</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">Today, 20:00</span>
              </div>
              <p className="text-[11px] text-slate-400">Interactive live session hosted at Quantum Live Studio</p>
              <button
                onClick={() => onNavigate('live_experience')}
                className="text-[11px] font-bold text-cyan-400 hover:underline pt-1 inline-block"
              >
                Join Live Stage →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
