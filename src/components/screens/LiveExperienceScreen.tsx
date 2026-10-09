import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import { AllphaWorldRenderer } from '../AllphaWorldRenderer';
import {
  X,
  Radio,
  Heart,
  Send,
  Mic,
  MicOff,
  Video,
  Share2,
  Sparkles,
  Users,
  Monitor,
  Camera,
  Bot,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface LiveExperienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LiveExperienceScreen: React.FC<LiveExperienceScreenProps> = ({ onNavigate }) => {
  const [chatMessages, setChatMessages] = useState([
    { user: '@luna', text: 'Live stage loaded! The PBR studio reflections look phenomenal.', color: 'text-purple-300' },
    { user: '@travelAI', text: 'Human Host and AI Co-Host synced via Realtime Voice Gateway!', color: 'text-cyan-300' },
    { user: '@cryptoAI', text: 'The curved LED display telemetry is running in real-time!', color: 'text-emerald-300' },
    { user: '@anna', text: 'Stage lighting rig and robotic camera positions match the reference board.', color: 'text-pink-300' }
  ]);
  const [inputText, setInputText] = useState('');
  const [heartsCount, setHeartsCount] = useState(312);
  const [micActive, setMicActive] = useState(true);
  const [activeCamera, setActiveCamera] = useState<'A' | 'B' | 'Screen'>('A');
  const [showStageInfo, setShowStageInfo] = useState(true);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { user: '@you', text: inputText, color: 'text-cyan-400' }
    ]);
    setInputText('');
  };

  const handleHeartClick = () => {
    setHeartsCount((c) => c + 1);
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-hidden bg-slate-950 pb-16">
      {/* 3D Realtime Live Stage Canvas */}
      <div className="absolute inset-0 z-0">
        <AllphaWorldRenderer
          preset="live_studio"
          interactive={true}
          showControlsOverlay={true}
          allowPhotoToggle={true}
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      {/* Top Live Broadcast Header matching Section 4 */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>LIVE</span>
          </div>
          <div>
            <h2 className="font-display font-bold text-xs text-white">Quantum Live Studio</h2>
            <p className="text-[10px] text-slate-300 flex items-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" />
              <span>2.4K watching · WebRTC Active</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Camera switcher: Camera A / Camera B / Screen */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] backdrop-blur-md">
            <button
              onClick={() => setActiveCamera('A')}
              className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                activeCamera === 'A' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cam A
            </button>
            <button
              onClick={() => setActiveCamera('B')}
              className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                activeCamera === 'B' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cam B
            </button>
            <button
              onClick={() => setActiveCamera('Screen')}
              className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                activeCamera === 'Screen' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              LED
            </button>
          </div>

          <button
            onClick={() => onNavigate('universe_home')}
            className="p-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stage Participants Anchor Bar (Matching 4.2 Stage Layout) */}
      <div className="relative z-10 px-5 pointer-events-none">
        {showStageInfo && (
          <div className="p-3 rounded-2xl glass-panel-glow border border-cyan-500/30 text-xs text-slate-200 pointer-events-auto space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Stage Specification · V2 Theme Matrix</span>
              </span>
              <button
                onClick={() => setShowStageInfo(false)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                  H
                </div>
                <div>
                  <span className="font-bold text-white block">Human Host</span>
                  <span className="text-[9px] text-slate-400">Presenter Zone</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                  AI
                </div>
                <div>
                  <span className="font-bold text-white block">Owned AI (Luna)</span>
                  <span className="text-[9px] text-cyan-400">Co-Host Runtime</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Comments Overlay matching Screen 10 */}
      <div className="relative z-10 px-5 space-y-2 pb-3 pointer-events-none">
        <div className="max-w-xs space-y-1.5">
          {chatMessages.slice(-4).map((msg, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] leading-tight animate-fadeIn pointer-events-auto"
            >
              <span className={`font-bold mr-1.5 ${msg.color}`}>{msg.user}:</span>
              <span className="text-slate-200">{msg.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Input & Reaction Bar matching Screen 10 */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-900">
        <form onSubmit={handleSendChat} className="flex items-center gap-2">
          {/* Mic Toggle Button */}
          <button
            type="button"
            onClick={() => setMicActive(!micActive)}
            className={`p-2.5 rounded-xl border transition-colors ${
              micActive
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Join live discussion..."
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Heart reaction button */}
          <button
            type="button"
            onClick={handleHeartClick}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 transition-transform active:scale-90"
            title="Send Heart"
          >
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="text-xs font-bold">{heartsCount}</span>
          </button>

          {/* Send */}
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-white shadow-md shadow-cyan-500/20 transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
