'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Center Feed (Pure X/Twitter Timeline Architecture & Breathable Spacing)
// Now includes RoutingPipelineTracker for animated module cascade visualization
// ============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useShellStore } from '@/services/useShellStore';
import { FeedTab } from '@/types/shell';
import InputComposer from './InputComposer';
import FeedPostCard from './FeedPostCard';
import RoutingPipelineTracker from './RoutingPipelineTracker';
import FeatureLock from '@/components/shell/FeatureLock';
import { t } from '@/i18n/copy';

export default function CenterFeed() {
  const { activeFeedTab, setActiveFeedTab, posts, locale } = useShellStore();

  const tabs: { id: FeedTab; label: string; icon: string }[] = [
    { id: 'for_you', label: t(locale, 'all'), icon: '⚡' },
    { id: 'live_intel', label: t(locale, 'weather'), icon: '🌪️' },
    { id: 'agriculture', label: t(locale, 'crop'), icon: '🌾' },
    { id: 'markets', label: t(locale, 'mandi'), icon: '📈' },
    { id: 'following', label: t(locale, 'alerts'), icon: '🚨' }
  ];

  // Filter posts based on active feed tab
  const filteredPosts = posts.filter((post) => {
    if (activeFeedTab === 'for_you') return true;
    if (activeFeedTab === 'live_intel') {
      return (
        !!post.intelCard ||
        post.tags?.some((t) => {
          const lower = t.toLowerCase();
          return (
            lower.includes('weather') ||
            lower.includes('cyclone') ||
            lower.includes('downscaling') ||
            lower.includes('depression') ||
            lower.includes('rain') ||
            lower.includes('hydro')
          );
        })
      );
    }
    if (activeFeedTab === 'agriculture') {
      return (
        post.tags?.some((t) => {
          const lower = t.toLowerCase();
          return (
            lower.includes('agri') ||
            lower.includes('crop') ||
            lower.includes('paddy') ||
            lower.includes('wheat') ||
            lower.includes('yield') ||
            lower.includes('pest') ||
            lower.includes('धान') ||
            lower.includes('गेहूं') ||
            lower.includes('फसल') ||
            lower.includes('rust') ||
            lower.includes('phenology') ||
            lower.includes('soil')
          );
        }) ||
        post.content.toLowerCase().includes('crop') ||
        post.content.toLowerCase().includes('wheat') ||
        post.content.toLowerCase().includes('धान') ||
        post.content.toLowerCase().includes('गेहूं') ||
        (post.contentHi || '').includes('धान') ||
        (post.contentHi || '').includes('गेहूं') ||
        (post.contentHi || '').includes('फसल') ||
        post.content.toLowerCase().includes('phenology')
      );
    }
    if (activeFeedTab === 'markets') {
      return (
        post.tags?.some((t) => {
          const lower = t.toLowerCase();
          return (
            lower.includes('market') ||
            lower.includes('mandi') ||
            lower.includes('supply') ||
            lower.includes('price') ||
            lower.includes('soybean') ||
            lower.includes('arrival')
          );
        }) ||
        post.content.toLowerCase().includes('mandi') ||
        post.content.toLowerCase().includes('price') ||
        post.content.toLowerCase().includes('soybean') ||
        post.content.toLowerCase().includes('प्याज') ||
        (post.contentHi || '').includes('मंडी') ||
        (post.contentHi || '').includes('भाव')
      );
    }
    if (activeFeedTab === 'following') {
      return (
        post.author.roleBadge?.toLowerCase().includes('imd') ||
        post.author.roleBadge?.toLowerCase().includes('disaster') ||
        post.author.roleBadge?.toLowerCase().includes('officer') ||
        post.author.roleBadge?.toLowerCase().includes('lead') ||
        post.content.toLowerCase().includes('alert') ||
        post.content.toLowerCase().includes('warning') ||
        post.content.toLowerCase().includes('bulletin') ||
        post.author.handle !== 'atmos_ai'
      );
    }
    return true;
  });

  return (
    <main
      className="x-center-feed"
      style={{
        overflowX: 'hidden'
      }}
    >
      {/* Sticky Top Bar with Smooth Motion Sliding Tab Pill */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          gap: '6px',
          borderBottom: '1px solid var(--stroke)',
          backgroundColor: 'rgba(5, 5, 6, 0.72)',
          backdropFilter: 'blur(24px) saturate(160%)',
          padding: '12px 16px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {tabs.map((tab) => {
          const isSelected = activeFeedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFeedTab(tab.id)}
              style={{
                position: 'relative',
                borderRadius: '9999px',
                padding: '8px 14px',
                fontSize: '13.5px',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? '#FFFFFF' : 'var(--text-1)',
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {isSelected && (
                <motion.span
                  layoutId="tab-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 4px 14px rgba(0, 0, 0, 0.4)'
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1, fontSize: '14px' }}>{tab.icon}</span>
              <span style={{ position: 'relative', zIndex: 1, letterSpacing: '-0.01em' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Input Composer */}
      <FeatureLock>
        <InputComposer />
      </FeatureLock>

      {/* Routing Pipeline Tracker (appears during query orchestration) */}
      <RoutingPipelineTracker />

      {/* Stream of Feed Posts (Natural scrolling, zero dashboard billboards) */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredPosts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}

        {/* End of feed indicator */}
        {filteredPosts.length > 0 && (
          <div style={{
            padding: '40px 16px', textAlign: 'center', borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
              You&apos;re all caught up
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
              New intelligence posts appear here as modules resolve
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
