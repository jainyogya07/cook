import { ENGINE_FIELD_GUIDE } from './engineFieldGuide';

export interface NimSection {
  id: string;
  title: string;
  titleHi: string;
}

export const NIM_TOC: NimSection[] = [
  { id: 'story', title: 'District Bulletin & Field Situation', titleHi: 'ज़िला बुलेटिन व ज़मीनी स्थिति' },
  { id: 'telemetry', title: 'Executive Input & Output Telemetry', titleHi: 'इनपुट व आउटपुट टेलीमेट्री' },
  { id: 'cascade', title: '4D Domino Physics Cascade', titleHi: '4D बहु-भौतिकी प्रभाव' },
  { id: 'advisory', title: 'Actionable Field Decisions', titleHi: 'सीधे फैसले और कदम' },
  { id: 'description', title: 'Scientific Description', titleHi: 'वैज्ञानिक विवरण' },
  { id: 'license', title: 'License / Terms of Use', titleHi: 'लाइसेंस / उपयोग की शर्तें' },
  { id: 'intended', title: 'Intended Use', titleHi: 'किसके लिए है' },
  { id: 'limitations', title: 'Known Limitations', titleHi: 'सीमाएँ' },
  { id: 'geography', title: 'Deployment Geography', titleHi: 'कहाँ चलता है' },
  { id: 'release', title: 'Release', titleHi: 'रिलीज़' },
  { id: 'classes', title: 'Program Classes', titleHi: 'कौन-से इंजन जुड़े हैं' },
  { id: 'deployment', title: 'Deployment Details', titleHi: 'कैसे चलता है' },
  { id: 'stack', title: 'Software Stack', titleHi: 'सॉफ़्टवेयर स्टैक' },
  { id: 'security', title: 'Security', titleHi: 'सुरक्षा' },
  { id: 'ethics', title: 'Ethical Considerations', titleHi: 'ईमानदारी के नियम' },
  { id: 'help', title: 'Getting Started', titleHi: 'शुरू कैसे करें' }
];

export interface ExecutiveIOSpec {
  inputs: {
    region: string;
    regionHi: string;
    horizon: string;
    horizonHi: string;
    feeds: string;
    feedsHi: string;
    targetAsset: string;
    targetAssetHi: string;
  };
  outputs: {
    coreMetric: string;
    coreMetricHi: string;
    riskTier: 'CRITICAL' | 'ELEVATED' | 'ADVISORY' | 'NORMAL';
    riskTierLabel: string;
    riskTierLabelHi: string;
    ensembleBand: string;
    ensembleBandHi: string;
    actionDirective: string;
    actionDirectiveHi: string;
  };
}

export interface AtmosNimCard {
  moduleNumber: number;
  family: 'Atmosphere' | 'Village' | 'Field' | 'Mandi';
  familyHi: string;
  scientificName: string;
  description: string;
  descriptionHi: string;
  realLifeStory: string;
  realLifeStoryHi: string;
  howToUse: string;
  howToUseHi: string;
  realLifeExample: string;
  realLifeExampleHi: string;
  ioSpec: ExecutiveIOSpec;
  cascadeImpact: string;
  cascadeImpactHi: string;
  actionableDecision: string;
  actionableDecisionHi: string;
  intended: string[];
  intendedHi: string[];
  limitations: string[];
  limitationsHi: string[];
  classes: { name: string; use: string; useHi: string }[];
  sampleEvents: { label: string; labelHi: string; query: string }[];
  variables: string[];
}

const SHARED_LICENSE_EN =
  'ATMOS 4D engines are decision-support tools, not automatic policy. Outputs are scenario / ensemble estimates. Exposure is not loss. Do not treat a single percentage as a guaranteed yield or price change.';
const SHARED_LICENSE_HI =
  'ATMOS 4D सलाह देता है, फैसला आपके हाथ में है। संख्याएँ संभावना / परिदृश्य हैं। प्रभावित क्षेत्र का मतलब नुकसान नहीं। एक प्रतिशत को पक्की उपज या भाव मत मानिए।';

export const SHARED_STACK = [
  { component: 'Product shell', version: 'Next.js 14 · Vercel' },
  { component: 'Unified API', version: 'FastAPI · Render' },
  { component: 'Auth / users', version: 'Supabase Postgres (IPv4 pooler)' },
  { component: 'Live news', version: 'Google News RSS + MyMemory' },
  { component: 'Ensemble language', version: 'P10 / P50 / P90 bands' }
];

