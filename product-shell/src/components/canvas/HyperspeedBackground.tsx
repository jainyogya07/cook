'use client';

// ============================================================================
// GALAXY HYPERSPEED WARP BACKGROUND ANIMATION (WHISPER-QUIET THERMAL OPTIMIZED)
// Lightweight perspective warp rays capped at 22 FPS with automatic visibility
// pausing, zero DOM querySelector calls in loop, and near-zero CPU/GPU footprint.
// ============================================================================

import React, { useEffect, useRef } from 'react';
import { useShellStore } from '@/services/useShellStore';

interface StarRay {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  speed: number;
  length: number;
  width: number;
  color: string;
}

export default function HyperspeedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeView = useShellStore((state) => state.activeView);
  const isWorkspaceOpen = activeView === 'module_workspace';

  useEffect(() => {
    // If the full-page workspace is active, do not run background canvas at all
    if (isWorkspaceOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = Math.min(window.innerWidth, 1920));
    let height = (canvas.height = Math.min(window.innerHeight, 1080));

    let focalX = width * 0.5;
    let focalY = height * 0.35;

    let isVisible = !document.hidden;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.min(window.innerWidth, 1920);
      height = canvas.height = Math.min(window.innerHeight, 1080);
      focalX = width * 0.5;
      focalY = height * 0.35;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(render);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    // 24 refined stars for silky smooth visual depth with ultra-low thermal impact
    const rayCount = 24;
    const colors = ['#38BDF8', '#60A5FA', '#C084FC', '#FFFFFF', '#34D399'];

    const initRay = (farPlaneOnly = false): StarRay => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 850;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: farPlaneOnly ? 1000 + Math.random() * 200 : 80 + Math.random() * 1100,
        prevZ: 1100,
        speed: 10 + Math.random() * 14,
        length: 16 + Math.random() * 32,
        width: 1.0 + Math.random() * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    const rays: StarRay[] = Array.from({ length: rayCount }, () => initRay(false));

    // Throttled ~22 FPS rendering loop (silent laptop fans)
    let lastFrameTime = performance.now();
    const frameInterval = 1000 / 22; // ~45ms cap

    const render = (now: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);

      const delta = now - lastFrameTime;
      if (delta < frameInterval) return;
      lastFrameTime = now - (delta % frameInterval);

      // Deep space background fill
      ctx.fillStyle = '#05070A';
      ctx.fillRect(0, 0, width, height);

      // Render lightweight star streaks
      for (let i = 0; i < rays.length; i++) {
        const r = rays[i];
        r.prevZ = r.z;
        r.z -= r.speed;

        if (r.z <= 30) {
          rays[i] = initRay(true);
          continue;
        }

        const k = 400 / r.z;
        const px = r.x * k + focalX;
        const py = r.y * k + focalY;

        const prevK = 400 / r.prevZ;
        const ppx = r.x * prevK + focalX;
        const ppy = r.y * prevK + focalY;

        const dx = px - ppx;
        const dy = py - ppy;
        const dist = Math.hypot(dx, dy) || 1;

        const tailLen = Math.min(50, dist * 2.2);
        const tailX = px - (dx / dist) * tailLen;
        const tailY = py - (dy / dist) * tailLen;

        // Viewport bounds check
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) {
          rays[i] = initRay(true);
          continue;
        }

        const depthAlpha = Math.min(0.8, Math.max(0.12, 1 - r.z / 1100));

        ctx.strokeStyle = r.color;
        ctx.globalAlpha = depthAlpha;
        ctx.lineWidth = r.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isWorkspaceOpen]);

  if (isWorkspaceOpen) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#05070A',
        contain: 'strict',
        willChange: 'transform'
      }}
    />
  );
}
