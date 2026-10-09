import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  Check,
  Palette,
  Sliders,
  Cpu,
  Layers
} from 'lucide-react';

interface ThemeBuilderScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenBlenderGenerator: () => void;
}

export const ThemeBuilderScreen: React.FC<ThemeBuilderScreenProps> = ({
  onNavigate,
  onOpenBlenderGenerator
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);

  const themePresets = [
    {
      name: 'Cosmic Universe',
      preset: 'universe' as const,
      palette: 'Cyan & Celestial Violet',
      lighting: 'Key 1400W Cyan + Rim 2200W Purple',
      camera: 'Portrait PWA 35mm',
      desc: 'Deep space cosmic nebula with orbiting planetary rings and crystal spires.'
    },
    {
      name: 'Cyber City 2088',
      preset: 'world' as const,
      palette: 'Neon Blue & Magenta',
      lighting: '3-Tier Studio Lighting + Practical LEDs',
      camera: 'Establishing Shot 28mm',
      desc: 'High-density architectural skyscrapers with luminous skyways and atmospheric fog.'
    },
    {
      name: 'AI Innovation District',
      preset: 'district' as const,
      palette: 'Electric Cyan & Slate Dark',
      lighting: 'Studio PBR Principled BSDF',
      camera: 'Medium Shot 50mm',
      desc: 'Exhibition plaza with holographic nodes, interactive booths, and agent studios.'
    },
    {
      name: 'Live Studio Stage',
      preset: 'live_studio' as const,
      palette: 'Deep Indigo & Cyber Violet',
      lighting: 'Curved LED Stage + Host Spotlight',
      camera: 'Stage Portrait 35mm',
      desc: 'Complete broadcast stage with reflective floor, curved media screen, and host podium.'
    }
  ];

  const currentTheme = themePresets[selectedThemeIndex];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 21 */}
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
              <h2 className="font-display font-bold text-base text-white">Create World Theme</h2>
              <p className="text-[10px] text-cyan-400 font-semibold">Python Blender 3D Authoring Pipeline</p>
            </div>
          </div>

          <button
            onClick={onOpenBlenderGenerator}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>.py Generator</span>
          </button>
        </div>

        {/* 3 Steps: 1. Theme | 2. Customize | 3. Preview */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
          {[
            { num: 1, label: 'Theme' },
            { num: 2, label: 'Customize' },
            { num: 3, label: 'Preview' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num as any)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all ${
                step === s.num
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center">
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Theme Interactive Viewport */}
      <div className="p-5 space-y-4 flex-1">
        {/* 3D Realtime Scene Viewport */}
        <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-2xl">
          <AllphaWorldRenderer
            preset={currentTheme.preset}
            interactive={true}
            showControlsOverlay={true}
          />

          {/* Theme Carousel Controls */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between">
            <button
              onClick={() =>
                setSelectedThemeIndex((prev) => (prev > 0 ? prev - 1 : themePresets.length - 1))
              }
              className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
              {currentTheme.name}
            </span>

            <button
              onClick={() =>
                setSelectedThemeIndex((prev) => (prev < themePresets.length - 1 ? prev + 1 : 0))
              }
              className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Specifications matching User's 3D Production Pipeline */}
        <div className="p-4 rounded-2xl glass-panel-glow border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Theme Specification (Theme V2 Matrix)
            </span>
            <span className="text-cyan-400 font-mono text-[10px]">GLB DRACO OPTIMIZED</span>
          </div>

          <p className="text-slate-300 text-[11px] leading-relaxed">
            {currentTheme.desc}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">Color & Material</span>
              <span className="font-semibold text-white">{currentTheme.palette}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[9px] uppercase">Lighting Rig</span>
              <span className="font-semibold text-white">{currentTheme.lighting}</span>
            </div>
          </div>
        </div>

        {/* Quick Theme Selector Carousel Strip matching Screen 21 */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
            Theme Gallery (25 Themes Matrix)
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {themePresets.map((t, idx) => (
              <button
                key={t.name}
                onClick={() => setSelectedThemeIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedThemeIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons matching Screen 21 */}
      <div className="p-5 space-y-2">
        <button
          onClick={onOpenBlenderGenerator}
          className="w-full py-3 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/40 text-purple-200 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Terminal className="w-4 h-4 text-purple-300" />
          <span>Export Python Blender (.py) Script</span>
        </button>

        <button
          onClick={() => onNavigate('world_detail')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Check className="w-4 h-4" />
          <span>Use This Theme for World</span>
        </button>
      </div>
    </div>
  );
};
