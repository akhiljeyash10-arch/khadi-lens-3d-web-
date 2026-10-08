import React, { useEffect, useState, useRef } from 'react';
import { Activity, ShieldCheck, X, Zap } from 'lucide-react';

export default function DebugPanel({ scrollProgressRef, isOpen, onClose }) {
  const [stats, setStats] = useState({
    fps: 60,
    progress: 0,
    velocity: 0,
    seq: 'Video 1 (Hardware)',
    frame: 1,
    totalFrames: 240,
    isStationary: true
  });

  const fpsRef = useRef({ frames: 0, lastTime: performance.now(), fps: 60 });

  useEffect(() => {
    if (!isOpen) return;

    let animId;
    const updateStats = () => {
      animId = requestAnimationFrame(updateStats);

      // Measure true real-time FPS
      const now = performance.now();
      fpsRef.current.frames++;
      if (now - fpsRef.current.lastTime >= 500) {
        fpsRef.current.fps = Math.round((fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime));
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      const pRef = scrollProgressRef?.current;
      if (!pRef) return;

      const progress = pRef.progress || 0;
      const velocity = Math.abs(pRef.velocity || 0);
      const isStationary = velocity < 0.005;

      let seqName = 'Video 1 (Hardware)';
      let frame = (pRef.currentFrame1 || 0) + 1;
      let total = 240;

      if (progress >= 0.48 && progress <= 0.52) {
        seqName = 'Crossfade Blend';
        frame = `${(pRef.currentFrame1 || 0) + 1} → ${(pRef.currentFrame2 || 0) + 1}`;
        total = '240/192';
      } else if (progress > 0.52) {
        seqName = 'Video 2 (Scientific)';
        frame = (pRef.currentFrame2 || 0) + 1;
        total = 192;
      }

      setStats({
        fps: fpsRef.current.fps,
        progress: (progress * 100).toFixed(2),
        velocity: (velocity * 1000).toFixed(2),
        seq: seqName,
        frame,
        totalFrames: total,
        isStationary
      });
    };

    animId = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, scrollProgressRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 glass-panel rounded-2xl p-4 border border-[#272b33] shadow-2xl font-mono text-xs pointer-events-auto">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-khadi-sand font-bold">
          <Activity className="w-4 h-4 text-khadi-cyan" />
          <span>SCROLL & RENDERING INSPECTOR</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-white/10 text-khadi-textMuted hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 space-y-2.5">
        {/* Stability State Banner */}
        <div className={`p-2.5 rounded-lg border flex items-center justify-between font-bold ${
          stats.isStationary 
            ? 'bg-khadi-green/15 border-khadi-green/40 text-khadi-green'
            : 'bg-khadi-amber/15 border-khadi-amber/40 text-khadi-amber'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${stats.isStationary ? 'bg-khadi-green animate-pulse' : 'bg-khadi-amber'}`} />
            <span>{stats.isStationary ? 'STATIONARY [LOCKED]' : 'SCROLLING [ACTIVE]'}</span>
          </div>
          <span className="text-[10px]">ZERO JITTER</span>
        </div>

        {/* Metric 1: FPS */}
        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
          <span className="text-khadi-textMuted">FRAME RATE:</span>
          <span className={`font-bold ${stats.fps >= 55 ? 'text-khadi-green' : stats.fps >= 40 ? 'text-khadi-amber' : 'text-khadi-red'}`}>
            {stats.fps} FPS
          </span>
        </div>

        {/* Metric 2: Scroll Progress */}
        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
          <span className="text-khadi-textMuted">NORMALIZED PROGRESS:</span>
          <span className="text-white font-bold">{stats.progress}%</span>
        </div>

        {/* Metric 3: Active Video Sequence */}
        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
          <span className="text-khadi-textMuted">ACTIVE SEQUENCE:</span>
          <span className="text-khadi-sand font-bold truncate max-w-[130px]">{stats.seq}</span>
        </div>

        {/* Metric 4: Rendered Frame */}
        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
          <span className="text-khadi-textMuted">CANVAS FRAME:</span>
          <span className="text-khadi-cyan font-bold">{stats.frame} / {stats.totalFrames}</span>
        </div>

        {/* Metric 5: Scroll Velocity */}
        <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
          <span className="text-khadi-textMuted">SCROLL VELOCITY:</span>
          <span className="text-white font-bold">{stats.velocity} px/s</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-khadi-textDim flex items-center justify-between">
        <span>Single Authority: Lenis + GSAP</span>
        <span>Press 'D' to toggle</span>
      </div>
    </div>
  );
}
