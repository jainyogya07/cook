'use client';

// ============================================================================
// ATMOS 4D — NATIONAL & PLANETARY INTELLIGENCE ECOSYSTEM
// Public Landing Page (Cinematic Defense / Meteorological Interactive Experience)
// Features: Animated SVG Emblem Logo, Gyroscopic 4D Radar Sphere, 
// Live Anomaly Telemetry Switcher, Interactive Cascade Pipeline,
// Live Scenario Sandbox, Glassmorphic Spotlight Cards, and Fluid Micro-interactions.
// ============================================================================

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CirclePlay,
  Globe2,
  Orbit,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
  Wind,
  CloudRain,
  Activity,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Compass,
  CheckCircle2,
  RefreshCw,
  BarChart3,
  Flame,
  AlertTriangle,
  Play
} from 'lucide-react';
import AtmosphericBackgroundCanvas from '@/components/canvas/AtmosphericBackgroundCanvas';
import AtmosAnimatedLogo from '@/components/common/AtmosAnimatedLogo';
import { ENGINE_FIELD_GUIDE } from '@/data/engineFieldGuide';
import { t } from '@/i18n/copy';
import { useShellStore } from '@/services/useShellStore';

interface PublicLandingPageProps {
  onEnterAuth: () => void;
  onBrowseGuest: () => void;
}

const tickerItemsEn = [
  'WEATHER TO MANDI',
  'LIVE ENSEMBLE SIGNALS',
  'VILLAGE MAPS',
  'CROP + MANDI PRICES',
  'SIGN IN FOR FULL ENGINES',
  'FARMER · RELIEF · TRADER'
];
const tickerItemsHi = [
  'मौसम से मंडी तक',
  'लाइव संकेत',
  'गाँव वाला नक्शा',
  'फसल और मंडी भाव',
  'पूरे इंजन के लिए साइन इन',
  'किसान · राहत · व्यापारी'
];

