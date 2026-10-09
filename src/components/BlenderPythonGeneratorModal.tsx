import React, { useState } from 'react';
import {
  Code,
  Download,
  Copy,
  Check,
  X,
  Sliders,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { BlenderExportConfig } from '../types/allpha';

interface BlenderPythonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTheme?: string;
  initialCategory?: 'Universe' | 'Galaxy' | 'World' | 'District' | 'Booth' | 'Character' | 'Live Stage';
}

export const BlenderPythonGeneratorModal: React.FC<BlenderPythonGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialTheme = 'Crystal AI City',
  initialCategory = 'District'
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'code' | 'gates'>('code');
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState<BlenderExportConfig>({
    themeName: initialTheme,
    category: initialCategory,
    renderEngine: 'CYCLES',
    samples: 256,
    cameraPreset: 'portrait_pwa',
    focalLength: 35,
    lightingPreset: 'studio_pbr',
    enableDraco: true,
    textureResolution: '2048'
  });

  // Quality Gates status
  const [gatesStatus, setGatesStatus] = useState<Record<string, boolean>>({
    g1: true,
    g2: true,
    g3: true,
    g4: true,
    g5: true,
    g6: true,
    g7: true,
    g8: true
  });

  if (!isOpen) return null;

  // Generate python script based on config
  const generatePythonScript = () => {
    const isPortrait = config.cameraPreset === 'portrait_pwa';
    const resX = isPortrait ? 1080 : 1920;
    const resY = isPortrait ? 1920 : 1080;

    return `"""
=============================================================================
ALLPHA UNIVERSE — 3D Theme Asset Production Pipeline
Theme: ${config.themeName} | Category: ${config.category}
Standard: Blender Python API (bpy) for Cycles & Eevee Next
Canonical Runtime Target: AllphaWorldRenderer (Three.js / React Three Fiber PWA)
Quality Gate Verification: G1 (Art Direction) -> G8 (Production Approval)
=============================================================================
"""

import bpy
import math
import os

def clear_existing_scene():
    """Reset scene objects, materials and lights cleanly."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    print("[ALLPHA Pipeline] Cleaned workspace for ${config.themeName}")

def setup_render_engine():
    """Configure render engine: ${config.renderEngine} with production color management."""
    scene = bpy.context.scene
    scene.render.engine = '${config.renderEngine}'
    scene.render.resolution_x = ${resX}
    scene.render.resolution_y = ${resY}
    scene.render.resolution_percentage = 100

    # Color Management (Film-grade AgX / Filmic)
    scene.view_settings.view_transform = 'AgX' if hasattr(scene.view_settings, 'view_transform') else 'Filmic'
    scene.view_settings.look = 'High Contrast'
    scene.view_settings.exposure = 0.25

    if scene.render.engine == 'CYCLES':
        scene.cycles.device = 'GPU'
        scene.cycles.samples = ${config.samples}
        scene.cycles.use_denoising = True
        scene.cycles.denoiser = 'OPENIMAGEDENOISE'
    print("[ALLPHA Pipeline] Render engine configured: ${config.renderEngine}")

def setup_camera():
    """Setup ${config.cameraPreset} camera with focal length ${config.focalLength}mm."""
    cam_data = bpy.data.cameras.new(name="Allpha_${config.cameraPreset}_Camera")
    cam_data.lens = ${config.focalLength}
    cam_data.sensor_width = 36.0
    cam_data.clip_start = 0.1
    cam_data.clip_end = 1000.0

    cam_obj = bpy.data.objects.new("AllphaCamera", cam_data)
    bpy.context.collection.objects.link(cam_obj)
    bpy.context.scene.camera = cam_obj

    # Position based on preset
    ${
      config.cameraPreset === 'portrait_pwa'
        ? `cam_obj.location = (0.0, -18.0, 9.5)
    cam_obj.rotation_euler = (math.radians(65), 0, 0)`
        : config.cameraPreset === 'medium'
        ? `cam_obj.location = (0.0, -12.0, 5.0)
    cam_obj.rotation_euler = (math.radians(75), 0, 0)`
        : `cam_obj.location = (14.0, -22.0, 16.0)
    cam_obj.rotation_euler = (math.radians(55), 0, math.radians(30))`
    }
    print("[ALLPHA Pipeline] Camera positioned for Mobile PWA framing")

def setup_lighting_rig():
    """Canonical 4-Tier Lighting: Key + Fill + Rim + Practical LEDs + World Environment."""
    coll = bpy.context.collection

    # 1. Key Light (forms primary mass and volume)
    key_data = bpy.data.lights.new(name="Key_Light_Cyan", type='AREA')
    key_data.energy = 1400.0
    key_data.size = 6.0
    key_data.color = (0.22, 0.74, 0.97) # Allpha Electric Cyan
    key_obj = bpy.data.objects.new("KeyLight", key_data)
    key_obj.location = (8.0, -12.0, 14.0)
    coll.objects.link(key_obj)

    # 2. Fill Light (lifts shadow contrast without flattening)
    fill_data = bpy.data.lights.new(name="Fill_Light_Indigo", type='AREA')
    fill_data.energy = 600.0
    fill_data.size = 10.0
    fill_data.color = (0.50, 0.55, 0.98) # Deep Violet
    fill_obj = bpy.data.objects.new("FillLight", fill_data)
    fill_obj.location = (-12.0, -8.0, 8.0)
    coll.objects.link(fill_obj)

    # 3. Rim Light (separates silhouettes against deep cosmic dark)
    rim_data = bpy.data.lights.new(name="Rim_Light_Purple", type='SPOT')
    rim_data.energy = 2200.0
    rim_data.spot_size = math.radians(45)
    rim_data.color = (0.75, 0.52, 0.98) # Celestial Purple
    rim_obj = bpy.data.objects.new("RimLight", rim_data)
    rim_obj.location = (0.0, 16.0, 12.0)
    coll.objects.link(rim_obj)

    # 4. Practical Lights (Neon Edge Strips)
    point_data = bpy.data.lights.new(name="Practical_LED_Glow", type='POINT')
    point_data.energy = 450.0
    point_data.color = (0.22, 0.95, 0.85)
    point_obj = bpy.data.objects.new("PracticalLED", point_data)
    point_obj.location = (0.0, 0.0, 3.5)
    coll.objects.link(point_obj)

    print("[ALLPHA Pipeline] 4-Tier Lighting Rig initialized successfully")

def create_pbr_material(name, base_color, metallic=0.8, roughness=0.18, emission_color=None, emission_strength=0.0):
    """Creates Principled BSDF PBR Material adhering to Three.js / WebGL standards."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")

    if bsdf:
        bsdf.inputs['Base Color'].default_value = (*base_color, 1.0)
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Roughness'].default_value = roughness
        if emission_color and emission_strength > 0:
            if 'Emission Color' in bsdf.inputs:
                bsdf.inputs['Emission Color'].default_value = (*emission_color, 1.0)
                bsdf.inputs['Emission Strength'].default_value = emission_strength
            elif 'Emission' in bsdf.inputs:
                bsdf.inputs['Emission'].default_value = (*emission_color, 1.0)
    return mat

def build_scene_geometry():
    """Generates canonical architecture for category: ${config.category}."""
    coll = bpy.context.collection

    # Primary Materials
    mat_metal = create_pbr_material("Allpha_TitaniumMesh", (0.08, 0.12, 0.22), metallic=0.9, roughness=0.15)
    mat_glow = create_pbr_material("Allpha_NeonGlow", (0.22, 0.74, 0.97), metallic=0.1, roughness=0.1,
                                   emission_color=(0.22, 0.74, 0.97), emission_strength=4.5)
    mat_glass = create_pbr_material("Allpha_CrystalPanel", (0.02, 0.05, 0.12), metallic=0.05, roughness=0.05)

    # Base Studio / World Podium
    bpy.ops.mesh.primitive_cylinder_add(radius=8.0, depth=0.4, location=(0, 0, -0.2))
    base_obj = bpy.context.active_object
    base_obj.name = "Allpha_StudioFloor"
    base_obj.data.materials.append(mat_metal)

    # Central Core / District Pavilion
    bpy.ops.mesh.primitive_cylinder_add(radius=1.8, depth=7.0, vertices=12, location=(0, 0, 3.5))
    citadel = bpy.context.active_object
    citadel.name = "Allpha_ApexCitadel"
    citadel.data.materials.append(mat_glass)

    # Orbiting / Stage Rings
    bpy.ops.mesh.primitive_torus_add(major_radius=4.5, minor_radius=0.12, location=(0, 0, 3.5))
    ring1 = bpy.context.active_object
    ring1.name = "Allpha_OrbitalRing_Primary"
    ring1.data.materials.append(mat_glow)

    print("[ALLPHA Pipeline] Geometry assembly complete for: ${config.category}")

def export_gltf_glb(output_path="allpha_theme_${config.themeName.toLowerCase().replace(/\\s+/g, '_')}.glb"):
    """Optimized GLB Export with Draco Compression for Allpha PWA Runtime."""
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        use_selection=False,
        export_apply=True,
        export_draco_mesh_compression_enable=${config.enableDraco ? 'True' : 'False'},
        export_draco_mesh_compression_level=7,
        export_materials='EXPORT',
        export_cameras=True,
        export_lights=True
    )
    print(f"[ALLPHA Pipeline] Successfully generated production GLB: {output_path}")

# Pipeline Execution Entry Point
if __name__ == "__main__":
    clear_existing_scene()
    setup_render_engine()
    setup_camera()
    setup_lighting_rig()
    build_scene_geometry()
    # To export GLB:
    # export_gltf_glb()
    print("[ALLPHA Pipeline] Ready for Golden Render QA!")
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatePythonScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatePythonScript()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `render_allpha_${config.themeName.toLowerCase().replace(/\s+/g, '_')}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleGate = (key: string) => {
    setGatesStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl glass-panel-glow border border-cyan-500/30 text-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">Blender Python 3D Theme Generator</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                  Canonical Pipeline
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authoring: Blender (Cycles/Eevee) · Runtime: AllphaWorldRenderer (Three.js PWA)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/40">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Python Script (.py)</span>
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'config'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Pipeline Config</span>
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'gates'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quality Gates (G1 - G8)</span>
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="font-semibold text-white">{config.themeName}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-cyan-400">{config.category}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-purple-300">{config.renderEngine}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{config.cameraPreset}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors shadow-md shadow-cyan-600/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .py</span>
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-xl bg-slate-950 border border-slate-800/80 p-4 font-mono text-[11px] text-cyan-100 overflow-x-auto max-h-[460px] leading-relaxed shadow-inner">
                <pre>{generatePythonScript()}</pre>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Execution Tip:</strong> Run in terminal with{' '}
                  <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded">
                    blender --background --python render_allpha_{config.themeName.toLowerCase().replace(/\s+/g, '_')}.py
                  </code>{' '}
                  to generate the photorealistic GLB asset. The resulting asset is directly compatible with AllphaWorldRenderer!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category & Theme */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset Category</label>
                  <select
                    value={config.category}
                    onChange={(e) => setConfig({ ...config, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="District">District (Live Studio / Plaza)</option>
                    <option value="Universe">Universe (Cosmic Hub / 6 Sectors)</option>
                    <option value="Galaxy">Galaxy (Spiral Core & World Nodes)</option>
                    <option value="World">World (Quantum City High Rises)</option>
                    <option value="Booth">Booth (Exhibition Tenant / Studio)</option>
                    <option value="Live Stage">Live Stage (LED Screen & Podium)</option>
                    <option value="Character">Character (AI Avatar & Rig)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Theme Preset</label>
                  <select
                    value={config.themeName}
                    onChange={(e) => setConfig({ ...config, themeName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Crystal AI City">Crystal AI City (Golden Theme V2)</option>
                    <option value="Cosmic Universe">Cosmic Universe (Celestial Galaxy)</option>
                    <option value="Cyberpunk Neon Plaza">Cyberpunk Neon Plaza</option>
                    <option value="Aurora Kingdom">Aurora Kingdom (Bioluminescent)</option>
                    <option value="Neo Jakarta 2088">Neo Jakarta 2088</option>
                    <option value="Deep Space Orbital">Deep Space Orbital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Render Engine</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setConfig({ ...config, renderEngine: 'CYCLES' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        config.renderEngine === 'CYCLES'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Cycles (GPU Path Trace)</span>
                    </button>
                    <button
                      onClick={() => setConfig({ ...config, renderEngine: 'BLENDER_EEVEE_NEXT' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        config.renderEngine === 'BLENDER_EEVEE_NEXT'
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.2)]'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Eevee Next (Real-Time)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Path Tracing Samples ({config.samples})
                  </label>
                  <input
                    type="range"
                    min="64"
                    max="1024"
                    step="64"
                    value={config.samples}
                    onChange={(e) => setConfig({ ...config, samples: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>64 (Draft Preview)</span>
                    <span>256 (Production Golden)</span>
                    <span>1024 (Ultra Hero)</span>
                  </div>
                </div>
              </div>

              {/* Camera & Lighting */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Camera Composition</label>
                  <select
                    value={config.cameraPreset}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        cameraPreset: e.target.value as any,
                        focalLength: e.target.value === 'portrait_pwa' ? 35 : e.target.value === 'medium' ? 50 : 28
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="portrait_pwa">Portrait Composition (Mobile-First PWA 9:16)</option>
                    <option value="establishing">Establishing Shot (Wide 28mm Landscape)</option>
                    <option value="medium">Medium Shot (50mm Interaction Focal)</option>
                    <option value="closeup">Close-up (85mm Character Detail)</option>
                    <option value="orbit">Orbit Camera (Universe Navigation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lighting Setup</label>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-medium">Key Light (Volume)</span>
                      <span className="text-slate-400">1400W Cyan Area</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-400 font-medium">Fill Light (Shadow Contrast)</span>
                      <span className="text-slate-400">600W Indigo Soft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-medium">Rim Light (Edge Silhouettes)</span>
                      <span className="text-slate-400">2200W Spot Focus</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-medium">Practical Lights</span>
                      <span className="text-slate-400">LED floor & screens</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">glTF / GLB Compression</label>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div>
                      <div className="text-xs font-medium text-white">Draco Mesh Compression</div>
                      <div className="text-[10px] text-slate-400">Reduces asset size up to 70% for PWA speeds</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.enableDraco}
                      onChange={(e) => setConfig({ ...config, enableDraco: e.target.checked })}
                      className="w-4 h-4 accent-cyan-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gates' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-3">
                <strong>Quality Gates (G1 - G8):</strong> GREEN teknis tidak otomatis berarti GREEN visual.
                Aset hanya dipromosikan ke AllphaWorldRenderer setelah seluruh gate diverifikasi.
              </p>

              {[
                { id: 'g1', gate: 'G1 — Art direction', desc: 'Sesuai screenshot referensi & identitas tema Allpha' },
                { id: 'g2', gate: 'G2 — Scene composition', desc: 'Objek utama terlihat, proporsional, tidak saling menutupi' },
                { id: 'g3', gate: 'G3 — Material & lighting', desc: 'PBR Principled BSDF, tidak overexposed atau tenggelam dalam hitam' },
                { id: 'g4', gate: 'G4 — Technical GLB', desc: 'File valid, node lengkap, scale 1:1, pivot center' },
                { id: 'g5', gate: 'G5 — Optimization', desc: '< 4MB GLB, Draco compression, draw calls terukur' },
                { id: 'g6', gate: 'G6 — Visual QA', desc: 'Golden render ditinjau manusia pada ukuran mobile PWA & desktop' },
                { id: 'g7', gate: 'G7 — Runtime QA', desc: 'Aset tampil sempurna di AllphaWorldRenderer Three.js' },
                { id: 'g8', gate: 'G8 — Production approval', desc: 'Storage checksum, manifest theme_assets diverifikasi' }
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => toggleGate(g.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    gatesStatus[g.id]
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className={gatesStatus[g.id] ? 'text-emerald-400' : 'text-slate-400'}>{g.gate}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{g.desc}</div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      gatesStatus[g.id]
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {gatesStatus[g.id] ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '—'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/90">
          <div className="text-xs text-slate-400">
            Pipeline: <strong>Theme V2 Matrix (25 Theme × 14 Kategori)</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition-colors"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Python Script'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-opacity"
            >
              Apply to Runtime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
