import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ScenePreset } from '../types/allpha';
import {
  Eye,
  RotateCcw,
  Camera,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Box,
  Sun,
  Flame,
  Zap,
  Check
} from 'lucide-react';

interface AllphaWorldRendererProps {
  preset?: ScenePreset;
  interactive?: boolean;
  onNodeSelect?: (nodeName: string) => void;
  className?: string;
  showControlsOverlay?: boolean;
  activeNodeId?: string;
  allowPhotoToggle?: boolean;
}

type LightingMood = 'broadcast' | 'cyberpunk' | 'keynote' | 'clay';

// ============================================================================
// PROCEDURAL HIGH-RESOLUTION TEXTURE GENERATORS (No raw plain boxes!)
// ============================================================================

// 1. Procedural Skyscraper Window Matrix Texture (Cyan/Gold illuminated interiors)
function createSkyscraperWindowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark obsidian facade base
  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, 512, 1024);

  // Subtle architectural vertical mullions
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  for (let x = 0; x < 512; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }

  // Windows grid
  const cols = 28;
  const rows = 64;
  const cellW = 512 / cols;
  const cellH = 1024 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const rand = Math.random();
      const x = c * cellW + 2;
      const y = r * cellH + 2;
      const w = cellW - 4;
      const h = cellH - 4;

      if (rand > 0.88) {
        // Vibrant Cyan lit office
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(x, y, w, h);
      } else if (rand > 0.76) {
        // Warm amber lit office
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(x, y, w, h);
      } else if (rand > 0.65) {
        // Deep purple/magenta server floor
        ctx.fillStyle = '#c084fc';
        ctx.fillRect(x, y, w, h);
      } else if (rand > 0.5) {
        // Dim ambient interior
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y, w, h);
      } else {
        // Dark unlit window
        ctx.fillStyle = '#090d1a';
        ctx.fillRect(x, y, w, h);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  return texture;
}

// 2. Procedural Brushed Reflective Floor Texture for Studio & Pavilion
function createStudioFloorTexture(): { map: THREE.CanvasTexture; roughnessMap: THREE.CanvasTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark slate base
  ctx.fillStyle = '#080d1a';
  ctx.fillRect(0, 0, 512, 512);

  // Large floor tile grid seams
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 512; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Brushed micro scratches
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 0.5;
  for (let s = 0; s < 300; s++) {
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y + (Math.random() - 0.5) * 4);
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(4, 4);

  // Roughness map
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = 256;
  roughCanvas.height = 256;
  const rCtx = roughCanvas.getContext('2d')!;
  rCtx.fillStyle = '#1c1c1c'; // very smooth/glossy (0.11 roughness)
  rCtx.fillRect(0, 0, 256, 256);
  // Tile joints are rougher
  rCtx.strokeStyle = '#888888';
  rCtx.lineWidth = 2;
  for (let i = 0; i <= 256; i += 32) {
    rCtx.strokeRect(i, 0, 1, 256);
    rCtx.strokeRect(0, i, 256, 1);
  }

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(4, 4);

  return { map, roughnessMap };
}

// 3. High-Definition Live Generative LED Broadcast Screen Canvas
function createLiveVideoWallSystem() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  return {
    canvas,
    update: (time: number) => {
      // Cinematic backdrop gradient
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, '#040714');
      grad.addColorStop(0.4, '#091330');
      grad.addColorStop(0.7, '#140c2e');
      grad.addColorStop(1, '#020510');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Sci-Fi Horizon grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 1024; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // Studio Header Banner
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText('ALLPHA LIVE VIRTUAL STAGE', 44, 58);

      ctx.fillStyle = 'rgba(192, 132, 252, 0.9)';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('DISTRICT 01 · 2.4K PARTICIPANTS · WEBRTC ACTIVE · AI CO-HOST LIVE', 44, 90);

      // Live Audio Spectrum Graphic (pulsing dynamic audio wave bars)
      const bars = 42;
      for (let i = 0; i < bars; i++) {
        const height = Math.abs(Math.sin(time * 3.5 + i * 0.28)) * 120 + 15;
        const barGrad = ctx.createLinearGradient(0, 360 - height, 0, 360);
        barGrad.addColorStop(0, '#38bdf8');
        barGrad.addColorStop(1, '#6366f1');
        ctx.fillStyle = barGrad;
        ctx.fillRect(44 + i * 13, 360 - height, 8, height);
      }

      // Skyline silhouette on the LED screen (representing virtual set extension!)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
      const buildings = [
        { x: 620, w: 45, h: 220 },
        { x: 675, w: 60, h: 290 },
        { x: 745, w: 50, h: 250 },
        { x: 805, w: 75, h: 320 },
        { x: 890, w: 55, h: 240 },
        { x: 955, w: 45, h: 190 }
      ];
      buildings.forEach((b) => {
        ctx.fillRect(b.x, 380 - b.h, b.w, b.h);
        // Antenna beacon
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(b.x + b.w / 2, 380 - b.h - 4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
      });

      // Central Holographic Brain / AI Neural Core on LED wall
      const cx = 780;
      const cy = 200;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        const rx = 90 * Math.cos(time * 1.2 + i * 0.7);
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(rx), 90, 0, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(192, 132, 252, 0.6)' : 'rgba(56, 189, 248, 0.6)';
        ctx.stroke();
      }

      // Center glowing core
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();

      // Lower ticker telemetry tape
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(0, 470, 1024, 42);
      ctx.fillStyle = '#22d3ee';
      ctx.font = '13px monospace';
      const offset = (time * 60) % 600;
      ctx.fillText(
        '>>> CYCLES 1024 SAMPLES RENDERING ACTIVE • RUNTIME WEBRTC STREAMING 60FPS • HOST: @anna AI: @luna • BOOTH GCIE ONLINE',
        40 - offset,
        496
      );
    }
  };
}

