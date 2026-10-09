import React, { useState } from 'react';
import { ScreenId } from '../types/allpha';
import {
  Smartphone,
  Maximize2,
  Terminal,
  ChevronDown,
  Layers
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isFramed: boolean;
  onToggleFrame: () => void;
  onOpenBlenderGenerator: () => void;
}

export const SCREEN_CATALOG: { id: ScreenId; title: string; category: string; num: number }[] = [
  // Onboarding & Intro (Screens 1 - 3)
  { id: 'splash', title: '1. Splash / Landing', category: 'Onboarding', num: 1 },
  { id: 'explore_intro', title: '2. Explore / Introduction', category: 'Onboarding', num: 2 },
  { id: 'signup_identity', title: '3. Sign Up / Identity', category: 'Onboarding', num: 3 },

  // Spatial Navigation & Worlds (Screens 3 - 6)
  { id: 'universe_home', title: '3. Universe Home', category: 'Universe & Worlds', num: 3 },
  { id: 'galaxy_navigator', title: '4. Galaxy / World Navigator', category: 'Universe & Worlds', num: 4 },
  { id: 'world_detail', title: '5. World Detail (Quantum City)', category: 'Universe & Worlds', num: 5 },
  { id: 'district_selection', title: '6. District Selection', category: 'Universe & Worlds', num: 6 },

  // Realtime 3D & Agent Interactions (Screens 7 - 10)
  { id: 'district_view_3d', title: '7. District View (Realtime 3D)', category: '3D District & Agents', num: 7 },
  { id: 'booth_view', title: '8. Booth / Tenant View', category: '3D District & Agents', num: 8 },
  { id: 'agent_interaction', title: '9. Agent Interaction (@designAI)', category: '3D District & Agents', num: 9 },
  { id: 'live_experience', title: '10. Live Experience Stage', category: '3D District & Agents', num: 10 },

  // Feed, Capsule & Ask (Screens 11 - 13)
  { id: 'universe_feed', title: '11. Universe Moments / Feed', category: 'Experiences & Feed', num: 11 },
  { id: 'content_capsule', title: '12. Content Capsule', category: 'Experiences & Feed', num: 12 },
  { id: 'ask_universe', title: '13. Ask this Universe (AI)', category: 'Experiences & Feed', num: 13 },

  // Creation & Factory (Screens 14 - 17)
  { id: 'create_experience', title: '14. Create Experience', category: 'Creation & Agents', num: 14 },
  { id: 'agent_factory', title: '15. Create Your AI Agent', category: 'Creation & Agents', num: 15 },
  { id: 'my_agent', title: '16. My Agent (Luna @LunaAI)', category: 'Creation & Agents', num: 16 },
  { id: 'agent_live_monitor', title: '17. Agent Live Monitor', category: 'Creation & Agents', num: 17 },

  // Market & Communities & Collab (Screens 18 - 20)
  { id: 'marketplace', title: '18. Marketplace', category: 'Social & Market', num: 18 },
  { id: 'communities', title: '19. Communities', category: 'Social & Market', num: 19 },
  { id: 'messages', title: '20. Messages & Collaboration', category: 'Social & Market', num: 20 },

  // Studio Pipeline & Navigation (Screens 21 - 24)
  { id: 'theme_builder', title: '21. Theme Builder (Blender 3D)', category: 'System & Tools', num: 21 },
  { id: 'control_center', title: '22. Human Control Center', category: 'System & Tools', num: 22 },
  { id: 'universe_map', title: '23. Universe Map (2D/3D Orbit)', category: 'System & Tools', num: 23 },
];

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  isFramed,
  onToggleFrame,
  onOpenBlenderGenerator
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentItem = SCREEN_CATALOG.find((s) => s.id === currentScreen) || SCREEN_CATALOG[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-3 text-xs">
      {/* Brand & Screen Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Logo mark */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20 font-orbitron text-xs">
            A
          </div>
          <div className="hidden sm:block">
            <span className="font-orbitron font-bold text-sm tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              ALLPHA
            </span>
            <span className="text-[9px] text-slate-400 block -mt-1 font-medium">3D PWA CONCEPT</span>
          </div>
        </div>

        {/* 24 Screen Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-slate-200 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold truncate max-w-[170px] sm:max-w-[220px]">
              {currentItem.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-72 max-h-96 overflow-y-auto rounded-xl bg-slate-950/95 border border-cyan-500/30 p-2 shadow-2xl backdrop-blur-xl z-50 divide-y divide-slate-800">
              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                24 Reference UI/UX Screens
              </div>

              {['Onboarding', 'Universe & Worlds', '3D District & Agents', 'Experiences & Feed', 'Creation & Agents', 'Social & Market', 'System & Tools'].map((cat) => {
                const catItems = SCREEN_CATALOG.filter((i) => i.category === cat);
                if (catItems.length === 0) return null;

                return (
                  <div key={cat} className="py-1">
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-500">{cat}</div>
                    {catItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectScreen(item.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          currentScreen === item.id
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {currentScreen === item.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Python Blender Button, Device Frame Toggle, PWA Install */}
      <div className="flex items-center gap-2">
        {/* Python Blender 3D Theme Studio Button */}
        <button
          onClick={onOpenBlenderGenerator}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600/30 transition-all font-semibold"
          title="Open Python Blender 3D Theme Pipeline"
        >
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Python Blender 3D</span>
          <span className="sm:hidden">Blender</span>
        </button>

        {/* Device Frame Viewport Toggle */}
        <button
          onClick={onToggleFrame}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          title={isFramed ? 'Switch to Fullscreen Responsive' : 'Switch to Mobile Phone Frame'}
        >
          {isFramed ? (
            <Maximize2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <Smartphone className="w-4 h-4 text-cyan-400" />
          )}
        </button>

        {/* PWA Install */}
        <PWAInstallButton />
      </div>
    </header>
  );
};
