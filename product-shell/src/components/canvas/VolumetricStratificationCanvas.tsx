'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Layers, Wind, Compass, Activity, Eye, RotateCw } from 'lucide-react';

interface LevelData {
  hPa: number;
  name: string;
  altitudeKm: string;
  tempC: string;
  windSpeed: string;
  color: string;
}

const LEVELS: LevelData[] = [
  { hPa: 300, name: 'Upper Troposphere (Jet Stream)', altitudeKm: '9.2 km', tempC: '-38.4°C', windSpeed: '52 m/s', color: '#A855F7' },
  { hPa: 500, name: 'Mid-Troposphere (Steering Flow)', altitudeKm: '5.6 km', tempC: '-14.8°C', windSpeed: '38 m/s', color: '#38BDF8' },
  { hPa: 700, name: 'Convective Inflow & Moisture', altitudeKm: '3.1 km', tempC: '+4.2°C', windSpeed: '26 m/s', color: '#10B981' },
  { hPa: 850, name: 'Low-Level Jet (Vapor Conveyor)', altitudeKm: '1.5 km', tempC: '+18.6°C', windSpeed: '22 m/s', color: '#F59E0B' },
  { hPa: 1000, name: 'Surface Boundary Layer', altitudeKm: '0.1 km', tempC: '+29.2°C', windSpeed: '14 m/s', color: '#06B6D4' }
];

