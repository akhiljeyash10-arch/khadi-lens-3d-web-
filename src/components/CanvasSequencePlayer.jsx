import React, { useEffect, useRef } from 'react';

export default function CanvasSequencePlayer({ 
  video1Images = [], 
  video2Images = [],
  scrollProgressRef,
  className = ""
}) {
  const canvasRef = useRef(null);
  const lastStateRef = useRef({
    seq: null,
    frameIndex1: -1,
    frameIndex2: -1,
    blend: -1,
    width: 0,
    height: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true 
    });
    if (!ctx) return;

    let animId;

    // High fidelity 4K-cinematic draw function
    const drawFrame = (img, img2, blend = 0) => {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0 || !img) return;

      // Lock highest-quality bicubic smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgRatio = 16 / 9;
      const canvasRatio = width / height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      // Deep cinematic base
      ctx.fillStyle = '#08090a';
      ctx.fillRect(0, 0, width, height);

      // Primary frame render
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }

      // Smooth crossfade blend
      if (img2 && img2.complete && img2.naturalWidth > 0 && blend > 0.001) {
        ctx.globalAlpha = Math.min(1, Math.max(0, blend));
        ctx.drawImage(img2, drawX, drawY, drawW, drawH);
        ctx.globalAlpha = 1.0;
      }
    };

    // Find nearest loaded frame with caching
    const findFrame = (images, targetIndex) => {
      if (!images || images.length === 0) return null;
      if (images[targetIndex]) return images[targetIndex];

      for (let offset = 1; offset < 25; offset++) {
        if (targetIndex - offset >= 0 && images[targetIndex - offset]) {
          return images[targetIndex - offset];
        }
        if (targetIndex + offset < images.length && images[targetIndex + offset]) {
          return images[targetIndex + offset];
        }
      }
      return images[0] || null;
    };

    // Single RAF render tick driven by scrollProgressRef
    const renderTick = () => {
      animId = requestAnimationFrame(renderTick);

      const progress = scrollProgressRef?.current?.progress ?? 0;
      const last = lastStateRef.current;
      const currentW = canvas.width;
      const currentH = canvas.height;

      // Determine sequence mapping
      let targetSeq = 1;
      let targetIndex1 = 0;
      let targetIndex2 = 0;
      let targetBlend = 0;

      if (progress < 0.48) {
        targetSeq = 1;
        const normalized = Math.min(1, Math.max(0, progress / 0.48));
        targetIndex1 = Math.min(239, Math.max(0, Math.floor(normalized * 239)));
      } else if (progress >= 0.48 && progress <= 0.52) {
        targetSeq = 'crossfade';
        targetIndex1 = 239;
        targetIndex2 = 0;
        targetBlend = Math.min(1, Math.max(0, (progress - 0.48) / 0.04));
      } else {
        targetSeq = 2;
        const normalized = Math.min(1, Math.max(0, (progress - 0.52) / 0.43));
        targetIndex2 = Math.min(191, Math.max(0, Math.floor(normalized * 191)));
      }

      // Check if redraw is strictly necessary
      const sizeChanged = last.width !== currentW || last.height !== currentH;
      const seqChanged = last.seq !== targetSeq;
      const frame1Changed = targetSeq === 1 && last.frameIndex1 !== targetIndex1;
      const frame2Changed = targetSeq === 2 && last.frameIndex2 !== targetIndex2;
      const blendChanged = targetSeq === 'crossfade' && Math.abs(last.blend - targetBlend) > 0.005;

      if (sizeChanged || seqChanged || frame1Changed || frame2Changed || blendChanged) {
        const img1 = findFrame(video1Images, targetIndex1);
        const img2 = findFrame(video2Images, targetIndex2);

        if (targetSeq === 1) {
          drawFrame(img1, null, 0);
        } else if (targetSeq === 2) {
          drawFrame(img2, null, 0);
        } else {
          drawFrame(img1, img2, targetBlend);
        }

        // Save last rendered state
        last.seq = targetSeq;
        last.frameIndex1 = targetIndex1;
        last.frameIndex2 = targetIndex2;
        last.blend = targetBlend;
        last.width = currentW;
        last.height = currentH;

        if (scrollProgressRef?.current) {
          scrollProgressRef.current.currentFrame1 = targetIndex1;
          scrollProgressRef.current.currentFrame2 = targetIndex2;
          scrollProgressRef.current.activeSeq = targetSeq;
        }
      }
    };

    renderTick();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [video1Images, video2Images, scrollProgressRef]);

  // High-DPI 4K resize handler with dynamic DPR cap (up to 2.5x)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const rect = canvas.getBoundingClientRect();
      const newW = Math.round(rect.width * dpr);
      const newH = Math.round(rect.height * dpr);
      if (canvas.width !== newW || canvas.height !== newH) {
        canvas.width = newW;
        canvas.height = newH;
        lastStateRef.current.width = 0; // Force immediate redraw with pristine scaling
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div 
        className="w-full h-full transform-gpu transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `scale(1.04) translate3d(calc(var(--mouse-x, 0) * -14px), calc(var(--mouse-y, 0) * -14px), 0)`,
        }}
      >
        <canvas 
          ref={canvasRef} 
          className="cinematic-canvas w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
      {/* Cinematic Edge Vignette for Negative Space & Typography Readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08090a]/85 via-transparent to-[#08090a]/45" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#08090a]/35 via-transparent to-[#08090a]/35" />
    </div>
  );
}