const CARDS: Omit<AtmosNimCard, 'sampleEvents'>[] = [
  {
    moduleNumber: 1, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Planetary 4D Atmospheric Telemetry',
    description: 'Ingests global atmospheric vector fields (ECMWF, NASA GEOS, GFS) spanning near-surface boundary wind to upper-troposphere jet streams. This establishes the unified planetary boundary layer for the entire 4D cascade.',
    descriptionHi: 'नासा और ईसीएमडब्ल्यूएफ के वैश्विक मौसम वेक्टर्स — सतह से ऊपरी क्षोभमंडल तक — एक साझा 4D वायुमंडलीय मॉडल में लाता है। यही पूरे कैस्केड की पहली नींव है।',
    realLifeStory: 'AGROMET ADVISORY BULLETIN · Coastal Odisha (Puri, Jagatsinghpur, Kendrapara)\n\n• Synoptic Situation: A deep depression has intensified over the south-central Bay of Bengal (420 km southeast of Paradip), tracking north-northwestward.\n• Primary Threat: Sustained gale-force winds of 65 km/h with heavy to very heavy precipitation (140mm) expected within 72 hours, threatening 1.48 lakh hectares of standing Kharif paddy.\n• Operational Objective: Alert coastal farming clusters and port authorities 72 hours before cyclonic landfall.',
    realLifeStoryHi: 'कृषि-मौसम सलाह बुलेटिन · तटीय ओडिशा (पुरी, जगतसिंहपुर, केन्द्रापारा)\n\n• ज़मीनी स्थिति: बंगाल की खाड़ी में पारादीप से 420 किमी दूर एक गहरा कम दबाव का क्षेत्र (डिप्रेशन) बना है जो उत्तर-पश्चिम दिशा में आगे बढ़ रहा है।\n• मुख्य जोखिम: अगले 72 घंटों में 65 किमी/घंटा की तूफानी हवाओं और 140 मिमी भारी बारिश की चेतावनी, जिससे 1.48 लाख हेक्टेयर पका धान खतरे में है।\n• परिचालन उद्देश्य: तूफान टकराने से 72 घंटे पहले तटीय किसानों और बंदरगाह प्रशासन को स्पष्ट अलर्ट जारी करना।',
    howToUse: 'Select the forecast lead horizon (+24h to +120h). Rotate the 3D planetary globe to track atmospheric vorticity and isobar pressure troughs moving toward the Indian subcontinent.',
    howToUseHi: 'समय सीमा (+24h से +120h) चुनें। 3D ग्लोब को घुमाकर हवा की गति और कम दबाव के चक्र को भारत के तटीय इलाकों की तरफ बढ़ते हुए देखें।',
    realLifeExample: 'Input: Coastal Odisha Corridor · Lead: +72h · Variable: 850 hPa Wind & Rain. Result: Pressure 992 hPa, sustained winds 65 km/h, 140mm rainfall envelope moving toward Paradip-Puri.',
    realLifeExampleHi: 'इनपुट: ओडिशा तट · समय: +72 घंटे · चर: 850 hPa हवा व बारिश। नतीजा: दबाव 992 hPa, हवा 65 किमी/घंटा, 140 मिमी बारिश का घेरा पुरी-पारादीप की ओर बढ़ता हुआ।',
    ioSpec: {
      inputs: {
        region: 'Coastal Odisha Corridor (Puri - Paradip - Kendrapara)',
        regionHi: 'तटीय ओडिशा गलियारा (पुरी - पारादीप - केन्द्रापारा)',
        horizon: '+72h Synoptic Horizon (0.25° Ingest Grid)',
        horizonHi: '+72 घंटे सिनॉप्टिक समय (0.25° ग्रिड)',
        feeds: 'ECMWF IFS 0.1° + NASA GEOS-5 + INSAT-3DR Rapid Scan',
        feedsHi: 'ECMWF IFS + नासा GEOS-5 + इनसैट-3DR उपग्रह',
        targetAsset: 'Coastal Kharif Paddy (Grain-Filling) & Marine Fleets',
        targetAssetHi: 'तटीय खरीफ धान (दाना भराव) व समुद्री नावें'
      },
      outputs: {
        coreMetric: 'Central Pressure 992 hPa · Sustained Winds 65 km/h · 140mm Inundation Band',
        coreMetricHi: 'दबाव 992 hPa · हवा 65 किमी/घंटा · 140 मिमी बारिश घेरा',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · RED ALERT',
        riskTierLabelHi: 'उच्चतम जोखिम · रेड अलर्ट',
        ensembleBand: 'P10: 45mm · P50 (Median): 88mm · P90: 142mm',
        ensembleBandHi: 'P10: 45 मिमी · P50 (औसत): 88 मिमी · P90: 142 मिमी',
        actionDirective: 'Expedite coastal paddy harvest by 48 hours; dock all fishing vessels; hoist Port Warning Signal LC-3.',
        actionDirectiveHi: 'धान की कटाई 48 घंटे पहले पूरी करें; सभी नावें किनारे लाएं; बंदरगाह पर 3 नंबर का चेतावनी सिग्नल लगाएं।'
      }
    },
    cascadeImpact: 'Transmits atmospheric pressure contours and wind vectors into Module 02 (Vertical Strata) and Module 03 (Extreme Anomaly) to determine climatological departure.',
    cascadeImpactHi: 'यह डेटा मॉड्यूल 02 (वायुमंडलीय परतें) और मॉड्यूल 03 (असामान्य मौसम) को सौंपता है ताकि 30 साल के रिकॉर्ड से विचलन का पता चल सके।',
    actionableDecision: 'Farmers expedite harvesting of mature paddy; port officials hoist Signal #3; district disaster cells deploy coastal evacuation teams.',
    actionableDecisionHi: 'किसान पके हुए धान की कटाई तुरंत करें; बंदरगाह 3 नंबर चेतावनी जारी करे; प्रशासन तटीय सुरक्षा दल तैनात करे।',
    intended: ['Farmers & FPOs tracking multi-day cyclonic approach', 'State Disaster Management Authorities (OSDMA, SDMA)', 'Foundation input for downstream anomaly and trajectory models'],
    intendedHi: ['किसान और एफपीओ: चक्रवात पूर्व चेतावनी', 'राज्य आपदा प्रबंधन प्राधिकरण (OSDMA)', 'आगे के सभी इंजनों का मुख्य वायुमंडलीय आधार'],
    limitations: ['Not an official replacement for statutory IMD bulletins', 'Synoptic grid resolution is regional, not individual farm scale', 'Requires coupled NWP feeds for real-time calibration'],
    limitationsHi: ['मौसम विभाग (IMD) के आधिकारिक बुलेटिन का विकल्प नहीं', 'क्षेत्रीय पैमाना है, किसी एक खेत का सेंसर नहीं', 'सटीक गणना के लिए लाइव न्यूमेरिकल वेदर डेटा चाहिए'],
    classes: [{ name: 'M01 Sky Watch', use: '4D field ingest', useHi: '4D वायुमंडलीय इनपुट' }, { name: 'M03 EFI', use: 'Extreme anomaly scoring', useHi: 'चरम मौसम स्कोर' }, { name: 'M05 Track', use: 'GNN storm trajectory', useHi: 'तूफान का रास्ता' }],
    variables: ['Rain', 'Wind', 'Pressure', 'Cloud Vorticity']
  },
  {
    moduleNumber: 2, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Volumetric Stratified Atmosphere',
    description: 'Deconstructs the atmosphere into 5 vertical altitude strata (Surface, 850 hPa, 700 hPa, 500 hPa, 200 hPa). Evaluates vertical wind shear, moisture trapping, and downdraft squalls across terrain.',
    descriptionHi: 'वायुमंडल को 5 अलग-अलग ऊँचाई की परतों (सतह, 850 hPa, 700 hPa, 500 hPa, 200 hPa) में विभाजित करता है। ज़मीन की तुलना में ऊपरी हवा और नमी का अंतर दिखाता है।',
    realLifeStory: 'AGROMET ADVISORY BULLETIN · Western Ghats Foothills & Coastal Konkan\n\n• Synoptic Situation: Ground wind speed is mild at 12 km/h, but Doppler wind soundings detect a severe 48-knot (88 km/h) low-level jet at the 850 hPa altitude layer (1.5 km above ground).\n• Primary Threat: Vertical wind shear and downdrafts will disperse aerial/foliar pesticide sprays into non-target areas and damage polyhouse roofing.\n• Operational Objective: Guide precision agrochemical spraying and greenhouse protective actions.',
    realLifeStoryHi: 'कृषि-मौसम सलाह बुलेटिन · पश्चिमी घाट ढलान व तटीय कोंकण\n\n• ज़मीनी स्थिति: ज़मीन पर हवा 12 किमी/घंटा है, पर 1.5 किमी ऊपर (850 hPa) 88 किमी/घंटा का तेज़ जेट झोंका चल रहा है।\n• मुख्य जोखिम: ऊपरी हवा नीचे उतरकर छिड़की गई कीटनाशक दवा को उड़ा देगी और पॉलीहाउस की चादरों को फाड़ सकती है।\n• परिचालन उद्देश्य: दवा छिड़काव का सही समय और पॉलीहाउस की सुरक्षा सुनिश्चित करना।',
    howToUse: 'Toggle between vertical pressure strata (Surface to 200 hPa). Observe vertical updraft arrows to detect impending convective rain squalls and shear layers.',
    howToUseHi: 'ऊँचाई की परतें (सतह से 200 hPa) बदलें। ऊपर उठती हवा के तीर देखकर अचानक आने वाली तेज़ बौछारों का पता लगाएं।',
    realLifeExample: 'Input: Western Ghats Orographic Zone · Altitude: 850 hPa vs Surface. Result: 48-knot westerly moisture transport hitting coastal ridge; severe convective updraft (+3.2 m/s).',
    realLifeExampleHi: 'इनपुट: पश्चिमी घाट ढलान · ऊँचाई: 850 hPa। नतीजा: 48-नॉट तेज़ नम हवा पहाड़ों से टकरा रही है; तीव्र संवहन (+3.2 मी/से) से अचानक बारिश का खतरा।',
    ioSpec: {
      inputs: {
        region: 'Western Ghats Foothills & Konkan Agro-Ecological Zone',
        regionHi: 'पश्चिमी घाट ढलान व कोंकण कृषि-पारिस्थितिकी क्षेत्र',
        horizon: '+36h Vertical Profile Slicing (Surface to 200 hPa)',
        horizonHi: '+36 घंटे ऊर्ध्वाधर परत प्रोफाइल (सतह से 200 hPa)',
        feeds: 'ERA5 Stratified Reanalysis + Radiosonde Soundings + Wind Profiler',
        feedsHi: 'ERA5 वर्टिकल प्रोफाइल + रेडियो-सोंडे + डॉप्लर विंड प्रोफाइलर',
        targetAsset: 'Horticulture Orchards, Polyhouses & Agricultural Spray Drones',
        targetAssetHi: 'बागवानी बगीचे, पॉलीहाउस व कृषि स्प्रे ड्रोन'
      },
      outputs: {
        coreMetric: '850 hPa Low-Level Jet (48 knots) · Updraft Velocity +3.2 m/s · High Shear',
        coreMetricHi: '850 hPa पर 48-नॉट तेज़ हवा · उठती गति +3.2 मी/से · तेज़ कतरनी हवा',
        riskTier: 'ELEVATED',
        riskTierLabel: 'ELEVATED · SPRAY ADVISORY',
        riskTierLabelHi: 'मध्यम जोखिम · स्प्रे स्थगित सलाह',
        ensembleBand: 'Surface: 12 km/h · 850 hPa: 88 km/h · 500 hPa: 110 km/h',
        ensembleBandHi: 'सतह: 12 किमी/घं · 850 hPa: 88 किमी/घं · 500 hPa: 110 किमी/घं',
        actionDirective: 'Suspend all foliar pesticide spraying and drone flights; secure greenhouse polythene sheets against downdrafts.',
        actionDirectiveHi: 'कीटनाशक का छिड़काव और ड्रोन उड़ानें तुरंत रोकें; पॉलीहाउस की प्लास्टिक चादरों को कसकर बाँधें।'
      }
    },
    cascadeImpact: 'Delivers boundary-layer humidity and shear vectors to Module 07 (Village Downscaling) and Module 11 (Soil Hydrology).',
    cascadeImpactHi: 'यह नमी और हवा की गति मॉड्यूल 07 (गाँव नक्शा) और मॉड्यूल 11 (मिट्टी की नमी) को सौंपता है।',
    actionableDecision: 'Postpone aerial/foliar pesticide spraying; secure polyhouse anchoring; delay harvesting of sensitive fruits.',
    actionableDecisionHi: 'दवा का छिड़काव तुरंत टालें; ग्रीनहाउस की चादरों को सुरक्षित करें; फलों की तुड़ाई रोकें।',
    intended: ['Agricultural extension officers advising on spray timing', 'Commercial drone spray operators', 'Boundary-layer meteorological teams'],
    intendedHi: ['कृषि विस्तार अधिकारी: छिड़काव का सही समय', 'ड्रोन स्प्रे ऑपरेटर', 'मौसम विज्ञानी'],
    limitations: ['Stratified model requires interpolated radiosonde or NWP vertical levels', 'Not intended for real-time aviation navigation'],
    limitationsHi: ['रेडियो-सोंडे या मॉडल डेटा पर आधारित है', 'हवाई उड़ान का नेविगेशन सिस्टम नहीं है'],
    classes: [{ name: 'M01', use: 'Parent synoptic field', useHi: 'मुख्य मौसम क्षेत्र' }, { name: 'M02', use: 'Vertical slicing', useHi: 'ऊर्ध्वाधर परतें' }, { name: 'M07', use: 'Micro downscaling', useHi: 'गाँव का नक्शा' }],
    variables: ['Vertical Wind Shear', 'Boundary Layer Humidity', 'Thermal Inversion']
  },
  {
    moduleNumber: 3, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Climatological Extreme Anomaly (EFI)',
    description: 'Computes the Extreme Forecast Index (EFI) by benchmarking real-time atmospheric tensors against a 30-year model climatology (M-Climate). Flags unprecedented weather anomalies (EFI > +0.80).',
    descriptionHi: 'पिछले 30 वर्षों के मौसम इतिहास (M-Climate) से आज के मौसम की तुलना करके चरम असामान्यता स्कोर (EFI) निकालता है। +0.80 से ऊपर का स्कोर ऐतिहासिक खतरे का संकेत है।',
    realLifeStory: 'AGROMET ADVISORY BULLETIN · Punjab Malwa Plains (Ludhiana, Sangrur, Patiala)\n\n• Synoptic Situation: Maximum daytime temperature is projected to breach 38.5°C during late March, accompanied by dry northwesterly winds.\n• Primary Threat: Temperature deviation of +6.2°C above 30-year normal at the grain-filling (milking) stage of wheat, causing terminal heat stress, premature grain desiccation, and shriveling.\n• Operational Objective: Provide timely alerts to apply micro-irrigation canopy cooling and prevent yield loss.',
    realLifeStoryHi: 'कृषि-मौसम सलाह बुलेटिन · पंजाब मालवा मैदान (लुधियाना, संगरूर, पटियाला)\n\n• ज़मीनी स्थिति: मार्च के अंतिम सप्ताह में दिन का तापमान 38.5°C तक पहुँचने का अनुमान है, साथ में शुष्क उत्तर-पश्चिमी हवाएं चल रही हैं।\n• मुख्य जोखिम: गेहूं में दाना भरने की अवस्था में तापमान सामान्य से +6.2°C अधिक होना; इससे दाना सिकुड़ जाएगा और भारी नुकसान होगा।\n• परिचालन उद्देश्य: किसानों को शाम की हल्की सिंचाई द्वारा फसल का तापमान घटाने की समय पर सलाह देना।',
    howToUse: 'Select the anomaly parameter (Maximum Temperature or Rainfall EFI). EFI values above +0.85 indicate an event occurring less than once in 20 years.',
    howToUseHi: 'खतरा चुनें (तापमान या बारिश EFI)। 0.85 से ऊपर का स्कोर बताता है कि ऐसा मौसम 20 वर्षों में एक बार आता है।',
    realLifeExample: 'Input: Ludhiana District, Punjab · Parameter: Max Temp EFI. Result: EFI = +0.89, Shift of Tails (SOT) > +1.2; thermal anomaly +6.2°C above 30-year climatology.',
    realLifeExampleHi: 'इनपुट: लुधियाना, पंजाब · चर: तापमान EFI। नतीजा: EFI = +0.89, SOT > 1.2; तापमान 30 साल के सामान्य से +6.2°C अधिक।',
    ioSpec: {
      inputs: {
        region: 'Punjab Malwa & Central Wheat Belt (Ludhiana - Sangrur)',
        regionHi: 'पंजाब मालवा व मध्य गेहूं बेल्ट (लुधियाना - संगरूर)',
        horizon: '+120h Climatological Benchmark Window',
        horizonHi: '+120 घंटे जलवायु तुलना समय सीमा',
        feeds: 'ECMWF EPS 51-Member Ensemble vs 1991–2020 ERA5 Climatology',
        feedsHi: 'ECMWF 51-सदस्यीय मॉडल बनाम 1991–2020 का 30-वर्षीय बेसलाइन',
        targetAsset: 'R-837 & PBW Wheat at Grain-Filling / Milk Stage',
        targetAssetHi: 'दाना भरने / दुग्ध अवस्था में खड़ी गेहूं की फसल'
      },
      outputs: {
        coreMetric: 'Extreme Forecast Index (EFI) = +0.89 · Shift of Tails (SOT) > +1.2 · +6.2°C Deviation',
        coreMetricHi: 'EFI स्कोर = +0.89 · SOT > +1.2 · सामान्य से +6.2°C अधिक गर्मी',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · HEATWAVE ANOMALY',
        riskTierLabelHi: 'उच्चतम जोखिम · हीटवेव आपातकाल',
        ensembleBand: 'Climatological Normal: 31.8°C · P50: 38.2°C · P90: 40.4°C',
        ensembleBandHi: '30-साल सामान्य: 31.8°C · P50: 38.2°C · P90: 40.4°C',
        actionDirective: 'Apply light evening sprinkler irrigation immediately to cool micro-canopy by 3°C; avoid daytime chemical spraying.',
        actionDirectiveHi: 'शाम को तुरंत हल्का फव्वारा पानी दें ताकि फसल के पास 3°C ठंडक बने; दिन में छिड़काव न करें।'
      }
    },
    cascadeImpact: 'Triggers crop phenology fragility penalties in Module 10 and drives Yield Risk (Module 13).',
    cascadeImpactHi: 'यह असामान्य हीटवेव अलर्ट मॉड्यूल 10 (फसल की अवस्था) और मॉड्यूल 13 (उपज नुकसान) को सक्रिय करता है।',
    actionableDecision: 'Execute light evening sprinkler irrigation to cool the crop micro-canopy by 3°C; avoid daytime chemical applications.',
    actionableDecisionHi: 'शाम को हल्का फव्वारा पानी दें ताकि फसल का तापमान 3°C कम हो सके; दिन में कोई छिड़काव न करें।',
    intended: ['Agro-meteorologists tracking unprecedented weather', 'Crop insurance underwriters calculating index triggers', 'Government relief monitoring desks'],
    intendedHi: ['मौसम वैज्ञानिक: रिकॉर्ड तोड़ मौसम की पहचान', 'फसल बीमा कंपनियाँ', 'राहत आयुक्त कार्यालय'],
    limitations: ['Extreme anomaly score reflects probability of extreme weather, not guaranteed crop mortality', 'Thresholds depend on regional reanalysis baseline'],
    limitationsHi: ['असामान्य मौसम का मतलब जोखिम की संभावना है, पक्का नुकसान नहीं', 'तुलना 30 साल के बेसलाइन पर निर्भर है'],
    classes: [{ name: 'M03 EFI', use: 'Anomaly scoring', useHi: 'असामान्यता स्कोर' }, { name: 'M10 Stage', use: 'Phenology impact', useHi: 'फसल अवस्था असर' }, { name: 'M13 Yield', use: 'Yield penalty', useHi: 'उपज गिरावट' }],
    variables: ['Precipitation EFI', 'Heatwave Anomaly', 'Shift of Tails (SOT)']
  },
  {
    moduleNumber: 4, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Dynamic Hazard Footprint',
    description: 'Delineates multi-tiered spatial hazard footprints (Core Severe, Warning Buffer, Outer Advisory Zone) across administrative blocks, mapping accumulated rainfall and gale wind boundaries.',
    descriptionHi: 'भारी बारिश और तेज़ हवाओं के खतरे का सटीक भौगोलिक घेरा (कोर ज़ोन, चेतावनी ज़ोन, बाहरी ज़ोन) खींचता है, ताकि पता चले कौन से ब्लॉक और गाँव खतरे में हैं।',
    realLifeStory: 'DISASTER MANAGEMENT ADVISORY · Bhadrak & Kendrapara Coastal Lowlands\n\n• Synoptic Situation: Approaching cyclonic system makes landfall near Dhamra Port, with intense rain bands covering 2,140 sq km.\n• Primary Threat: Severe rainfall exceeding 150mm across 42 gram panchayats, threatening 6 APMC mandis and 48 Primary Agricultural Credit Societies (PACS) grain storage yards.\n• Operational Objective: Define precise boundary polygons to evacuate low-lying grain stocks before inundation.',
    realLifeStoryHi: 'आपदा प्रबंधन बुलेटिन · भद्रक व केन्द्रापारा तटीय क्षेत्र\n\n• ज़मीनी स्थिति: धामरा बंदरगाह के पास चक्रवाती तूफान का प्रभाव शुरू, 2,140 वर्ग किमी क्षेत्र में भारी बारिश के बादल सक्रिय।\n• मुख्य जोखिम: 42 ग्राम पंचायतों में 150 मिमी से अधिक वर्षा; 6 एपीएमसी मंडियों और 48 प्राथमिक कृषि समितियों के गोदामों में पानी भरने का खतरा।\n• परिचालन उद्देश्य: निचले अनाज यार्डों से बोरियों को सुरक्षित ऊँचे गोदामों में पहुँचाने के लिए सटीक भौगोलिक सीमा तय करना।',
    howToUse: 'Move the forecast slider from +24h to +72h. Inspect the expanding colored footprint envelope (Red indicates core impact >120mm; Amber indicates buffer zone).',
    howToUseHi: 'समय स्लाइडर को +24 से +72 घंटे पर ले जाएं। रंगीन घेरा देखें — लाल रंग भारी बारिश (120 मिमी+) और पीला रंग बाहरी असर दिखाता है।',
    realLifeExample: 'Input: Bhadrak & Kendrapara Districts · Lead: +48h. Result: 2,140 sq km enclosed in Core Footprint; 48 collection centers and 6 APMC mandis sit inside danger polygon.',
    realLifeExampleHi: 'इनपुट: भद्रक और केन्द्रापारा · समय: +48 घंटे। नतीजा: 2,140 वर्ग किमी क्षेत्र कोर खतरे में; 6 प्रमुख मंडियां और 48 खरीद केंद्र घेरे में।',
    ioSpec: {
      inputs: {
        region: 'Bhadrak, Kendrapara & Balasore Coastal Lowlands',
        regionHi: 'भद्रक, केन्द्रापारा व बालेश्वर तटीय निचला क्षेत्र',
        horizon: '+48h Spatial Hazard Envelope',
        horizonHi: '+48 घंटे का भौगोलिक खतरा घेरा',
        feeds: 'WRF-ARW 3km Mesoscale Model + IMD Doppler Radar + SRTM 30m Elevation',
        feedsHi: 'WRF 3 किमी मॉडल + मौसम विभाग डॉप्लर रडार + उपग्रह ढलान डेटा',
        targetAsset: '42 Gram Panchayats, 6 APMC Mandis, 48 PACS Procurement Centers',
        targetAssetHi: '42 ग्राम पंचायतें, 6 एपीएमसी मंडियां, 48 अनाज खरीद केंद्र'
      },
      outputs: {
        coreMetric: '2,140 km² Core Inundation Zone (>120mm Rain) · 4,820 km² Secondary Advisory Buffer',
        coreMetricHi: '2,140 वर्ग किमी कोर जलभराव क्षेत्र (120 मिमी+ बारिश) · 4,820 वर्ग किमी बाहरी घेरा',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · FLOOD FOOTPRINT',
        riskTierLabelHi: 'उच्चतम जोखिम · बाढ़ घेरा सक्रिय',
        ensembleBand: 'Core Danger Polygon: 2,140 km² · Advisory Perimeter: 4,820 km²',
        ensembleBandHi: 'कोर खतरा क्षेत्र: 2,140 किमी² · चेतावनी घेरा: 4,820 किमी²',
        actionDirective: 'Transfer all bagged grain in open mandi yards to elevated covered godowns; open irrigation drainage gates.',
        actionDirectiveHi: 'खुले मंडी यार्ड में रखे अनाज को तुरंत ऊँचे पक्के गोदामों में रखें; नहरों के निकासी गेट खोलें।'
      }
    },
    cascadeImpact: 'Transmits spatial hazard polygons directly to Module 09 (Cadastral Crop Exposure) to intersect exact crop acreage.',
    cascadeImpactHi: 'यह घेरा सीधे मॉड्यूल 09 (फसल का फैलाव) को जाता है ताकि पता चले कि इस घेरे में कितने हेक्टेयर फसल है।',
    actionableDecision: 'Move bagged grain stocks from low-lying mandi yards in Bhadrak to elevated godowns before flood envelope expands.',
    actionableDecisionHi: 'निचले मंडी यार्ड में रखे अनाज के बोरों को तुरंत ऊँचे पक्के गोदामों में पहुँचाएं; नहरों के फाटक खोलें।',
    intended: ['District Collectors & Block Development Officers', 'FPO logistics managers and warehouse operators', 'State emergency response teams'],
    intendedHi: ['जिलाधिकारी और बीडीओ', 'एफपीओ गोदाम संचालक', 'आपदा राहत दल'],
    limitations: ['Footprint shifts dynamically with each new forecast cycle', 'Local river flooding requires hydrological drainage coupling'],
    limitationsHi: ['हर 6 घंटे में नए मौसम डेटा के साथ घेरा बदल सकता है', 'नदी किनारे बाढ़ के लिए स्थानीय जल निकासी का ध्यान रखें'],
    classes: [{ name: 'M04 Footprint', use: 'Spatial boundary', useHi: 'भौगोलिक घेरा' }, { name: 'M09 Exposure', use: 'Crop intersection', useHi: 'फसल से मिलान' }, { name: 'M16 Corridor', use: 'Road flooding', useHi: 'सड़क रुकावट' }],
    variables: ['Rainfall Envelope', 'Gale Wind Radius', 'Inundation Boundary']
  },
  {
    moduleNumber: 5, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Spherical GNN Cyclone Trajectory',
    description: 'Simulates cyclone center trajectories up to 10 days in advance using Graph Neural Networks (GNN) on spherical earth grids. Projects landfall coordinates with historical displacement error margins.',
    descriptionHi: 'गोलाकार पृथ्वी ग्रिड पर ग्राफ न्यूरल नेटवर्क (GNN) द्वारा 10 दिन आगे तक चक्रवात के मार्ग का अनुमान लगाता है। संभावित लैंडफॉल का समय और स्थान बताता है।',
    realLifeStory: 'DISASTER MONITORING BULLETIN · Bay of Bengal Cyclone Track\n\n• Synoptic Situation: Cyclone system 03B is tracking northwestward at 18 km/h across the north-central Bay of Bengal.\n• Primary Threat: Landfall trajectory consensus indicates crossing between Puri and Chandbali on Saturday at 16:30 IST, threatening coastal embankments and standing paddy.\n• Operational Objective: Provide 120-hour advance warning of the strike cone so emergency responders and farmers can prepare.',
    realLifeStoryHi: 'आपदा निगरानी बुलेटिन · बंगाल की खाड़ी चक्रवात मार्ग\n\n• ज़मीनी स्थिति: चक्रवाती सिस्टम 03B उत्तर-मध्य बंगाल की खाड़ी में 18 किमी/घंटा की गति से उत्तर-पश्चिम की ओर बढ़ रहा है।\n• मुख्य जोखिम: शनिवार शाम 4:30 बजे पुरी और चांदबाली के बीच टकराने की 74% संभावना, जिससे तटीय तटबंधों और पकी फसल को खतरा है।\n• परिचालन उद्देश्य: 120 घंटे पहले संभावित प्रभाव क्षेत्र की स्पष्ट चेतावनी देना ताकि प्रशासन और किसान समय रहते तैयारी कर सकें।',
    howToUse: 'Inspect the 50 ensemble member track spaghetti lines. Observe the consensus center line and the 70% confidence cone to assess landfall timing.',
    howToUseHi: 'नक्शे पर 50 अलग-अलग मॉडल्स के रास्ते देखें। मुख्य औसत रास्ता और 70% संभावना वाला शंकु देखकर लैंडफॉल का समय जांचें।',
    realLifeExample: 'Input: Bay Cyclone System 03B · Horizon: +120h. Result: Landfall projected between Puri and Chandbali (Saturday 16:30 IST); forward translation speed 18 km/h; strike cone radius 95 km.',
    realLifeExampleHi: 'इनपुट: चक्रवात सिस्टम 03B · समय: +120 घंटे। नतीजा: शनिवार शाम 4:30 बजे पुरी और चांदबाली के बीच लैंडफॉल; गति 18 किमी/घंटा; खतरा शंकु 95 किमी।',
    ioSpec: {
      inputs: {
        region: 'North Bay of Bengal to Odisha-West Bengal Coastline',
        regionHi: 'उत्तरी बंगाल की खाड़ी से ओडिशा-पश्चिम बंगाल तट',
        horizon: '+120h Track Forecast (Spherical GNN Ensemble)',
        horizonHi: '+120 घंटे का तूफान मार्ग पूर्वानुमान',
        feeds: 'Spherical Graph Neural Network + ECMWF EPS 50 Tracks + IMD Bulletins',
        feedsHi: 'स्फेरिकल ग्राफ न्यूरल नेटवर्क + ECMWF 50 ट्रैक + मौसम विभाग बुलेटिन',
        targetAsset: 'Coastal Agricultural Corridor & National Highway Logistics',
        targetAssetHi: 'तटीय कृषि गलियारा व राष्ट्रीय राजमार्ग लॉजिस्टिक्स'
      },
      outputs: {
        coreMetric: 'Projected Landfall: Puri–Chandbali (Saturday 16:30 IST) · Forward Speed 18 km/h',
        coreMetricHi: 'लैंडफॉल: पुरी-चांदबाली तट (शनिवार शाम 4:30 बजे) · गति 18 किमी/घं',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · LANDFALL CONE',
        riskTierLabelHi: 'उच्चतम जोखिम · लैंडफॉल शंकु',
        ensembleBand: '70% Strike Cone Radius: 95 km · Central Pressure: 984 hPa',
        ensembleBandHi: '70% प्रभाव शंकु: 95 किमी दायरा · केंद्रीय दबाव: 984 hPa',
        actionDirective: 'Suspend commercial freight along NH-16; recall all deep-sea fishing trawlers 48 hours prior to storm landfall.',
        actionDirectiveHi: 'NH-16 पर ट्रकों की आवाजाही रोकें; सभी मछुआरों को 48 घंटे पहले किनारे पर लौटने का सख्त निर्देश दें।'
      }
    },
    cascadeImpact: 'Steers Module 06 (Probability Field) and Module 16 (Highway Logistics Corridors) along the projected storm path.',
    cascadeImpactHi: 'यह रास्ता मॉड्यूल 06 (संभावना) और मॉड्यूल 16 (हाईवे और ट्रक सप्लाई) को तूफान के रास्ते की अग्रिम चेतावनी देता है।',
    actionableDecision: 'Stop coastal agricultural transport; instruct fishing trawlers to dock 48 hours before storm eye approaches.',
    actionableDecisionHi: 'तटीय ट्रकों की आवाजाही रोकें; सभी मछुआरों को 48 घंटे पहले किनारे पर लौटने का सख्त निर्देश दें।',
    intended: ['Coastal state disaster commissioners', 'Agricultural supply chain freight operators', 'Port and maritime authorities'],
    intendedHi: ['राहत आयुक्त और तटीय प्रशासन', 'सप्लाई चेन और माल ढुलाई कंपनियाँ', 'बंदरगाह प्राधिकरण'],
    limitations: ['Ensemble tracks diverge after 72 hours; never rely on a single deterministic line', 'Intensity changes can occur rapidly'],
    limitationsHi: ['72 घंटे बाद रास्ते में बदलाव संभव है, एक रेखा पर भरोसा न करें', 'तूफान की ताकत अचानक बढ़ सकती है'],
    classes: [{ name: 'M05 Track', use: 'Path prediction', useHi: 'मार्ग अनुमान' }, { name: 'M06 Chance', use: 'Rain cone', useHi: 'बारिश शंकु' }, { name: 'M16 Logistics', use: 'Transport choke', useHi: 'सड़क रुकावट' }],
    variables: ['Storm Eye Coords', 'Forward Speed', 'Landfall Window', 'Central Pressure']
  },
  {
    moduleNumber: 6, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Ensemble Rain / Hazard Chance',
    description: 'Synthesizes multi-model meteorological ensembles (ECMWF EPS, GEFS) into probabilistic risk percentiles (P10, P50, P90). Replaces false single-number certainty with actionable probability bands.',
    descriptionHi: 'दर्जनों मौसम मॉडल्स का निचोड़ निकालकर संभावना (P10 कम, P50 सामान्य, P90 अधिकतम) बताता है। एक झूठी संख्या की जगह सच बताता है कि भारी बारिश के कितने प्रतिशत आसार हैं।',
    realLifeStory: 'AGROMET ADVISORY BULLETIN · East Godavari Delta (Andhra Pradesh)\n\n• Synoptic Situation: An active monsoon depression is positioned off the Kakinada coast with heavy moisture convergence.\n• Primary Threat: 12,500 hectares of standing paddy are ready for harvest. 82% of ensemble members forecast heavy rainfall exceeding 75mm within 48 hours, creating severe crop lodging and grain germination risk.\n• Operational Objective: Provide farmers with definitive probability metrics to authorize immediate combine harvesting.',
    realLifeStoryHi: 'कृषि-मौसम सलाह बुलेटिन · पूर्वी गोदावरी डेल्टा (आंध्र प्रदेश)\n\n• ज़मीनी स्थिति: काकीनाडा तट के पास सक्रिय मानसून डिप्रेशन बना है, जिससे समुद्र से भारी नमी आ रही है।\n• मुख्य जोखिम: 12,500 हेक्टेयर में पका धान खड़ा है। 82% मॉडल्स बता रहे हैं कि 48 घंटे में 75 मिमी से ज्यादा बारिश होगी, जिससे बालियां भीगकर दाना खेत में ही उग जाएगा।\n• परिचालन उद्देश्य: किसानों को स्पष्ट संभावना प्रतिशत देना ताकि वे तुरंत कंबाइन हार्वेस्टर लगाकर फसल काट सकें।',
    howToUse: 'Select the rainfall threshold (>50mm or >100mm). Read P10 (optimistic dry case), P50 (median expected case), and P90 (extreme heavy case).',
    howToUseHi: 'बारिश की सीमा चुनें (50 मिमी+ या 100 मिमी+)। P10 (कम से कम), P50 (सबसे संभावित), और P90 (अधिकतम बारिश) का प्रतिशत देखें।',
    realLifeExample: 'Input: East Godavari District · Window: Next 48h · Threshold: >75mm. Result: 82% ensemble agreement on rainfall >75mm; P50 = 88mm, P90 = 142mm.',
    realLifeExampleHi: 'इनपुट: पूर्वी गोदावरी · समय: 48 घंटे · सीमा: 75 मिमी+। नतीजा: 82% मॉडल्स भारी बारिश पर सहमत। संभावित बारिश 88 मिमी, अधिकतम 142 मिमी।',
    ioSpec: {
      inputs: {
        region: 'East Godavari & Krishna Delta Basin (Andhra Pradesh)',
        regionHi: 'पूर्वी गोदावरी व कृष्णा डेल्टा बेसिन (आंध्र प्रदेश)',
        horizon: '+48h Probabilistic Risk Window',
        horizonHi: '+48 घंटे की संभाव्यता समय सीमा',
        feeds: '50-Member ECMWF EPS + 30-Member NCEP GEFS Cumulative Distribution',
        feedsHi: '50-सदस्यीय ECMWF EPS + 30-सदस्यीय NCEP GEFS संभाव्यता मॉडल',
        targetAsset: '12,500 Hectares Mature Paddy Ready for Mechanical Harvest',
        targetAssetHi: '12,500 हेक्टेयर कटाई के लिए तैयार पका हुआ धान'
      },
      outputs: {
        coreMetric: '82% Probability of Rain >75mm in 24h · Median Expected P50 = 88mm',
        coreMetricHi: '24 घंटे में 75 मिमी+ बारिश की 82% संभावना · संभावित P50 = 88 मिमी',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · 82% PROBABILITY',
        riskTierLabelHi: 'उच्चतम जोखिम · 82% पक्की संभावना',
        ensembleBand: 'P10 (Dry): 38mm · P50 (Median): 88mm · P90 (Deluge): 142mm',
        ensembleBandHi: 'P10 (कम): 38 मिमी · P50 (औसत): 88 मिमी · P90 (भारी): 142 मिमी',
        actionDirective: 'Mobilize combine harvesters immediately to cut standing mature paddy; clear field drainage ditches.',
        actionDirectiveHi: 'किसान तुरंत कंबाइन हार्वेस्टर लगाकर धान काट लें; खेतों की मेड़ काटकर पानी निकलने का रास्ता बनाएं।'
      }
    },
    cascadeImpact: 'Feeds probabilistic rainfall volumes into Module 07 (Village Downscaling) and Module 11 (Soil Waterlogging).',
    cascadeImpactHi: 'यह संभावना सीधे मॉड्यूल 07 (गाँव नक्शा) और मॉड्यूल 11 (जलभराव) में जाकर ज़मीनी पानी का हिसाब लगाती है।',
    actionableDecision: 'Harvest standing paddy immediately using available machinery; clear drainage channels to prevent field ponding.',
    actionableDecisionHi: 'किसान तुरंत कंबाइन हार्वेस्टर लगाकर धान काट लें; खेतों की मेड़ काटकर पानी निकलने का रास्ता बनाएं।',
    intended: ['Farmers making harvest / no-harvest decisions', 'FPO grain procurement coordinators', 'Crop insurance claim risk evaluators'],
    intendedHi: ['किसान: कटाई का तत्काल फैसला', 'एफपीओ खरीद प्रभारी', 'फसल बीमा सर्वेक्षक'],
    limitations: ['Ensemble agreement indicates probability, not a guarantee of cloudburst location', 'Localized squalls can occur in lower percentiles'],
    limitationsHi: ['सहमति संभावना है, शत-प्रतिशत गारंटी नहीं', 'बादल फटने जैसी स्थानीय घटनाएं ग्रिड से बाहर हो सकती हैं'],
    classes: [{ name: 'M06 Chance', use: 'Percentile CDF', useHi: 'संभावना वितरण' }, { name: 'M07 Map', use: 'Spatial downscaling', useHi: 'स्थानीय नक्शा' }, { name: 'M13 Yield', use: 'Yield loss curve', useHi: 'उपज गिरावट' }],
    variables: ['P10 Rain', 'P50 Rain', 'P90 Rain', 'Probability of >50mm']
  },
  {
    moduleNumber: 7, family: 'Village', familyHi: 'गाँव', scientificName: '12 km → 5 km Village Map',
    description: 'Downscales coarse 25km/12km synoptic grids to a hyper-local 5km x 5km terrain-aware grid using statistical elevation-informed diffusion models. Resolves micro-climate valleys, ridges, and rain-shadows.',
    descriptionHi: 'बड़े 25 किमी के उपग्रह नक्शे को कृत्रिम बुद्धिमत्ता (AI) से 5 किमी के गाँव-स्तर पर बदलता है। पहाड़ी, ढलान और निचले खेतों का सटीक फर्क सामने लाता है।',
    realLifeStory: 'DISTRICT AGROMET BULLETIN · Kendrapara District (Mahakalapada & Rajnagar Blocks)\n\n• Synoptic Situation: Regional weather forecast projects 80mm rain across Kendrapara district. However, high-resolution terrain downscaling reveals severe micro-topographical disparity.\n• Primary Threat: Lowland river valley panchayats will receive 138mm with drainage failure and 1.4m standing water, whereas adjacent upland sandy ridge panchayats will receive only 52mm with safe runoff.\n• Operational Objective: Enable village sarpanches and block engineers to direct drainage equipment specifically to vulnerable lowland grids.',
    realLifeStoryHi: 'ज़िला कृषि-मौसम बुलेटिन · केन्द्रापारा ज़िला (महाकालपड़ा व राजनगर ब्लॉक)\n\n• ज़मीनी स्थिति: ज़िला स्तर पर 80 मिमी बारिश का अनुमान है। पर 5 किमी के बारीक नक्शे से पता चलता है कि ज़मीन की ढलान के कारण अलग-अलग गाँवों में बड़ा अंतर होगा।\n• मुख्य जोखिम: निचले नदी बेसिन के गाँवों में 138 मिमी बारिश से 1.4 मीटर तक पानी भरेगा, जबकि पास के ऊँचे रेत के टीलों वाले गाँवों में सिर्फ 52 मिमी बारिश होगी जो आसानी से बह जाएगी।\n• परिचालन उद्देश्य: सरपंचों और ब्लॉक इंजीनियरों को सटीक निचले गाँवों में जल निकासी जेसीबी भेजने का निर्देश देना।',
    howToUse: 'Enter your Block or Gram Panchayat name. Compare coarse satellite resolution with downscaled 5km terrain to pinpoint low-elevation ponding valleys.',
    howToUseHi: 'अपना ब्लॉक या गाँव चुनें। बड़े नक्शे से 5 किमी के बारीक नक्शे पर ज़ूम करें और देखें कि पानी किस ढलान पर रुकेगा।',
    realLifeExample: 'Input: Mahakalapada Block, Kendrapara · Resolution: 5 km. Result: Coastal lowland grid receives 138mm with drainage failure; upland ridge grid receives 52mm with rapid runoff.',
    realLifeExampleHi: 'इनपुट: महाकालपड़ा ब्लॉक, केन्द्रापारा। नतीजा: निचले इलाके में 138 मिमी बारिश और जलभराव; ऊँचे पठार पर 52 मिमी और सुरक्षित बहाव।',
    ioSpec: {
      inputs: {
        region: 'Mahakalapada & Rajnagar Lowland Blocks (Kendrapara District)',
        regionHi: 'महाकालपड़ा व राजनगर निचला ब्लॉक (केन्द्रापारा ज़िला)',
        horizon: '+24h Micro-Scale Terrain Grid (5km x 5km)',
        horizonHi: '+24 घंटे का 5 किमी सूक्ष्म धरातल ग्रिड',
        feeds: 'Deep Diffusion Downscaler + SRTM 30m Digital Elevation Model + LULC',
        feedsHi: 'डीप डिफ्यूजन मॉडल + 30-मीटर उपग्रह ढलान नक्शा + भूमि उपयोग',
        targetAsset: 'Lowland River Valley Farms vs Upland Coastal Sand Ridge Farms',
        targetAssetHi: 'निचले नदी कछार के खेत बनाम ऊँचे तटीय टीलों के खेत'
      },
      outputs: {
        coreMetric: 'Lowland Valley Rain: 138mm (1.4m Ponding) vs Upland Ridge Rain: 52mm (Safe Runoff)',
        coreMetricHi: 'निचले गाँव में बारिश: 138 मिमी (1.4 मी जलभराव) बनाम ऊँचे गाँव में: 52 मिमी (सुरक्षित)',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · LOWLAND FLOODING',
        riskTierLabelHi: 'उच्चतम जोखिम · निचला इलाका जलभराव',
        ensembleBand: 'Valley Floor: 138mm (Drainage Choke) · Upland Ridge: 52mm (Fast Drainage)',
        ensembleBandHi: 'निचला कछार: 138 मिमी (पानी रुका) · ऊँचा टीला: 52 मिमी (पानी बहा)',
        actionDirective: 'Direct JCB excavators to clear drainage culverts in lowland grids; relocate livestock to highland school shelters.',
        actionDirectiveHi: 'सरपंच नाले और पुलिया की सफाई करवाएं; निचले खेत वाले किसान पशुओं को ऊँचे पक्के स्थानों पर ले जाएं।'
      }
    },
    cascadeImpact: 'Delivers field-scale water depth into Module 09 (Crop Exposure) and Module 11 (Soil Saturation Dynamics).',
    cascadeImpactHi: 'यह बारीक पानी का नक्शा मॉड्यूल 09 (खेत की फसल) और मॉड्यूल 11 (मिट्टी की नमी) को सौंपता है।',
    actionableDecision: 'Village sarpanch directs JCB machines to unblock drainage culverts; farmers in low grid move livestock to highland shelters.',
    actionableDecisionHi: 'सरपंच नाले और पुलिया की सफाई करवाएं; निचले खेत वाले किसान पशुओं को ऊँचे पक्के स्थानों पर ले जाएं।',
    intended: ['Gram Panchayats & Village Disaster Management Committees', 'Farmers planning localized field drainage', 'Irrigation department canal engineers'],
    intendedHi: ['ग्राम पंचायत और ग्राम आपदा समितियां', 'खेत की जल निकासी वाले किसान', 'सिंचाई विभाग'],
    limitations: ['5 km resolution captures regional topography, not individual cadastral furrows', 'Requires accurate elevation DEM inputs'],
    limitationsHi: ['5 किमी का नक्शा पूरे गाँव को दिखाता है, एक-एक इंच की नाली नहीं', 'सटीक ऊँचाई डेटा की आवश्यकता होती है'],
    classes: [{ name: 'M07 Downscale', use: '5km field', useHi: '5 किमी नक्शा' }, { name: 'M09 Exposure', use: 'Cadastral crop', useHi: 'फसल फैलाव' }, { name: 'M11 Soil', use: 'Soil water', useHi: 'मिट्टी की नमी' }],
    variables: ['5km Rain Field', 'Terrain Slope', 'Micro-Wind Funneling']
  },
  {
    moduleNumber: 8, family: 'Village', familyHi: 'गाँव', scientificName: 'Run-to-Run Intensification Drift',
    description: 'Tracks forecast cycle drift (Δ Intensity) between consecutive NWP model runs (00Z vs 06Z vs 12Z). Alerts operators when a storm suddenly intensifies between operational model updates.',
    descriptionHi: 'पिछले और आज के मौसम मॉडल की सीधी तुलना करता है। अगर तूफान पिछले 6 घंटे में अचानक ज़्यादा ताकतवर हो गया है, तो तत्काल "तीव्रता वृद्धि" का अलर्ट देता है।',
    realLifeStory: 'OPERATIONAL COMMAND BULLETIN · Paradip Maritime Corridor & Jagatsinghpur\n\n• Synoptic Situation: Successive NWP operational cycles show rapid volatility. The 06Z forecast cycle projected 68mm rain, but the 12Z cycle suddenly escalated projected rainfall to 142mm (+108% jump) with gale winds accelerating by +22 km/h.\n• Primary Threat: Operators relying on older morning forecasts will be caught unprepared by rapid cyclone intensification.\n• Operational Objective: Detect run-to-run drift in real time to upgrade emergency readiness immediately.',
    realLifeStoryHi: 'परिचालन नियंत्रण कक्ष बुलेटिन · पारादीप समुद्री गलियारा व जगतसिंहपुर\n\n• ज़मीनी स्थिति: सुबह 6 बजे के मॉडल ने 68 मिमी बारिश बताई थी, पर दोपहर 12 बजे के नए चक्र में अनुमान अचानक बढ़कर 142 मिमी (+108% उछाल) हो गया और हवा 22 किमी/घंटा तेज़ हो गई।\n• मुख्य जोखिम: जो अधिकारी या किसान सुबह की पुरानी खबर पर भरोसा कर रहे हैं, वे अचानक आए भयंकर तूफान में घिर जाएंगे।\n• परिचालन उद्देश्य: मॉडल्स के बीच अचानक बदलाव को पकड़कर तुरंत अलर्ट की श्रेणी को "पीले" से "लाल" करना।',
    howToUse: 'Compare current cycle (T-0) against previous cycle (T-6h). A positive drift > +25% signals Rapid Intensification (RI) requiring immediate protocol escalation.',
    howToUseHi: 'आज का रन और 6 घंटे पुराना रन चुनें। अगर बदलाव +25% से ज़्यादा बढ़ा है तो मतलब तूफान अचानक खतरनाक हो रहा है।',
    realLifeExample: 'Input: Paradip Coastal Corridor · Current Run vs 12h-ago Run. Result: Forecast rainfall jumped from 68mm to 142mm (Δ +108%); wind speed increased by +22 km/h.',
    realLifeExampleHi: 'इनपुट: पारादीप तट। नतीजा: बारिश का अनुमान 68 मिमी से बढ़कर 142 मिमी (+108% उछाल); हवा की गति 22 किमी/घंटा और तेज़ हुई।',
    ioSpec: {
      inputs: {
        region: 'Paradip Maritime Corridor & Jagatsinghpur District',
        regionHi: 'पारादीप समुद्री गलियारा व जगतसिंहपुर ज़िला',
        horizon: '00Z vs 06Z vs 12Z Numerical Weather Prediction Cycles',
        horizonHi: '00Z, 06Z और 12Z मौसम पूर्वानुमान रन की तुलना',
        feeds: 'ECMWF IFS vs GFS Operational Run Cycles + Doppler Velocity Trend',
        feedsHi: 'ECMWF और GFS के ताज़ा रन + डॉप्लर रडार हवा की गति',
        targetAsset: 'State Emergency Contingency Teams & Grain Storage Infrastructure',
        targetAssetHi: 'आपदा प्रबंधन नियंत्रण कक्ष व अनाज भंडारण गोदाम'
      },
      outputs: {
        coreMetric: 'Rapid Intensification Detected: Δ Rain +108% (68mm ➡️ 142mm) · Wind Δ +22 km/h',
        coreMetricHi: 'अचानक तीव्रता वृद्धि: बारिश में +108% उछाल (68 से 142 मिमी) · हवा +22 किमी/घं तेज़',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · RAPID INTENSIFICATION',
        riskTierLabelHi: 'उच्चतम जोखिम · तीव्र बढ़ोतरी अलर्ट',
        ensembleBand: 'Previous Cycle: 68mm / 55 km/h ➡️ Current Cycle: 142mm / 78 km/h',
        ensembleBandHi: 'पिछला चक्र: 68 मिमी / 55 किमी/घं ➡️ ताज़ा चक्र: 142 मिमी / 78 किमी/घं',
        actionDirective: 'Escalate district emergency alert from Yellow Watch to Red Alert; reinforce grain warehouse perimeters with sandbags.',
        actionDirectiveHi: 'ज़िला अलर्ट तुरंत यलो से रेड में बदलें; अनाज गोदामों के दरवाजों पर रेत की बोरियाँ लगवाएं।'
      }
    },
    cascadeImpact: 'Re-calibrates Yield Risk (M13) and Supply Shock (M17) baseline assumptions in real time.',
    cascadeImpactHi: 'यह नया बदलाव तुरंत मॉड्यूल 13 (उपज नुकसान) और मॉड्यूल 17 (सप्लाई शॉक) के पुराने अनुमान को अपडेट करता है।',
    actionableDecision: 'Issue urgent red alert bulletin to farmers; upgrade procurement warehouse flood defenses immediately.',
    actionableDecisionHi: 'किसानों को तुरंत रेड अलर्ट जारी करें; अनाज गोदामों में पानी घुसने से रोकने के लिए रेत की बोरियाँ लगवाएं।',
    intended: ['Emergency operational commanders', 'Agri-commodity traders monitoring weather revisions', 'Meteorological briefing officers'],
    intendedHi: ['आपदा प्रबंधन नियंत्रण कक्ष', 'अनाज और कमोडिटी व्यापारी', 'मौसम अधिकारी'],
    limitations: ['Drift indicates model volatility, not ground truth', 'Requires back-to-back operational model cycles'],
    limitationsHi: ['मॉडल में उतार-चढ़ाव दिखाता है, ज़मीन की हकीकत नहीं', 'कम से कम दो चक्रों का डेटा चाहिए'],
    classes: [{ name: 'M08 Drift', use: 'Δ Intensification', useHi: 'तीव्रता बदलाव' }, { name: 'M13 Yield', use: 'Risk update', useHi: 'जोखिम अपडेट' }],
    variables: ['Run Delta Rain', 'Wind Acceleration', 'Rapid Intensification Flag']
  },
  {
    moduleNumber: 9, family: 'Field', familyHi: 'खेत', scientificName: 'Cadastral Crop Exposure',
    description: 'Overlays satellite cadastral crop masks (Paddy, Cotton, Wheat, Pulses) with hazard footprints. Quantifies exact HECTARES EXPOSED. Upholds the core scientific principle: Exposure ≠ Loss.',
    descriptionHi: 'खेतों के उपग्रह नक्शे को बारिश के घेरे पर बिछाकर निकालता है कि कितने हेक्टेयर फसल खतरे के रास्ते में है। याद रखें: प्रभावित होना (एक्सपोज़र) नुकसान (लॉस) नहीं है।',
    realLifeStory: 'STATE AGRICULTURE DEPARTMENT BULLETIN · Puri & Kendrapara Districts\n\n• Synoptic Situation: Post-cyclonic inundation envelope covers major portions of Puri and Kendrapara.\n• Primary Threat: Out of 2,21,800 hectares of total sown Kharif paddy, exactly 1,48,200 hectares (66.8%) lie within the waterlogged hazard envelope.\n• Operational Objective: Enumerate exposed crop inventory for PMFBY insurance adjusters while maintaining: Exposure is NOT final crop mortality.',
    realLifeStoryHi: 'कृषि विभाग सांख्यिकी बुलेटिन · पुरी व केन्द्रापारा ज़िला\n\n• ज़मीनी स्थिति: चक्रवाती बारिश के बाद पानी का घेरा दोनों ज़िलों के बड़े हिस्से में फैल गया है।\n• मुख्य जोखिम: कुल 2,21,800 हेक्टेयर बोए गए धान में से 1,48,200 हेक्टेयर (66.8%) खेत पानी के घेरे में आ गए हैं।\n• परिचालन उद्देश्य: बीमा कंपनियों और राहत दलों के लिए प्रभावित रकबे की सही गिनती करना (याद रखें: प्रभावित होने का मतलब 100% नुकसान नहीं है)।',
    howToUse: 'Select the target District and Crop Category. Review the total sown acreage versus exposed acreage in hectares and percentage terms.',
    howToUseHi: 'जिला और फसल चुनें। कुल बोया गया क्षेत्र और खतरे में आया क्षेत्र (हेक्टेयर और %) देखें।',
    realLifeExample: 'Input: Puri & Kendrapara Districts · Crop: Kharif Paddy. Result: Total Sown: 2,21,800 ha; Exposed in Hazard Envelope: 1,48,200 ha (66.8% of district area).',
    realLifeExampleHi: 'इनपुट: पुरी और केन्द्रापारा · फसल: धान। नतीजा: कुल बोया रकबा 2,21,800 हेक्टेयर; पानी के खतरे में 1,48,200 हेक्टेयर (66.8% प्रभावित)।',
    ioSpec: {
      inputs: {
        region: 'Puri & Kendrapara Rice Belt (Cadastral Plot-Level Grid)',
        regionHi: 'पुरी व केन्द्रापारा धान क्षेत्र (खेत-वार उपग्रह ग्रिड)',
        horizon: 'Active Post-Cyclone Hazard Footprint Overlay',
        horizonHi: 'सक्रिय चक्रवात जलभराव घेरा ओवरले',
        feeds: 'Sentinel-2 10m Multispectral Crop Mask + State Cadastral Land Parcel Records',
        feedsHi: 'सेंटिनल-2 उपग्रह फसल नक्शा + राज्य भू-अभिलेख खसरा रिकॉर्ड',
        targetAsset: '2,21,800 Total Sown Hectares of Kharif Paddy',
        targetAssetHi: 'कुल 2,21,800 हेक्टेयर में बोया गया खरीफ धान'
      },
      outputs: {
        coreMetric: 'Exposed Sown Area: 1,48,200 Hectares (66.8% of District Paddy Area Inundated)',
        coreMetricHi: 'प्रभावित रकबा: 1,48,200 हेक्टेयर (ज़िले के 66.8% धान के खेत जलभराव में)',
        riskTier: 'ELEVATED',
        riskTierLabel: 'ELEVATED · 66.8% CROP EXPOSURE',
        riskTierLabelHi: 'मध्यम जोखिम · 66.8% फसल प्रभावित',
        ensembleBand: 'Total Sown: 2,21,800 ha · Exposed: 1,48,200 ha · Unaffected: 73,600 ha',
        ensembleBandHi: 'कुल बोया: 2,21,800 हे. · प्रभावित: 1,48,200 हे. · सुरक्षित: 73,600 हे.',
        actionDirective: 'Pre-alert PMFBY insurance survey adjusters; prepare contingency seeds in non-flooded blocks for potential re-sowing.',
        actionDirectiveHi: 'फसल बीमा सर्वेक्षकों को तैयार रखें; गैर-बाढ़ वाले ब्लॉकों में दोबारा बुवाई के लिए बीज तैयार रखें।'
      }
    },
    cascadeImpact: 'Transmits exposed hectare counts to Module 10 (Phenology Growth Stage) and Module 13 (Yield Risk Engine) to compute actual mortality.',
    cascadeImpactHi: 'यह हेक्टेयर संख्या मॉड्यूल 10 (फसल की अवस्था) और मॉड्यूल 13 (उपज नुकसान) को जाती है ताकि सही नुकसान निकाला जा सके।',
    actionableDecision: 'Mobilize crop insurance loss adjusters; prepare contingency paddy nursery seeds in non-flooded blocks.',
    actionableDecisionHi: 'फसल बीमा सर्वेक्षकों को तैयार रखें; गैर-बाढ़ वाले इलाकों में दोबारा बुवाई के लिए धान की नर्सरी तैयार करवाएं।',
    intended: ['State Departments of Agriculture', 'Pradhan Mantri Fasal Bima Yojana (PMFBY) insurance providers', 'District Agriculture Officers (DAOs)'],
    intendedHi: ['राज्य कृषि विभाग', 'प्रधानमंत्री फसल बीमा योजना (PMFBY)', 'जिला कृषि अधिकारी'],
    limitations: ['Exposure measures area sitting in the footprint; it does NOT mean 100% crop loss', 'Relies on seasonal crop classification maps'],
    limitationsHi: ['एक्सपोज़र का मतलब खतरा है, पूरी फसल बर्बाद नहीं', 'उपग्रह से ली गई फसल पहचान पर आधारित'],
    classes: [{ name: 'M09 Exposure', use: 'Hectares at risk', useHi: 'जोखिम में हेक्टेयर' }, { name: 'M10 Stage', use: 'Biological vulnerability', useHi: 'जैविक संवेदनशीलता' }, { name: 'M13 Yield', use: 'Loss percentage', useHi: 'नुकसान प्रतिशत' }],
    variables: ['Sown Hectares', 'Exposed Hectares', 'Crop Concentration Index']
  },
  {
    moduleNumber: 10, family: 'Field', familyHi: 'खेत', scientificName: 'Crop Growth Stage (GDD)',
    description: 'Tracks crop biological maturity using thermal Growing Degree Days (GDD) and calendar clocks. Determines stage fragility: vegetative stages tolerate waterlogging; flowering and grain-filling stages suffer severe sterility.',
    descriptionHi: 'फसल की जैविक अवस्था (अंकुरण, कल्ले फूटना, फूल आना, दाना भरना) को तापमान और समय से मापता है। फूल आने के समय बारिश हो तो दाना नहीं बनता, जबकि हरी अवस्था में बारिश फायदेमंद होती है।',
    realLifeStory: 'AGRONOMIC ADVISORY BULLETIN · Coastal Odisha Swarna Rice Belt\n\n• Synoptic Situation: Heavy storm rain hits two adjacent farm clusters sown at different dates.\n• Primary Threat: Early-sown paddy is at the flowering (anthesis) stage where heavy rain washes away pollen, causing an estimated 40% empty grain husks (Fragility Index: 0.88). Late-sown paddy is at the vegetative tillering stage, which easily tolerates submergence.\n• Operational Objective: Apply biological fragility weights to exposed hectares rather than assuming uniform crop death.',
    realLifeStoryHi: 'कृषि विशेषज्ञ सलाह बुलेटिन · तटीय ओडिशा स्वर्ण धान बेल्ट\n\n• ज़मीनी स्थिति: एक जैसी तूफानी बारिश दो अलग-अलग तारीखों में बोए गए खेतों पर गिरती है।\n• मुख्य जोखिम: अगेती बोए धान में फूल (Anthesis) आ चुके हैं, जहाँ बारिश से परागकण धुलने से 40% बालियां खाली रह जाएंगी (संवेदनशीलता: 0.88)। पछेती बोया धान हरी अवस्था में है जो पानी सह लेगा।\n• परिचालन उद्देश्य: फसल की उम्र के अनुसार सही नुकसान का हिसाब लगाना, न कि सभी खेतों को मरा हुआ मान लेना।',
    howToUse: 'Input sowing date or select current phenology stage. Read the Fragility Coefficient (0.2 = hardy vegetative; 0.9 = critical flowering vulnerability).',
    howToUseHi: 'बुवाई की तारीख या फसल की वर्तमान अवस्था चुनें। संवेदनशीलता गुणांक देखें (0.2 मतलब मजबूत, 0.9 मतलब बहुत नाज़ुक)।',
    realLifeExample: 'Input: Kharif Paddy, Sown July 10, Current Oct 4 · Stage: Flowering / Anthesis · Fragility Index: 0.88 (Critical sensitivity to pollen wash & wind lodging).',
    realLifeExampleHi: 'इनपुट: धान, बुवाई 10 जुलाई · वर्तमान अवस्था: फूल आना · संवेदनशीलता: 0.88 (अत्यधिक नाज़ुक, तेज बारिश से दाना नहीं भरेगा)।',
    ioSpec: {
      inputs: {
        region: 'Coastal Odisha Rice Basin (Sowing: July 10 · Current: Oct 4)',
        regionHi: 'तटीय ओडिशा धान बेसिन (बुवाई: 10 जुलाई · वर्तमान: 4 अक्टूबर)',
        horizon: 'Thermal Growing Degree Day (GDD) Accumulation Clock',
        horizonHi: 'थर्मल ग्रोइंग डिग्री डे (GDD) जैविक घड़ी',
        feeds: 'MODIS 250m NDVI Time Series + Daily Mean Canopy Temperatures',
        feedsHi: 'MODIS उपग्रह फसल हरियाली + दैनिक औसत तापमान रिकॉर्ड',
        targetAsset: 'Medium-Duration Swarna Paddy at Flowering (Anthesis) Stage',
        targetAssetHi: 'फूल आने (Anthesis) की नाज़ुक अवस्था में खड़ी स्वर्ण धान'
      },
      outputs: {
        coreMetric: 'Biological Fragility Index: 0.88 (Critical Sensitivity: High Pollen Sterility & Lodging Risk)',
        coreMetricHi: 'जैविक संवेदनशीलता सूचकांक: 0.88 (अत्यधिक नाज़ुक: परागकण धुलने व फसल गिरने का खतरा)',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · ANTHESIS FRAGILITY',
        riskTierLabelHi: 'उच्चतम जोखिम · फूल अवस्था संवेदनशीलता',
        ensembleBand: 'Tillering Stage: 0.22 (Tough) ➡️ Anthesis: 0.88 (Critical) ➡️ Mature: 0.65',
        ensembleBandHi: 'कल्ले फूटना: 0.22 (मजबूत) ➡️ फूल आना: 0.88 (नाज़ुक) ➡️ परिपक्व: 0.65',
        actionDirective: 'Avoid draining all standing water during flowering; apply foliar potash spray to harden plant stems against lodging.',
        actionDirectiveHi: 'फूल आने के समय खेत से पूरा पानी न निकालें; पोटाश का छिड़काव करें ताकि तना मजबूत रहे और हवा से न गिरे।'
      }
    },
    cascadeImpact: 'Acts as the biological multiplier on Module 09 (Exposed Hectares) inside Module 13 (Yield Risk Engine).',
    cascadeImpactHi: 'यह संवेदनशीलता मॉड्यूल 09 के प्रभावित हेक्टेयर से गुणा होकर मॉड्यूल 13 में वास्तविक नुकसान निकालती है।',
    actionableDecision: 'Do not drain water completely during flowering; apply potash spray to strengthen plant culm against wind lodging.',
    actionableDecisionHi: 'फूल आने के समय खेत से पूरा पानी न निकालें; पोटाश का हल्का छिड़काव करें ताकि तना मजबूत रहे और हवा से न गिरे।',
    intended: ['Agronomists advising farmers on seasonal vulnerability', 'Crop cutting experiment (CCE) planning teams', 'FPO harvest scheduling officers'],
    intendedHi: ['कृषि विशेषज्ञ और सलाहकार', 'फसल कटाई प्रयोग (CCE) दल', 'एफपीओ कटाई प्रबंधक'],
    limitations: ['Variety-specific GDD thresholds vary (e.g. Swarna vs MTU 1010)', 'Requires regional sowing window baseline'],
    limitationsHi: ['अलग-अलग किस्मों (जैसे स्वर्ण बनाम 1010) के पकने का समय अलग होता है', 'बुवाई की तारीख की जानकारी ज़रूरी है'],
    classes: [{ name: 'M10 Stage', use: 'Phenology clock', useHi: 'फसल अवस्था घड़ी' }, { name: 'M13 Yield', use: 'Vulnerability factor', useHi: 'नुकसान कारक' }, { name: 'M14 Pest', use: 'Canopy susceptibility', useHi: 'रोग ग्राह्यता' }],
    variables: ['Growing Degree Days (GDD)', 'Growth Stage', 'Biological Fragility Index']
  },
  {
    moduleNumber: 11, family: 'Field', familyHi: 'खेत', scientificName: '3D Soil Moisture & Waterlogging',
    description: 'Simulates multi-layer subterranean soil hydrology (0-30cm root zone, 30-100cm subsoil). Calculates moisture retention, percolation rate, water table rise, and root hypoxia (oxygen starvation) duration.',
    descriptionHi: 'ज़मीन के नीचे 0-30 सेमी और 30-100 सेमी गहराई में मिट्टी की नमी, पानी सोखने की गति और जलभराव का 3D हिसाब लगाता है। बताता है कि जड़ों में कितने घंटे हवा (ऑक्सीजन) रुकी रहेगी।',
    realLifeStory: 'SOIL CONSERVATION ADVISORY · Vidarbha Black Cotton Soil & Coastal Alluvial Basins\n\n• Synoptic Situation: 120mm rainfall accumulates over heavy clay loam soils with low percolation.\n• Primary Threat: Subsoil saturation reaches 98% with 14cm of standing field water. Roots remain oxygen-deprived (hypoxia) for 68 consecutive hours, causing root rot and chlorophyll breakdown.\n• Operational Objective: Alert farmers to excavate perimeter drainage trenches and halt urea application.',
    realLifeStoryHi: 'मृदा संरक्षण बुलेटिन · विदर्भ काली मिट्टी व तटीय दोमट बेसिन\n\n• ज़मीनी स्थिति: भारी चिकनी मिट्टी पर 120 मिमी बारिश जमा हो गई है, जहाँ पानी नीचे रिसने की गति बहुत धीमी है।\n• मुख्य जोखिम: जड़ क्षेत्र में 98% नमी और 14 सेमी पानी भरा है। जड़ों को लगातार 68 घंटे ऑक्सीजन नहीं मिलेगी (हाइपोक्सिया), जिससे जड़ें सड़ेंगी और पत्तियां पीली पड़ेंगी।\n• परिचालन उद्देश्य: किसानों को तुरंत मेड़ काटकर पानी निकालने और खड़े पानी में यूरिया न डालने की चेतावनी देना।',
    howToUse: 'Select Soil Series (Black Cotton, Alluvial Clay, Sandy Loam). Monitor Root Zone Saturation % and Hypoxia Hours (>48h saturation indicates root suffocation).',
    howToUseHi: 'मिट्टी का प्रकार चुनें (काली मिट्टी, दोमट, बलुई)। जड़ क्षेत्र में नमी % और पानी खड़ा रहने का समय देखें। 48 घंटे से ज़्यादा जलभराव मतलब जड़ों का दम घुटना।',
    realLifeExample: 'Input: Coastal Alluvial Clay · Accumulated Rain: 120mm. Result: 0-30cm Saturation: 98%; Inundation ponding: 14 cm; drainage time required: 68 hours.',
    realLifeExampleHi: 'इनपुट: तटीय दोमट-चिकनी मिट्टी · बारिश: 120 मिमी। नतीजा: जड़ क्षेत्र में 98% पानी भरा; 14 सेमी पानी खड़ा; सूखने में 68 घंटे लगेंगे।',
    ioSpec: {
      inputs: {
        region: 'Coastal Alluvial Lowlands & Vidarbha Clay Soil Belts',
        regionHi: 'तटीय दोमट निचला इलाका व विदर्भ काली मिट्टी बेल्ट',
        horizon: '+72h Subterranean Hydrological Soil Solver',
        horizonHi: '+72 घंटे का भूमिगत मृदा जल संतुलन मॉडल',
        feeds: 'NASA SMAP Soil Moisture Satellite + ICAR Soil Series Maps + Runoff Models',
        feedsHi: 'नासा SMAP उपग्रह मिट्टी नमी + कृषि अनुसंधान मृदा नक्शा + जल बहाव समीकरण',
        targetAsset: 'Kharif Soybean, Cotton & Paddy Root Systems (0-30cm Depth)',
        targetAssetHi: 'खरीफ सोयाबीन, कपास व धान की जड़ प्रणाली (0-30 सेमी)'
      },
      outputs: {
        coreMetric: 'Root Zone Saturation: 98% · Standing Ponding: 14 cm · Hypoxia Duration: 68 Hours',
        coreMetricHi: 'जड़ क्षेत्र में 98% पानी · 14 सेमी पानी खड़ा · 68 घंटे जड़ों की ऑक्सीजन बंद',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · ROOT HYPOXIA',
        riskTierLabelHi: 'उच्चतम जोखिम · जड़ घुटन / सड़न खतरा',
        ensembleBand: 'Aeration Deficit: 68h Hypoxia · Percolation: 1.2 mm/h (Extremely Slow Drainage)',
        ensembleBandHi: 'ऑक्सीजन कमी: 68 घंटे · रिसाव गति: 1.2 मिमी/घंटा (अत्यधिक धीमी)',
        actionDirective: 'Dig drainage channels at lowest field corner immediately; suspend all nitrogen top-dressing until soil drains.',
        actionDirectiveHi: 'खेत के निचले कोने में तुरंत जल निकासी नाली बनाएं; खड़े पानी में यूरिया खाद बिल्कुल न डालें।'
      }
    },
    cascadeImpact: 'Extended soil saturation triggers fungal spore germination in Module 14 (Pest & Disease) and lowers yield in Module 13.',
    cascadeImpactHi: 'लगातार गीली मिट्टी मॉड्यूल 14 (कीट और रोग) में फफूंद का खतरा बढ़ाती है और मॉड्यूल 13 में उपज घटाती है।',
    actionableDecision: 'Dig drainage channels at lowest field corner immediately; do not apply nitrogen fertilizer to waterlogged fields.',
    actionableDecisionHi: 'खेत के निचले कोने में तुरंत जल निकासी नाली बनाएं; खड़े पानी में यूरिया खाद बिल्कुल न डालें।',
    intended: ['Farmers managing irrigation and drainage', 'Soil Conservation Officers', 'Hydrological watershed management bodies'],
    intendedHi: ['किसान: सिंचाई और निकासी प्रबंधन', 'मृदा संरक्षण अधिकारी', 'जल संरक्षण विभाग'],
    limitations: ['Soil retention curves vary by local bulk density and organic matter', 'Pumped or mechanical drainage is not assumed'],
    limitationsHi: ['मिट्टी में जैविक खाद की मात्रा के अनुसार पानी सोखने की क्षमता बदलती है', 'पंप से पानी निकालने का हिसाब शामिल नहीं'],
    classes: [{ name: 'M11 Soil', use: 'Hydrology solver', useHi: 'जल संतुलन' }, { name: 'M14 Pest', use: 'Leaf wetness source', useHi: 'नमी स्रोत' }, { name: 'M13 Yield', use: 'Hypoxia penalty', useHi: 'जड़ घुटन नुकसान' }],
    variables: ['Root Zone Saturation %', 'Ponding Depth (cm)', 'Drainage Rate (mm/h)', 'Hypoxia Hours']
  },
  {
    moduleNumber: 12, family: 'Field', familyHi: 'खेत', scientificName: 'Explainable Crop Advice',
    description: 'Generates explainable agronomic counterfactual recommendations. If rainfall is deficient or delayed, evaluates alternative crop choices (Millets, Pulses, Oilseeds) with transparent economic and water trade-offs.',
    descriptionHi: 'स्पष्ट और वैज्ञानिक सलाह देता है कि मौसम बदलने पर क्या बोएं। अगर मानसून 20 दिन देर से आए, तो कपास की जगह सोयाबीन या बाजरा क्यों बेहतर रहेगा — पूरे कारणों और मुनाफे के हिसाब के साथ।',
    realLifeStory: 'DISTRICT CONTINGENCY SOWING BULLETIN · Marathwada Semi-Arid Zone\n\n• Synoptic Situation: Monsoon onset is delayed by 22 days, leaving soil moisture deficient by -30% during the standard July sowing window.\n• Primary Threat: Farmers attempting long-duration cotton face high risk of terminal moisture drought and crop failure.\n• Operational Objective: Recommend short-duration alternative crops (Pigeonpea + Pearl Millet intercrop) to protect seasonal farm income.',
    realLifeStoryHi: 'आपातकालीन बुवाई बुलेटिन · मराठवाड़ा अर्ध-शुष्क क्षेत्र\n\n• ज़मीनी स्थिति: मानसून 22 दिन की देरी से आया है, जिससे जुलाई की सामान्य बुवाई के समय मिट्टी में 30% नमी की भारी कमी है।\n• मुख्य जोखिम: अगर किसान अभी लंबे समय वाली कपास बोएंगे तो बाद में पानी की कमी से पूरी फसल सूखने और भारी आर्थिक नुकसान का खतरा है।\n• परिचालन उद्देश्य: कम समय में पकने वाली दलहन व बाजरा की मिश्रित खेती की सलाह देकर किसान की लागत और आमदनी बचाना।',
    howToUse: 'Enter current crop and rainfall deficit scenario (-25%). Review alternative crop options with projected water savings and net economic return.',
    howToUseHi: 'अपनी फसल और बारिश की स्थिति डालें (-25% सूखा)। सुझाई गई वैकल्पिक फसलें, पानी की बचत और अनुमानित मुनाफा पढ़ें।',
    realLifeExample: 'Input: Cotton under delayed monsoon (-30% moisture) · Advice: Switch to Pigeonpea + Bajra intercrop (1:2); reduces water requirement by 42% with net return of ₹38,500/ha.',
    realLifeExampleHi: 'इनपुट: देरी से आया मानसून, कपास · सलाह: अरहर + बाजरा (1:2) लगाएं; पानी 42% कम लगेगा और ₹38,500/हेक्टेयर की सुरक्षित आय होगी।',
    ioSpec: {
      inputs: {
        region: 'Marathwada Agro-Climatic Zone (Aurangabad - Jalna)',
        regionHi: 'मराठवाड़ा कृषि क्षेत्र (औरंगाबाद - जालना)',
        horizon: '85–100 Day Contingency Kharif Window',
        horizonHi: '85-100 दिन की आपातकालीन खरीफ समय सीमा',
        feeds: 'ICAR Crop Water Requirements + State Agromet Sowing Advisories',
        feedsHi: 'आईसीएआर फसल जल आवश्यकता + राज्य कृषि बुलेटिन',
        targetAsset: 'Contingency Sowing Decision (Long Cotton vs Short Pulses/Millets)',
        targetAssetHi: 'आपात बुवाई फैसला (लंबी कपास बनाम कम अवधि दलहन/बाजरा)'
      },
      outputs: {
        coreMetric: 'Counterfactual Switch: Long-Duration Cotton ➡️ Short-Duration Pigeonpea + Bajra (1:2)',
        coreMetricHi: 'फसल बदलाव: लंबी कपास ➡️ 85 दिन की अरहर + बाजरा मिश्रित खेती (1:2)',
        riskTier: 'ADVISORY',
        riskTierLabel: 'ADVISORY · CONTINGENCY SOWING',
        riskTierLabelHi: 'सलाहकारी · आपात बुवाई सिफारिश',
        ensembleBand: 'Water Savings: 42% · Nitrogen Protection: High · Expected Net Return: ₹38,500/ha',
        ensembleBandHi: 'पानी बचत: 42% · उर्वरता सुरक्षा: उच्च · अनुमानित शुद्ध आय: ₹38,500/हे.',
        actionDirective: 'Procure certified short-duration drought-hardy seed varieties from block agriculture depots; modify sowing plan.',
        actionDirectiveHi: 'नजदीकी सरकारी कृषि केंद्र से कम अवधि वाले प्रमाणित बीज लें; पुरानी बुवाई योजना बदलें।'
      }
    },
    cascadeImpact: 'Realigned crop selections feed into Mandi Intelligence (M15) to verify local market demand and MSP procurement support.',
    cascadeImpactHi: 'सुझाई गई फसल का डेटा मॉड्यूल 15 (मंडी भाव) से जुड़ता है ताकि पता चले कि बाज़ार में इसका भाव और खरीद कैसी है।',
    actionableDecision: 'Purchase certified drought-hardy seed varieties from state agriculture depots before sowing window closes.',
    actionableDecisionHi: 'समय रहते नजदीकी कृषि केंद्र से कम समय में पकने वाले प्रमाणित बीज खरीदें; पुरानी बुवाई योजना बदलें।',
    intended: ['Farmers planning contingency sowing', 'Krishi Vigyan Kendra (KVK) extension scientists', 'FPO crop planning committees'],
    intendedHi: ['किसान: आपातकालीन बुवाई योजना', 'कृषि विज्ञान केंद्र (KVK) वैज्ञानिक', 'एफपीओ फसल समिति'],
    limitations: ['Advice depends on seed availability in local markets', 'Does not mandate farming practices; decision rests with farmer'],
    limitationsHi: ['सलाह स्थानीय बीज की उपलब्धता पर निर्भर करती है', 'अंतिम फैसला किसान का अपना है'],
    classes: [{ name: 'M12 Advice', use: 'Counterfactual engine', useHi: 'वैकल्पिक सलाह' }, { name: 'M15 Mandi', use: 'Price verification', useHi: 'मंडी भाव जांच' }],
    variables: ['Rainfall Scenario', 'Recommended Crop', 'Water Savings %', 'Expected Return']
  },
  {
    moduleNumber: 13, family: 'Field', familyHi: 'खेत', scientificName: 'Yield Risk P10 / P50 / P90',
    description: 'Integrates the complete multi-physics cascade (Atmosphere + Exposure + Phenology + Hydrology) to compute probabilistic crop yield penalties. Outputs robust P10, P50, and P90 quintal/hectare harvest bounds.',
    descriptionHi: 'मौसम, प्रभावित रकबा, फसल की उम्र और मिट्टी की नमी को मिलाकर उपज नुकसान की संभावना (P10 खराब, P50 सामान्य, P90 बेहतर) निकालता है। कभी "ठीक 18% गिरेगा" जैसा झूठा दावा नहीं करता।',
    realLifeStory: 'STATE FOOD & CIVIL SUPPLIES HARVEST FORECAST · Coastal Odisha Rice Belt\n\n• Synoptic Situation: Post-cyclonic floodwaters recede across 1.48 lakh hectares of standing paddy.\n• Primary Threat: Under normal conditions, baseline yield averages 4.2 tonnes/ha. Due to combined submergence and pollen wash, median projected yield drops to 3.1 t/ha (-26.2% deficit), with worst-case P10 falling to 2.4 t/ha.\n• Operational Objective: Provide realistic probabilistic yield estimates to FPOs, procurement agencies, and crop insurers.',
    realLifeStoryHi: 'खाद्य व नागरिक आपूर्ति उपज पूर्वानुमान · तटीय ओडिशा धान बेल्ट\n\n• ज़मीनी स्थिति: चक्रवात और बाढ़ के बाद 1.48 लाख हेक्टेयर धान के खेतों से पानी उतरना शुरू हुआ है।\n• मुख्य जोखिम: सामान्य मौसम में उपज 4.2 टन/हेक्टेयर होती है। पर बाढ़ और फूल धुलने से संभावित औसत उपज 3.1 टन/हेक्टेयर (-26.2% गिरावट) और सबसे खराब स्थिति में 2.4 टन/हेक्टेयर रह जाएगी।\n• परिचालन उद्देश्य: सरकार, एफपीओ और बीमा कंपनियों को बिना किसी अंदाज़े के सटीक संभावित उपज के आंकड़े देना।',
    howToUse: 'Select Agro-Basin and Target Crop. Review the probabilistic harvest yield distribution curve comparing baseline normal versus post-event yield.',
    howToUseHi: 'इलाका और फसल चुनें। उपज वितरण वक्र देखें और सामान्य वर्ष की तुलना में इस वर्ष की संभावित उपज पढ़ें।',
    realLifeExample: 'Input: Coastal Odisha Kharif Paddy · Baseline: 4.2 t/ha. Result: P10 = 2.4 t/ha (-42.8%), P50 = 3.1 t/ha (-26.2%), P90 = 3.8 t/ha (-9.5%). Projected Loss: -1.1 t/ha.',
    realLifeExampleHi: 'इनपुट: तटीय ओडिशा खरीफ धान · सामान्य उपज: 4.2 टन/हेक्टेयर। नतीजा: P10 = 2.4 टन (-43%), P50 = 3.1 टन (-26%), P90 = 3.8 टन (-10%)। संभावित औसत नुकसान: 1.1 टन/हे.',
    ioSpec: {
      inputs: {
        region: 'Coastal Odisha Kharif Rice Belt (8 Coastal Districts)',
        regionHi: 'तटीय ओडिशा खरीफ धान क्षेत्र (8 तटीय ज़िले)',
        horizon: 'Post-Calamity Harvest Realization Window',
        horizonHi: 'आपदा उपरांत कटाई व उपज प्राप्ति समय',
        feeds: 'Coupled Cascade Engine: M01 + M04 + M09 + M10 + M11 Telemetry',
        feedsHi: 'एकीकृत कैस्केड: मौसम + बाढ़ घेरा + फसल अवस्था + मिट्टी नमी',
        targetAsset: 'State Paddy Procurement Target (42.81 Lakh Metric Tonnes)',
        targetAssetHi: 'राज्य धान खरीद लक्ष्य (42.81 लाख मीट्रिक टन)'
      },
      outputs: {
        coreMetric: 'Median Yield Realization: 3.1 t/ha (-26.2% Deficit from 4.2 t/ha Baseline)',
        coreMetricHi: 'संभावित औसत उपज: 3.1 टन/हेक्टेयर (सामान्य 4.2 टन से -26.2% की कमी)',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · 26.2% YIELD DEFICIT',
        riskTierLabelHi: 'उच्चतम जोखिम · 26.2% उपज गिरावट',
        ensembleBand: 'P10 (Worst-Case): 2.4 t/ha · P50 (Expected): 3.1 t/ha · P90 (Best-Case): 3.8 t/ha',
        ensembleBandHi: 'P10 (खराब): 2.4 टन/हे. · P50 (संभावित): 3.1 टन/हे. · P90 (बेहतर): 3.8 टन/हे.',
        actionDirective: 'FPOs adjust advance procurement supply contracts to 31 q/ha; insurance providers expedite PMFBY interim claim disbursements.',
        actionDirectiveHi: 'एफपीओ 31 क्विंटल/हेक्टेयर के यथार्थवादी लक्ष्य पर अनुबंध करें; बीमा कंपनियाँ किसानों के क्लेम के लिए बजट आरक्षित करें।'
      }
    },
    cascadeImpact: 'Transmits aggregate tonnage loss directly into APMC Mandi Arrivals (M15) and District Supply Deficits (M17).',
    cascadeImpactHi: 'यह उपज गिरावट सीधे मॉड्यूल 15 (मंडी आवक) और मॉड्यूल 17 (सप्लाई शॉक) में जाकर अनाज की कमी का हिसाब बनाती है।',
    actionableDecision: 'FPOs adjust advance procurement contracts to realistic 31 q/ha targets; insurance companies initiate expedited claim reserves.',
    actionableDecisionHi: 'एफपीओ 31 क्विंटल/हेक्टेयर के यथार्थवादी लक्ष्य पर अनुबंध करें; बीमा कंपनियाँ किसानों के क्लेम के लिए बजट आरक्षित करें।',
    intended: ['Crop insurance underwriters (PMFBY)', 'Farmer Producer Organizations (FPOs)', 'State Food & Civil Supplies Departments'],
    intendedHi: ['फसल बीमा कंपनियाँ', 'किसान उत्पादक संगठन (FPO)', 'खाद्य एवं नागरिक आपूर्ति विभाग'],
    limitations: ['Calibrated for major staple crops (Paddy, Wheat, Soybean, Maize)', 'Extreme pest outbreaks can compound loss beyond physical weather'],
    limitationsHi: ['प्रमुख फसलों (धान, गेहूं, सोयाबीन, मक्का) के लिए कैलिब्रेटेड', 'कीट या बीमारी लगने पर नुकसान और बढ़ सकता है'],
    classes: [{ name: 'M13 Yield', use: 'Probabilistic loss', useHi: 'संभावित नुकसान' }, { name: 'M15 Mandi', use: 'Arrival shock', useHi: 'मंडी आवक झटका' }, { name: 'M17 Shock', use: 'Deficit aggregation', useHi: 'अनाज कमी' }],
    variables: ['P10 Yield (t/ha)', 'P50 Yield (t/ha)', 'P90 Yield (t/ha)', 'Statewide Loss Tonnage']
  },
  {
    moduleNumber: 14, family: 'Field', familyHi: 'खेत', scientificName: 'Pest & Disease Climate Risk',
    description: 'Couples micro-climatic humidity, canopy temperature, and leaf wetness hours with biological epidemiological models. Predicts pathogen reproduction rates (R0) for fungal and insect outbreaks (BLB, BPH, Rust).',
    descriptionHi: 'पत्ते गीले रहने के घंटे, रात की गर्मी और उमस से कीट और रोगों (झुलसा, भूरा फुदका, रतुआ) के फैलने की गति (R0) का पूर्वानुमान लगाता है। बीमारी दिखने से पहले चेतावनी देता है।',
    realLifeStory: 'PLANT PROTECTION ADVISORY · Sambalpur Canal Command Area\n\n• Synoptic Situation: Continuous cloud cover, warm nocturnal temperatures (25.8°C), and relative humidity exceeding 92% keep paddy leaves continuously wet for 16.4 hours per day.\n• Primary Threat: Pathogen reproduction rate (R0) surges to 2.4, creating epidemic outbreak conditions for Bacterial Leaf Blight (BLB) and Brown Plant Hopper (BPH).\n• Operational Objective: Warn farmers 5 days prior to visual foliar symptom appearance so biological bio-fungicides can be applied.',
    realLifeStoryHi: 'पौध संरक्षण बुलेटिन · संबलपुर नहर कमान क्षेत्र\n\n• ज़मीनी स्थिति: लगातार बादल छाए रहने, रात के गर्म तापमान (25.8°C) और 92% से अधिक उमस के कारण धान के पत्ते रोज़ाना 16.4 घंटे गीले रह रहे हैं।\n• मुख्य जोखिम: बीमारी फैलने की दर (R0) 2.4 पर पहुँच गई है, जिससे बैक्टीरियल ब्लाइट (झुलसा) और भूरा फुदका (BPH) महामारी की तरह फैलने की कगार पर हैं।\n• परिचालन उद्देश्य: खेत में पीलापन दिखने से 5 दिन पहले ही किसानों को चेतावनी देना ताकि जैविक फफूंदनाशी का छिड़काव किया जा सके।',
    howToUse: 'Inspect Leaf Wetness Duration (hours) and Pathogen Reproduction Index (R0). An R0 score above 1.5 indicates active epidemic proliferation requiring field scouting.',
    howToUseHi: 'पत्ते गीले रहने के घंटे और बीमारी फैलने की गति (R0) जांचें। 1.5 से ऊपर का स्कोर महामारी का संकेत है।',
    realLifeExample: 'Input: Sambalpur Canal Command · Stage: Paddy Anthesis. Result: Leaf Wetness: 16.4 h/day; Night Temp: 25.8°C; R0 = 2.4 (Critical Outbreak Risk for Bacterial Leaf Blight).',
    realLifeExampleHi: 'इनपुट: संबलपुर · अवस्था: धान फूल अवस्था। नतीजा: पत्ते गीले रहने का समय 16.4 घंटे/दिन; रात का तापमान 25.8°C; R0 = 2.4 (झुलसा रोग का गंभीर खतरा)।',
    ioSpec: {
      inputs: {
        region: 'Sambalpur Canal Command Paddy Basin (Hirakud Downstream)',
        regionHi: 'संबलपुर नहर कमान धान क्षेत्र (हीराकुड डाउनस्ट्रीम)',
        horizon: '+5-Day Bio-Climatic Epidemic Forecast Window',
        horizonHi: '+5 दिन का जैव-मौसम महामारी पूर्वानुमान',
        feeds: 'Hourly Leaf Wetness Duration (LWD) + Micro-Canopy RH Sensors + In-Situ Traps',
        feedsHi: 'पत्ते गीले रहने के घंटे + खेत की सूक्ष्म उमस सेंसर + स्थानीय कीट जाल',
        targetAsset: 'Kharif Paddy Crop Canopy Vulnerable to BLB & BPH',
        targetAssetHi: 'झुलसा रोग व भूरा फुदका से नाज़ुक खरीफ धान की फसल'
      },
      outputs: {
        coreMetric: 'Pathogen Reproduction Rate R0 = 2.4 · Leaf Wetness: 16.4 Hours/Day · High Infection',
        coreMetricHi: 'बीमारी फैलने की दर R0 = 2.4 · पत्ते गीले 16.4 घंटे/दिन · सक्रिय संक्रमण',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · EPIDEMIC THREAT (R0 > 2.0)',
        riskTierLabelHi: 'उच्चतम जोखिम · महामारी खतरा (R0 > 2.0)',
        ensembleBand: 'Baseline R0: 0.65 (Latent) ➡️ Bioclimatic R0: 2.4 (Active Epidemic Spread)',
        ensembleBandHi: 'सामान्य R0: 0.65 (शांत) ➡️ आज का R0: 2.4 (तेज़ी से फैलता संक्रमण)',
        actionDirective: 'Scout lower plant canopy immediately; drain stagnant field water to reduce canopy humidity; spray recommended bio-fungicide.',
        actionDirectiveHi: 'पौधों के तने के पास तुरंत निरीक्षण करें; खेत से पानी निकालकर उमस कम करें; सुझाई गई जैविक फफूंदनाशी का छिड़काव करें।'
      }
    },
    cascadeImpact: 'Compounds the yield penalty in Module 13 and drives agricultural input supply demand in local agro-centers.',
    cascadeImpactHi: 'यह कीट प्रकोप मॉड्यूल 13 में उपज नुकसान को और गहरा करता है और बाज़ार में कीटनाशक की मांग बढ़ाता है।',
    actionableDecision: 'Scout lower plant canopy immediately; drain stagnant field water to reduce humidity; apply recommended biological bio-fungicide.',
    actionableDecisionHi: 'पौधों के तने के पास तुरंत निरीक्षण करें; खेत से पानी निकालकर उमस कम करें; सुझाई गई जैविक फफूंदनाशी का छिड़काव करें।',
    intended: ['Farmers monitoring pest early-warning signs', 'Plant Protection Officers & KVK scientists', 'Agri-chemical input retailers'],
    intendedHi: ['किसान: कीट का अग्रिम अलर्ट', 'पौध संरक्षण अधिकारी', 'कृषि दवा विक्रेता'],
    limitations: ['Predicts climate favorability for pathogen growth; actual infection requires physical presence of spores', 'Not a prescription to spray without ground scouting'],
    limitationsHi: ['मौसम अनुकूल होने की चेतावनी है; ज़मीन पर कीट का होना भी ज़रूरी है', 'खेत की जाँच किए बिना अंधाधुंध दवा न छिड़कें'],
    classes: [{ name: 'M14 Pest', use: 'Epidemiology solver', useHi: 'रोग फैलाव मॉडल' }, { name: 'M11 Soil', use: 'Humidity driver', useHi: 'नमी का आधार' }, { name: 'M13 Yield', use: 'Compounded penalty', useHi: 'अतिरिक्त नुकसान' }],
    variables: ['Leaf Wetness Hours', 'Canopy RH %', 'Pathogen R0 Score', 'Outbreak Alert Level']
  },
  {
    moduleNumber: 15, family: 'Mandi', familyHi: 'मंडी', scientificName: 'APMC Arrivals & Price Context',
    description: 'Bridges biophysical harvest shocks with APMC wholesale mandi arrivals and modal prices (₹/quintal). Employs historical price elasticity curves while respecting statutory MSP anchors.',
    descriptionHi: 'खेत के नुकसान को मंडी की दैनिक आवक और थोक भाव (₹/क्विंटल) से जोड़ता है। ऐतिहासिक मांग-आपूर्ति के आधार पर बताता है कि आवक गिरने से भाव कितना उछलेगा।',
    realLifeStory: 'AGRICULTURAL MARKETING BOARD ADVISORY · Lasalgaon & Nashik Onion Corridor\n\n• Synoptic Situation: Torrential rain submerges early Kharif onion nurseries and disrupts farm-gate harvesting across Nashik district.\n• Primary Threat: Daily wholesale arrivals at Lasalgaon APMC will plunge by -34% (from 18,500 q/day to 12,200 q/day), driving modal wholesale prices from ₹1,850 up to ₹2,820/quintal.\n• Operational Objective: Provide farmers and FPOs with price elasticity bands to avoid panic selling and capture peak returns.',
    realLifeStoryHi: 'कृषि विपणन बोर्ड बुलेटिन · लासलगांव व नाशिक प्याज गलियारा\n\n• ज़मीनी स्थिति: भारी बारिश से नाशिक ज़िले में खरीफ प्याज की नर्सरी और खुदाई वाले खेत जलमग्न हो गए हैं।\n• मुख्य जोखिम: लासलगांव मंडी में दैनिक थोक आवक में 34% की भारी गिरावट (18,500 से गिरकर 12,200 क्विंटल/दिन), जिससे थोक भाव ₹1,850 से उछलकर ₹2,820/क्विंटल तक पहुँचने का अनुमान।\n• परिचालन उद्देश्य: किसानों और व्यापारियों को भाव की सही रेंज देना ताकि वे हड़बड़ी में कम दाम पर माल न बेचें।',
    howToUse: 'Select the APMC Mandi and Commodity. Read projected daily arrivals (quintals/day) and expected wholesale modal price range (₹/quintal).',
    howToUseHi: 'अपनी मंडी और फसल चुनें। अनुमानित दैनिक आवक (क्विंटल) और संभावित थोक भाव की रेंज (₹/क्विंटल) देखें।',
    realLifeExample: 'Input: Lasalgaon APMC · Commodity: Onion · Supply Shock: -34% arrivals. Result: Daily arrivals drop from 18,500 q to 12,200 q; Wholesale Modal Price projected at ₹2,650–₹2,980/q.',
    realLifeExampleHi: 'इनपुट: लासलगांव मंडी · फसल: प्याज · आवक झटका: -34%। नतीजा: दैनिक आवक 18,500 से गिरकर 12,200 क्विंटल; थोक भाव ₹2,650 से ₹2,980/क्विंटल संभावित।',
    ioSpec: {
      inputs: {
        region: 'Lasalgaon APMC & Pimpalgaon Mandi (Nashik Corridor)',
        regionHi: 'लासलगांव एपीएमसी व पिंपलगांव मंडी (नाशिक गलियारा)',
        horizon: '+14-Day Post-Flood Wholesale Trade Window',
        horizonHi: '+14 दिन की थोक व्यापार समय सीमा',
        feeds: 'Agmarknet Daily Historical Arrivals + Mandi Price Elasticity (-0.68) + MSP Baseline',
        feedsHi: 'एगमार्कनेट दैनिक आवक रिकॉर्ड + मूल्य लोचदार मॉडल (-0.68) + न्यूनतम समर्थन मूल्य',
        targetAsset: 'Kharif Red Onion Daily Mandi Inflows (Normal Baseline: 18,500 q/day)',
        targetAssetHi: 'खरीफ लाल प्याज की दैनिक मंडी आवक (सामान्य: 18,500 क्विंटल/दिन)'
      },
      outputs: {
        coreMetric: 'Projected Daily Arrivals: 12,200 q/day (-34% Shock) · Modal Price: ₹2,820/quintal',
        coreMetricHi: 'अनुमानित दैनिक आवक: 12,200 क्विंटल/दिन (-34% झटका) · थोक भाव: ₹2,820/क्विंटल',
        riskTier: 'ELEVATED',
        riskTierLabel: 'ELEVATED · 34% SUPPLY CONTRACTION',
        riskTierLabelHi: 'मध्यम जोखिम · 34% आवक गिरावट',
        ensembleBand: 'P10 Price Floor: ₹2,400/q · Median Modal: ₹2,820/q · P90 Peak: ₹3,150/q',
        ensembleBandHi: 'P10 न्यूनतम: ₹2,400/क्विं · संभावित भाव: ₹2,820/क्विं · P90 अधिकतम: ₹3,150/क्विं',
        actionDirective: 'Farmers stagger produce sales over 10 days to maximize realization; procurement aggregators hedge wholesale contracts.',
        actionDirectiveHi: 'किसान एक साथ सारा माल बेचने के बजाय धीरे-धीरे बेचें ताकि ऊँचे भाव का लाभ मिले; थोक खरीदार अग्रिम अनुबंध करें।'
      }
    },
    cascadeImpact: 'Feeds into Regional Supply Shock (M17) to calculate state-level procurement shortfalls and retail consumer price index (CPI) impact.',
    cascadeImpactHi: 'यह भाव और आवक मॉड्यूल 17 (सप्लाई शॉक) में जाकर राज्य में अनाज खरीद और महंगाई दर का अनुमान लगाती है।',
    actionableDecision: 'Farmers stagger market sales to capture peak pricing without panic selling; institutional buyers hedge purchase contracts.',
    actionableDecisionHi: 'किसान एक साथ सारा माल बेचने के बजाय धीरे-धीरे बेचें ताकि ऊँचे भाव का लाभ मिले; थोक खरीदार अग्रिम अनुबंध करें।',
    intended: ['Mandi commission agents & licensed traders', 'FPO marketing and sales heads', 'State Agricultural Marketing Boards (OSAMB, MSAMB)'],
    intendedHi: ['मंडी व्यापारी और आढ़ती', 'एफपीओ विपणन प्रमुख', 'राज्य कृषि विपणन बोर्ड'],
    limitations: ['Weather is not the only driver of price; festival demand, export bans, and fuel costs also influence prices', 'Prices are projected ranges, not guarantees'],
    limitationsHi: ['भाव पर सिर्फ मौसम नहीं, सरकारी नीतियां, निर्यात और त्योहार भी असर डालते हैं', 'संख्याएं अनुमानित रेंज हैं, पक्की गारंटी नहीं'],
    classes: [{ name: 'M15 Mandi', use: 'Price elasticity', useHi: 'मूल्य लोचदार मॉडल' }, { name: 'M13 Yield', use: 'Supply input', useHi: 'उपज इनपुट' }, { name: 'M17 Shock', use: 'Deficit aggregate', useHi: 'कुल कमी' }],
    variables: ['Daily Arrivals (q)', 'Modal Spot Price (₹/q)', '5-Yr Historical Percentile', 'MSP Floor Anchor']
  },
  {
    moduleNumber: 16, family: 'Mandi', familyHi: 'मंडी', scientificName: 'Farm-to-Mandi Corridor',
    description: 'Maps regional agricultural transport logistics and highway freight corridors (NH-16, NH-44, state feeder roads). Detects inundated culverts, landslide choke points, and estimated transit delay hours.',
    descriptionHi: 'खेत से मंडी तक की सड़कों और राष्ट्रीय राजमार्गों का नक्शा बनाकर देखता है कि कहाँ पानी भरा है और कहाँ ट्रक रुक सकते हैं। सड़क बंद होने से सड़ने वाली सब्जियों का नुकसान बताता है।',
    realLifeStory: 'HIGHWAY LOGISTICS & SUPPLY CHAIN ADVISORY · Corridor NH-16 (Cuttack to Balasore)\n\n• Synoptic Situation: River Baitarani overtops low-lying highway culverts at Kilometer 142 near Bhadrak.\n• Primary Threat: 45cm of standing water on the national highway causes a 16-hour transit blockage. Perishable vegetables and milk trucks face an estimated 38% spoilage risk without active refrigeration.\n• Operational Objective: Provide real-time freight diversion routes via State Highway 51 to safeguard perishable farm cargo.',
    realLifeStoryHi: 'हाईवे लॉजिस्टिक्स बुलेटिन · राष्ट्रीय राजमार्ग NH-16 (कटक से बालेश्वर)\n\n• ज़मीनी स्थिति: वैतरणी नदी का पानी भद्रक के पास किमी 142 पर राष्ट्रीय राजमार्ग की पुलिया के ऊपर 45 सेमी तक बह रहा है।\n• मुख्य जोखिम: हाईवे पर 16 घंटे का जाम; ट्रकों में लदी सब्जियां और दूध 38% तक सड़ने की कगार पर हैं।\n• परिचालन उद्देश्य: मालवाहक गाड़ियों को तुरंत राज्य मार्ग SH-51 की तरफ मोड़कर सब्जियों और दूध को सुरक्षित बाज़ार पहुँचाना।',
    howToUse: 'Select Origin-Destination freight corridor. Identify red bottleneck choke points on the 3D road network and review recommended diversion routing.',
    howToUseHi: 'माल ढुलाई का मुख्य रास्ता चुनें। 3D नक्शे पर लाल रंग के रुकावट वाले बिंदु और सुझाया गया बाईपास रास्ता देखें।',
    realLifeExample: 'Input: Corridor NH-16 (Cuttack to Balasore) · Commodity: Perishables. Result: Kilometer 142 submerged under 45cm water; 16h delay; diversion via State Highway 51.',
    realLifeExampleHi: 'इनपुट: NH-16 (कटक से बालेश्वर) · माल: सब्जियां। नतीजा: किमी 142 पर 45 सेमी पानी; 16 घंटे की देरी; स्टेट हाईवे 51 से बाईपास का निर्देश।',
    ioSpec: {
      inputs: {
        region: 'National Highway 16 (Cuttack - Bhadrak - Balasore Corridor)',
        regionHi: 'राष्ट्रीय राजमार्ग 16 (कटक - भद्रक - बालेश्वर गलियारा)',
        horizon: '+48h Hydrological Culvert & Inundation Model',
        horizonHi: '+48 घंटे का सड़क जलभराव व पुलिया प्रवाह मॉडल',
        feeds: 'OpenStreetMap Road Network Vectors + Elevation Culvert Inundation Tensors',
        feedsHi: 'ओपनस्ट्रीटमैप सड़क नेटवर्क + उपग्रह ढलान जलभराव डेटा',
        targetAsset: 'Commercial Agri-Freight Fleet Carrying Perishable Vegetables & Milk',
        targetAssetHi: 'जल्दी खराब होने वाली सब्जियां और दूध ले जा रहे मालवाहक ट्रक'
      },
      outputs: {
        coreMetric: 'Corridor Choke at Km 142 (Water Depth 45cm) · Transit Delay: +16 Hours · 38% Spoilage Risk',
        coreMetricHi: 'किमी 142 पर रुकावट (पानी 45 सेमी) · 16 घंटे की देरी · 38% खराब होने का जोखिम',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · ROAD INUNDATION CHOKE',
        riskTierLabelHi: 'उच्चतम जोखिम · राष्ट्रीय राजमार्ग जलमग्न',
        ensembleBand: 'NH-16 Direct: +16h Delay ➡️ SH-51 Diversion: +2.5h Additional Transit',
        ensembleBandHi: 'NH-16 सीधा रास्ता: 16 घंटे देरी ➡️ SH-51 बाईपास: सिर्फ 2.5 घंटे अतिरिक्त',
        actionDirective: 'Reroute all commercial freight trucks via State Highway 51 immediately; prioritize refrigerated reefer trucks.',
        actionDirectiveHi: 'ट्रकों को तुरंत वैकल्पिक बाईपास रास्ते से भेजें; जल्दी खराब होने वाली सब्जियों के लिए कोल्ड स्टोरेज गाड़ियाँ लगाएं।'
      }
    },
    cascadeImpact: 'Transit delays bottleneck mandi arrivals in Module 15, causing artificial price spikes in destination cities even if fields are dry.',
    cascadeImpactHi: 'ट्रक रुकने से मॉड्यूल 15 में मंडी आवक अचानक गिर जाती है और शहरों में सब्जियों के दाम दोगुने हो जाते हैं।',
    actionableDecision: 'Reroute freight trucks via alternative state highway immediately; dispatch cold-chain trucks for sensitive perishable loads.',
    actionableDecisionHi: 'ट्रकों को तुरंत वैकल्पिक बाईपास रास्ते से भेजें; जल्दी खराब होने वाली सब्जियों के लिए कोल्ड स्टोरेज गाड़ियाँ लगाएं।',
    intended: ['Agricultural logistics dispatchers and fleet owners', 'FPO supply chain directors', 'National Highway Authority (NHAI) traffic control'],
    intendedHi: ['कृषि ट्रांसपोर्टर और फ्लीट मालिक', 'एफपीओ सप्लाई चेन प्रबंधक', 'यातायात पुलिस और हाईवे अथॉरिटी'],
    limitations: ['Feeder village dirt roads are modelled from elevation slope and drainage; real-time police blockades require local news feeds'],
    limitationsHi: ['गाँव की कच्ची सड़कों का अनुमान ढलान से लगाया जाता है', 'पुलिस द्वारा रास्ते बंद करने की ताज़ा खबर ज़रूरी है'],
    classes: [{ name: 'M16 Logistics', use: 'Corridor choke', useHi: 'सड़क रुकावट' }, { name: 'M15 Mandi', use: 'Arrival delay', useHi: 'मंडी देरी' }],
    variables: ['Transit Delay (Hours)', 'Inundated Road Length (km)', 'Perishable Spoilage Risk %', 'Bypass Route Efficiency']
  },
  {
    moduleNumber: 17, family: 'Mandi', familyHi: 'मंडी', scientificName: 'District Supply Deficit & Buffer',
    description: 'Rolls up localized crop loss across blocks into district-level and state-level production deficits (Lakh Metric Tonnes). Formulates buffer stock release protocols for state food and civil supplies corporations.',
    descriptionHi: 'गाँव और ब्लॉक के नुकसान को जोड़कर ज़िले और राज्य स्तर पर अनाज की कुल कमी (लाख मीट्रिक टन) निकालता है। सरकारी राशन और बफर गोदामों से अनाज जारी करने का आधार बनाता है।',
    realLifeStory: 'STATE CIVIL SUPPLIES PROCUREMENT BRIEFING · Coastal Odisha Basin\n\n• Synoptic Situation: Post-cyclonic assessments across 8 coastal districts indicate an aggregate rice production loss of -9.58 Lakh Metric Tonnes against the statutory target of 42.81 LMT (-22.4% net deficit).\n• Primary Threat: Puri (-1.65 LMT) and Jagatsinghpur (-1.72 LMT) face acute local public distribution shortfalls.\n• Operational Objective: Authorize inter-district grain re-allocation from surplus inland districts (Bargarh, Sambalpur) to stabilize fair-price rations.',
    realLifeStoryHi: 'खाद्य व नागरिक आपूर्ति मंत्रालय बुलेटिन · तटीय ओडिशा बेसिन\n\n• ज़मीनी स्थिति: 8 तटीय ज़िलों में चक्रवात से कुल 42.81 लाख मीट्रिक टन के लक्ष्य के मुकाबले 9.58 लाख टन धान की शुद्ध कमी (-22.4% घाटा)।\n• मुख्य जोखिम: पुरी (-1.65 लाख टन) और जगतसिंहपुर (-1.72 लाख टन) में राशन की दुकानों पर चावल की भारी किल्लत का खतरा।\n• परिचालन उद्देश्य: पश्चिमी अधिशेष ज़िलों (बरगढ़, संबलपुर) से अतिरिक्त अनाज तुरंत तटीय ज़िलों में भेजकर सार्वजनिक वितरण प्रणाली को संभालना।',
    howToUse: 'Select State Agro-Basin. Inspect Statewide Net Deficit (LMT) and Critical Hotspot Districts to review buffer release triggers.',
    howToUseHi: 'राज्य का कृषि बेसिन चुनें। कुल अनाज कमी (लाख टन) और सबसे अधिक प्रभावित ज़िले देखें तथा सरकारी बफर स्टॉक से अनाज रिलीज करने की सलाह पढ़ें।',
    realLifeExample: 'Input: Coastal Odisha Basin (8 Districts) · Target: 42.81 LMT. Result: Net State Deficit: -9.58 LMT (-22.4%); Puri and Jagatsinghpur tagged CRITICAL HOTSPOTS.',
    realLifeExampleHi: 'इनपुट: ओडिशा तटीय बेसिन (8 ज़िले) · लक्ष्य: 42.81 लाख टन। नतीजा: कुल कमी -9.58 लाख टन (22.4% घाटा); पुरी व जगतसिंहपुर गंभीर संकट क्षेत्र घोषित।',
    ioSpec: {
      inputs: {
        region: 'Statewide Coastal Odisha Agro-Basin (8 Target Districts)',
        regionHi: 'ओडिशा तटीय कृषि बेसिन (8 लक्षित तटीय ज़िले)',
        horizon: 'Post-Calamity Annual Agricultural Balance Sheet',
        horizonHi: 'आपदा उपरांत वार्षिक कृषि खाद्य संतुलन पत्र',
        feeds: 'Aggregated M13 Yield Loss Models + APMC Mandi Inflows + Civil Supplies Registers',
        feedsHi: 'मॉड्यूल 13 उपज नुकसान + मंडी आवक रिकॉर्ड + नागरिक आपूर्ति रजिस्टर',
        targetAsset: 'State Paddy Procurement Target of 42.81 Lakh Metric Tonnes (LMT)',
        targetAssetHi: 'राज्य धान खरीद लक्ष्य: 42.81 लाख मीट्रिक टन (LMT)'
      },
      outputs: {
        coreMetric: 'Net Statewide Deficit: -9.58 Lakh MT (-22.4% Shortfall from Baseline Procurement Target)',
        coreMetricHi: 'कुल राज्य स्तरीय कमी: -9.58 लाख मीट्रिक टन (खरीद लक्ष्य से -22.4% की शुद्ध कमी)',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · 9.58 LMT DEFICIT',
        riskTierLabelHi: 'उच्चतम जोखिम · 9.58 लाख टन अनाज कमी',
        ensembleBand: 'Baseline Target: 42.81 LMT ➡️ Projected Realization: 33.23 LMT · Shortfall: -9.58 LMT',
        ensembleBandHi: 'सामान्य लक्ष्य: 42.81 LMT ➡️ अनुमानित प्राप्ति: 33.23 LMT · कुल कमी: -9.58 LMT',
        actionDirective: 'Activate state strategic buffer reserves; divert surplus grain stocks from western inland districts to coastal public distribution centers.',
        actionDirectiveHi: 'नागरिक आपूर्ति निगम केंद्रीय बफर स्टॉक खोले; पश्चिमी ज़िलों (संबलपुर, बरगढ़) से अतिरिक्त अनाज तटीय ज़िलों में तुरंत भेजे।'
      }
    },
    cascadeImpact: 'Transmits the validated macro-deficit contract directly into Module 18 (Strategic Scenario Simulator).',
    cascadeImpactHi: 'यह अंतिम कमी का आंकड़ा सीधे मॉड्यूल 18 (रणनीतिक परिदृश्य सिमुलेटर) को जाता है ताकि सरकार बड़े नीतिगत फैसले ले सके।',
    actionableDecision: 'Civil Supplies Corporation activates buffer grain reserves; diverts surplus paddy from western inland districts to coastal public distribution centers.',
    actionableDecisionHi: 'नागरिक आपूर्ति निगम केंद्रीय बफर स्टॉक खोले; पश्चिमी ज़िलों (संबलपुर, बरगढ़) से अतिरिक्त अनाज तटीय ज़िलों में तुरंत भेजे।',
    intended: ['State Food Supplies & Consumer Welfare Departments', 'Food Corporation of India (FCI) regional managers', 'Policy makers planning public distribution (PDS) releases'],
    intendedHi: ['खाद्य एवं नागरिक आपूर्ति विभाग', 'भारतीय खाद्य निगम (FCI)', 'राशन और नीति निर्माता'],
    limitations: ['Official government godown ledgers are private; calculations use census baseline production and biophysical models'],
    limitationsHi: ['सरकारी गोदामों के वास्तविक स्टॉक आंकड़े गोपनीय होते हैं, गणना कृषि जनगणना पर आधारित है'],
    classes: [{ name: 'M17 Shock', use: 'Deficit rollup', useHi: 'कुल कमी का हिसाब' }, { name: 'M18 What-If', use: 'Scenario handoff', useHi: 'सिमुलेटर को हैंडऑफ' }],
    variables: ['State Baseline Production (LMT)', 'Exposed Volume (LMT)', 'Net Deficit (LMT)', 'Critical Hotspot Count']
  },
  {
    moduleNumber: 18, family: 'Mandi', familyHi: 'मंडी', scientificName: 'Counterfactual What-If',
    description: 'The Grand Multi-System Scenario Engine. Empowers decision-makers to adjust counterfactual levers (Rainfall ±40%, Temperature +3°C, Supply Shock %) and witness the simultaneous domino cascade across all 17 sub-models in real time.',
    descriptionHi: 'सर्वोच्च 4D सिमुलेशन इंजन — नीति निर्माताओं की "टाइम मशीन"। खुद स्लाइडर हिलाएं: "अगर 200 मिमी ज्यादा बारिश हो, तो कीड़े कितने बढ़ेंगे, फसल कितनी गिरेगी और मंडी में प्याज-धान का भाव कितना उछलेगा?" पूरा प्रभाव एक साथ देखें।',
    realLifeStory: 'EXECUTIVE STATE CABINET SIMULATION · Multi-Hazard Stress Test\n\n• Synoptic Situation: Emergency disaster tabletop simulation tests a compound crisis: What if cyclonic rainfall is 25% higher than forecast, nocturnal temperatures rise +2°C, and highway transport is severed for 72 hours?\n• Primary Threat: Simultaneous pest outbreak (R0 = 2.8), statewide rice deficit widening to -12.4 LMT, and wholesale grain prices spiking by +28%.\n• Operational Objective: Empower cabinet ministers and relief commissioners to stress-test policy decisions before calamity strikes.',
    realLifeStoryHi: 'कैबिनेट व आपदा राहत आपात सिमुलेशन · संयुक्त संकट तनाव-परीक्षण\n\n• ज़मीनी स्थिति: आपात बैठक में एक साथ तीन संकटों का सिमुलेशन: अगर बारिश अनुमान से 25% ज्यादा हो, रात में तापमान +2°C बढ़ जाए और सड़कें 72 घंटे बंद रहें, तो क्या होगा?\n• मुख्य जोखिम: एक साथ कीट महामारी (R0 = 2.8), अनाज की कमी 9.58 से बढ़कर 12.4 लाख टन होना और थोक बाजार में चावल का भाव +28% उछलना।\n• परिचालन उद्देश्य: मंत्रियों और राहत आयुक्तों को आपदा आने से पहले ही सही नीतिगत और वित्तीय फैसले लेने में सक्षम बनाना।',
    howToUse: 'Adjust scenario levers (Rainfall Delta, Temperature Shift, Supply Disruption). Run the simulation to view interconnected impacts across Weather, Yield, Pests, and Mandi Prices.',
    howToUseHi: 'स्लाइडर से अपनी मर्जी का परिदृश्य बनाएं (बारिश +20%, तापमान +2°C)। "सिमुलेशन चलाएं" दबाकर मौसम से लेकर मंडी तक सभी 17 इंजनों का एक साथ बदलता असर देखें।',
    realLifeExample: 'Scenario: Rain +25% Delta, Night Temp +2°C, Road Closure 72 Hours. Result: Pest Outbreak jumps to Epidemic Level; Yield Deficit deepens to -12.4 LMT; Wholesale Rice Price surges +28%.',
    realLifeExampleHi: 'परिदृश्य: बारिश +25%, रात का तापमान +2°C, सड़कें 72 घंटे बंद। नतीजा: कीट प्रकोप महामारी स्तर पर; अनाज कमी बढ़कर 12.4 लाख टन; थोक भाव +28% उछला।',
    ioSpec: {
      inputs: {
        region: 'Integrated All-India Agro-Economic Digital Twin Sandbox',
        regionHi: 'एकीकृत अखिल भारतीय कृषि-आर्थिक डिजिटल ट्विन सैंडबॉक्स',
        horizon: 'Real-Time Dynamic Policy Scenario Levers (Rainfall ±40% · Temp +3°C)',
        horizonHi: 'नीतिगत तनाव-परीक्षण स्लाइडर्स (बारिश ±40% · तापमान +3°C)',
        feeds: 'Complete 17-Module Atmospheric-to-Market Domino Interconnect',
        feedsHi: 'संपूर्ण 17 इंजनों का परस्पर जुड़ा 4D भौतिकी व मंडी नेटवर्क',
        targetAsset: 'State Food Security, Fiscal Calamity Reserves & Consumer Price Index',
        targetAssetHi: 'राज्य खाद्य सुरक्षा, आपदा राहत बजट व उपभोक्ता मूल्य सूचकांक'
      },
      outputs: {
        coreMetric: 'Compound Crisis Scenario (+25% Rain · +2°C Temp · 72h Choke) ➡️ Deficit -12.4 LMT · Price +28%',
        coreMetricHi: 'संयुक्त संकट परिदृश्य (+25% बारिश · +2°C गर्मी · 72 घंटे जाम) ➡️ कमी 12.4 लाख टन · भाव +28%',
        riskTier: 'CRITICAL',
        riskTierLabel: 'CRITICAL · STRESS TEST COMPOUND CRISIS',
        riskTierLabelHi: 'उच्चतम जोखिम · संयुक्त संकट तनाव-परीक्षण',
        ensembleBand: 'Pest Outbreak: R0 = 2.8 · Yield Deficit: -12.4 LMT · Wholesale Mandi Inflation: +28%',
        ensembleBandHi: 'कीट प्रकोप: R0 = 2.8 · कुल अनाज कमी: -12.4 LMT · थोक मंडी महंगाई: +28%',
        actionDirective: 'Pre-authorize emergency calamity budget allocation; waive inter-state transit permits for essential relief grain.',
        actionDirectiveHi: 'आपदा आने से पहले ही राहत पैकेज मंजूर करें; जरूरी खाद्य सामग्री के ट्रकों के लिए टोल टैक्स माफ करें; किसानों के लिए विशेष राहत नीति लागू करें।'
      }
    },
    cascadeImpact: 'Unifies all 17 modules into an end-to-end mathematical and visual digital twin of India\'s agricultural economy.',
    cascadeImpactHi: 'यह इंजन पिछले सभी 17 इंजनों को जोड़कर भारत की कृषि और मौसम अर्थव्यवस्था का एक सम्पूर्ण 4D डिजिटल ट्विन बनाता है।',
    actionableDecision: 'Pre-authorize disaster relief funding; waive inter-state transit permits for relief grain; announce MSP procurement relaxation before calamity strikes.',
    actionableDecisionHi: 'आपदा आने से पहले ही राहत पैकेज मंजूर करें; जरूरी खाद्य सामग्री के ट्रकों के लिए टोल टैक्स माफ करें; किसानों के लिए विशेष राहत नीति लागू करें।',
    intended: ['Chief Ministers & State Disaster Relief Commissioners', 'Agri-business CXOs and strategic risk directors', 'Academic and policy economic simulation researchers'],
    intendedHi: ['मुख्यमंत्री और आपदा राहत आयुक्त', 'कृषि-व्यवसाय और एग्रीटेक कंपनियाँ', 'नीति आयोग और आर्थिक शोधकर्ता'],
    limitations: ['A what-if scenario is an exploratory stress test, not a definitive operational forecast', 'Real-world human policy interventions can mitigate modeled deficits'],
    limitationsHi: ['यह तनाव-परीक्षण (stress test) है, अंतिम भविष्यवाणी नहीं', 'समय पर सही कदम उठाने से नुकसान को काफी हद तक रोका जा सकता है'],
    classes: [{ name: 'M18 Simulator', use: 'Master sandbox', useHi: 'सर्वोच्च सिमुलेटर' }, { name: 'M01–M17', use: 'Full cascade', useHi: 'संपूर्ण 17 इंजन' }],
    variables: ['Scenario Rainfall Δ', 'Temperature Delta', 'Projected Yield Deficit', 'Commodity Price Shock %']
  }
];

