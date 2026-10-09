import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Search,
  Users,
  Check,
  Plus,
  Sparkles
} from 'lucide-react';

interface CommunitiesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CommunitiesScreen: React.FC<CommunitiesScreenProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'for_you' | 'popular' | 'my_communities'>('for_you');
  const [joined, setJoined] = useState<Record<string, boolean>>({
    'AI Creators Hub': true
  });

  const communities = [
    { name: 'AI Creators Hub', members: '12.4K members', desc: 'Spatial 3D artists, prompt designers, worldbuilders' },
    { name: 'Travel Indonesia', members: '6.5K members', desc: 'Virtual tourism, Bali spatial twin, Neo Nusantara' },
    { name: 'AI Startup Builders', members: '6.7K members', desc: 'Founders creating autonomous agent systems' },
    { name: 'Music & AI', members: '5.3K members', desc: 'Generative sonic environments & live concerts' },
    { name: 'AI Education', members: '9.1K members', desc: 'Interactive spatial science & simulation labs' }
  ];

  const toggleJoin = (name: string) => {
    setJoined((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 19 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('universe_home')}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display font-bold text-base text-white">Communities</h2>
          </div>
          <button
            onClick={() => onNavigate('create_experience')}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search communities..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Tabs: For You | Popular | My Communities */}
        <div className="flex items-center gap-1.5">
          {(['for_you', 'popular', 'my_communities'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
                tab === t
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Communities List matching Screen 19 */}
      <div className="p-5 space-y-3 flex-1">
        {communities.map((c) => {
          const isJoined = joined[c.name];

          return (
            <div
              key={c.name}
              className="p-3.5 rounded-2xl glass-panel-glow border border-slate-800 flex items-center justify-between gap-3 group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    {c.name}
                  </h3>
                  <div className="text-[10px] text-slate-400">{c.members}</div>
                </div>
              </div>

              <button
                onClick={() => toggleJoin(c.name)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                  isJoined
                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white font-bold shadow-sm'
                }`}
              >
                {isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
