'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Toast Notification (Ephemeral Bottom-Right Feedback Toasts)
// ============================================================================

import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';

export default function ToastNotification() {
  const { activeToast, clearToast } = useShellStore();

  if (!activeToast) return null;

  const iconMap = {
    success: <CheckCircle2 style={{ width: '16px', height: '16px', color: '#10b981' }} />,
    info: <Info style={{ width: '16px', height: '16px', color: '#36C5FF' }} />,
    warning: <AlertTriangle style={{ width: '16px', height: '16px', color: '#f59e0b' }} />,
    error: <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />
  };

  const borderColorMap = {
    success: 'rgba(16,185,129,0.3)',
    info: 'rgba(54,197,255,0.3)',
    warning: 'rgba(245,158,11,0.3)',
    error: 'rgba(239,68,68,0.3)'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: '10px 16px',
        borderRadius: '12px',
        backgroundColor: 'var(--surface-elevated)',
        border: `1px solid ${borderColorMap[activeToast.type]}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '440px',
        animation: 'toastSlideUp 0.3s ease-out',
        backdropFilter: 'blur(12px)'
      }}
    >
      {iconMap[activeToast.type]}

      <span style={{
        fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)',
        flex: 1, lineHeight: 1.3
      }}>
        {activeToast.message}
      </span>

      <button
        onClick={clearToast}
        style={{ padding: '4px', color: 'var(--text-muted)', borderRadius: '6px', flexShrink: 0 }}
      >
        <X style={{ width: '14px', height: '14px' }} />
      </button>
    </div>
  );
}
