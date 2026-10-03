// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Global Product Shell Contracts & Unified Intent Types
// Extended with Module Workspaces, Notifications, Routing Pipeline, Explore
// ============================================================================

export type LeftNavTab =
  | 'home'
  | 'explore'
  | 'intelligence'
  | 'alerts'
  | 'ai'
  | 'news'
  | 'models'
  | 'saved'
  | 'subscription'
  | 'profile'
  | 'more';

export type FeedTab =
  | 'for_you'
  | 'following'
  | 'live_intel'
  | 'markets'
  | 'agriculture';

export type InputMode = 'ASK' | 'INVESTIGATE' | 'ANALYZE' | 'SIMULATE';

export type ShellView =
  | 'feed'
  | 'explore'
  | 'alerts'
  | 'bookmarks'
  | 'module_workspace'
  | 'subscription'
  | 'ai_chat'
  | 'news'
  | 'models'
  | 'profile'
  | 'post_detail';

export interface PostReply {
  id: string;
  postId: string;
  author: {
    name: string;
    handle: string;
    avatarInitials: string;
    avatarColor: string;
    verified: boolean;
    roleBadge?: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

export interface UserProfileData {
  name: string;
  handle: string;
  avatarInitials: string;
  avatarColor: string;
  roleBadge: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  followingCount: number;
  followersCount: number;
  plan?: 'guest' | 'free' | 'pro';
}

export interface ExtractedEntities {
  location?: string;
  crop?: string;
  hazard?: string;
  horizon?: string;
  variable?: string;
  confidenceScore?: number;
}

export interface ActivatedModuleStep {
  moduleNumber: number;
  moduleName: string;
  shortRole: string;
  port: number;
  routeUrl: string;
  status: 'PENDING' | 'EXECUTING' | 'RESOLVED';
  metricOutput: string;
}

export interface IntentRoutingResult {
  queryId: string;
  rawQuery: string;
  mode: InputMode;
  entities: ExtractedEntities;
  activatedModules: ActivatedModuleStep[];
  executiveSummary: string;
  executiveSummaryHi: string;
  biophysicalDrivers: string[];
  suggestedFollowUps: string[];
  targetModuleLaunch?: {
    moduleNumber: number;
    port: number;
    actionName: string;
  };
}

export interface IntelligenceCardData {
  id: string;
  title: string;
  region: string;
  hazardType: string;
  leadTime: string;
  probabilityPct: number;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MONITOR';
  primaryMetrics: {
    label: string;
    value: string;
    delta?: string;
    direction?: 'up' | 'down' | 'neutral';
  }[];
  evidenceBullets: string[];
  targetModuleNumber: number;
  targetPort: number;
  targetActionLabel: string;
  uncertaintySpreadText: string;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarInitials: string;
    avatarColor: string;
    verified: boolean;
    roleBadge: string;
  };
  timestamp: string;
  content: string;
  contentHi?: string;
  imageUrl?: string;
  expandable?: boolean;
  tags?: string[];
  intelCard?: IntelligenceCardData;
  routingPipeline?: ActivatedModuleStep[];
  stats: {
    replies: number;
    reposts: number;
    likes: number;
    views: string;
    isLiked: boolean;
    isBookmarked: boolean;
  };
  repliesList?: PostReply[];
}

export interface NewsItem {
  id: string;
  headline: string;
  headlineHi?: string;
  source: string;
  timestamp: string;
  category: string;
  aiRelevanceContext: string;
  aiRelevanceContextHi?: string;
  relatedRegion: string;
  relatedHazard: string;
  imageUrl?: string;
}

export interface ActiveLiveEvent {
  id: string;
  name: string;
  region: string;
  hazardType: string;
  probabilityPct: number;
  leadHorizon: string;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MONITOR';
  targetModuleNumber: number;
  targetPort: number;
  briefSummary: string;
}

export interface GroupedModelItem {
  moduleNumber: number;
  title: string;
  shortDescription: string;
  port: number;
  routeUrl: string;
  keyMetric: string;
  tag: string;
}

export interface GroupedModelCategory {
  categoryName: string;
  description: string;
  colorHex: string;
  models: GroupedModelItem[];
}

// =================== NEW TYPES FOR FULL INTEGRATION ===================

export interface ShellNotification {
  id: string;
  type: 'hazard_alert' | 'module_complete' | 'ai_response' | 'system' | 'mention';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity?: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MONITOR';
  actionModuleNumber?: number;
  actionPort?: number;
  sourceAvatar?: string;
  sourceColor?: string;
}

export interface ModuleHealthStatus {
  moduleNumber: number;
  port: number;
  name: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE' | 'COLD_START';
  latencyMs: number;
  lastHeartbeat: string;
  gpuUtilPct?: number;
  memoryMB?: number;
}

export interface RoutingPipelineState {
  isActive: boolean;
  queryId: string | null;
  steps: RoutingPipelineStep[];
  currentStepIndex: number;
  startedAt: number | null;
  completedAt: number | null;
}

export interface RoutingPipelineStep {
  moduleNumber: number;
  moduleName: string;
  status: 'QUEUED' | 'EXECUTING' | 'RESOLVED' | 'ERROR';
  startedAt?: number;
  completedAt?: number;
  metricOutput?: string;
  port: number;
}

export interface ExploreTopic {
  id: string;
  category: 'Weather' | 'Agriculture' | 'Market' | 'Policy' | 'Research';
  title: string;
  subtitle: string;
  postCount: string;
  trending: boolean;
  relatedModules: number[];
  region?: string;
}

export interface ModuleWorkspaceContext {
  moduleNumber: number;
  port: number;
  title: string;
  category: string;
  parentQueryId?: string;
  parentEntities?: ExtractedEntities;
  connectedModules?: number[];
  breadcrumb: string[];
}
