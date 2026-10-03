// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Complete Mock Data Repository (V2 — Full Integration)
// Feed Posts, News, Events, Notifications, Module Health, Explore Topics
// ============================================================================

import {
  FeedPost,
  NewsItem,
  ActiveLiveEvent,
  GroupedModelCategory,
  ShellNotification,
  ModuleHealthStatus,
  ExploreTopic,
  UserProfileData
} from '@/types/shell';

export const DEFAULT_USER_PROFILE: UserProfileData = {
  name: 'crazybird',
  handle: 'YogyaJain16',
  avatarInitials: 'YJ',
  avatarColor: '#16181C',
  roleBadge: 'Lead Researcher & 4D Core Architect',
  bio: 'Building ATMOS 4D — Planetary-to-Agricultural Intelligence Ecosystem. 18-engine coupled cascade for NWP hazards, crop vulnerability, and market resilience. Open scientific intelligence.',
  location: 'New Delhi / Coastal Ops',
  website: 'https://atmos4d.ai',
  joinedDate: 'Joined March 2024',
  followingCount: 142,
  followersCount: 3842
};

// =================== ACTIVE LIVE EVENTS ===================
export const ACTIVE_LIVE_EVENTS: ActiveLiveEvent[] = [
  {
    id: 'evt_bob_depression',
    name: 'बंगाल की खाड़ी — तेज़ बारिश',
    region: 'तटीय ओडिशा व आंध्र',
    hazardType: 'भारी बारिश',
    probabilityPct: 78,
    leadHorizon: '+48 Hours',
    severity: 'CRITICAL',
    targetModuleNumber: 6,
    targetPort: 3006,
    briefSummary: 'Well-marked cyclonic system tracking WNW at 32 km/h; ensemble agreement 18/24 members.'
  },
  {
    id: 'evt_coastal_submergence',
    name: 'महानदी डेल्टा — पानी भर सकता है',
    region: 'पुरी, जगतसिंहपुर, केन्द्रापारा',
    hazardType: 'जलभराव',
    probabilityPct: 71,
    leadHorizon: '+72 Hours',
    severity: 'HIGH',
    targetModuleNumber: 9,
    targetPort: 3009,
    briefSummary: 'Precipitation volume +34.9% above normal; perched water table rising to 0.82m depth.'
  },
  {
    id: 'evt_punjab_heat',
    name: 'पंजाब–हरियाणा — गेहूं पर गर्मी',
    region: 'पंजाब व हरियाणा',
    hazardType: 'लू / गर्मी',
    probabilityPct: 64,
    leadHorizon: '+96 Hours',
    severity: 'ELEVATED',
    targetModuleNumber: 10,
    targetPort: 3010,
    briefSummary: 'Terminal heat wave encroaching on wheat anthesis window; vapor pressure deficit increasing.'
  },
  {
    id: 'evt_deccan_moisture',
    name: 'विदर्भ — मिट्टी सूखी',
    region: 'विदर्भ व मराठवाड़ा',
    hazardType: 'सूखा',
    probabilityPct: 58,
    leadHorizon: '+10 Days',
    severity: 'MONITOR',
    targetModuleNumber: 11,
    targetPort: 3011,
    briefSummary: 'Consecutive dry days exceeding 14d; root zone soil water content dropping below 18%.'
  }
];

