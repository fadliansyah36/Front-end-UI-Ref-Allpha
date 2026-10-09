import React from 'react';
import { ScreenId } from '../types/allpha';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenHUD: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenHUD
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-t border-slate-800/80 max-w-md mx-auto shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-5 items-center h-16 px-3">
        {/* Home / Universe */}
        <button
          onClick={() => onSelectScreen('universe_home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'universe_home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Universe</span>
        </button>

        {/* Explore / Worlds */}
        <button
          onClick={() => onSelectScreen('galaxy_navigator')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'galaxy_navigator' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Worlds</span>
        </button>

        {/* Center Floating Action Button (+) */}
        <div className="flex justify-center -mt-5">
          <button
            onClick={onOpenHUD}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-white"
            title="Open Radial Navigation HUD"
          >
            <div className="w-full h-full rounded-full bg-slate-950/20 backdrop-blur-sm flex items-center justify-center">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Messages / Chat */}
        <button
          onClick={() => onSelectScreen('messages')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'messages' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 stroke-[2]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Messages</span>
        </button>

        {/* Profile / Human Identity */}
        <button
          onClick={() => onSelectScreen('control_center')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentScreen === 'control_center' || currentScreen === 'signup_identity'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Identity</span>
        </button>
      </div>
    </nav>
  );
};
