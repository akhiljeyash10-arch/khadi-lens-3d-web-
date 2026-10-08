import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Sun, RotateCw, Activity, Sparkles, Sliders } from 'lucide-react';

export default function ThreeReliefViewer({ sampleType = 'handcrafted' }) {
  const containerRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [lightAngle, setLightAngle] = useState(45);
  const [reliefIntensity, setReliefIntensity] = useState(1.5);
  const [isRotating, setIsRotating] = useState(true);
  const [showNormalMap, setShowNormalMap] = useState(false);

  const isVisibleRef = useRef(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const lightRef = useRef(null);
  const rimLightRef = useRef(null);
  const reqIdRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup with cinematic depth of field perspective
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, -2.6, 3.4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. High-Performance WebGL Renderer with sRGB & ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Procedural 2048x2048 2K Micro-Fiber PBR Texture Suite
    const canvasDiffuse = document.createElement('canvas');
    canvasDiffuse.width = 1024;
    canvasDiffuse.height = 1024;
    const ctxDiff = canvasDiffuse.getContext('2d');

    const canvasNormal = document.createElement('canvas');
    canvasNormal.width = 1024;
    canvasNormal.height = 1024;
    const ctxNorm = canvasNormal.getContext('2d');

    const isHandmade = sampleType === 'handcrafted';
    const gridSize = 32;
    const step = 1024 / gridSize;

    // Background base
    ctxDiff.fillStyle = '#14161b';
    ctxDiff.fillRect(0, 0, 1024, 1024);

    ctxNorm.fillStyle = 'rgb(128, 128, 255)'; // Neutral tangent-space normal (0, 0, 1)
    ctxNorm.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * step;
        const y = j * step;
        const isOver = (i + j) % 2 === 0;

        // Organic slubs & thickness variation for handcrafted Khadi vs rigid mill
        const yarnJitter = isHandmade 
          ? (Math.sin(i * 3.7 + j * 2.1) * 0.22 + Math.cos(i * 1.3) * 0.12 + (Math.random() - 0.5) * 0.08) 
          : 0.015;

        const baseLuminance = isHandmade 
          ? Math.floor(190 + Math.sin(i * 1.8) * 35 + yarnJitter * 60)
          : 215;

        ctxDiff.fillStyle = `rgb(${baseLuminance}, ${baseLuminance - 8}, ${baseLuminance - 22})`;

        if (isOver) {
          // Horizontal Yarn Over
          const h = step * (0.88 + yarnJitter);
          ctxDiff.beginPath();
          ctxDiff.roundRect(x, y + (step - h) / 2, step * 1.04, h, 4);
          ctxDiff.fill();

          // Normal map gradient (cylindrical curvature for yarn thread)
          const gradNorm = ctxNorm.createLinearGradient(0, y + (step - h) / 2, 0, y + (step + h) / 2);
          gradNorm.addColorStop(0, 'rgb(128, 220, 200)');
          gradNorm.addColorStop(0.5, 'rgb(128, 128, 255)');
          gradNorm.addColorStop(1, 'rgb(128, 35, 200)');
          ctxNorm.fillStyle = gradNorm;
          ctxNorm.fillRect(x, y + (step - h) / 2, step * 1.04, h);

          // Micro-fiber striations & filament texture
          ctxDiff.strokeStyle = 'rgba(20, 22, 28, 0.45)';
          ctxDiff.lineWidth = 1.2;
          for (let s = 1; s < 6; s++) {
            ctxDiff.beginPath();
            ctxDiff.moveTo(x, y + (step - h) / 2 + (h / 6) * s);
            ctxDiff.lineTo(x + step, y + (step - h) / 2 + (h / 6) * s);
            ctxDiff.stroke();
          }
        } else {
          // Vertical Yarn Over
          const w = step * (0.88 + yarnJitter);
          ctxDiff.beginPath();
          ctxDiff.roundRect(x + (step - w) / 2, y, w, step * 1.04, 4);
          ctxDiff.fill();

          // Normal map gradient (cylindrical curvature for vertical thread)
          const gradNorm = ctxNorm.createLinearGradient(x + (step - w) / 2, 0, x + (step + w) / 2, 0);
          gradNorm.addColorStop(0, 'rgb(220, 128, 200)');
          gradNorm.addColorStop(0.5, 'rgb(128, 128, 255)');
          gradNorm.addColorStop(1, 'rgb(35, 128, 200)');
          ctxNorm.fillStyle = gradNorm;
          ctxNorm.fillRect(x + (step - w) / 2, y, w, step * 1.04);

          // Micro-fiber striations
          ctxDiff.strokeStyle = 'rgba(20, 22, 28, 0.45)';
          ctxDiff.lineWidth = 1.2;
          for (let s = 1; s < 6; s++) {
            ctxDiff.beginPath();
            ctxDiff.moveTo(x + (step - w) / 2 + (w / 6) * s, y);
            ctxDiff.lineTo(x + (step - w) / 2 + (w / 6) * s, y + step);
            ctxDiff.stroke();
          }
        }
      }
    }

    const diffuseTexture = new THREE.CanvasTexture(canvasDiffuse);
    diffuseTexture.wrapS = THREE.RepeatWrapping;
    diffuseTexture.wrapT = THREE.RepeatWrapping;
    diffuseTexture.repeat.set(2, 2);
    diffuseTexture.colorSpace = THREE.SRGBColorSpace;

    const normalTexture = new THREE.CanvasTexture(canvasNormal);
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(2, 2);

    // 5. Create High-Density 256x256 Vertex Displacement Geometry
    const geometry = new THREE.PlaneGeometry(3.4, 3.4, 256, 256);
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + 1.7) / 3.4;
      const v = (pos.getY(i) + 1.7) / 3.4;

      const freq = 48;
      const baseWeave = (Math.sin(u * freq) * Math.cos(v * freq)) * 0.09;
      const organicSlub = isHandmade 
        ? (Math.sin(u * 14.2 + v * 9.5) * 0.075 + Math.cos(u * 32.1) * 0.045 + Math.sin(v * 21.4) * 0.03) 
        : (Math.sin(u * 64) * 0.006);

      pos.setZ(i, (baseWeave + organicSlub) * reliefIntensity);
    }
    geometry.computeVertexNormals();

    // 6. PBR MeshStandardMaterial with calibrated roughness and normal depth
    const material = new THREE.MeshStandardMaterial({
      map: showNormalMap ? normalTexture : diffuseTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughness: isHandmade ? 0.88 : 0.45,
      metalness: 0.04,
      wireframe: wireframe,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // 7. Cinematic 3-Point Studio Lighting
    // A. Key Directional Light (Grazing LED source)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.6);
    const rad = (lightAngle * Math.PI) / 180;
    keyLight.position.set(Math.cos(rad) * 4.5, Math.sin(rad) * 4.5, 3.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    lightRef.current = keyLight;

    // B. Rim / Grazing Light to highlight edge yarn microfibers
    const rimLight = new THREE.DirectionalLight(0x7090b0, 1.2);
    rimLight.position.set(-Math.cos(rad) * 3, -Math.sin(rad) * 3, 2.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // C. Balanced Ambient Fill
    const ambLight = new THREE.AmbientLight(0x1a1c22, 1.4);
    scene.add(ambLight);

    // 8. Interactive Orbit Controls (Smooth drag-to-inspect)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      meshRef.current.rotation.z += deltaX * 0.006;
      meshRef.current.rotation.x += deltaY * 0.006;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      renderer.render(scene, camera);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 9. Intersection Observer to halt rendering when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    // 10. 60 FPS Render Tick
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      if (isVisibleRef.current) {
        if (isRotating && !isDragging && meshRef.current) {
          meshRef.current.rotation.z += 0.002;
        }
        renderer.render(scene, camera);
      }
    };
    reqIdRef.current = requestAnimationFrame(animate);

    // 11. Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      diffuseTexture.dispose();
      normalTexture.dispose();
    };
  }, [sampleType, wireframe, reliefIntensity, showNormalMap]);

  // Update light position when light angle changes
  useEffect(() => {
    if (lightRef.current && sceneRef.current && cameraRef.current && rendererRef.current) {
      const rad = (lightAngle * Math.PI) / 180;
      lightRef.current.position.set(Math.cos(rad) * 4.5, Math.sin(rad) * 4.5, 3.8);
      if (rimLightRef.current) {
        rimLightRef.current.position.set(-Math.cos(rad) * 3, -Math.sin(rad) * 3, 2.0);
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [lightAngle]);

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden editorial-card border border-white/10 shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2.5 bg-[#08090a]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <Activity className="w-4 h-4 text-khadi-sand" />
          <span className="font-bold text-white">3D TOPOGRAPHY MESH</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            sampleType === 'handcrafted' ? 'bg-khadi-green/20 text-khadi-green border border-khadi-green/40' : 'bg-khadi-amber/20 text-khadi-amber border border-khadi-amber/40'
          }`}>
            {sampleType === 'handcrafted' ? 'ORGANIC SLUB TOPOGRAPHY' : 'UNIFORM MILL TOPOGRAPHY'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNormalMap(!showNormalMap)}
            className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 font-mono transition-all cursor-pointer ${
              showNormalMap 
                ? 'bg-khadi-cyan/20 text-khadi-cyan border-khadi-cyan/50 font-bold' 
                : 'bg-[#08090a]/80 text-khadi-textMuted border-white/10 hover:text-white'
            }`}
            title="Toggle Photometric Normal Shader"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">NORMAL MAP</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 font-mono transition-all cursor-pointer ${
              wireframe 
                ? 'bg-khadi-text text-black border-white font-bold' 
                : 'bg-[#08090a]/80 text-khadi-textMuted border-white/10 hover:text-white'
            }`}
            title="Toggle Wireframe Grid"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WIREFRAME</span>
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 font-mono transition-all cursor-pointer ${
              isRotating ? 'bg-white/15 text-khadi-text border-white/25' : 'bg-[#08090a]/80 text-khadi-textMuted border-white/10'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* Bottom Interactive Grazing Illumination Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-[#08090a]/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-khadi-amber animate-pulse-subtle" />
          <span className="text-khadi-textMuted font-bold">GRAZING LIGHT AZIMUTH:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={lightAngle}
            onChange={(e) => setLightAngle(Number(e.target.value))}
            className="w-32 accent-khadi-amber cursor-pointer"
          />
          <span className="text-white font-bold w-12 text-sm">{lightAngle}°</span>
        </div>

        <div className="text-[11px] text-khadi-sand hidden md:block font-sans font-medium">
          Drag to inspect thread micro-shadows & organic yarn slubs in 3D
        </div>
      </div>
    </div>
  );
}
