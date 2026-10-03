'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Reply Modal (Exact X.com / Twitter Design)
// Quick inline reply modal triggered by the speech bubble icon on any post card
// ============================================================================

import React, { useState } from 'react';
import { X, Image as ImageIcon, Smile, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';

export default function ReplyModal() {
  const { replyModalPost, closeReplyModal, addReplyToPost, userProfile, showToast } = useShellStore();
  const [replyContent, setReplyContent] = useState('');

  if (!replyModalPost) return null;

  const { author, timestamp, content } = replyModalPost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    addReplyToPost(replyModalPost.id, replyContent);
    setReplyContent('');
    closeReplyModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: 'rgba(91, 112, 131, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '64px',
        overflowY: 'auto'
      }}
      onClick={closeReplyModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#000000',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)'
          }}
        >
          <button
            onClick={closeReplyModal}
            style={{
              padding: '6px',
              borderRadius: '9999px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="x-icon-btn"
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D9BF0', cursor: 'pointer' }}>
            Drafts
          </span>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '16px' }}>
          {/* Parent Post Summary with Connecting Line */}
          <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
            {/* Connecting Vertical Line */}
            <div
              style={{
                position: 'absolute',
                top: '44px',
                left: '19px',
                bottom: '-20px',
                width: '2px',
                backgroundColor: 'var(--border)'
              }}
            />

            {/* Author Avatar */}
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
                flexShrink: 0,
                zIndex: 2
              }}
            >
              {author.avatarInitials}
            </div>

            {/* Content Excerpt */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                  {author.name}
                </span>
                {author.verified && (
                  <CheckCircle2 style={{ width: '15px', height: '15px', color: '#1D9BF0', fill: 'currentColor' }} />
                )}
                <span style={{ fontSize: '14px', color: '#71767B' }}>
                  @{author.handle.replace(/^@/, '')}
                </span>
                <span style={{ fontSize: '14px', color: '#71767B' }}>·</span>
                <span style={{ fontSize: '14px', color: '#71767B' }}>{timestamp}</span>
              </div>

              <div style={{ fontSize: '14px', color: '#E7E9EA', marginTop: '6px', lineHeight: 1.4 }}>
                {content.length > 180 ? `${content.substring(0, 180)}...` : content}
              </div>

              <div style={{ marginTop: '12px', fontSize: '13px', color: '#71767B' }}>
                Replying to <span style={{ color: '#1D9BF0' }}>@{author.handle.replace(/^@/, '')}</span>
              </div>
            </div>
          </div>

          {/* User Reply Composer */}
          <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                backgroundColor: '#16181C',
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
              {userProfile.avatarInitials}
            </div>

            <div style={{ flex: 1 }}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Post your reply..."
                autoFocus
                rows={4}
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

              {/* Bottom Strip: Media icons + Reply button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  marginTop: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1D9BF0' }}>
                  <button
                    type="button"
                    onClick={() => showToast('Attach image or graph', 'info')}
                    style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                  >
                    <ImageIcon style={{ width: '18px', height: '18px' }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyContent((prev) => `${prev} 🛰️ `)}
                    style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                  >
                    <Smile style={{ width: '18px', height: '18px' }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Schedule reply', 'info')}
                    style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                  >
                    <Calendar style={{ width: '18px', height: '18px' }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyContent((prev) => `${prev} [Ground Station Hub] `)}
                    style={{ color: '#1D9BF0', cursor: 'pointer', padding: '4px' }}
                  >
                    <MapPin style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    backgroundColor: replyContent.trim() ? '#EFF3F4' : '#2F3336',
                    color: replyContent.trim() ? '#0F1419' : '#71767B',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: replyContent.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
