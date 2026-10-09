import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  X,
  Send,
  Mic,
  Calendar,
  Layers,
  Users,
  Sparkles,
  Plus,
  BookOpen
} from 'lucide-react';

interface AgentInteractionScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AgentInteractionScreen: React.FC<AgentInteractionScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hello! Welcome to my studio! How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { label: 'View Catalog', action: () => handleSend('Can I see your design catalog?') },
    { label: "Let's Collaborate", action: () => handleSend("I want to collaborate on a 3D theme project!") },
    { label: 'Book a Meeting', action: () => handleSend('I would like to book a meeting session.') },
    { label: 'Invite to Chat Room', action: () => handleSend('Sending invitation to our private room.') }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text },
      {
        sender: 'agent',
        text: `Wonderful! I have received your request: "${text}". Setting up parameters in Allpha Spatial Mesh now.`
      }
    ]);
    if (!textToSend) setInputText('');
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 9 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 flex items-center justify-between bg-slate-950/85 backdrop-blur-md border-b border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-xs text-cyan-300 font-orbitron">
              dA
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm text-white">@designAI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-400">Creative Studio Agent</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('booth_view')}
          className="p-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Conversation & Agent Avatar Display */}
      <div className="px-5 py-4 space-y-4 flex-1">
        {/* Large Character Avatar Graphic matching Reference */}
        <div className="relative w-40 h-40 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_35px_rgba(56,189,248,0.3)]">
          <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(192,132,252,0.4),transparent_70%)]" />

            {/* Stylized Avatar Illustration */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Hair & Head */}
              <div className="w-20 h-24 rounded-full bg-gradient-to-b from-purple-200 via-indigo-200 to-slate-200 relative">
                {/* Cyber Headphones */}
                <div className="absolute top-8 -left-3 w-4 h-8 rounded-lg bg-cyan-400 border border-white" />
                <div className="absolute top-8 -right-3 w-4 h-8 rounded-lg bg-cyan-400 border border-white" />
                <div className="absolute -top-1 left-2 right-2 h-3 rounded-full border-t-2 border-cyan-400" />

                {/* Anime Eyes */}
                <div className="absolute top-10 left-4 w-3 h-2 rounded-full bg-indigo-950 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-300" />
                </div>
                <div className="absolute top-10 right-4 w-3 h-2 rounded-full bg-indigo-950 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-300" />
                </div>
              </div>
            </div>

            <Sparkles className="absolute top-3 right-4 w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* Message Dialogue Bubbles */}
        <div className="space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'glass-panel-glow border border-slate-800 text-slate-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Quick Action Buttons matching Screen 9 */}
        <div className="space-y-2 pt-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">
            Suggested Actions
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                onClick={qa.action}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 text-left text-slate-200 hover:text-white transition-all flex items-center gap-2 group"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="font-medium text-[11px] truncate">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Field matching Screen 9 */}
      <div className="sticky bottom-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="w-full py-2.5 pl-3.5 pr-9 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white flex items-center justify-center shadow-md shadow-cyan-500/25 transition-transform active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
