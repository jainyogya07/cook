'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Left Sidebar (Ultra-Luxury Glass Floating Command Deck)
// 260px desktop width, 15px font-medium, spring hover motion,
// luminous white action pill with ambient glass shadow.
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Bell,
  Bot,
  Sparkles,
  Bookmark,
  User,
  MoreHorizontal,
  Layers,
  Database,
  HelpCircle,
  Activity,
  Zap,
  BookOpen
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { LeftNavTab } from '@/types/shell';
import { t } from '@/i18n/copy';

export default function LeftSidebar() {
  const {
    activeNav,
    setActiveNav,
    setModelsDrawerOpen,
    setFieldGuideOpen,
    setDatasetModalOpen,
    unreadNotificationCount,
    bookmarks,
    userProfile,
    locale,
    setLocale
  } = useShellStore();

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as LeftNavTab, label: t(locale, 'home'), icon: Home },
    { id: 'explore' as LeftNavTab, label: t(locale, 'explore'), icon: Compass },
    { id: 'alerts' as LeftNavTab, label: t(locale, 'alerts'), icon: Bell, badge: unreadNotificationCount > 0 ? `${unreadNotificationCount}` : undefined },
    { id: 'ai' as LeftNavTab, label: t(locale, 'chat'), icon: Bot },
    { id: 'intelligence' as LeftNavTab, label: t(locale, 'engines'), icon: Sparkles },
    { id: 'saved' as LeftNavTab, label: t(locale, 'saved'), icon: Bookmark, badge: bookmarks.length > 0 ? `${bookmarks.length}` : undefined },
    { id: 'subscription' as LeftNavTab, label: t(locale, 'plans'), icon: Zap },
    { id: 'profile' as LeftNavTab, label: t(locale, 'you'), icon: User },
  ];

  return (
    <nav
      className="glass flex h-full min-h-0 flex-col p-3 scroll-y"
      style={{
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* 1. ATMOS 4D Brand Header with Handcrafted National Emblem */}
      <div
        onClick={() => setActiveNav('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          padding: '6px 8px',
          borderRadius: '16px',
          transition: 'all 0.2s ease',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(212, 175, 55, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            border: '1.5px solid rgba(212, 175, 55, 0.65)',
            boxShadow: '0 0 18px rgba(212, 175, 55, 0.22), inset 0 0 8px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#05070B',
            flexShrink: 0
          }}
        >
          <img
            src="/emblem.jpg"
            alt="Bharatiya Mausam aur Krishi Vigyan Emblem"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.18)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1px',
              right: '1px',
              width: '7px',
              height: '7px',
              borderRadius: '9999px',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981',
              border: '1.5px solid #000'
            }}
            title="Live Coupled Telemetry Online"
          />
        </div>

        <div className="x-logo-text" style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              ATMOS
            </span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: '#E6C65C',
                padding: '1px 5px',
                borderRadius: '4px',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                letterSpacing: '0.04em'
              }}
            >
              भारत
            </span>
          </div>
          <div
            title="From skies to soil"
            style={{
              fontSize: '9px',
              color: '#E6C65C',
              marginTop: '2px',
              fontWeight: 600,
              lineHeight: 1.2
            }}
          >
            मौसम से मंडी तक
          </div>
        </div>
      </div>

        <button
          onClick={() => setFieldGuideOpen(true)}
          className="guide-header-btn"
          title="क्या लिखें, क्या मिलेगा"
          style={{ marginTop: '10px', width: '100%', justifyContent: 'center', fontSize: '11px', padding: '7px 8px' }}
        >
          <BookOpen size={13} />
          गाइड
        </button>
      <ul style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '2px', listStyle: 'none', padding: 0 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <motion.li
              key={item.id}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <button
                onClick={() => {
                  setActiveNav(item.id);
                  if (item.id === 'intelligence') setModelsDrawerOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: '16px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : 'var(--text-1)',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  boxShadow: isActive ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)' : 'none',
                  transition: 'color 0.15s ease, background-color 0.15s ease',
                  cursor: 'pointer',
                  border: 'none',
                  textAlign: 'left'
                }}
              >
                <Icon
                  style={{
                    width: '20px',
                    height: '20px',
                    flexShrink: 0,
                    color: isActive ? '#FFFFFF' : 'var(--text-1)'
                  }}
                />
                <span className="x-nav-label" style={{ flex: 1, whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>

                {item.badge && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      padding: '2px 7px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}

        {/* More Menu Dropdown Item */}
        <li style={{ position: 'relative' }}>
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              padding: '11px 16px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--text-1)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              border: 'none',
              textAlign: 'left',
              transition: 'background-color 0.15s ease'
            }}
          >
            <MoreHorizontal style={{ width: '20px', height: '20px', color: 'var(--text-1)' }} />
            <span className="x-nav-label">More</span>
          </button>

          {/* More Menu Popover */}
          {moreMenuOpen && (
            <>
              {/* Backdrop to close on click outside */}
              <div
                onClick={() => setMoreMenuOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 98,
                  backgroundColor: 'transparent'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '100%',
                  marginBottom: '8px',
                  width: '240px',
                  padding: '8px',
                  zIndex: 99,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  backgroundColor: '#16181C',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.06)'
                }}
              >
              <button
                onClick={() => {
                  setDatasetModalOpen(true);
                  setMoreMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Database style={{ width: '16px', height: '16px', color: '#38BDF8' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFFFFF' }}>Connect Dataset</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-2)' }}>NetCDF, GRIB, CSV, Zarr</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setModelsDrawerOpen(true);
                  setMoreMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Layers style={{ width: '16px', height: '16px', color: '#34D399' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFFFFF' }}>18-Model Catalog</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-2)' }}>Atmospheric to Market</div>
                </div>
              </button>

              <div style={{ height: '1px', backgroundColor: 'var(--stroke)', margin: '4px 0' }} />

              <button
                onClick={() => setMoreMenuOpen(false)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <Activity style={{ width: '16px', height: '16px', color: '#10B981' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFFFFF' }}>Mesh Observability</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-2)' }}>18 engines online</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setFieldGuideOpen(true);
                  setMoreMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <HelpCircle style={{ width: '16px', height: '16px', color: '#F5D77F' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFFFFF' }}>Operator Field Guide</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-2)' }}>What to enter for each engine</div>
                </div>
              </button>
            </div>
            </>
          )}
        </li>
      </ul>

      {/* 2.5 Atmos Pro Membership Teaser Card (Fills empty vertical void) */}
      <div className="sidebar-pro-card" style={{ marginTop: 'auto', paddingTop: '16px', paddingBottom: '12px' }}>
        <div
          onClick={() => setActiveNav('subscription')}
          className="glass-sm"
          style={{
            padding: '14px',
            borderRadius: '18px',
            cursor: 'pointer',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.04) 100%)',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.45)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#38BDF8',
                letterSpacing: '0.06em',
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)'
              }}
            >
              ⚡ ATMOS PRO
            </span>
            <span style={{ fontSize: '11px', color: '#A855F7', fontWeight: 600 }}>Tiers</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>
            बेहतर नक्शा, मंडी भाव
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-2)', marginTop: '4px', lineHeight: 1.4 }}>
            गाँव-स्तर का मौसम और मंडी सलाह।
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '11px', fontWeight: 600, color: '#38BDF8' }}>
            <span>Plans →</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Action Button: "✦ Ask Atmos" */}
      <div style={{ paddingTop: '4px' }}>
          <button
            onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
            style={{ width: '100%', marginBottom: 8, padding: '8px 10px', borderRadius: 12, border: '1px solid var(--stroke)', background: 'transparent', color: '#E2E8F0', fontSize: 12 }}
          >
            {locale === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button
            onClick={() => setActiveNav('ai')}
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#050506',
            fontWeight: 700,
            fontSize: '13px',
            borderRadius: '9999px',
            padding: '11px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px -10px rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        >
          <Sparkles style={{ width: '18px', height: '18px', color: '#050506' }} />
          <span className="x-post-label">{t(locale, 'ask')}</span>
        </button>
      </div>

      {/* 4. Bottom Profile Card */}
      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--stroke)' }}>
        <button
          onClick={() => setActiveNav('profile')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 8px',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--stroke)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '12px'
              }}
            >
              {userProfile.avatarInitials}
            </div>
            <div className="x-user-details" style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                {userProfile.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>
                @{userProfile.handle}
              </div>
            </div>
          </div>
          <MoreHorizontal className="x-user-details" style={{ width: '16px', height: '16px', color: 'var(--text-2)' }} />
        </button>
      </div>
    </nav>
  );
}
