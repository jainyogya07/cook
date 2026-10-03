'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Animated Routing Pipeline Tracker (In-Feed Multi-Module Cascade Visualization)
// Shows real-time module-by-module resolution during query processing
// ============================================================================

import React from 'react';
import { CheckCircle2, Loader2, Circle, Cpu, Zap, ArrowRight } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';

export default function RoutingPipelineTracker() {
  const { routingPipeline, openModuleWorkspace, clearPipeline } = useShellStore();

  if (!routingPipeline.isActive && routingPipeline.steps.length === 0) return null;

  const allResolved = routingPipeline.steps.every((s) => s.status === 'RESOLVED');
  const elapsedMs = routingPipeline.completedAt && routingPipeline.startedAt
    ? routingPipeline.completedAt - routingPipeline.startedAt
    : null;

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      padding: '14px 16px',
      backgroundColor: 'rgba(24, 169, 232, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(24,169,232,0.15), rgba(54,197,255,0.1))',
            border: '1px solid rgba(24,169,232,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {routingPipeline.isActive ? (
              <Loader2 style={{ width: '14px', height: '14px', color: '#36C5FF', animation: 'spin 1s linear infinite' }} />
            ) : (
              <Zap style={{ width: '14px', height: '14px', color: '#36C5FF' }} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {routingPipeline.isActive ? 'ORCHESTRATING MODULE CASCADE' : 'CASCADE RESOLVED'}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {routingPipeline.steps.length} engines • {routingPipeline.queryId}
              {elapsedMs && ` • ${elapsedMs}ms`}
            </div>
          </div>
        </div>

        {allResolved && (
          <button
            onClick={clearPipeline}
            style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 600,
              color: 'var(--text-muted)', padding: '4px 10px', borderRadius: '9999px',
              border: '1px solid var(--border)'
            }}
          >
            Dismiss
          </button>
        )}
      </div>

      {/* Pipeline Steps (Horizontal Scrolling Chain) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        overflowX: 'auto', paddingBottom: '4px'
      }}>
        {routingPipeline.steps.map((step, idx) => {
          const isExecuting = step.status === 'EXECUTING';
          const isResolved = step.status === 'RESOLVED';
          const isLast = idx === routingPipeline.steps.length - 1;

          return (
            <React.Fragment key={step.moduleNumber}>
              <button
                onClick={() => {
                  if (isResolved) {
                    openModuleWorkspace(step.moduleNumber, step.port, step.moduleName);
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 10px', borderRadius: '10px',
                  backgroundColor: isExecuting
                    ? 'rgba(24,169,232,0.12)'
                    : isResolved
                      ? 'rgba(16,185,129,0.08)'
                      : 'var(--surface)',
                  border: `1px solid ${isExecuting ? 'rgba(24,169,232,0.35)' : isResolved ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`,
                  cursor: isResolved ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                {isExecuting ? (
                  <Loader2 style={{ width: '12px', height: '12px', color: '#36C5FF', animation: 'spin 1s linear infinite' }} />
                ) : isResolved ? (
                  <CheckCircle2 style={{ width: '12px', height: '12px', color: '#10b981' }} />
                ) : (
                  <Circle style={{ width: '12px', height: '12px', color: 'var(--text-muted)' }} />
                )}
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: isExecuting ? '#36C5FF' : isResolved ? '#10b981' : 'var(--text-muted)'
                }}>
                  M{step.moduleNumber}
                </span>
                {isResolved && step.metricOutput && (
                  <span style={{
                    fontSize: '9px', fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)', marginLeft: '2px'
                  }}>
                    {step.metricOutput}
                  </span>
                )}
              </button>

              {!isLast && (
                <ArrowRight style={{
                  width: '10px', height: '10px', flexShrink: 0,
                  color: isResolved ? 'rgba(16,185,129,0.5)' : 'var(--text-muted)',
                  opacity: 0.6
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