function landingText(locale: 'en' | 'hi') {
  if (locale === 'hi') {
    return {
      toolsLive: '18 औज़ार चालू',
      navPlatform: 'प्लेटफ़ॉर्म',
      navSandbox: 'लाइव सैंडबॉक्स',
      navCascade: 'श्रृंखला',
      navOperators: 'उपयोगकर्ता',
      navGuide: 'गाइड',
      navAbout: 'हमारे बारे में',
      proofLive: 'लाइव अपडेट',
      proofTools: '18 साफ़ औज़ार',
      proofMap: 'गाँव वाला नक्शा',
      proofLang: 'केवल हिन्दी',
      guideEye: 'गाइड · कैसे पूछें',
      guideH1: 'चार बात लिखें।',
      guideH2: 'सीधा जवाब मिलेगा.',
      guideSub: 'जगह, समय, फसल या खतरा, और क्या चाहिए — यही लिखें। आवाज़ भी चलती है।',
      steps: [
        { n: '01', title: 'जगह', ex: 'ओडिशा तट, नाशिक, पंजाब' },
        { n: '02', title: 'समय', ex: 'अगले 3 दिन, इस हफ्ते' },
        { n: '03', title: 'फसल या खतरा', ex: 'धान, प्याज, चक्रवात, बाढ़' },
        { n: '04', title: 'क्या चाहिए', ex: 'तैयारी, छिड़काव, भाव' }
      ],
      examplesTitle: 'उदाहरण प्रश्न',
      examples: [
        'ओडिशा में अगले 3 दिन धान का कितना खतरा है?',
        'नाशिक प्याज मंडी पर भारी बारिश का असर बताओ।',
        'पंजाब में इस हफ्ते गेहूं के लिए क्या सलाह है?',
        'विदर्भ सोयाबीन में बारिश 15% कम हो तो क्या होगा?'
      ],
      aboutEye: 'हमारे बारे में',
      aboutH1: 'मौसम की बात,',
      aboutH2: 'आम भाषा में.',
      aboutBody: 'ATMOS 4D एक भारतीय मौसम-से-मंडी प्लेटफ़ॉर्म है। हम आकाश की जानकारी को गाँव, खेत और मंडी तक लाते हैं — ताकि किसान, आपदा टीम और व्यापारी बिना जटिल शब्दों के फैसला ले सकें। अठारह औज़ार एक श्रृंखला में जुड़े हैं: आसमान → गाँव का नक्शा → फसल सलाह → मंडी भाव।',
      aboutStat1: 'साफ़ औज़ार · बारिश से भाव तक',
      aboutStat2: 'पूछें और जवाब पाएँ',
      aboutStat2Label: 'हिंदी',
      aboutStat3: 'साइनअप के साथ प्रोफ़ाइल',
      aboutCta: 'अंदर आएँ',
      p1t: 'आम आदमी पहले.',
      p1: 'जवाब किसान, अधिकारी और व्यापारी समझ सकें। विज्ञान अंदर है, शब्द बाहर सरल हैं।',
      p2t: 'पूरी कहानी दिखाओ.',
      p2: 'बादल से खेत तक, खेत से मंडी तक — कड़ी छुपाते नहीं। क्या लिखना है, क्या मिलेगा, साफ़ है।',
      p3t: 'फैसला लेने के लिए.',
      p3: 'बाढ़ तैयारी, छिड़काव, बोआई या भाव — हर औज़ार एक काम के लिए बना है, दिखावे के लिए नहीं।',
      opEye: 'किसान · आपदा टीम · मंडी',
      opH1: 'अनिश्चित मौसम को',
      opH2: 'काम की सलाह बनाएँ.',
      opSub: 'आपदा राहत, कृषि सलाहकार, मंडी व्यापारी और ख़रीद टीम — जिन्हें साफ़ भाषा में “अब क्या करें” चाहिए, न कि जटिल रिपोर्ट।',
      opStat2: 'गाँव',
      opStat2l: 'स्थानीय नक्शा जिस पर काम हो',
      opStat3: 'हिंदी',
      opStat3l: 'पूछें, समझें, फैसला लें',
      opCta: 'अकाउंट बनाएँ',
      quote: 'मौसम की तैयारी सिर्फ़ बारिश का आँकड़ा नहीं है। बात यह है कि बादल से खेत तक, और खेत से मंडी भाव तक पूरी कहानी समय रहते दिखे — ताकि इंसान का नुकसान कम हो।',
      quoteTitle: 'मिशन सिद्धांत',
      footerStatus: '18 औज़ार चालू · हिन्दी में पूछें',
      footerCta: 'अंदर आएँ',
      footerSub: 'मौसम से मंडी तक',
      storyEye: 'एक जगह पूरी कहानी',
      storyH1: 'आसमान से गाँव तक,',
      storyH2: 'गाँव से मंडी तक.',
      storySub: 'ज़्यादातर मौसम ऐप सिर्फ़ मिलीमीटर बताते हैं। ATMOS 4D बताता है कि बारिश के बाद खेत को क्या होगा और मंडी भाव कैसे बदल सकते हैं — साधारण भाषा में।',
      pillar1t: 'आसमान की निगरानी',
      pillar1d: 'चक्रवात, तेज़ बारिश और लू कहाँ बन रही है — पहले दिखे, फिर गाँव तक पहुँचे।',
      pillar2t: 'गाँव वाला नक्शा',
      pillar2d: 'बड़े मौसम नक्शे को गाँव के पास तक लाते हैं — कहाँ पानी भरेगा, कहाँ हवा तेज़ होगी।',
      pillar3t: 'फसल सलाह और मंडी भाव',
      pillar3d: 'मौसम को फसल अवस्था, कीट खतरे, आवक और भाव से जोड़ते हैं — ताकि “अब क्या करें” साफ़ हो।',
      simEye: 'लाइव उदाहरण',
      simH1: 'एक सवाल चुनें, पूरी कहानी देखें.',
      simSub: 'चक्रवात, फसल या मंडी — नीचे से चुनें। दिखेगा कि आसमान से खेत तक क्या बदलेगा।',
      inspectStream: '4D स्ट्रीम देखें',
      launchEngine: 'इंजन खोलें',
      cascadeEye: '18 औज़ार की श्रृंखला',
      cascadeH1: 'अठारह साफ़ औज़ार.',
      cascadeH2: 'एक पूरी कहानी.',
      cascadeSub: 'आसमान से गाँव नक्शा, फसल सलाह और मंडी भाव तक — कोई कड़ी छुपी नहीं।',
      cascade: [
        { num: '01', title: 'आकाश', sub: 'मौसम मॉडल', detail: 'बारिश, हवा और बादल का पहला चित्र' },
        { num: '02', title: 'अनोखा मौसम', sub: 'खतरे की पहचान', detail: 'क्या यह सामान्य से अलग है' },
        { num: '03', title: 'गाँव नक्शा', sub: 'स्थानीय तस्वीर', detail: '12 किमी से 5 किमी तक साफ़ नक्शा' },
        { num: '04', title: 'फसल', sub: 'खेत पर असर', detail: 'फसल की अवस्था और मिट्टी का जोखिम' },
        { num: '05', title: 'मंडी', sub: 'आवक और भाव', detail: 'सप्लाई झटका और मंडी कीमत' }
      ]
    };
  }
  return {
    toolsLive: '18 engines live',
    navPlatform: 'Platform',
    navSandbox: 'Live sandbox',
    navCascade: 'The cascade',
    navOperators: 'Operators',
    navGuide: 'Guidebook',
    navAbout: 'About',
    proofLive: 'Live updates',
    proofTools: '18 clear tools',
    proofMap: 'Village-scale maps',
    proofLang: 'English only',
    guideEye: 'Guide · how to ask',
    guideH1: 'Write four things.',
    guideH2: 'Get a direct answer.',
    guideSub: 'Place, time, crop or hazard, and what you need. Voice works too.',
    steps: [
      { n: '01', title: 'Place', ex: 'Odisha coast, Nashik, Punjab' },
      { n: '02', title: 'Time', ex: 'Next 3 days, this week' },
      { n: '03', title: 'Crop or hazard', ex: 'Paddy, onion, cyclone, flood' },
      { n: '04', title: 'What you need', ex: 'Preparedness, spray, price' }
    ],
    examplesTitle: 'Example questions',
    examples: [
      'How much paddy risk on the Odisha coast in the next 3 days?',
      'How will heavy rain move Nashik onion mandi prices?',
      'What should Punjab wheat do this week?',
      'What if Vidarbha soybean rain falls 15%?'
    ],
    aboutEye: 'About us',
    aboutH1: 'Weather, spoken',
    aboutH2: 'in plain language.',
    aboutBody: 'ATMOS 4D is an Indian weather-to-mandi platform. Sky signals reach the village, the field, and the market — so farmers, relief teams, and traders can decide without jargon. Eighteen tools sit in one chain: sky → village map → crop advice → mandi price.',
    aboutStat1: 'Clear tools · rain to price',
    aboutStat2: 'Ask and get an answer',
    aboutStat2Label: 'English',
    aboutStat3: 'Profile with signup',
    aboutCta: 'Enter',
    p1t: 'People first.',
    p1: 'Farmers, officers, and traders should understand the answer. The science stays inside; the words stay simple.',
    p2t: 'Show the full story.',
    p2: 'Cloud to field, field to mandi — no hidden step. What to type, and what you get, is clear.',
    p3t: 'Built for a decision.',
    p3: 'Flood prep, spray, sowing, or price — each tool exists for one job, not for show.',
    opEye: 'Farmer · relief · mandi',
    opH1: 'Turn uncertain weather',
    opH2: 'into usable advice.',
    opSub: 'Relief cells, farm advisors, mandi traders, and procurement teams who need “what to do now” — not a dense report.',
    opStat2: 'Village',
    opStat2l: 'A local map you can act on',
    opStat3: 'English',
    opStat3l: 'Ask, understand, decide',
    opCta: 'Create an account',
    quote: 'Preparedness is not a rainfall statistic. It is seeing the story from cloud to field to mandi in time — so people lose less.',
    quoteTitle: 'Mission principle',
    footerStatus: '18 engines live · ask in English',
    footerCta: 'Enter',
    footerSub: 'Weather to mandi',
    storyEye: 'The full story in one place',
    storyH1: 'From sky to village,',
    storyH2: 'village to mandi.',
    storySub: 'Most weather apps stop at millimetres. ATMOS 4D shows what rain does to the field and how mandi prices may move — in plain language.',
    pillar1t: 'Sky watch',
    pillar1d: 'Where cyclones, heavy rain and heat are forming — seen first, then taken to the village.',
    pillar2t: 'Village map',
    pillar2d: 'A large weather map brought down to village scale — where water will pond, where wind will rise.',
    pillar3t: 'Crop advice and mandi prices',
    pillar3d: 'Weather linked to crop stage, pest risk, arrivals and price — so “what to do now” is clear.',
    simEye: 'Live example',
    simH1: 'Pick a question. See the full story.',
    simSub: 'Cyclone, crop or mandi — choose below. Watch what changes from sky to field.',
    inspectStream: 'Inspect 4D stream',
    launchEngine: 'Open engines',
    cascadeEye: 'The 18-engine chain',
    cascadeH1: 'Eighteen clear tools.',
    cascadeH2: 'One unbroken story.',
    cascadeSub: 'Sky to village map, crop advice and mandi price — no hidden step.',
    cascade: [
      { num: '01', title: 'ATMOSPHERE', sub: 'Weather models', detail: 'First picture of rain, wind and cloud' },
      { num: '02', title: 'ANOMALIES', sub: 'Hazard detection', detail: 'Whether this weather is unusual' },
      { num: '03', title: 'DOWNSCALING', sub: 'Local picture', detail: 'From 12 km to a 5 km village map' },
      { num: '04', title: 'AGRONOMY', sub: 'Field impact', detail: 'Crop stage and soil risk' },
      { num: '05', title: 'MARKETS', sub: 'Arrivals and price', detail: 'Supply shock and mandi movement' }
    ]
  };
}

