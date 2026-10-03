'use client';

// ============================================================================
// ATMOS 4D — SECURE MISSION ACCESS INITIALIZATION
// Ultra-luxury defense/aerospace startup sequence with animated SVG logo,
// rotating orbital telemetry radar, and live initialization telemetry.
// ============================================================================

import React, { useEffect, useState } from 'react';
import AtmosAnimatedLogo from '@/components/common/AtmosAnimatedLogo';
import AtmosphericBackgroundCanvas from '@/components/canvas/BackgroundCanvas';

export default function AuthLoadingScreen() {
  const [telemetryStep, setTelemetryStep] = useState(0);

  const steps = [
    'CONNECTING TO 4D ATMOSPHERIC TELEMETRY MESH…',
    'VERIFYING CRYPTOGRAPHIC OPERATOR CREDENTIALS…',
    'SYNCHRONIZING 18 COUPLED NWP & ENSEMBLE ENGINES…',
    'INITIALIZING PLANETARY TO PARCEL DATA STREAMS…',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryStep((prev) => (prev + 1) % steps.length);
    }, 450);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div
      className="auth-loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#030508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        overflow: 'hidden',
        color: '#E2E8F0',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      <AtmosphericBackgroundCanvas />

      {/* Radial Atmospheric Lighting */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Glass Pod */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 48px',
          borderRadius: '24px',
          background: 'rgba(7, 10, 19, 0.75)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.12)',
          maxWidth: '460px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        {/* Animated SVG Logo */}
        <AtmosAnimatedLogo size={84} glowColor="gold" variant="rich" interactive={false} />

        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #FFF 0%, #F5D77F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ATMOS 4D INTELLIGENCE
          </div>
          <div
            style={{
              fontSize: '10px',
              color: '#94A3B8',
              letterSpacing: '0.18em',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            गगनात् भूमौ, ज्ञानात् समृद्धौ
          </div>
        </div>

        {/* High-Tech Animated Progress Track */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            marginTop: '28px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '45%',
              background: 'linear-gradient(90deg, transparent, #D4AF37, #38BDF8, transparent)',
              borderRadius: '999px',
              animation: 'authLoadStream 1.4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Dynamic Telemetry Status */}
        <div
          style={{
            marginTop: '16px',
            fontSize: '10.5px',
            color: '#38BDF8',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
              animation: 'authDotPing 1s ease-in-out infinite alternate',
            }}
          />
          <span>{steps[telemetryStep]}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes authLoadStream {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(350%);
          }
        }
        @keyframes authDotPing {
          from {
            opacity: 0.4;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
