// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Master Product Shell Zustand State Store (V2 — Full Integration)
// Navigation, Intent Routing, Notifications, Module Workspaces, Pipeline
// ============================================================================

import { create } from 'zustand';
import {
  LeftNavTab,
  FeedTab,
  InputMode,
  ShellView,
  IntentRoutingResult,
  FeedPost,
  ActiveLiveEvent,
  NewsItem,
  ShellNotification,
  ModuleHealthStatus,
  RoutingPipelineState,
  RoutingPipelineStep,
  ModuleWorkspaceContext,
  ActivatedModuleStep,
  PostReply,
  UserProfileData
} from '@/types/shell';
import {
  ACTIVE_LIVE_EVENTS,
  CONTEXTUAL_NEWS_REPOSITORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_MODULE_HEALTH,
  INITIAL_FEED_POSTS,
  EXPLORE_TOPICS,
  GUEST_USER_PROFILE
} from '@/data/mockFeedData';
import { parseAndRouteQuery } from './intentRouter';
import { AccessPlan, AppLocale, canPost, canUseEngines } from '@/i18n/copy';
import { apiBase, newsEndpoint } from '@/lib/api';
import { cleanNewsText, newsSummary } from '@/lib/cleanNews';

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'G';
}

function hydrateUserProfile() {
  if (typeof window === 'undefined') return GUEST_USER_PROFILE;
  try {
    const raw = localStorage.getItem('atmos_operator');
    if (!raw) return GUEST_USER_PROFILE;
    const op = JSON.parse(raw) as { name?: string; handle?: string; avatarInitials?: string; plan?: string };
    const name = (op.name || '').trim() || 'Guest';
    return {
      ...GUEST_USER_PROFILE,
      name,
      handle: op.handle || name.replace(/\s+/g, '').slice(0, 24) || 'user',
      avatarInitials: (op.avatarInitials || initialsFrom(name)).toUpperCase(),
      roleBadge: op.plan === 'pro' ? 'Atmos Pro' : 'Member',
      plan: op.plan === 'pro' ? 'pro' : 'free'
    };
  } catch {
    return GUEST_USER_PROFILE;
  }
}

interface ShellStoreState {
  // Navigation & Views
  activeNav: LeftNavTab;
  activeView: ShellView;
  activeFeedTab: FeedTab;
  activeInputMode: InputMode;

  // Search & Contextual Focus
  searchQuery: string;
  activeContextTopic: string;

  // Input Composer
  composerText: string;
  attachedLocation: string | null;
  attachedHorizon: string | null;
  attachedDataset: string | null;
  attachedImage: string | null;
  advancedConfigOpen: boolean;
  accessPlan: AccessPlan;
  locale: AppLocale;

  // Intent Routing State
  isRouting: boolean;
  latestIntentResult: IntentRoutingResult | null;

  // Animated Routing Pipeline (In-Feed Visualization)
  routingPipeline: RoutingPipelineState;

  // Feed & Content
  posts: FeedPost[];
  activeEvents: ActiveLiveEvent[];
  bookmarks: string[];

  // Post Detail & Thread Navigation
  activePostId: string | null;
  replyModalPost: FeedPost | null;

  // Profile Management
  userProfile: UserProfileData;
  profileActiveTab: 'posts' | 'replies' | 'highlights' | 'articles' | 'media' | 'likes';

  // Notifications
  notifications: ShellNotification[];
  unreadNotificationCount: number;

  // Module Health Monitor
  moduleHealth: ModuleHealthStatus[];

  // Live Real-Time News Stream
  liveNews: NewsItem[];
  isNewsLiveSyncing: boolean;

  // Modals & In-Situ Views
  modelsDrawerOpen: boolean;
  fieldGuideOpen: boolean;
  aiChatModalOpen: boolean;
  datasetModalOpen: boolean;
  activeModuleViewer: {
    moduleNumber: number;
    port: number;
    title: string;
  } | null;

  // Module Workspace (Full-Page Deep-Link)
  activeModuleWorkspace: ModuleWorkspaceContext | null;
  selectedModelId: number | null;

