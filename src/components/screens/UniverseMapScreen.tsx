import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  ChevronLeft,
  Globe,
  Layers,
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';

interface UniverseMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const UniverseMapScreen: React.FC<UniverseMapScreenProps> = ({ onNavigate }) => {
  const [mapMode, setMapMode] = useState<'3D' | '2D'>('3D');
  const [viewLevel, setViewLevel] = useState<'Galaxy' | 'World' | 'District'>('Galaxy');
  const [selectedTarget, setSelectedTarget] = useState('Technology Sector');

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950 pb-16">
      {/* 3D Map Realtime Canvas */}
      <div className="absolute inset-0 z-0">
        <AllphaWorldRenderer
          preset={viewLevel === 'Galaxy' ? 'universe' : viewLevel === 'World' ? 'world' : 'district'}
          interactive={true}
          showControlsOverlay={true}
          onNodeSelect={(name) => setSelectedTarget(name)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      {/* Top Header matching Screen 23 */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('galaxy_navigator')}
            className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-bold text-sm text-white">Universe Spatial Map</h2>
            <p className="text-[10px] text-cyan-400">Target: {selectedTarget}</p>
          </div>
        </div>

        {/* 2D / 3D Toggle matching Screen 23 */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setMapMode('2D')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              mapMode === '2D' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setMapMode('3D')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              mapMode === '3D' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            3D
          </button>
        </div>
      </div>

      {/* Floating Info Card & Level Selector matching Screen 23 */}
      <div className="relative z-10 px-5 flex-1 flex flex-col justify-end pb-3 pointer-events-none">
        <div className="pointer-events-auto space-y-2">
          {/* Level Switcher (Galaxy | World | District) */}
          <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 w-fit mx-auto shadow-xl">
            {(['Galaxy', 'World', 'District'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setViewLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  viewLevel === lvl
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl} View
              </button>
            ))}
          </div>

          {/* Selected Node Card */}
          <div className="p-3.5 rounded-2xl glass-panel-glow border border-cyan-500/30 backdrop-blur-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                Spatial Coordinate
              </span>
              <h3 className="font-display font-bold text-sm text-white">{selectedTarget}</h3>
              <p className="text-[11px] text-slate-400">12 Worlds · Crystalline Sector Network</p>
            </div>

            <button
              onClick={() => onNavigate('world_detail')}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/30 flex items-center gap-1.5 transition-all"
            >
              <span>Inspect</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
