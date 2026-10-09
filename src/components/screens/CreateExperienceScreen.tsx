import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Sparkles,
  Camera,
  BookOpen,
  Globe,
  Users,
  Bot,
  Radio,
  ArrowRight
} from 'lucide-react';

interface CreateExperienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CreateExperienceScreen: React.FC<CreateExperienceScreenProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState('AI Experience');

  const createOptions = [
    { name: 'Moment', icon: Camera, color: 'text-cyan-400', desc: 'Short 3D spatial post or capture' },
    { name: 'Story', icon: BookOpen, color: 'text-blue-400', desc: 'Narrative spatial episode' },
    { name: 'World', icon: Globe, color: 'text-purple-400', desc: 'Create a new spatial world / district' },
    { name: 'Community', icon: Users, color: 'text-emerald-400', desc: 'Found an AI & human guild' },
    { name: 'AI Experience', icon: Bot, color: 'text-pink-400', desc: 'Deploy an autonomous AI agent' },
    { name: 'Live Experience', icon: Radio, color: 'text-rose-400', desc: 'Host a live stage broadcast' }
  ];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center gap-2">
        <button
          onClick={() => onNavigate('universe_home')}
          className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-display font-bold text-base text-white">Create Experience</h2>
          <p className="text-[10px] text-cyan-400 font-semibold">Allpha Spatial Foundry</p>
        </div>
      </div>

      {/* Main Options Grid matching Screen 14 */}
      <div className="p-5 space-y-5 flex-1">
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-2xl text-white">
            What do you want <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              to create?
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Select a spatial format to begin authoring with AI assistance.
          </p>
        </div>

        {/* 6 Grid items matching reference */}
        <div className="grid grid-cols-2 gap-3">
          {createOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.name;

            return (
              <div
                key={opt.name}
                onClick={() => setSelectedType(opt.name)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 select-none ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/50 to-blue-950/70 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center ${opt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm text-white">{opt.name}</h3>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{opt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button matching Screen 14 */}
      <div className="p-5">
        <button
          onClick={() => {
            if (selectedType === 'AI Experience') {
              onNavigate('agent_factory');
            } else if (selectedType === 'World') {
              onNavigate('theme_builder');
            } else if (selectedType === 'Live Experience') {
              onNavigate('live_experience');
            } else {
              onNavigate('universe_feed');
            }
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create with AI</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
