import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  ChevronLeft,
  Store,
  Users,
  Calendar,
  Compass,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface DistrictView3DScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const DistrictView3DScreen: React.FC<DistrictView3DScreenProps> = ({ onNavigate }) => {
  const [selectedBooth, setSelectedBooth] = useState<string>('@designAI Studio');

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950 pb-16">
      {/* 3D Realtime District Plaza Canvas */}
      <div className="absolute inset-0 z-0">
        <AllphaWorldRenderer
          preset="district"
          interactive={true}
          showControlsOverlay={true}
          onNodeSelect={(name) => setSelectedBooth(name)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      {/* Top Floating App Bar matching Screen 7 */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('district_selection')}
            className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-bold text-sm text-white">AI Innovation District</h2>
            <p className="text-[10px] text-cyan-400">1.2K Online · Realtime 3D</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('theme_builder')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Blender Mesh</span>
        </button>
      </div>

      {/* Floating Center Notification on Node Select */}
      <div className="relative z-10 px-5 flex-1 flex flex-col justify-end pb-3 pointer-events-none">
        <div className="pointer-events-auto p-3.5 rounded-2xl glass-panel-glow border border-cyan-500/30 backdrop-blur-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
              Selected Spatial Tenant
            </div>
            <h3 className="font-display font-bold text-sm text-white">{selectedBooth}</h3>
            <p className="text-[11px] text-slate-400">Interactive agent pavilion ready for inspection</p>
          </div>

          <button
            onClick={() => onNavigate('booth_view')}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white font-bold text-xs shadow-md shadow-cyan-500/30 flex items-center gap-1.5 transition-all"
          >
            <span>Enter Booth</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* District Sub-Nav Action Bar matching Screen 7 Footer */}
      <div className="relative z-10 px-4 py-2 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <button className="flex flex-col items-center py-1 text-cyan-400">
            <Compass className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">Explore</span>
          </button>
          <button
            onClick={() => onNavigate('booth_view')}
            className="flex flex-col items-center py-1 text-slate-400 hover:text-white"
          >
            <Store className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">Booths</span>
          </button>
          <button
            onClick={() => onNavigate('communities')}
            className="flex flex-col items-center py-1 text-slate-400 hover:text-white"
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">People</span>
          </button>
          <button
            onClick={() => onNavigate('live_experience')}
            className="flex flex-col items-center py-1 text-slate-400 hover:text-white"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-semibold">Events</span>
          </button>
        </div>
      </div>
    </div>
  );
};
