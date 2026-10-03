'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Global Product Shell Root Page (V3 — Multi-Page & Thread Engine Architecture)
// Orchestrates Feed, Thread (Post Detail), Explore, Notifications, Bookmarks,
// Profile, Module Workspaces with browser URL hash sync.
// ============================================================================

import React, { useEffect, useState } from 'react';
import AppTopBar from '@/components/shell/AppTopBar';
import ChatHistoryRail from '@/components/shell/ChatHistoryRail';
import LivePulseTicker from '@/components/shell/LivePulseTicker';
import NewsDeskView from '@/components/shell/NewsDeskView';
import ModelsCatalogView from '@/components/shell/ModelsCatalogView';
import ResearchView from '@/components/shell/ResearchView';
import ExploreView from '@/components/shell/ExploreView';
import NotificationsView from '@/components/shell/NotificationsView';
import BookmarksView from '@/components/shell/BookmarksView';
import ProfileView from '@/components/shell/ProfileView';
import SubscriptionView from '@/components/shell/SubscriptionView';
import ThreadView from '@/components/feed/ThreadView';
import ReplyModal from '@/components/feed/ReplyModal';
import AtmosphericBackgroundCanvas from '@/components/canvas/BackgroundCanvas';
import IntelligenceModelsDrawer from '@/components/shell/IntelligenceModelsDrawer';
import AtmosAIChatModal from '@/components/ai/AtmosAIChatModal';
import AtmosAIChatView from '@/components/ai/AtmosAIChatView';
import DatasetUploadModal from '@/components/shell/DatasetUploadModal';
import ToastNotification from '@/components/shell/ToastNotification';
import { useShellStore } from '@/services/useShellStore';
import AuthScreen from '@/components/auth/AuthScreen';
import PublicLandingPage from '@/components/landing/PublicLandingPage';
import AuthLoadingScreen from '@/components/shell/AuthLoadingScreen';
import EngineFieldGuide from '@/components/shell/EngineFieldGuide';
import { t } from '@/i18n/copy';
import { authEndpoint } from '@/lib/api';
import { GUEST_USER_PROFILE } from '@/data/mockFeedData';

const AUTH_BYPASS = process.env.NEXT_PUBLIC_AUTH_BYPASS === 'true';
const TOKEN_KEY = 'atmos_auth_token';
const SESSION_KEY = 'atmos_session_active';
const GUEST_KEY = 'atmos_guest_browse';

const APP_HASHES = new Set([
  'ask',
  'feed',
  'explore',
  'alerts',
  'bookmarks',
  'subscription',
  'profile',
  'ai_chat',
  'news',
  'models',
  'research',
  'auth'
]);

type AuthenticatedOperator = {
  id: number;
  email: string;
  name: string;
  plan?: 'free' | 'pro';
};

function syncAuthenticatedOperator(user: AuthenticatedOperator) {
  const name = user.name.trim() || user.email.split('@')[0];
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'OP';
  const handle = user.email
    .split('@')[0]
    .replace(/[^a-zA-Z0-9_]/g, '')
    .slice(0, 24) || 'operator';
  const plan = user.plan === 'pro' ? 'pro' : 'free';

  useShellStore.setState((state) => ({
    accessPlan: plan,
    userProfile: {
      ...state.userProfile,
      name,
      handle,
      avatarInitials: initials,
      roleBadge: plan === 'pro' ? 'Atmos Pro' : 'Free operator',
      plan
    }
  }));
  localStorage.setItem('atmos_operator', JSON.stringify({ name, handle, avatarInitials: initials, plan }));
}

function CenterViewRouter() {
  const { activeView } = useShellStore();

  switch (activeView) {
    case 'explore':
      return <ExploreView />;
    case 'news':
      return <NewsDeskView />;
    case 'models':
      return <ModelsCatalogView />;
    case 'research':
      return <ResearchView />;
    case 'alerts':
      return <NotificationsView />;
    case 'bookmarks':
      return <BookmarksView />;
    case 'subscription':
      return <SubscriptionView />;
    case 'ai_chat':
    case 'feed':
      return <AtmosAIChatView />;
    case 'profile':
      return <ProfileView />;
    case 'post_detail':
      return <ThreadView />;
    default:
      return <AtmosAIChatView />;
  }
}