interface AnomalyTarget {
  id: string;
  name: string;
  region: string;
  val: string;
  metric: string;
  leadTime: string;
  type: 'severe' | 'warning' | 'alert';
  coords: { x: number; y: number };
  details: string;
}

const anomalyTargets: AnomalyTarget[] = [
  {
    id: 'odisha',
    name: 'DEEP DEPRESSION BOB-04',
    region: 'COASTAL ODISHA & BENGAL',
    val: '78.4%',
    metric: 'PRECIPITATION ANOMALY',
    leadTime: '+48H LEAD',
    type: 'severe',
    coords: { x: 68, y: 38 },
    details: 'Coupled WRF-5km indicates 140mm/24h peak accumulation. Landfall vector stabilized.'
  },
  {
    id: 'punjab',
    name: 'THERMAL FLOWERING STRESS',
    region: 'PUNJAB & HARYANA BELT',
    val: '+4.2°C',
    metric: 'TEMPERATURE EXCURSION',
    leadTime: '+72H LEAD',
    type: 'warning',
    coords: { x: 34, y: 28 },
    details: 'Canopy thermal envelope exceeding 35.8°C threshold during critical wheat grain-filling.'
  },
  {
    id: 'maharashtra',
    name: 'MANDI SUPPLY SHOCK',
    region: 'NASHIK & PUNE AGRI-CORRIDOR',
    val: '8.9 / 10',
    metric: 'PRICE VOLATILITY INDEX',
    leadTime: '+96H LEAD',
    type: 'alert',
    coords: { x: 42, y: 64 },
    details: 'Localized hail & excess moisture driving 34% projected mandi arrival contraction.'
  },
  {
    id: 'karnataka',
    name: 'SOIL MOISTURE DEFICIT',
    region: 'DECCAN SEMI-ARID ZONE',
    val: '-42%',
    metric: 'ROOT ZONE SATURATION',
    leadTime: '+120H LEAD',
    type: 'warning',
    coords: { x: 48, y: 78 },
    details: '0-100cm soil water potential critical for rainfed pulses and rabi oilseeds.'
  }
];

interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: React.ReactNode;
  primaryMetric: string;
  primaryLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  description: string;
  engines: string[];
  statusColor: string;
}

const scenarios: SimulationScenario[] = [
  {
    id: 'cyclone',
    title: 'Severe Cyclone & Coastal Surge',
    category: 'ATMOSPHERE & HYDROLOGY',
    badge: 'STAGE 4 ALERT',
    icon: <Wind size={18} className="text-cyan-400" />,
    primaryMetric: '142 km/h',
    primaryLabel: 'Sustained Gust Velocity',
    secondaryMetric: '3.8m',
    secondaryLabel: 'Coastal Wave Setup',
    description: 'Autonomous 12km ECMWF downscaling down to 5km terrain-aware grid. Wind field trajectories coupled directly to estuarine flood hazard.',
    engines: ['Engine 01 NWP', 'Engine 03 Anomaly', 'Engine 05 Trajectory', 'Engine 07 Downscale'],
    statusColor: '#06B6D4'
  },
  {
    id: 'heatwave',
    title: 'Wheat Thermal Desiccation Spike',
    category: 'AGRONOMIC EXPOSURE',
    badge: 'CROP YIELD RISK',
    icon: <Flame size={18} className="text-amber-400" />,
    primaryMetric: '-14.8%',
    primaryLabel: 'Projected Harvest Loss',
    secondaryMetric: '6.4M ha',
    secondaryLabel: 'Exposed Canopy Area',
    description: 'High-temperature anomaly intersects phenological stage 4 (grain filling). Accelerated senescence predicted across 14 agricultural districts.',
    engines: ['Engine 08 Extreme Comp', 'Engine 09 Exposure', 'Engine 10 Phenology', 'Engine 13 Yield Risk'],
    statusColor: '#F59E0B'
  },
  {
    id: 'mandi',
    title: 'Tomato & Onion Mandi Price Surge',
    category: 'MARKET INTELLIGENCE',
    badge: 'SUPPLY CHAIN SHOCK',
    icon: <TrendingUp size={18} className="text-emerald-400" />,
    primaryMetric: '+42.5%',
    primaryLabel: 'Modal Price Shift',
    secondaryMetric: '4,800 MT',
    secondaryLabel: 'Daily Inflow Deficit',
    description: 'Localized precipitation extremes disable farm-to-mandi feeder transit. Elasticity models project 18-day wholesale price elevation.',
    engines: ['Engine 15 Market Intel', 'Engine 16 Agro-Supply', 'Engine 17 Shock Simulator', 'Engine 18 Scenario'],
    statusColor: '#10B981'
  }
];

