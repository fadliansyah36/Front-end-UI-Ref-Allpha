import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Radio,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Terminal,
  Send,
  X
} from 'lucide-react';

interface AgentLiveMonitorScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AgentLiveMonitorScreen: React.FC<AgentLiveMonitorScreenProps> = ({ onNavigate }) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandText, setCommandText] = useState('');

  const [activities, setActivities] = useState([
    { time: '10:24', text: 'Exploring Startup District in Quantum City', status: 'done' },
    { time: '10:25', text: 'Found 2 relevant agents (@marketingAI, @ventureAI)', status: 'done' },
    { time: '10:26', text: 'Approaching @marketingAI spatial booth', status: 'done' },
    { time: '10:27', text: 'Started conversation: "Collaborative 3D Asset Launch"', status: 'done' },
    { time: '10:29', text: 'Sharing portfolio & Python Blender theme specifications', status: 'done' },
    { time: '10:30', text: 'Waiting for approval (Human review required)', status: 'action_required' }
  ]);

  const handleGiveCommand = () => {
    if (!commandText.trim()) return;
    setActivities((prev) => [
      ...prev,
      {
        time: '10:31',
        text: `Executing user command: "${commandText}"`,
        status: 'done'
      }
    ]);
    setCommandText('');
    setCommandOpen(false);
  };

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950 pb-20">
      {/* Top Header matching Screen 17 */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('my_agent')}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded-full">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>LIVE</span>
            </span>
            <span className="font-display font-bold text-sm text-white">Agent Live Monitor</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('my_agent')}
          className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Body Timeline matching Screen 17 */}
      <div className="p-5 space-y-4 flex-1">
        {/* Agent active status card */}
        <div className="p-3.5 rounded-2xl glass-panel-glow border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center font-bold text-purple-300">
              L
            </div>
            <div>
              <div className="text-xs font-bold text-white">Luna @LunaAI</div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Autonomous Mission: Sector Collaboration</span>
              </div>
            </div>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">10:30 AM</span>
        </div>

        {/* Realtime Event Stream matching Screen 17 */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
            Agent Activity Realtime
          </div>

          <div className="space-y-2.5 pt-1">
            {activities.map((act, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  act.status === 'action_required'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 shrink-0 mt-0.5">
                    {act.time}
                  </span>
                  <div className="space-y-0.5 flex-1 text-xs leading-relaxed">
                    <div>{act.text}</div>
                    {act.status === 'action_required' && (
                      <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold mt-1">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <span>Requires human confirmation to seal spatial contract</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Give Command Modal or Action Sheet */}
      {commandOpen && (
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Dispatch Command to Luna</span>
            <button onClick={() => setCommandOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={commandText}
              onChange={(e) => setCommandText(e.target.value)}
              placeholder="e.g. Approve contract with @marketingAI..."
              className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleGiveCommand}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xs"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA Button: Give Command */}
      {!commandOpen && (
        <div className="p-5">
          <button
            onClick={() => setCommandOpen(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Terminal className="w-4 h-4" />
            <span>Give Command</span>
          </button>
        </div>
      )}
    </div>
  );
};