// =================== INITIAL FEED POSTS ===================
export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post_1',
    author: {
      name: 'Atmos AI Intelligence Desk',
      handle: 'atmos_ai',
      avatarInitials: 'AI',
      avatarColor: '#0ea5e9',
      verified: true,
      roleBadge: 'System Core'
    },
    timestamp: '18m ago',
    content: 'A Bay of Bengal storm is strengthening. Chance of landfall on the Odisha coast (Puri–Kendrapara) in the next 2 days is now 78%.',
    contentHi: 'बंगाल की खाड़ी में तूफान तेज़ हो रहा है। अगले 2 दिन में पुरी–केन्द्रापारा तट पर आने की संभावना अब 78% है। निचले गाँव अभी से तैयार रहें।',
    tags: ['#ExtremeWeather', '#BayOfBengal', '#Odisha', '#Downscaling'],
    routingPipeline: [
      { moduleNumber: 1, moduleName: 'Planetary Telemetry', shortRole: '5D tensor ingestion', port: 3001, routeUrl: '/modules/1', status: 'RESOLVED', metricOutput: '850 hPa Convergence' },
      { moduleNumber: 3, moduleName: 'Anomaly Engine', shortRole: 'EFI calculation', port: 3003, routeUrl: '/modules/3', status: 'RESOLVED', metricOutput: 'EFI = +0.89' },
      { moduleNumber: 5, moduleName: 'GNN Trajectory', shortRole: 'Track prediction', port: 3005, routeUrl: '/modules/5', status: 'RESOLVED', metricOutput: 'WNW 32 km/h' },
      { moduleNumber: 6, moduleName: 'Probability Field', shortRole: 'Ensemble surface', port: 3006, routeUrl: '/modules/6', status: 'RESOLVED', metricOutput: '78% Agreement' }
    ],
    intelCard: {
      id: 'card_1',
      title: 'ओडिशा तट — तूफान का खतरा',
      region: 'Odisha Coastal Belt (Puri–Kendrapara)',
      hazardType: 'तेज़ बारिश व हवा',
      leadTime: '+48 Hours',
      probabilityPct: 78,
      severity: 'CRITICAL',
      primaryMetrics: [
        { label: 'Intensity Peak', value: '68.2 mm/d', delta: '+34.9%', direction: 'up' },
        { label: 'Gale Gusts', value: '115 km/h', delta: '+28%', direction: 'up' },
        { label: 'Track Speed', value: '32 km/h', delta: 'WNW', direction: 'neutral' },
        { label: 'EFI Score', value: '+0.89', delta: '> P95', direction: 'up' }
      ],
      evidenceBullets: [
        '24 में से 18 अनुमान पुरी–केन्द्रापारा तट पर मिल रहे हैं।',
        'गाँव-स्तर के नक्शे पर भारी बारिश का खतरा साफ़ दिख रहा है।',
        'महानदी मुहाने पर पानी निकलने में लगभग 2 दिन लग सकते हैं।'
      ],
      targetModuleNumber: 6,
      targetPort: 3006,
      targetActionLabel: 'बारिश का नक्शा खोलें',
      uncertaintySpreadText: 'यह संभावना है — नुकसान पक्का नहीं।'
    },
    stats: {
      replies: 14,
      reposts: 28,
      likes: 86,
      views: '4.2K',
      isLiked: false,
      isBookmarked: false
    },
    repliesList: [
      {
        id: 'rep_1_1',
        postId: 'post_1',
        author: {
          name: 'Dr. Arindam Sen',
          handle: 'dr_arindam_sen',
          avatarInitials: 'AS',
          avatarColor: '#10b981',
          verified: true,
          roleBadge: 'Chief Agronomist'
        },
        timestamp: '14m ago',
        content: 'Landfall corridor matches our ground telemetry station network. Have you factored the diurnal boundary layer flux into the Puri coastal transect?',
        likes: 12,
        isLiked: false
      },
      {
        id: 'rep_1_2',
        postId: 'post_1',
        author: {
          name: 'crazybird',
          handle: 'YogyaJain16',
          avatarInitials: 'YJ',
          avatarColor: '#16181C',
          verified: true,
          roleBadge: 'Lead Researcher'
        },
        timestamp: '8m ago',
        content: 'Yes, Engine 07 downscales with local latent heat flux parameterization. The 5km grid explicitly captures the estuarine thermal inversion.',
        likes: 19,
        isLiked: true
      }
    ]
  },
  {
    id: 'post_2',
    author: {
      name: 'Dr. Arindam Sen',
      handle: 'dr_arindam_sen',
      avatarInitials: 'AS',
      avatarColor: '#10b981',
      verified: true,
      roleBadge: 'Chief Agronomist'
    },
    timestamp: '1h ago',
    content: 'Heavy rain does not mean the whole paddy crop is lost. Flowering fields are the ones at risk. Late-sown Swarna in Odisha needs extra care now.',
    contentHi: 'भारी बारिश का मतलब पूरी धान बर्बाद नहीं। फूल आने वाली फसल सबसे संवेदनशील है। ओडिशा में देर से बोई स्वर्णा पर अभी खास ध्यान दें।',
    tags: ['#AgriIntelligence', '#CropExposure', '#Paddy', '#OdishaKharif'],
    routingPipeline: [
      { moduleNumber: 9, moduleName: 'Crop Exposure', shortRole: 'Geospatial intersection', port: 3009, routeUrl: '/modules/9', status: 'RESOLVED', metricOutput: '342.4k ha' },
      { moduleNumber: 10, moduleName: 'Phenology', shortRole: 'Growth stage clock', port: 3010, routeUrl: '/modules/10', status: 'RESOLVED', metricOutput: 'Panicle Init.' },
      { moduleNumber: 11, moduleName: 'Soil Water', shortRole: 'Hypoxia duration', port: 3011, routeUrl: '/modules/11', status: 'RESOLVED', metricOutput: '0.82m Table' },
      { moduleNumber: 13, moduleName: 'Yield Risk', shortRole: 'Skew-t distribution', port: 3013, routeUrl: '/modules/13', status: 'RESOLVED', metricOutput: 'P50: 3.12 t/ha' }
    ],
    intelCard: {
      id: 'card_2',
      title: 'धान — फूल अवस्था संवेदनशील',
      region: 'Odisha Lowland Basins (Swarna Cultivar)',
      hazardType: 'खेत में पानी / फूल खतरा',
      leadTime: '+72 Hours',
      probabilityPct: 71,
      severity: 'HIGH',
      primaryMetrics: [
        { label: 'Exposed Area', value: '342.4k ha', delta: '30.8% Area', direction: 'neutral' },
        { label: 'Sterility Risk', value: '12.4%', delta: '+4.2%', direction: 'up' },
        { label: 'Water Table', value: '0.82m', delta: 'Perched', direction: 'down' },
        { label: 'P50 Yield', value: '3.12 t/ha', delta: '-8.8%', direction: 'down' }
      ],
      evidenceBullets: [
        'खेत में पानी खड़ा दिख रहा है — पूरी फसल बर्बाद नहीं मानी गई।',
        'फूल आने की अवस्था बारिश के साथ मेल खा रही है, यही संवेदनशील है।',
        '72 घंटे में पानी निकल जाए तो स्वर्णा-सब1 किस्म बेहतर बचती है।'
      ],
      targetModuleNumber: 10,
      targetPort: 3010,
      targetActionLabel: 'फसल सलाह खोलें',
      uncertaintySpreadText: 'अनुमान है — हर खेत एक जैसा नहीं।'
    },
    stats: {
      replies: 22,
      reposts: 45,
      likes: 134,
      views: '7.8K',
      isLiked: true,
      isBookmarked: true
    },
    repliesList: [
      {
        id: 'rep_2_1',
        postId: 'post_2',
        author: {
          name: 'Odisha FPO Logistics Council',
          handle: 'fpo_odisha_intel',
          avatarInitials: 'FP',
          avatarColor: '#f59e0b',
          verified: true,
          roleBadge: 'Supply Chain'
        },
        timestamp: '45m ago',
        content: 'केन्द्रापारा के किसानों को खाद तब तक रोकने को कहा जा रहा है जब तक खेत का पानी नीचे न उतरे।',
        likes: 16,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_3',
    author: {
      name: 'Odisha FPO Logistics Council',
      handle: 'fpo_odisha_intel',
      avatarInitials: 'FP',
      avatarColor: '#f59e0b',
      verified: true,
      roleBadge: 'Supply Chain'
    },
    timestamp: '3h ago',
    content: 'Kendrapara and Jagatsinghpur mandis are seeing about 14% fewer arrivals. Wholesale price is around ₹2,315/qtl. A 40,000 MT buffer release is being recommended.',
    contentHi: 'केन्द्रापारा और जगतसिंहपुर मंडियों में आवक करीब 14% घटी है। थोक भाव लगभग ₹2,315/क्विंटल है। 40,000 टन भंडार छोड़ने की सलाह दी जा रही है।',
    tags: ['#SupplyShock', '#MandiPrices', '#FoodSecurity', '#MarketEquilibrium'],
    routingPipeline: [
      { moduleNumber: 13, moduleName: 'Yield Risk', shortRole: 'Production aggregation', port: 3013, routeUrl: '/modules/13', status: 'RESOLVED', metricOutput: '-3.76 LMT' },
      { moduleNumber: 15, moduleName: 'Market Intel', shortRole: 'Price elasticity', port: 3015, routeUrl: '/modules/15', status: 'RESOLVED', metricOutput: '₹2,315/qtl' },
      { moduleNumber: 17, moduleName: 'Supply Shock', shortRole: 'District deficit map', port: 3017, routeUrl: '/modules/17', status: 'RESOLVED', metricOutput: '-14.2% Arrivals' }
    ],
    intelCard: {
      id: 'card_3',
      title: 'Mandi Arrival Deficit & Buffer Equilibrium',
      region: 'Cuttack, Berhampur & Kendrapara Mandis',
      hazardType: 'Supply Contraction & Spot Premium',
      leadTime: '+14 Days',
      probabilityPct: 84,
      severity: 'HIGH',
      primaryMetrics: [
        { label: 'Net Deficit', value: '-3.76 LMT', delta: '-8.8%', direction: 'down' },
        { label: 'Modal Price', value: '₹2,315 / qtl', delta: '+₹132', direction: 'up' },
        { label: 'Arrival Drop', value: '-14.2%', delta: 'Shortfall', direction: 'down' },
        { label: 'Buffer Storage', value: '40,000 MT', delta: 'Deployed', direction: 'up' }
      ],
      evidenceBullets: [
        'भंडार छोड़ने से भाव ₹2,350/क्विंटल के आसपास रुक सकते हैं।',
        'कटक बाईपास पर ट्रक रुकने से आवक और धीमी पड़ सकती है।',
        'तटीय ब्लॉकों में किसान की लागत तक उपज न पहुँचने का खतरा है।'
      ],
      targetModuleNumber: 17,
      targetPort: 3017,
      targetActionLabel: 'मंडी झटका देखें',
      uncertaintySpreadText: 'आवक अनुमान है — निजी स्टॉक अलग हो सकता है।'
    },
    stats: {
      replies: 9,
      reposts: 19,
      likes: 62,
      views: '3.1K',
      isLiked: false,
      isBookmarked: false
    }
  },
  {
    id: 'post_4',
    author: {
      name: 'NPSS Pest Surveillance',
      handle: 'npss_india',
      avatarInitials: 'NP',
      avatarColor: '#ef4444',
      verified: true,
      roleBadge: 'Pathogen Watch'
    },
    timestamp: '4h ago',
    content: 'Leaves staying wet for more than 14 hours and high humidity are raising bacterial blight risk in the Mahanadi delta. Spray advice for late-sown paddy in Kendrapara and Jagatsinghpur is within 48 hours.',
    contentHi: 'पत्तियाँ 14 घंटे से ज्यादा गीली रहने और नमी बढ़ने से महानदी डेल्टा में जीवाणु झुलसा का खतरा है। केन्द्रापारा और जगतसिंहपुर की देर से बोई धान पर 48 घंटे में छिड़काव की सलाह है।',
    tags: ['#PestRisk', '#BacterialBlight', '#CropProtection', '#LeafWetness'],
    routingPipeline: [
      { moduleNumber: 7, moduleName: 'Downscaling', shortRole: '5km microclimate', port: 3007, routeUrl: '/modules/7', status: 'RESOLVED', metricOutput: '5km RH Field' },
      { moduleNumber: 14, moduleName: 'Pest & Disease', shortRole: 'Pathogen favorability', port: 3014, routeUrl: '/modules/14', status: 'RESOLVED', metricOutput: 'BLB High Risk' }
    ],
    stats: {
      replies: 7,
      reposts: 15,
      likes: 41,
      views: '2.1K',
      isLiked: false,
      isBookmarked: false
    }
  },
  {
    id: 'post_5',
    author: {
      name: 'Dr. Priya Mehta',
      handle: 'priya_hydrology',
      avatarInitials: 'PM',
      avatarColor: '#06b6d4',
      verified: true,
      roleBadge: 'Hydrologist'
    },
    timestamp: '5h ago',
    content: 'Village-level rain maps for the Odisha coast are sharper now. Hill slopes and river mouths show more clearly where water will collect.',
    contentHi: 'ओडिशा तट का गाँव-स्तर बारिश नक्शा और साफ़ हो गया है। पहाड़ियों और नदी मुहाने पर पानी कहाँ जमा होगा, अब बेहतर दिख रहा है।',
    tags: ['#Downscaling', '#ModelValidation', '#CRPS', '#ConditionalDiffusion'],
    routingPipeline: [
      { moduleNumber: 7, moduleName: 'Downscaling', shortRole: 'Diffusion SDE', port: 3007, routeUrl: '/modules/7', status: 'RESOLVED', metricOutput: 'CRPS = 0.18mm' },
      { moduleNumber: 8, moduleName: 'Extreme Comparison', shortRole: 'Run-to-run drift', port: 3008, routeUrl: '/modules/8', status: 'RESOLVED', metricOutput: 'Δ Intensity +24%' }
    ],
    stats: {
      replies: 18,
      reposts: 32,
      likes: 97,
      views: '5.4K',
      isLiked: false,
      isBookmarked: false
    }
  },
  {
    id: 'post_6',
    author: {
      name: 'Atmos AI Intelligence Desk',
      handle: 'atmos_ai',
      avatarInitials: 'AI',
      avatarColor: '#0ea5e9',
      verified: true,
      roleBadge: 'Scenario Engine'
    },
    timestamp: '6h ago',
    content: 'What if rainfall is 20% higher than expected? About 58,000 extra hectares of paddy could sit in water, arrivals may fall further, and wholesale prices can rise toward ₹2,480/qtl. This is a what-if, not a confirmed loss.',
    contentHi: 'अगर बारिश अनुमान से 20% ज्यादा हुई तो करीब 58,000 हेक्टेयर अतिरिक्त धान पानी में रह सकती है। मंडी आवक और गिर सकती है, भाव ₹2,480/क्विंटल तक जा सकते हैं। यह “अगर ऐसा हो तो” है — पक्का नुकसान नहीं।',
    tags: ['#WhatIf', '#Counterfactual', '#ScenarioEngine', '#SupplyShock'],
    routingPipeline: [
      { moduleNumber: 7, moduleName: 'Downscaling', shortRole: 'Boundary layer', port: 3007, routeUrl: '/modules/7', status: 'RESOLVED', metricOutput: '5km Resampling' },
      { moduleNumber: 10, moduleName: 'Phenology', shortRole: 'Thermal alignment', port: 3010, routeUrl: '/modules/10', status: 'RESOLVED', metricOutput: 'Panicle Stage' },
      { moduleNumber: 11, moduleName: 'Soil Water', shortRole: 'Hydraulic balance', port: 3011, routeUrl: '/modules/11', status: 'RESOLVED', metricOutput: 'Perched 0.82m' },
      { moduleNumber: 18, moduleName: 'Scenario Simulator', shortRole: 'Coupled HPC solver', port: 3018, routeUrl: '/modules/18', status: 'RESOLVED', metricOutput: 'Δ: -5.12 LMT' }
    ],
    intelCard: {
      id: 'card_6',
      title: 'Counterfactual: +20% Rainfall Scenario Impact',
      region: 'Odisha Coastal Delta (All Districts)',
      hazardType: 'Amplified Submergence & Supply Shock',
      leadTime: 'Scenario Horizon',
      probabilityPct: 0,
      severity: 'HIGH',
      primaryMetrics: [
        { label: 'Δ Submergence', value: '+58,000 ha', delta: '+17%', direction: 'up' },
        { label: 'Supply Shock', value: '-5.12 LMT', delta: '+36%', direction: 'up' },
        { label: 'Modal Price', value: '₹2,480/qtl', delta: '+₹165', direction: 'up' },
        { label: 'Buffer Gap', value: '12,000 MT', delta: 'Shortfall', direction: 'down' }
      ],
      evidenceBullets: [
        'अगर बारिश 15% से ज्यादा बढ़ी तो पानी निकलने में देर लगेगी।',
        'फूल आने वाली धान 72 घंटे पानी में रहे तो दाने कम बन सकते हैं।',
        '40,000 टन भंडार कम पड़ सकता है — और 12,000 टन की ज़रूरत हो सकती है।'
      ],
      targetModuleNumber: 18,
      targetPort: 3018,
      targetActionLabel: '“अगर ऐसा हो तो” खोलें',
      uncertaintySpreadText: 'यह कल्पना है — पक्का पूर्वानुमान नहीं।'
    },
    stats: {
      replies: 11,
      reposts: 24,
      likes: 73,
      views: '3.8K',
      isLiked: false,
      isBookmarked: false
    }
  },
  {
    id: 'post_user_1',
    author: {
      name: 'crazybird',
      handle: 'YogyaJain16',
      avatarInitials: 'YJ',
      avatarColor: '#16181C',
      verified: true,
      roleBadge: 'Lead Researcher'
    },
    timestamp: '4h ago',
    content: 'Village rain maps and crop-stage advice are now talking to each other. False “crop fallen” alarms dropped about 34% in Cuttack and Jagatsinghpur.',
    contentHi: 'गाँव वाला बारिश नक्शा और फसल अवस्था की सलाह अब साथ चल रहे हैं। कटक और जगतसिंहपुर में झूठी “फसल गिर गई” चेतावनी करीब 34% कम हुई।',
    tags: ['#4DArchitecture', '#DiffusionDownscaling', '#PhenologyClock', '#Odisha'],
    routingPipeline: [
      { moduleNumber: 7, moduleName: 'Downscaling', shortRole: 'Diffusion SDE', port: 3007, routeUrl: '/modules/7', status: 'RESOLVED', metricOutput: 'CRPS = 0.18mm' },
      { moduleNumber: 10, moduleName: 'Phenology', shortRole: 'Growth stage clock', port: 3010, routeUrl: '/modules/10', status: 'RESOLVED', metricOutput: 'Panicle Init.' }
    ],
    intelCard: {
      id: 'card_user_1',
      title: 'Diffusion Downscaled Moisture Convergence vs Phenology',
      region: 'Odisha Coastal Delta',
      hazardType: 'Coupled Hydro-Thermal SDE',
      leadTime: '+72h Lead',
      probabilityPct: 82,
      severity: 'HIGH',
      primaryMetrics: [
        { label: 'CRPS Score', value: '0.18 mm', delta: '-22%', direction: 'down' },
        { label: 'Lodging Risk', value: '8.4%', delta: '-34%', direction: 'down' },
        { label: 'GDD Offset', value: '+14 °C-d', delta: 'Anthesis', direction: 'neutral' },
        { label: 'HPC Latency', value: '82 ms', delta: 'CUDA JIT', direction: 'up' }
      ],
      evidenceBullets: [
        'तटीय नक्शा अब गाँव के पास तक बारिश दिखाता है।',
        'फूल आने की अवस्था अलग से चिह्नित है — सारी फसल एक जैसी नहीं।',
        'झूठी चेतावनी कम हुई, इसलिए सलाह पर भरोसा बढ़ता है।'
      ],
      targetModuleNumber: 10,
      targetPort: 3010,
      targetActionLabel: 'फसल अवस्था खोलें',
      uncertaintySpreadText: 'यह अनुमान है — हर खेत अलग हो सकता है।'
    },
    stats: {
      replies: 18,
      reposts: 31,
      likes: 142,
      views: '6.4K',
      isLiked: true,
      isBookmarked: true
    },
    repliesList: [
      {
        id: 'rep_u1_1',
        postId: 'post_user_1',
        author: {
          name: 'Dr. Arindam Sen',
          handle: 'dr_arindam_sen',
          avatarInitials: 'AS',
          avatarColor: '#10b981',
          verified: true,
          roleBadge: 'Chief Agronomist'
        },
        timestamp: '3h ago',
        content: 'Remarkable validation, @YogyaJain16! The 34% drop in false positive lodging matches our field ground-truth in Puri. The Sub1A cultivar gene activation response is properly bounded now.',
        likes: 14,
        isLiked: false
      },
      {
        id: 'rep_u1_2',
        postId: 'post_user_1',
        author: {
          name: 'IMD Coastal Met Centre',
          handle: 'imd_bbsr',
          avatarInitials: 'IM',
          avatarColor: '#0ea5e9',
          verified: true,
          roleBadge: 'NWP Met'
        },
        timestamp: '2h ago',
        content: 'Our Doppler radar reflectivity at Paradip matches your diffusion downscaled 5km rainbands within 0.12 CRPS. Excellent synchronization between Engine 07 and ground sensors.',
        likes: 9,
        isLiked: true
      }
    ]
  },
  {
    id: 'post_user_2',
    author: {
      name: 'crazybird',
      handle: 'YogyaJain16',
      avatarInitials: 'YJ',
      avatarColor: '#16181C',
      verified: true,
      roleBadge: 'Lead Researcher'
    },
    timestamp: '1d ago',
    content: 'All 18 tools are live: sky watch, village maps, crop advice, and mandi prices. Ask in Hindi or English — the answer should make sense to a farmer, an officer, or a trader.',
    contentHi: 'सभी 18 औज़ार चालू हैं: आसमान की निगरानी, गाँव वाला नक्शा, फसल सलाह और मंडी भाव। हिंदी या अंग्रेज़ी में पूछें — किसान, अधिकारी या व्यापारी सब समझ सकें।',
    tags: ['#ATMOS4D', '#Microservices', '#FullStackIntelligence', '#OpenScience'],
    stats: {
      replies: 24,
      reposts: 58,
      likes: 219,
      views: '11.2K',
      isLiked: true,
      isBookmarked: false
    },
    repliesList: [
      {
        id: 'rep_u2_1',
        postId: 'post_user_2',
        author: {
          name: 'Atmos AI Desk',
          handle: 'atmos_ai',
          avatarInitials: 'AI',
          avatarColor: '#0ea5e9',
          verified: true,
          roleBadge: 'System Core'
        },
        timestamp: '22h ago',
        content: 'End-to-end signal propagation latency verified: 342ms from initial query parsing to full 18-engine coupled solve. Ready for live monsoon deployment.',
        likes: 27,
        isLiked: true
      }
    ]
  }
];

// =================== NEWS REPOSITORY ===================
export const CONTEXTUAL_NEWS_REPOSITORY: NewsItem[] = [
  {
    id: 'news_1',
    headline: 'IMD Issues Orange Alert for 6 Coastal Odisha Districts as Depression Intensifies',
    source: 'India Meteorological Dept',
    timestamp: '1h ago',
    category: 'Meteorology',
    aiRelevanceContext: 'Validates 5km downscaling precipitation intensity over Puri and Kendrapara.',
    relatedRegion: 'Odisha (Coastal Delta)',
    relatedHazard: 'Extreme Precipitation'
  },
  {
    id: 'news_2',
    headline: 'Mahanadi Basin Water Resources Board Opens 8 Sluice Gates at Jobra Barrage',
    source: 'The Hindu Businessline',
    timestamp: '3h ago',
    category: 'Hydrology',
    aiRelevanceContext: 'Directly alleviates root zone waterlogging and perched water table depth.',
    relatedRegion: 'Odisha (Coastal Delta)',
    relatedHazard: 'Flash Waterlogging'
  },
  {
    id: 'news_3',
    headline: 'OSCSC Prepares 45,000 MT Paddy Buffer Stock to Mitigate Wholesale Price Spikes',
    source: 'AgriNews India',
    timestamp: '5h ago',
    category: 'Market Policy',
    aiRelevanceContext: 'Consistent with Module 18 buffer release scenario recommendations.',
    relatedRegion: 'Odisha (Coastal Delta)',
    relatedHazard: 'Supply Contraction'
  },
  {
    id: 'news_4',
    headline: 'Punjab Agriculture University Advises Light Evening Irrigation Against Rising Canopy Heat',
    source: 'PAU Agronomy Bulletin',
    timestamp: '2h ago',
    category: 'Agronomy',
    aiRelevanceContext: 'Micro-irrigation mitigates vapor pressure deficit during wheat flowering anthesis.',
    relatedRegion: 'Punjab (Indo-Gangetic Basin)',
    relatedHazard: 'Canopy Heat Stress'
  },
  {
    id: 'news_5',
    headline: 'Wheat Procurement Centers in Ludhiana and Khanna Report High Moisture Grain Batches',
    source: 'Food Corporation of India',
    timestamp: '4h ago',
    category: 'Procurement',
    aiRelevanceContext: 'Correlates with unseasonal convective rainfall showers over northern blocks.',
    relatedRegion: 'Punjab (Indo-Gangetic Basin)',
    relatedHazard: 'Extreme Precipitation'
  },
  {
    id: 'news_6',
    headline: 'Indore Mandi Soybean Daily Arrivals Drop 14% Amid Prolonged Dry Spell in Malwa',
    source: 'Commodity Online',
    timestamp: '1h ago',
    category: 'Markets',
    aiRelevanceContext: 'Deccan moisture deficit triggers farmer holding behavior and price firmness.',
    relatedRegion: 'Maharashtra (Deccan Plateau)',
    relatedHazard: 'Root Zone Moisture Deficit'
  },
  {
    id: 'news_7',
    headline: 'Central Govt Approves PM-AASHA Price Deficiency Payments for Pulse & Oilseed Farmers',
    source: 'Ministry of Agriculture',
    timestamp: '6h ago',
    category: 'Policy',
    aiRelevanceContext: 'Provides downside revenue floor against crop damage from dry spell anomalies.',
    relatedRegion: 'Maharashtra (Deccan Plateau)',
    relatedHazard: 'Root Zone Moisture Deficit'
  }
];

// =================== 18-MODEL CATALOG ===================
export const GROUPED_MODEL_CATEGORIES: GroupedModelCategory[] = [
  {
    categoryName: 'Atmospheric Physics & Planetary Ingestion',
    description: 'Raw 4D/5D gridded tensor ingestion, 30-year climatological EFI, and spherical GNN trajectory prediction.',
    colorHex: '#38bdf8',
    models: [
      { moduleNumber: 1, title: 'Planetary 4D Atmospheric Telemetry', shortDescription: 'Volumetric atmospheric stratification across 5 pressure levels (1000–300 hPa).', port: 3001, routeUrl: '/modules/1', keyMetric: '5 Levels // 12km Grid', tag: 'NWP Core' },
      { moduleNumber: 2, title: 'Volumetric Stratified Atmosphere', shortDescription: 'Rayleigh scattering and physical wind streamlines across boundary layers.', port: 3002, routeUrl: '/modules/2', keyMetric: 'GLSL Raymarching // 60 FPS', tag: 'Atmosphere 3D' },
      { moduleNumber: 3, title: 'Climatological Extreme Anomaly (EFI)', shortDescription: 'Multi-variable quantile departure scoring against 30-year climatological normal.', port: 3003, routeUrl: '/modules/3', keyMetric: 'EFI > 0.85 // P95 Mask', tag: 'Anomaly Engine' },
      { moduleNumber: 4, title: 'Dynamic Hazard Footprint Bounding', shortDescription: 'Adaptive storm bounding box isolation with Core/Primary/Halo zoning.', port: 3004, routeUrl: '/modules/4', keyMetric: 'Spatial IoU = 0.84', tag: 'Footprint' },
      { moduleNumber: 5, title: 'Spherical Temporal GNN Trajectory', shortDescription: 'Icosahedral spherical graph neural network tracking 3–10 day storm tracks.', port: 3005, routeUrl: '/modules/5', keyMetric: 'Displacement < 42 km', tag: 'GNN Solver' },
      { moduleNumber: 6, title: 'Multimodal Ensemble Probability', shortDescription: 'Continuous probability density surfaces separating aleatoric from epistemic uncertainty.', port: 3006, routeUrl: '/modules/6', keyMetric: '50 Members // Brier 0.082', tag: 'Probability' }
    ]
  },
  {
    categoryName: 'Physics-Guided Downscaling & Preservation',
    description: 'Conditional diffusion models super-resolving 12km regional fields into 5km coastal hazard fields.',
    colorHex: '#06b6d4',
    models: [
      { moduleNumber: 7, title: 'Probabilistic Downscaling (12km → 5km)', shortDescription: 'Terrain-conditioned diffusion honoring orographic boundaries and moisture conservation.', port: 3007, routeUrl: '/modules/7', keyMetric: 'CRPS = 0.18 mm // 5km Meso', tag: 'Diffusion SDE' },
      { moduleNumber: 8, title: 'Multi-Run Extreme Event Comparison', shortDescription: 'Synchronized run-to-run verification detecting model drift and rapid intensification.', port: 3008, routeUrl: '/modules/8', keyMetric: 'Δ Intensity +24%', tag: 'Diagnostics' }
    ]
  },
  {
    categoryName: 'Agronomic Exposure, Hydrology & Yield Risk',
    description: 'Cadastral agricultural intersections, thermal GDD phenology, SWAT hydrology, and skew-t yield risk.',
    colorHex: '#10b981',
    models: [
      { moduleNumber: 9, title: 'Crop System Exposure Field', shortDescription: 'Geospatial agricultural exposure mapping strictly upholding Exposure ≠ Loss.', port: 3009, routeUrl: '/modules/9', keyMetric: '342,400 ha // 30.8% Area', tag: 'Cadastral Overlay' },
      { moduleNumber: 10, title: 'Living Growth Stage & Phenology', shortDescription: 'Thermal GDD clock tracking flowering anthesis vs vegetative lodging vulnerability.', port: 3010, routeUrl: '/modules/10', keyMetric: 'GDD: 1,420 °C-d // Panicle', tag: 'CSM-CERES' },
      { moduleNumber: 11, title: '3D Soil & Water Balance', shortDescription: 'SWAT 3-tier unsaturated hydraulic conductivity and perched water table depth.', port: 3011, routeUrl: '/modules/11', keyMetric: '44.5% Sat // 0.82m Table', tag: 'SWAT Hydrology' },
      { moduleNumber: 12, title: 'Explainable Crop Recommendation', shortDescription: 'TreeSHAP waterfall and counterfactual agronomic switches with transparent justifications.', port: 3012, routeUrl: '/modules/12', keyMetric: 'SHAP +0.42 t/ha', tag: 'SHAP Optimizer' },
      { moduleNumber: 13, title: 'Quantile Yield Risk & Distribution', shortDescription: 'Skew-t probability density curves capturing fat left-tail losses and downside breakeven risk.', port: 3013, routeUrl: '/modules/13', keyMetric: 'P50: 3.12 t/ha // Risk: 18.2%', tag: 'Skew-t KDE' },
      { moduleNumber: 14, title: 'Environmental Pest & Disease Risk', shortDescription: 'Microclimate pathogen favorability indicators for Bacterial Blight, Blast, and BPH vector.', port: 3014, routeUrl: '/modules/14', keyMetric: 'Leaf Wetness: 14.2h/d', tag: 'NPSS Pathogens' }
    ]
  },
  {
    categoryName: 'Macro Supply Shock, Mandi Equilibrium & Simulation',
    description: 'District deficit aggregation, non-causal mandi elasticity, and what-if counterfactual scenario simulator.',
    colorHex: '#c084fc',
    models: [
      { moduleNumber: 15, title: 'Supply & Mandi Market Intelligence', shortDescription: 'Spatial equilibrium pricing respecting weather as contextual evidence rather than single cause.', port: 3015, routeUrl: '/modules/15', keyMetric: '₹2,315/qtl // Arrivals -14.2%', tag: 'Spatial Mandi' },
      { moduleNumber: 16, title: 'Cross-Domain Cascade Dependency Chain', shortDescription: 'End-to-end signal propagation tracing uncertainty widening from ±14% to ±41%.', port: 3016, routeUrl: '/modules/16', keyMetric: '5-Hop Graph DAG', tag: 'Cascade Chain' },
      { moduleNumber: 17, title: 'Regional Supply Shock Map & FPO Logistics', shortDescription: '3D extruded district deficit aggregation and buffer evacuation protocols for state planners.', port: 3017, routeUrl: '/modules/17', keyMetric: 'Deficit: -3.76 LMT', tag: 'Supply Shock' },
      { moduleNumber: 18, title: 'Counterfactual Decision / Scenario Simulator', shortDescription: 'Decision support environment preserving baseline vs scenario with full async HPC solver.', port: 3018, routeUrl: '/modules/18', keyMetric: 'Async HPC 5-Step Solver', tag: 'Simulator Engine' }
    ]
  }
];

// =================== NOTIFICATIONS ===================
export const INITIAL_NOTIFICATIONS: ShellNotification[] = [
  {
    id: 'notif_1',
    type: 'hazard_alert',
    title: 'CRITICAL: Bay of Bengal Depression Upgrade',
    message: 'Cyclonic system upgraded to Deep Depression. Ensemble agreement now 78%. Odisha coastal districts on orange alert.',
    timestamp: '12m ago',
    read: false,
    severity: 'CRITICAL',
    actionModuleNumber: 6,
    actionPort: 3006,
    sourceAvatar: '⚡',
    sourceColor: '#ef4444'
  },
  {
    id: 'notif_2',
    type: 'module_complete',
    title: 'Module 7 Downscaling Complete',
    message: 'Conditional diffusion 12km→5km resolved. CRPS = 0.18mm on coastal verification subset. 5km field ready for cascade.',
    timestamp: '28m ago',
    read: false,
    actionModuleNumber: 7,
    actionPort: 3007,
    sourceAvatar: 'M7',
    sourceColor: '#06b6d4'
  },
  {
    id: 'notif_3',
    type: 'ai_response',
    title: 'Intelligence Synthesis: Paddy Exposure',
    message: 'Completed 6-module agronomic cascade. 342,400 ha exposed, 12.4% floret sterility risk identified.',
    timestamp: '1h ago',
    read: false,
    sourceAvatar: 'AI',
    sourceColor: '#0ea5e9'
  },
  {
    id: 'notif_4',
    type: 'mention',
    title: 'Dr. Arindam Sen mentioned you',
    message: '@YogyaJain16 see the updated Swarna-Sub1 flood tolerance analysis in the phenology viewport.',
    timestamp: '2h ago',
    read: true,
    sourceAvatar: 'AS',
    sourceColor: '#10b981'
  },
  {
    id: 'notif_5',
    type: 'system',
    title: 'NEPS-G 00Z Run Ingested',
    message: 'Latest NCUM/NEPS-G 00Z initialization cycle ingested successfully. 24 ensemble members, 5 isobaric levels.',
    timestamp: '3h ago',
    read: true,
    sourceAvatar: '📡',
    sourceColor: '#38bdf8'
  },
  {
    id: 'notif_6',
    type: 'hazard_alert',
    title: 'ELEVATED: Punjab Thermal Surge',
    message: 'Terminal heat wave approaching wheat anthesis window. GDD accumulation rate exceeding critical threshold in Ludhiana belt.',
    timestamp: '4h ago',
    read: true,
    severity: 'ELEVATED',
    actionModuleNumber: 10,
    actionPort: 3010,
    sourceAvatar: '🌡',
    sourceColor: '#f59e0b'
  }
];

// =================== MODULE HEALTH STATUS ===================
export const INITIAL_MODULE_HEALTH: ModuleHealthStatus[] = [
  { moduleNumber: 1, port: 3001, name: 'Planetary Telemetry', status: 'ONLINE', latencyMs: 42, lastHeartbeat: '2s ago', gpuUtilPct: 12, memoryMB: 340 },
  { moduleNumber: 2, port: 3002, name: 'Stratified Atmosphere', status: 'ONLINE', latencyMs: 38, lastHeartbeat: '3s ago', gpuUtilPct: 45, memoryMB: 890 },
  { moduleNumber: 3, port: 3003, name: 'Anomaly Engine', status: 'ONLINE', latencyMs: 55, lastHeartbeat: '1s ago', gpuUtilPct: 8, memoryMB: 210 },
  { moduleNumber: 4, port: 3004, name: 'Hazard Footprint', status: 'ONLINE', latencyMs: 31, lastHeartbeat: '4s ago', gpuUtilPct: 5, memoryMB: 180 },
  { moduleNumber: 5, port: 3005, name: 'GNN Trajectory', status: 'ONLINE', latencyMs: 67, lastHeartbeat: '2s ago', gpuUtilPct: 62, memoryMB: 1240 },
  { moduleNumber: 6, port: 3006, name: 'Probability Field', status: 'ONLINE', latencyMs: 48, lastHeartbeat: '1s ago', gpuUtilPct: 28, memoryMB: 560 },
  { moduleNumber: 7, port: 3007, name: 'Downscaling', status: 'ONLINE', latencyMs: 124, lastHeartbeat: '5s ago', gpuUtilPct: 78, memoryMB: 2100 },
  { moduleNumber: 8, port: 3008, name: 'Extreme Comparison', status: 'ONLINE', latencyMs: 36, lastHeartbeat: '3s ago', gpuUtilPct: 15, memoryMB: 320 },
  { moduleNumber: 9, port: 3009, name: 'Crop Exposure', status: 'ONLINE', latencyMs: 28, lastHeartbeat: '2s ago', gpuUtilPct: 4, memoryMB: 150 },
  { moduleNumber: 10, port: 3010, name: 'Phenology', status: 'ONLINE', latencyMs: 45, lastHeartbeat: '1s ago', gpuUtilPct: 22, memoryMB: 440 },
  { moduleNumber: 11, port: 3011, name: 'Soil Water', status: 'ONLINE', latencyMs: 52, lastHeartbeat: '4s ago', gpuUtilPct: 18, memoryMB: 380 },
  { moduleNumber: 12, port: 3012, name: 'Crop Recommendation', status: 'ONLINE', latencyMs: 33, lastHeartbeat: '2s ago', gpuUtilPct: 10, memoryMB: 260 },
  { moduleNumber: 13, port: 3013, name: 'Yield Risk', status: 'ONLINE', latencyMs: 41, lastHeartbeat: '3s ago', gpuUtilPct: 14, memoryMB: 290 },
  { moduleNumber: 14, port: 3014, name: 'Pest Disease', status: 'DEGRADED', latencyMs: 340, lastHeartbeat: '12s ago', gpuUtilPct: 2, memoryMB: 120 },
  { moduleNumber: 15, port: 3015, name: 'Market Intel', status: 'ONLINE', latencyMs: 38, lastHeartbeat: '1s ago', gpuUtilPct: 6, memoryMB: 200 },
  { moduleNumber: 16, port: 3016, name: 'Cascade Chain', status: 'ONLINE', latencyMs: 56, lastHeartbeat: '2s ago', gpuUtilPct: 20, memoryMB: 410 },
  { moduleNumber: 17, port: 3017, name: 'Supply Shock', status: 'ONLINE', latencyMs: 44, lastHeartbeat: '3s ago', gpuUtilPct: 16, memoryMB: 350 },
  { moduleNumber: 18, port: 3018, name: 'Scenario Simulator', status: 'COLD_START', latencyMs: 0, lastHeartbeat: 'N/A', gpuUtilPct: 0, memoryMB: 0 }
];

// =================== EXPLORE TOPICS ===================
export const EXPLORE_TOPICS: ExploreTopic[] = [
  { id: 'exp_1', category: 'Weather', title: 'Bay of Bengal Cyclonic Depression 2026', subtitle: 'Real-time tracking and ensemble probability', postCount: '4.2K analyses', trending: true, relatedModules: [1, 3, 5, 6], region: 'Bay of Bengal' },
  { id: 'exp_2', category: 'Agriculture', title: 'Kharif Paddy Submergence Exposure', subtitle: 'Flood tolerance and phenological vulnerability', postCount: '2.8K analyses', trending: true, relatedModules: [9, 10, 11, 13], region: 'Odisha' },
  { id: 'exp_3', category: 'Market', title: 'Paddy Mandi Price Surge in Eastern India', subtitle: 'Supply shock and wholesale price equilibrium', postCount: '1.9K analyses', trending: true, relatedModules: [15, 17], region: 'Odisha' },
  { id: 'exp_4', category: 'Weather', title: 'Indo-Gangetic Terminal Heat Wave', subtitle: 'GDD accumulation and wheat anthesis stress', postCount: '1.2K analyses', trending: false, relatedModules: [3, 7, 10], region: 'Punjab' },
  { id: 'exp_5', category: 'Agriculture', title: 'Bacterial Leaf Blight Outbreak Risk', subtitle: 'Leaf wetness and pathogen favorability index', postCount: '892 analyses', trending: false, relatedModules: [7, 14], region: 'Odisha' },
  { id: 'exp_6', category: 'Market', title: 'Soybean Arrival Elasticity in Vidarbha', subtitle: 'Farmer holding behavior and price firmness', postCount: '756 analyses', trending: false, relatedModules: [15, 17], region: 'Maharashtra' },
  { id: 'exp_7', category: 'Research', title: 'Conditional Diffusion Downscaling Validation', subtitle: 'CRPS improvement and orographic fidelity', postCount: '634 analyses', trending: false, relatedModules: [7, 8], region: 'Pan-India' },
  { id: 'exp_8', category: 'Policy', title: 'PM-AASHA Crop Damage Compensation Framework', subtitle: 'State-wise yield trigger and payout mechanics', postCount: '518 analyses', trending: false, relatedModules: [13, 15, 18], region: 'Pan-India' },
  { id: 'exp_9', category: 'Weather', title: 'Mahanadi Estuarine Drainage Lag Analysis', subtitle: 'Tidal interference and sluice gate capacity', postCount: '445 analyses', trending: false, relatedModules: [4, 11], region: 'Odisha' },
  { id: 'exp_10', category: 'Agriculture', title: 'Swarna-Sub1 Flood Tolerance Benchmarks', subtitle: 'Gene activation and survival probability', postCount: '387 analyses', trending: false, relatedModules: [10, 12], region: 'Eastern India' }
];
