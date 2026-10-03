'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Cpu, Sparkles, AtSign, Radio, CheckCheck } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { ShellNotification } from '@/types/shell';
import { t } from '@/i18n/copy';

export default function NotificationsView() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    openModuleWorkspace,
    unreadNotificationCount,
    locale
  } = useShellStore();
  const hi = locale === 'hi';
  const [filter, setFilter] = useState<'all' | ShellNotification['type']>('all');
  const rows = filter === 'all' ? notifications : notifications.filter((item) => item.type === filter);

  const tabs: { id: typeof filter; label: string }[] = [
    { id: 'all', label: hi ? 'सब' : 'All' },
    { id: 'hazard_alert', label: hi ? 'खतरा' : 'Hazard' },
    { id: 'module_complete', label: hi ? 'इंजन' : 'Engines' },
    { id: 'ai_response', label: hi ? 'जवाब' : 'Answers' },
    { id: 'mention', label: hi ? 'आपके नाम' : 'Mentions' }
  ];

  const icon = (type: ShellNotification['type']) => {
    if (type === 'hazard_alert') return <AlertTriangle size={14} />;
    if (type === 'module_complete') return <Cpu size={14} />;
    if (type === 'ai_response') return <Sparkles size={14} />;
    if (type === 'mention') return <AtSign size={14} />;
    return <Radio size={14} />;
  };

  return (
    <div className="nv-page">
      <div className="nv-page-head">
        <p>{t(locale, 'alerts')}</p>
        <h1>{hi ? 'चेतावनियाँ, अलग कार्ड में' : 'Alerts, one card each'}</h1>
        <span>{hi ? 'शुरुआत: लाल कार्ड पहले पढ़ो। उन्नत: इंजन खोलो।' : 'Beginner: read the red cards first. Advanced: open the engine.'}</span>
      </div>
      <div className="nv-filters">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" className={filter === tab.id ? 'is-active' : ''} onClick={() => setFilter(tab.id)}>
            {tab.label}
          </button>
        ))}
        {unreadNotificationCount > 0 && (
          <button type="button" onClick={markAllNotificationsRead}>
            <CheckCheck size={13} /> {hi ? 'सब पढ़ी' : 'Mark all read'}
          </button>
        )}
      </div>
      <div className="nv-catalog">
        {rows.length === 0 ? (
          <div className="nv-empty">{hi ? 'इस सूची में अभी कुछ नहीं।' : 'Nothing in this list yet.'}</div>
        ) : rows.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            className={`nv-feature-card${item.read ? '' : ' is-unread'}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => {
              markNotificationRead(item.id);
              if (item.actionModuleNumber && item.actionPort) {
                openModuleWorkspace(item.actionModuleNumber, item.actionPort, item.title);
              }
            }}
          >
            <div className="nv-feature-top">
              <span>{icon(item.type)} {item.severity || item.type.replace('_', ' ')}</span>
              <em>{item.timestamp}</em>
            </div>
            <h2>{item.title}</h2>
            <p>{item.message}</p>
            {item.actionModuleNumber ? (
              <div className="nv-tags">
                <i>{hi ? 'इंजन खोलें' : 'Open engine'} M{String(item.actionModuleNumber).padStart(2, '0')}</i>
              </div>
            ) : null}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
