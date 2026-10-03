'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Bookmarks View (Saved Intelligence Posts — X-Style Bookmarks Page)
// ============================================================================

import React from 'react';
import { Bookmark } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import FeedPostCard from '@/components/feed/FeedPostCard';

export default function BookmarksView() {
  const { posts, bookmarks } = useShellStore();

  const bookmarkedPosts = posts.filter((p) => bookmarks.includes(p.id));

  return (
    <main className="x-center-feed">
      {/* Sticky Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderBottom: '1px solid var(--border)', padding: '12px 16px'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
          Bookmarks
        </h1>
        <div style={{ fontSize: '13px', color: '#71767B', marginTop: '2px' }}>
          @YogyaJain16
        </div>
      </div>

      {bookmarkedPosts.length === 0 ? (
        <div style={{
          padding: '60px 40px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center'
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '9999px',
            backgroundColor: '#16181C', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Bookmark style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
            Save intelligence for later
          </div>
          <div style={{ fontSize: '14px', color: '#71767B', maxWidth: '320px', lineHeight: 1.5 }}>
            Bookmark intelligence posts, hazard alerts, and scientific analysis cards to review them later.
          </div>
        </div>
      ) : (
        <div>
          {bookmarkedPosts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
