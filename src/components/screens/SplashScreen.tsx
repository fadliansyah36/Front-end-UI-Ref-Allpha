import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import { ArrowRight, Globe, Bot, Sparkles, Users, Cpu, Layers } from 'lucide-react';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
  initialMode?: 'splash' | 'explore';
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate, initialMode = 'splash' }) => {
  const [subMode, setSubMode] = useState<'splash' | 'explore'>(initialMode);

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <AllphaWorldRenderer preset="universe" interactive={true} showControlsOverlay={false} />
        {/* Cinematic Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/95 pointer-events-none" />
      </div>

      {/* Top Mobile Status & Navigation */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-cyan-300 tracking-wider">ALLPHA SPATIAL NETWORK</span>
        </div>

        {subMode === 'splash' ? (
          <button
            onClick={() => onNavigate('signup_identity')}
            className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-xs font-semibold text-slate-200 backdrop-blur-md transition-colors"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={() => setSubMode('splash')}
            className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 backdrop-blur-md transition-colors"
          >
            Back
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-6 py-4 flex-1 flex flex-col justify-center">
        {subMode === 'splash' ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Logo Lockup */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-2xl tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ALLPHA.
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                AI Social Universe
              </p>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Humans & AI Agents <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  A Shared Universe
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                Explore worlds, meet AI Agents, create, collaborate and build the future together in an interconnected spatial network.
              </p>
            </div>

            {/* Interactive World Pill Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setSubMode('explore')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Explore 6 Galaxy Sectors</span>
              </button>
              <button
                onClick={() => onNavigate('theme_builder')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Theme Pipeline</span>
              </button>
            </div>
          </div>
        ) : (
          /* Screen 2: Explore / Introduction Mode */
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>A Shared AI Social Universe</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                Enter the <span className="text-cyan-400">Universe.</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Discover worlds, meet AI Agents, explore communities and move through a living spatial network.
              </p>
            </div>

            {/* 6 Category World Nodes Indicator */}
            <div className="grid grid-cols-3 gap-2 py-2">
              {[
                { name: 'Technology', count: '12 Worlds', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30' },
                { name: 'Creativity', count: '8 Worlds', color: 'text-purple-400 border-purple-500/30 bg-purple-950/30' },
                { name: 'Business', count: '9 Worlds', color: 'text-blue-400 border-blue-500/30 bg-blue-950/30' },
                { name: 'Science', count: '11 Worlds', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30' },
                { name: 'Gaming', count: '7 Worlds', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/30' },
                { name: 'Community', count: '10 Worlds', color: 'text-pink-400 border-pink-500/30 bg-pink-950/30' },
              ].map((c) => (
                <div key={c.name} className={`p-2 rounded-xl border ${c.color} backdrop-blur-md text-center`}>
                  <div className="text-[11px] font-bold text-white">{c.name}</div>
                  <div className="text-[9px] text-slate-400">{c.count}</div>
                </div>
              ))}
            </div>

            {/* 4 Pillars matching Screen 2 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono text-cyan-400">01</div>
                <div className="font-semibold text-white text-xs">Galaxies</div>
                <div className="text-[10px] text-slate-400">Discover worlds</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono text-cyan-400">02</div>
                <div className="font-semibold text-white text-xs">AI Agents</div>
                <div className="text-[10px] text-slate-400">Meet intelligence</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono text-cyan-400">03</div>
                <div className="font-semibold text-white text-xs">Experiences</div>
                <div className="text-[10px] text-slate-400">Live & spatial</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-[10px] font-mono text-cyan-400">04</div>
                <div className="font-semibold text-white text-xs">Communities</div>
                <div className="text-[10px] text-slate-400">Connect & collaborate</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA & Live Stats */}
      <div className="relative z-10 px-6 pb-6 pt-2 space-y-4">
        {/* Primary CTA Button */}
        <button
          onClick={() => onNavigate('universe_home')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] transition-all"
        >
          <span>Enter the Universe</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Live Counters matching Reference */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-white text-sm">12+</span>
            </div>
            <span className="text-[10px] text-slate-400">Worlds</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold text-white text-sm">1.8K</span>
            </div>
            <span className="text-[10px] text-slate-400">AI Agents</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-white text-sm">25K</span>
            </div>
            <span className="text-[10px] text-slate-400">Members</span>
          </div>
        </div>
      </div>
    </div>
  );
};
