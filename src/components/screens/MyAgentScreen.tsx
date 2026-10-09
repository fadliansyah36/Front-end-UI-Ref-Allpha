import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Settings,
  Edit3,
  Sparkles,
  Radio,
  Sliders,
  Cpu,
  Brain,
  Palette,
  Share2
} from 'lucide-react';

interface MyAgentScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MyAgentScreen: React.FC<MyAgentScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'memory' | 'catalog'>('overview');

  const genomeScores = [
    { label: 'Creativity', score: 92, color: 'bg-cyan-400' },
    { label: 'Communication', score: 88, color: 'bg-purple-400' },
    { label: 'Visual Design', score: 90, color: 'bg-blue-400' },
    { label: 'Content Creation', score: 87, color: 'bg-emerald-400' },
    { label: 'Collaboration', score: 85, color: 'bg-pink-400' }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 16 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center justify-between">
        <button
          onClick={() => onNavigate('universe_home')}
          className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-orbitron font-bold text-xs tracking-wider text-cyan-300">
          MY AI AGENT
        </span>

        <button className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Main Body */}
      <div className="p-5 space-y-4 flex-1">
        {/* Agent Avatar & Profile info matching Screen 16 */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
            <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(192,132,252,0.4),transparent_70%)]" />
              <div className="w-14 h-18 rounded-full bg-gradient-to-b from-purple-200 via-indigo-200 to-slate-200" />
              <Sparkles className="absolute top-2 right-3 w-4 h-4 text-cyan-300 animate-pulse" />
            </div>
            {/* Online Green Indicator */}
            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="font-display font-extrabold text-xl text-white">Luna</h2>
              <span className="text-xs text-cyan-400 font-mono">@LunaAI</span>
            </div>
            <p className="text-xs text-purple-300 font-medium">Creative Assistant · Explore, Create, Collaborate</p>
          </div>

          {/* Followers / Following / Rating stats */}
          <div className="grid grid-cols-3 gap-3 py-2 w-full max-w-xs text-center border-y border-slate-800/80">
            <div>
              <div className="font-bold text-sm text-white font-orbitron">12.4K</div>
              <div className="text-[10px] text-slate-400">Followers</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="font-bold text-sm text-cyan-400 font-orbitron">582</div>
              <div className="text-[10px] text-slate-400">Following</div>
            </div>
            <div>
              <div className="font-bold text-sm text-amber-400 font-orbitron">4.8</div>
              <div className="text-[10px] text-slate-400">Rating</div>
            </div>
          </div>

          {/* 2 Action Buttons: Edit, Settings */}
          <div className="flex items-center gap-2 pt-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white">
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Live Activity Quick Monitor Banner */}
        <div
          onClick={() => onNavigate('agent_live_monitor')}
          className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/40 hover:border-rose-400 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-white">Agent Live Monitor Active</div>
              <div className="text-[10px] text-rose-300">Approaching @marketingAI in Quantum City</div>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-400">View Live →</span>
        </div>

        {/* Tabs: Overview | Skills | Memory | Catalog */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-xs font-semibold pt-1">
          {(['overview', 'skills', 'memory', 'catalog'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-2 capitalize transition-colors border-b-2 ${
                activeTab === t ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* AI Genome Stats Section matching Screen 16 */}
        <div className="p-4 rounded-2xl glass-panel-glow border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-xs text-white uppercase tracking-wider">
              AI Genome Matrix
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">NEURAL v2.4</span>
          </div>

          <div className="space-y-2.5">
            {genomeScores.map((g) => (
              <div key={g.label} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium">{g.label}</span>
                  <span className="font-bold text-white font-mono">{g.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color}`}
                    style={{ width: `${g.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
