'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Thread View / Post Detail Page (Exact X.com / Twitter Design)
// Dedicated multi-page view with full post details, metrics, cascade pipeline,
// interactive reply engine, and replies thread list.
// ============================================================================

import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  MoreHorizontal,
  CheckCircle2,
  GitBranch,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Smile,
  Calendar,
  MapPin,
  Send
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { FeedPost } from '@/types/shell';
import ReportExport from './ReportExport';

export default function ThreadView() {
  const {
    activePostId,
    posts,
    userProfile,
    setActiveView,
    openModuleWorkspace,
    toggleLikePost,
    toggleBookmarkPost,
    addReplyToPost,
    toggleLikeReply,
    showToast,
    locale
  } = useShellStore();

  const [replyText, setReplyText] = useState('');
  const replyInputRef = useRef<HTMLTextAreaElement>(null);

  // Find the active post
  const post = posts.find((p) => p.id === activePostId) || posts[0];

  if (!post) {
    return (
      <main className="x-center-feed" style={{ padding: '40px 16px', textAlign: 'center', color: '#71767B' }}>
        Post not found.
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={() => setActiveView('feed')}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: '#EFF3F4',
              color: '#0F1419',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Back to Timeline
          </button>
        </div>
      </main>
    );
  }

  const { author, timestamp, content, contentHi, intelCard, stats, routingPipeline, tags, repliesList = [], imageUrl } = post;
  const threadBody = locale === 'hi' && contentHi ? contentHi : content;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#post/${post.id}`);
      showToast('Post link copied to clipboard', 'info');
    } else {
      showToast('Link ready to share', 'info');
    }
  };

  const handleRepost = () => {
    showToast('Post reposted to your timeline', 'success');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addReplyToPost(post.id, replyText);
    setReplyText('');
  };

  const handleFocusReply = () => {
    if (replyInputRef.current) {
      replyInputRef.current.focus();
    }
  };

  return (
    <main className="x-center-feed">
      {/* Sticky Top Bar: Back Arrow + "Post" Title */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderBottom: '1px solid var(--border)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <button
          onClick={() => setActiveView('feed')}
          style={{
            padding: '8px',
            borderRadius: '9999px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
          className="x-icon-btn"
          title="Back"
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
        </button>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
            Post
          </h1>
        </div>
      </div>

      {/* Main Expanded Post */}
      <article style={{ padding: '16px 16px 12px 16px', borderBottom: '1px solid var(--border)' }}>
        {/* Author Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '9999px',
                backgroundColor: '#05070B',
                border: author.handle === 'atmos_ai' ? '1.5px solid rgba(212, 175, 55, 0.5)' : '1px solid var(--border)',
                boxShadow: author.handle === 'atmos_ai' ? '0 0 14px rgba(212, 175, 55, 0.25)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                fontFamily: 'var(--font-mono)',
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                  {author.name}
                </span>
                {author.verified && (
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#1D9BF0', fill: 'currentColor' }} />
                )}
                {author.roleBadge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      backgroundColor: '#16181C',
                      color: '#E7E9EA',
                      border: '1px solid var(--border)',
                      fontWeight: 600
                    }}
                  >
                    {author.roleBadge}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '14px', color: '#71767B' }}>
                @{author.handle.replace(/^@/, '')}
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Post options', 'info')}
            style={{ padding: '6px', color: '#71767B', borderRadius: '9999px', cursor: 'pointer' }}
          >
            <MoreHorizontal style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Post Text in Large Typography */}
        <div
          style={{
            marginTop: '16px',
            fontSize: '17px',
            lineHeight: 1.6,
            color: '#FFFFFF',
            whiteSpace: 'pre-line',
            wordBreak: 'break-word'
          }}
        >
          {threadBody}
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 18, marginTop: 16, border: '1px solid var(--stroke)' }}
          />
        )}
        <div style={{ marginTop: 14 }}>
          <ReportExport post={post} />
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '14px',
                  color: '#1D9BF0',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Coupled Multi-Module Pipeline Ribbon */}
        {routingPipeline && routingPipeline.length > 0 && (
          <div
            style={{
              marginTop: '14px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#16181C',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFFFFF', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <GitBranch style={{ width: '13px', height: '13px' }} />
              <span>COUPLED PIPELINE:</span>
            </div>
            {routingPipeline.map((mod, idx) => (
              <React.Fragment key={mod.moduleNumber}>
                <button
                  onClick={() => openModuleWorkspace(mod.moduleNumber, mod.port, mod.moduleName)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    backgroundColor: '#202327',
                    border: '1px solid var(--border)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                  title={`Open Engine ${mod.moduleNumber} (${mod.moduleName}) Workspace`}
                >
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    M{mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : mod.moduleNumber}
                  </span>
                  <span style={{ color: '#A0A5AA', fontSize: '10px' }}>{mod.moduleName}</span>
                </button>
                {idx < routingPipeline.length - 1 && (
                  <span style={{ color: '#71767B', fontSize: '11px' }}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Embedded Intelligence Card */}
        {intelCard && (
          <div
            onClick={() =>
              openModuleWorkspace(
                intelCard.targetModuleNumber,
                intelCard.targetPort,
                intelCard.title
              )
            }
            style={{
              marginTop: '14px',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              backgroundColor: '#16181C',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#16181C'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    backgroundColor: '#202327',
                    color: '#FFFFFF',
                    border: '1px solid var(--border)'
                  }}
                >
                  {intelCard.hazardType}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                  {intelCard.region}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--amber-anomaly)' }}>
                  {intelCard.leadTime}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    backgroundColor: '#202327',
                    color: '#FFFFFF',
                    border: '1px solid var(--border)'
                  }}
                >
                  {intelCard.probabilityPct}% Occurrence
                </span>
              </div>
            </div>

            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                {intelCard.primaryMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#000000',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#71767B' }}>{m.label}</div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginTop: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{m.value}</span>
                      {m.delta && (
                        <span
                          style={{
                            fontSize: '9px',
                            color: m.direction === 'up' ? '#f87171' : m.direction === 'down' ? '#34d399' : '#71767B'
                          }}
                        >
                          {m.delta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {intelCard.evidenceBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    style={{ fontSize: '13px', color: '#A0A5AA', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.4 }}
                  >
                    <span style={{ color: '#FFFFFF', marginTop: '2px' }}>•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71767B' }}>
                  {intelCard.uncertaintySpreadText}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFFFFF', fontWeight: 600 }}>
                  <span>{intelCard.targetActionLabel}</span>
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timestamp & Views Line */}
        <div style={{ marginTop: '14px', fontSize: '14px', color: '#71767B', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>10:42 AM · Oct 3, 2026</span>
          <span>·</span>
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{stats.views}</span>
          <span>Views</span>
        </div>

        {/* Divider */}
        <div style={{ margin: '12px 0', height: '1px', backgroundColor: 'var(--border)' }} />

        {/* Numerical Engagement Metrics Breakdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px' }}>
          <div>
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{stats.reposts}</span>{' '}
            <span style={{ color: '#71767B' }}>Reposts</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{Math.floor(stats.reposts / 2)}</span>{' '}
            <span style={{ color: '#71767B' }}>Quotes</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{stats.likes}</span>{' '}
            <span style={{ color: '#71767B' }}>Likes</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{stats.isBookmarked ? '13' : '12'}</span>{' '}
            <span style={{ color: '#71767B' }}>Bookmarks</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: '12px 0', height: '1px', backgroundColor: 'var(--border)' }} />

        {/* Social Action Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#71767B' }}>
          <button
            onClick={handleFocusReply}
            style={{ padding: '8px', borderRadius: '9999px', color: '#71767B', cursor: 'pointer' }}
            title="Reply"
            className="x-action-btn"
          >
            <div className="x-action-icon-circle">
              <MessageCircle style={{ width: '20px', height: '20px' }} />
            </div>
          </button>

          <button
            onClick={handleRepost}
            style={{ padding: '8px', borderRadius: '9999px', color: '#71767B', cursor: 'pointer' }}
            title="Repost"
            className="x-action-btn"
          >
            <div className="x-action-icon-circle">
              <Repeat2 style={{ width: '20px', height: '20px' }} />
            </div>
          </button>

          <button
            onClick={() => toggleLikePost(post.id)}
            style={{ padding: '8px', borderRadius: '9999px', color: stats.isLiked ? '#F43F5E' : '#71767B', cursor: 'pointer' }}
            title="Like"
            className="x-action-btn"
          >
            <div className="x-action-icon-circle">
              <Heart
                style={{
                  width: '20px',
                  height: '20px',
                  fill: stats.isLiked ? 'currentColor' : 'none'
                }}
              />
            </div>
          </button>

          <button
            onClick={() => {
              toggleBookmarkPost(post.id);
              showToast(stats.isBookmarked ? 'Removed from Bookmarks' : 'Saved to Bookmarks', 'success');
            }}
            style={{ padding: '8px', borderRadius: '9999px', color: stats.isBookmarked ? '#FFFFFF' : '#71767B', cursor: 'pointer' }}
            title="Bookmark"
            className="x-action-btn"
          >
            <div className="x-action-icon-circle">
              <Bookmark
                style={{
                  width: '20px',
                  height: '20px',
                  fill: stats.isBookmarked ? 'currentColor' : 'none'
                }}
              />
            </div>
          </button>

          <button
            onClick={handleShare}
            style={{ padding: '8px', borderRadius: '9999px', color: '#71767B', cursor: 'pointer' }}
            title="Share"
            className="x-action-btn"
          >
            <div className="x-action-icon-circle">
              <Share style={{ width: '20px', height: '20px' }} />
            </div>
          </button>
        </div>
      </article>

      {/* Inline "Post your reply" Box */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '14px 16px', display: 'flex', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '9999px',
            backgroundColor: '#202327',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            flexShrink: 0
          }}
        >
          {userProfile.avatarInitials}
        </div>

        <form onSubmit={handleSendReply} style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: '#71767B', marginBottom: '6px' }}>
            Replying to <span style={{ color: '#1D9BF0' }}>@{author.handle.replace(/^@/, '')}</span>
          </div>

          <textarea
            ref={replyInputRef}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Post your reply..."
            rows={3}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: '#FFFFFF',
              fontSize: '16px',
              fontFamily: 'inherit',
              lineHeight: 1.4
            }}
          />

          {/* Quick Tag Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {['#GDD_Check', '#ObservedRainfall', '#SluiceGateOpen', '#CropLodging'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setReplyText((prev) => (prev ? `${prev} ${tag}` : tag))}
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: '#16181C',
                  border: '1px solid var(--border)',
                  color: '#71767B',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Bottom Bar: Action Icons + Reply Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px',
              borderTop: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1D9BF0' }}>
              <button
                type="button"
                onClick={() => showToast('Attach telemetry media or chart', 'info')}
                style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                title="Attach Media"
              >
                <ImageIcon style={{ width: '18px', height: '18px' }} />
              </button>
              <button
                type="button"
                onClick={() => setReplyText((prev) => `${prev} 🛰️ `)}
                style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                title="Add Emoji"
              >
                <Smile style={{ width: '18px', height: '18px' }} />
              </button>
              <button
                type="button"
                onClick={() => showToast('Scheduled alert delivery', 'info')}
                style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                title="Schedule"
              >
                <Calendar style={{ width: '18px', height: '18px' }} />
              </button>
              <button
                type="button"
                onClick={() => setReplyText((prev) => `${prev} [Puri Coastal Transect] `)}
                style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                title="Location Tag"
              >
                <MapPin style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!replyText.trim()}
              style={{
                padding: '7px 18px',
                borderRadius: '9999px',
                backgroundColor: replyText.trim() ? '#EFF3F4' : '#2F3336',
                color: replyText.trim() ? '#0F1419' : '#71767B',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease'
              }}
            >
              Reply
            </button>
          </div>
        </form>
      </div>

      {/* Thread Replies List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {repliesList.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center', color: '#71767B', fontSize: '14px' }}>
            No replies yet. Be the first scientific researcher to respond!
          </div>
        ) : (
          repliesList.map((reply, idx) => (
            <div
              key={reply.id}
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                gap: '12px',
                position: 'relative'
              }}
            >
              {/* Vertical connecting line if multiple */}
              {idx < repliesList.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '56px',
                    left: '35px',
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--border)'
                  }}
                />
              )}

              {/* Avatar */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '9999px',
                  backgroundColor: reply.author.handle === userProfile.handle ? '#16181C' : '#202327',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: 'var(--font-mono)',
                  flexShrink: 0,
                  zIndex: 2
                }}
              >
                {reply.author.avatarInitials}
              </div>

              {/* Reply Body */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {reply.author.name}
                    </span>
                    {reply.author.verified && (
                      <CheckCircle2 style={{ width: '15px', height: '15px', color: '#1D9BF0', fill: 'currentColor' }} />
                    )}
                    {reply.author.roleBadge && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: '#16181C',
                          color: '#E7E9EA',
                          border: '1px solid var(--border)',
                          fontWeight: 600
                        }}
                      >
                        {reply.author.roleBadge}
                      </span>
                    )}
                    <span style={{ fontSize: '13px', color: '#71767B' }}>
                      @{reply.author.handle.replace(/^@/, '')}
                    </span>
                    <span style={{ fontSize: '13px', color: '#71767B' }}>·</span>
                    <span style={{ fontSize: '13px', color: '#71767B' }}>
                      {reply.timestamp}
                    </span>
                  </div>

                  <button
                    onClick={() => showToast('Reply options', 'info')}
                    style={{ padding: '4px', color: '#71767B', cursor: 'pointer' }}
                  >
                    <MoreHorizontal style={{ width: '15px', height: '15px' }} />
                  </button>
                </div>

                <div style={{ fontSize: '13px', color: '#71767B', marginTop: '2px' }}>
                  Replying to <span style={{ color: '#1D9BF0' }}>@{author.handle.replace(/^@/, '')}</span>
                </div>

                <div
                  style={{
                    marginTop: '6px',
                    fontSize: '14px',
                    color: '#E7E9EA',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {reply.content}
                </div>

                {/* Reply Actions */}
                <div
                  style={{
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    color: '#71767B',
                    fontSize: '12px'
                  }}
                >
                  <button
                    onClick={() => {
                      setReplyText(`@${reply.author.handle.replace(/^@/, '')} `);
                      handleFocusReply();
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71767B', cursor: 'pointer' }}
                    className="x-action-btn"
                  >
                    <MessageCircle style={{ width: '14px', height: '14px' }} />
                  </button>

                  <button
                    onClick={() => showToast('Reply reposted', 'success')}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71767B', cursor: 'pointer' }}
                    className="x-action-btn"
                  >
                    <Repeat2 style={{ width: '14px', height: '14px' }} />
                  </button>

                  <button
                    onClick={() => toggleLikeReply(post.id, reply.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: reply.isLiked ? '#F43F5E' : '#71767B',
                      cursor: 'pointer'
                    }}
                    className="x-action-btn"
                  >
                    <Heart
                      style={{
                        width: '14px',
                        height: '14px',
                        fill: reply.isLiked ? 'currentColor' : 'none'
                      }}
                    />
                    <span>{reply.likes > 0 ? reply.likes : ''}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && navigator.clipboard) {
                        navigator.clipboard.writeText(`${window.location.origin}/#post/${post.id}`);
                        showToast('Reply link copied', 'info');
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71767B', cursor: 'pointer' }}
                    className="x-action-btn"
                  >
                    <Share style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
