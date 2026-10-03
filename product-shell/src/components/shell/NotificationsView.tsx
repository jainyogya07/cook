'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Notifications View (X-Style Alert Feed with Hazard/Module/AI Categories)
// ============================================================================

import React, { useState } from 'react';
import {
  AlertTriangle,
  Cpu,
  Sparkles,
  AtSign,
  Radio,
  Check,
  CheckCheck,
  ArrowUpRight
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { ShellNotification } from '@/types/shell';

export default function NotificationsView() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    openModuleWorkspace,
    unreadNotificationCount
  } = useShellStore();

  const [filter, setFilter] = useState<'all' | 'hazard_alert' | 'module_complete' | 'ai_response' | 'mention'>('all');

  const filteredNotifs = filter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === filter);

  const getNotifIcon = (type: ShellNotification['type']) => {
    switch (type) {
      case 'hazard_alert': return <AlertTriangle style={{ width: '16px', height: '16px' }} />;
      case 'module_complete': return <Cpu style={{ width: '16px', height: '16px' }} />;
      case 'ai_response': return <Sparkles style={{ width: '16px', height: '16px' }} />;
      case 'mention': return <AtSign style={{ width: '16px', height: '16px' }} />;
      case 'system': return <Radio style={{ width: '16px', height: '16px' }} />;
      default: return <Radio style={{ width: '16px', height: '16px' }} />;
    }
  };

  const getNotifColor = (type: ShellNotification['type'], severity?: string) => {
    if (severity === 'CRITICAL') return '#ef4444';
    if (severity === 'HIGH') return '#f97316';
    if (severity === 'ELEVATED') return '#f59e0b';
    switch (type) {
      case 'hazard_alert': return '#ef4444';
      case 'module_complete': return '#10b981';
      case 'ai_response': return '#0ea5e9';
      case 'mention': return '#c084fc';
      case 'system': return '#38bdf8';
      default: return '#9BAFC3';
    }
  };

  const filterTabs: { id: typeof filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'hazard_alert', label: 'Hazard Alerts' },
    { id: 'module_complete', label: 'Modules' },
    { id: 'ai_response', label: 'AI Responses' },
    { id: 'mention', label: 'Mentions' }
  ];

  return (
    <main className="x-center-feed">
      {/* Sticky Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            Notifications
          </h1>
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              style={{
                fontSize: '12px', fontWeight: 600, color: '#E7E9EA',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <CheckCheck style={{ width: '14px', height: '14px' }} />
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`x-tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? '#FFFFFF' : '#71767B',
                  fontWeight: isActive ? 700 : 500
                }}
              >
                <span>{tab.label}</span>
                {isActive && <div className="x-tab-indicator" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Items */}
      <div>
        {filteredNotifs.length === 0 && (
          <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            No notifications in this category
          </div>
        )}

        {filteredNotifs.map((notif) => {
          const iconColor = getNotifColor(notif.type, notif.severity);

          return (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.actionModuleNumber && notif.actionPort) {
                  openModuleWorkspace(notif.actionModuleNumber, notif.actionPort, notif.title);
                }
              }}
              className="x-post-item"
              style={{
                cursor: 'pointer',
                backgroundColor: notif.read ? 'transparent' : 'rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Icon/Avatar */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '9999px',
                backgroundColor: `${iconColor}15`, border: `1px solid ${iconColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: iconColor, flexShrink: 0
              }}>
                {notif.sourceAvatar && notif.sourceAvatar.length <= 3 ? (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{notif.sourceAvatar}</span>
                ) : (
                  getNotifIcon(notif.type)
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                      {notif.title}
                    </span>
                    {!notif.read && (
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#FFFFFF'
                      }} />
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {notif.timestamp}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {notif.message}
                </div>

                {notif.severity && (
                  <div style={{ marginTop: '6px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                      backgroundColor: `${iconColor}15`, color: iconColor, border: `1px solid ${iconColor}30`
                    }}>
                      {notif.severity}
                    </span>
                  </div>
                )}

                {notif.actionModuleNumber && (
                  <div style={{
                    marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', color: '#FFFFFF', fontWeight: 600
                  }}>
                    <span>Open Module {notif.actionModuleNumber}</span>
                    <ArrowUpRight style={{ width: '12px', height: '12px' }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
