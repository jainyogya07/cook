'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Newspaper, Bell, Boxes, Compass, Zap, MessageSquare, FlaskConical } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { t } from '@/i18n/copy';

export type StoredChat = { id: string; title: string; updatedAt: number };

const KEY = 'atmos_chat_index';

export function readChatIndex(): StoredChat[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as StoredChat[];
  } catch {
    return [];
  }
}

export function writeChatIndex(rows: StoredChat[]) {
  localStorage.setItem(KEY, JSON.stringify(rows.slice(0, 40)));
  window.dispatchEvent(new Event('atmos-chats-changed'));
}

export default function ChatHistoryRail() {
  const { setActiveNav, locale, accessPlan, unreadNotificationCount } = useShellStore();
  const [chats, setChats] = useState<StoredChat[]>([]);

  useEffect(() => {
    const pull = () => setChats(readChatIndex());
    pull();
    window.addEventListener('atmos-chats-changed', pull);
    return () => window.removeEventListener('atmos-chats-changed', pull);
  }, []);

  return (
    <aside className="gpt-rail">
      <button type="button" className="gpt-new" onClick={() => { setActiveNav('ai'); window.dispatchEvent(new Event('atmos-new-chat')); }}>
        <Plus size={15} /> {t(locale, 'newChat')}
      </button>
      <div className="gpt-hist">
        {chats.length === 0 ? <p className="nv-hint">{t(locale, 'noChats')}</p> : chats.map((chat) => (
          <button key={chat.id} type="button" className="gpt-hist-item" onClick={() => { setActiveNav('ai'); window.dispatchEvent(new CustomEvent('atmos-load-chat', { detail: chat.id })); }}>
            <MessageSquare size={13} />
            <span>{chat.title}</span>
          </button>
        ))}
      </div>
      <nav className="gpt-jump">
        <button type="button" onClick={() => setActiveNav('news')}><Newspaper size={14} /> {t(locale, 'news')}</button>
        <button type="button" onClick={() => setActiveNav('alerts')}><Bell size={14} /> {t(locale, 'alerts')}{unreadNotificationCount ? ` (${unreadNotificationCount})` : ''}</button>
        <button type="button" onClick={() => setActiveNav('models')}><Boxes size={14} /> {t(locale, 'models')}</button>
        <button type="button" onClick={() => setActiveNav('research')}><FlaskConical size={14} /> {t(locale, 'research')}</button>
        <button type="button" onClick={() => setActiveNav('explore')}><Compass size={14} /> {t(locale, 'explore')}</button>
        <button type="button" onClick={() => setActiveNav('subscription')}><Zap size={14} /> {accessPlan === 'pro' ? t(locale, 'proOn') : t(locale, 'plans')}</button>
      </nav>
    </aside>
  );
}
