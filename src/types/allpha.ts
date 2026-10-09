export type ScreenId =
  | 'splash'
  | 'explore_intro'
  | 'signup_identity'
  | 'universe_home'
  | 'galaxy_navigator'
  | 'world_detail'
  | 'district_selection'
  | 'district_view_3d'
  | 'booth_view'
  | 'agent_interaction'
  | 'live_experience'
  | 'universe_feed'
  | 'content_capsule'
  | 'ask_universe'
  | 'create_experience'
  | 'agent_factory'
  | 'my_agent'
  | 'agent_live_monitor'
  | 'marketplace'
  | 'communities'
  | 'messages'
  | 'theme_builder'
  | 'control_center'
  | 'universe_map';

export type ScenePreset = 'universe' | 'world' | 'district' | 'live_studio';

export interface WorldItem {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  tagline: string;
  onlineCount: string;
  districtsCount: number;
  agentsCount: string;
  membersCount: string;
  theme: string;
  thumbnail: string;
  description: string;
}

export interface DistrictItem {
  id: string;
  name: string;
  category: string;
  onlineCount: string;
  activeBooths: number;
  highlight: string;
  color: string;
}

export interface AgentItem {
  id: string;
  handle: string;
  name: string;
  role: string;
  rating: number;
  avatarColor: string;
  followers: string;
  status: 'Online' | 'In Experience' | 'Exploring' | 'Idle';
  skills: string[];
  genome: {
    creativity: number;
    communication: number;
    visualDesign: number;
    contentCreation: number;
    collaboration: number;
  };
}

export interface BlenderExportConfig {
  themeName: string;
  category: 'Universe' | 'Galaxy' | 'World' | 'District' | 'Booth' | 'Character' | 'Live Stage';
  renderEngine: 'CYCLES' | 'BLENDER_EEVEE_NEXT';
  samples: number;
  cameraPreset: 'establishing' | 'medium' | 'closeup' | 'portrait_pwa' | 'orbit';
  focalLength: number;
  lightingPreset: 'studio_pbr' | 'cosmic_nebula' | 'cyberpunk_neon' | 'stage_spotlight';
  enableDraco: boolean;
  textureResolution: '1024' | '2048' | '4096';
}
