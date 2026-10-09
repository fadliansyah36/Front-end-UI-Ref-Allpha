import React from 'react';
import { ScreenId } from '../types/allpha';
import {
  Globe,
  MapPin,
  Radio,
  Bot,
  Users,
  MessageSquare,
  Plus,
  X,
  Palette
} from 'lucide-react';

interface NavigationHUDProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenBlenderGenerator: () => void;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  onOpenBlenderGenerator
}) => {
  if (!isOpen) return null;

  const items = [
    { label: 'Universe', screen: 'universe_home' as ScreenId, icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    { label: 'Worlds', screen: 'galaxy_navigator' as ScreenId, icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Live', screen: 'live_experience' as ScreenId, icon: Radio, color: 'text-rose-400', bg: 'bg-rose-500/20' },
    { label: 'Agents', screen: 'my_agent' as ScreenId, icon: Bot, color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { label: 'Communities', screen: 'communities' as ScreenId, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Messages', screen: 'messages' as ScreenId, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-fadeIn">
      {/* Radial Glass Orb Container matching Screen 24 */}
      <div className="relative w-80 h-80 rounded-full border border-cyan-500/30 bg-gradient-to-b from-slate-950/90 to-blue-950/70 p-6 shadow-[0_0_50px_rgba(56,189,248,0.25)] flex items-center justify-center">
        {/* Orbital concentric rings */}
        <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-pulse pointer-events-none" />
        <div className="absolute inset-10 rounded-full border border-purple-500/20 pointer-events-none" />

        {/* Center Primary Action: Create */}
        <button
          onClick={() => {
            onSelectScreen('create_experience');
            onClose();
          }}
          className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:scale-105 transition-transform flex flex-col items-center justify-center text-white"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Create</span>
        </button>

        {/* 6 Radial Destination Nodes around the perimeter */}
        {items.map((item, idx) => {
          const angle = (idx / items.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 108; // px from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => {
                onSelectScreen(item.screen);
                onClose();
              }}
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
              className="absolute z-20 flex flex-col items-center group focus:outline-none"
            >
              <div
                className={`w-11 h-11 rounded-2xl ${item.bg} border border-cyan-500/30 flex items-center justify-center ${item.color} shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:border-cyan-400 transition-all`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-slate-300 mt-1 whitespace-nowrap group-hover:text-cyan-300 transition-colors drop-shadow">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Bottom Blender Theme shortcut */}
        <button
          onClick={() => {
            onClose();
            onOpenBlenderGenerator();
          }}
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-950 transition-colors"
        >
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          <span>Python Blender 3D Theme</span>
        </button>

        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-2 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
