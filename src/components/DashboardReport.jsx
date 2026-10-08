import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Cpu, 
  Database,
  Layers,
  HelpCircle,
  AlertTriangle,
  Activity,
  Maximize2
} from 'lucide-react';

export default function DashboardReport() {
  const [activeTab, setActiveTab] = useState('summary');
  const [resultState, setResultState] = useState('consistent'); // 'consistent', 'inconsistent', 'uncertain'

  return (
    <div className="w-full editorial-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <FileText className="w-6 h-6 text-khadi-sand" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                TEXTILE CONSISTENCY REPORT
              </h2>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/10 text-khadi-sand border border-white/10 font-bold">
                DEMONSTRATION DATA
              </span>
            </div>
            <div className="text-sm font-sans text-khadi-textMuted mt-1">
              SCAN ID: #KHD-2026-90123 • 4-Angle Directional Optical Scan • Region: 25.4 mm²
            </div>
          </div>
        </div>

        {/* Action Controls & Interactive Demo State Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setResultState('consistent')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                resultState === 'consistent' ? 'bg-khadi-green/20 text-khadi-green font-bold border border-khadi-green/40 shadow-sm' : 'text-khadi-textMuted hover:text-white'
              }`}
            >
              Consistent
            </button>
            <button
              onClick={() => setResultState('inconsistent')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                resultState === 'inconsistent' ? 'bg-khadi-red/20 text-khadi-red font-bold border border-khadi-red/40 shadow-sm' : 'text-khadi-textMuted hover:text-white'
              }`}
            >
              Inconsistent
            </button>
            <button
              onClick={() => setResultState('uncertain')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                resultState === 'uncertain' ? 'bg-khadi-amber/20 text-khadi-amber font-bold border border-khadi-amber/40 shadow-sm' : 'text-khadi-textMuted hover:text-white'
              }`}
            >
              Uncertain
            </button>
          </div>

          <button 
            onClick={() => alert("Report Export: Textile Consistency Assessment PDF Generated.")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-khadi-text transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-khadi-sand" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Prominent Human-Readable Decision Banner */}
      <div className={`mt-8 p-6 sm:p-8 rounded-2xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all shadow-xl ${
        resultState === 'consistent'
          ? 'bg-gradient-to-r from-emerald-950/70 via-emerald-900/45 to-emerald-950/70 border-khadi-green/50'
          : resultState === 'inconsistent'
          ? 'bg-gradient-to-r from-red-950/70 via-red-900/45 to-red-950/70 border-khadi-red/50'
          : 'bg-gradient-to-r from-amber-950/70 via-amber-900/45 to-amber-950/70 border-khadi-amber/50'
      }`}>
        <div className="flex items-start sm:items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0 shadow-lg ${
            resultState === 'consistent'
              ? 'bg-khadi-green/20 border-khadi-green/60 text-khadi-green'
              : resultState === 'inconsistent'
              ? 'bg-khadi-red/20 border-khadi-red/60 text-khadi-red'
              : 'bg-khadi-amber/20 border-khadi-amber/60 text-khadi-amber'
          }`}>
            {resultState === 'consistent' && <CheckCircle2 className="w-8 h-8" />}
            {resultState === 'inconsistent' && <AlertTriangle className="w-8 h-8" />}
            {resultState === 'uncertain' && <HelpCircle className="w-8 h-8" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono tracking-widest uppercase font-bold ${
                resultState === 'consistent' ? 'text-khadi-green' : resultState === 'inconsistent' ? 'text-khadi-red' : 'text-khadi-amber'
              }`}>
                PRIMARY ASSESSMENT
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-khadi-textMuted border border-white/10 font-bold">
                PRELIMINARY SCREENING
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mt-1 uppercase">
              {resultState === 'consistent' && 'CONSISTENT'}
              {resultState === 'inconsistent' && 'INCONSISTENT'}
              {resultState === 'uncertain' && 'UNCERTAIN'}
            </div>
            <p className="text-sm sm:text-base text-khadi-sand/90 font-sans mt-2 max-w-xl">
              {resultState === 'consistent' && 'Structural characteristics align with the verified handcrafted reference population.'}
              {resultState === 'inconsistent' && 'Measured structural characteristics differ from the verified handcrafted reference population.'}
              {resultState === 'uncertain' && 'Insufficient evidence or material outside the validated reference population. Requires expert inspection.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 w-full lg:w-auto justify-between lg:justify-start">
          <div>
            <div className="text-xs font-mono text-khadi-textDim">REFERENCE MATCH</div>
            <div className={`text-2xl sm:text-3xl font-bold font-mono ${
              resultState === 'consistent' ? 'text-khadi-green' : resultState === 'inconsistent' ? 'text-khadi-red' : 'text-khadi-amber'
            }`}>
              {resultState === 'consistent' && 'HIGH'}
              {resultState === 'inconsistent' && 'LOW'}
              {resultState === 'uncertain' && 'MODERATE'}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-khadi-textDim">DECISION STATE</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {resultState === 'consistent' ? 'IN-DOMAIN' : resultState === 'inconsistent' ? 'DIVERGENT' : 'REVIEW REQ'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 mt-8 border-b border-white/10 pb-4">
        {[
          { id: 'summary', label: 'STRUCTURAL MEASUREMENTS', icon: Layers },
          { id: 'vectors', label: 'PATTERN REPETITION & FFT', icon: Cpu },
          { id: 'reference', label: 'REFERENCE POPULATION DISTRIBUTION', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white border border-white/20 shadow-md font-semibold'
                  : 'text-khadi-textMuted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Structural Measurements (3-Level Hierarchy) */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Card 1: YARN STRUCTURE */}
          <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 shadow-md">
            <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">
              YARN STRUCTURE
            </div>
            <div className="text-2xl font-bold font-mono text-khadi-green">HIGH VARIATION</div>
            <div className="text-sm text-khadi-textMuted leading-relaxed font-sans">
              Variation detected across the scanned yarn region.
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mt-3">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-khadi-green w-[85%]" />
            </div>
          </div>

          {/* Card 2: WEAVE STRUCTURE */}
          <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 shadow-md">
            <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">
              WEAVE STRUCTURE
            </div>
            <div className="text-2xl font-bold font-mono text-white">72 ends × 54 picks / in</div>
            <div className="text-sm text-khadi-textMuted leading-relaxed font-sans">
              Measured in the scanned region.
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mt-3">
              <div className="h-full bg-gradient-to-r from-amber-600 to-khadi-sand w-[78%]" />
            </div>
          </div>

          {/* Card 3: SURFACE STRUCTURE */}
          <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 shadow-md">
            <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">
              SURFACE STRUCTURE
            </div>
            <div className="text-2xl font-bold font-mono text-khadi-cyan">RELIEF: HIGH</div>
            <div className="text-sm text-khadi-textMuted leading-relaxed font-sans">
              Relative surface variation detected.
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mt-3">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-khadi-cyan w-[92%]" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pattern Repetition & FFT */}
      {activeTab === 'vectors' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-4 shadow-md">
            <div>
              <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">
                PATTERN REPETITION
              </div>
              <div className="text-xl font-bold text-white font-sans mt-0.5">LOW REPETITION</div>
              <div className="text-xs text-khadi-textMuted font-sans">Low repetitive structure detected in the scanned region.</div>
            </div>
            <div className="relative h-48 rounded-2xl bg-[#07080a] border border-white/5 p-4 flex items-center justify-center shadow-inner">
              <div className="w-full h-full flex items-end justify-between gap-1.5">
                {[45, 62, 85, 30, 95, 78, 110, 88, 55, 42, 70, 92, 60, 48, 80, 105, 64, 40, 75, 90].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-t transition-all duration-500 hover:bg-khadi-sand"
                    style={{ 
                      height: `${(h / 120) * 100}%`,
                      backgroundColor: i % 2 === 0 ? '#38bdf8' : '#e8e2d4',
                      opacity: 0.85
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="text-[11px] font-mono text-khadi-textDim">
              Advanced analysis: FFT-based periodicity analysis
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-4 shadow-md">
            <div>
              <div className="text-xs font-mono text-khadi-textMuted uppercase font-bold">
                DIRECTIONAL REFLECTANCE
              </div>
              <div className="text-xl font-bold text-white font-sans mt-0.5">ANISOTROPIC RESPONSE</div>
              <div className="text-xs text-khadi-textMuted font-sans">Twist-related structural features detected.</div>
            </div>
            <div className="relative h-48 rounded-2xl bg-[#07080a] border border-white/5 p-4 flex items-center justify-center font-mono shadow-inner">
              <div className="relative w-40 h-40 rounded-full border border-white/10 flex items-center justify-center">
                <div className="absolute w-28 h-28 rounded-full border border-dashed border-white/20" />
                <div className="absolute w-14 h-14 rounded-full border border-white/30" />
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <polygon 
                    points="50,15 82,48 50,75 22,52" 
                    fill="rgba(34, 197, 94, 0.25)" 
                    stroke="#22c55e" 
                    strokeWidth="2" 
                  />
                </svg>
                <div className="absolute top-1 text-[10px] text-khadi-textMuted">0° (N)</div>
                <div className="absolute right-1 text-[10px] text-khadi-textMuted">90° (E)</div>
                <div className="absolute bottom-1 text-[10px] text-khadi-textMuted">180° (S)</div>
                <div className="absolute left-1 text-[10px] text-khadi-textMuted">270° (W)</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-khadi-textDim text-center">
              Advanced analysis: Multi-angle photometric gradient vector
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Reference Population Distribution (Gaussian Probability Density) */}
      {activeTab === 'reference' && (
        <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 mt-8 space-y-5 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
            <span className="text-khadi-sand font-bold">STATISTICAL REFERENCE POPULATION</span>
            <span className="text-khadi-green font-bold font-mono">STATUS: WITHIN REFERENCE DOMAIN</span>
          </div>

          <div className="relative h-60 rounded-2xl bg-[#07080a] border border-white/5 p-5 flex items-center justify-center shadow-inner">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="millGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="handGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Machine Mill Cluster Gaussian */}
              <path
                d="M 20 110 Q 70 110 80 15 Q 90 110 140 110"
                fill="url(#millGradient)"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="60" y="12" fill="#ef4444" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Machine Mill Cluster</text>

              {/* Handcrafted Population Gaussian */}
              <path
                d="M 120 110 Q 240 110 260 25 Q 280 110 380 110"
                fill="url(#handGradient)"
                stroke="#22c55e"
                strokeWidth="2.5"
              />
              <text x="200" y="18" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Verified Handcrafted Population</text>

              {/* Current Scan Marker */}
              <circle cx="258" cy="27" r="6" fill="#fbf8f0" stroke="#22c55e" strokeWidth="2.5" />
              <line x1="258" y1="27" x2="258" y2="110" stroke="#fbf8f0" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="268" y="45" fill="#fbf8f0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">CURRENT SAMPLE</text>
            </svg>
          </div>

          <div className="text-xs font-mono text-khadi-textMuted flex items-center justify-between">
            <span>Machine Fabric (Low Variation)</span>
            <span>Statistical Overlap Zone</span>
            <span>Artisan Handcrafted (High Structural Variation)</span>
          </div>
        </div>
      )}

      {/* Mandatory Regulatory Notice */}
      <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs font-sans text-khadi-textDim">
        <ShieldCheck className="w-5 h-5 text-khadi-sand flex-shrink-0" />
        <span>
          PRELIMINARY AUTHENTICATION SCREENING SYSTEM. This assessment evaluates physical consistency against reference handcrafted populations and serves as preliminary screening rather than legal certification.
        </span>
      </div>
    </div>
  );
}
