import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDown, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Building2, 
  ShoppingBag, 
  Award,
  CheckCircle2,
  RefreshCw,
  Zap,
  ArrowRight,
  Crosshair,
  Compass
} from 'lucide-react';
import DirectionalLightingSimulator from './DirectionalLightingSimulator';
import ThreeReliefViewer from './ThreeReliefViewer';
import SampleComparisonLens from './SampleComparisonLens';
import DashboardReport from './DashboardReport';
import ParallaxTiltCard from './ParallaxTiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function SectionOverlays({ onScrollToScene }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Multi-speed scroll parallax for background watermarks
      const bgElements = gsap.utils.toArray('.parallax-bg');
      bgElements.forEach((el) => {
        gsap.to(el, {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      // 2. Fast multi-speed scroll parallax for floating telemetry chips
      const fgElements = gsap.utils.toArray('.parallax-fg');
      fgElements.forEach((el) => {
        gsap.to(el, {
          yPercent: -75,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      });

      // 3. Subtle depth glide for main editorial cards
      const cards = gsap.utils.toArray('.parallax-card');
      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0.85 },
          {
            y: -15,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full text-[#f2eee6] pointer-events-none">
      {/* =========================================================================
          SCENE 01 — HERO
          ========================================================================= */}
      <section 
        id="scene-01" 
        className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-32 pb-14 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-4 top-1/4 parallax-watermark">
          01 / ORIGIN
        </div>

        {/* Floating Reticle Crosses */}
        <div className="parallax-reticle-cross top-24 left-10" />
        <div className="parallax-reticle-cross bottom-20 right-16" />

        {/* Floating Telemetry Chip */}
        <div className="parallax-fg parallax-fg-chip absolute top-36 right-8 lg:right-24 hidden sm:flex items-center gap-2 bg-[#08090a]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-khadi-sand/30 text-xs font-mono text-khadi-sand shadow-lg">
          <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
          <span>OPTICAL MAGNIFICATION: 1:1 MACRO</span>
        </div>

        <ParallaxTiltCard className="max-w-4xl parallax-card mt-4">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-khadi-sand backdrop-blur-md mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-khadi-green animate-pulse" />
              <span className="tracking-widest uppercase font-semibold">PORTABLE OPTICAL TEXTILE AUTHENTICATION</span>
            </div>

            <h1 className="display-hero font-bold text-white tracking-tight">
              DON'T JUDGE THE FABRIC<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-khadi-cotton via-khadi-sand to-khadi-textMuted">
                BY HOW IT LOOKS.
              </span>
            </h1>

            <p className="display-hero-sub text-khadi-sand font-medium mt-6">
              MEASURE HOW IT WAS MADE.
            </p>

            <p className="body-editorial max-w-2xl mt-6">
              A controlled optical measurement system that examines the physical structure of finished fabric and assesses whether its characteristics are consistent with verified handcrafted Khadi.
            </p>
          </div>
        </ParallaxTiltCard>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10 max-w-5xl">
          <div className="flex flex-wrap items-center gap-6 text-sm text-khadi-textMuted font-sans">
            <div>
              <span className="text-khadi-textDim font-mono text-xs">HARDWARE: </span>
              <span className="text-white font-medium">Quad-Directional Optical Scanner</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-khadi-textDim font-mono text-xs">METHOD: </span>
              <span className="text-white font-medium">Photometric Structural Analysis</span>
            </div>
          </div>

          <button
            onClick={() => onScrollToScene('scene-02')}
            className="flex items-center gap-2 text-sm font-mono text-khadi-sand hover:text-white transition-colors group cursor-pointer"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 text-khadi-sand group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SCENE 02 — THE PROBLEM
          ========================================================================= */}
      <section 
        id="scene-02" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute left-6 top-1/3 parallax-watermark">
          02 / PROBLEM
        </div>

        {/* Floating Telemetry Chip */}
        <div className="parallax-fg parallax-fg-chip absolute top-28 right-12 hidden md:flex items-center gap-2 bg-[#08090a]/85 backdrop-blur-md px-4 py-2 rounded-full border border-khadi-amber/30 text-xs font-mono text-khadi-amber shadow-lg">
          <span className="w-2 h-2 rounded-full bg-khadi-amber animate-pulse" />
          <span>SURFACE PHENOTYPE: IDENTICAL</span>
        </div>

        <ParallaxTiltCard className="max-w-4xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-amber mb-3">
              02 / THE AUTHENTICATION CHALLENGE
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              THEY CAN LOOK THE SAME.
            </h2>

            <p className="display-subtitle text-khadi-sand font-medium mt-2">
              Appearance alone cannot reveal how fabric was made.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              Machine-produced powerlooms can mimic the color, weave pattern, and basic touch of authentic Khadi. To the naked human eye, the fabrics are nearly indistinguishable.
            </p>

            {/* Spacious 2-Column Comparison Cards with 3D Tilt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-7 rounded-2xl bg-[#12151b] border border-khadi-green/35 space-y-3 shadow-md hover:border-khadi-green/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-khadi-green font-bold tracking-wider uppercase">SAMPLE A: GENUINE KHADI</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-khadi-green" />
                </div>
                <div className="card-title-lg text-white">Hand-Spun & Hand-Woven</div>
                <p className="card-body-lg">
                  Natural yarn thickness variation, twist-related structural features, and local weft spacing variation consistent with manual craftsmanship.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-khadi-red/35 space-y-3 shadow-md hover:border-khadi-red/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-khadi-red font-bold tracking-wider uppercase">SAMPLE B: MILL IMITATION</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-khadi-red" />
                </div>
                <div className="card-title-lg text-white">Rotor-Spun Powerloom</div>
                <p className="card-body-lg">
                  Mechanically uniform thread diameters, rigid periodic grid alignment, and automated tension from industrial machinery.
                </p>
              </div>
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 03 — LOOK BENEATH THE SURFACE
          ========================================================================= */}
      <section 
        id="scene-03" 
        className="relative min-h-screen w-full flex flex-col justify-center items-start lg:items-end px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-12 top-1/4 parallax-watermark">
          03 / BENEATH
        </div>

        {/* Floating Telemetry Chip */}
        <div className="parallax-fg parallax-fg-chip absolute top-32 left-16 hidden lg:flex items-center gap-2 bg-[#08090a]/85 backdrop-blur-md px-4 py-2 rounded-full border border-khadi-cyan/30 text-xs font-mono text-khadi-cyan shadow-lg">
          <Compass className="w-4 h-4 text-khadi-cyan" />
          <span>MICRO-FIBER ORIENTATION VECTOR</span>
        </div>

        <ParallaxTiltCard className="max-w-3xl parallax-card">
          <div className="text-left lg:text-right editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-cyan mb-3">
              03 / THE CONCEPTUAL PIVOT
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              WHAT IF WE STOPPED<br />
              <span className="text-khadi-sand">LOOKING AT THE SURFACE?</span>
            </h2>

            <p className="display-hero-sub text-khadi-cotton mt-4">
              AND STARTED MEASURING IT.
            </p>

            <p className="body-editorial mt-4 max-w-xl lg:ml-auto">
              Moving from passive surface photography to active optical inspection reveals the true 3D physical geometry of every thread, twist, and intersection.
            </p>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 04 — THE DEVICE (THE KHADI SCANNER)
          ========================================================================= */}
      <section 
        id="scene-04" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute left-8 top-1/4 parallax-watermark">
          04 / HARDWARE
        </div>

        {/* Floating Telemetry Chip */}
        <div className="parallax-fg parallax-fg-chip absolute top-32 right-16 hidden md:flex items-center gap-2 bg-[#08090a]/85 backdrop-blur-md px-4 py-2 rounded-full border border-khadi-sand/40 text-xs font-mono text-khadi-sand shadow-lg">
          <Zap className="w-3.5 h-3.5 text-khadi-sand" />
          <span>AMBIENT ISOLATION: 0.00 LUX</span>
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-sand mb-3">
              04 / THE HARDWARE ARCHITECTURE
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              THE KHADI SCANNER
            </h2>

            <p className="display-subtitle text-khadi-sand font-medium mt-2">
              IDENTIFY WHAT THE EYE CANNOT.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              A portable optical system that measures the physical structure of finished fabric and assesses whether its characteristics are consistent with verified handcrafted Khadi.
            </p>

            {/* Core Pipeline Flow */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 text-xs sm:text-sm font-mono text-khadi-cotton font-semibold">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">CONTROLLED LIGHT</span>
              <span className="text-khadi-sand">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">STRUCTURAL MEASUREMENT</span>
              <span className="text-khadi-sand">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">AI ANALYSIS</span>
              <span className="text-khadi-sand">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-khadi-green/20 text-khadi-green border border-khadi-green/40">AUTHENTICITY ASSESSMENT</span>
            </div>

            {/* Spacious 2x2 Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold">01 / CALIBRATED APERTURE</div>
                <div className="card-title-lg">High-Resolution Macro Optics</div>
                <p className="card-body-lg">
                  Distortion-free macro lens focused directly on yarn-level weave intersections and fiber striations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold">02 / QUAD-LED RING</div>
                <div className="card-title-lg">4 Directional Light Sources</div>
                <p className="card-body-lg">
                  Four discrete 45° elevation sources (North, East, South, West) cast isolated micro-shadows.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold">03 / OPTICAL ENCLOSURE</div>
                <div className="card-title-lg">Ambient Isolation Chamber</div>
                <p className="card-body-lg">
                  Blocks external room lighting and stray reflections so every fabric scan is scientifically repeatable.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12151b] border border-white/10 space-y-2 hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold">04 / FABRIC CONTACT RING</div>
                <div className="card-title-lg">Non-Destructive Contact</div>
                <p className="card-body-lg">
                  Flat positioning interface that secures the textile flat without stretching or altering yarn tension.
                </p>
              </div>
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 05 — INSIDE THE SCANNER (DIRECTIONAL ILLUMINATION)
          ========================================================================= */}
      <section 
        id="scene-05" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-6 top-1/4 parallax-watermark">
          05 / QUAD-LED
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-cyan mb-3">
              05 / OPTICAL MULTI-OBSERVATION
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              WE DON'T JUST TAKE FOUR PHOTOS.
            </h2>

            <p className="display-hero-sub text-khadi-sand font-medium mt-2">
              WE MEASURE FOUR RESPONSES.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              When directional light strikes a yarn from four orthogonal angles, the resulting micro-shadows isolate the exact physical surface gradient and 3D orientation of every thread.
            </p>

            {/* Embedded Interactive 4-Directional LED Simulator */}
            <div className="mt-8">
              <DirectionalLightingSimulator />
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 06 — FROM LIGHT TO STRUCTURE (3D TOPOGRAPHY)
          ========================================================================= */}
      <section 
        id="scene-06" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute left-8 top-1/4 parallax-watermark">
          06 / TOPOGRAPHY
        </div>

        {/* Floating Telemetry Chip */}
        <div className="parallax-fg parallax-fg-chip absolute top-32 right-16 hidden md:flex items-center gap-2 bg-[#08090a]/85 backdrop-blur-md px-4 py-2 rounded-full border border-khadi-green/30 text-xs font-mono text-khadi-green shadow-lg">
          <Layers className="w-3.5 h-3.5 text-khadi-green" />
          <span>PHOTOMETRIC NORMAL SOLVER: ACTIVE</span>
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-green mb-3">
              06 / PHOTOMETRIC RECONSTRUCTION
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              APPEARANCE IS REMOVED.
            </h2>

            <p className="display-hero-sub text-khadi-sand font-medium mt-2">
              STRUCTURE REMAINS.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              By solving photometric stereo equations across all four light responses, surface dye is mathematically separated from physical topography — reconstructing the true 3D micro-relief of the yarn.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6 text-xs font-mono">
              {['YARN GEOMETRY', 'WEAVE INTERSECTION', 'SURFACE RELIEF', 'SPACING ANISOTROPY', 'SLUB TOPOGRAPHY'].map((tag) => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-khadi-sand font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Embedded Interactive Three.js 3D Relief Viewer */}
            <div className="mt-8">
              <ThreeReliefViewer sampleType="handcrafted" />
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 07 — THE MEASUREMENTS
          ========================================================================= */}
      <section 
        id="scene-07" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-6 top-1/4 parallax-watermark">
          07 / METRICS
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-sand mb-3">
              07 / QUANTITATIVE FEATURE EXTRACTION
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              PHYSICAL PROPERTIES IN REAL NUMBERS.
            </h2>

            <p className="display-subtitle text-khadi-sand font-medium mt-2">
              Four core measurements extracted directly from the 3D surface:
            </p>

            {/* Spacious 2x2 Honest Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 shadow-md hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold tracking-wider uppercase">01 / YARN STRUCTURE</div>
                <div className="metric-giant text-khadi-green">HIGH</div>
                <div className="card-title-lg">High Variation</div>
                <p className="card-body-lg">
                  Variation detected across the scanned yarn region, consistent with manual yarn preparation.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 shadow-md hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold tracking-wider uppercase">02 / WEAVE STRUCTURE</div>
                <div className="metric-giant text-white">72 / 54</div>
                <div className="card-title-lg">Warp & Weft Density</div>
                <p className="card-body-lg">
                  72 ends / inch (warp) and 54 picks / inch (weft) measured in the scanned region.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 shadow-md hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold tracking-wider uppercase">03 / SURFACE STRUCTURE</div>
                <div className="metric-giant text-khadi-cyan">HIGH</div>
                <div className="card-title-lg">Relief: High</div>
                <p className="card-body-lg">
                  Relative surface variation detected by isolating 3D microfiber topography from color.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 shadow-md hover:border-white/25 transition-colors">
                <div className="text-xs font-mono text-khadi-sand font-bold tracking-wider uppercase">04 / PATTERN REPETITION</div>
                <div className="metric-giant text-khadi-sand">LOW</div>
                <div className="card-title-lg">Low Repetition</div>
                <p className="card-body-lg">
                  Low repetitive structure detected in the scanned region. (Advanced: FFT periodicity).
                </p>
              </div>
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 08 — AI / INTERPRETATION
          ========================================================================= */}
      <section 
        id="scene-08" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute left-6 top-1/4 parallax-watermark">
          08 / PIPELINE
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-cyan mb-3">
              08 / MACHINE LEARNING PIPELINE
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              PHYSICAL DATA BECOMES EVIDENCE.
            </h2>

            <p className="display-hero-sub text-khadi-sand font-medium mt-2">
              EVIDENCE BECOMES A DECISION.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              Our machine learning model is trained on a curated reference population of verified handcrafted Khadi swatches from certified artisan clusters across India. It compares structural signatures against empirical benchmarks.
            </p>

            {/* Clean 5-Step Pipeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-8 items-stretch">
              {[
                { step: '01', name: 'OPTICAL SCAN', detail: '4-angle photometric captures' },
                { step: '02', name: '3D RELIEF', detail: 'Surface normal & heightfield' },
                { step: '03', name: 'FEATURE VECTOR', detail: '128-D physical descriptors' },
                { step: '04', name: 'BENCHMARK', detail: 'Artisan reference database' },
                { step: '05', name: 'REPORT', detail: 'Consistency score & decision' },
              ].map((node) => (
                <div key={node.step} className="p-5 rounded-2xl bg-[#12151b] border border-white/10 text-center flex flex-col justify-between space-y-2 hover:border-white/25 transition-colors">
                  <div className="text-xs font-mono text-khadi-sand font-bold">{node.step}</div>
                  <div className="text-sm font-bold text-white">{node.name}</div>
                  <div className="text-xs text-khadi-textMuted">{node.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 09 — SOFTWARE DASHBOARD
          ========================================================================= */}
      <section 
        id="scene-09" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-6 top-1/4 parallax-watermark">
          09 / DECISION
        </div>

        <ParallaxTiltCard className="max-w-6xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-green mb-3">
              09 / EXPLAINABLE DECISION SYSTEM
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              THE TEXTILE CONSISTENCY REPORT
            </h2>

            <p className="display-subtitle text-khadi-sand font-medium mt-2">
              Transparent, evidence-based preliminary authentication.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              A production-grade interface that provides transparent quantitative evidence, statistical distribution plots, and uncertainty bounds rather than an opaque black box.
            </p>

            {/* Embedded Interactive Live Dashboard */}
            <div className="mt-8">
              <DashboardReport />
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 10 — THE REAL TEST (COMPARATIVE BENCHMARK)
          ========================================================================= */}
      <section 
        id="scene-10" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute left-6 top-1/4 parallax-watermark">
          10 / BENCHMARK
        </div>

        <ParallaxTiltCard className="max-w-6xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-amber mb-3">
              10 / BENCHMARK VALIDATION
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              SAME APPEARANCE. DIFFERENT STRUCTURE.
            </h2>

            <p className="display-hero-sub text-khadi-sand font-medium mt-2">
              THAT'S WHAT WE MEASURE.
            </p>

            <p className="body-editorial mt-4 max-w-2xl">
              Interact with the comparative inspection tool below to evaluate how the scanner differentiates genuine handcrafted Khadi from machine imitations across multiple analysis layers.
            </p>

            {/* Embedded Interactive Comparison Lens */}
            <div className="mt-8">
              <SampleComparisonLens />
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 11 — IMPACT & TRUST ECOSYSTEM
          ========================================================================= */}
      <section 
        id="scene-11" 
        className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-28 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute right-6 top-1/4 parallax-watermark">
          11 / TRUST
        </div>

        <ParallaxTiltCard className="max-w-5xl parallax-card">
          <div className="editorial-card p-8 sm:p-12 rounded-3xl">
            <div className="eyebrow-label text-khadi-sand mb-3">
              11 / VALUE CHAIN EMPOWERMENT
            </div>

            <h2 className="display-section font-bold text-white tracking-tight">
              PROTECT THE VALUE OF GENUINE CRAFTSMANSHIP.
            </h2>

            <p className="display-subtitle text-khadi-sand font-medium mt-2">
              A trusted screening layer across the decentralized textile ecosystem:
            </p>

            {/* 4 Pillars of the Trust Chain */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 hover:border-white/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-khadi-sand" />
                </div>
                <div className="card-title-lg">Artisans & Weavers</div>
                <p className="card-body-lg">
                  Fair market value for manual spinning and handloom labor without price dilution from industrial powerlooms.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 hover:border-white/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-khadi-sand" />
                </div>
                <div className="card-title-lg">Cooperatives & KVIB</div>
                <p className="card-body-lg">
                  Rapid intake quality screening at procurement centers to detect machine-made adulteration before aggregation.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 hover:border-white/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-khadi-sand" />
                </div>
                <div className="card-title-lg">Retailers & Brands</div>
                <p className="card-body-lg">
                  Supply chain transparency, point-of-sale authenticity assurance, and prevention of counterfeit brand fraud.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#12151b] border border-white/10 space-y-3 hover:border-white/25 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-khadi-sand" />
                </div>
                <div className="card-title-lg">Consumers</div>
                <p className="card-body-lg">
                  Verified trust in authentic heritage craft products and Geographical Indication (GI) provenance.
                </p>
              </div>
            </div>
          </div>
        </ParallaxTiltCard>
      </section>

      {/* =========================================================================
          SCENE 12 — FUTURE & FINAL CTA
          ========================================================================= */}
      <section 
        id="scene-12" 
        className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6 sm:px-10 py-32 pointer-events-auto overflow-hidden"
      >
        {/* Parallax Background Watermark */}
        <div className="parallax-bg absolute inset-0 flex items-center justify-center parallax-watermark">
          12 / FUTURE
        </div>

        <ParallaxTiltCard className="max-w-3xl parallax-card">
          <div className="space-y-8 editorial-card p-10 sm:p-14 rounded-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-khadi-sand backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-khadi-sand" />
              <span className="tracking-widest uppercase font-semibold">THE NEXT GENERATION OF PHYSICAL AUTHENTICATION</span>
            </div>

            <h2 className="display-section font-bold text-white tracking-tight leading-tight">
              FROM TEXTILE AUTHENTICATION<br />
              <span className="text-khadi-sand">TO TRUST IN PHYSICAL PRODUCTS.</span>
            </h2>

            <p className="display-subtitle text-khadi-cotton font-medium">
              KHADI — BEYOND THE SURFACE.
            </p>

            <p className="body-editorial max-w-xl mx-auto">
              A portable optical approach to preliminary authentication of handcrafted Khadi, Handloom, and GI Textiles.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onScrollToScene('scene-04')}
                className="px-7 py-3.5 rounded-xl bg-khadi-sand text-black font-sans font-bold text-sm hover:bg-white transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                Explore the Scanner
              </button>

              <button
                onClick={() => onScrollToScene('scene-05')}
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-sans font-medium text-sm transition-all hover:scale-105 cursor-pointer"
              >
                View the Science
              </button>

              <button
                onClick={() => onScrollToScene('scene-09')}
                className="px-7 py-3.5 rounded-xl bg-khadi-green/20 hover:bg-khadi-green/30 border border-khadi-green/40 text-khadi-green font-sans font-bold text-sm transition-all hover:scale-105 cursor-pointer"
              >
                See the Result
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onScrollToScene('scene-01')}
                className="inline-flex items-center gap-2 text-sm font-sans text-khadi-textMuted hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-khadi-sand" />
                <span>Replay Cinematic Journey</span>
              </button>
            </div>
          </div>
        </ParallaxTiltCard>
      </section>
    </div>
  );
}
