import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Bot,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  Check
} from 'lucide-react';

interface AgentFactoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AgentFactoryScreen: React.FC<AgentFactoryScreenProps> = ({ onNavigate }) => {
  const [agentType, setAgentType] = useState<'Social' | 'Live' | 'Commerce' | 'Creator'>('Creator');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [agentName, setAgentName] = useState('Luna');
  const [agentHandle, setAgentHandle] = useState('@LunaAI');

  const avatarPresets = [
    { name: 'Luna Celestial', color: 'from-cyan-400 to-purple-600', ring: 'border-cyan-400' },
    { name: 'Kira Cyberpunk', color: 'from-pink-500 to-rose-600', ring: 'border-pink-400' },
    { name: 'Astra Void', color: 'from-blue-600 to-indigo-800', ring: 'border-blue-400' },
    { name: 'Nexus Synthetix', color: 'from-emerald-400 to-teal-700', ring: 'border-emerald-400' },
    { name: 'Zephyr Orbit', color: 'from-amber-400 to-orange-600', ring: 'border-amber-400' },
    { name: 'Solana Hologram', color: 'from-purple-400 to-pink-500', ring: 'border-purple-400' }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 15 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('create_experience')}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-bold text-base text-white">Create Your AI Agent</h2>
            <p className="text-[10px] text-cyan-400 font-semibold">Step 1: Basic Info & Genome</p>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
          1 / 3
        </span>
      </div>

      {/* Main Configuration Body matching Screen 15 */}
      <div className="p-5 space-y-4 flex-1">
        {/* Hero Selected Avatar Preview */}
        <div className="relative w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
          <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.3),transparent_70%)]" />
            <div className="w-16 h-20 rounded-full bg-gradient-to-b from-purple-200 via-indigo-200 to-slate-200 flex items-center justify-center relative">
              <div className="w-3 h-2 rounded-full bg-indigo-900 absolute top-8 left-3" />
              <div className="w-3 h-2 rounded-full bg-indigo-900 absolute top-8 right-3" />
            </div>
            <Sparkles className="absolute top-2 right-3 w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* Name & Handle Inputs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Agent Name</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-semibold"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Handle</label>
            <input
              type="text"
              value={agentHandle}
              onChange={(e) => setAgentHandle(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Choose Agent Type Segmented Buttons matching Screen 15 */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">Choose Agent Type</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['Social', 'Live', 'Commerce', 'Creator'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setAgentType(t)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
                  agentType === t
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar Preset Grid selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Select AI Persona Mesh</label>
          <div className="grid grid-cols-3 gap-2.5">
            {avatarPresets.map((av, idx) => (
              <div
                key={av.name}
                onClick={() => setSelectedAvatar(idx)}
                className={`p-2 rounded-xl border cursor-pointer flex flex-col items-center gap-1.5 transition-all ${
                  selectedAvatar === idx
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${av.color} p-0.5 flex items-center justify-center`}>
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-xs text-white">
                    {av.name.charAt(0)}
                  </div>
                </div>
                <span className="text-[10px] text-slate-300 text-center truncate w-full font-medium">
                  {av.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Next Step matching Screen 15 */}
      <div className="p-5">
        <button
          onClick={() => onNavigate('my_agent')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <span>Next: Skills & Genome</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
