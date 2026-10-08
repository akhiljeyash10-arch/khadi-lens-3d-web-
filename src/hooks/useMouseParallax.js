import { useEffect, useRef } from 'react';

/**
 * useMouseParallax
 * Smoothly tracks mouse position normalized between -1 and +1 with a high-performance 60fps lerp.
 * Writes CSS custom variables --mouse-x and --mouse-y directly to documentElement for zero-cost GPU transforms.
 */
export function useMouseParallax() {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable or reduce on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      targetRef.current.x = (e.clientX / innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateLoop = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06);

      // Write directly to documentElement CSS custom properties
      document.documentElement.style.setProperty('--mouse-x', currentRef.current.x.toFixed(4));
      document.documentElement.style.setProperty('--mouse-y', currentRef.current.y.toFixed(4));

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return currentRef;
}
