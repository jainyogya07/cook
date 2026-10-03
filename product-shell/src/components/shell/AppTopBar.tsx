'use client';

import React, { useEffect } from 'react';
import { Bot, Newspaper, Boxes, Compass, Bell, Zap, BookOpen, Sun, Moon, FlaskConical } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { LeftNavTab } from '@/types/shell';
import { t } from '@/i18n/copy';
import AtmosAnimatedLogo from '@/components/common/AtmosAnimatedLogo';

export default function AppTopBar() {
  const { activeNav, setActiveNav, unreadNotificationCount, locale, setLocale, userProfile, accessPlan, setFieldGuideOpen, uiTheme, setUiTheme } = useShellStore();

  useEffect(() => {
    document.documentElement.dataset.theme = uiTheme;
  }, [uiTheme]);

  const items: { id: LeftNavTab; label: string; icon: typeof Bot }[] = [
    { id: 'ai', label: t(locale, 'ask'), icon: Bot },
    { id: 'news', label: t(locale, 'news'), icon: Newspaper },
    { id: 'models', label: t(locale, 'models'), icon: Boxes },
    { id: 'research', label: t(locale, 'research'), icon: FlaskConical },
    { id: 'explore', label: t(locale, 'explore'), icon: Compass },
    { id: 'alerts', label: t(locale, 'alerts'), icon: Bell }
  ];

  return (
    <header className="nv-topbar">
      <button className="nv-brand" type="button" onClick={() => setActiveNav('ai')}>
        <AtmosAnimatedLogo size={32} variant="rich" showBadge={false} interactive={false} />
        <div>
          <strong>ATMOS 4D</strong>
          <span>{t(locale, 'landingKicker')}</span>
        </div>
      </button>

      <nav className="nv-tabs">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeNav === item.id || (item.id === 'ai' && activeNav === 'home');
          return (
            <button
              key={item.id}
              type="button"
              className={`nv-tab${active ? ' is-active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon size={15} />
              {item.label}
              {item.id === 'alerts' && unreadNotificationCount > 0 ? (
                <em>{unreadNotificationCount}</em>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="nv-actions">
        <button type="button" className="nv-chip" onClick={() => setFieldGuideOpen(true)}>
          <BookOpen size={13} /> {t(locale, 'guidebook')}
        </button>
        <button type="button" className="nv-chip" onClick={() => setLocale(locale === 'hi' ? 'en' : 'hi')}>
          {locale === 'hi' ? 'EN' : 'हि'}
        </button>
        <button type="button" className="nv-chip" onClick={() => setUiTheme(uiTheme === 'field' ? 'night' : 'field')}>
          {uiTheme === 'field' ? <Moon size={13} /> : <Sun size={13} />}
          {uiTheme === 'field' ? 'Night' : 'Field'}
        </button>
        <button type="button" className="nv-chip" onClick={() => setActiveNav('subscription')}>
          <Zap size={13} /> {t(locale, 'plans')}
        </button>
        <button type="button" className="nv-chip nv-user" onClick={() => setActiveNav('profile')}>
          <span className="nv-user-av">{userProfile.avatarInitials}</span>
          {userProfile.name.split(' ')[0]}
          {accessPlan === 'pro' ? ` · ${t(locale, 'proPlan')}` : ''}
        </button>
      </div>
    </header>
  );
}
