import React, { useState } from 'react';
import { ScreenId, WorldItem } from '../../types/allpha';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Sparkles,
  Users,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Globe
} from 'lucide-react';

interface GalaxyNavigatorScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectWorld: (worldId: string) => void;
}

export const GalaxyNavigatorScreen: React.FC<GalaxyNavigatorScreenProps> = ({
  onNavigate,
  onSelectWorld
}) => {
  const [filter, setFilter] = useState<'all' | 'trending' | 'popular' | 'new'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const worlds: (WorldItem & { renderImage: string })[] = [
    {
      id: 'quantum_city',
      name: 'Quantum City',
      category: 'Technology',
      categoryColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      tagline: 'Future AI Innovation',
      onlineCount: '12.4K online',
      districtsCount: 12,
      agentsCount: '1.8K',
      membersCount: '25K',
      theme: 'Crystal AI City',
      thumbnail: 'cyan',
      renderImage: '/renders/quantum_city_metropolis.jpg',
      description: 'A next-generation city where humans and AI agents co-create, collaborate and build together.'
    },
    {
      id: 'neo_jakarta',
      name: 'Neo Jakarta',
      category: 'Cyberpunk',
      categoryColor: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      tagline: 'Equatorial Cyber Metropolis',
      onlineCount: '8.1K online',
      districtsCount: 8,
      agentsCount: '940',
      membersCount: '18K',
      theme: 'Cyberpunk Neon Plaza',
      thumbnail: 'purple',
      renderImage: '/renders/virtual_production_studio.jpg',
      description: 'Luminous skyline, autonomous night markets, and high-frequency trading districts.'
    },
    {
      id: 'aurora_kingdom',
      name: 'Aurora Kingdom',
      category: 'Creativity',
      categoryColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      tagline: 'Bioluminescent Art Sanctuary',
      onlineCount: '5.7K online',
      districtsCount: 6,
      agentsCount: '620',
      membersCount: '12K',
      theme: 'Bioluminescent Oasis',
      thumbnail: 'emerald',
      renderImage: '/renders/innovation_district_pavilion.jpg',
      description: 'Floating crystalline islands dedicated to music, generative art, and spatial fashion.'
    },
    {
      id: 'solaris_exchange',
      name: 'Solaris Exchange',
      category: 'Business',
      categoryColor: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
      tagline: 'Autonomous Commerce Ring',
      onlineCount: '4.9K online',
      districtsCount: 10,
      agentsCount: '1.1K',
      membersCount: '15K',
      theme: 'Deep Space Orbital',
      thumbnail: 'blue',
      renderImage: '/renders/allpha_cosmic_citadel.jpg',
      description: 'High-speed marketplace for AI services, 3D theme assets, and decentralized ventures.'
    }
  ];

  const filteredWorlds = worlds.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('universe_home')}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="font-display font-bold text-base text-white">Explore the Universe</h2>
              <p className="text-[10px] text-slate-400">Discover 350+ spatial worlds & districts</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('universe_map')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Map</span>
          </button>
        </div>

        {/* Search Input matching Reference */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search worlds, agents, content..."
            className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(['all', 'trending', 'popular', 'new'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
                filter === t
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Worlds List Cards */}
      <div className="p-5 space-y-4">
        {filteredWorlds.map((world) => (
          <div
            key={world.id}
            onClick={() => {
              onSelectWorld(world.id);
              onNavigate('world_detail');
            }}
            className="group cursor-pointer rounded-2xl glass-panel-glow border border-slate-800 hover:border-cyan-500/40 p-4 transition-all duration-300 hover:scale-[1.01] space-y-3"
          >
            {/* Card Header & Category Badge */}
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${world.categoryColor}`}>
                  {world.category}
                </span>
                <h3 className="font-display font-extrabold text-lg text-white mt-1 group-hover:text-cyan-300 transition-colors">
                  {world.name}
                </h3>
                <p className="text-xs text-slate-400">{world.tagline}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-emerald-400 block">{world.onlineCount}</span>
                <span className="text-[10px] text-slate-500">{world.districtsCount} Districts</span>
              </div>
            </div>

            {/* 3D Photoreal Render Preview Banner */}
            <div className="h-28 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <img
                src={world.renderImage}
                alt={world.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 text-[10px] text-slate-200 bg-slate-950/85 px-2.5 py-0.5 rounded-full border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Theme: <strong>{world.theme}</strong></span>
              </div>
            </div>

            {/* Description & Enter CTA */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>{world.agentsCount} Agents</span>
                <span>·</span>
                <span>{world.membersCount} Members</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
