import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, Layers, BarChart2, Eye, Compass, Sliders } from 'lucide-react';

const SAMPLES = {
  a: {
    name: 'SAMPLE A: HANDCRAFTED KHADI',
    shortExpl: 'Natural yarn variations and handloom weaving signatures.',
    yarnStatus: 'HIGH VARIATION',
    yarnNote: 'Variation detected across the scanned yarn region.',
    warpDensity: '72 ends / inch',
    weftDensity: '54 picks / inch',
    weaveNote: 'Measured in the scanned region.',
    surfaceRelief: 'HIGH',
    surfaceNote: 'Relative surface variation detected.',
    patternRepetition: 'LOW',
    patternNote: 'Low repetitive structure detected in the scanned region.',
    verdict: 'CONSISTENT',
    verdictNote: 'Structural characteristics align with the verified handcrafted reference population.',
    statusOk: true,
  },
  b: {
    name: 'SAMPLE B: MILL IMITATION',
    shortExpl: 'Mechanically uniform thread diameters and rigid automated powerloom grid.',
    yarnStatus: 'LOW VARIATION',
    yarnNote: 'Mechanically uniform thread width detected.',
    warpDensity: '72 ends / inch',
    weftDensity: '72 picks / inch',
    weaveNote: 'Measured in the scanned region.',
    surfaceRelief: 'LOW',
    surfaceNote: 'Planar uniform surface detected.',
    patternRepetition: 'HIGH',
    patternNote: 'High repetitive grid detected across scanned coordinates.',
    verdict: 'INCONSISTENT',
    verdictNote: 'Measured structural characteristics differ from the verified handcrafted reference population.',
    statusOk: false,
  }
};

