'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Feed Post Card (Pure Monochromatic X/Twitter Lights Out Design)
// Minimalist black surface, clean white text, hairline borders,
// coupled multi-module routing pipeline visualization, and workspace deep-links.
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  ArrowRight,
  GitBranch,
  ArrowUpRight
} from 'lucide-react';
import { FeedPost } from '@/types/shell';
import { useShellStore } from '@/services/useShellStore';
import ReportExport from './ReportExport';
import NewsTranslator from './NewsTranslator';

interface FeedPostCardProps {
  post: FeedPost;
}

export default function FeedPostCard({ post }: FeedPostCardProps) {
  const {
    toggleLikePost,
    toggleBookmarkPost,
    openModuleWorkspace,
    showToast,
    openPostDetail,
    openReplyModal,
    locale
  } = useShellStore();
  const [expanded, setExpanded] = useState(false);

  const { author, timestamp, content, contentHi, intelCard, stats, routingPipeline, tags, imageUrl, expandable } = post;
  const body = locale === 'hi' && contentHi ? contentHi : content;
  const long = Boolean(expandable) && body.length > 280;
  const shown = expanded || !long ? body : `${body.slice(0, 280)}…`;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#post/${post.id}`);
      showToast('Post deep-link copied to clipboard', 'info');
    } else {
      showToast('Link ready to share', 'info');
    }
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Synthesized intelligence report reposted to timeline', 'success');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      onClick={() => openPostDetail(post.id)}
      style={{
        borderBottom: '1px solid var(--stroke)',
        padding: '24px 28px',
        display: 'flex',
        gap: '16px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {/* Author Avatar (Monochrome or Official Emblem) */}
      <div
        className="x-avatar"
        style={{
          backgroundColor: '#05070B',
          color: '#FFFFFF',
          border: author.handle === 'atmos_ai' ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid var(--border)',
          boxShadow: author.handle === 'atmos_ai' ? '0 0 12px rgba(212, 175, 55, 0.2)' : 'none',
          overflow: 'hidden'
        }}
      >
        {author.handle === 'atmos_ai' ? (
          <img
            src="/emblem.jpg"
            alt="Bharatiya Mausam Emblem"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }}
          />
        ) : (
          author.avatarInitials
        )}
      </div>

      {/* Post Content Column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header Row: Author Name, Badge, Handle, Dot, Timestamp, Menu */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', lineHeight: 1 }}>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
              {author.name}
            </span>
            {author.verified && (
              <CheckCircle2 style={{ width: '16px', height: '16px', color: '#1D9BF0', fill: 'currentColor' }} />
            )}
            {author.roleBadge && (
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: '#16181C',
                color: '#E7E9EA',
                border: '1px solid var(--border)',
                fontWeight: 600
              }}>
                {author.roleBadge}
              </span>
            )}
            <span style={{ fontSize: '14px', color: '#71767B' }}>
              @{author.handle.replace(/^@/, '')}
            </span>
            <span style={{ fontSize: '14px', color: '#71767B' }}>·</span>
            <span style={{ fontSize: '14px', color: '#71767B' }}>
              {timestamp}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast('Post options', 'info');
            }}
            style={{ padding: '4px', color: '#71767B', borderRadius: '9999px', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <MoreHorizontal style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Post Text Body — Hindi first so a common reader can follow */}
        <div style={{ marginTop: '6px', fontSize: '15px', lineHeight: 1.55, color: '#E7E9EA', whiteSpace: 'pre-line' }}>
          {shown}
        </div>
        {long && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (expanded) {
                openPostDetail(post.id);
                return;
              }
              setExpanded(true);
            }}
            style={{ marginTop: 8, color: '#E6C65C', fontSize: 12, fontWeight: 700 }}
          >
            {expanded
              ? (locale === 'hi' ? 'पूरी रिपोर्ट खोलें' : 'Open full report')
              : (locale === 'hi' ? 'और पढ़ें' : 'Read more')}
          </button>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 16, marginTop: 12, border: '1px solid var(--stroke)' }}
          />
        )}
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <ReportExport post={post} />
          <NewsTranslator headline={body} locale={locale} />
        </div>

        {/* Tags if present */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
            {tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '13px',
                  color: '#71767B',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Coupled Multi-Module Pipeline Trace Strip */}
        {routingPipeline && routingPipeline.length > 0 && (
          <div style={{
            marginTop: '10px',
            padding: '8px 12px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38BDF8', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
              <GitBranch style={{ width: '13px', height: '13px' }} />
              <span>{locale === 'hi' ? 'इंजन:' : 'Engines:'}</span>
            </div>
            {routingPipeline.map((mod, idx) => (
              <React.Fragment key={mod.moduleNumber}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModuleWorkspace(mod.moduleNumber, mod.port, mod.moduleName);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Open M${mod.moduleNumber} (${mod.moduleName}) Workspace`}
                >
                  <span style={{ color: '#38BDF8', fontWeight: 800 }}>
                    M{mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : mod.moduleNumber}
                  </span>
                  <span style={{ color: '#CBD5E1', fontSize: '11px' }}>{mod.moduleName}</span>
                </button>
                {idx < routingPipeline.length - 1 && (
                  <span style={{ color: '#64748B', fontSize: '11px' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Embedded Scientific Intelligence Visualization Card */}
        {intelCard && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              openModuleWorkspace(
                intelCard.targetModuleNumber,
                intelCard.targetPort,
                intelCard.title
              );
            }}
            className="glass"
            style={{
              marginTop: '18px',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            {/* Card Header */}
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--stroke)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="chip chip-blue">{intelCard.hazardType}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-0)' }}>
                  {intelCard.region}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="chip chip-amber">
                  {intelCard.leadTime.toLowerCase().includes('lead')
                    ? intelCard.leadTime
                    : `${intelCard.leadTime} Lead`}
                </span>
                <span className="chip chip-green">{intelCard.probabilityPct}% Occurrence</span>
              </div>
            </div>

            {/* Card Metrics & Evidence Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', padding: '16px 20px 0 20px' }}>
                {intelCard.primaryMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.07)'
                    }}
                  >
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-2)' }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: '15px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-0)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{m.value}</span>
                      {m.delta && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '4px',
                            backgroundColor: m.direction === 'up' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: m.direction === 'up' ? '#F87171' : '#34D399'
                          }}
                        >
                          {m.delta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Evidence Summary Bullets */}
              <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {intelCard.evidenceBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    style={{ fontSize: '14px', color: 'var(--text-1)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.6 }}
                  >
                    <span style={{ color: '#38BDF8', marginTop: '1px', fontSize: '14px', lineHeight: 1 }}>•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Action Strip: "Inspect Probability Field →" */}
              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--stroke)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px'
                }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>
                  {intelCard.uncertaintySpreadText}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontWeight: 600 }}>
                  <span>{intelCard.targetActionLabel}</span>
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Engagement Action Row */}
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '460px', color: '#71767B', fontSize: '12px' }}>
          {/* Reply */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openReplyModal(post);
            }}
            className="x-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#71767B', background: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Reply"
          >
            <div className="x-action-icon-circle">
              <MessageCircle style={{ width: '16px', height: '16px' }} />
            </div>
            <span>{stats.replies}</span>
          </button>

          {/* Repost */}
          <button
            onClick={handleRepost}
            className="x-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#71767B', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <div className="x-action-icon-circle">
              <Repeat2 style={{ width: '16px', height: '16px' }} />
            </div>
            <span>{stats.reposts}</span>
          </button>

          {/* Like with pop animation */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikePost(post.id);
            }}
            whileTap={{ scale: 1.35 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="x-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: stats.isLiked ? '#F43F5E' : '#71767B', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <div className="x-action-icon-circle">
              <Heart
                style={{
                  width: '16px',
                  height: '16px',
                  fill: stats.isLiked ? 'currentColor' : 'none',
                  transition: 'fill 0.2s ease, color 0.2s ease'
                }}
              />
            </div>
            <span>{stats.likes}</span>
          </motion.button>

          {/* Views with Eye icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#71767B' }}>
            <Eye style={{ width: '15px', height: '15px' }} />
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{stats.views}</span>
          </div>

          {/* Bookmark with pop animation & Share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmarkPost(post.id);
                showToast(stats.isBookmarked ? 'Removed from Bookmarks' : 'Saved to Bookmarks', 'success');
              }}
              whileTap={{ scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="x-action-btn"
              style={{ color: stats.isBookmarked ? '#38BDF8' : '#71767B', background: 'transparent', border: 'none', cursor: 'pointer' }}
              title={stats.isBookmarked ? 'Remove Bookmark' : 'Bookmark Post'}
            >
              <div className="x-action-icon-circle">
                <Bookmark
                  style={{
                    width: '16px',
                    height: '16px',
                    fill: stats.isBookmarked ? 'currentColor' : 'none',
                    transition: 'fill 0.2s ease, color 0.2s ease'
                  }}
                />
              </div>
            </motion.button>

            <button
              onClick={handleShare}
              className="x-action-btn"
              style={{ color: '#71767B', background: 'transparent', border: 'none', cursor: 'pointer' }}
              title="Share Link"
            >
              <div className="x-action-icon-circle">
                <Share style={{ width: '16px', height: '16px' }} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
