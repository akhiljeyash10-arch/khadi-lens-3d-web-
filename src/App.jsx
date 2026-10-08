import React, { useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import CanvasSequencePlayer from './components/CanvasSequencePlayer';
import ParallaxBackgroundParticles from './components/ParallaxBackgroundParticles';
import SectionOverlays from './components/SectionOverlays';
import DebugPanel from './components/DebugPanel';
import { useFramePreloader } from './hooks/useFramePreloader';
import { useMouseParallax } from './hooks/useMouseParallax';
import { ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { video1Images, video2Images, loadingProgress, isReady } = useFramePreloader();
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Hook in high-performance 60 FPS mouse parallax (sets --mouse-x and --mouse-y)
  useMouseParallax();

  // Single source of truth for normalized progress across the entire app
  const scrollProgressRef = useRef({
    progress: 0,
    velocity: 0,
    isStationary: true,
    currentFrame1: 0,
    currentFrame2: 0,
    activeSeq: 1
  });

  const navProgressRef = useRef(null);
  const navPercentRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis as Single Scroll Authority synchronized with GSAP Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Direct scroll sync without triggering React component re-renders
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();

      const progress = Math.min(1, Math.max(0, e.progress || 0));
      const velocity = e.velocity || 0;

      scrollProgressRef.current.progress = progress;
      scrollProgressRef.current.velocity = velocity;
      scrollProgressRef.current.isStationary = Math.abs(velocity) < 0.005;

      // Update navbar DOM directly for 60fps zero-overhead rendering
      if (navProgressRef.current) {
        navProgressRef.current.style.width = `${progress * 100}%`;
      }
      if (navPercentRef.current) {
        const pct = Math.round(progress * 100);
        navPercentRef.current.textContent = `${String(pct).padStart(2, '0')}%`;
      }
    });

    // Synchronize Lenis with GSAP's single animation ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Keyboard shortcut 'D' to toggle debug inspector
    const handleKeyDown = (e) => {
      if (e.key === 'd' || e.key === 'D') {
        if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
        setIsDebugOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Smooth jump to scene using Lenis
  const scrollToScene = useCallback((sceneId) => {
    const el = document.getElementById(sceneId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.2 });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f2eee6] selection:bg-khadi-sand/20 overflow-x-hidden">
      {/* Initial Cinema Preloader Screen */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090a] transition-all duration-700 ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center max-w-sm text-center px-6 space-y-4">
          <div className="relative w-16 h-16 rounded-full border border-khadi-sand/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-t-khadi-sand border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute w-2 h-2 rounded-full bg-khadi-sand" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-serif tracking-widest text-white font-bold">
              KHADI / BEYOND THE SURFACE
            </div>
            <div className="text-[10px] font-mono text-khadi-textMuted tracking-widest">
              INITIALIZING OPTICAL INTERFACE • {loadingProgress}%
            </div>
          </div>

          <div className="w-48 bg-white/10 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-khadi-sand to-khadi-green transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Fixed Minimal Navigation */}
      <Navbar 
        navProgressRef={navProgressRef}
        navPercentRef={navPercentRef}
        onNavigate={scrollToScene} 
        onToggleDebug={() => setIsDebugOpen((prev) => !prev)}
        isDebugOpen={isDebugOpen}
      />

      {/* Fixed Fullscreen Cinematic Background Video-Frame Player */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CanvasSequencePlayer
          video1Images={video1Images}
          video2Images={video2Images}
          scrollProgressRef={scrollProgressRef}
          className="w-full h-full"
        />
      </div>

      {/* Ambient 3D Optical Micro-Fiber Particle Depth Layer */}
      <ParallaxBackgroundParticles scrollProgressRef={scrollProgressRef} />

      {/* Interactive 12-Scene Multi-Plane Story Overlay Stream */}
      <main className="relative z-10">
        <SectionOverlays onScrollToScene={scrollToScene} />
      </main>

      {/* Real-time Scroll & FPS Inspector Panel */}
      <DebugPanel 
        scrollProgressRef={scrollProgressRef}
        isOpen={isDebugOpen}
        onClose={() => setIsDebugOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#08090a]/90 backdrop-blur-md py-8 text-center text-xs font-mono text-khadi-textMuted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-khadi-sand" />
            <span>KHADI — BEYOND THE SURFACE • SIH 2026</span>
          </div>
          <div className="text-[11px] text-khadi-textDim">
            Preliminary Optical Authentication Screening System • Controlled Multi-Angle Illumination
          </div>
        </div>
      </footer>
    </div>
  );
}