  // Toast notifications
  activeToast: { id: string; message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;

  // ========== ACTIONS ==========
  setActiveNav: (tab: LeftNavTab) => void;
  setActiveView: (view: ShellView) => void;
  setActiveFeedTab: (tab: FeedTab) => void;
  setActiveInputMode: (mode: InputMode) => void;
  setSearchQuery: (query: string) => void;
  setActiveContextTopic: (topic: string) => void;

  setComposerText: (text: string) => void;
  setAttachedLocation: (loc: string | null) => void;
  setAttachedHorizon: (horizon: string | null) => void;
  setAttachedDataset: (dataset: string | null) => void;
  setAttachedImage: (image: string | null) => void;
  setAdvancedConfigOpen: (open: boolean) => void;
  setAccessPlan: (plan: AccessPlan) => void;
  setLocale: (locale: AppLocale) => void;
  uiTheme: 'night' | 'field';
  setUiTheme: (theme: 'night' | 'field') => void;

  submitComposerQuery: (overrideQuery?: string) => Promise<void>;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  addNewPost: (content: string) => void;

  // Thread & Reply Actions
  openPostDetail: (postId: string) => void;
  openReplyModal: (post: FeedPost) => void;
  closeReplyModal: () => void;
  addReplyToPost: (postId: string, content: string) => void;
  toggleLikeReply: (postId: string, replyId: string) => void;

  // Profile Actions
  setProfileActiveTab: (tab: 'posts' | 'replies' | 'highlights' | 'articles' | 'media' | 'likes') => void;
  updateUserProfile: (profile: Partial<UserProfileData>) => void;

  setModelsDrawerOpen: (open: boolean) => void;
  setFieldGuideOpen: (open: boolean) => void;
  setAiChatModalOpen: (open: boolean) => void;
  setDatasetModalOpen: (open: boolean) => void;
  openModuleViewer: (moduleNumber: number, port: number, title: string) => void;
  closeModuleViewer: () => void;

  // Module Workspace Actions
  openModuleWorkspace: (moduleNumber: number, port: number, title: string, category?: string) => void;
  closeModuleWorkspace: () => void;
  setSelectedModelId: (id: number | null) => void;

  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<ShellNotification, 'id' | 'read'>) => void;

  // Toast Actions
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  clearToast: () => void;

  // Pipeline Actions
  clearPipeline: () => void;

  // Realtime Backend Sync & News Fetch
  fetchLiveNews: (hazard?: string, region?: string, language?: 'en' | 'hi') => Promise<void>;
  initRealtimeBackend: () => () => void;
}

