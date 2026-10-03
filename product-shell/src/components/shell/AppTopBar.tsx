'use client';

import React from 'react';
import { Bot, Newspaper, Boxes, Compass, Bell, Zap, User } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { LeftNavTab } from '@/types/shell';
import { t } from '@/i18n/copy';

export default function AppTopBar() {
  const { activeNav, setActiveNav, unreadNotificationCount, locale, setLocale, userProfile, accessPlan } = useShellStore();

  const items: { id: LeftNavTab; label: string; icon: typeof Bot }[] = [
    { id: 'ai', label: t(locale, 'ask'), icon: Bot },
    { id: 'news', label: t(locale, 'news'), icon: Newspaper },
    { id: 'models', label: t(locale, 'models'), icon: Boxes },
    { id: 'explore', label: t(locale, 'explore'), icon: Compass },
    { id: 'alerts', label: t(locale, 'alerts'), icon: Bell }
  ];

  return (
    <header className="nv-topbar">
      <button className="nv-brand" type="button" onClick={() => setActiveNav('ai')}>
        <img src="/emblem.jpg" alt="" />
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
        <button type="button" className="nv-chip" onClick={() => setLocale(locale === 'hi' ? 'en' : 'hi')}>
          {locale === 'hi' ? 'EN' : 'हि'}
        </button>
        <button type="button" className="nv-chip" onClick={() => setActiveNav('subscription')}>
          <Zap size={13} /> {t(locale, 'plans')}
        </button>
        <button type="button" className="nv-chip nv-user" onClick={() => setActiveNav('profile')}>
          <User size={13} />
          {userProfile.name.split(' ')[0]}
          {accessPlan === 'guest' ? '' : ''}
        </button>
      </div>
    </header>
  );
}