export default function PublicLandingPage({ onEnterAuth, onBrowseGuest }: PublicLandingPageProps) {
  const { locale, setLocale } = useShellStore();
  const L = landingText(locale);
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyTarget>(anomalyTargets[0]);
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(scenarios[0]);
  const [activeCascadeStep, setActiveCascadeStep] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scroller = document.querySelector('.landing-page');
    const handleScroll = () => {
      const top = scroller instanceof HTMLElement ? scroller.scrollTop : window.scrollY;
      setIsScrolled(top > 40);
    };
    scroller?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scroller?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-cycle through cascade stages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCascadeStep((prev) => (prev + 1) % 5);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const cascadeStages = L.cascade;

  return (
    <main className="landing-page">
      <AtmosphericBackgroundCanvas variant="landing" />

      {/* 1. ULTRA-PREMIUM NAVIGATION HEADER WITH ANIMATED SVG EMBLEM LOGO */}
      <header className={`landing-nav ${isScrolled ? 'landing-nav-scrolled' : ''}`}>
        <div
          className="landing-logo-container"
          onClick={() => document.querySelector('.landing-page')?.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <AtmosAnimatedLogo
            size={40}
            showText={true}
            showBadge={false}
            variant="rich"
            glowColor="gold"
            interactive={true}
          />
        </div>

        <nav className="landing-links">
          <a href="#guidebook" className="landing-link-item" onClick={(event) => { event.preventDefault(); document.getElementById('guidebook')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>{L.navGuide}</span>
          </a>
          <a href="#about" className="landing-link-item" onClick={(event) => { event.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>{L.navAbout}</span>
          </a>
        </nav>

        <div className="landing-nav-actions">
          <button className="landing-login-btn" onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}>
            <span className="btn-content"><span>{locale === 'en' ? 'हिन्दी' : 'EN'}</span></span>
          </button>
          <button className="landing-login-btn" onClick={onBrowseGuest}>
            <span className="btn-content"><span>{t(locale, 'browse')}</span></span>
          </button>
          <button className="landing-login-btn" onClick={onEnterAuth}>
            <span className="btn-content">
              <span>{t(locale, 'signIn')}</span>
              <ArrowRight size={14} className="btn-arrow" />
            </span>
          </button>
        </div>
      </header>

      {/* TOP INFINITE TELEMETRY MARQUEE */}
      <div className="landing-ticker landing-ticker-top">
        <div className="ticker-track">
          { (locale === 'hi' ? tickerItemsHi : tickerItemsEn).concat(locale === 'hi' ? tickerItemsHi : tickerItemsEn).map((item, index) => (
            <span key={index} className="ticker-item">
              <b className="ticker-symbol">✦</b>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 2. HERO SECTION: CINEMATIC COPY + INTERACTIVE 4D HOLOGRAPHIC COCKPIT */}
      <section className="landing-hero">
        <div className="landing-hero-copy">
          {/* Eyebrow Badge */}
          <div className="landing-eyebrow-badge">
            <span className="eyebrow-ping" />
            <Radio size={13} className="eyebrow-icon animate-pulse" />
            <span>{t(locale, 'landingKicker')}</span>
            <span className="eyebrow-tag">v3.4 LIVE</span>
          </div>

          {/* Master Headline with Gradient Shimmer */}
          <h1 className="landing-headline">
            {locale === 'hi' ? <>पहले समझें, <br /><span className="headline-shimmer">फिर फैसला लें.</span></> : <>See it first. <br /><span className="headline-shimmer">Then decide.</span></>}
          </h1>

          <p className="landing-hero-description">
            {t(locale, 'landingBody')}
          </p>

          {/* Action CTAs */}
          <div className="landing-hero-actions">
            <button className="landing-primary-btn" onClick={onEnterAuth}>
              <span className="btn-glow-aura" />
              <span className="btn-content">
                <span>{t(locale, 'start')}</span>
                <ArrowRight size={17} className="btn-icon-move" />
              </span>
            </button>

            <button
              className="landing-secondary-btn"
              onClick={() => document.getElementById('guidebook')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <CirclePlay size={16} className="btn-play-icon" />
              <span>{t(locale, 'guidebook')}</span>
            </button>
          </div>

          {/* Trust / Telemetry Badges */}
          <div className="landing-proof-bar">
            <div className="proof-pill">
              <span className="proof-status-dot" />
              <Radio size={13} />
              <span>{L.proofLive}</span>
            </div>
            <div className="proof-pill">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>{L.proofTools}</span>
            </div>
            <div className="proof-pill">
              <Globe2 size={13} className="text-cyan-400" />
              <span>{L.proofMap}</span>
            </div>
            <div className="proof-pill">
              <Activity size={13} className="text-emerald-400" />
              <span>{L.proofLang}</span>
            </div>
          </div>
        </div>

        {/* 3. HERO VISUAL: 4D HOLOGRAPHIC RADAR SPHERE & COCKPIT */}
        <div className="landing-hero-visual-pod">
          <div className="visual-top-bar">
            <div className="visual-tag">
              <span className="tag-live-dot" />
              <span>ORBITAL RADAR MESH // COCKPIT 01</span>
            </div>
            <div className="visual-status">COUPLED 18 ENGINES</div>
          </div>

          {/* The Holographic Gyroscope Radar Sphere */}
          <div className="holographic-sphere-stage">
            {/* Ambient Radial Aura */}
            <div className="sphere-back-glow" />

            {/* Gyroscopic 3D Rings */}
            <div className="gyro-ring ring-latitude" />
            <div className="gyro-ring ring-longitude" />
            <div className="gyro-ring ring-polar" />
            <div className="gyro-ring ring-dashed" />
            <div className="signal-detection-wave" />

            {/* 360-Degree Sweeping Radar Beam */}
            <div className="radar-sweep-beam" />

            {/* Interactive Target Beacons */}
            {anomalyTargets.map((target) => {
              const isSelected = selectedAnomaly.id === target.id;
              return (
                <div
                  key={target.id}
                  className={`anomaly-beacon-node ${isSelected ? 'active' : ''}`}
                  style={{ top: `${target.coords.y}%`, left: `${target.coords.x}%` }}
                  onClick={() => setSelectedAnomaly(target)}
                  title={`${target.name} (${target.val})`}
                >
                  <div className="beacon-ring" />
                  <div className="beacon-ping" />
                  <div className="beacon-dot" />
                  <div className="beacon-pill-label">
                    <span>{target.id.toUpperCase()}</span>
                    <b>{target.val}</b>
                  </div>
                </div>
              );
            })}

            {/* Center Core Emblem Hologram */}
            <div className="center-core-hologram">
              <AtmosAnimatedLogo size={76} variant="rich" glowColor="gold" interactive={false} showBadge={false} />
              <div className="core-hud-caption">
                <span>ENSEMBLE CONSENSUS</span>
                <strong>91.4%</strong>
              </div>
            </div>
          </div>

          {/* Live Telemetry HUD Readout Panel (Dynamic on Node Click) */}
          <div className="visual-telemetry-hud">
            <div className="hud-header">
              <div className="hud-badge">{selectedAnomaly.type.toUpperCase()} HAZARD</div>
              <span className="hud-lead-time">{selectedAnomaly.leadTime}</span>
            </div>

            <div className="hud-body">
              <div className="hud-metric-row">
                <div>
                  <span className="hud-region">{selectedAnomaly.region}</span>
                  <h4 className="hud-title">{selectedAnomaly.name}</h4>
                </div>
                <div className="hud-val-wrap">
                  <span className="hud-metric-name">{selectedAnomaly.metric}</span>
                  <div className="hud-val">{selectedAnomaly.val}</div>
                </div>
              </div>
              <p className="hud-desc">{selectedAnomaly.details}</p>
            </div>

            <div className="hud-footer">
              <div className="hud-channels">
                <span className="channel-chip">WRF-5km</span>
                <span className="channel-chip">ECMWF IFS</span>
                <span className="channel-chip">IMD RADAR</span>
              </div>
              <button className="hud-inspect-btn" onClick={onEnterAuth}>
                {L.inspectStream} <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM TELEMETRY REVERSE TICKER */}
      <div className="landing-ticker landing-ticker-bottom">
        <div className="ticker-track ticker-reverse">
          {(locale === 'hi' ? tickerItemsHi : tickerItemsEn)
            .slice()
            .reverse()
            .concat(locale === 'hi' ? tickerItemsHi : tickerItemsEn)
            .map((item, index) => (
              <span key={index} className="ticker-item">
                <b className="ticker-symbol">✦</b>
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* 4. PLATFORM PILLARS (INTERACTIVE 3D GLASS CARDS WITH ANIMATED BORDER-BEAM) */}
      <section id="platform" className="landing-section">
        <div className="section-header-grid">
          <div>
            <div className="section-eyebrow">
              <Layers size={13} className="text-cyan-400" />
              <span>{L.storyEye}</span>
            </div>
            <h2 className="section-title">
              {L.storyH1} <br />
              <span>{L.storyH2}</span>
            </h2>
          </div>
          <p className="section-subtitle">
            {L.storySub}
          </p>
        </div>

        <div className="feature-cockpit-grid">
          {/* Card 1: Read Atmosphere */}
          <article className="feature-card group">
            <div className="card-border-glow" />
            <div className="card-top">
              <div className="card-icon-pod pod-cyan">
                <Waves size={22} className="animate-spin-slow" />
              </div>
              <span className="card-number">PILLAR 01</span>
            </div>
            <h3 className="card-title">{L.pillar1t}</h3>
            <p className="card-desc">
              {L.pillar1d}
            </p>
            <div className="card-telemetry-preview">
              <div className="telemetry-mini-row">
                <span>Ensemble Size</span>
                <b>51 Members</b>
              </div>
              <div className="telemetry-mini-row">
                <span>Update Cadence</span>
                <b>6-Hourly Ingestion</b>
              </div>
            </div>
            <div className="card-action">
              <span>Engines 01 → 06</span>
              <ArrowRight size={14} className="card-arrow" />
            </div>
          </article>

          {/* Card 2: Physical Downscaling */}
          <article className="feature-card group active-card">
            <div className="card-border-glow" />
            <div className="card-top">
              <div className="card-icon-pod pod-gold">
                <Sparkles size={22} />
              </div>
              <span className="card-number">PILLAR 02</span>
            </div>
            <h3 className="card-title">{L.pillar2t}</h3>
            <p className="card-desc">
              {L.pillar2d}
            </p>
            <div className="card-telemetry-preview">
              <div className="telemetry-mini-row">
                <span>Spatial Resolution</span>
                <b>5km Gridded Mesh</b>
              </div>
              <div className="telemetry-mini-row">
                <span>Topographic Bias</span>
                <b>Corrected SRTM-DEM</b>
              </div>
            </div>
            <div className="card-action">
              <span>Engines 07 → 08</span>
              <ArrowRight size={14} className="card-arrow" />
            </div>
          </article>

          {/* Card 3: Agronomic & Market Action */}
          <article className="feature-card group">
            <div className="card-border-glow" />
            <div className="card-top">
              <div className="card-icon-pod pod-emerald">
                <Orbit size={22} />
              </div>
              <span className="card-number">PILLAR 03</span>
            </div>
            <h3 className="card-title">{L.pillar3t}</h3>
            <p className="card-desc">
              {L.pillar3d}
            </p>
            <div className="card-telemetry-preview">
              <div className="telemetry-mini-row">
                <span>Crop Coverage</span>
                <b>Wheat, Paddy, Pulses, Oilseeds</b>
              </div>
              <div className="telemetry-mini-row">
                <span>Market Models</span>
                <b>Agmarknet Inflow Shock Engine</b>
              </div>
            </div>
            <div className="card-action">
              <span>Engines 09 → 18</span>
              <ArrowRight size={14} className="card-arrow" />
            </div>
          </article>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE SIMULATION SANDBOX DIRECTLY ON LANDING PAGE */}
      <section id="simulator" className="landing-section sandbox-section">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <Cpu size={13} className="text-cyan-400" />
            <span>{L.simEye}</span>
          </div>
          <h2 className="section-title">
            {L.simH1}
          </h2>
          <p className="section-subtitle">
            {L.simSub}
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="scenario-switcher">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              className={`scenario-tab-btn ${activeScenario.id === scen.id ? 'active' : ''}`}
              onClick={() => setActiveScenario(scen)}
            >
              <span className="tab-icon">{scen.icon}</span>
              <div className="tab-meta">
                <span className="tab-cat">{scen.category}</span>
                <span className="tab-title">{scen.title}</span>
              </div>
              {activeScenario.id === scen.id && <span className="tab-active-indicator" />}
            </button>
          ))}
        </div>

        {/* Live Simulation Cockpit Stage */}
        <div className="simulation-cockpit-stage">
          <div className="cockpit-left-telemetry">
            <div className="cockpit-badge-row">
              <span
                className="cockpit-status-badge"
                style={{ borderColor: activeScenario.statusColor, color: activeScenario.statusColor }}
              >
                ● {activeScenario.badge}
              </span>
              <span className="cockpit-cadence">LATENCY: 42ms · GPU ACCELERATED</span>
            </div>

            <h3 className="cockpit-scenario-name">{activeScenario.title}</h3>
            <p className="cockpit-scenario-desc">{activeScenario.description}</p>

            {/* Twin Key Metrics with Glowing Accent */}
            <div className="cockpit-metrics-grid">
              <div className="metric-box">
                <span className="metric-sub">{activeScenario.primaryLabel}</span>
                <div className="metric-big" style={{ color: activeScenario.statusColor }}>
                  {activeScenario.primaryMetric}
                </div>
              </div>

              <div className="metric-box">
                <span className="metric-sub">{activeScenario.secondaryLabel}</span>
                <div className="metric-big text-white">{activeScenario.secondaryMetric}</div>
              </div>
            </div>

            {/* Coupled Engine Stack */}
            <div className="cockpit-engines-tray">
              <span className="tray-label">COUPLED ACTIVE PIPELINE:</span>
              <div className="tray-chips">
                {activeScenario.engines.map((eng, idx) => (
                  <span key={idx} className="engine-chip">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    {eng}
                  </span>
                ))}
              </div>
            </div>

            <button className="cockpit-deep-dive-btn" onClick={onEnterAuth}>
              <span>{L.launchEngine}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Interactive Waveform & Radar Visualizer */}
          <div className="cockpit-right-visual">
            <div className="visual-hud-header">
              <span>REAL-TIME ENSEMBLE SIMULATION FIELD</span>
              <span className="radar-fps">60 FPS // SYNCHRONIZED</span>
            </div>

            {/* Simulated Live Heatmap / Trajectory Canvas Overlay */}
            <div className="sim-canvas-viewport">
              <div className="sim-radar-grid" />
              <div className="sim-contour-flow" />

              {/* Dynamic Waveform Bars */}
              <div className="sim-waveform-bars">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="sim-bar"
                    style={{
                      height: `${25 + Math.sin(i * 0.45) * 45 + ((i % 5) * 6)}%`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </div>

              {/* Floating Spatial Anomaly Marker */}
              <div className="sim-floating-marker">
                <span className="marker-ping" />
                <div className="marker-center" />
                <div className="marker-tooltip">
                  <span>MAX INTENSITY</span>
                  <strong>+3.8σ ANOMALY</strong>
                </div>
              </div>
            </div>

            <div className="visual-hud-footer">
              <div className="hud-stat-pill">
                <span>PROBABILITY OF EXCEEDANCE:</span>
                <b>84.2%</b>
              </div>
              <div className="hud-stat-pill">
                <span>CONVERGENCE:</span>
                <b className="text-emerald-400">STABLE</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE 18 COUPLED ENGINES CASCADE (DYNAMIC FLOW PIPELINE) */}
      <section id="cascade" className="landing-cascade">
        <div className="cascade-container">
          <div className="section-header-grid">
            <div>
              <div className="section-eyebrow">
                <Orbit size={13} className="text-amber-400" />
                <span>{L.cascadeEye}</span>
              </div>
              <h2 className="section-title">
                {L.cascadeH1} <br />
                <span>{L.cascadeH2}</span>
              </h2>
            </div>
            <p className="section-subtitle">
              {L.cascadeSub}
            </p>
          </div>

          {/* Animated Cascade Node Track */}
          <div className="cascade-pipeline-track">
            {cascadeStages.map((stage, idx) => {
              const isActive = activeCascadeStep === idx;
              return (
                <React.Fragment key={stage.num}>
                  <div
                    className={`cascade-station ${isActive ? 'station-active' : ''}`}
                    onClick={() => setActiveCascadeStep(idx)}
                  >
                    <div className="station-number">{stage.num}</div>
                    <div className="station-content">
                      <div className="station-title">{stage.title}</div>
                      <div className="station-sub">{stage.sub}</div>
                      <p className="station-detail">{stage.detail}</p>
                    </div>
                    {isActive && <div className="station-active-glow" />}
                  </div>

                  {idx < cascadeStages.length - 1 && (
                    <div className={`cascade-conduit ${isActive ? 'conduit-active' : ''}`}>
                      <div className="conduit-wire" />
                      <div className="conduit-pulse" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section id="guidebook" className="landing-section">
        <div className="section-header-grid">
          <div>
            <div className="section-eyebrow">
              <Compass size={13} className="text-cyan-400" />
              <span>{L.guideEye}</span>
            </div>
            <h2 className="section-title">
              {L.guideH1} <br />
              <span>{L.guideH2}</span>
            </h2>
          </div>
          <p className="section-subtitle">
            {L.guideSub}
          </p>
        </div>

        <div className="landing-guide-how">
          {L.steps.map((step) => (
            <article key={step.n} className="landing-guide-step">
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.ex}</p>
            </article>
          ))}
        </div>

        <div className="landing-guide-examples">
          <h3>{L.examplesTitle}</h3>
          <ul>
            {L.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>

        <div className="field-guide-grid" style={{ padding: 0, marginTop: 28 }}>
          {ENGINE_FIELD_GUIDE.map((engine) => (
            <article key={engine.moduleNumber} className={`field-guide-card engine-sig engine-sig-${engine.moduleNumber}`} style={{ cursor: 'default' }}>
              <span className="field-guide-symbol">{engine.symbol}</span>
              <div>
                <div className="field-guide-id">M{String(engine.moduleNumber).padStart(2, '0')} · {locale === 'hi' ? engine.titleHi : engine.title}</div>
                <div className="field-guide-need">{locale === 'hi' ? `लिखें: ${engine.needHi}` : `Need: ${engine.need}`}</div>
                <div className="field-guide-example">{locale === 'hi' ? `जैसे: ${engine.exampleHi}` : `e.g. ${engine.example}`}</div>
                <div className="field-guide-result">{locale === 'hi' ? `मिलेगा: ${engine.resultHi}` : `Returns: ${engine.result}`}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. ABOUT ATMOS 4D */}
      <section id="about" className="landing-about-section">
        <div className="about-manifesto">
          <div className="about-logo-lockup">
            <AtmosAnimatedLogo size={64} variant="rich" glowColor="gold" showBadge={true} interactive={false} />
          </div>
          <div className="section-eyebrow">
            <Globe2 size={13} className="text-cyan-400" />
            <span>{L.aboutEye}</span>
          </div>
          <h2 className="section-title">
            {L.aboutH1} <br />
            <span>{L.aboutH2}</span>
          </h2>
          <p className="section-subtitle">
            {L.aboutBody}
          </p>
          <div className="about-stats">
            <div className="about-stat"><b>18</b><span>{L.aboutStat1}</span></div>
            <div className="about-stat"><b>{L.aboutStat2Label}</b><span>{L.aboutStat2}</span></div>
            <div className="about-stat"><b>Live</b><span>{L.aboutStat3}</span></div>
          </div>
          <button className="about-access-link" onClick={onEnterAuth}>
            <span>{L.aboutCta}</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="about-principles" aria-label="ATMOS 4D principles">
          <article className="about-principle">
            <span className="about-principle-number">01</span>
            <div>
              <h3>{L.p1t}</h3>
              <p>{L.p1}</p>
            </div>
          </article>
          <article className="about-principle">
            <span className="about-principle-number">02</span>
            <div>
              <h3>{L.p2t}</h3>
              <p>{L.p2}</p>
            </div>
          </article>
          <article className="about-principle">
            <span className="about-principle-number">03</span>
            <div>
              <h3>{L.p3t}</h3>
              <p>{L.p3}</p>
            </div>
          </article>
        </div>
      </section>

      {/* 8. OPERATOR TESTIMONIAL / DECISION ADVANTAGE */}
      <section id="operators" className="landing-operator-section">
        <div className="operator-left">
          <div className="section-eyebrow">
            <Compass size={13} className="text-emerald-400" />
            <span>{L.opEye}</span>
          </div>
          <h2 className="section-title">
            {L.opH1} <br />
            <span>{L.opH2}</span>
          </h2>
          <p className="section-subtitle">
            {L.opSub}
          </p>

          <div className="operator-stats-grid">
            <div className="operator-stat-card">
              <div className="stat-number">18</div>
              <div className="stat-label">{L.aboutStat1}</div>
            </div>
            <div className="operator-stat-card">
              <div className="stat-number">{L.opStat2}</div>
              <div className="stat-label">{L.opStat2l}</div>
            </div>
            <div className="operator-stat-card">
              <div className="stat-number">{L.opStat3}</div>
              <div className="stat-label">{L.opStat3l}</div>
            </div>
          </div>

          <button className="landing-primary-btn" onClick={onEnterAuth} style={{ marginTop: '36px' }}>
            <span className="btn-glow-aura" />
            <span className="btn-content">
              <span>{L.opCta}</span>
              <ArrowRight size={17} className="btn-icon-move" />
            </span>
          </button>
        </div>

        {/* Holographic Quote Container */}
        <div className="operator-quote-card">
          <div className="quote-ambient-light" />
          <div className="quote-mark">“</div>
          <p className="quote-text">
            {L.quote}
          </p>
          <div className="quote-author-row">
            <AtmosAnimatedLogo size={36} showBadge={false} interactive={false} variant="rich" />
            <div>
              <div className="author-name">ATMOS 4D</div>
              <div className="author-title">{L.quoteTitle}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER WITH ANIMATED SVG EMBLEM LOGO */}
      <footer className="landing-footer">
        <div className="footer-left">
          <AtmosAnimatedLogo
            size={52}
            showText={true}
            showBadge={true}
            variant="rich"
            glowColor="gold"
            subtitle={L.footerSub}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        <div className="footer-status-pill">
          <span className="status-ping" />
          <span>{L.footerStatus}</span>
        </div>

        <div className="footer-right">
          <button className="footer-access-btn" onClick={onEnterAuth}>
            <span>{L.footerCta}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </footer>
    </main>
  );
}