export const useShellStore = create<ShellStoreState>((set, get) => ({
  activeNav: 'ai',
  activeView: 'ai_chat',
  activeFeedTab: 'for_you',
  activeInputMode: 'ASK',

  searchQuery: '',
  activeContextTopic: 'Odisha (Coastal Delta)',

  composerText: '',
  attachedLocation: 'Odisha Coastal Delta',
  attachedHorizon: '+72h Lead',
  attachedDataset: null,
  attachedImage: null,
  advancedConfigOpen: false,
  accessPlan: (typeof window !== 'undefined' && (localStorage.getItem('atmos_access_token') || localStorage.getItem('atmos_operator')) ? 'free' : 'guest') as AccessPlan,
  locale: 'en' as AppLocale,
  uiTheme: (typeof window !== 'undefined' && localStorage.getItem('atmos_theme') === 'field' ? 'field' : 'night') as 'night' | 'field',

  isRouting: false,
  latestIntentResult: null,

  routingPipeline: {
    isActive: false,
    queryId: null,
    steps: [],
    currentStepIndex: -1,
    startedAt: null,
    completedAt: null
  },

  posts: INITIAL_FEED_POSTS,
  activeEvents: [],
  bookmarks: [],

  activePostId: null,
  replyModalPost: null,
  userProfile: hydrateUserProfile(),
  profileActiveTab: 'posts',

  notifications: INITIAL_NOTIFICATIONS || [],
  unreadNotificationCount: (INITIAL_NOTIFICATIONS || []).filter((n) => !n.read).length,

  moduleHealth: INITIAL_MODULE_HEALTH,

  liveNews: [],
  isNewsLiveSyncing: false,

  modelsDrawerOpen: false,
  fieldGuideOpen: false,
  aiChatModalOpen: false,
  datasetModalOpen: false,
  activeModuleViewer: null,

  activeModuleWorkspace: null,
  selectedModelId: null,

  activeToast: null,

  // ========== ACTION IMPLEMENTATIONS ==========

  setActiveNav: (tab) => {
    set({ activeNav: tab });
    if (typeof window !== 'undefined') {
      if (tab === 'home' || tab === 'ai') window.history.pushState(null, '', '#ask');
      else if (tab === 'explore') window.history.pushState(null, '', '#explore');
      else if (tab === 'alerts') window.history.pushState(null, '', '#alerts');
      else if (tab === 'saved') window.history.pushState(null, '', '#bookmarks');
      else if (tab === 'subscription') window.history.pushState(null, '', '#subscription');
      else if (tab === 'profile') window.history.pushState(null, '', '#profile');
      else if (tab === 'news') window.history.pushState(null, '', '#news');
      else if (tab === 'models' || tab === 'intelligence') window.history.pushState(null, '', '#models');
    }
    if (tab === 'home' || tab === 'ai') {
      set({ activeView: 'ai_chat', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'explore') {
      set({ activeView: 'explore', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'intelligence' || tab === 'models') {
      set({ activeView: 'models', activeModuleWorkspace: null, activePostId: null, modelsDrawerOpen: false, selectedModelId: tab === 'models' ? null : get().selectedModelId });
    } else if (tab === 'news') {
      set({ activeView: 'news', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'alerts') {
      set({ activeView: 'alerts', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'saved') {
      set({ activeView: 'bookmarks', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'subscription') {
      set({ activeView: 'subscription', activeModuleWorkspace: null, activePostId: null });
    } else if (tab === 'profile') {
      set({ activeView: 'profile', activeModuleWorkspace: null, activePostId: null });
    }
  },

  setActiveView: (view) => {
    if (typeof window !== 'undefined') {
      if (view === 'feed') window.history.pushState(null, '', '#feed');
      else if (view === 'explore') window.history.pushState(null, '', '#explore');
      else if (view === 'alerts') window.history.pushState(null, '', '#alerts');
      else if (view === 'bookmarks') window.history.pushState(null, '', '#bookmarks');
      else if (view === 'subscription') window.history.pushState(null, '', '#subscription');
      else if (view === 'ai_chat') window.history.pushState(null, '', '#ask');
      else if (view === 'news') window.history.pushState(null, '', '#news');
      else if (view === 'models') window.history.pushState(null, '', '#models');
      else if (view === 'profile') window.history.pushState(null, '', '#profile');
    }
    set({ activeView: view, activeModuleWorkspace: view !== 'module_workspace' ? null : get().activeModuleWorkspace });
  },
  setActiveFeedTab: (tab) => set({ activeFeedTab: tab }),
  setActiveInputMode: (mode) => set({ activeInputMode: mode }),

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    if (query.toLowerCase().includes('punjab') || query.toLowerCase().includes('wheat')) {
      set({ activeContextTopic: 'Punjab (Indo-Gangetic Basin)' });
    } else if (query.toLowerCase().includes('soya') || query.toLowerCase().includes('indore')) {
      set({ activeContextTopic: 'Maharashtra (Deccan Plateau)' });
    } else if (query.toLowerCase().includes('odisha') || query.toLowerCase().includes('cyclone') || query.toLowerCase().includes('rain')) {
      set({ activeContextTopic: 'Odisha (Coastal Delta)' });
    }
  },
  setActiveContextTopic: (topic) => set({ activeContextTopic: topic }),

  setComposerText: (text) => set({ composerText: text }),
  setAttachedLocation: (loc) => set({ attachedLocation: loc }),
  setAttachedHorizon: (horizon) => set({ attachedHorizon: horizon }),
  setAttachedDataset: (dataset) => set({ attachedDataset: dataset }),
  setAttachedImage: (image) => set({ attachedImage: image }),
  setAdvancedConfigOpen: (open) => set({ advancedConfigOpen: open }),
  setAccessPlan: (plan) => set({ accessPlan: plan }),
  setLocale: (locale) => {
    set({ locale });
    if (typeof window !== 'undefined') localStorage.setItem('atmos_locale', locale);
    void get().fetchLiveNews(undefined, undefined, locale);
  },
  setUiTheme: (theme) => {
    set({ uiTheme: theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('atmos_theme', theme);
      document.documentElement.dataset.theme = theme;
    }
  },

  submitComposerQuery: async (overrideQuery) => {
    const query = overrideQuery || get().composerText;
    if (!query.trim()) return;
    if (!canPost(get().accessPlan)) {
      get().showToast(get().locale === 'hi' ? 'पूछने के लिए साइन इन करें' : 'Sign in to ask', 'warning');
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('atmos-open-auth'));
      return;
    }

    // Start routing with pipeline animation
    set({ isRouting: true });

    const result = parseAndRouteQuery(query, get().activeInputMode);

    // Initialize pipeline steps from routing result
    const pipelineSteps: RoutingPipelineStep[] = result.activatedModules.map((mod) => ({
      moduleNumber: mod.moduleNumber,
      moduleName: mod.moduleName,
      status: 'QUEUED' as const,
      port: mod.port,
      metricOutput: mod.metricOutput
    }));

    set({
      routingPipeline: {
        isActive: true,
        queryId: result.queryId,
        steps: pipelineSteps,
        currentStepIndex: 0,
        startedAt: Date.now(),
        completedAt: null
      }
    });

    // Animate through pipeline steps with staggered delays
    for (let i = 0; i < pipelineSteps.length; i++) {
      await new Promise((res) => setTimeout(res, 180 + Math.random() * 120));

      set((state) => ({
        routingPipeline: {
          ...state.routingPipeline,
          currentStepIndex: i,
          steps: state.routingPipeline.steps.map((step, idx) => {
            if (idx < i) return { ...step, status: 'RESOLVED' as const, completedAt: Date.now() };
            if (idx === i) return { ...step, status: 'EXECUTING' as const, startedAt: Date.now() };
            return step;
          })
        }
      }));
    }

    // Final resolve
    await new Promise((res) => setTimeout(res, 150));

    set((state) => ({
      routingPipeline: {
        ...state.routingPipeline,
        completedAt: Date.now(),
        steps: state.routingPipeline.steps.map((step) => ({
          ...step,
          status: 'RESOLVED' as const,
          completedAt: Date.now()
        }))
      }
    }));

    // If query has location, update active context
    if (result.entities.location) {
      set({ activeContextTopic: result.entities.location });
    }

    // Auto generate an AI intelligence feed post with pipeline reference
    const newAiPost: FeedPost = {
      id: `post_ai_${Date.now()}`,
      author: {
        name: 'Atmos AI Intelligence Desk',
        handle: 'atmos_ai',
        avatarInitials: 'AI',
        avatarColor: '#0ea5e9',
        verified: true,
        roleBadge: 'Realtime Response'
      },
      timestamp: 'Just now',
      content: get().locale === 'hi' ? result.executiveSummaryHi : result.executiveSummary,
      contentHi: result.executiveSummaryHi,
      imageUrl: get().attachedImage || undefined,
      tags: [
        `#${result.entities.location?.split(' ')[0] || 'Atmosphere'}`,
        `#${result.mode}`,
        '#SynthesizedIntelligence'
      ],
      routingPipeline: result.activatedModules,
      intelCard: get().locale === 'hi' ? {
        id: `card_${Date.now()}`,
        title: `${result.entities.location || 'आपका इलाका'} — साधारण नतीजा`,
        region: result.entities.location || 'ओडिशा',
        hazardType: result.entities.hazard || 'बारिश / बाढ़',
        leadTime: result.entities.horizon || '+72 घंटे',
        probabilityPct: Math.round(75 + Math.random() * 15),
        severity: result.mode === 'SIMULATE' ? 'HIGH' : 'CRITICAL',
        primaryMetrics: [
          { label: 'इंजन', value: `${result.activatedModules.length}`, delta: 'जुड़े', direction: 'neutral' },
          { label: 'भरोसा', value: `${Math.round(result.entities.confidenceScore! * 100)}%`, delta: 'मिलान', direction: 'up' },
          { label: 'समय', value: result.entities.horizon || '+72h', delta: 'आगे', direction: 'neutral' },
          { label: 'नतीजा', value: result.activatedModules[result.activatedModules.length - 1]?.metricOutput || 'तैयार', direction: 'up' }
        ],
        evidenceBullets: [result.executiveSummaryHi, ...result.biophysicalDrivers.slice(0, 2)].filter(Boolean),
        targetModuleNumber: result.targetModuleLaunch?.moduleNumber || 6,
        targetPort: result.targetModuleLaunch?.port || 3006,
        targetActionLabel: 'नक्शा खोलें',
        uncertaintySpreadText: 'यह अनुमान है — नुकसान पक्का नहीं माना गया।'
      } : {
        id: `card_${Date.now()}`,
        title: `${result.entities.location || 'Your region'} — plain result`,
        region: result.entities.location || 'Odisha',
        hazardType: result.entities.hazard || 'Rain / flood',
        leadTime: result.entities.horizon || '+72 Hours',
        probabilityPct: Math.round(75 + Math.random() * 15),
        severity: result.mode === 'SIMULATE' ? 'HIGH' : 'CRITICAL',
        primaryMetrics: [
          { label: 'Engines', value: `${result.activatedModules.length}`, delta: 'linked', direction: 'neutral' },
          { label: 'Confidence', value: `${Math.round(result.entities.confidenceScore! * 100)}%`, delta: 'match', direction: 'up' },
          { label: 'Horizon', value: result.entities.horizon || '+72h', delta: 'ahead', direction: 'neutral' },
          { label: 'Outcome', value: result.activatedModules[result.activatedModules.length - 1]?.metricOutput || 'Ready', direction: 'up' }
        ],
        evidenceBullets: [result.executiveSummary, ...result.biophysicalDrivers.slice(0, 2)].filter(Boolean),
        targetModuleNumber: result.targetModuleLaunch?.moduleNumber || 6,
        targetPort: result.targetModuleLaunch?.port || 3006,
        targetActionLabel: 'Open the map',
        uncertaintySpreadText: 'This is an estimate — loss is not treated as certain.'
      },
      stats: {
        replies: 0,
        reposts: 1,
        likes: 4,
        views: '1',
        isLiked: false,
        isBookmarked: false
      }
    };

    // Generate a notification for the completed query
    const newNotification: ShellNotification = {
      id: `notif_${Date.now()}`,
      type: 'ai_response',
      title: 'Intelligence Synthesis Complete',
      message: `${result.activatedModules.length}-module cascade resolved for "${query.substring(0, 60)}${query.length > 60 ? '...' : ''}"`,
      timestamp: 'Just now',
      read: false,
      sourceAvatar: 'AI',
      sourceColor: '#0ea5e9'
    };

    set((state) => ({
      isRouting: false,
      latestIntentResult: result,
      composerText: '',
      attachedImage: null,
      posts: [newAiPost, ...state.posts],
      notifications: [newNotification, ...state.notifications],
      unreadNotificationCount: state.unreadNotificationCount + 1,
      routingPipeline: {
        ...state.routingPipeline,
        isActive: false
      }
    }));
  },

  toggleLikePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;
        const isLiked = !p.stats.isLiked;
        return {
          ...p,
          stats: {
            ...p.stats,
            isLiked,
            likes: isLiked ? p.stats.likes + 1 : p.stats.likes - 1
          }
        };
      })
    }));
  },

  toggleBookmarkPost: (postId) => {
    set((state) => {
      const isBookmarked = state.bookmarks.includes(postId);
      const bookmarks = isBookmarked
        ? state.bookmarks.filter((id) => id !== postId)
        : [...state.bookmarks, postId];
      return {
        bookmarks,
        posts: state.posts.map((p) => (p.id === postId ? { ...p, stats: { ...p.stats, isBookmarked: !isBookmarked } } : p))
      };
    });
  },

  addNewPost: (content) => {
    if (!content.trim()) return;
    const newPost: FeedPost = {
      id: `post_user_${Date.now()}`,
      author: {
        name: get().userProfile.name,
        handle: get().userProfile.handle,
        avatarInitials: get().userProfile.avatarInitials,
        avatarColor: '#16181C',
        verified: true,
        roleBadge: get().userProfile.roleBadge
      },
      timestamp: 'Just now',
      content,
      stats: {
        replies: 0,
        reposts: 0,
        likes: 0,
        views: '1',
        isLiked: false,
        isBookmarked: false
      },
      repliesList: []
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
    get().showToast('Post published to 4D timeline', 'success');
  },

  // Thread & Reply Actions
  openPostDetail: (postId) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#post/${postId}`);
    }
    set({
      activeView: 'post_detail',
      activePostId: postId,
      activeModuleWorkspace: null
    });
  },

  openReplyModal: (post) => set({ replyModalPost: post }),
  closeReplyModal: () => set({ replyModalPost: null }),

  addReplyToPost: (postId, content) => {
    if (!content.trim()) return;
    const { userProfile, posts, showToast } = get();
    const newReply: PostReply = {
      id: `rep_${Date.now()}`,
      postId,
      author: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatarInitials: userProfile.avatarInitials,
        avatarColor: userProfile.avatarColor,
        verified: true,
        roleBadge: userProfile.roleBadge
      },
      timestamp: 'Just now',
      content: content.trim(),
      likes: 0,
      isLiked: false
    };

    set({
      posts: posts.map((p) => {
        if (p.id !== postId) return p;
        const currentReplies = p.repliesList || [];
        return {
          ...p,
          stats: {
            ...p.stats,
            replies: p.stats.replies + 1
          },
          repliesList: [newReply, ...currentReplies]
        };
      })
    });

    showToast('Your reply was posted to the network', 'success');
  },

  toggleLikeReply: (postId, replyId) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId || !p.repliesList) return p;
        return {
          ...p,
          repliesList: p.repliesList.map((r) => {
            if (r.id !== replyId) return r;
            const isLiked = !r.isLiked;
            return {
              ...r,
              isLiked,
              likes: isLiked ? r.likes + 1 : Math.max(0, r.likes - 1)
            };
          })
        };
      })
    }));
  },

  // Profile Actions
  setProfileActiveTab: (tab) => set({ profileActiveTab: tab }),
  updateUserProfile: (profile) => {
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile }
    }));
    get().showToast('Profile updated successfully', 'success');
  },

  setModelsDrawerOpen: (open) => set({ modelsDrawerOpen: open }),
  setFieldGuideOpen: (open) => set({ fieldGuideOpen: open }),
  setAiChatModalOpen: (open) => set({ aiChatModalOpen: open }),
  setDatasetModalOpen: (open) => set({ datasetModalOpen: open }),

  openModuleViewer: (moduleNumber, port, title) =>
    set({
      activeModuleViewer: { moduleNumber, port, title }
    }),
  closeModuleViewer: () => set({ activeModuleViewer: null }),

  openModuleWorkspace: (moduleNumber, _port, _title, _category) => {
    if (!canUseEngines(get().accessPlan, moduleNumber)) {
      get().showToast(
        get().locale === 'hi'
          ? `इंजन ${moduleNumber} पूर्वावलोकन मोड में सक्रिय है`
          : `Engine M${moduleNumber < 10 ? '0' + moduleNumber : moduleNumber} opened in Evaluation Mode`,
        'info'
      );
    }
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#models/${moduleNumber}`);
    }
    set({
      activeView: 'models',
      activeNav: 'models',
      selectedModelId: moduleNumber,
      activeModuleWorkspace: null
    });
  },

  closeModuleWorkspace: () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#models');
    }
    set({ activeView: 'models', activeNav: 'models', activeModuleWorkspace: null, selectedModelId: null });
  },
  setSelectedModelId: (id) => set({ selectedModelId: id }),

  // Notification Actions
  markNotificationRead: (id) => {
    set((state) => {
      const wasUnread = state.notifications.find((n) => n.id === id && !n.read);
      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadNotificationCount: wasUnread
          ? state.unreadNotificationCount - 1
          : state.unreadNotificationCount
      };
    });
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadNotificationCount: 0
    }));
  },

  addNotification: (notification) => {
    const newNotif: ShellNotification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      read: false
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
      unreadNotificationCount: state.unreadNotificationCount + 1
    }));
  },

  // Toast Actions
  showToast: (message, type = 'info') => {
    const id = `toast_${Date.now()}`;
    set({ activeToast: { id, message, type } });
    setTimeout(() => {
      set((state) => (state.activeToast?.id === id ? { activeToast: null } : {}));
    }, 4000);
  },

  clearToast: () => set({ activeToast: null }),

  clearPipeline: () =>
    set({
      routingPipeline: {
        isActive: false,
        queryId: null,
        steps: [],
        currentStepIndex: -1,
        startedAt: null,
        completedAt: null
      }
    }),

  fetchLiveNews: async (hazard?: string, region?: string, language: 'en' | 'hi' = 'en') => {
    try {
      set({ isNewsLiveSyncing: true });
      const queryParams = new URLSearchParams();
      queryParams.set('limit', '8');
      if (hazard) queryParams.set('hazard', hazard);
      if (region) queryParams.set('region', region);
      queryParams.set('language', language);

      const res = await fetch(newsEndpoint(queryParams.toString()));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data && data.articles && Array.isArray(data.articles)) {
        const mappedNews: NewsItem[] = data.articles.map((art: any) => {
          const title = cleanNewsText(art.title || art.message || 'Live bulletin');
          const description = cleanNewsText(art.description || '');
          return {
          id: art.id || `news_${Math.random().toString(36).substring(7)}`,
          headline: title,
          headlineHi: language === 'hi' ? title : undefined,
          source: cleanNewsText(art.profile?.name || art.source) || 'IMD / MoES Bulletin',
          timestamp: art.time_ago || 'Live',
          category: (art.hazard || 'DISASTER').toUpperCase(),
          aiRelevanceContext: description || title,
          aiRelevanceContextHi: cleanNewsText(art.description_hi || art.descriptionHi || art.translations?.hi_context || ''),
          relatedRegion: art.region || 'India',
          relatedHazard: art.hazard || 'cyclone',
          imageUrl: art.image || art.media?.url || undefined
        };
        });

        const backendPosts: FeedPost[] = data.articles.map((art: any) => {
          const title = cleanNewsText(art.title || 'Weather bulletin');
          const summary = newsSummary(title, art.description || art.message);
          return {
          id: `news_${art.id || Math.random().toString(36).substring(7)}`,
          author: {
            name: cleanNewsText(art.profile?.name || art.source) || 'IMD Severe Weather Watch',
            handle: art.profile?.handle || '@Indiametdept',
            avatarInitials: art.profile?.name?.substring(0, 2) || 'IMD',
            avatarColor: '#1E3A8A',
            verified: true,
            roleBadge: 'Government Agency'
          },
          timestamp: art.time_ago || 'Recent',
          content: summary,
          contentHi: language === 'hi' ? summary : undefined,
          imageUrl: art.image || art.media?.url || undefined,
          expandable: true,
          tags: [art.urgency || 'DISASTER ALERT', art.hazard || 'Cyclone'],
          intelCard: {
            id: `card_${art.id || Math.random().toString(36).substring(7)}`,
            title,
            region: art.region || 'India',
            hazardType: (art.hazard || 'Cyclone').toUpperCase(),
            leadTime: '+72h Lead',
            probabilityPct: 92,
            severity: 'CRITICAL' as const,
            primaryMetrics: [
              { label: 'Hazard', value: (art.hazard || 'Cyclone').toUpperCase(), direction: 'up' },
              { label: 'Region', value: art.region || 'India', direction: 'neutral' },
              { label: 'NDRF Status', value: 'Pre-Deployed', direction: 'up' }
            ],
            evidenceBullets: [
              cleanNewsText(art.description) || title,
              art.source ? `Source: ${cleanNewsText(art.source)}` : ''
            ].filter(Boolean),
            targetModuleNumber: 6,
            targetPort: 3006,
            targetActionLabel: language === 'hi' ? 'नक्शा खोलें' : 'Open the map',
            uncertaintySpreadText: language === 'hi' ? 'लाइव स्रोत से लिया गया। नुकसान पक्का नहीं।' : 'Taken from a live source. Loss is not treated as certain.'
          },
          stats: {
            replies: art.replies || 142,
            reposts: art.reposts || 420,
            likes: art.likes || 1850,
            views: art.views || '45K',
            isLiked: false,
            isBookmarked: false
          }
        };
        });

        set((state) => {
          const existingIds = new Set(state.posts.map((p) => p.id));
          const newUniquePosts = backendPosts.filter((p) => !existingIds.has(p.id));
          return {
            liveNews: mappedNews,
            posts: [...newUniquePosts, ...state.posts]
          };
        });
      }
    } catch (err) {
      console.warn('Realtime news fetch notice:', err);
    } finally {
      set({ isNewsLiveSyncing: false });
    }
  },

  initRealtimeBackend: () => {
    if (typeof window === 'undefined') return () => {};

    const pull = () => {
      const locale = get().locale;
      get().fetchLiveNews('cyclone', 'India', locale);
      get().fetchLiveNews('mandi', 'India', locale);
    };

    pull();
    const pollInterval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        pull();
      }
    }, 60000);

    // 3. Connect to SSE Stream for Live Anomaly Ticker
    let eventSource: EventSource | null = null;
    let sseErrorCount = 0;
    try {
      eventSource = new EventSource(`${apiBase() || 'http://localhost:8000'}/events/live/sse`);

      eventSource.onerror = () => {
        sseErrorCount++;
        if (sseErrorCount > 2 && eventSource) {
          eventSource.close();
          eventSource = null;
        }
      };

      eventSource.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload && payload.type === 'live_anomaly_event') {
            // Live Toast
            get().showToast(`[LIVE MOES ALERT] ${payload.headline}`, payload.severity === 'severe' ? 'error' : 'warning');

            // Live Notification
            const notif: ShellNotification = {
              id: `notif_${payload.event_id}`,
              type: 'hazard_alert',
              title: `Live Alert: ${payload.region}`,
              message: payload.headline,
              timestamp: 'Just now',
              read: false,
              sourceAvatar: 'IMD',
              sourceColor: '#ef4444'
            };

            // Live Post in Feed
            const livePost: FeedPost = {
              id: `post_${payload.event_id}`,
              author: {
                name: 'MoES Real-Time Anomaly Stream',
                handle: '@moes_realtime',
                avatarInitials: '4D',
                avatarColor: '#2563EB',
                verified: true,
                roleBadge: 'Automated Radar & Ensemble Feed'
              },
              timestamp: 'Just now',
              content: `🚨 **${payload.region}**: ${payload.headline}`,
              tags: [payload.category || 'LIVE ANOMALY', payload.hazard],
              intelCard: {
                id: `card_${payload.event_id}`,
                title: payload.headline,
                region: payload.region,
                hazardType: payload.hazard.toUpperCase(),
                leadTime: '+24h to +72h',
                probabilityPct: Math.round(payload.probability * 100),
                severity: payload.severity === 'severe' ? ('CRITICAL' as const) : ('HIGH' as const),
                primaryMetrics: [
                  { label: 'EFI Index', value: `${payload.efi}`, delta: '+0.4', direction: 'up' },
                  { label: 'Peak Intensity', value: `${payload.peak_intensity} mm`, direction: 'up' },
                  { label: 'Wind Speed', value: `${payload.telemetry?.wind_speed_kmh || 55} km/h`, direction: 'neutral' },
                  { label: 'Ensemble', value: '10/10 Members', direction: 'up' }
                ],
                evidenceBullets: [
                  `Bounding Box: [${payload.bbox.join(', ')}]`,
                  `Surface Pressure: ${payload.telemetry?.barometric_pressure_hpa || 994} hPa`,
                  `Sensor Source: ${payload.telemetry?.source || 'NEPS-G + AWS'}`
                ],
                targetModuleNumber: 6,
                targetPort: 3006,
                targetActionLabel: 'Inspect Real-time Tensor Contours',
                uncertaintySpreadText: 'Dynamic 10-member ensemble CDF distribution variance: P10-P90.'
              },
              stats: {
                replies: 12,
                reposts: 34,
                likes: 128,
                views: '1.2K',
                isLiked: false,
                isBookmarked: false
              }
            };

            // Live News Item in Right Rail
            const liveNewsItem: NewsItem = {
              id: `wire_${payload.event_id}`,
              headline: payload.headline,
              source: 'MoES Real-Time Radar',
              timestamp: 'Just now',
              category: (payload.category || 'LIVE RADAR').toUpperCase(),
              aiRelevanceContext: `EFI Index: ${payload.efi} · Intensity: ${payload.peak_intensity}mm · Ensemble: 10/10`,
              relatedRegion: payload.region,
              relatedHazard: payload.hazard
            };

            set((state) => ({
              posts: [livePost, ...state.posts.slice(0, 45)],
              liveNews: [liveNewsItem, ...state.liveNews.slice(0, 8)],
              notifications: [notif, ...state.notifications],
              unreadNotificationCount: state.unreadNotificationCount + 1
            }));
          }
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };
    } catch (err) {
      console.warn('SSE connection notice:', err);
    }

    return () => {
      clearInterval(pollInterval);
      if (eventSource) {
        eventSource.close();
      }
    };
  }
}));
