'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Explore View (Trending Intelligence Topics — X-Style Discover Page)
// ============================================================================

import React, { useState } from 'react';
import { TrendingUp, Hash, Compass, ArrowUpRight, Layers } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { EXPLORE_TOPICS } from '@/data/mockFeedData';
import { ExploreTopic } from '@/types/shell';

export default function ExploreView() {
  const { setActiveContextTopic, openModuleWorkspace, submitComposerQuery, setActiveNav } = useShellStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Weather', 'Agriculture', 'Market', 'Policy', 'Research'];
  const filteredTopics = activeCategory === 'All'
    ? EXPLORE_TOPICS
    : EXPLORE_TOPICS.filter((t) => t.category === activeCategory);

  const trendingTopics = EXPLORE_TOPICS.filter((t) => t.trending);

  const handleTopicClick = (topic: ExploreTopic) => {
    if (topic.region) setActiveContextTopic(topic.region);
    setActiveNav('home');
    submitComposerQuery(topic.title);
  };

  const categoryColors: Record<string, string> = {
    Weather: '#38bdf8',
    Agriculture: '#10b981',
    Market: '#c084fc',
    Policy: '#f59e0b',
    Research: '#06b6d4'
  };

  return (
    <main className="x-center-feed">
      {/* Sticky Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderBottom: '1px solid var(--border)', padding: '12px 16px'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
          Explore
        </h1>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: activeCategory === cat ? '#EFF3F4' : '#16181C',
                color: activeCategory === cat ? '#0F1419' : '#A0A5AA',
                border: '1px solid var(--border)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {activeCategory === 'All' && trendingTopics.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp style={{ width: '16px', height: '16px', color: '#FFFFFF' }} />
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
              Trending in Intelligence
            </span>
          </div>

          {trendingTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="x-card-row"
              style={{ padding: '12px 16px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span style={{ color: categoryColors[topic.category] || 'var(--text-muted)' }}>{topic.category}</span>
                  <span>·</span>
                  <span>Trending</span>
                </div>
                <ArrowUpRight style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.3 }}>
                {topic.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                {topic.subtitle}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>{topic.postCount}</span>
                <span>·</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Layers style={{ width: '10px', height: '10px' }} />
                  {topic.relatedModules.map((m) => `M${m}`).join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Topics */}
      <div>
        {filteredTopics.map((topic, idx) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className="x-post-item"
            style={{ cursor: 'pointer' }}
          >
            {/* Index Number */}
            <div style={{
              width: '28px', fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'var(--text-muted)', textAlign: 'center', flexShrink: 0, paddingTop: '2px'
            }}>
              {idx + 1}
            </div>

            {/* Topic Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span style={{
                  padding: '1px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 600,
                  backgroundColor: `${categoryColors[topic.category]}15`,
                  color: categoryColors[topic.category],
                  border: `1px solid ${categoryColors[topic.category]}30`
                }}>
                  {topic.category}
                </span>
                {topic.region && <span>· {topic.region}</span>}
                {topic.trending && (
                  <span style={{ color: '#f43f5e', fontWeight: 600 }}>🔥 Trending</span>
                )}
              </div>

              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.3 }}>
                {topic.title}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                {topic.subtitle}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{topic.postCount}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {topic.relatedModules.map((m) => (
                    <button
                      key={m}
                      onClick={(e) => {
                        e.stopPropagation();
                        const port = 3000 + m;
                        openModuleWorkspace(m, port, `Module ${m}`);
                      }}
                      style={{
                        padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                        backgroundColor: 'rgba(24,169,232,0.08)', color: 'var(--blue-bright)',
                        border: '1px solid rgba(24,169,232,0.2)',
                        cursor: 'pointer'
                      }}
                    >
                      M{m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
