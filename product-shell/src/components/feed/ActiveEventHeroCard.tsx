'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Active Event Hero Card (Real-Time Hazard Beacon)
// Pure Vanilla CSS with direct CSS variables and inline styles
// ============================================================================

import React from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Activity,
  Layers,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { ACTIVE_LIVE_EVENTS } from '@/data/mockFeedData';

export default function ActiveEventHeroCard() {
  const { openModuleWorkspace } = useShellStore();
  const event = ACTIVE_LIVE_EVENTS[0]; // Bay of Bengal Deep Depression

  return (
    <div style={{
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(90deg, #07111F 0%, rgba(11, 40, 69, 0.4) 50%, #07111F 100%)',
      userSelect: 'none'
    }}>
      <div style={{
        padding: '14px',
        borderRadius: '16px',
        border: '1px solid rgba(24, 169, 232, 0.3)',
        backgroundColor: 'rgba(11, 23, 40, 0.85)',
        boxShadow: '0 8px 24px rgba(7, 17, 31, 0.6)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow indicator */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(24,169,232,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontWeight: 700
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '9999px',
                backgroundColor: '#ef4444'
              }} />
              {event.severity} LIVE HAZARD
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--blue-bright)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock style={{ width: '12px', height: '12px' }} />
              {event.leadHorizon}
            </span>
          </div>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(15, 30, 50, 0.8)',
            border: '1px solid var(--border)'
          }}>
            {event.probabilityPct}% Probability
          </span>
        </div>

        {/* Title & Region */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {event.name}
          </h3>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '2px',
            fontFamily: 'var(--font-mono)'
          }}>
            <MapPin style={{ width: '13px', height: '13px', color: 'var(--blue-bright)' }} />
            <span>{event.region}</span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span style={{ color: 'var(--amber-anomaly)' }}>{event.hazardType}</span>
          </div>
        </div>

        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '12px'
        }}>
          {event.briefSummary}
        </p>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px solid rgba(110, 170, 220, 0.12)'
        }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Coupled to Engine {event.targetModuleNumber} (Probability Field Engine)
          </div>
          <button
            onClick={() =>
              openModuleWorkspace(
                event.targetModuleNumber,
                event.targetPort,
                event.name,
                'Atmospheric Physics'
              )
            }
            style={{
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--blue)',
              color: '#07111F',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(24, 169, 232, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Inspect 3D Event</span>
            <ArrowUpRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
