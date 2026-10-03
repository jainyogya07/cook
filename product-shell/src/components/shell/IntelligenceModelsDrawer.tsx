'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Grouped Intelligence Models Drawer (Grouped Tools, Not 18 Sidebar Buttons)
// 4 Macro-Categories: Atmosphere • Downscaling • Agriculture • Market & Policy
// Pure Vanilla CSS with inline styles and design tokens
// ============================================================================

import React, { useState } from 'react';
import {
  X,
  Layers,
  BookOpen,
  ArrowUpRight,
  Activity,
  CloudRain,
  Sprout,
  Store,
  Waves,
  Play
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { GROUPED_MODEL_CATEGORIES } from '@/data/mockFeedData';
import { ENGINE_FIELD_GUIDE } from '@/data/engineFieldGuide';

export default function IntelligenceModelsDrawer() {
  const {
    modelsDrawerOpen,
    setModelsDrawerOpen,
    setFieldGuideOpen,
    openModuleWorkspace
  } = useShellStore();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  if (!modelsDrawerOpen) return null;

  const currentCategory = GROUPED_MODEL_CATEGORIES[activeCategoryIndex];

  const categoryIcons = [CloudRain, Waves, Sprout, Store];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2vw, 24px)',
        userSelect: 'none'
      }}
      onClick={() => setModelsDrawerOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#0B1728',
          border: '1px solid rgba(110, 170, 220, 0.22)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1220px',
          maxHeight: 'min(92dvh, 980px)',
          minHeight: 'min(560px, 92dvh)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.78), 0 0 0 1px rgba(54,197,255,.06), 0 0 70px rgba(80, 68, 220, .12)',
          color: '#F4F8FC'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
            padding: '18px clamp(16px, 3vw, 30px)',
          borderBottom: '1px solid rgba(110, 170, 220, 0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
            background: 'linear-gradient(110deg, rgba(12,30,51,.98), rgba(22,16,47,.96) 56%, rgba(7,17,31,.98))'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '9999px',
              border: '1.5px solid rgba(212, 175, 55, 0.65)',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: '#05070B',
              flexShrink: 0
            }}>
              <img
                src="/emblem.jpg"
                alt="Bharatiya Mausam Emblem"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.18)' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: 'clamp(13px, 1.5vw, 18px)', fontWeight: 800, color: '#F4F8FC', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', lineHeight: 1.25 }}>
                  SCIENTIFIC INTELLIGENCE CATALOG // 18 ENGINES
                </h3>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'rgba(24, 169, 232, 0.12)',
                  color: '#36C5FF',
                  border: '1px solid rgba(24, 169, 232, 0.3)'
                }}>
                  <Activity style={{ width: 11, height: 11 }} /> LIVE CATALOG
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#A8BCD0', marginTop: '5px' }}>
                Field guide to coupled engines · live routing · realtime inference
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setFieldGuideOpen(true)}
              className="guide-header-btn"
              title="Open operator field guide"
            >
              <BookOpen style={{ width: 14, height: 14 }} />
              Guidebook
            </button>
            <button
              onClick={() => setModelsDrawerOpen(false)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                color: '#9BAFC3',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(110, 170, 220, 0.14)',
          backgroundColor: 'rgba(7, 17, 31, 0.5)',
          overflowX: 'auto',
          padding: '10px clamp(12px, 2vw, 24px)',
          gap: '8px',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)'
        }}>
          {GROUPED_MODEL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.categoryName}
              onClick={() => setActiveCategoryIndex(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                backgroundColor: idx === activeCategoryIndex ? '#13253B' : 'transparent',
                color: idx === activeCategoryIndex ? '#F4F8FC' : '#9BAFC3',
                fontWeight: idx === activeCategoryIndex ? 700 : 400,
                border: idx === activeCategoryIndex ? '1px solid rgba(110, 170, 220, 0.3)' : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {React.createElement(categoryIcons[idx % categoryIcons.length], { style: { width: 14, height: 14, color: cat.colorHex } })}
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: cat.colorHex
                  }}
                />
                <span>{cat.categoryName.split('&')[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Models Grid for Active Category */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 'clamp(16px, 2.5vw, 30px)', scrollbarWidth: 'thin', scrollbarColor: 'rgba(54,197,255,.42) transparent' }}>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#F4F8FC', fontFamily: 'var(--font-mono)' }}>
              {currentCategory.categoryName}
            </h4>
            <p style={{ fontSize: '12px', color: '#9BAFC3', marginTop: '2px' }}>
              {currentCategory.description}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            gap: '14px'
          }}>
            {currentCategory.models.map((mod) => (
              <div
                key={mod.moduleNumber}
                className={`catalog-card engine-sig engine-sig-${mod.moduleNumber}`}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(110, 170, 220, 0.15)',
                  backgroundColor: 'rgba(7, 17, 31, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.22s ease',
                  ['--catalog-accent' as string]: currentCategory.colorHex,
                  animationDelay: `${(mod.moduleNumber % 6) * 45}ms`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: currentCategory.colorHex }}>
                      <span className="signal-pulse" style={{ width: 7, height: 7, borderRadius: 99, backgroundColor: '#27D69A', boxShadow: '0 0 12px #27D69A' }} />
                      M{mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : mod.moduleNumber} · LIVE
                    </span>
                    <span title={`Port ${mod.port}`} aria-label={`Port ${mod.port}`} style={{
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: '#0B1728',
                      color: '#9BAFC3',
                      border: '1px solid rgba(110, 170, 220, 0.15)'
                    }}>
                      ↗ :{mod.port}
                    </span>
                  </div>

                  <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#F4F8FC', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span aria-hidden>{ENGINE_FIELD_GUIDE.find((entry) => entry.moduleNumber === mod.moduleNumber)?.symbol || '⊕'}</span>
                    {mod.title}
                  </h5>
                  <p style={{ fontSize: '12px', color: '#9BAFC3', marginTop: '4px', lineHeight: 1.4 }}>
                    {mod.shortDescription}
                  </p>
                  <p style={{ fontSize: '11px', color: '#7dd3fc', marginTop: '8px', lineHeight: 1.4 }}>
                    Input: {ENGINE_FIELD_GUIDE.find((entry) => entry.moduleNumber === mod.moduleNumber)?.need}
                  </p>
                </div>

                <div style={{
                  marginTop: '14px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(110, 170, 220, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#61768B' }}>
                    {mod.keyMetric}
                  </span>
                  <button
                    aria-label={`Launch engine ${mod.moduleNumber}`}
                    title={`Launch ${mod.title}`}
                    onClick={() => {
                      setModelsDrawerOpen(false);
                      openModuleWorkspace(mod.moduleNumber, mod.port, mod.title, currentCategory.categoryName);
                    }}
                    style={{
                      padding: '7px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(24, 169, 232, 0.15)',
                      color: '#36C5FF',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      border: '1px solid rgba(24, 169, 232, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Play style={{ width: '12px', height: '12px', fill: 'currentColor' }} />
                    <ArrowUpRight style={{ width: '12px', height: '12px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid rgba(110, 170, 220, 0.14)',
          backgroundColor: 'rgba(7, 17, 31, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          color: '#9BAFC3'
        }}>
          <span>Total: 18 Validated Coupled Micro-Services</span>
          <button
            onClick={() => setModelsDrawerOpen(false)}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(110, 170, 220, 0.25)',
              backgroundColor: '#13253B',
              color: '#F4F8FC',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
