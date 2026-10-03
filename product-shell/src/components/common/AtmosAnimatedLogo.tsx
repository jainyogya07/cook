'use client';

// ============================================================================
// ATMOS 4D — NATIONAL & PLANETARY METEOROLOGICAL EMBLEM (ANIMATED SVG)
// "गगनात् भूमौ, ज्ञानात् समृद्धौ" • FROM SKIES TO SOIL, SCIENCE TO PROSPERITY
// Handcrafted Vector Engine: Rotating 24-spoke Chakra, orbital telemetry rings,
// swirling atmospheric streamlines, golden agronomy sheaves, 3D rotating globe,
// and radar sweep beam with live satellite telemetry pulse.
// ============================================================================

import React, { useState } from 'react';

export interface AtmosAnimatedLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  showBadge?: boolean;
  variant?: 'rich' | 'pure-svg' | 'minimal';
  glowColor?: 'gold' | 'cyan' | 'emerald';
  interactive?: boolean;
  subtitle?: string;
  onClick?: () => void;
}

export default function AtmosAnimatedLogo({
  size = 46,
  className = '',
  showText = false,
  showBadge = true,
  variant = 'rich',
  glowColor = 'gold',
  interactive = true,
  subtitle,
  onClick
}: AtmosAnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 24 Spokes for Ashoka Chakra (every 15 degrees)
  const chakraSpokes = Array.from({ length: 24 }, (_, i) => i * 15);
  // 32 Solar flare rays
  const solarRays = Array.from({ length: 32 }, (_, i) => i * 11.25);
  // 48 Coordinate ticks on outer ring
  const outerTicks = Array.from({ length: 48 }, (_, i) => i * 7.5);

  const glowRgba =
    glowColor === 'gold'
      ? 'rgba(212, 175, 55, 0.45)'
      : glowColor === 'cyan'
      ? 'rgba(6, 182, 212, 0.45)'
      : 'rgba(16, 185, 129, 0.45)';

  return (
    <div
      className={`atmos-logo-wrap ${interactive ? 'interactive' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size > 40 ? '12px' : '8px',
        cursor: onClick || interactive ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <div
        className="atmos-logo-symbol"
        style={{
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {/* Dynamic Ambient Glow Behind Logo */}
        <div
          className="atmos-logo-ambient-aura"
          style={{
            position: 'absolute',
            inset: '-15%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowRgba} 0%, rgba(56, 189, 248, 0.15) 45%, transparent 72%)`,
            filter: 'blur(10px)',
            opacity: isHovered ? 0.95 : 0.65,
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Master Animated SVG */}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className="atmos-svg-emblem"
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'visible',
            filter: isHovered ? 'drop-shadow(0 0 14px rgba(255, 215, 0, 0.6))' : 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))',
            transition: 'filter 0.3s ease',
          }}
        >
          <defs>
            {/* Rich Radial & Linear Gradients */}
            <radialGradient id="goldSphere" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF9D2" />
              <stop offset="25%" stopColor="#F5D77F" />
              <stop offset="65%" stopColor="#C8972E" />
              <stop offset="100%" stopColor="#543C0C" />
            </radialGradient>

            <linearGradient id="goldHoloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFECA8" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#996515" />
              <stop offset="100%" stopColor="#F3E5AB" />
            </linearGradient>

            <linearGradient id="atmosCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="streamlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="40%" stopColor="rgba(56, 189, 248, 0.9)" />
              <stop offset="70%" stopColor="rgba(253, 224, 71, 0.95)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </linearGradient>

            <radialGradient id="earthGlobeGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#67E8F9" />
              <stop offset="35%" stopColor="#0284C7" />
              <stop offset="75%" stopColor="#0C4A6E" />
              <stop offset="100%" stopColor="#021E36" />
            </radialGradient>

            <radialGradient id="earthAtmosphereHalo" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="transparent" />
              <stop offset="92%" stopColor="rgba(56, 189, 248, 0.45)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.85)" />
            </radialGradient>

            <linearGradient id="wheatGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#784E10" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Sweep radar mask */}
            <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.7)" />
              <stop offset="30%" stopColor="rgba(16, 185, 129, 0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Circular Clip for center artwork */}
            <clipPath id="emblemAperture">
              <circle cx="100" cy="100" r="82" />
            </clipPath>
          </defs>

          {/* 1. EMBLEM BACKDROP ARTWORK (When variant is 'rich') */}
          {variant === 'rich' && (
            <g clipPath="url(#emblemAperture)" opacity="0.94">
              <circle cx="100" cy="100" r="82" fill="#04070D" />
              <image
                href="/emblem.jpg"
                x="8"
                y="8"
                width="184"
                height="184"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  filter: isHovered ? 'contrast(1.12) saturate(1.2) brightness(1.08)' : 'contrast(1.06) saturate(1.05)',
                  transition: 'filter 0.4s ease',
                }}
              />
              {/* Dynamic Scanline Overlay */}
              <rect
                x="18"
                y="18"
                width="164"
                height="164"
                fill="none"
                stroke="url(#streamlineGrad)"
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          )}

          {/* 2. PURE SVG GEOMETRY MODE (When variant is 'pure-svg' or backdrop disabled) */}
          {variant === 'pure-svg' && (
            <g id="pureSvgArtwork">
              {/* Dark Cosmic Core Shield */}
              <circle cx="100" cy="100" r="82" fill="#050811" stroke="url(#goldHoloGrad)" strokeWidth="2.5" />
              <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Sun Flare Rays (Solar Radiance) */}
              <g
                className="atmos-solar-rays"
                style={{
                  transformOrigin: '100px 75px',
                  animation: `atmosPulseRays ${isHovered ? '2.5s' : '4s'} ease-in-out infinite`,
                }}
              >
                {solarRays.map((deg, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="75"
                    x2={100 + Math.cos((deg * Math.PI) / 180) * (i % 2 === 0 ? 55 : 44)}
                    y2={75 + Math.sin((deg * Math.PI) / 180) * (i % 2 === 0 ? 55 : 44)}
                    stroke="url(#goldHoloGrad)"
                    strokeWidth={i % 2 === 0 ? '1.8' : '1'}
                    opacity={i % 2 === 0 ? 0.6 : 0.35}
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Swirling Atmospheric Cloud & Wind Vectors */}
              <g className="atmos-vector-currents" opacity="0.85">
                <path
                  d="M 45 65 C 55 45, 80 50, 95 62 C 105 70, 115 65, 125 58 C 140 48, 160 55, 155 75"
                  fill="none"
                  stroke="url(#atmosCyanGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className="atmos-streamline-fast"
                />
                <path
                  d="M 38 80 C 50 68, 75 75, 85 85 C 95 95, 110 92, 120 84 C 135 72, 155 80, 162 90"
                  fill="none"
                  stroke="url(#streamlineGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  className="atmos-streamline-mid"
                />
              </g>

              {/* Agronomic Golden Wheat Ears (Left & Right Flanking) */}
              <g id="wheatSheaves">
                {/* Left Ear */}
                <path d="M 40 145 Q 32 105 52 82" fill="none" stroke="url(#wheatGrad)" strokeWidth="2" />
                {[88, 102, 116, 130].map((y, i) => (
                  <ellipse
                    key={`wl-${i}`}
                    cx={36 + i * 2}
                    cy={y}
                    rx="5"
                    ry="2.5"
                    transform={`rotate(-35 ${36 + i * 2} ${y})`}
                    fill="url(#wheatGrad)"
                  />
                ))}
                {/* Right Ear */}
                <path d="M 160 145 Q 168 105 148 82" fill="none" stroke="url(#wheatGrad)" strokeWidth="2" />
                {[88, 102, 116, 130].map((y, i) => (
                  <ellipse
                    key={`wr-${i}`}
                    cx={164 - i * 2}
                    cy={y}
                    rx="5"
                    ry="2.5"
                    transform={`rotate(35 ${164 - i * 2} ${y})`}
                    fill="url(#wheatGrad)"
                  />
                ))}
              </g>

              {/* Lower Terrestrial 4D Earth Globe */}
              <g id="terrestrialGlobe" transform="translate(0, 10)">
                <circle cx="100" cy="132" r="26" fill="url(#earthGlobeGrad)" />
                <circle cx="100" cy="132" r="26" fill="url(#earthAtmosphereHalo)" />
                {/* Rotating Latitude/Longitude Grid Lines */}
                <ellipse cx="100" cy="132" rx="26" ry="11" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <ellipse
                  cx="100"
                  cy="132"
                  rx="14"
                  ry="26"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.8"
                  className="atmos-globe-meridian"
                />
                {/* India / Continental Silhouette Accent */}
                <path
                  d="M 97 122 Q 102 124 105 128 Q 102 135 99 138 Q 96 134 96 128 Z"
                  fill="#F59E0B"
                  opacity="0.85"
                />
              </g>

              {/* Central Lion Capital / Crown Peak Silhouette */}
              <g id="crestCrown" transform="translate(100, 32)">
                <path
                  d="M -14 0 L -12 -12 L -6 -8 L 0 -14 L 6 -8 L 12 -12 L 14 0 Z"
                  fill="url(#goldHoloGrad)"
                  stroke="#FFDF78"
                  strokeWidth="0.8"
                />
                <circle cx="0" cy="-14" r="1.8" fill="#FFF" />
              </g>
            </g>
          )}

          {/* 3. DYNAMIC ROTATING 24-SPOKE ASHOKA CHAKRA (High-Tech Vector Overlay) */}
          <g
            className="atmos-ashoka-chakra"
            style={{
              transformOrigin: '100px 75px',
              animation: `atmosChakraRotate ${isHovered ? '4s' : '18s'} linear infinite`,
            }}
          >
            {/* Outer Chakra Ring */}
            <circle
              cx="100"
              cy="75"
              r="24"
              fill="none"
              stroke="url(#goldHoloGrad)"
              strokeWidth="2.2"
              filter="url(#svgGlow)"
            />
            <circle cx="100" cy="75" r="21" fill="none" stroke="rgba(255, 223, 120, 0.45)" strokeWidth="0.8" />

            {/* 24 Spokes */}
            {chakraSpokes.map((deg) => (
              <line
                key={`spoke-${deg}`}
                x1="100"
                y1="75"
                x2={100 + Math.cos((deg * Math.PI) / 180) * 21}
                y2={75 + Math.sin((deg * Math.PI) / 180) * 21}
                stroke="#FFE58F"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            ))}

            {/* Central Diamond Hub */}
            <circle cx="100" cy="75" r="4.5" fill="url(#goldSphere)" stroke="#FFF" strokeWidth="0.8" />
            <circle cx="100" cy="75" r="1.8" fill="#1E293B" />
          </g>

          {/* 4. HIGH-TECH 360° RADAR SWEEP LINE */}
          <g
            className="atmos-radar-sweep-beam"
            style={{
              transformOrigin: '100px 100px',
              animation: `atmosRadarSweep ${isHovered ? '2.8s' : '5.5s'} linear infinite`,
              pointerEvents: 'none',
            }}
          >
            <path
              d="M 100 100 L 100 18 A 82 82 0 0 1 158 42 Z"
              fill="url(#radarSweepGradient)"
              opacity={isHovered ? 0.45 : 0.22}
            />
            <line x1="100" y1="100" x2="100" y2="18" stroke="#34D399" strokeWidth="1.5" opacity="0.85" />
          </g>

          {/* 5. DYNAMIC ORBITAL COORDINATE RINGS (Opposing Gyroscopic Rotations) */}
          {/* Ring 1: Clockwise Telemetry Ticks */}
          <g
            className="atmos-orbit-ticks"
            style={{
              transformOrigin: '100px 100px',
              animation: `atmosOrbitRotateCW 42s linear infinite`,
            }}
          >
            <circle
              cx="100"
              cy="100"
              r="89"
              fill="none"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="4 6 12 6"
            />
            {outerTicks.map((deg, i) => (
              <line
                key={`tick-${i}`}
                x1={100 + Math.cos((deg * Math.PI) / 180) * 88}
                y1={100 + Math.sin((deg * Math.PI) / 180) * 88}
                x2={100 + Math.cos((deg * Math.PI) / 180) * (i % 6 === 0 ? 94 : 91)}
                y2={100 + Math.sin((deg * Math.PI) / 180) * (i % 6 === 0 ? 94 : 91)}
                stroke={i % 6 === 0 ? '#FFECA8' : 'rgba(212, 175, 55, 0.5)'}
                strokeWidth={i % 6 === 0 ? '1.5' : '0.8'}
              />
            ))}
          </g>

          {/* Ring 2: Counter-Clockwise Atmospheric Ring */}
          <g
            className="atmos-orbit-data"
            style={{
              transformOrigin: '100px 100px',
              animation: `atmosOrbitRotateCCW 28s linear infinite`,
            }}
          >
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="1"
              strokeDasharray="8 14 2 14"
            />
            {/* 4 Cardinal Sensor Nodes */}
            {[0, 90, 180, 270].map((deg, idx) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <g key={`sensor-${idx}`}>
                  <circle
                    cx={100 + Math.cos(rad) * 95}
                    cy={100 + Math.sin(rad) * 95}
                    r="2.8"
                    fill="#38BDF8"
                    stroke="#FFF"
                    strokeWidth="0.8"
                    filter="url(#svgGlow)"
                  />
                </g>
              );
            })}
          </g>

          {/* 6. ORBITING SATELLITE TELEMETRY BEACON */}
          <g
            className="atmos-satellite-beacon"
            style={{
              transformOrigin: '100px 100px',
              animation: `atmosOrbitRotateCW ${isHovered ? '4.5s' : '10s'} linear infinite`,
            }}
          >
            <g transform="translate(100, 4)">
              {/* Satellite Antenna array */}
              <circle cx="0" cy="0" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="none"
                stroke="#10B981"
                strokeWidth="1"
                opacity="0.8"
                className="atmos-ping-ring"
              />
              <line x1="-5" y1="0" x2="-2" y2="0" stroke="#FFF" strokeWidth="1" />
              <line x1="2" y1="0" x2="5" y2="0" stroke="#FFF" strokeWidth="1" />
            </g>
          </g>
        </svg>

        {/* Live Satellite Uplink Beacon Pill (Corner Badge) */}
        {showBadge && (
          <div
            className="atmos-logo-live-indicator"
            style={{
              position: 'absolute',
              bottom: size > 40 ? '2px' : '0px',
              right: size > 40 ? '2px' : '0px',
              width: size > 40 ? '10px' : '8px',
              height: size > 40 ? '10px' : '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 10px #10B981, 0 0 20px rgba(16, 185, 129, 0.6)',
              border: '2px solid #05070B',
              zIndex: 3,
            }}
            title="ATMOS 4D Ensemble Telemetry Live"
          />
        )}
      </div>

      {/* Brand Typography (Optional side text for header / banner) */}
      {showText && (
        <div
          className="atmos-logo-text-block"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1.1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: size > 44 ? '17px' : '15px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5E6B3 55%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 223, 120, 0.4))' : 'none',
                transition: 'filter 0.3s ease',
              }}
            >
              ATMOS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: size > 44 ? '13px' : '11px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '6px',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: '#F5D77F',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                letterSpacing: '0.08em',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
              }}
            >
              4D
            </span>
          </div>

          <div
            style={{
              marginTop: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontSize: '9.5px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.12em',
                color: '#94A3B8',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {subtitle || 'गगनात् भूमौ · 18 Engines'}
            </span>
          </div>
        </div>
      )}

      {/* Embedded CSS Keyframes for Superb Performance & Zero-Dependency Portability */}
      <style jsx>{`
        @keyframes atmosChakraRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes atmosRadarSweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes atmosOrbitRotateCW {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes atmosOrbitRotateCCW {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes atmosPulseRays {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.97);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.03);
          }
        }
        @keyframes atmosPingRing {
          0% {
            r: 3.5;
            opacity: 1;
          }
          100% {
            r: 12;
            opacity: 0;
          }
        }
        .atmos-ping-ring {
          animation: atmosPingRing 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .atmos-streamline-fast {
          animation: atmosDashFlow 2.8s linear infinite;
        }
        .atmos-streamline-mid {
          animation: atmosDashFlow 4.5s linear infinite reverse;
        }
        @keyframes atmosDashFlow {
          to {
            stroke-dashoffset: -40;
          }
        }
        .atmos-globe-meridian {
          animation: atmosGlobeMeridian 6s ease-in-out infinite alternate;
          transform-origin: 100px 132px;
        }
        @keyframes atmosGlobeMeridian {
          0% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.2);
          }
          100% {
            transform: scaleX(-1);
          }
        }
        .atmos-logo-wrap.interactive:hover .atmos-svg-emblem {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
