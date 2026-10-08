import React, { useEffect, useRef } from 'react';

/**
 * ParallaxBackgroundParticles
 * High-performance 2D/3D ambient optical micro-fiber particle layer.
 * Responds to scroll velocity and mouse parallax to create physical atmospheric depth.
 */
export default function ParallaxBackgroundParticles({ scrollProgressRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Generate ~45 micro-fibers with depth (z: 0.2 to 1.8)
    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.3 + Math.random() * 1.5, // depth layer
        length: 8 + Math.random() * 18,
        angle: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.4 ? '#e8e2d4' : '#38bdf8', // warm cotton vs optical cyan
      });
    }

    let lastScrollY = window.scrollY;

    const render = () => {
      animId = requestAnimationFrame(render);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      // Read CSS variable mouse coordinates
      const mouseX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mouse-x') || 0);
      const mouseY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mouse-y') || 0);

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move with internal velocity + scroll velocity modulated by depth (z)
        p.y -= scrollDelta * p.z + p.speedY;
        p.x += p.speedX + mouseX * p.z * 0.3;
        p.y += mouseY * p.z * 0.3;

        // Wrap around bounds
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // Render micro-fiber filament
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + mouseX * 0.05);

        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * Math.min(1, p.z);
        ctx.lineWidth = Math.max(0.6, p.z * 0.9);
        ctx.beginPath();
        ctx.moveTo(-p.length / 2, 0);
        ctx.quadraticCurveTo(0, Math.sin(p.angle) * 3, p.length / 2, 0);
        ctx.stroke();

        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgressRef]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[1] pointer-events-none w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
