import { ENGINE_FIELD_GUIDE } from './engineFieldGuide';

export interface NimSection {
  id: string;
  title: string;
  titleHi: string;
}

export const NIM_TOC: NimSection[] = [
  { id: 'story', title: 'Real-Life Scenario & Story', titleHi: 'वास्तविक जीवन की कहानी' },
  { id: 'usage', title: 'How to Use & Real-Life Inputs', titleHi: 'उपयोग और इनपुट उदाहरण' },
  { id: 'cascade', title: '4D Cascade & Domino Impact', titleHi: '4D प्रभाव: आसमान से मंडी तक' },
  { id: 'decision', title: 'Actionable Advisory & Decisions', titleHi: 'सीधे फैसले और कदम' },
  { id: 'description', title: 'Description', titleHi: 'वैज्ञानिक विवरण' },
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
  { id: 'help', title: 'Getting started', titleHi: 'शुरू कैसे करें' }
];

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
    realLifeStory: 'A deep depression forms over the south-central Bay of Bengal 420 km off the Odisha coast. A coastal farmer in Puri with 8 acres of standing paddy needs to know if this is just a passing afternoon drizzle or a massive cyclonic weather system that will bring gale-force winds and storm surges within 72 hours.',
    realLifeStoryHi: 'बंगाल की खाड़ी में ओडिशा तट से 420 किमी दूर एक गहरा कम दबाव का क्षेत्र (डिप्रेशन) बना है। पुरी के किसान के पास 8 एकड़ पका हुआ धान खड़ा है। उसे यह जानना है कि यह आम दोपहर की बौछार है या 72 घंटे में आने वाला समुद्री चक्रवाती तूफान जो पूरी फसल बिछा देगा।',
    howToUse: 'Step 1: Select Lead Horizon (+24h, +48h, +72h, +120h). Step 2: Spin the 3D Earth Globe with your mouse to observe atmospheric circulation bands. Step 3: Inspect isobar pressure contours and wind vorticity vectors over the Bay of Bengal.',
    howToUseHi: 'कदम 1: समय सीमा चुनें (+24h, +48h, +72h, +120h)। कदम 2: माउस से 3D ग्लोब को घुमाकर हवा और बादलों के घेरे देखें। कदम 3: बंगाल की खाड़ी के ऊपर हवा की गति और दबाव की समदाब रेखाओं का विश्लेषण करें।',
    realLifeExample: 'Input: Coastal Odisha Basin, Lead Horizon: +72h, Variable: 850 hPa Wind & Precipitation. Telemetry Result: Pressure 992 hPa, sustained winds 65 km/h, 140mm accumulated rainfall vector moving toward Paradip-Puri coastal corridor.',
    realLifeExampleHi: 'इनपुट: तटीय ओडिशा बेसिन, समय: +72 घंटे, चर: 850 hPa हवा और वर्षा। नतीजा: दबाव 992 hPa, हवा 65 किमी/घंटा, 140 मिमी बारिश का तूफान पारादीप-पुरी तट की ओर बढ़ता हुआ।',
    cascadeImpact: 'Feeds raw atmospheric pressure and wind vectors into Module 02 (Terrain Grounding) and Module 03 (Extreme Anomaly) to determine whether this system breaches 30-year climatological normals.',
    cascadeImpactHi: 'यह डेटा मॉड्यूल 02 (धरातल) और मॉड्यूल 03 (असामान्य मौसम) में जाता है ताकि पता चले कि यह तूफान 30 साल के सामान्य रिकॉर्ड को तोड़ रहा है या नहीं।',
    actionableDecision: 'Farmers advance paddy harvesting by 48 hours to prevent lodging; port authorities hoist Cautionary Signal #3; district disaster cells pre-position NDRF teams.',
    actionableDecisionHi: 'किसान कटाई 48 घंटे पहले शुरू करें ताकि खड़ी फसल ज़मीन पर न गिरे; बंदरगाह पर 3 नंबर का चेतावनी सिग्नल लगाएं; प्रशासन राहत दल तैनात करे।',
    intended: ['Farmers & FPOs tracking multi-day cyclonic approach', 'State Disaster Management Authorities (OSDMA, SDMA)', 'Input foundation for downstream anomaly and track engines'],
    intendedHi: ['किसान और एफपीओ: तूफान की अग्रिम निगरानी', 'राज्य आपदा प्रबंधन प्राधिकरण (OSDMA)', 'आगे के सभी 17 इंजनों का मुख्य वायुमंडलीय आधार'],
    limitations: ['Not an official replacement for statutory IMD cyclone bulletins', 'Grid resolution is regional synoptic scale, not farm-level sensors', 'Requires live coupled NWP telemetry for real-time calibration'],
    limitationsHi: ['मौसम विभाग (IMD) के आधिकारिक बुलेटिन का विकल्प नहीं', 'क्षेत्रीय पैमाना है, किसी एक खेत का सेंसर नहीं', 'सटीक गणना के लिए लाइव न्यूमेरिकल वेदर डेटा चाहिए'],
    classes: [{ name: 'M01 Sky Watch', use: '4D field ingest', useHi: '4D वायुमंडलीय इनपुट' }, { name: 'M03 EFI', use: 'Extreme anomaly scoring', useHi: 'चरम मौसम स्कोर' }, { name: 'M05 Track', use: 'GNN storm trajectory', useHi: 'तूफान का रास्ता' }],
    variables: ['Rain', 'Wind', 'Pressure', 'Cloud Vorticity']
  },
  {
    moduleNumber: 2, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Volumetric Stratified Atmosphere',
    description: 'Deconstructs the atmosphere into 5 distinct vertical altitude strata (Surface, 850 hPa, 700 hPa, 500 hPa, 200 hPa). Visualizes thermal inversions, moisture trapping, and vertical wind shear across regional terrain.',
    descriptionHi: 'वायुमंडल को 5 अलग-अलग ऊँचाई की परतों (सतह, 850 hPa, 700 hPa, 500 hPa, 200 hPa) में विभाजित करता है। ज़मीन के पास रुकी नमी और ऊपर की तेज़ हवा का अंतर स्पष्ट दिखाता है।',
    realLifeStory: 'In the Western Ghats foothills and coastal deltas, a farmer feels a gentle 10 km/h breeze at ground level and prepares to spray expensive pesticide. But 1.5 km above the canopy, a 60 km/h wind shear jet is active, creating atmospheric downdrafts that will blow the chemical away and trigger sudden squalls.',
    realLifeStoryHi: 'पश्चिमी घाट और तटीय इलाकों में ज़मीन पर हल्की 10 किमी/घंटा हवा महसूस होती है, और किसान महंगी दवा छिड़कने की सोचता है। पर ज़मीन से 1.5 किमी ऊपर 60 किमी/घंटा की हवा चल रही है, जो दवा को उड़ा देगी और अचानक तेज बौछार गिराएगी।',
    howToUse: 'Step 1: Select vertical altitude layer (Surface to 500 hPa). Step 2: Observe vertical vector arrows. Upward arrows indicate convective rain clouds; horizontal shear indicates cross-winds.',
    howToUseHi: 'कदम 1: ऊँचाई की परत चुनें (सतह से 500 hPa)। कदम 2: ऊपर उठते हुए तीर देखें जो गरज-चमक वाले बादलों को दर्शाते हैं।',
    realLifeExample: 'Input: Western Ghats Orographic Zone, Altitude: 850 hPa vs Surface. Telemetry Result: Strong 45-knot westerly moisture transport hitting the coastal ridge, forcing rapid cloud uplift and cloudburst risk.',
    realLifeExampleHi: 'इनपुट: पश्चिमी घाट ढलान, ऊँचाई: 850 hPa। नतीजा: समुद्र से आ रही 45-नॉट तेज़ नम हवा पहाड़ों से टकराकर ऊपर उठ रही है, जिससे अचानक भारी बारिश का खतरा है।',
    cascadeImpact: 'Provides vertical velocity and boundary humidity into Module 07 (Downscaling) and Module 11 (Soil Hydrology).',
    cascadeImpactHi: 'यह नमी और हवा की गति मॉड्यूल 07 (गाँव का नक्शा) और मॉड्यूल 11 (मिट्टी की नमी) को सौंपता है।',
    actionableDecision: 'Postpone aerial or foliar spraying; secure greenhouse poly-sheets against downdraft wind shear.',
    actionableDecisionHi: 'दवा का छिड़काव तुरंत टालें; ग्रीनहाउस और पॉलीहाउस की चादरों को ऊपरी हवा के झोंकों से बचाने के लिए बाँधें।',
    intended: ['Agricultural extension officers advising on spray timing', 'Aviation and drone spraying operators', 'Meteorological boundary-layer researchers'],
    intendedHi: ['कृषि विस्तार अधिकारी: छिड़काव का सही समय', 'ड्रोन स्प्रे ऑपरेटर', 'मौसम विज्ञानी'],
    limitations: ['Stratified model requires interpolated radio-sonde or NWP vertical levels', 'Not a single-point flight navigation system'],
    limitationsHi: ['रेडियो-सोंडे या मॉडल डेटा पर आधारित है', 'हवाई उड़ान का नेविगेशन सिस्टम नहीं है'],
    classes: [{ name: 'M01', use: 'Parent synoptic field', useHi: 'मुख्य मौसम क्षेत्र' }, { name: 'M02', use: 'Vertical slicing', useHi: 'ऊर्ध्वाधर परतें' }, { name: 'M07', use: 'Micro downscaling', useHi: 'गाँव का नक्शा' }],
    variables: ['Vertical Wind Shear', 'Boundary Layer Humidity', 'Thermal Inversion']
  },
  {
    moduleNumber: 3, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Climatological Extreme Anomaly (EFI)',
    description: 'Computes the Extreme Forecast Index (EFI) by comparing real-time atmospheric tensors against a 30-year model climatology (M-Climate). Flags unprecedented weather anomalies (EFI > +0.80).',
    descriptionHi: 'पिछले 30 वर्षों के मौसम इतिहास से आज के मौसम की तुलना करके चरम मौसमी असामान्यता (EFI) निकालता है। यदि EFI +0.80 से ऊपर है, तो यह ऐतिहासिक रूप से असामान्य खतरा है।',
    realLifeStory: 'During late March in the Punjab wheat belt, daily maximum temperatures reach 38.5°C. Wheat farmers are worried: Is this just typical spring warming, or a devastating terminal heatwave (like 2022) that will shrivel wheat grains before harvest?',
    realLifeStoryHi: 'मार्च के अंत में पंजाब में तापमान अचानक 38.5°C पहुँच जाता है। किसान असमंजस में हैं: क्या यह आम गर्मी है या 2022 जैसा विनाशकारी हीटवेव जो बालियों में दाना भरने से पहले ही गेहूं को सूखा देगा?',
    howToUse: 'Step 1: Choose anomaly parameter (Precipitation EFI or Temperature EFI). Step 2: Look for red/orange anomaly contours. EFI > 0.85 indicates an extreme event occurring less than once every 20 years.',
    howToUseHi: 'कदम 1: खतरा चुनें (तापमान EFI या वर्षा EFI)। कदम 2: नक्शे पर लाल रंग देखें। 0.85 से ऊपर का स्कोर बताता है कि ऐसा मौसम 20 साल में एक बार आता है।',
    realLifeExample: 'Input: Ludhiana District, Punjab, Parameter: Maximum Temperature EFI. Telemetry Result: EFI = +0.89 with Shift of Tails (SOT) > 0. Thermal deviation is +6.2°C above 30-year normal.',
    realLifeExampleHi: 'इनपुट: लुधियाना, पंजाब। चर: तापमान EFI। नतीजा: EFI = +0.89, सामान्य से +6.2°C अधिक गर्मी, अत्यधिक नाज़ुक स्थिति।',
    cascadeImpact: 'When EFI breaches threshold, triggers Module 10 (Phenology Growth Stage Fragility) and Module 13 (Yield Risk Engine).',
    cascadeImpactHi: 'असामान्य हीटवेव का अलर्ट तुरंत मॉड्यूल 10 (फसल की अवस्था) और मॉड्यूल 13 (उपज नुकसान) को सक्रिय करता है।',
    actionableDecision: 'Apply light evening sprinkler irrigation to cool the crop micro-canopy by 3°C; avoid daytime chemical spraying.',
    actionableDecisionHi: 'शाम को हल्का फव्वारा पानी दें ताकि फसल के पास का तापमान 3°C कम हो सके; दिन में कोई रासायनिक छिड़काव न करें।',
    intended: ['Agro-meteorologists tracking unprecedented weather', 'Crop insurance actuaries calculating risk triggers', 'Government relief monitoring desks'],
    intendedHi: ['मौसम वैज्ञानिक: रिकॉर्ड तोड़ मौसम की पहचान', 'फसल बीमा कंपनियाँ', 'राहत आयुक्त कार्यालय'],
    limitations: ['High anomaly score means extreme weather, not guaranteed crop mortality', 'Thresholds depend on regional reanalysis baseline'],
    limitationsHi: ['असामान्य मौसम का मतलब फसल नुकसान की संभावना है, पक्का नुकसान नहीं', 'तुलना 30 साल के बेसलाइन पर निर्भर है'],
    classes: [{ name: 'M03 EFI', use: 'Anomaly scoring', useHi: 'असामान्यता स्कोर' }, { name: 'M10 Stage', use: 'Phenology impact', useHi: 'फसल अवस्था असर' }, { name: 'M13 Yield', use: 'Yield penalty', useHi: 'उपज गिरावट' }],
    variables: ['Precipitation EFI', 'Heatwave Anomaly', 'Shift of Tails (SOT)']
  },
  {
    moduleNumber: 4, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Dynamic Hazard Footprint',
    description: 'Delineates the continuous multi-tiered spatial hazard footprint (Severe Core, Warning Periphery, Outer Advisory Zone) across districts, capturing rainfall accumulations and gale wind buffers.',
    descriptionHi: 'भारी बारिश और तेज़ हवाओं के खतरे का सटीक भौगोलिक घेरा (कोर ज़ोन, चेतावनी ज़ोन, बाहरी ज़ोन) खींचता है, ताकि पता चले कौन सा ब्लॉक खतरे में है।',
    realLifeStory: 'A cyclonic storm crosses near Dhamra Port. District collectors and FPO managers in Kendrapara and Bhadrak need an exact geographical boundary showing which 42 gram panchayats fall under the severe 150mm+ rainfall zone, and which blocks are relatively safe.',
    realLifeStoryHi: 'तूफान धामरा पोर्ट के पास टकराता है। भद्रक और केन्द्रापारा के डीएम और एफपीओ को बिल्कुल साफ घेरा चाहिए कि कौन से 42 गाँव 150 मिमी बारिश के गहरे खतरे में हैं और कौन से सुरक्षित हैं।',
    howToUse: 'Step 1: Move Lead Horizon slider from +24h to +72h. Step 2: Observe the expanding colored footprint envelope. Red indicates core impact (>120mm rain), amber indicates secondary buffer.',
    howToUseHi: 'कदम 1: समय स्लाइडर को +24 से +72 घंटे पर ले जाएं। कदम 2: रंगीन घेरा देखें — लाल रंग भारी बारिश (120 मिमी+) और पीला रंग बाहरी असर दिखाता है।',
    realLifeExample: 'Input: Bhadrak & Kendrapara Districts, Lead: +48h. Result: 2,140 sq km enclosed in Core Footprint; 48 collection centers and 6 APMC mandis sit inside the danger polygon.',
    realLifeExampleHi: 'इनपुट: भद्रक और केन्द्रापारा, समय: +48 घंटे। नतीजा: 2,140 वर्ग किमी क्षेत्र कोर खतरे में; 6 प्रमुख मंडियां और 48 खरीद केंद्र घेरे में।',
    cascadeImpact: 'Transmits spatial hazard polygons directly to Module 09 (Cadastral Crop Exposure) to count exact crop hectares.',
    cascadeImpactHi: 'यह घेरा सीधे मॉड्यूल 09 (फसल का फैलाव) को जाता है ताकि पता चले कि इस घेरे में कितने हेक्टेयर धान या दालें हैं।',
    actionableDecision: 'Move bagged grain stocks from low-lying mandi yards in Bhadrak to elevated godowns before flood envelope expands.',
    actionableDecisionHi: 'निचले मंडी यार्ड में रखे अनाज के बोरों को तुरंत ऊँचे पक्के गोदामों में पहुँचाएं; नहरों के फाटक खोलें।',
    intended: ['District Collectors & Block Development Officers', 'FPO logistics managers and warehouse operators', 'State emergency response teams'],
    intendedHi: ['जिलाधिकारी और बीडीओ', 'एफपीओ गोदाम संचालक', 'आपदा राहत दल'],
    limitations: ['Footprint shifts dynamically with each new forecast cycle', 'Local river flooding requires hydrological coupling'],
    limitationsHi: ['हर 6 घंटे में नए मौसम डेटा के साथ घेरा बदल सकता है', 'नदी किनारे बाढ़ के लिए स्थानीय जल निकासी का ध्यान रखें'],
    classes: [{ name: 'M04 Footprint', use: 'Spatial boundary', useHi: 'भौगोलिक घेरा' }, { name: 'M09 Exposure', use: 'Crop intersection', useHi: 'फसल से मिलान' }, { name: 'M16 Corridor', use: 'Road flooding', useHi: 'सड़क रुकावट' }],
    variables: ['Rainfall Envelope', 'Gale Wind Radius', 'Inundation Boundary']
  },
  {
    moduleNumber: 5, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Spherical GNN Cyclone Trajectory',
    description: 'Simulates cyclone center trajectories up to 10 days in advance using Graph Neural Networks (GNN) on spherical earth grids. Projects landfall coordinates with historical displacement error margins.',
    descriptionHi: 'गोलाकार पृथ्वी ग्रिड पर ग्राफ न्यूरल नेटवर्क (GNN) द्वारा 10 दिन आगे तक चक्रवात के मार्ग का अनुमान लगाता है। संभावित लैंडफॉल का समय और स्थान बताता है।',
    realLifeStory: 'A cyclone is brewing 600 km southeast of Visakhapatnam. Will it recurve toward West Bengal or make direct landfall on the Krishna-Godavari agricultural delta? A 60 km shift in track determines whether Andhra paddy or Odisha paddy bears the brunt.',
    realLifeStoryHi: 'विशाखापट्टनम से 600 किमी दूर चक्रवात घूम रहा है। क्या यह बंगाल की ओर मुड़ेगा या आंध्र-ओडिशा के धान के कटोरे पर सीधा टकराएगा? सिर्फ 60 किमी का बदलाव तय करेगा कि किस राज्य के किसान की फसल बचेगी।',
    howToUse: 'Step 1: Review the 50 ensemble member track spaghetti lines. Step 2: Identify the consensus center line and the 70% confidence cone. Step 3: Check estimated landfall window.',
    howToUseHi: 'कदम 1: नक्शे पर 50 अलग-अलग मॉडल के रास्ते देखें। कदम 2: मुख्य औसत रास्ता और 70% संभावना वाला शंकु देखें। कदम 3: लैंडफॉल का समय जांचें।',
    realLifeExample: 'Input: Bay Cyclone System 03B, Horizon: 120 Hours. Result: Landfall projected between Puri and Chandbali on Saturday at 16:30 IST; forward translation speed 18 km/h.',
    realLifeExampleHi: 'इनपुट: चक्रवात सिस्टम 03B, समय: 120 घंटे। नतीजा: शनिवार शाम 4:30 बजे पुरी और चांदबाली के बीच लैंडफॉल की 74% संभावना; गति 18 किमी/घंटा।',
    cascadeImpact: 'Steers Module 06 (Probability Field) and Module 16 (Highway Transport Corridors) along the projected storm path.',
    cascadeImpactHi: 'यह रास्ता मॉड्यूल 06 (संभावना) और मॉड्यूल 16 (हाईवे और ट्रक सप्लाई) को तूफान के रास्ते की अग्रिम चेतावनी देता है।',
    actionableDecision: 'Stop coastal agricultural transport; instruct fishing trawlers to dock 48 hours before storm eye approaches.',
    actionableDecisionHi: 'तटीय ट्रकों की आवाजाही रोकें; सभी मछुआरों को 48 घंटे पहले किनारे पर लौटने का सख्त निर्देश दें।',
    intended: ['Coastal state disaster commissioners', 'Agricultural supply chain freight operators', 'Port and fisheries authorities'],
    intendedHi: ['राहत आयुक्त और तटीय प्रशासन', 'सप्लाई चेन और माल ढुलाई कंपनियाँ', 'बंदरगाह प्राधिकरण'],
    limitations: ['Ensemble tracks diverge after 72 hours; never rely on a single deterministic line', 'Intensity changes can occur rapidly'],
    limitationsHi: ['72 घंटे बाद रास्ते में बदलाव संभव है, एक रेखा पर भरोसा न करें', 'तूफान की ताकत अचानक बढ़ सकती है'],
    classes: [{ name: 'M05 Track', use: 'Path prediction', useHi: 'मार्ग अनुमान' }, { name: 'M06 Chance', use: 'Rain cone', useHi: 'बारिश शंकु' }, { name: 'M16 Logistics', use: 'Transport choke', useHi: 'सड़क रुकावट' }],
    variables: ['Storm Eye Coords', 'Forward Speed', 'Landfall Window', 'Central Pressure']
  },
  {
    moduleNumber: 6, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Ensemble Rain / Hazard Chance',
    description: 'Synthesizes multi-model meteorological ensembles (ECMWF EPS, GEFS) into probabilistic risk bands (P10, P50, P90). Eliminates single-number false certainty and presents true risk percentiles.',
    descriptionHi: 'दर्जनों मौसम मॉडल्स का निचोड़ निकालकर सादी संभावना (P10 कम, P50 सामान्य, P90 अधिकतम) बताता है। एक झूठी संख्या की जगह सच बताता है कि भारी बारिश के कितने प्रतिशत आसार हैं।',
    realLifeStory: 'A farmer in Coastal Andhra has 12 acres of golden paddy ready for harvest. Renting a combine harvester costs ₹30,000 cash. If heavy rain is only a 20% possibility, they can wait; if it is 85% certain, they must harvest immediately even if wet.',
    realLifeStoryHi: 'तटीय आंध्र के किसान के पास 12 एकड़ पका धान खड़ा है। हार्वेस्टर मशीन बुलाने में ₹30,000 नकद खर्च होता है। अगर बारिश की संभावना सिर्फ 20% है तो रुक सकते हैं; पर अगर 85% पक्की है तो तुरंत कटाई करानी होगी।',
    howToUse: 'Step 1: Select Rainfall Threshold (e.g. >50mm or >100mm). Step 2: Read P10 (optimistic dry case), P50 (most likely median), and P90 (extreme deluge case).',
    howToUseHi: 'कदम 1: बारिश की सीमा चुनें (50 मिमी+ या 100 मिमी+)। कदम 2: P10 (कम से कम), P50 (सबसे संभावित), और P90 (अधिकतम बारिश) का प्रतिशत देखें।',
    realLifeExample: 'Input: East Godavari District, Window: Next 48h, Threshold: >75mm. Result: 82% of ensemble members agree on rainfall >75mm. P50 = 88mm, P90 = 142mm.',
    realLifeExampleHi: 'इनपुट: पूर्वी गोदावरी, समय: 48 घंटे, सीमा: 75 मिमी+। नतीजा: 82% मॉडल्स भारी बारिश पर एकमत। संभावित बारिश 88 मिमी, अधिकतम 142 मिमी।',
    cascadeImpact: 'Feeds probabilistic rainfall numbers into Module 07 (Village Downscaling) and Module 11 (Soil Waterlogging).',
    cascadeImpactHi: 'यह संभावना सीधे मॉड्यूल 07 (गाँव नक्शा) और मॉड्यूल 11 (जलभराव) में जाकर ज़मीनी पानी का हिसाब लगाती है।',
    actionableDecision: 'Harvest standing paddy immediately using available machinery; clear drainage channels to avoid field ponding.',
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
    description: 'Downscales coarse 25km/12km synoptic grids to a hyper-local 5km x 5km terrain-aware grid using statistical and elevation-informed diffusion models. Resolves micro-climate valleys, ridges, and rain-shadows.',
    descriptionHi: 'बड़े 25 किमी के उपग्रह नक्शे को कृत्रिम बुद्धिमत्ता (AI) से 5 किमी के गाँव-स्तर पर बदलता है। पहाड़ी, ढलान और निचले खेतों का सटीक फर्क सामने लाता है।',
    realLifeStory: 'A regional weather map says "Odisha will receive 80mm rain". But inside Kendrapara, one panchayat sits in an upland ridge that drains in 2 hours, while an adjacent low-lying river valley village gets completely submerged under 1.5 meters of water.',
    realLifeStoryHi: 'टीवी पर आता है कि "ओडिशा में 80 मिमी बारिश होगी"। पर केन्द्रापारा में एक गाँव ऊँची ज़मीन पर है जहाँ 2 घंटे में पानी बह जाता है, जबकि बगल का निचला गाँव 1.5 मीटर पानी में डूब जाता है। गाँव वाला नक्शा यही फर्क दिखाता है।',
    howToUse: 'Step 1: Enter your Block or Gram Panchayat name. Step 2: Compare coarse satellite mesh with downscaled high-resolution terrain. Step 3: Spot low-elevation ponding valleys.',
    howToUseHi: 'कदम 1: अपना ब्लॉक या गाँव चुनें। कदम 2: बड़े नक्शे से 5 किमी के बारीक नक्शे पर ज़ूम करें। कदम 3: देखें कि पानी किस ढलान पर रुकेगा।',
    realLifeExample: 'Input: Mahakalapada Block, Kendrapara. Downscale Resolution: 5 km. Result: Coastal lowland grid gets 138mm with drainage failure; upland ridge grid gets 52mm with rapid runoff.',
    realLifeExampleHi: 'इनपुट: महाकालपड़ा ब्लॉक, केन्द्रापारा। नतीजा: निचले तटीय इलाके में 138 मिमी बारिश और जलभराव; ऊँचे पठार पर सिर्फ 52 मिमी और पानी तुरंत बह गया।',
    cascadeImpact: 'Provides field-scale water depth to Module 09 (Crop Exposure) and Module 11 (Soil Saturation Dynamics).',
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
    description: 'Tracks forecast cycle drift (Δ Intensity) between consecutive NWP model runs (00Z vs 06Z vs 12Z). Alerts operators when a storm suddenly intensifies between model updates.',
    descriptionHi: 'पिछले और आज के मौसम मॉडल की सीधी तुलना करता है। अगर तूफान पिछले 6 घंटे में अचानक ज़्यादा ताकतवर हो गया है, तो तत्काल "तीव्रता वृद्धि" का अलर्ट देता है।',
    realLifeStory: 'Yesterday morning, weather models predicted a moderate 50mm shower. By tonight\'s 18:00 model cycle, the storm has intensified into a severe cyclonic storm with 160mm rain. Operators who rely on yesterday\'s morning newspaper will be caught completely unprepared.',
    realLifeStoryHi: 'कल सुबह के मॉडल ने 50 मिमी की सामान्य बारिश बताई थी। आज शाम के रन में तूफान अचानक भयंकर होकर 160 मिमी बारिश का बन गया। जो कल की पुरानी खबर देख रहे हैं, वे अचानक तबाही में फंस जाएंगे। यह इंजन वही बदलाव पकड़ता है।',
    howToUse: 'Step 1: Compare Run T-0 (Current) with Run T-6h (Previous). Step 2: Check the Δ Drift metric. A positive drift > +25% indicates Rapid Intensification (RI).',
    howToUseHi: 'कदम 1: आज का रन और 6 घंटे पुराना रन चुनें। कदम 2: बदलाव (Δ Drift) देखें। अगर +25% से ज़्यादा बढ़ा है तो मतलब तूफान अचानक खतरनाक हो रहा है।',
    realLifeExample: 'Input: Paradip Coastal Corridor, Current Run vs 12h-ago Run. Result: Forecast rainfall jumped from 68mm to 142mm (Δ +108%); wind speed increased by +22 km/h.',
    realLifeExampleHi: 'इनपुट: पारादीप तट। नतीजा: बारिश का अनुमान 68 मिमी से बढ़कर 142 मिमी (+108% उछाल); हवा की गति 22 किमी/घंटा और तेज़ हुई।',
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
    realLifeStory: 'A heavy downpour inundates 3 districts in Odisha. The State Agriculture Minister asks: "How much crop is lost?" The chief scientist responds: "3.4 lakh hectares of Paddy are EXPOSED inside the water zone. But loss depends on crop stage and drainage!" This module provides that vital exposed inventory.',
    realLifeStoryHi: 'ओडिशा के 3 ज़िलों में भारी बारिश हुई। कृषि मंत्री पूछते हैं: "कितना नुकसान हुआ?" वैज्ञानिक कहते हैं: "3.4 लाख हेक्टेयर धान पानी के घेरे में है। पर नुकसान कितना होगा, यह फसल की उम्र और पानी निकलने पर निर्भर है।" यह इंजन वही सही हेक्टेयर बताता है।',
    howToUse: 'Step 1: Select target District and Crop Category (Paddy, Groundnut, Sugarcane). Step 2: Review total Sown Area vs Exposed Area in hectares and percentage.',
    howToUseHi: 'कदम 1: जिला और फसल चुनें (धान, मूंगफली, गन्ना)। कदम 2: कुल बोया गया क्षेत्र और खतरे में आया क्षेत्र (हेक्टेयर और %) देखें।',
    realLifeExample: 'Input: Puri & Kendrapara Districts, Crop: Kharif Paddy. Result: Total Sown Area: 2,21,800 ha; Exposed in Hazard Envelope: 1,48,200 ha (66.8% of district sown area at risk).',
    realLifeExampleHi: 'इनपुट: पुरी और केन्द्रापारा, फसल: धान। नतीजा: कुल बोया रकबा 2,21,800 हेक्टेयर; पानी के खतरे में 1,48,200 हेक्टेयर (66.8% फसल प्रभावित)।',
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
    realLifeStory: 'Two farmers face the exact same 100mm storm. Farmer A sowed late; his paddy is in vegetative tillering stage — the rain actually boosts his crop! Farmer B sowed early; his crop is in flowering (anthesis) stage — the rain washes off pollen, causing 40% empty grain husks.',
    realLifeStoryHi: 'दो किसानों के खेत में एक जैसी 100 मिमी बारिश हुई। किसान A ने देर से बोया था, फसल हरी पत्ती वाली अवस्था में है — बारिश से उसकी फसल और अच्छी हो गई! किसान B की फसल में फूल आ चुके थे — बारिश ने परागकण धो दिए, 40% बालियां खाली (पोचा) रह गईं।',
    howToUse: 'Step 1: Select Sowing Date or current Phenology Stage. Step 2: Read the Fragility Coefficient (0.1 = tough, 0.9 = extremely fragile).',
    howToUseHi: 'कदम 1: बुवाई की तारीख या फसल की वर्तमान अवस्था चुनें। कदम 2: संवेदनशीलता गुणांक देखें (0.1 मतलब मजबूत, 0.9 मतलब बहुत नाज़ुक)।',
    realLifeExample: 'Input: Kharif Paddy, Sown July 10, Current Date Oct 4. Stage: Flowering / Anthesis. Fragility Index: 0.88 (Critical Sensitivity to rain wash & wind lodging).',
    realLifeExampleHi: 'इनपुट: धान, बुवाई 10 जुलाई। वर्तमान अवस्था: फूल आना (Anthesis)। संवेदनशीलता: 0.88 (अत्यधिक नाज़ुक, तेज बारिश से दाना नहीं भरेगा)।',
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
    realLifeStory: 'In the black cotton soils of Vidarbha, rain stops after 24 hours. But because clay soil has poor drainage, water stays pooled around soybean roots for 4 days. The roots suffocate from lack of oxygen (hypoxia), leading to yellowing and root rot.',
    realLifeStoryHi: 'विदर्भ की काली मिट्टी में बारिश 24 घंटे में रुक गई। पर भारी मिट्टी में पानी रिसता नहीं है, इसलिए सोयाबीन की जड़ों में 4 दिन तक पानी भरा रहा। जड़ों को ऑक्सीजन नहीं मिली और वे सड़ने लगीं, जिससे पौधा पीला पड़कर सूख गया।',
    howToUse: 'Step 1: Select Soil Series (Black Cotton, Delta Alluvial, Sandy Loam). Step 2: Read Root Zone Moisture % and Water Table Depth. Saturated >95% for >48h indicates root hypoxia.',
    howToUseHi: 'कदम 1: मिट्टी का प्रकार चुनें (काली मिट्टी, दोमट, बलुई)। कदम 2: जड़ क्षेत्र में नमी % और पानी खड़ा रहने का समय देखें। 48 घंटे से ज़्यादा जलभराव मतलब जड़ों का दम घुटना।',
    realLifeExample: 'Input: Coastal Alluvial Clay, Accumulated Rain: 120mm. Result: 0-30cm Saturation: 98%; Inundation ponding depth: 14 cm; drainage time required: 68 hours.',
    realLifeExampleHi: 'इनपुट: तटीय दोमट-चिकनी मिट्टी, बारिश: 120 मिमी। नतीजा: जड़ क्षेत्र में 98% पानी भरा; 14 सेमी पानी खड़ा; सूखने में 68 घंटे लगेंगे।',
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
    realLifeStory: 'In Marathwada, monsoon onset is delayed by 22 days. A farmer has cotton seed ready, but cotton needs a long rainy season. Sowing cotton now means high risk of failure. This engine suggests: "Switch to 85-day short-duration Soybean or Pearl Millet (Bajra) to salvage season income."',
    realLifeStoryHi: 'मराठवाड़ा में मानसून 22 दिन देर से पहुँचा। किसान कपास बोने की तैयारी में था, पर कपास को लंबा मौसम चाहिए। अब कपास बोया तो घाटा पक्का है। यह इंजन समझाता है: "कपास छोड़ो, 85 दिन वाली सोयाबीन या बाजरा लगाओ ताकि लागत निकल आए और मुनाफा बचे।"',
    howToUse: 'Step 1: Enter Current Crop and Rainfall Scenario (e.g. -25% rain deficit). Step 2: Review recommended alternative crops, expected ROI, and scientific justifications.',
    howToUseHi: 'कदम 1: अपनी फसल और बारिश की स्थिति डालें (-25% सूखा)। कदम 2: सुझाई गई वैकल्पिक फसलें, अनुमानित लागत-मुनाफा और वैज्ञानिक कारण पढ़ें।',
    realLifeExample: 'Input: Cotton in delayed monsoon (-30% onset moisture). Advice: Switch to Pigeonpea + Bajra intercrop (1:2 ratio); reduces water requirement by 42% and protects soil nitrogen.',
    realLifeExampleHi: 'इनपुट: देरी से आया मानसून, कपास। सलाह: अरहर + बाजरा की मिश्रित खेती करें; पानी की ज़रूरत 42% कम होगी और ज़मीन की उर्वरता बढ़ेगी।',
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
    realLifeStory: 'A state food corporation needs to know whether the cyclone will create a rice shortage. Rather than relying on guesswork, this engine calculates: "Normal yield is 42 quintals/ha. Under this flood + flowering scenario, median yield (P50) will drop to 31 q/ha, and worst-case (P10) will drop to 24 q/ha."',
    realLifeStoryHi: 'सरकार और बीमा कंपनियों को जानना है कि इस बाढ़ से धान का उत्पादन कितना गिरेगा। यह इंजन बताता है: "सामान्य उपज 42 क्विंटल/हेक्टेयर होती है। इस बाढ़ और फूल अवस्था के कारण सबसे संभावित उपज 31 क्विंटल/हेक्टेयर और सबसे खराब स्थिति में 24 क्विंटल/हेक्टेयर रह जाएगी।"',
    howToUse: 'Step 1: Select Agro-Basin and Target Crop. Step 2: Review the harvest yield distribution curve. Compare baseline normal vs expected post-event yield.',
    howToUseHi: 'कदम 1: इलाका और फसल चुनें। कदम 2: उपज वितरण वक्र देखें। सामान्य वर्ष और इस वर्ष की अनुमानित उपज की तुलना करें।',
    realLifeExample: 'Input: Coastal Odisha Kharif Paddy, Baseline Normal: 4.2 t/ha. Result: P10 = 2.4 t/ha (-42.8%), P50 = 3.1 t/ha (-26.2%), P90 = 3.8 t/ha (-9.5%). Projected Loss: -1.1 t/ha expected.',
    realLifeExampleHi: 'इनपुट: तटीय ओडिशा खरीफ धान। सामान्य उपज: 4.2 टन/हेक्टेयर। नतीजा: P10 = 2.4 टन (-43%), P50 = 3.1 टन (-26%), P90 = 3.8 टन (-10%)। संभावित औसत नुकसान: 1.1 टन/हेक्टेयर।',
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
    realLifeStory: 'Continuous cloudy weather and warm nights (26°C) keep paddy leaves wet for 16 consecutive hours in Sambalpur. Brown Plant Hopper (BPH) and Bacterial Leaf Blight thrive in this environment. By the time yellow patches appear, 30% of the crop is already lost. This module alerts farmers 5 days before spores germinate.',
    realLifeStoryHi: 'संबलपुर में 3 दिन से बादल छाए हैं और रात में उमस 90% से ऊपर है। धान के पत्ते 16 घंटे लगातार गीले रहते हैं। यह मौसम भूरा फुदका (BPH) और बैक्टीरियल ब्लाइट (झुलसा) के लिए स्वर्ग जैसा है। जब तक खेत में पीलापन दिखेगा, 30% फसल खत्म हो चुकी होगी। यह इंजन 5 दिन पहले ही चेतावनी दे देता है।',
    howToUse: 'Step 1: Inspect District Biohazard Pedestals on the 3D map. Step 2: Read Leaf Wetness Duration (hours) and Pathogen Reproduction Index (R0). R0 > 1.5 indicates epidemic spread.',
    howToUseHi: 'कदम 1: 3D नक्शे पर ज़िलेवार खतरे के खंभे देखें। कदम 2: पत्ते गीले रहने के घंटे और बीमारी फैलने की गति (R0) जांचें। 1.5 से ऊपर मतलब महामारी का खतरा।',
    realLifeExample: 'Input: Sambalpur Canal Command, Paddy Anthesis Stage. Result: Leaf Wetness: 16.4 hours/day; Night Temp: 25.8°C; R0 = 2.4. CRITICAL Outbreak Risk for Bacterial Leaf Blight.',
    realLifeExampleHi: 'इनपुट: संबलपुर, धान फूल अवस्था। नतीजा: पत्ते गीले रहने का समय 16.4 घंटे/दिन; रात का तापमान 25.8°C; R0 = 2.4। झुलसा रोग का अत्यधिक खतरा (CRITICAL)।',
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
    realLifeStory: 'Flash floods submerge onion fields across Nashik district. Mandi traders in Lasalgaon and Azadpur (Delhi) need to anticipate: "Arrivals will drop by 35% over the next fortnight. Will wholesale prices jump from ₹1,800 to ₹3,200/quintal, or will consumer resistance cap the price at ₹2,600?"',
    realLifeStoryHi: 'नाशिक में भारी बारिश से प्याज की नर्सरी और खुदाई वाले खेत डूब गए। लासलगांव और दिल्ली की आजादपुर मंडी के व्यापारियों को हिसाब लगाना है: "अगले 15 दिन में प्याज की आवक 35% गिरेगी। क्या थोक भाव ₹1,800 से उछलकर ₹3,000 पार करेगा?" यह इंजन वही भाव रेंज दिखाता है।',
    howToUse: 'Step 1: Select APMC Mandi (e.g. Lasalgaon, Puri Coastal, Cuttack) and Commodity. Step 2: Read Projected Arrivals (quintals/day) and Expected Modal Price Band (₹/q).',
    howToUseHi: 'कदम 1: अपनी एपीएमसी मंडी और फसल चुनें (जैसे लासलगांव प्याज, कटक धान)। कदम 2: अनुमानित दैनिक आवक और संभावित भाव की रेंज (कम-से-ज्यादा ₹/क्विंटल) देखें।',
    realLifeExample: 'Input: Lasalgaon APMC, Commodity: Onion, Supply Shock: -32% arrivals. Result: Daily arrivals drop from 18,500 q to 12,200 q; Wholesale Modal Price projected at ₹2,650–₹2,980/q (vs MSP baseline).',
    realLifeExampleHi: 'इनपुट: लासलगांव मंडी, प्याज। आवक में 32% गिरावट। नतीजा: दैनिक आवक 18,500 से गिरकर 12,200 क्विंटल; थोक भाव ₹2,650 से ₹2,980/क्विंटल के बीच रहने का अनुमान।',
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
    realLifeStory: 'Tomato growers in Kolar load 50 trucks destined for Hyderabad. Heavy rain causes flash flooding over a highway culvert on NH-44, shutting the route for 36 hours. Tomatoes are highly perishable; if trucks are stuck without cooling, 40% of the produce rots before reaching market.',
    realLifeStoryHi: 'कोलार के टमाटर किसानों ने हैदराबाद के लिए 50 ट्रक लोड किए। NH-44 पर पुलिया के ऊपर बाढ़ का पानी बहने से रास्ता 36 घंटे बंद हो गया। टमाटर जल्दी सड़ने वाली फसल है; अगर ट्रक सड़क पर खड़े रहे तो आधी फसल सड़ जाएगी। यह इंजन बाईपास रास्ता बताता है।',
    howToUse: 'Step 1: Select Origin-Destination Freight Corridor. Step 2: Spot highlighted red choke points on the 3D road network. Step 3: Check recommended bypass routing.',
    howToUseHi: 'कदम 1: माल ढुलाई का मुख्य रास्ता चुनें। कदम 2: 3D नक्शे पर लाल रंग के रुकावट वाले बिंदु देखें। कदम 3: सुझाया गया वैकल्पिक रास्ता (बाईपास) देखें।',
    realLifeExample: 'Input: Corridor NH-16 (Cuttack to Balasore), Commodity: Perishable Vegetables. Result: Kilometer 142 submerged under 45cm water; 16 hours transit delay; recommended diversion via State Highway 51.',
    realLifeExampleHi: 'इनपुट: NH-16 (कटक से बालेश्वर), सब्जी ढुलाई। नतीजा: किमी 142 पर 45 सेमी पानी भरा; 16 घंटे की देरी; स्टेट हाईवे 51 से गाड़ियाँ निकालने का सुझाव।',
    cascadeImpact: 'Transit delays bottleneck मंडी arrivals in Module 15, causing artificial price spikes in destination cities even if fields are dry.',
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
    realLifeStory: 'Across 8 coastal districts of Odisha, Cyclone Dana damages standing Kharif paddy. The State Food Supplies Department must immediately calculate: "We target 42.8 Lakh MT of procurement. How much is the net state deficit? Which specific districts (Puri, Kendrapara, Jagatsinghpur) face critical supply shocks?"',
    realLifeStoryHi: 'ओडिशा के 8 तटीय ज़िलों में चक्रवात से धान को नुकसान हुआ। खाद्य आपूर्ति विभाग को तुरंत तय करना है: "हमें 42.8 लाख टन धान खरीदना था। अब राज्य में कितनी कमी होगी? कौन से ज़िले (पुरी, केन्द्रापारा, जगतसिंहपुर) सबसे गहरे संकट में हैं?" यह इंजन वही फैसला कराता है।',
    howToUse: 'Step 1: Select State Agro-Basin. Step 2: Read Statewide Net Deficit (LMT) and Critical Hotspot Districts. Step 3: Inspect Recommended Operational Buffer Protocol.',
    howToUseHi: 'कदम 1: राज्य का कृषि बेसिन चुनें। कदम 2: कुल अनाज कमी (लाख टन) और सबसे अधिक प्रभावित ज़िले देखें। कदम 3: सरकारी बफर स्टॉक से अनाज रिलीज करने की सलाह पढ़ें।',
    realLifeExample: 'Input: Statewide Coastal Odisha Basin (8 Districts), Target: 42.81 LMT. Result: Net State Deficit: -9.58 LMT (-22.4% shortfall); Puri (-1.65 LMT) and Jagatsinghpur (-1.72 LMT) tagged CRITICAL HOTSPOTS.',
    realLifeExampleHi: 'इनपुट: ओडिशा तटीय बेसिन (8 ज़िले), लक्ष्य: 42.81 लाख टन। नतीजा: कुल कमी -9.58 लाख टन (22.4% घाटा); पुरी (-1.65 लाख टन) और जगतसिंहपुर (-1.72 लाख टन) गंभीर संकट क्षेत्र घोषित।',
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
    realLifeStory: 'State Cabinet Ministers and Disaster Management Chiefs convene for an emergency tabletop simulation: "If this cyclone hits with 25% higher rainfall than current forecast, and if transport is blocked for 4 days, what is the exact economic cost to the state? Where will food shortages appear first?" This simulator answers in seconds.',
    realLifeStoryHi: 'कैबिनेट मंत्री और आपदा प्रबंधन प्रमुख एक साथ बैठकर आपात बैठक करते हैं: "अगर इस तूफान में 25% ज्यादा बारिश हो गई और सड़कें 4 दिन बंद रहीं, तो राज्य का कितना आर्थिक नुकसान होगा? सबसे पहले किस शहर में अनाज और सब्जियों की किल्लत होगी?" यह इंजन एक क्लिक में पूरा भविष्य दिखाता है।',
    howToUse: 'Step 1: Adjust What-If Parameter Sliders (Rainfall Delta, Temperature Shift, Supply Disruption). Step 2: Click "Run Simulation". Step 3: Observe interconnected outputs across Weather, Yield, Pests, and Mandi Prices.',
    howToUseHi: 'कदम 1: स्लाइडर से अपनी मर्जी का परिदृश्य बनाएं (बारिश +20%, तापमान +2°C)। कदम 2: "सिमुलेशन चलाएं" बटन दबाएं। कदम 3: मौसम से लेकर मंडी तक सभी 17 इंजनों का एक साथ बदलता असर देखें।',
    realLifeExample: 'Scenario: Rain +25% Delta, Night Temp +2°C, Road Closure 72 Hours. Result: Pest Outbreak jumps to Epidemic Level; Yield Deficit deepens from -9.58 LMT to -12.4 LMT; Wholesale Rice Price surges +28%.',
    realLifeExampleHi: 'परिदृश्य: बारिश +25%, रात का तापमान +2°C, सड़कें 72 घंटे बंद। नतीजा: कीट प्रकोप महामारी स्तर पर पहुंचा; राज्य में अनाज कमी 9.58 से बढ़कर 12.4 लाख टन हुई; चावल का थोक भाव +28% उछला।',
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
