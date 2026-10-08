import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronRight, Activity } from 'lucide-react';

export default function Navbar({ navProgressRef, navPercentRef, onNavigate, onToggleDebug, isDebugOpen }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Story', target: 'scene-01' },
    { label: 'Problem', target: 'scene-02' },
    { label: 'Scanner', target: 'scene-04' },
    { label: 'Optics', target: 'scene-05' },
    { label: 'Structure', target: 'scene-06' },
    { label: 'Evidence', target: 'scene-08' },
    { label: 'Report', target: 'scene-09' },
  ];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch (e) {}
    }
  };

  return (
    <>
      {/* Top Fixed Minimal Luxury Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#08090a]/90 backdrop-blur-xl border-b border-white/10 py-3.5' 
            : 'bg-gradient-to-b from-[#08090a]/95 via-[#08090a]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Editorial Title */}
          <div 
            onClick={() => onNavigate && onNavigate('scene-01')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full border border-khadi-sand/40 flex items-center justify-center bg-white/5 group-hover:border-khadi-sand transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-khadi-sand animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm sm:text-base font-serif font-bold tracking-wider text-white group-hover:text-khadi-sand transition-colors">
                KHADI <span className="text-khadi-sand font-normal">/</span> BEYOND THE SURFACE
              </div>
              <div className="text-xs text-khadi-textMuted tracking-wider hidden sm:block font-sans font-medium">
                Optical Textile Authentication
              </div>
            </div>
          </div>

          {/* Clean Readable Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-khadi-sand/80 tracking-wide">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => onNavigate && onNavigate(item.target)}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-khadi-textMuted hover:text-white transition-all text-xs flex items-center gap-2"
              title={soundEnabled ? 'Mute Atmosphere' : 'Enable Atmosphere'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-khadi-green" /> : <VolumeX className="w-4 h-4" />}
              <span className="font-sans text-xs hidden sm:inline">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('scene-09')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-khadi-sand/15 hover:bg-khadi-sand/25 border border-khadi-sand/40 text-sm font-medium text-khadi-cotton transition-all"
            >
              <span>View Report</span>
              <ChevronRight className="w-4 h-4 text-khadi-sand" />
            </button>
          </div>
        </div>

        {/* Scrubbing Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none">
          <div 
            ref={navProgressRef}
            className="h-full bg-gradient-to-r from-khadi-sand via-khadi-cyan to-khadi-green w-0 transition-[width] duration-75 ease-out"
          />
        </div>
      </nav>

      {/* Floating Timeline Tracker */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 bg-[#08090a]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-khadi-textMuted pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-khadi-green animate-pulse" />
        <span ref={navPercentRef} className="text-white font-bold text-sm">00%</span>
        <span className="text-khadi-textDim">/</span>
        <span className="text-khadi-sand tracking-wider text-xs">SCROLL PROGRESS</span>
      </div>
    </>
  );
}
