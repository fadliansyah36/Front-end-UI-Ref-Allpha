import React, { useState } from 'react';
import { ScreenId } from './types/allpha';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { BottomNavBar } from './components/BottomNavBar';
import { NavigationHUD } from './components/NavigationHUD';
import { BlenderPythonGeneratorModal } from './components/BlenderPythonGeneratorModal';
import { OfflineIndicator } from './components/OfflineIndicator';

// Screen Components
import { SplashScreen } from './components/screens/SplashScreen';
import { IdentityScreen } from './components/screens/IdentityScreen';
import { UniverseHomeScreen } from './components/screens/UniverseHomeScreen';
import { GalaxyNavigatorScreen } from './components/screens/GalaxyNavigatorScreen';
import { WorldDetailScreen } from './components/screens/WorldDetailScreen';
import { DistrictSelectionScreen } from './components/screens/DistrictSelectionScreen';
import { DistrictView3DScreen } from './components/screens/DistrictView3DScreen';
import { BoothViewScreen } from './components/screens/BoothViewScreen';
import { AgentInteractionScreen } from './components/screens/AgentInteractionScreen';
import { LiveExperienceScreen } from './components/screens/LiveExperienceScreen';
import { UniverseFeedScreen } from './components/screens/UniverseFeedScreen';
import { ContentCapsuleScreen } from './components/screens/ContentCapsuleScreen';
import { AskUniverseScreen } from './components/screens/AskUniverseScreen';
import { CreateExperienceScreen } from './components/screens/CreateExperienceScreen';
import { AgentFactoryScreen } from './components/screens/AgentFactoryScreen';
import { MyAgentScreen } from './components/screens/MyAgentScreen';
import { AgentLiveMonitorScreen } from './components/screens/AgentLiveMonitorScreen';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { CommunitiesScreen } from './components/screens/CommunitiesScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { ThemeBuilderScreen } from './components/screens/ThemeBuilderScreen';
import { HumanControlCenterScreen } from './components/screens/HumanControlCenterScreen';
import { UniverseMapScreen } from './components/screens/UniverseMapScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [isFramed, setIsFramed] = useState(true);
  const [isHUDOpen, setIsHUDOpen] = useState(false);
  const [isBlenderModalOpen, setIsBlenderModalOpen] = useState(false);
  const [selectedWorldId, setSelectedWorldId] = useState('quantum_city');

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screens that show the standard bottom tab bar
  const showBottomNav = [
    'universe_home',
    'galaxy_navigator',
    'messages',
    'control_center',
    'marketplace',
    'communities'
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Offline Status Banner */}
      <OfflineIndicator />

      {/* Top Application Bar & 24-Screen Quick Navigator */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        isFramed={isFramed}
        onToggleFrame={() => setIsFramed(!isFramed)}
        onOpenBlenderGenerator={() => setIsBlenderModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex items-center justify-center py-4 px-2 sm:px-6 relative">
        {/* Ambient Cosmic Radial Background */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_60%)]" />
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.1),transparent_60%)]" />

        {isFramed ? (
          /* Phone Frame Mockup (iPhone 16 Pro styling matching references) */
          <div className="relative w-full max-w-[412px] h-[870px] rounded-[52px] p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_80px_rgba(56,189,248,0.2)] border border-slate-700/60 flex flex-col overflow-hidden animate-fadeIn">
            {/* Phone Outer Edge Bezel Reflection */}
            <div className="absolute inset-1 rounded-[46px] border border-cyan-500/20 pointer-events-none" />

            {/* Screen Content Wrapper */}
            <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-slate-950 flex flex-col border border-slate-900">
              {/* Dynamic Island / Notch Bar */}
              <div className="relative z-30 pt-3 pb-1 px-7 flex items-center justify-between text-[11px] font-semibold text-slate-300 bg-transparent select-none">
                <span>9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 rounded-full bg-black border border-slate-800/80 flex items-center justify-center gap-1.5 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-cyan-400/30" />
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-sm border border-slate-400 flex items-center p-0.5">
                    <div className="w-full h-full bg-cyan-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Screen Body */}
              <div className="relative flex-1 overflow-hidden">
                {renderScreenContent(
                  currentScreen,
                  handleNavigate,
                  () => setIsBlenderModalOpen(true),
                  selectedWorldId,
                  setSelectedWorldId
                )}
              </div>

              {/* Bottom Nav Bar (when on core tabs) */}
              {showBottomNav && (
                <BottomNavBar
                  currentScreen={currentScreen}
                  onSelectScreen={handleNavigate}
                  onOpenHUD={() => setIsHUDOpen(true)}
                />
              )}

              {/* iOS Home Indicator Bar */}
              <div className="relative z-30 pb-2 pt-1 flex justify-center pointer-events-none bg-slate-950/40">
                <div className="w-32 h-1 rounded-full bg-slate-500/60" />
              </div>
            </div>
          </div>
        ) : (
          /* Fullscreen Responsive PWA View */
          <div className="w-full max-w-md min-h-[840px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative flex flex-col overflow-hidden animate-fadeIn">
            <div className="relative flex-1 overflow-hidden">
              {renderScreenContent(
                currentScreen,
                handleNavigate,
                () => setIsBlenderModalOpen(true),
                selectedWorldId,
                setSelectedWorldId
              )}
            </div>

            {showBottomNav && (
              <BottomNavBar
                currentScreen={currentScreen}
                onSelectScreen={handleNavigate}
                onOpenHUD={() => setIsHUDOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* Screen 24: Radial Navigation HUD Modal */}
      <NavigationHUD
        isOpen={isHUDOpen}
        onClose={() => setIsHUDOpen(false)}
        onSelectScreen={handleNavigate}
        onOpenBlenderGenerator={() => setIsBlenderModalOpen(true)}
      />

      {/* Python Blender 3D Theme Generator & Quality Gates Modal */}
      <BlenderPythonGeneratorModal
        isOpen={isBlenderModalOpen}
        onClose={() => setIsBlenderModalOpen(false)}
      />
    </div>
  );
}

function renderScreenContent(
  screen: ScreenId,
  navigate: (s: ScreenId) => void,
  openBlenderModal: () => void,
  selectedWorldId: string,
  setSelectedWorldId: (id: string) => void
) {
  switch (screen) {
    case 'splash':
      return <SplashScreen onNavigate={navigate} initialMode="splash" />;
    case 'explore_intro':
      return <SplashScreen onNavigate={navigate} initialMode="explore" />;
    case 'signup_identity':
      return <IdentityScreen onNavigate={navigate} />;
    case 'universe_home':
      return <UniverseHomeScreen onNavigate={navigate} onOpenBlenderGenerator={openBlenderModal} />;
    case 'galaxy_navigator':
      return (
        <GalaxyNavigatorScreen
          onNavigate={navigate}
          onSelectWorld={(id) => setSelectedWorldId(id)}
        />
      );
    case 'world_detail':
      return <WorldDetailScreen onNavigate={navigate} worldId={selectedWorldId} />;
    case 'district_selection':
      return <DistrictSelectionScreen onNavigate={navigate} />;
    case 'district_view_3d':
      return <DistrictView3DScreen onNavigate={navigate} />;
    case 'booth_view':
      return <BoothViewScreen onNavigate={navigate} />;
    case 'agent_interaction':
      return <AgentInteractionScreen onNavigate={navigate} />;
    case 'live_experience':
      return <LiveExperienceScreen onNavigate={navigate} />;
    case 'universe_feed':
      return <UniverseFeedScreen onNavigate={navigate} />;
    case 'content_capsule':
      return <ContentCapsuleScreen onNavigate={navigate} />;
    case 'ask_universe':
      return <AskUniverseScreen onNavigate={navigate} />;
    case 'create_experience':
      return <CreateExperienceScreen onNavigate={navigate} />;
    case 'agent_factory':
      return <AgentFactoryScreen onNavigate={navigate} />;
    case 'my_agent':
      return <MyAgentScreen onNavigate={navigate} />;
    case 'agent_live_monitor':
      return <AgentLiveMonitorScreen onNavigate={navigate} />;
    case 'marketplace':
      return <MarketplaceScreen onNavigate={navigate} onOpenBlenderGenerator={openBlenderModal} />;
    case 'communities':
      return <CommunitiesScreen onNavigate={navigate} />;
    case 'messages':
      return <MessagesScreen onNavigate={navigate} />;
    case 'theme_builder':
      return <ThemeBuilderScreen onNavigate={navigate} onOpenBlenderGenerator={openBlenderModal} />;
    case 'control_center':
      return <HumanControlCenterScreen onNavigate={navigate} />;
    case 'universe_map':
      return <UniverseMapScreen onNavigate={navigate} />;
    default:
      return <UniverseHomeScreen onNavigate={navigate} onOpenBlenderGenerator={openBlenderModal} />;
  }
}
