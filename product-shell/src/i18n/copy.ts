export type AppLocale = 'en' | 'hi';
export type AccessPlan = 'guest' | 'free' | 'pro';

const EN = {
  langName: 'English',
  browse: 'Browse',
  signIn: 'Sign in',
  start: 'Get started',
  back: 'Back',
  landingKicker: 'Weather to mandi',
  landingHeadline: 'See it first. Then decide.',
  landingBody: 'ATMOS 4D shows where rain will fall, what it means for the crop, and how mandi prices may move — in one place.',
  guidebook: 'Guidebook',
  about: 'About',
  platform: 'Platform',
  explore: 'Explore',
  ask: 'Ask',
  home: 'Home',
  search: 'Search',
  alerts: 'Alerts',
  chat: 'Chat',
  engines: 'Engines',
  saved: 'Saved',
  plans: 'Plans',
  you: 'You',
  all: 'All',
  weather: 'Weather',
  crop: 'Crop',
  mandi: 'Mandi',
  liveAlerts: 'Live alerts',
  newsWire: 'News · Mandi',
  news: 'News',
  models: 'Models',
  modelCard: 'Model card',
  experience: 'Try it',
  result: 'Result',
  run: 'Run',
  askHint: 'Ask in plain words. Weather, crop, or mandi — one question.',
  translate: 'English',
  guestBanner: 'You are browsing. Sign in to ask, post, and open engines.',
  freeBanner: 'Free plan. Upgrade to Pro for PDF reports and the full engine suite.',
  lockTitle: 'Sign in to use this',
  lockBody: 'Browsing is open. Asking, posting, engines, and reports need an account.',
  premiumTitle: 'Pro feature',
  premiumBody: 'PDF reports, full village maps, and mandi shock engines are on Atmos Pro.',
  exportPdf: 'Export PDF',
  attachImage: 'Add photo',
  whatToType: 'Type a place, a time, a crop or hazard, and what you need.',
  placeholder: 'Place + time + crop or hazard + what you need',
  thinking: 'Thinking across weather to market…',
  welcomeBack: 'Welcome back.',
  createAccount: 'Create your account.',
  authCopy: 'Live weather, crop advice, and mandi signals. Email and password only.',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  enter: 'Enter ATMOS 4D',
  create: 'Create account',
  newHere: 'New here? Create an account',
  haveAccount: 'Already have an account? Sign in',
  guestHint: 'You can browse the site without signing in. Features stay locked until you create an account.',
  seedHint: 'Seed Pro account is ready for operators.',
  reportTitle: 'ATMOS 4D intelligence report',
  reportPremium: 'PDF export is included with Atmos Pro.',
  proOn: 'Atmos Pro is active',
  proOnBody: 'You have PDF reports, all 18 engines, and mandi shock.',
  proPlan: 'Atmos Pro',
  newChat: 'New chat',
  noChats: 'No saved chats yet',
  clickView: 'Click to view',
  liveWire: 'Live mandi & news',
};

const HI: typeof EN = {
  langName: 'हिन्दी',
  browse: 'देखें',
  signIn: 'साइन इन',
  start: 'शुरू करें',
  back: 'वापस',
  landingKicker: 'मौसम से मंडी तक',
  landingHeadline: 'पहले समझें, फिर फैसला लें.',
  landingBody: 'ATMOS 4D बताता है बारिश कहाँ गिरेगी, फसल को क्या होगा, और मंडी भाव कैसे बदल सकते हैं — एक जगह।',
  guidebook: 'गाइड',
  about: 'हमारे बारे में',
  platform: 'प्लेटफ़ॉर्म',
  explore: 'खोज',
  ask: 'पूछें',
  home: 'होम',
  search: 'खोज',
  alerts: 'अलर्ट',
  chat: 'चैट',
  engines: 'इंजन',
  saved: 'सेव',
  plans: 'प्लान',
  you: 'आप',
  all: 'सब',
  weather: 'मौसम',
  crop: 'फसल',
  mandi: 'मंडी',
  liveAlerts: 'लाइव चेतावनी',
  newsWire: 'समाचार · मंडी',
  news: 'समाचार',
  models: 'मॉडल',
  modelCard: 'मॉडल कार्ड',
  experience: 'आज़माएँ',
  result: 'नतीजा',
  run: 'चलाएँ',
  askHint: 'सीधी भाषा में पूछें। मौसम, फसल या मंडी — एक सवाल।',
  translate: 'हिन्दी',
  guestBanner: 'आप साइट देख रहे हैं। पूछने, पोस्ट और इंजन के लिए साइन इन करें।',
  freeBanner: 'फ्री प्लान। PDF रिपोर्ट और पूरे इंजन के लिए Pro लें।',
  lockTitle: 'इसके लिए साइन इन करें',
  lockBody: 'देखना खुला है। पूछना, पोस्ट, इंजन और रिपोर्ट के लिए खाता चाहिए।',
  premiumTitle: 'Pro सुविधा',
  premiumBody: 'PDF रिपोर्ट, गाँव नक्शा और मंडी इंजन Atmos Pro पर हैं।',
  exportPdf: 'PDF निकालें',
  attachImage: 'फोटो जोड़ें',
  whatToType: 'जगह, समय, फसल या खतरा, और क्या चाहिए — यही लिखें।',
  placeholder: 'जगह + समय + फसल या खतरा + क्या चाहिए',
  thinking: 'सोच रहा हूँ — मौसम से मंडी तक...',
  welcomeBack: 'वापस आइए.',
  createAccount: 'खाता बनाएँ.',
  authCopy: 'लाइव मौसम, फसल सलाह और मंडी संकेत। केवल ईमेल और पासवर्ड।',
  name: 'नाम',
  email: 'ईमेल',
  password: 'पासवर्ड',
  enter: 'ATMOS 4D में प्रवेश',
  create: 'खाता बनाएँ',
  newHere: 'नए हैं? खाता बनाएँ',
  haveAccount: 'खाता है? साइन इन करें',
  guestHint: 'बिना साइन इन साइट देख सकते हैं। सुविधाएँ खाते के बाद खुलती हैं।',
  seedHint: 'सीड Pro खाता ऑपरेटरों के लिए तैयार है।',
  reportTitle: 'ATMOS 4D इंटेलिजेंस रिपोर्ट',
  reportPremium: 'PDF निकालना Atmos Pro में शामिल है।',
  proOn: 'Atmos Pro खाता सक्रिय है',
  proOnBody: 'PDF रिपोर्ट, सभी 18 इंजन और मंडी झटका आपके पास हैं।',
  proPlan: 'Atmos Pro',
  newChat: 'नई बात',
  noChats: 'अभी कोई सहेजी बात नहीं',
  clickView: 'देखने के लिए क्लिक करें',
  liveWire: 'लाइव मंडी और समाचार',
};

export const COPY: Record<AppLocale, typeof EN> = { en: EN, hi: HI };

export function t(locale: AppLocale, key: keyof typeof EN) {
  return COPY[locale][key];
}

export function isPro(plan: AccessPlan) {
  return plan === 'pro';
}

export function canPost(plan: AccessPlan) {
  return plan === 'free' || plan === 'pro';
}

export function canUseEngines(plan: AccessPlan, moduleNumber?: number) {
  if (plan === 'pro') return true;
  if (plan === 'guest') return false;
  if (moduleNumber == null) return true;
  return moduleNumber <= 6;
}

export function canExportPdf(plan: AccessPlan) {
  return plan === 'pro';
}
