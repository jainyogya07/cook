'use client';

import React from 'react';
import { LockKeyhole, Sparkles } from 'lucide-react';
import { t } from '@/i18n/copy';
import { useShellStore } from '@/services/useShellStore';

interface FeatureLockProps {
  need?: 'signin' | 'pro';
  children: React.ReactNode;
  compact?: boolean;
}

export default function FeatureLock({ need = 'signin', children, compact }: FeatureLockProps) {
  const { accessPlan, locale, setActiveNav } = useShellStore();
  const locked = need === 'pro' ? accessPlan !== 'pro' : accessPlan === 'guest';
  if (!locked) return <>{children}</>;

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ filter: 'blur(7px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.55 }}>{children}</div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, rgba(5,7,11,.35), rgba(5,7,11,.72))',
          borderRadius: 18
        }}
      >
        <button
          onClick={() => {
            if (need === 'pro' && accessPlan !== 'guest') {
              setActiveNav('subscription');
              return;
            }
            window.dispatchEvent(new CustomEvent('atmos-open-auth'));
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: compact ? '12px 16px' : '16px 22px',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,.16)',
            background: 'rgba(8,10,16,.86)',
            color: '#F8FAFC',
            maxWidth: 280,
            textAlign: 'center'
          }}
        >
          {need === 'pro' ? <Sparkles size={18} color="#E6C65C" /> : <LockKeyhole size={18} />}
          <strong style={{ fontSize: 14 }}>{need === 'pro' ? t(locale, 'premiumTitle') : t(locale, 'lockTitle')}</strong>
          {!compact && (
            <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.45 }}>
              {need === 'pro' ? t(locale, 'premiumBody') : t(locale, 'lockBody')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