const EVENTS = [
  { label: 'Bay depression — coastal Odisha', labelHi: 'खाड़ी डिप्रेशन — तटीय ओडिशा', query: 'Odisha coastal basin, next 3 days, Kharif paddy — what is the exact flood and yield risk?' },
  { label: 'Terminal heatwave — Punjab wheat', labelHi: 'टर्मिनल हीटवेव — पंजाब गेहूं', query: 'Punjab wheat belt at flowering stage, +5°C temperature anomaly — how will grain weight be affected?' },
  { label: 'Heavy rain — Nashik onion mandi', labelHi: 'भारी बारिश — नाशिक प्याज मंडी', query: 'Torrential rain in Nashik onion growing corridor — how much will APMC arrivals drop and prices rise?' }
];

export function getAtmosNimCard(moduleNumber: number): AtmosNimCard {
  const base = CARDS.find((item) => item.moduleNumber === moduleNumber) || CARDS[0];
  return { ...base, sampleEvents: EVENTS };
}

export function allAtmosNimCards(): AtmosNimCard[] {
  return CARDS.map((item) => ({ ...item, sampleEvents: EVENTS }));
}

export function farmerTitle(moduleNumber: number, locale: 'en' | 'hi') {
  const g = ENGINE_FIELD_GUIDE.find((item) => item.moduleNumber === moduleNumber);
  if (!g) return `M${moduleNumber}`;
  return locale === 'hi' ? g.titleHi : g.title;
}

export { SHARED_LICENSE_EN, SHARED_LICENSE_HI };
