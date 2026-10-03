'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Profile View (Exact X.com / Twitter Lights Out Design)
// Dedicated multi-page profile with custom banner, avatar, bio metadata,
// tabs (Posts, Replies, Highlights, Articles, Media, Likes), interactive posts,
// and full Edit Profile modal.
// ============================================================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  FileText,
  Heart,
  MessageCircle,
  Share,
  Repeat2,
  Bookmark
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import FeedPostCard from '@/components/feed/FeedPostCard';
import { FeedPost } from '@/types/shell';

export default function ProfileView() {
  const {
    userProfile,
    updateUserProfile,
    posts,
    profileActiveTab,
    setProfileActiveTab,
    setActiveView,
    openPostDetail,
    showToast
  } = useShellStore();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editLocation, setEditLocation] = useState(userProfile.location);
  const [editWebsite, setEditWebsite] = useState(userProfile.website);

  // Filter posts authored by user
  const userPosts = posts.filter(
    (p) => p.author.handle.toLowerCase() === userProfile.handle.toLowerCase()
  );

  // Filter user replies across all posts
  const userReplies: { reply: any; parentPost: FeedPost }[] = [];
  posts.forEach((p) => {
    (p.repliesList || []).forEach((r) => {
      if (r.author.handle.toLowerCase() === userProfile.handle.toLowerCase()) {
        userReplies.push({ reply: r, parentPost: p });
      }
    });
  });

  // Filter liked posts
  const likedPosts = posts.filter((p) => p.stats.isLiked);

  // Filter media posts
  const mediaPosts = posts.filter((p) => Boolean(p.intelCard));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      bio: editBio,
      location: editLocation,
      website: editWebsite
    });
    setEditModalOpen(false);
  };

  return (
    <main className="x-center-feed">
      {/* Sticky Top Bar: Back Button + Name + Posts Count */}
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="x-icon-btn"
          title="Back"
        >
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {userProfile.name}
            </h1>
            <CheckCircle2 style={{ width: '16px', height: '16px', color: '#1D9BF0', fill: 'currentColor' }} />
          </div>
          <div style={{ fontSize: '13px', color: '#71767B', marginTop: '1px' }}>
            {userPosts.length} posts
          </div>
        </div>
      </div>

      {/* Atmospheric High-Tech Header Banner */}
      <div
        style={{
          height: '200px',
          position: 'relative',
          backgroundColor: '#16181C',
          backgroundImage:
            'radial-gradient(ellipse at 80% 20%, rgba(29, 155, 240, 0.15) 0%, transparent 60%), linear-gradient(180deg, #16181C 0%, #0B0E14 100%)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Satellite Matrix Grid Lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            backgroundImage:
              'linear-gradient(to right, #2F3336 1px, transparent 1px), linear-gradient(to bottom, #2F3336 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* System Tag on Banner */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            padding: '4px 10px',
            borderRadius: '6px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#A0A5AA',
            backdropFilter: 'blur(8px)'
          }}
        >
          ORBITAL TELEMETRY // SECTOR 04
        </div>
      </div>

      {/* Profile Header Details Row */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        {/* Circular Avatar Overlapping Banner */}
        <div
          style={{
            position: 'absolute',
            top: '-44px',
            left: '16px',
            width: '88px',
            height: '88px',
            borderRadius: '9999px',
            backgroundColor: '#000000',
            border: '4px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '9999px',
              backgroundColor: '#16181C',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '26px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {userProfile.avatarInitials}
          </div>
        </div>

        {/* Action Button Right: "Edit profile" */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', minHeight: '52px' }}>
          <button
            onClick={() => setEditModalOpen(true)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: '#000000',
              border: '1px solid #536471',
              color: '#EFF3F4',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            className="x-profile-btn"
          >
            Edit profile
          </button>
        </div>

        {/* User Identity Info */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {userProfile.name}
            </h2>
            <CheckCircle2 style={{ width: '18px', height: '18px', color: '#1D9BF0', fill: 'currentColor' }} />
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: '#16181C',
                color: '#E7E9EA',
                border: '1px solid var(--border)',
                fontWeight: 600
              }}
            >
              {userProfile.roleBadge}
            </span>
          </div>

          <div style={{ fontSize: '15px', color: '#71767B', marginTop: '2px' }}>
            @{userProfile.handle.replace(/^@/, '')}
          </div>

          {/* Bio */}
          <div style={{ fontSize: '15px', color: '#E7E9EA', marginTop: '12px', lineHeight: 1.5 }}>
            {userProfile.bio}
          </div>

          {/* Metadata Row: Location, Website, Joined */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '12px',
              fontSize: '14px',
              color: '#71767B'
            }}
          >
            {userProfile.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin style={{ width: '16px', height: '16px' }} />
                <span>{userProfile.location}</span>
              </div>
            )}
            {userProfile.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LinkIcon style={{ width: '16px', height: '16px' }} />
                <a
                  href={userProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#1D9BF0', textDecoration: 'none' }}
                >
                  {userProfile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar style={{ width: '16px', height: '16px' }} />
              <span>{userProfile.joinedDate}</span>
            </div>
          </div>

          {/* Followers / Following Counts */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '14px', paddingBottom: '16px' }}>
            <span style={{ cursor: 'pointer' }}>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{userProfile.followingCount}</span>{' '}
              <span style={{ color: '#71767B' }}>Following</span>
            </span>
            <span style={{ cursor: 'pointer' }}>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{userProfile.followersCount}</span>{' '}
              <span style={{ color: '#71767B' }}>Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* Profile Horizontal Tabs (Exact X.com Design) */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'posts', label: 'Posts' },
          { id: 'replies', label: 'Replies' },
          { id: 'highlights', label: 'Highlights' },
          { id: 'articles', label: 'Articles' },
          { id: 'media', label: 'Media' },
          { id: 'likes', label: 'Likes' }
        ].map((tab) => {
          const isActive = profileActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setProfileActiveTab(tab.id as any)}
              style={{
                flex: 1,
                minWidth: '80px',
                padding: '14px 8px',
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                color: isActive ? '#FFFFFF' : '#71767B',
                fontWeight: isActive ? 700 : 500,
                fontSize: '15px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.15s ease'
              }}
              className="x-profile-tab"
            >
              <span>{tab.label}</span>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '48px',
                    height: '4px',
                    backgroundColor: '#EFF3F4',
                    borderRadius: '9999px'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div>
        {profileActiveTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div style={{ padding: '48px 16px', textAlign: 'center', color: '#71767B' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>No posts yet</p>
                <p style={{ fontSize: '14px', marginTop: '6px' }}>
                  When you publish telemetry reports or ask queries, they will appear here.
                </p>
              </div>
            ) : (
              userPosts.map((post) => <FeedPostCard key={post.id} post={post} />)
            )}
          </div>
        )}

        {profileActiveTab === 'replies' && (
          <div>
            {userReplies.length === 0 ? (
              <div style={{ padding: '48px 16px', textAlign: 'center', color: '#71767B' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>No replies yet</p>
                <p style={{ fontSize: '14px', marginTop: '6px' }}>
                  When you reply to research posts in the timeline, your responses will show here.
                </p>
              </div>
            ) : (
              userReplies.map(({ reply, parentPost }) => (
                <div
                  key={reply.id}
                  onClick={() => openPostDetail(parentPost.id)}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    backgroundColor: '#000000'
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#71767B', marginBottom: '6px' }}>
                    Replying to{' '}
                    <span style={{ color: '#1D9BF0' }}>@{parentPost.author.handle.replace(/^@/, '')}</span>
                  </div>
                  <div style={{ fontSize: '15px', color: '#FFFFFF', lineHeight: 1.5 }}>
                    {reply.content}
                  </div>
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#16181C',
                      border: '1px solid var(--border)',
                      fontSize: '13px',
                      color: '#71767B'
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#A0A5AA' }}>{parentPost.author.name}: </span>
                    <span>{parentPost.content.substring(0, 100)}...</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {profileActiveTab === 'highlights' && (
          <div>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                <Sparkles style={{ width: '14px', height: '14px', color: '#F59E0B' }} />
                <span>PINNED SCIENTIFIC HIGHLIGHT</span>
              </div>
            </div>
            {posts.slice(0, 2).map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {profileActiveTab === 'articles' && (
          <div style={{ padding: '24px 16px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#16181C',
                border: '1px solid var(--border)',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#1D9BF0' }}>
                <FileText style={{ width: '14px', height: '14px' }} />
                <span>RESEARCH WHITEPAPER // 4D CASCADE</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginTop: '6px' }}>
                Diffusion Downscaling of Multi-Model Ensemble Precipitation over Complex Coastal Topography
              </h3>
              <p style={{ fontSize: '13px', color: '#A0A5AA', marginTop: '6px', lineHeight: 1.5 }}>
                A continuous stochastic differential equation solver preserving mass and moisture conservation down from 12km to 5km mesh resolution. Validated across 24 monsoonal depression events.
              </p>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#71767B' }}>
                Published Oct 2026 · 12 min read
              </div>
            </div>
          </div>
        )}

        {profileActiveTab === 'media' && (
          <div>
            {mediaPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {profileActiveTab === 'likes' && (
          <div>
            {likedPosts.length === 0 ? (
              <div style={{ padding: '48px 16px', textAlign: 'center', color: '#71767B' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>No liked posts yet</p>
                <p style={{ fontSize: '14px', marginTop: '6px' }}>
                  Tap the heart on any intelligence post in the timeline to save it here.
                </p>
              </div>
            ) : (
              likedPosts.map((post) => <FeedPostCard key={post.id} post={post} />)
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(91, 112, 131, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setEditModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#000000',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  style={{ padding: '4px', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                  Edit profile
                </span>
              </div>
              <button
                type="button"
                onClick={handleSaveProfile}
                style={{
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#EFF3F4',
                  color: '#0F1419',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveProfile} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#71767B', display: 'block', marginBottom: '4px' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    border: '1px solid var(--border)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#71767B', display: 'block', marginBottom: '4px' }}>
                  Bio
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    border: '1px solid var(--border)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#71767B', display: 'block', marginBottom: '4px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    border: '1px solid var(--border)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#71767B', display: 'block', marginBottom: '4px' }}>
                  Website
                </label>
                <input
                  type="text"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    border: '1px solid var(--border)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
