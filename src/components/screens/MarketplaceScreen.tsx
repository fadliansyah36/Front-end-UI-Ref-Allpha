import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Search,
  Star,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Palette
} from 'lucide-react';

interface MarketplaceScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBlenderGenerator: () => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onNavigate,
  onOpenBlenderGenerator
}) => {
  const [filter, setFilter] = useState<'all' | 'agents' | 'services' | 'products'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 18 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('universe_home')}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display font-bold text-base text-white">Marketplace</h2>
          </div>

          <button
            onClick={onOpenBlenderGenerator}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-900 transition-colors"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme Studio</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, services, products..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5">
          {(['all', 'agents', 'services', 'products'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
                filter === t
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog matching Screen 18 */}
      <div className="p-5 space-y-5 flex-1">
        {/* Featured Agents & Services */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Featured Agents & Services
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer">See All</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: '@travelAI',
                rate: '$19 / service',
                rating: '4.8 (210)',
                color: 'from-cyan-500 to-blue-600',
                role: 'Spatial Itinerary Agent'
              },
              {
                name: '@educationAI',
                rate: '$25 / service',
                rating: '4.9 (340)',
                color: 'from-purple-500 to-indigo-600',
                role: 'Neural Tutor & Simulator'
              }
            ].map((ag) => (
              <div
                key={ag.name}
                onClick={() => onNavigate('booth_view')}
                className="p-3.5 rounded-2xl glass-panel-glow border border-slate-800 hover:border-cyan-500/40 cursor-pointer space-y-2 group transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${ag.color} flex items-center justify-center font-bold text-white text-xs`}>
                  {ag.name.slice(1, 3).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    {ag.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">{ag.role}</p>
                </div>
                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-cyan-300">{ag.rate}</span>
                  <span className="flex items-center gap-0.5 text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-300" />
                    <span>{ag.rating}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Products matching Screen 18 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Popular 3D & AI Products
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer">See All</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: '3D World Theme',
                price: '$49',
                rating: '4.8 (120)',
                desc: 'Blender Python generator asset package for Quantum City V2'
              },
              {
                name: 'AI Automation Kit',
                price: '$99',
                rating: '4.7 (90)',
                desc: 'Multi-agent autonomous task orchestration scripts'
              }
            ].map((prod) => (
              <div
                key={prod.name}
                onClick={() => onNavigate('theme_builder')}
                className="p-3.5 rounded-2xl glass-panel-glow border border-slate-800 hover:border-cyan-500/40 cursor-pointer space-y-2 group transition-all"
              >
                <div className="h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center animate-spin" style={{ animationDuration: '15s' }}>
                    <div className="w-4 h-4 rounded-full bg-cyan-400/40" />
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{prod.desc}</p>
                </div>
                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-cyan-300 font-orbitron">{prod.price}</span>
                  <span className="flex items-center gap-0.5 text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-300" />
                    <span>{prod.rating}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
