import React, { useState } from 'react';
import { ScreenId } from '../../types/allpha';
import {
  ChevronLeft,
  Mail,
  Wallet,
  ArrowRight,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';

interface IdentityScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const IdentityScreen: React.FC<IdentityScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('agent.explorer@allpha.universe');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between text-slate-100 overflow-y-auto no-scrollbar bg-slate-950">
      {/* Top Header */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-2 flex items-center justify-between bg-slate-950/70 backdrop-blur-md border-b border-slate-900">
        <button
          onClick={() => onNavigate('splash')}
          className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <span className="font-orbitron font-extrabold text-sm tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ALLPHA.
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">IDENTITY</span>
        </div>
      </div>

      {/* Hero Avatar Section matching Reference */}
      <div className="relative px-6 pt-3 pb-4 flex flex-col items-center text-center">
        {/* Glow Halo behind avatar */}
        <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_35px_rgba(192,132,252,0.45)] mb-3">
          {/* Stylized Celestial Avatar graphic with SVG & Canvas-style artwork */}
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-purple-950 relative flex items-center justify-center">
            {/* Ambient Cosmic Lights inside avatar */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.5),transparent_70%)]" />
            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-purple-950 to-transparent" />

            {/* Stylized Sci-Fi Avatar Portrait Silhouette & Shimmer */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Head & Hair */}
              <div className="w-16 h-20 rounded-full bg-gradient-to-b from-indigo-200 via-purple-300 to-cyan-200 shadow-inner relative">
                {/* Hair bang locks */}
                <div className="absolute -top-1 -left-2 w-8 h-10 rounded-full bg-indigo-300/80 blur-[0.5px]" />
                <div className="absolute -top-1 -right-2 w-8 h-10 rounded-full bg-purple-300/80 blur-[0.5px]" />
                {/* Anime eyes */}
                <div className="absolute top-8 left-3 w-3 h-2 rounded-full bg-cyan-900 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-300" />
                </div>
                <div className="absolute top-8 right-3 w-3 h-2 rounded-full bg-cyan-900 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-cyan-300" />
                </div>
                {/* Crystalline forehead crest */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-cyan-400 rotate-45" />
              </div>
              {/* Shoulders / High-collared cyber suit */}
              <div className="w-28 h-10 -mt-2 rounded-t-3xl bg-slate-800 border-t border-cyan-400/40" />
            </div>

            {/* Floating Sparkles around avatar */}
            <Sparkles className="absolute top-3 right-4 w-4 h-4 text-cyan-300 animate-pulse" />
            <Sparkles className="absolute bottom-4 left-3 w-3.5 h-3.5 text-purple-300 animate-pulse" />
          </div>
        </div>

        <div className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
          Create Your
        </div>
        <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
          Human Identity
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mt-0.5">
          Your presence in the Allpha Universe across all 350+ spatial worlds.
        </p>
      </div>

      {/* Auth Methods List matching Reference */}
      <div className="px-6 space-y-2.5">
        {/* Continue with Google */}
        <button
          onClick={() => onNavigate('universe_home')}
          className="w-full py-3 px-4 rounded-xl glass-panel hover:bg-slate-900 border border-slate-700/80 text-xs font-semibold text-white flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-950 font-bold text-[10px]">
              G
            </div>
            <span>Continue with Google</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Continue with Email */}
        <button
          onClick={() => onNavigate('universe_home')}
          className="w-full py-3 px-4 rounded-xl glass-panel hover:bg-slate-900 border border-slate-700/80 text-xs font-semibold text-white flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>Continue with Email</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Continue with Wallet */}
        <button
          onClick={() => onNavigate('universe_home')}
          className="w-full py-3 px-4 rounded-xl glass-panel hover:bg-slate-900 border border-slate-700/80 text-xs font-semibold text-white flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-purple-400" />
            <span>Continue with Wallet</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Or continue with email
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Form fields */}
        <div className="space-y-2 text-xs">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 pr-10"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div
            onClick={() => setAgreed(!agreed)}
            className="flex items-center gap-2 pt-1 cursor-pointer select-none text-[11px] text-slate-400"
          >
            {agreed ? (
              <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-600 shrink-0" />
            )}
            <span>
              I agree to the <span className="text-cyan-400 underline">Terms of Service</span> and{' '}
              <span className="text-cyan-400 underline">Privacy Policy</span>
            </span>
          </div>
        </div>
      </div>

      {/* Enter Universe Submit Button */}
      <div className="p-6">
        <button
          onClick={() => onNavigate('universe_home')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <span>Enter Universe</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