export default function SampleComparisonLens() {
  const [activeSample, setActiveSample] = useState('a');
  const [viewMode, setViewMode] = useState('structure');

  const sample = SAMPLES[activeSample];

  return (
    <div className="w-full editorial-card rounded-3xl p-6 sm:p-10 border border-white/10 my-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="eyebrow-label text-khadi-sand mb-1">
            COMPARATIVE STRUCTURAL EVALUATION
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Same Appearance. Different Physical Structure.
          </h3>
        </div>

        {/* Sample Switcher Tabs */}
        <div className="flex items-center gap-2.5 bg-[#0a0c0f] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveSample('a')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSample === 'a'
                ? 'bg-khadi-green/20 text-khadi-green border border-khadi-green/50 shadow-md font-bold'
                : 'text-khadi-textMuted hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-khadi-green" />
            <span>Sample A (Khadi)</span>
          </button>

          <button
            onClick={() => setActiveSample('b')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSample === 'b'
                ? 'bg-khadi-red/20 text-khadi-red border border-khadi-red/50 shadow-md font-bold'
                : 'text-khadi-textMuted hover:text-white'
            }`}
          >
            <XCircle className="w-4 h-4 text-khadi-red" />
            <span>Sample B (Mill)</span>
          </button>
        </div>
      </div>

      {/* Structural Analysis Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
        <div className="text-xs font-mono text-khadi-sand font-bold tracking-wider uppercase">
          STRUCTURAL ANALYSIS LAYER:
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: 'optical', label: 'CAMERA VIEW', sub: 'Raw optical RGB', icon: Eye },
            { id: 'structure', label: '3D STRUCTURE', sub: 'Surface normal / relief', icon: Layers },
            { id: 'fft', label: 'PATTERN ANALYSIS', sub: '2D FFT periodicity', icon: BarChart2 },
          ].map((mode) => {
            const Icon = mode.icon;
            const isCurrent = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-4 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white/20 text-white border-khadi-sand shadow-md font-bold'
                    : 'bg-[#101216] text-khadi-textMuted border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold font-sans">
                  <Icon className="w-3.5 h-3.5 text-khadi-sand" />
                  <span>{mode.label}</span>
                </div>
                <div className="text-[10px] text-khadi-textDim font-sans mt-0.5">{mode.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Panel Layout: Left = WHAT WAS SCANNED, Right = WHAT WAS MEASURED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Scanned Fabric Inspection View */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="relative h-[430px] rounded-3xl overflow-hidden border border-white/10 bg-[#08090a] shadow-inner flex flex-col justify-between p-5">
            {/* Background Texture with Mode-Specific Shader Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
              style={{
                backgroundImage: activeSample === 'a'
                  ? viewMode === 'structure' 
                    ? 'url(/frames/video2/frame-0060.jpg)' 
                    : viewMode === 'fft'
                    ? 'url(/frames/video2/frame-0180.jpg)'
                    : 'url(/frames/video1/frame-0001.jpg)'
                  : viewMode === 'structure'
                  ? 'url(/frames/video1/frame-0180.jpg)'
                  : 'url(/frames/video1/frame-0001.jpg)',
                filter: viewMode === 'structure' 
                  ? activeSample === 'a' 
                    ? 'hue-rotate(180deg) saturate(2.2) contrast(1.4)' 
                    : 'grayscale(100%) contrast(1.8)'
                  : 'none',
              }}
            />

            {/* Calibrated Reticle Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="reticleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#reticleGrid)" />
                <circle cx="50%" cy="50%" r="60" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Top Badge: What was scanned */}
            <div className="relative z-10 flex items-center justify-between">
              <span className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider shadow-md ${
                sample.statusOk ? 'bg-khadi-green text-black' : 'bg-khadi-red text-white'
              }`}>
                {sample.statusOk ? '● SCANNED: HANDCRAFTED' : '▲ SCANNED: POWERLOOM'}
              </span>

              <span className="bg-[#08090a]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[11px] font-mono border border-white/10 text-khadi-sand">
                FOV: 25.4 mm² • 1:1 MACRO
              </span>
            </div>

            {/* Bottom Minimal Info Card */}
            <div className="relative z-10 bg-[#08090a]/92 backdrop-blur-md p-4 rounded-2xl border border-white/15 shadow-xl">
              <div className="text-white font-serif font-bold text-base">{sample.name}</div>
              <p className="text-khadi-sand/90 text-xs mt-1 font-sans">
                {sample.shortExpl}
              </p>
            </div>
          </div>
        </div>

        {/* Right: What Was Measured (3-Level Clean Hierarchy) */}
        <div className="lg:col-span-6 space-y-3.5 flex flex-col justify-between">
          {/* Card 1: YARN STRUCTURE */}
          <div className="p-4 rounded-2xl bg-[#12151b] border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-khadi-textMuted uppercase font-bold">YARN STRUCTURE</span>
              <span className={`text-xs font-mono font-bold ${sample.statusOk ? 'text-khadi-green' : 'text-khadi-amber'}`}>
                {sample.yarnStatus}
              </span>
            </div>
            <div className="text-base font-bold text-white font-sans">{sample.yarnStatus}</div>
            <div className="text-xs text-khadi-textMuted font-sans">{sample.yarnNote}</div>
          </div>

          {/* Card 2: WEAVE STRUCTURE */}
          <div className="p-4 rounded-2xl bg-[#12151b] border border-white/10 space-y-2">
            <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">WEAVE STRUCTURE</div>
            <div className="grid grid-cols-2 gap-3 font-sans">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-khadi-textDim text-[11px] font-mono font-medium">WARP DENSITY</div>
                <div className="text-white font-bold text-sm mt-0.5">{sample.warpDensity}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-khadi-textDim text-[11px] font-mono font-medium">WEFT DENSITY</div>
                <div className="text-white font-bold text-sm mt-0.5">{sample.weftDensity}</div>
              </div>
            </div>
            <div className="text-xs text-khadi-textMuted font-sans">{sample.weaveNote}</div>
          </div>

          {/* Card 3: SURFACE STRUCTURE */}
          <div className="p-4 rounded-2xl bg-[#12151b] border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-khadi-textMuted uppercase font-bold">SURFACE STRUCTURE</span>
              <span className="text-xs font-mono font-bold text-khadi-cyan">RELIEF: {sample.surfaceRelief}</span>
            </div>
            <div className="text-base font-bold text-white font-sans">RELIEF: {sample.surfaceRelief}</div>
            <div className="text-xs text-khadi-textMuted font-sans">{sample.surfaceNote}</div>
          </div>

          {/* Card 4: PATTERN REPETITION */}
          <div className="p-4 rounded-2xl bg-[#12151b] border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-khadi-textMuted uppercase font-bold">PATTERN REPETITION</span>
              <span className="text-xs font-mono font-bold text-khadi-sand">{sample.patternRepetition}</span>
            </div>
            <div className="text-base font-bold text-white font-sans">{sample.patternRepetition}</div>
            <div className="text-xs text-khadi-textMuted font-sans">{sample.patternNote}</div>
            <div className="text-[10px] text-khadi-textDim font-mono pt-1">
              Advanced analysis: FFT-based periodicity analysis
            </div>
          </div>

          {/* Result Banner: Human-Readable Outcome */}
          <div className={`p-4 rounded-2xl border font-sans shadow-lg ${
            sample.statusOk 
              ? 'bg-khadi-green/15 border-khadi-green/40' 
              : 'bg-khadi-red/15 border-khadi-red/40'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {sample.statusOk ? <CheckCircle2 className="w-5 h-5 text-khadi-green" /> : <XCircle className="w-5 h-5 text-khadi-red" />}
                <span className={`text-lg font-serif font-bold ${sample.statusOk ? 'text-khadi-green' : 'text-khadi-red'}`}>
                  {sample.verdict}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-khadi-textMuted border border-white/10 font-bold">
                PRELIMINARY SCREENING
              </span>
            </div>
            <p className="text-xs text-khadi-cotton/90 mt-1.5 leading-relaxed">
              {sample.verdictNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