export function VolumetricStratificationCanvas({
  moduleNumber = 1,
  moduleTitle = 'Planetary 4D Atmospheric Telemetry',
  leadHour = 72
}: {
  moduleNumber?: number;
  moduleTitle?: string;
  leadHour?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(850);
  const [rotationAngle, setRotationAngle] = useState(0.4);
  const [tiltAngle, setTiltAngle] = useState(0.55);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const selectedData = LEVELS.find((l) => l.hPa === selectedLevel) || LEVELS[3];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle streamlines in 3D cylindrical coordinates
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => ({
      radius: 40 + Math.random() * 220,
      angle: Math.random() * Math.PI * 2,
      zNorm: Math.random(), // 0 to 1 (surface to 300 hPa)
      speed: 0.008 + Math.random() * 0.016,
      verticalDrift: (Math.random() - 0.48) * 0.002,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6
    }));

    let autoRot = rotationAngle;

    const render = () => {
      if (!isDragging) {
        autoRot += 0.003;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep space atmospheric background
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#0E1422');
      bgGrad.addColorStop(0.6, '#080C14');
      bgGrad.addColorStop(1, '#04060A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 + 20;
      const boxSize = Math.min(width, height) * 0.48;

      // Project 3D point (x, y, z) into 2D isometric viewport
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const cosR = Math.cos(autoRot);
        const sinR = Math.sin(autoRot);
        const rx = x * cosR - y * sinR;
        const ry = x * sinR + y * cosR;

        // Tilt around X axis
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);
        const px = cx + rx;
        const py = cy + (ry * sinT) - (z * cosT);

        return { px, py, depth: ry };
      };

      // 1. Draw 5 Stratified Isobaric Planes
      LEVELS.forEach((level, idx) => {
        const z = ((4 - idx) / 4) * (boxSize * 0.9) - (boxSize * 0.45);
        const isHighlight = level.hPa === selectedLevel;

        const corners = [
          project(-boxSize * 0.7, -boxSize * 0.7, z),
          project(boxSize * 0.7, -boxSize * 0.7, z),
          project(boxSize * 0.7, boxSize * 0.7, z),
          project(-boxSize * 0.7, boxSize * 0.7, z)
        ];

        // Draw plane polygon
        ctx.beginPath();
        ctx.moveTo(corners[0].px, corners[0].py);
        for (let i = 1; i < 4; i++) {
          ctx.lineTo(corners[i].px, corners[i].py);
        }
        ctx.closePath();

        ctx.fillStyle = isHighlight
          ? 'rgba(56, 189, 248, 0.08)'
          : 'rgba(255, 255, 255, 0.015)';
        ctx.fill();

        ctx.lineWidth = isHighlight ? 1.8 : 0.8;
        ctx.strokeStyle = isHighlight
          ? level.color
          : 'rgba(255, 255, 255, 0.12)';
        ctx.stroke();

        // Isobaric Grid Lines on highlighted plane
        if (isHighlight) {
          for (let step = -0.5; step <= 0.5; step += 0.25) {
            const pA = project(-boxSize * 0.7, boxSize * step * 0.7 * 2, z);
            const pB = project(boxSize * 0.7, boxSize * step * 0.7 * 2, z);
            ctx.beginPath();
            ctx.moveTo(pA.px, pA.py);
            ctx.lineTo(pB.px, pB.py);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Isobar Tag on right corner
        const tagPos = corners[1];
        ctx.font = '10px monospace';
        ctx.fillStyle = isHighlight ? level.color : '#687486';
        ctx.fillText(`${level.hPa} hPa (${level.altitudeKm})`, tagPos.px + 10, tagPos.py + 4);
      });

      // 2. Draw Central Vertical Atmospheric Column Axis
      const bottomAxis = project(0, 0, -boxSize * 0.45);
      const topAxis = project(0, 0, boxSize * 0.45);
      ctx.beginPath();
      ctx.moveTo(bottomAxis.px, bottomAxis.py);
      ctx.lineTo(topAxis.px, topAxis.py);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw 3D Cyclonic Wind Stream Particles
      particles.forEach((p) => {
        // Streamline equation: spiral inward/outward based on altitude
        p.angle += p.speed;
        p.zNorm += p.verticalDrift;
        if (p.zNorm > 1) p.zNorm = 0;
        if (p.zNorm < 0) p.zNorm = 1;

        // Spiral radius contracts at 850hPa (convergence) and expands at 300hPa (divergence)
        const radiusFactor = 0.75 + Math.sin(p.zNorm * Math.PI) * 0.4;
        const x = Math.cos(p.angle) * (p.radius * radiusFactor);
        const y = Math.sin(p.angle) * (p.radius * radiusFactor);
        const z = (p.zNorm * boxSize * 0.9) - (boxSize * 0.45);

        const pt = project(x, y, z);

        // Calculate tail
        const tailX = Math.cos(p.angle - p.speed * 2) * (p.radius * radiusFactor);
        const tailY = Math.sin(p.angle - p.speed * 2) * (p.radius * radiusFactor);
        const tailPt = project(tailX, tailY, z);

        ctx.beginPath();
        ctx.moveTo(tailPt.px, tailPt.py);
        ctx.lineTo(pt.px, pt.py);

        // Color blends from surface (cyan) to mid (green) to jet (violet)
        const particleColor = p.zNorm > 0.7 ? '#C084FC' : p.zNorm > 0.35 ? '#38BDF8' : '#34D399';
        ctx.strokeStyle = particleColor;
        ctx.lineWidth = p.size;
        ctx.globalAlpha = p.alpha;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [rotationAngle, tiltAngle, isDragging, selectedLevel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setRotationAngle((prev) => prev + dx * 0.008);
    setTiltAngle((prev) => Math.max(0.2, Math.min(1.2, prev + dy * 0.005)));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 'calc(100vh - 53px)',
        position: 'relative',
        backgroundColor: '#07090E',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      />

      {/* Top Floating Telemetry Bar */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(15, 20, 29, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          <div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700 }}>
              4D VOLUMETRIC DIGITAL TWIN · 60 FPS
            </div>
            <div style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 700 }}>
              {moduleTitle} ({leadHour}h Horizon)
            </div>
          </div>
        </div>

        {/* Drag Hint */}
        <div
          style={{
            backgroundColor: 'rgba(15, 20, 29, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '11px',
            color: '#9BA3AF',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCw style={{ width: '12px', height: '12px', color: '#38BDF8' }} />
          <span>Click & Drag to Rotate 3D Axis</span>
        </div>
      </div>

      {/* Bottom Floating Control Station */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
          flexWrap: 'wrap',
          zIndex: 10
        }}
      >
        {/* Level Selectors */}
        <div
          style={{
            backgroundColor: 'rgba(15, 20, 29, 0.88)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '10px 14px',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '480px'
          }}
        >
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#687486', fontWeight: 700 }}>
            STRATIFIED PRESSURE LEVEL SELECTOR (hPa)
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {LEVELS.map((lvl) => (
              <button
                key={lvl.hPa}
                onClick={() => setSelectedLevel(lvl.hPa)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: selectedLevel === lvl.hPa ? `1px solid ${lvl.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: selectedLevel === lvl.hPa ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedLevel === lvl.hPa ? '#FFFFFF' : '#9BA3AF',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {lvl.hPa} hPa
              </button>
            ))}
          </div>
        </div>

        {/* Selected Level Diagnostics HUD */}
        <div
          style={{
            backgroundColor: 'rgba(15, 20, 29, 0.88)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            padding: '12px 18px',
            borderRadius: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            gap: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <div>
            <div style={{ fontSize: '10px', color: '#687486', fontFamily: 'var(--font-mono)' }}>LAYER ALTITUDE</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: selectedData.color, fontFamily: 'var(--font-mono)' }}>
              {selectedData.altitudeKm}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#687486', fontFamily: 'var(--font-mono)' }}>TEMPERATURE</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
              {selectedData.tempC}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#687486', fontFamily: 'var(--font-mono)' }}>WIND VELOCITY</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
              {selectedData.windSpeed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
