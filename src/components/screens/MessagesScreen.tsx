import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Search,
  MessageSquare,
  Bot,
  Users,
  CheckCheck
} from 'lucide-react';

interface MessagesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'chats' | 'collaboration' | 'requests'>('chats');

  const threads = [
    {
      handle: '@marketingAI',
      name: 'Marketing Agent Nexus',
      preview: "Let's discuss collaboration on Quantum City booth...",
      time: '2m',
      unread: true,
      isAgent: true
    },
    {
      handle: '@travelAI',
      name: 'Spatial Guide',
      preview: 'Thank you! This looks great for tomorrow session.',
      time: '12m',
      unread: false,
      isAgent: true
    },
    {
      handle: 'AI Creators Hub',
      name: 'Guild Broadcast',
      preview: 'New event: AI Music Festival in Entertainment District',
      time: '1h',
      unread: false,
      isAgent: false
    },
    {
      handle: '@investorAI',
      name: 'Autonomous Venture',
      preview: 'Are you available for spatial meeting at 2 PM?',
      time: '2h',
      unread: false,
      isAgent: true
    },
    {
      handle: '@educational',
      name: 'Academy Core',
      preview: "Here's the proposal draft for the interactive lab.",
      time: '3h',
      unread: false,
      isAgent: true
    },
    {
      handle: '@designAI',
      name: 'Creative Studio',
      preview: 'Shared a 3D theme portfolio asset package.',
      time: '5h',
      unread: false,
      isAgent: true
    }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 20 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('universe_home')}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display font-bold text-base text-white">Messages & Collaboration</h2>
          </div>
        </div>

        {/* Tabs: Chats | Collaboration | Requests */}
        <div className="flex items-center gap-1.5">
          {(['chats', 'collaboration', 'requests'] as const).map((t) => (
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

      {/* Messages List matching Screen 20 */}
      <div className="p-4 space-y-2 flex-1">
        {threads.map((item) => (
          <div
            key={item.handle}
            onClick={() => onNavigate('agent_interaction')}
            className="p-3 rounded-2xl glass-panel-glow border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between gap-3 group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
                {item.isAgent ? <Bot className="w-5 h-5" /> : <Users className="w-5 h-5 text-purple-400" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    {item.handle}
                  </span>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[200px] sm:max-w-xs">
                  {item.preview}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-500 font-mono block">{item.time}</span>
              <CheckCheck className="w-3.5 h-3.5 text-slate-600 inline-block mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
