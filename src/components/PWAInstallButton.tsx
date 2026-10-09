import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
        <Check className="w-3.5 h-3.5" />
        <span>PWA Installed</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)]"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install PWA</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-medium hover:bg-purple-500/30 transition-all"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl glass-panel-glow p-6 text-slate-100 relative border border-cyan-500/30">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 mx-auto border border-cyan-500/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-white mb-2">Install ALLPHA on iOS</h3>
              <p className="text-xs text-slate-300 leading-relaxed space-y-2 mb-4">
                1. Tap the <strong className="text-cyan-400">Share</strong> icon in Safari toolbar.<br />
                2. Scroll down and choose <strong className="text-cyan-400">Add to Home Screen</strong>.<br />
                3. Launch ALLPHA for full-screen 3D spatial experience.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white text-sm"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <button
      onClick={() => alert("To install ALLPHA PWA, use Chrome/Edge 'Install App' or Safari 'Add to Home Screen'.")}
      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium hover:text-white transition-colors"
      title="Install as Progressive Web App"
    >
      <Download className="w-3 h-3 text-cyan-400" />
      <span>PWA Ready</span>
    </button>
  );
};
