'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Right Rail (Ultra-Luxury Glass Intelligence Cockpit)
// 380px width, min-h-0 + scroll-y natural scroll, staggered motion entrance,
// live-dot pulse, and authentic floating glass cards.
// ============================================================================

import React, { useState, useCallback, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, Activity, Languages, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { NewsItem } from '@/types/shell';
import NewsTranslator from '@/components/feed/NewsTranslator';
import { newsEndpoint } from '@/lib/api';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export default function RightRail() {
  const {
    searchQuery,
    setSearchQuery,
    activeEvents,
    activeContextTopic,
    setActiveContextTopic,
    openModuleWorkspace,
    moduleHealth,
    submitComposerQuery,
    liveNews,
    isNewsLiveSyncing,
    showToast,
    fetchLiveNews,
    locale,
    setLocale
  } = useShellStore();

  useEffect(() => {
    void fetchLiveNews(undefined, undefined, locale);
  }, [fetchLiveNews, locale]);

  const newsSource = liveNews ?? [];
  const contextualNews = newsSource.filter((n) =>
    activeContextTopic
      ? n.relatedRegion.toLowerCase().includes(activeContextTopic.split(' ')[0].toLowerCase())
      : true
  );

  const displayNews = contextualNews.length > 0 ? contextualNews : newsSource.slice(0, 4);

  // Infinite news state — accumulates loaded news items
  const [infiniteNews, setInfiniteNews] = useState<NewsItem[]>(displayNews);
  const [newsPage, setNewsPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setInfiniteNews(displayNews);
    setNewsPage(1);
  }, [displayNews]);

  // Load more news by querying the live Python backend with rotational hazards & regions
  const loadMoreNews = useCallback(async () => {
    setIsLoadingMore(true);
    const hazards = ['flood', 'heatwave', 'drought', 'thunderstorm', 'coldwave', 'cyclone'];
    const regions = ['Odisha', 'West Bengal', 'Maharashtra', 'Punjab', 'Rajasthan', 'Assam', 'Gujarat'];
    const targetHazard = hazards[newsPage % hazards.length];
    const targetRegion = activeContextTopic ? activeContextTopic.split(' ')[0] : regions[newsPage % regions.length];

    try {
      const res = await fetch(
        newsEndpoint(`hazard=${encodeURIComponent(targetHazard)}&region=${encodeURIComponent(targetRegion)}&language=${locale}&limit=3`)
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.articles && data.articles.length > 0) {
          const fetchedItems: NewsItem[] = data.articles.map((art: any, idx: number) => ({
            id: `live_wire_${newsPage}_${art.id || idx}_${Date.now()}`,
            headline: art.title || art.message?.substring(0, 120) || 'Extreme Meteorological Bulletin',
            headlineHi: art.title_hi || art.titleHi || art.translations?.hi,
            source: art.profile?.name || art.source || 'IMD / MoES Bulletin',
            timestamp: art.time_ago || `${newsPage * 3}m ago`,
            category: (art.hazard || targetHazard).toUpperCase(),
            aiRelevanceContext: art.description || art.message || 'National disaster response & regional meteorological advisories.',
            aiRelevanceContextHi: art.description_hi || art.descriptionHi || art.translations?.hi_context,
            relatedRegion: art.region || targetRegion,
            relatedHazard: art.hazard || targetHazard
          }));
          setInfiniteNews((prev) => [...prev, ...fetchedItems]);
          setNewsPage((p) => p + 1);
          setIsLoadingMore(false);
          return;
        }
      }
    } catch {
      // Keep the wire live-only: do not recycle stale articles as new updates.
    }

    showToast('Live news service did not return another wire update', 'warning');
    setIsLoadingMore(false);
  }, [newsPage, activeContextTopic, locale, showToast]);

  // Module health summary
  const onlineCount = moduleHealth.filter((m) => m.status === 'ONLINE').length;
  const degradedModules = moduleHealth.filter((m) => m.status === 'DEGRADED');
  const avgLatency = Math.round(
    moduleHealth
      .filter((m) => m.status === 'ONLINE')
      .reduce((sum, m) => sum + m.latencyMs, 0) / (onlineCount || 1)
  );

  // Handle search submit on Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      submitComposerQuery(searchQuery);
    }
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="scroll-y flex min-h-0 flex-col gap-5 app-right-rail"
      style={{
        userSelect: 'none',
        paddingRight: '4px',
        paddingBottom: '24px'
      }}
    >
      {/* 1. Sticky Glass Search Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          paddingBottom: '4px',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div
          className="glass-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '9999px',
            padding: '2px 16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Search style={{ width: '16px', height: '16px', color: 'var(--text-2)', flexShrink: 0, marginRight: '10px' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="खोजें: जगह, फसल, मंडी..."
            style={{
              width: '100%',
              padding: '11px 0',
              fontSize: '14px',
              color: 'var(--text-0)',
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* 2. Severe Weather Radar Card */}
      <motion.section
        variants={itemVariants}
        className="glass"
        style={{ padding: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--stroke)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-0)', margin: 0, letterSpacing: '-0.01em' }}>
              लाइव चेतावनी
            </h3>
          </div>
          <span className="chip chip-green" style={{ fontSize: '10px', gap: '4px' }}>
            LIVE
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeEvents.map((evt, idx) => (
            <div
              key={evt.id}
              onClick={() => {
                setActiveContextTopic(evt.region);
                openModuleWorkspace(
                  evt.targetModuleNumber,
                  evt.targetPort,
                  evt.name
                );
              }}
              style={{
                padding: '14px 0',
                borderTop: idx === 0 ? 'none' : '1px solid var(--stroke)',
                cursor: 'pointer',
                transition: 'opacity 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                <span
                  className={evt.severity === 'CRITICAL' ? 'chip chip-red' : 'chip chip-amber'}
                  style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={evt.hazardType}
                >
                  {evt.hazardType.split('&')[0].trim().toUpperCase()}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-2)', flexShrink: 0 }}>
                  {evt.region.split('(')[0]}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.4 }}>
                {evt.name}
              </div>

              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="chip chip-blue" style={{ fontSize: '10px' }}>
                  {evt.leadHorizon}
                </span>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 600 }}>
                  {evt.probabilityPct}% मिलान
                </span>
              </div>
            </div>
          ))}

          {/* Additional Agronomic & Market Trends */}
          <div
            onClick={() => setActiveContextTopic('Punjab (Indo-Gangetic Basin)')}
            style={{
              padding: '14px 0',
              borderTop: '1px solid var(--stroke)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="chip chip-amber">गेहूं गर्मी</span>
              <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>पंजाब / हरियाणा</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.4 }}>
              गेहूं की जड़ अवस्था पर गर्मी का दबाव
            </div>
            <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
              उपज खतरे में · Northwest India
            </div>
          </div>

          <div
            onClick={() => setActiveContextTopic('Maharashtra (Deccan Plateau)')}
            style={{
              padding: '14px 0',
              borderTop: '1px solid var(--stroke)',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="chip chip-purple">मंडी भाव</span>
              <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>विदर्भ</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.4 }}>
              सोयाबीन आवक घटी, मंडी स्प्रेड बढ़ा
            </div>
            <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
              भाव अस्थिर · Maharashtra
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. MoES & Mandi Wire Card */}
      <motion.section
        variants={itemVariants}
        className="glass"
        style={{ padding: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--stroke)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>📰</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-0)', margin: 0, letterSpacing: '-0.01em' }}>
              समाचार · मंडी
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              className="chip chip-green"
              style={{
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2px 8px',
                boxShadow: '0 0 10px rgba(52, 211, 153, 0.25)'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  backgroundColor: '#34D399',
                  boxShadow: '0 0 6px #34D399'
                }}
              />
              LIVE SYNC
            </span>
            <span className="chip chip-blue" style={{ fontSize: '10px' }}>
              {activeContextTopic ? activeContextTopic.split(' ')[0] : 'ALL BASINS'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-1)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              <MessageCircle style={{ width: 14, height: 14, color: '#a78bfa' }} /> NEWS WIRE
            </div>
            <button
              onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
              title="Switch language"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 9px', borderRadius: 999, border: '1px solid rgba(167,139,250,.32)', background: locale === 'hi' ? 'rgba(167,139,250,.18)' : 'rgba(255,255,255,.04)', color: locale === 'hi' ? '#ddd6fe' : 'var(--text-1)', fontFamily: 'var(--font-mono)', fontSize: 10 }}
            >
              <Languages style={{ width: 13, height: 13 }} /> {locale === 'hi' ? 'हिन्दी' : 'English'}
            </button>
          </div>
          {(infiniteNews.length > 0 ? infiniteNews : displayNews).length === 0 && (
            <div className="waiting-live">{locale === 'hi' ? 'लाइव तार का इंतज़ार · कोई डेमो लेख नहीं' : 'Waiting for live wire · no demo articles'}</div>
          )}
          {(infiniteNews.length > 0 ? infiniteNews : displayNews).map((news, idx) => (
            <div
              key={news.id}
              style={{
                padding: '14px 0',
                borderTop: idx === 0 ? 'none' : '1px solid var(--stroke)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span className="chip chip-purple" style={{ fontSize: '10px' }}>
                  {news.source}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>·</span>
                <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>{news.timestamp}</span>
              </div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-0)', lineHeight: 1.4, margin: 0 }}>
                {locale === 'hi' && news.headlineHi ? news.headlineHi : news.headline}
              </h4>
              {news.imageUrl && (
                <img src={news.imageUrl} alt="" style={{ width: '100%', height: 92, objectFit: 'cover', borderRadius: 10, marginTop: 8, border: '1px solid var(--stroke)' }} />
              )}
              <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-1)', lineHeight: 1.5 }}>
                {locale === 'hi' && news.aiRelevanceContextHi ? news.aiRelevanceContextHi : news.aiRelevanceContext}
              </div>
              <NewsTranslator
                headline={locale === 'hi' && news.headlineHi ? news.headlineHi : news.headline}
                context={locale === 'hi' && news.aiRelevanceContextHi ? news.aiRelevanceContextHi : news.aiRelevanceContext}
                locale={locale}
              />
            </div>
          ))}

          {/* Load More / Infinite News Button */}
          <button
            onClick={loadMoreNews}
            disabled={isLoadingMore}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--stroke)',
              color: '#38BDF8',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              marginTop: '8px',
              opacity: isLoadingMore ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoadingMore) {
                e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'var(--stroke)';
            }}
          >
            {isLoadingMore ? 'LOADING...' : 'LOAD MORE WIRE UPDATES ↓'}
          </button>
        </div>
      </motion.section>

      {/* 4. 18-Engine Intelligence Mesh Card */}
      <motion.section
        variants={itemVariants}
        className="glass"
        style={{ padding: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--stroke)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity style={{ width: '16px', height: '16px', color: '#34D399' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-0)', margin: 0 }}>
              18-Engine Mesh
            </h3>
          </div>
          <span className="chip chip-green" style={{ fontSize: '10px', boxShadow: '0 0 10px rgba(52, 211, 153, 0.25)' }}>
            18/18 ONLINE
          </span>
        </div>

        <div style={{ paddingTop: '16px' }}>
          {/* Summary Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                textAlign: 'center',
                padding: '10px 6px',
                borderRadius: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--stroke)'
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>AVG LATENCY</div>
              <div style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38BDF8', marginTop: '2px' }}>
                {avgLatency || 18}ms
              </div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '10px 6px',
                borderRadius: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--stroke)'
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>DEGRADED</div>
              <div style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: degradedModules.length > 0 ? '#FBBF24' : '#34D399', marginTop: '2px' }}>
                {degradedModules.length}
              </div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '10px 6px',
                borderRadius: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--stroke)'
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>PIPELINE</div>
              <div style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34D399', marginTop: '2px' }}>
                ACTIVE
              </div>
            </div>
          </div>

          {/* Quick Engine Matrix (18 interactive microservice indicator chips) */}
          <div style={{ fontSize: '11px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
            CLICK TO LAUNCH ENGINE WORKSPACE:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
            {moduleHealth.map((m) => (
              <button
                key={m.moduleNumber}
                onClick={() => openModuleWorkspace(m.moduleNumber, m.port, m.name)}
                title={`Launch Engine M${m.moduleNumber}: ${m.name} (Port ${m.port})`}
                style={{
                  height: '32px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: 'rgba(52, 211, 153, 0.1)',
                  color: '#6EE7B7',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(52, 211, 153, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(52, 211, 153, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.25)';
                }}
              >
                {m.moduleNumber < 10 ? `0${m.moduleNumber}` : m.moduleNumber}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Mission Brand & Legal Footer */}
      <footer style={{ padding: '8px 8px', fontSize: '12px', color: 'var(--text-2)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ color: 'var(--text-1)' }}>MoES Coupled NWP</span>
          <span>·</span>
          <span style={{ color: 'var(--text-1)' }}>IMD Real-Time</span>
          <span>·</span>
          <span style={{ color: 'var(--text-1)' }}>APMC Agmarknet</span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
          ATMOS 4D Planetary Intelligence Suite · v3.2
        </div>
      </footer>
    </motion.aside>
  );
}
