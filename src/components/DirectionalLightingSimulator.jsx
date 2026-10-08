import React, { useState, useEffect } from 'react';
import { Play, Pause, Zap, CheckCircle2, ShieldCheck, Disc } from 'lucide-react';

const LED_SOURCES = [
  { id: 'N', label: 'NORTH (0°)', angle: 0, x: 50, y: 10, vector: [0, 1, 0.707], frameLabel: 'FRAME 1 (Illum: N-45°)' },
  { id: 'E', label: 'EAST (90°)', angle: 90, x: 90, y: 50, vector: [1, 0, 0.707], frameLabel: 'FRAME 2 (Illum: E-45°)' },
  { id: 'S', label: 'SOUTH (180°)', angle: 180, x: 50, y: 90, vector: [0, -1, 0.707], frameLabel: 'FRAME 3 (Illum: S-45°)' },
  { id: 'W', label: 'WEST (270°)', angle: 270, x: 10, y: 50, vector: [-1, 0, 0.707], frameLabel: 'FRAME 4 (Illum: W-45°)' },
];

export default function DirectionalLightingSimulator() {
  const [activeLed, setActiveLed] = useState('N');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [capturedFrames, setCapturedFrames] = useState(['N']);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLed((prev) => {
        const idx = LED_SOURCES.findIndex((s) => s.id === prev);
        const next = LED_SOURCES[(idx + 1) % LED_SOURCES.length].id;
        setCapturedFrames((cf) => cf.includes(next) ? cf : [...cf, next]);
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentSource = LED_SOURCES.find((s) => s.id === activeLed);

  const shadowX = activeLed === 'E' ? -22 : activeLed === 'W' ? 22 : 0;
  const shadowY = activeLed === 'S' ? -22 : activeLed === 'N' ? 22 : 0;

  return (
    <div className="w-full editorial-card rounded-3xl p-6 sm:p-10 border border-white/10 my-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="eyebrow-label text-khadi-cyan mb-1">
            OPTICAL ACQUISITION PROTOCOL
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            4-Directional Controlled Illumination
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-khadi-amber" /> : <Play className="w-4 h-4 text-khadi-green" />}
            <span>{isAutoPlaying ? 'Pause Cycle' : 'Auto Cycle All 4'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Precision Engineered Scanner Head Dial */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-80 h-80 rounded-full border-4 border-[#252830] bg-gradient-to-br from-[#1c1f26] via-[#101215] to-[#08090a] p-5 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* Machined Metal Ring with Chamfers */}
            <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-dashed border-white/15 pointer-events-none" />
            
            {/* Engraved Azimuth Markings */}
            <div className="absolute top-2 text-[10px] font-mono text-khadi-textMuted font-bold">0° N</div>
            <div className="absolute right-2 text-[10px] font-mono text-khadi-textMuted font-bold">90° E</div>
            <div className="absolute bottom-2 text-[10px] font-mono text-khadi-textMuted font-bold">180° S</div>
            <div className="absolute left-2 text-[10px] font-mono text-khadi-textMuted font-bold">270° W</div>

            {/* Center Macro Optical Aperture */}
            <div className="relative w-32 h-32 rounded-full bg-[#050608] border-2 border-white/20 flex flex-col items-center justify-center shadow-inner">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-khadi-cyan/25 via-purple-500/15 to-transparent border border-khadi-cyan/40 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-khadi-cyan/80 animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.6)]" />
              </div>
              <span className="text-[10px] font-mono text-khadi-sand mt-1.5 font-bold tracking-wider">MACRO OPTICS</span>
            </div>

            {/* 4 Directional Calibrated LEDs */}
            {LED_SOURCES.map((source) => {
              const isActive = activeLed === source.id;
              return (
                <button
                  key={source.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveLed(source.id);
                    setCapturedFrames((cf) => cf.includes(source.id) ? cf : [...cf, source.id]);
                  }}
                  className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-full flex flex-col items-center justify-center transition-all duration-300 font-mono cursor-pointer ${
                    isActive
                      ? 'bg-khadi-sand text-black scale-110 shadow-[0_0_30px_rgba(232,226,212,0.95)] ring-4 ring-white/40 font-bold'
                      : 'bg-[#181a1f] text-khadi-textMuted border border-white/15 hover:border-khadi-sand hover:scale-105'
                  }`}
                  style={{ top: `${source.y}%`, left: `${source.x}%` }}
                >
                  <Zap className={`w-4 h-4 ${isActive ? 'text-black fill-black' : 'text-khadi-textDim'}`} />
                  <span className="text-xs font-bold">{source.id}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-5">
            <span className="text-xs font-mono text-khadi-textMuted tracking-wider font-medium">
              CLICK AN LED EMITTER TO ISOLATE 45° DIRECTIONAL CAST SHADOWS
            </span>
          </div>
        </div>

        {/* Dynamic Fabric Shadow & Structural Response Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0c0f] shadow-inner">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: 'url(/frames/video2/frame-0001.jpg)',
                filter: 'brightness(1.1) contrast(1.2)',
              }}
            />
            {/* Directional light sweep overlay with physical grazing falloff */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: activeLed === 'N' 
                  ? 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 65%)'
                  : activeLed === 'E'
                  ? 'linear-gradient(to left, rgba(255,255,255,0.4) 0%, transparent 65%)'
                  : activeLed === 'S'
                  ? 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 65%)'
                  : 'linear-gradient(to right, rgba(255,255,255,0.4) 0%, transparent 65%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Technical HUD Overlay */}
            <div className="absolute top-4 left-4 bg-[#08090a]/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono border border-white/10">
              <span className="text-khadi-amber font-bold">{currentSource?.frameLabel}</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#08090a]/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-khadi-green animate-pulse" />
              <span className="text-khadi-text font-bold">AZIMUTH: {currentSource?.angle}°</span>
            </div>

            {/* Live Slub Shadow Callout */}
            <div 
              className="absolute p-3.5 rounded-2xl bg-[#08090a]/95 backdrop-blur-md border border-khadi-sand/50 text-xs font-mono transition-all duration-500 shadow-xl"
              style={{
                top: `${35 + shadowY}%`,
                left: `${40 + shadowX}%`,
              }}
            >
              <div className="text-khadi-sand font-bold text-sm">DIRECTIONAL CAST SHADOW</div>
              <div className="text-khadi-textMuted mt-0.5">Zenith: 45° grazing • Isolates yarn normal vector</div>
            </div>
          </div>

          {/* 4 Multi-Observation Capture Status Grid */}
          <div className="grid grid-cols-4 gap-3">
            {LED_SOURCES.map((s) => {
              const isCaptured = capturedFrames.includes(s.id);
              const isSelected = activeLed === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveLed(s.id);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border text-center transition-all ${
                    isSelected 
                      ? 'bg-white/20 border-khadi-sand shadow-lg scale-105'
                      : isCaptured
                      ? 'bg-[#121418] border-white/10 hover:border-white/25'
                      : 'bg-[#0a0b0d] border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-khadi-textMuted">
                    <CheckCircle2 className={`w-4 h-4 ${isCaptured ? 'text-khadi-green' : 'text-khadi-textDim'}`} />
                    <span className="font-bold">{s.id}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{s.angle}° Azimuth</div>
                </div>
              );
            })}
          </div>

          {/* Scientific Photometric Normal Formula Bar */}
          <div className="p-4 rounded-2xl bg-[#12151a] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="text-khadi-textMuted uppercase font-bold">
              PHOTOMETRIC STEREO EQUATION:
            </div>
            <div className="text-khadi-cyan font-bold text-sm">
              I_k(x, y) = ρ(x, y) · (N(x, y) · L_k)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
