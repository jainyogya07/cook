'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Subscription & Planetary Plan Tier View (Ultra-Luxury Glass)
// Academic Open Science, Atmos Pro, and Sovereign Planetary Command tiers.
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Zap,
  Shield,
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Activity,
  Globe
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';

export default function SubscriptionView() {
  const { showToast, setActiveNav, accessPlan, locale, setAccessPlan } = useShellStore();
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      id: 'academic',
      name: 'Open Science',
      badge: 'Academic Tier',
      priceMonthly: '₹0',
      priceAnnual: '₹0',
      period: 'forever free',
      desc: 'Ideal for academic researchers, agronomy students, and public weather monitoring.',
      features: [
        '5 km nominal downscaling resolution',
        '24-Hour forecast lead horizon',
        'Standard IMD & MoES disaster bulletins',
        'ERA5 & GPM historical daily reanalysis archive',
        'Standard Community API (60 req/min)',
        'Public model catalog inspection'
      ],
      isPopular: false,
      ctaLabel: 'Current Plan',
      isCurrent: false
    },
    {
      id: 'pro',
      name: 'Atmos Pro',
      badge: 'Most Popular',
      priceMonthly: '₹4,999',
      priceAnnual: '₹3,999',
      period: 'per month',
      desc: 'For FPOs, commodity mandi traders, agro-chemical advisors, and regional emergency cells.',
      features: [
        '1 km super-resolution neural downscaling',
        '72-Hour to 10-Day probabilistic forecast horizon',
        'Real-time APMC Mandi arrival elasticity & price shock warnings',
        'Coupled Module 10–14: Phenology clock, yellow rust, lodging risk',
        'Uncapped WebSocket & SSE Real-Time Event Stream',
        'Custom GeoJSON, NetCDF4, and Zarr dataset exports',
        'Priority GPU Inference Queue (<120ms latency)'
      ],
      isPopular: true,
      ctaLabel: 'Upgrade to Atmos Pro ✦',
      isCurrent: false
    },
    {
      id: 'enterprise',
      name: 'Sovereign Command',
      badge: 'Government & Enterprise',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      period: 'annual sovereign license',
      desc: 'Dedicated national infrastructure for state disaster authorities, defense, and power grid operators.',
      features: [
        'Sub-kilometer Doppler radar assimilation (DWR network)',
        'Complete 18-Engine microservice cascade deployment',
        'Dedicated GPU nodes with CUDA JIT execution (<80ms)',
        'Custom river basin hydrology & dam reservoir flood dispatch',
        'Air-gapped on-premise sovereign cloud installation',
        '24/7 Meteorologist-backed operational SLA',
        'Zero vendor lock-in, pure real-time biophysical telemetry'
      ],
      isPopular: false,
      ctaLabel: 'Contact Mission Command →',
      isCurrent: false
    }
  ];

  return (
    <main className="x-center-feed" style={{ padding: '24px' }}>
      {/* 1. Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '16px auto 32px auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '9999px', backgroundColor: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', marginBottom: '16px' }}>
          <Sparkles style={{ width: '14px', height: '14px', color: '#E6C65C' }} />
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#E6C65C', letterSpacing: '0.04em' }}>
            {locale === 'hi' ? 'ATMOS 4D प्लान' : 'ATMOS 4D TIERS'}
          </span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-0)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {locale === 'hi' ? 'जो काम चाहिए, वही प्लान लें' : 'Pick the plan that matches the work'}
        </h1>

        <p style={{ marginTop: '12px', fontSize: '15px', color: 'var(--text-1)', lineHeight: 1.6 }}>
          {locale === 'hi'
            ? 'फ्री पर पूछना और पहले 6 इंजन। Pro पर PDF रिपोर्ट, गाँव नक्शा और मंडी इंजन।'
            : 'Free includes asking and the first 6 engines. Pro unlocks PDF reports, village maps, and mandi engines.'}
        </p>

        {/* Monthly / Annual Toggle */}
        <div style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '4px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--stroke)' }}>
          <button
            onClick={() => setAnnualBilling(false)}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: !annualBilling ? 700 : 500,
              backgroundColor: !annualBilling ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: !annualBilling ? '#FFFFFF' : 'var(--text-2)',
              cursor: 'pointer'
            }}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: annualBilling ? 700 : 500,
              backgroundColor: annualBilling ? '#FFFFFF' : 'transparent',
              color: annualBilling ? '#050506' : 'var(--text-2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <span>Annual Billing</span>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '9999px', backgroundColor: annualBilling ? '#10B981' : 'rgba(16,185,129,0.2)', color: '#FFFFFF' }}>
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* 2. 3-Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {plans.map((p) => {
          const price = annualBilling ? p.priceAnnual : p.priceMonthly;
          const isCurrent = (p.id === 'academic' && (accessPlan === 'free' || accessPlan === 'guest')) || (p.id === 'pro' && accessPlan === 'pro');

          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="glass"
              style={{
                padding: '28px 24px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: p.isPopular ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--stroke)',
                boxShadow: p.isPopular ? '0 12px 40px rgba(56, 189, 248, 0.15), var(--shadow-glass)' : 'var(--shadow-glass)'
              }}
            >
              {p.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#38BDF8',
                    color: '#050506',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.4)'
                  }}
                >
                  RECOMMENDED
                </div>
              )}

              {/* Plan Title & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-0)', margin: 0 }}>
                  {p.name}
                </h3>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: p.isPopular ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    color: p.isPopular ? '#38BDF8' : 'var(--text-1)'
                  }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Price Row */}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '32px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-0)' }}>
                  {price}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>
                  /{p.period}
                </span>
              </div>

              <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-1)', lineHeight: 1.5, minHeight: '40px' }}>
                {p.desc}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'var(--stroke)', margin: '20px 0' }} />

              {/* Features List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-2)' }}>
                  Included Capabilities:
                </div>
                {p.features.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-1)', lineHeight: 1.45 }}>
                    <div style={{ marginTop: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: p.isPopular ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check style={{ width: '10px', height: '10px', color: p.isPopular ? '#38BDF8' : '#FFFFFF' }} />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '28px' }}>
                <button
                  onClick={() => {
                    if (isCurrent) {
                      showToast(locale === 'hi' ? 'आप इसी प्लान पर हैं' : 'You are on this plan', 'info');
                    } else if (p.id === 'pro') {
                      setAccessPlan('pro');
                      showToast(locale === 'hi' ? 'Atmos Pro इस सेशन में सक्रिय: PDF, M07–M18, मंडी झटका' : 'Atmos Pro is active in this session: PDF, M07–M18, mandi shock', 'success');
                    } else {
                      showToast(locale === 'hi' ? 'एंटरप्राइज़ डेमो टीम को भेजा' : 'Enterprise liaison notified', 'info');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '13px 20px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: p.isPopular ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                    color: p.isPopular ? '#050506' : '#FFFFFF',
                    border: p.isPopular ? 'none' : '1px solid var(--stroke)',
                    boxShadow: p.isPopular ? '0 10px 30px -10px rgba(255, 255, 255, 0.5)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isCurrent ? 'Current plan' : p.ctaLabel}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="nv-page" style={{ paddingTop: 8, maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 18, margin: '8px 0 12px' }}>{locale === 'hi' ? 'Pro पर क्या खुलता है' : 'What Pro unlocks'}</h2>
        <div className="nv-catalog">
          {[
            { t: locale === 'hi' ? 'पूरे 18 इंजन' : 'All 18 engines', d: locale === 'hi' ? 'M07 गाँव नक्शा से M18 मंडी झटका तक। फ्री पर पहले 6।' : 'Village map through mandi shock. Free keeps the first 6.' },
            { t: locale === 'hi' ? 'PDF रिपोर्ट' : 'PDF reports', d: locale === 'hi' ? 'किसान/FPO के लिए काला-सफेद प्रिंट, नीले लिंक नहीं।' : 'Farmer/FPO print pack, black on white — not blue links.' },
            { t: locale === 'hi' ? 'मंडी झटका' : 'Mandi shock', d: locale === 'hi' ? 'बारिश/आवक के साथ भाव परिदृश्य — पक्का भाव नहीं।' : 'Rain/arrival vs price scenario — not a guaranteed quote.' },
            { t: locale === 'hi' ? 'पहले जवाब' : 'Priority answers', d: locale === 'hi' ? 'चैट इतिहास, अपलोड, और मॉडल कार्ड से जुड़ा जवाब।' : 'Saved chats, uploads, and answers that know the model cards.' }
          ].map((card) => (
            <div key={card.t} className="nv-card">
              <strong>{card.t}</strong>
              <p style={{ marginTop: 8 }}>{card.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Provenance & Security Trust Banner */}
      <div style={{ marginTop: '40px', padding: '20px 24px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--stroke)', maxWidth: '1100px', margin: '40px auto 16px auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Shield style={{ width: '24px', height: '24px', color: '#10B981' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-0)' }}>
              Open Science Grounding & Ministry Compliance
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '2px' }}>
              Built according to MoES Problem Statement 26078 standards with zero arbitrary heuristic thresholding.
            </div>
          </div>
        </div>
        <button
          onClick={() => setActiveNav('ai')}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#38BDF8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            cursor: 'pointer'
          }}
        >
          Return to Mission Feed →
        </button>
      </div>
    </main>
  );
}
