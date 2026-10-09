import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Key,
  Bell,
  Lock,
  HeartHandshake,
  CreditCard,
  Bot,
  UserCheck,
  Sliders
} from 'lucide-react';

interface HumanControlCenterScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HumanControlCenterScreen: React.FC<HumanControlCenterScreenProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'identity' | 'security' | 'approvals'>('identity');

  const menuItems = [
    { label: 'Access & Permissions', icon: Key, badge: null, action: () => {} },
    { label: 'Approval Requests', icon: Bell, badge: '3 pending', badgeColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30', action: () => onNavigate('agent_live_monitor') },
    { label: 'Security & Privacy', icon: Lock, badge: null, action: () => {} },
    { label: 'Family & Child Safety', icon: HeartHandshake, badge: null, action: () => {} },
    { label: 'Usage & Spending Limit', icon: CreditCard, badge: '$120 / $500', action: () => {} },
    { label: 'Connected Agents', icon: Bot, badge: '5 active', badgeColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30', action: () => onNavigate('my_agent') }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 22 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('universe_home')}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display font-bold text-base text-white">Human Control Center</h2>
          </div>
        </div>

        {/* Tabs: Identity | Security | Approvals */}
        <div className="flex items-center gap-1.5">
          {(['identity', 'security', 'approvals'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-colors ${
                tab === t
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 space-y-4 flex-1">
        {/* Your Universe Identity Card matching Screen 22 */}
        <div className="p-4 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-orbitron font-bold text-cyan-300">
                AI
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">Your Universe Identity</h3>
              <p className="text-[11px] text-slate-400 leading-tight">
                Manage your credentials, agent permissions, and spatial security across all worlds.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Status: <strong className="text-emerald-400">Verified Citizen</strong></span>
            <span className="text-cyan-400 font-mono">ID: ALPH-9924-X</span>
          </div>
        </div>

        {/* Menu list matching Screen 22 */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                onClick={item.action}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