export default function ProductShellHome() {
  const { accessPlan, locale, setAccessPlan } = useShellStore();
  const [authReady, setAuthReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState(false);
  const [guest, setGuest] = useState(false);

  const openAuth = () => {
    sessionStorage.setItem('atmos_access_requested', 'true');
    localStorage.removeItem(GUEST_KEY);
    setGuest(false);
    setAuthMode(true);
    window.history.replaceState({ atmosRoute: 'auth' }, '', '#auth');
  };

  const openGuest = () => {
    localStorage.setItem(GUEST_KEY, 'true');
    setGuest(true);
    setAccessPlan('guest');
    useShellStore.setState({ userProfile: GUEST_USER_PROFILE, accessPlan: 'guest' });
    window.history.replaceState({ atmosRoute: 'app' }, '', '#feed');
  };

  const completeAuthentication = (user: AuthenticatedOperator) => {
    syncAuthenticatedOperator(user);
    localStorage.setItem(SESSION_KEY, 'true');
    localStorage.removeItem(GUEST_KEY);
    sessionStorage.setItem('atmos_access_requested', 'true');
    setGuest(false);
    setAuthenticated(true);
    window.history.replaceState({ atmosRoute: 'app' }, '', '#feed');
  };

  useEffect(() => {
    const requestAuth = () => openAuth();
    window.addEventListener('atmos-open-auth', requestAuth);
    return () => window.removeEventListener('atmos-open-auth', requestAuth);
  }, []);

  useEffect(() => {
    if (AUTH_BYPASS) {
      localStorage.setItem(SESSION_KEY, 'true');
      sessionStorage.setItem('atmos_access_requested', 'true');
      setAuthenticated(true);
      setAuthReady(true);
      useShellStore.setState((state) => ({
        accessPlan: 'pro',
        userProfile: state.userProfile.name === 'Guest'
          ? { ...state.userProfile, name: 'Operator', handle: 'operator', avatarInitials: 'OP', roleBadge: 'Atmos Pro', plan: 'pro' }
          : { ...state.userProfile, plan: 'pro' }
      }));
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);
    const savedLocale = localStorage.getItem('atmos_locale');
    if (savedLocale === 'hi' || savedLocale === 'en') {
      useShellStore.setState({ locale: savedLocale });
    }
    const guestBrowse = localStorage.getItem(GUEST_KEY) === 'true';
    if (!token) {
      if (guestBrowse) {
        setGuest(true);
        setAccessPlan('guest');
        useShellStore.setState({ userProfile: GUEST_USER_PROFILE, accessPlan: 'guest' });
      }
      setAuthMode(window.location.hash === '#auth');
      setAuthReady(true);
      return;
    }

    setAuthenticated(true);
    setAuthReady(true);
    try {
      const cached = localStorage.getItem('atmos_operator');
      if (cached) {
        const operator = JSON.parse(cached) as { name: string; handle: string; avatarInitials: string; plan?: 'guest' | 'free' | 'pro' };
        const opPlan = operator.plan === 'pro' ? 'pro' : 'free';
        useShellStore.setState((state) => ({
          accessPlan: opPlan,
          userProfile: {
            ...state.userProfile,
            ...operator,
            roleBadge: opPlan === 'pro' ? 'Atmos Pro Operator' : 'Authorized ATMOS 4D Operator',
            plan: opPlan
          }
        }));
      } else {
        useShellStore.setState({ accessPlan: 'free' });
      }
    } catch {
      useShellStore.setState({ accessPlan: 'free' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch(authEndpoint('me'), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal
    })
      .then((response) => {
        if (response.status === 401) throw new Error('expired');
        if (!response.ok) throw new Error('unreachable');
        return response.json();
      })
      .then((payload: { user: AuthenticatedOperator }) => {
        syncAuthenticatedOperator(payload.user);
        localStorage.setItem(SESSION_KEY, 'true');
      })
      .catch((error: Error) => {
        if (error.message === 'expired') {
          localStorage.removeItem(TOKEN_KEY);
          setAuthenticated(false);
          setAuthMode(true);
        }
      })
      .finally(() => clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    const keepProtectedRoute = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const sessionActive = localStorage.getItem(SESSION_KEY) === 'true';
      const hash = window.location.hash.replace(/^#/, '');
      const inAppHash = APP_HASHES.has(hash) || hash.startsWith('post/') || hash.startsWith('workspace/') || hash.startsWith('models/');

      if (token || authenticated) {
        if (!inAppHash) {
          window.history.replaceState({ atmosRoute: 'app' }, '', '#feed');
        }
        return;
      }

      if (localStorage.getItem(GUEST_KEY) === 'true') {
        setGuest(true);
        return;
      }

      if (hash === 'auth') {
        setAuthMode(true);
        return;
      }
      setAuthMode(false);
    };
    window.addEventListener('popstate', keepProtectedRoute);
    return () => window.removeEventListener('popstate', keepProtectedRoute);
  }, [authenticated]);

  // Connect to live real-time Python backend stream (SSE & live news)
  useEffect(() => {
    const cleanup = useShellStore.getState().initRealtimeBackend();
    return cleanup;
  }, []);

  // Multi-page browser history & hash synchronization
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace(/^#/, '');

      if (!hash || hash === 'feed' || hash === 'ask' || hash === 'ai_chat') {
        useShellStore.setState({
          activeView: 'ai_chat',
          activeNav: 'ai',
          activeModuleWorkspace: null,
          activePostId: null,
          selectedModelId: null
        });
      } else if (hash === 'news') {
        useShellStore.setState({
          activeView: 'news',
          activeNav: 'news',
          activeModuleWorkspace: null,
          activePostId: null,
          selectedModelId: null
        });
      } else if (hash === 'models' || hash.startsWith('models/')) {
        const id = hash.startsWith('models/') ? parseInt(hash.split('/')[1], 10) : NaN;
        useShellStore.setState({
          activeView: 'models',
          activeNav: 'models',
          selectedModelId: Number.isFinite(id) ? id : null,
          activeModuleWorkspace: null,
          activePostId: null
        });
      } else if (hash === 'research') {
        useShellStore.setState({
          activeView: 'research',
          activeNav: 'research',
          activeModuleWorkspace: null,
          activePostId: null,
          selectedModelId: null
        });
      } else if (hash === 'explore') {
        useShellStore.setState({
          activeView: 'explore',
          activeNav: 'explore',
          activeModuleWorkspace: null,
          activePostId: null,
          selectedModelId: null
        });
      } else if (hash === 'alerts') {
        useShellStore.setState({
          activeView: 'alerts',
          activeNav: 'alerts',
          activeModuleWorkspace: null,
          activePostId: null,
          selectedModelId: null
        });
      } else if (hash === 'bookmarks') {
        useShellStore.setState({
          activeView: 'bookmarks',
          activeNav: 'saved',
          activeModuleWorkspace: null,
          activePostId: null
        });
      } else if (hash === 'subscription') {
        useShellStore.setState({
          activeView: 'subscription',
          activeNav: 'subscription',
          activeModuleWorkspace: null,
          activePostId: null
        });
      } else if (hash === 'profile') {
        useShellStore.setState({
          activeView: 'profile',
          activeNav: 'profile',
          activeModuleWorkspace: null,
          activePostId: null
        });
      } else if (hash.startsWith('post/')) {
        const postId = hash.replace('post/', '');
        useShellStore.setState({
          activeView: 'post_detail',
          activePostId: postId,
          activeModuleWorkspace: null
        });
      } else if (hash.startsWith('workspace/')) {
        const modNum = parseInt(hash.replace('workspace/', ''), 10);
        if (!isNaN(modNum)) {
          useShellStore.getState().setSelectedModelId(modNum);
          useShellStore.setState({ activeView: 'models', activeNav: 'models', activeModuleWorkspace: null });
          window.history.replaceState(null, '', `#models/${modNum}`);
        }
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  if (!authReady) return <AuthLoadingScreen />;
  if (!authenticated && !authMode && !guest) {
    return <PublicLandingPage onEnterAuth={openAuth} onBrowseGuest={openGuest} />;
  }
  if (!authenticated && authMode) return <AuthScreen onAuthenticated={completeAuthentication} onBack={() => { setAuthMode(false); window.history.replaceState({ atmosRoute: 'landing' }, '', '/'); }} />;

  return (
    <div className="app-shell nv-app">
      <AtmosphericBackgroundCanvas variant="shell" />
      <div className="nv-shell">
        <AppTopBar />
        {accessPlan !== 'pro' && (
          <div className="nv-banner">
            <span>{accessPlan === 'guest' ? t(locale, 'guestBanner') : t(locale, 'freeBanner')}</span>
            <button type="button" onClick={() => accessPlan === 'guest' ? openAuth() : useShellStore.getState().setActiveNav('subscription')}>{accessPlan === 'guest' ? t(locale, 'signIn') : 'Pro'}</button>
          </div>
        )}
        {accessPlan === 'pro' && (
          <div className="nv-banner nv-pro-banner">
            <span>{t(locale, 'proOnBody')}</span>
          </div>
        )}
        <LivePulseTicker />
        <div className="gpt-body">
          <ChatHistoryRail />
          <main className="nv-main">
            <CenterViewRouter />
          </main>
        </div>
      </div>

      <ReplyModal />
      <IntelligenceModelsDrawer />
      <AtmosAIChatModal />
      <DatasetUploadModal />
      <ToastNotification />
      <EngineFieldGuide />
    </div>
  );
}
