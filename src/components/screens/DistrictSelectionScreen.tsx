import React, { useState } from 'react';
import { ScreenId, DistrictItem } from '../../types/allpha';
import {
  ChevronLeft,
  Search,
  Radio,
  Sparkles,
  Users,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface DistrictSelectionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const DistrictSelectionScreen: React.FC<DistrictSelectionScreenProps> = ({
  onNavigate,
  onSelectDistrict
}) => {
  const [filter, setFilter] = useState<'all' | 'trending' | 'live' | 'new'>('all');

  const districts: (DistrictItem & { renderImage: string })[] = [
    {
      id: 'ai_innovation',
      name: 'AI Innovation District',
      category: 'Research & Labs',
      onlineCount: '1.2K online',
      activeBooths: 42,
      highlight: 'Central autonomous agent hackathon & spatial studios',
      color: 'border-cyan-500/40 text-cyan-300',
      renderImage: '/renders/innovation_district_pavilion.jpg'
    },
    {
      id: 'creator_district',
      name: 'Creator District',
      category: 'Art & Design',
      onlineCount: '890 online',
      activeBooths: 28,
      highlight: '@designAI live showcases and procedural generative fashion',
      color: 'border-purple-500/40 text-purple-300',
      renderImage: '/renders/virtual_production_studio.jpg'
    },
    {
      id: 'marketplace_district',
      name: 'Marketplace District',
      category: 'Commerce',
      onlineCount: '812 online',
      activeBooths: 64,
      highlight: '3D Theme assets, custom agent rigs, and API contracts',
      color: 'border-emerald-500/40 text-emerald-300',
      renderImage: '/renders/keynote_transform_stage.jpg'
    },
    {
      id: 'entertainment_district',
      name: 'Entertainment District',
      category: 'Live & Events',
      onlineCount: '641 online',
      activeBooths: 18,
      highlight: 'Interactive 3D concerts, esports, and spatial broadcasts',
      color: 'border-pink-500/40 text-pink-300',
      renderImage: '/renders/quantum_city_metropolis.jpg'
    }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('world_detail')}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-bold text-base text-white">Select District</h2>
            <p className="text-[10px] text-cyan-400 font-semibold">Quantum City · 12 Available Sectors</p>
          </div>
        </div>

        {/* Filter Pills matching Reference Screen 6 */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'trending', 'live', 'new'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
                filter === t
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* District Cards List */}
      <div className="p-5 space-y-3.5">
        {districts.map((district) => (
          <div
            key={district.id}
            onClick={() => {
              if (onSelectDistrict) onSelectDistrict(district.id);
              onNavigate('district_view_3d');
            }}
            className="group cursor-pointer rounded-2xl glass-panel-glow border border-slate-800 hover:border-cyan-500/50 p-4 transition-all duration-300 hover:scale-[1.01] space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-900/80 ${district.color}`}>
                  {district.category}
                </span>
                <h3 className="font-display font-extrabold text-base text-white mt-1 group-hover:text-cyan-300 transition-colors">
                  {district.name}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {district.onlineCount}
              </span>
            </div>

            <div className="h-24 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <img
                src={district.renderImage}
                alt={district.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 text-[9px] text-cyan-300 bg-slate-950/85 px-2 py-0.5 rounded-md border border-cyan-500/30 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>3D Theme District</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {district.highlight}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[11px] text-slate-400">
              <span>{district.activeBooths} Active Booths</span>
              <div className="flex items-center gap-1 font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Enter Realtime 3D</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