// 4. Volumetric Light Cone Generator (Creates the signature cinematic concert / broadcast light shaft!)
function createVolumetricSpotlightBeam(
  color: number,
  height: number = 10,
  topRadius: number = 0.25,
  bottomRadius: number = 3.6
): THREE.Mesh {
  const geom = new THREE.CylinderGeometry(topRadius, bottomRadius, height, 32, 1, true);
  // Pivot at top
  geom.translate(0, -height / 2, 0);

  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  return new THREE.Mesh(geom, mat);
}

export const AllphaWorldRenderer: React.FC<AllphaWorldRendererProps> = ({
  preset = 'universe',
  interactive = true,
  onNodeSelect,
  className = '',
  showControlsOverlay = true,
  activeNodeId,
  allowPhotoToggle = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Dynamic Scene Objects refs
  const worldGroupRef = useRef<THREE.Group | null>(null);
  const interactiveNodesRef = useRef<THREE.Mesh[]>([]);
  const trafficParticlesRef = useRef<THREE.Points | null>(null);
  const ledTextureUpdaterRef = useRef<((time: number) => void) | null>(null);
  const ledCanvasTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.PointLight;
    spotCyan: THREE.SpotLight;
    spotPurple: THREE.SpotLight;
  } | null>(null);

  // States
  const [renderMode, setRenderMode] = useState<'pbr' | 'clay' | 'wireframe'>('pbr');
  const [cameraAngle, setCameraAngle] = useState<'establishing' | 'medium' | 'portrait'>('establishing');
  const [viewStyle, setViewStyle] = useState<'3d_interactive' | 'photoreal_golden'>('3d_interactive');
  const [lightingMood, setLightingMood] = useState<LightingMood>('broadcast');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(activeNodeId || null);

  // Drag interaction trackers
  const isPointerDownRef = useRef(false);
  const prevPointerXRef = useRef(0);
  const prevPointerYRef = useRef(0);

  // Camera settings per preset
  const setCameraForPreset = useCallback(
    (cam: THREE.PerspectiveCamera, pr: ScenePreset, angle: 'establishing' | 'medium' | 'portrait') => {
      if (angle === 'portrait') {
        cam.fov = 48;
        if (pr === 'universe') cam.position.set(0, 11, 24);
        else if (pr === 'world') cam.position.set(0, 8, 18);
        else if (pr === 'district') cam.position.set(0, 6, 13);
        else cam.position.set(0, 2.8, 8.5); // Live studio stage portrait
      } else if (angle === 'medium') {
        cam.fov = 40;
        if (pr === 'universe') cam.position.set(0, 7, 16);
        else if (pr === 'world') cam.position.set(4, 5, 12);
        else if (pr === 'district') cam.position.set(0, 3.8, 9);
        else cam.position.set(0, 2.2, 6.4); // Live studio host close
      } else {
        // Establishing
        cam.fov = 44;
        if (pr === 'universe') cam.position.set(0, 9, 21);
        else if (pr === 'world') cam.position.set(9, 8, 17);
        else if (pr === 'district') cam.position.set(6, 6, 12);
        else cam.position.set(0, 2.9, 9.8); // Establishing stage wide
      }
      cam.lookAt(0, pr === 'live_studio' ? 1.3 : 0, 0);
      cam.updateProjectionMatrix();
    },
    []
  );

  // Update lights based on lighting mood
  const applyLightingMood = useCallback((mood: LightingMood) => {
    if (!lightsRef.current) return;
    const { ambient, key, fill, rim, spotCyan, spotPurple } = lightsRef.current;

    if (mood === 'cyberpunk') {
      ambient.color.setHex(0x060814);
      ambient.intensity = 1.4;
      key.color.setHex(0x00f0ff);
      key.intensity = 4.2;
      fill.color.setHex(0xd946ef);
      fill.intensity = 2.8;
      rim.color.setHex(0xa855f7);
      rim.intensity = 5.0;
      spotCyan.color.setHex(0x00ffff);
      spotCyan.intensity = 6.0;
      spotPurple.color.setHex(0xff007f);
      spotPurple.intensity = 6.0;
    } else if (mood === 'keynote') {
      // Transform 2026 Golden Keynote
      ambient.color.setHex(0x18101e);
      ambient.intensity = 1.8;
      key.color.setHex(0xfbbf24);
      key.intensity = 4.0;
      fill.color.setHex(0x38bdf8);
      fill.intensity = 2.0;
      rim.color.setHex(0xf59e0b);
      rim.intensity = 4.5;
      spotCyan.color.setHex(0xfbbf24);
      spotCyan.intensity = 5.0;
      spotPurple.color.setHex(0x818cf8);
      spotPurple.intensity = 4.0;
    } else if (mood === 'clay') {
      ambient.color.setHex(0xffffff);
      ambient.intensity = 2.6;
      key.color.setHex(0xffffff);
      key.intensity = 2.0;
      fill.color.setHex(0xcccccc);
      fill.intensity = 1.2;
      rim.color.setHex(0xffffff);
      rim.intensity = 1.0;
      spotCyan.intensity = 0;
      spotPurple.intensity = 0;
    } else {
      // Broadcast standard (canonical)
      ambient.color.setHex(0x0a1329);
      ambient.intensity = 2.4;
      key.color.setHex(0x38bdf8);
      key.intensity = 3.6;
      fill.color.setHex(0x818cf8);
      fill.intensity = 1.8;
      rim.color.setHex(0xc084fc);
      rim.intensity = 4.5;
      spotCyan.color.setHex(0x38bdf8);
      spotCyan.intensity = 5.0;
      spotPurple.color.setHex(0xc084fc);
      spotPurple.intensity = 5.0;
    }
  }, []);

  useEffect(() => {
    if (viewStyle === 'photoreal_golden') return;

    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030714, 0.016);

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(44, aspect, 0.1, 1000);
    cameraRef.current = camera;
    setCameraForPreset(camera, preset, cameraAngle);

    // 3. Renderer with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.38;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a1329, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.6);
    keyLight.position.set(7, 14, 9);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    fillLight.position.set(-9, -4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xc084fc, 4.5, 60);
    rimLight.position.set(0, 10, -12);
    scene.add(rimLight);

    const spotCyan = new THREE.SpotLight(0x38bdf8, 5.0, 32, Math.PI / 4.8, 0.35, 1.2);
    spotCyan.position.set(4, 9, 3);
    spotCyan.target.position.set(0, 1, 0);
    scene.add(spotCyan);
    scene.add(spotCyan.target);

    const spotPurple = new THREE.SpotLight(0xc084fc, 5.0, 32, Math.PI / 4.8, 0.35, 1.2);
    spotPurple.position.set(-4, 9, 3);
    spotPurple.target.position.set(0, 1, 0);
    scene.add(spotPurple);
    scene.add(spotPurple.target);

    lightsRef.current = {
      ambient: ambientLight,
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
      spotCyan,
      spotPurple
    };
    applyLightingMood(lightingMood);

    // Volumetric Spotlight Beams from overhead truss
    const beamCyan = createVolumetricSpotlightBeam(0x38bdf8, 9, 0.25, 3.4);
    beamCyan.position.set(4, 9, 3);
    beamCyan.lookAt(0, 1, 0);
    beamCyan.rotateX(-Math.PI / 2);
    scene.add(beamCyan);

    const beamPurple = createVolumetricSpotlightBeam(0xc084fc, 9, 0.25, 3.4);
    beamPurple.position.set(-4, 9, 3);
    beamPurple.lookAt(0, 1, 0);
    beamPurple.rotateX(-Math.PI / 2);
    scene.add(beamPurple);

    // 5. Starfield & Cosmic Dust
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1600;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 35 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorMix = Math.random();
      if (colorMix > 0.6) {
        starColors[i * 3] = 0.22;
        starColors[i * 3 + 1] = 0.74;
        starColors[i * 3 + 2] = 0.97;
      } else if (colorMix > 0.3) {
        starColors[i * 3] = 0.75;
        starColors[i * 3 + 1] = 0.52;
        starColors[i * 3 + 2] = 0.98;
      } else {
        starColors[i * 3] = 0.95;
        starColors[i * 3 + 1] = 0.98;
        starColors[i * 3 + 2] = 1.0;
      }
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 6. Setup Live Video Wall
    const ledSys = createLiveVideoWallSystem();
    const ledTexture = new THREE.CanvasTexture(ledSys.canvas);
    ledTexture.wrapS = THREE.ClampToEdgeWrapping;
    ledTexture.wrapT = THREE.ClampToEdgeWrapping;
    ledTexture.minFilter = THREE.LinearFilter;
    ledCanvasTextureRef.current = ledTexture;
    ledTextureUpdaterRef.current = (t: number) => {
      ledSys.update(t);
      ledTexture.needsUpdate = true;
    };

    // Procedural maps for PBR materials
    const floorTextures = createStudioFloorTexture();
    const skyscraperWindowTexture = createSkyscraperWindowTexture();

    // 7. World Content Group
    const worldGroup = new THREE.Group();
    worldGroupRef.current = worldGroup;
    scene.add(worldGroup);

    const interactiveMeshes: THREE.Mesh[] = [];

    // Realistic PBR Physical Material helper
    const getPbrMaterial = (
      color: number,
      emissive: number = 0x000000,
      roughness: number = 0.2,
      metalness: number = 0.8,
      clearcoat: number = 0.5,
      map?: THREE.Texture | null,
      roughnessMap?: THREE.Texture | null
    ) => {
      if (renderMode === 'wireframe') {
        return new THREE.MeshBasicMaterial({ color, wireframe: true });
      }
      if (renderMode === 'clay') {
        return new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.85, metalness: 0.05 });
      }
      return new THREE.MeshPhysicalMaterial({
        color,
        emissive,
        emissiveIntensity: emissive ? 0.75 : 0,
        roughness,
        metalness,
        clearcoat,
        clearcoatRoughness: 0.1,
        map: map || null,
        roughnessMap: roughnessMap || null
      });
    };

    // =========================================================================
    // SCENE PRESETS
    // =========================================================================

    if (preset === 'live_studio') {
      // -----------------------------------------------------------------------
      // PRESET 1: LIVE EXPERIENCE VIRTUAL PRODUCTION STUDIO
      // (Matches user reference: Curved LED wall, reflective floor, human + robot co-host, camera crane)
      // -----------------------------------------------------------------------

      // A. Reflective Stage Floor with Brushed Metal Map & Specular Clearcoat
      const floorGeom = new THREE.CylinderGeometry(8.8, 8.8, 0.4, 64);
      const floorMat = getPbrMaterial(
        0x070b16,
        0x000000,
        0.1,
        0.92,
        0.95,
        floorTextures.map,
        floorTextures.roughnessMap
      );
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.y = -0.2;
      worldGroup.add(floor);

      // Glowing Neon Stage Rim
      const floorRingGeom = new THREE.TorusGeometry(8.8, 0.06, 16, 96);
      const floorRingMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.1, 0.9);
      const floorRing = new THREE.Mesh(floorRingGeom, floorRingMat);
      floorRing.rotation.x = Math.PI / 2;
      floorRing.position.y = 0.01;
      worldGroup.add(floorRing);

      // Elevated Inner Dais
      const daisGeom = new THREE.CylinderGeometry(5.4, 5.6, 0.22, 48);
      const daisMat = getPbrMaterial(0x0f172a, 0x0284c7, 0.18, 0.85, 0.8);
      const dais = new THREE.Mesh(daisGeom, daisMat);
      dais.position.y = 0.11;
      worldGroup.add(dais);

      const daisRingGeom = new THREE.TorusGeometry(5.4, 0.045, 16, 72);
      const daisRing = new THREE.Mesh(daisRingGeom, floorRingMat);
      daisRing.rotation.x = Math.PI / 2;
      daisRing.position.y = 0.23;
      worldGroup.add(daisRing);

      // B. Curved Panoramic Broadcast LED Wall
      const ledWallGeom = new THREE.CylinderGeometry(8.2, 8.2, 4.8, 64, 1, true, Math.PI * 0.72, Math.PI * 0.56);
      const ledWallMat = new THREE.MeshBasicMaterial({
        map: ledTexture,
        side: THREE.BackSide
      });
      const ledWall = new THREE.Mesh(ledWallGeom, ledWallMat);
      ledWall.position.set(0, 2.4, -1.2);
      worldGroup.add(ledWall);

      // Curved Wall Top and Bottom Bezel Frames
      const ledTrimTopGeom = new THREE.TorusGeometry(8.2, 0.06, 12, 64, Math.PI * 0.56);
      const ledTrimTop = new THREE.Mesh(ledTrimTopGeom, floorRingMat);
      ledTrimTop.rotation.x = Math.PI / 2;
      ledTrimTop.rotation.z = Math.PI * 0.72;
      ledTrimTop.position.set(0, 4.8, -1.2);
      worldGroup.add(ledTrimTop);

      // C. Host Interview Furniture Set (Modern Lounge Armchairs & Glass Table)
      const tableTopGeom = new THREE.BoxGeometry(2.4, 0.08, 1.2);
      const tableTopMat = getPbrMaterial(0x0f172a, 0x38bdf8, 0.05, 0.95, 1.0);
      const coffeeTable = new THREE.Mesh(tableTopGeom, tableTopMat);
      coffeeTable.position.set(0, 0.6, 0.8);
      coffeeTable.name = 'Broadcast Host Desk';
      worldGroup.add(coffeeTable);
      interactiveMeshes.push(coffeeTable);

      const tableLegGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
      const tableLegMat = getPbrMaterial(0x38bdf8, 0x000000, 0.15, 0.95);
      [-1.0, 1.0].forEach((lx) => {
        [-0.45, 0.45].forEach((lz) => {
          const leg = new THREE.Mesh(tableLegGeom, tableLegMat);
          leg.position.set(lx, 0.35, 0.8 + lz);
          worldGroup.add(leg);
        });
      });

      // Human Host Armchair (Left)
      const chairGroupLeft = new THREE.Group();
      chairGroupLeft.position.set(-1.8, 0.22, 0.8);
      chairGroupLeft.rotation.y = Math.PI * 0.22;
      worldGroup.add(chairGroupLeft);

      const seatGeom = new THREE.BoxGeometry(0.9, 0.2, 0.8);
      const seatMat = getPbrMaterial(0x1e293b, 0x000000, 0.4, 0.3);
      const seatL = new THREE.Mesh(seatGeom, seatMat);
      seatL.position.y = 0.5;
      chairGroupLeft.add(seatL);

      const backGeom = new THREE.BoxGeometry(0.9, 0.9, 0.15);
      const backL = new THREE.Mesh(backGeom, seatMat);
      backL.position.set(0, 0.95, -0.35);
      chairGroupLeft.add(backL);

      // AI Robot Co-Host Armchair (Right)
      const chairGroupRight = new THREE.Group();
      chairGroupRight.position.set(1.8, 0.22, 0.8);
      chairGroupRight.rotation.y = -Math.PI * 0.22;
      worldGroup.add(chairGroupRight);

      const seatR = new THREE.Mesh(seatGeom, seatMat);
      seatR.position.y = 0.5;
      chairGroupRight.add(seatR);

      const backR = new THREE.Mesh(backGeom, seatMat);
      backR.position.set(0, 0.95, -0.35);
      chairGroupRight.add(backR);

      // D. Human Presenter Figure (Tailored Navy Suit)
      const humanGroup = new THREE.Group();
      humanGroup.position.set(-1.8, 0.72, 0.8);
      humanGroup.rotation.y = Math.PI * 0.22;
      worldGroup.add(humanGroup);

      const humanTorsoGeom = new THREE.BoxGeometry(0.5, 0.7, 0.3);
      const humanTorsoMat = getPbrMaterial(0x0f172a, 0x000000, 0.5, 0.2);
      const humanTorso = new THREE.Mesh(humanTorsoGeom, humanTorsoMat);
      humanTorso.position.y = 0.55;
      humanTorso.name = 'Human Host Presenter';
      humanGroup.add(humanTorso);
      interactiveMeshes.push(humanTorso);

      const humanHeadGeom = new THREE.SphereGeometry(0.18, 24, 24);
      const humanHeadMat = getPbrMaterial(0xfbcfe8, 0x000000, 0.4, 0.1);
      const humanHead = new THREE.Mesh(humanHeadGeom, humanHeadMat);
      humanHead.position.set(0, 1.05, 0);
      humanGroup.add(humanHead);

      // E. Luna Android AI Co-Host (High-Gloss Chrome & Neon Core)
      const aiRobotGroup = new THREE.Group();
      aiRobotGroup.position.set(1.8, 0.72, 0.8);
      aiRobotGroup.rotation.y = -Math.PI * 0.22;
      worldGroup.add(aiRobotGroup);

      const robotTorsoGeom = new THREE.BoxGeometry(0.48, 0.68, 0.28);
      const robotTorsoMat = getPbrMaterial(0xf1f5f9, 0x38bdf8, 0.08, 0.96, 1.0);
      const robotTorso = new THREE.Mesh(robotTorsoGeom, robotTorsoMat);
      robotTorso.position.y = 0.55;
      robotTorso.name = 'AI Co-Host (Luna Android)';
      aiRobotGroup.add(robotTorso);
      interactiveMeshes.push(robotTorso);

      // Robotic Chest Core Arc Reactor
      const arcCoreGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
      const arcCoreMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.05, 0.9);
      const arcCore = new THREE.Mesh(arcCoreGeom, arcCoreMat);
      arcCore.rotation.x = Math.PI / 2;
      arcCore.position.set(0, 0.62, 0.15);
      aiRobotGroup.add(arcCore);

      const robotHeadGeom = new THREE.SphereGeometry(0.17, 24, 24);
      const robotHeadMat = getPbrMaterial(0xffffff, 0xc084fc, 0.05, 0.95, 1.0);
      const robotHead = new THREE.Mesh(robotHeadGeom, robotHeadMat);
      robotHead.position.set(0, 1.05, 0);
      aiRobotGroup.add(robotHead);

      // Glowing Cyan Visor Strip
      const visorGeom = new THREE.BoxGeometry(0.24, 0.06, 0.1);
      const visorMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.02, 0.95);
      const visor = new THREE.Mesh(visorGeom, visorMat);
      visor.position.set(0, 1.07, 0.12);
      aiRobotGroup.add(visor);

      // F. Broadcast Studio Jib Camera Crane in Foreground Right
      const cameraRigGroup = new THREE.Group();
      cameraRigGroup.position.set(2.8, 0, 3.4);
      cameraRigGroup.rotation.y = -Math.PI * 0.7;
      worldGroup.add(cameraRigGroup);

      const camBaseGeom = new THREE.CylinderGeometry(0.4, 0.45, 0.2, 24);
      const camBaseMat = getPbrMaterial(0x1e293b, 0x000000, 0.25, 0.85);
      const camBase = new THREE.Mesh(camBaseGeom, camBaseMat);
      camBase.position.y = 0.1;
      cameraRigGroup.add(camBase);

      const camColumnGeom = new THREE.CylinderGeometry(0.08, 0.1, 1.4, 16);
      const camColumn = new THREE.Mesh(camColumnGeom, camBaseMat);
      camColumn.position.y = 0.8;
      cameraRigGroup.add(camColumn);

      const camBodyGeom = new THREE.BoxGeometry(0.45, 0.35, 0.8);
      const camBodyMat = getPbrMaterial(0x0f172a, 0x000000, 0.2, 0.9);
      const camBody = new THREE.Mesh(camBodyGeom, camBodyMat);
      camBody.position.set(0, 1.55, 0);
      camBody.name = 'Broadcast 4K Studio Camera';
      cameraRigGroup.add(camBody);
      interactiveMeshes.push(camBody);

      // Studio Tally Light (Red Live indicator)
      const tallyGeom = new THREE.SphereGeometry(0.04, 12, 12);
      const tallyMat = getPbrMaterial(0xef4444, 0xef4444, 0.1, 0.9);
      const tally = new THREE.Mesh(tallyGeom, tallyMat);
      tally.position.set(0, 1.76, 0.1);
      cameraRigGroup.add(tally);

      // Mounted Camera Monitor Screen
      const monitorGeom = new THREE.BoxGeometry(0.4, 0.25, 0.04);
      const monitorMat = getPbrMaterial(0x0284c7, 0x38bdf8, 0.08, 0.85);
      const monitor = new THREE.Mesh(monitorGeom, monitorMat);
      monitor.position.set(-0.25, 1.55, 0.2);
      monitor.rotation.y = 0.4;
      cameraRigGroup.add(monitor);

      // G. Overhead Lighting Box Truss Structure
      const trussGeom = new THREE.CylinderGeometry(0.06, 0.06, 9.6, 12);
      const trussMat = getPbrMaterial(0x334155, 0x000000, 0.35, 0.75);
      [1.0, -1.0].forEach((tz) => {
        const truss = new THREE.Mesh(trussGeom, trussMat);
        truss.rotation.z = Math.PI / 2;
        truss.position.set(0, 5.4, tz);
        worldGroup.add(truss);
      });
    } else if (preset === 'district') {
      // -----------------------------------------------------------------------
      // PRESET 2: AI INNOVATION DISTRICT EXHIBITION PAVILION
      // (Matches Bahrain Tech Hub: Curved architectural glass canopies, suspended halo rings, exhibition kiosks)
      // -----------------------------------------------------------------------

      // A. Ground Exhibition Hall Terrazzo Floor
      const floorGeom = new THREE.CylinderGeometry(9.2, 9.2, 0.3, 48);
      const floorMat = getPbrMaterial(
        0x0a101f,
        0x0284c7,
        0.14,
        0.88,
        0.9,
        floorTextures.map,
        floorTextures.roughnessMap
      );
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.y = -0.15;
      worldGroup.add(floor);

      // B. Sweeping Parametric Curved Architectural Canopy
      const canopyGroup = new THREE.Group();
      worldGroup.add(canopyGroup);

      const canopyArchGeom = new THREE.BoxGeometry(8.6, 0.35, 6.8);
      const canopyArchMat = getPbrMaterial(0x0f172a, 0x000000, 0.18, 0.82, 0.9);
      const canopyRoof = new THREE.Mesh(canopyArchGeom, canopyArchMat);
      canopyRoof.position.set(0, 4.0, 0);
      canopyRoof.name = 'AI Innovation Pavilion Canopy';
      canopyGroup.add(canopyRoof);
      interactiveMeshes.push(canopyRoof);

      // Glowing Neon Ribbons along Canopy Edge
      const neonRibbonGeom = new THREE.BoxGeometry(8.7, 0.08, 0.08);
      const neonMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.05, 0.95);
      const neonRibbonFront = new THREE.Mesh(neonRibbonGeom, neonMat);
      neonRibbonFront.position.set(0, 4.1, 3.4);
      canopyGroup.add(neonRibbonFront);

      const neonRibbonBack = new THREE.Mesh(neonRibbonGeom, neonMat);
      neonRibbonBack.position.set(0, 4.1, -3.4);
      canopyGroup.add(neonRibbonBack);

      // C. Suspended Circular Halo LED Lighting Rings (Bahrain Tech Hub Signature)
      const haloSizes = [
        { r: 2.2, y: 3.4, x: -1.8, z: 0.5 },
        { r: 1.6, y: 3.6, x: 2.0, z: -0.8 },
        { r: 2.6, y: 3.2, x: 0.5, z: 1.6 }
      ];
      haloSizes.forEach((h) => {
        const ringGeom = new THREE.TorusGeometry(h.r, 0.05, 16, 64);
        const ringMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.05, 0.95);
        const halo = new THREE.Mesh(ringGeom, ringMat);
        halo.rotation.x = Math.PI / 2;
        halo.position.set(h.x, h.y, h.z);
        canopyGroup.add(halo);
      });

      // D. Central Holographic Neural Terminal & Rotating Core
      const holoPedestalGeom = new THREE.CylinderGeometry(1.3, 1.5, 0.9, 32);
      const holoPedestalMat = getPbrMaterial(0x1e293b, 0x0284c7, 0.2, 0.85);
      const holoPedestal = new THREE.Mesh(holoPedestalGeom, holoPedestalMat);
      holoPedestal.position.set(0, 0.45, 0.5);
      holoPedestal.name = 'Holographic Neural Terminal';
      worldGroup.add(holoPedestal);
      interactiveMeshes.push(holoPedestal);

      const holoCoreGeom = new THREE.IcosahedronGeometry(0.75, 2);
      const holoCoreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.85,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const holoCore = new THREE.Mesh(holoCoreGeom, holoCoreMat);
      holoCore.position.set(0, 1.8, 0.5);
      worldGroup.add(holoCore);

      const holoRingGeom = new THREE.TorusGeometry(1.1, 0.035, 16, 56);
      const holoRing = new THREE.Mesh(holoRingGeom, neonMat);
      holoRing.rotation.x = Math.PI / 2.3;
      holoCore.add(holoRing);

      // E. Interactive Exhibition Booths (@designAI Studio & Venture Hub)
      const booth1Geom = new THREE.BoxGeometry(2.4, 2.0, 2.0);
      const booth1Mat = getPbrMaterial(0x111c38, 0x6366f1, 0.18, 0.8, 0.7);
      const booth1 = new THREE.Mesh(booth1Geom, booth1Mat);
      booth1.position.set(-3.4, 1.0, -1.2);
      booth1.name = '@designAI Creative Studio';
      worldGroup.add(booth1);
      interactiveMeshes.push(booth1);

      const booth2 = new THREE.Mesh(booth1Geom, booth1Mat);
      booth2.position.set(3.4, 1.0, -1.2);
      booth2.name = 'Autonomous Venture Hub';
      worldGroup.add(booth2);
      interactiveMeshes.push(booth2);

      // Interactive Glass Kiosks
      [-1.8, 1.8].forEach((kx) => {
        const kioskGeom = new THREE.BoxGeometry(0.8, 1.1, 0.1);
        const kioskMat = getPbrMaterial(0x38bdf8, 0x38bdf8, 0.08, 0.9, 1.0);
        const kiosk = new THREE.Mesh(kioskGeom, kioskMat);
        kiosk.position.set(kx, 0.85, 2.2);
        kiosk.rotation.x = -0.25;
        kiosk.name = `Interactive Kiosk ${kx > 0 ? 'Beta' : 'Alpha'}`;
        worldGroup.add(kiosk);
        interactiveMeshes.push(kiosk);
      });
    } else if (preset === 'world') {
      // -----------------------------------------------------------------------
      // PRESET 3: QUANTUM CITY METROPOLIS
      // (Matches reference: High-density illuminated skyscrapers with window grids, elevated skyways, traffic streams)
      // -----------------------------------------------------------------------

      // A. Floating Megacity Island Disc (Dock 7 & Arrival Foundation)
      const islandBaseGeom = new THREE.CylinderGeometry(7.5, 6.2, 1.8, 48);
      const islandBaseMat = getPbrMaterial(0x0a101f, 0x0284c7, 0.25, 0.85);
      const islandBase = new THREE.Mesh(islandBaseGeom, islandBaseMat);
      islandBase.position.y = -0.9;
      worldGroup.add(islandBase);

      // Glowing Base Thrusters (Blue ion glow beneath island)
      const thrusterGeom = new THREE.TorusGeometry(6.6, 0.1, 16, 64);
      const thrusterMat = getPbrMaterial(0x00f0ff, 0x00f0ff, 0.05, 0.95);
      const thruster = new THREE.Mesh(thrusterGeom, thrusterMat);
      thruster.rotation.x = Math.PI / 2;
      thruster.position.y = -1.75;
      worldGroup.add(thruster);

      // B. High-Density Skyscrapers with Real Procedural Illuminated Window Textures!
      const towers = [
        { x: 0, z: 0, w: 1.6, d: 1.6, h: 7.8, color: 0x38bdf8, name: 'Quantum Core Spire' },
        { x: -2.2, z: -1.4, w: 1.3, d: 1.3, h: 6.2, color: 0x818cf8, name: 'AI Innovation Tower' },
        { x: 2.3, z: -1.6, w: 1.4, d: 1.2, h: 6.8, color: 0xc084fc, name: 'Genesis Matrix Tower' },
        { x: -2.6, z: 1.6, w: 1.2, d: 1.1, h: 5.4, color: 0x22d3ee, name: 'Autonomous District Tower' },
        { x: 2.5, z: 1.5, w: 1.3, d: 1.2, h: 5.8, color: 0x38bdf8, name: 'Creative Hub Center' },
        { x: 0, z: -3.2, w: 1.4, d: 1.2, h: 5.0, color: 0xf43f5e, name: 'Synergy Arc Tower' }
      ];

      towers.forEach((t) => {
        const towerGeom = new THREE.BoxGeometry(t.w, t.h, t.d);
        const towerMat = getPbrMaterial(
          0x0f172a,
          t.color,
          0.12,
          0.9,
          0.85,
          skyscraperWindowTexture
        );
        const tower = new THREE.Mesh(towerGeom, towerMat);
        tower.position.set(t.x, t.h / 2, t.z);
        tower.name = t.name;
        worldGroup.add(tower);
        interactiveMeshes.push(tower);

        // Antenna Spire with Aircraft Warning Beacon
        const spireGeom = new THREE.CylinderGeometry(0.04, 0.12, 1.8, 12);
        const spireMat = getPbrMaterial(t.color, t.color, 0.1, 0.95);
        const spire = new THREE.Mesh(spireGeom, spireMat);
        spire.position.set(t.x, t.h + 0.9, t.z);
        worldGroup.add(spire);

        const beaconGeom = new THREE.SphereGeometry(0.08, 12, 12);
        const beaconMat = getPbrMaterial(0xef4444, 0xef4444, 0.05, 0.95);
        const beacon = new THREE.Mesh(beaconGeom, beaconMat);
        beacon.position.set(t.x, t.h + 1.8, t.z);
        worldGroup.add(beacon);
      });

      // C. Multi-Level Elevated Skyways (Concentric transit highway loops)
      const skywayRadius = [4.2, 5.8];
      skywayRadius.forEach((r, idx) => {
        const ringGeom = new THREE.TorusGeometry(r, 0.06, 12, 80);
        const ringMat = getPbrMaterial(idx === 0 ? 0x38bdf8 : 0xd946ef, idx === 0 ? 0x38bdf8 : 0xd946ef, 0.08, 0.95);
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 1.4 + idx * 1.2;
        worldGroup.add(ring);
      });

      // D. Traffic Light Particles (Flying transport shuttles moving along the skyways)
      const particleCount = 280;
      const trafficPos = new Float32Array(particleCount * 3);
      const trafficColors = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount; p++) {
        const rad = p % 2 === 0 ? 4.2 : 5.8;
        const angle = (p / particleCount) * Math.PI * 2;
        trafficPos[p * 3] = rad * Math.cos(angle);
        trafficPos[p * 3 + 1] = p % 2 === 0 ? 1.4 : 2.6;
        trafficPos[p * 3 + 2] = rad * Math.sin(angle);

        if (p % 2 === 0) {
          trafficColors[p * 3] = 0.22;
          trafficColors[p * 3 + 1] = 0.74;
          trafficColors[p * 3 + 2] = 0.97;
        } else {
          trafficColors[p * 3] = 0.85;
          trafficColors[p * 3 + 1] = 0.27;
          trafficColors[p * 3 + 2] = 0.93;
        }
      }

      const trafficGeom = new THREE.BufferGeometry();
      trafficGeom.setAttribute('position', new THREE.BufferAttribute(trafficPos, 3));
      trafficGeom.setAttribute('color', new THREE.BufferAttribute(trafficColors, 3));
      const trafficMat = new THREE.PointsMaterial({
        size: 0.22,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      });
      const trafficSys = new THREE.Points(trafficGeom, trafficMat);
      trafficParticlesRef.current = trafficSys;
      worldGroup.add(trafficSys);
    } else {
      // -----------------------------------------------------------------------
      // PRESET 4: COSMIC UNIVERSE CITADEL
      // (Matches user reference: Luminous gas giant planet, planetary rings, orbiting citadel station)
      // -----------------------------------------------------------------------

      // A. Celestial Planet Sphere with Atmospheric Glow
      const planetGeom = new THREE.SphereGeometry(3.6, 48, 48);
      const planetMat = getPbrMaterial(0x0c1b3f, 0x0284c7, 0.35, 0.7, 0.9);
      const planet = new THREE.Mesh(planetGeom, planetMat);
      planet.name = 'Allpha Central Gas Giant';
      worldGroup.add(planet);
      interactiveMeshes.push(planet);

      // Planet Atmosphere Outer Shell (Fresnel Aura)
      const atmoGeom = new THREE.SphereGeometry(3.85, 48, 48);
      const atmoMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide
      });
      const atmo = new THREE.Mesh(atmoGeom, atmoMat);
      worldGroup.add(atmo);

      // B. Concentric Planetary Rings with Particle Debris
      const ringGeom = new THREE.RingGeometry(4.8, 8.2, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.45,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.4;
      worldGroup.add(ring);

      // C. Orbiting Citadel Station Structure
      const citadelGroup = new THREE.Group();
      citadelGroup.position.set(5.2, 2.0, 0);
      worldGroup.add(citadelGroup);

      const stationWheelGeom = new THREE.TorusGeometry(1.6, 0.12, 16, 48);
      const stationWheelMat = getPbrMaterial(0xfbbf24, 0xfbbf24, 0.15, 0.92, 0.8);
      const stationWheel = new THREE.Mesh(stationWheelGeom, stationWheelMat);
      stationWheel.rotation.x = Math.PI / 2;
      citadelGroup.add(stationWheel);

      const stationSpireGeom = new THREE.CylinderGeometry(0.12, 0.3, 2.8, 16);
      const stationSpire = new THREE.Mesh(stationSpireGeom, stationWheelMat);
      stationSpire.position.y = 0.4;
      stationSpire.name = 'Allpha Prime Orbital Citadel';
      citadelGroup.add(stationSpire);
      interactiveMeshes.push(stationSpire);
    }

    interactiveNodesRef.current = interactiveMeshes;

    // 8. Animation & Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update LED Video Wall
      if (ledTextureUpdaterRef.current) {
        ledTextureUpdaterRef.current(time);
      }

      // Smooth Gentle Idle Orbit when not dragging
      if (worldGroupRef.current && !isPointerDownRef.current) {
        worldGroupRef.current.rotation.y += 0.0022;
      }

      // Animate Traffic Particles in World Preset
      if (trafficParticlesRef.current) {
        trafficParticlesRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [preset, renderMode, lightingMood, cameraAngle, viewStyle, setCameraForPreset, applyLightingMood]);

  // Touch and Mouse Orbit Gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isPointerDownRef.current = true;
    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || !worldGroupRef.current) return;
    const deltaX = e.clientX - prevPointerXRef.current;
    const deltaY = e.clientY - prevPointerYRef.current;

    worldGroupRef.current.rotation.y += deltaX * 0.008;
    worldGroupRef.current.rotation.x = Math.max(
      -0.4,
      Math.min(0.6, worldGroupRef.current.rotation.x + deltaY * 0.005)
    );

    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    setIsDragging(false);

    const container = containerRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!container || !camera || !scene || !onNodeSelect) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const intersects = raycasterRef.current.intersectObjects(interactiveNodesRef.current, false);

    if (intersects.length > 0) {
      const clickedName = intersects[0].object.name;
      if (clickedName) {
        setSelectedNode(clickedName);
        onNodeSelect(clickedName);
      }
    }
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      setCameraForPreset(cameraRef.current, preset, cameraAngle);
    }
    if (worldGroupRef.current) {
      worldGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  // High-Resolution Photoreal Render matching user reference images
  const getPhotorealImage = () => {
    if (preset === 'live_studio') {
      return '/renders/virtual_production_studio.jpg'; // Talk show with AI robot host
    } else if (preset === 'district') {
      return '/renders/innovation_district_pavilion.jpg'; // Bahrain-style pavilion with curved canopies & suspended rings
    } else if (preset === 'world') {
      return '/renders/quantum_city_metropolis.jpg'; // Quantum City metropolis with illuminated skyscrapers
    }
    return '/renders/allpha_cosmic_citadel.jpg'; // Celestial gas giant with orbiting citadel
  };

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {viewStyle === '3d_interactive' ? (
        /* Realtime Three.js Canvas */
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`w-full h-full ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ touchAction: 'none' }}
        />
      ) : (
        /* Golden Photoreal Cycles Render Mode */
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-slate-950">
          <img
            src={getPhotorealImage()}
            alt="Allpha 3D Photoreal Render"
            className="w-full h-full object-cover animate-fadeIn"
          />
          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Golden Render Badge */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 text-xs text-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Golden Render: Cycles OptiX 1024 Samples</span>
          </div>
        </div>
      )}

      {/* Floating 3D HUD & Cinematic Studio Controls */}
      {showControlsOverlay && (
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
          {/* Mode Switcher: Photoreal vs 3D Orbit */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-[11px] font-medium text-cyan-300 shadow-xl">
            {allowPhotoToggle && (
              <button
                onClick={() => setViewStyle(viewStyle === '3d_interactive' ? 'photoreal_golden' : '3d_interactive')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                  viewStyle === 'photoreal_golden'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Toggle Photoreal Cycles Render"
              >
                <ImageIcon className="w-3 h-3" />
                <span>Photoreal</span>
              </button>
            )}

            <button
              onClick={() => setViewStyle('3d_interactive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                viewStyle === '3d_interactive'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Interactive 3D WebGL Mode"
            >
              <Box className="w-3 h-3" />
              <span>3D Orbit</span>
            </button>
          </div>

          {/* Realtime 3D Controls when in Interactive Mode */}
          {viewStyle === '3d_interactive' && (
            <div className="flex flex-col items-end gap-1.5">
              {/* Camera Angle & Shading Mode */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 shadow-xl">
                {/* Camera Angle */}
                <button
                  onClick={() => {
                    const next =
                      cameraAngle === 'establishing' ? 'medium' : cameraAngle === 'medium' ? 'portrait' : 'establishing';
                    setCameraAngle(next);
                    if (cameraRef.current) setCameraForPreset(cameraRef.current, preset, next);
                  }}
                  title={`Camera: ${cameraAngle}`}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-xs flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] hidden sm:inline capitalize">{cameraAngle}</span>
                </button>

                {/* Shading mode */}
                <button
                  onClick={() => {
                    const next = renderMode === 'pbr' ? 'clay' : renderMode === 'clay' ? 'wireframe' : 'pbr';
                    setRenderMode(next);
                  }}
                  title={`Shading: ${renderMode.toUpperCase()}`}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-xs flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px] hidden sm:inline uppercase">{renderMode}</span>
                </button>

                {/* Reset Orientation */}
                <button
                  onClick={resetCamera}
                  title="Reset View"
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Lighting Rig Selector: Broadcast / Cyberpunk / Keynote / Clay */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300 shadow-xl">
                <span className="text-slate-500 px-1 font-mono text-[9px]">LIGHT:</span>
                {(['broadcast', 'cyberpunk', 'keynote', 'clay'] as LightingMood[]).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => {
                      setLightingMood(mood);
                      applyLightingMood(mood);
                    }}
                    className={`px-2 py-0.5 rounded-md font-bold capitalize transition-colors ${
                      lightingMood === mood
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mood === 'broadcast' ? 'Studio' : mood === 'cyberpunk' ? 'Neon' : mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Interactive Hotspot Banner */}
          {selectedNode && (
            <div className="mt-1 px-2.5 py-1 rounded-lg bg-cyan-950/90 border border-cyan-400/50 text-[10px] text-cyan-200 backdrop-blur-md flex items-center gap-1.5 animate-fadeIn">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>
                Target: <strong>{selectedNode}</strong>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Orbit Gesture Hint */}
      {viewStyle === '3d_interactive' && !isDragging && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800 backdrop-blur-sm">
          <Eye className="w-2.5 h-2.5 text-cyan-400" />
          <span>Drag to orbit · Click nodes to inspect</span>
        </div>
      )}
    </div>
  );
};
