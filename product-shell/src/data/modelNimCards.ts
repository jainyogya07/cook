import { ENGINE_FIELD_GUIDE } from './engineFieldGuide';

export interface NimSection {
  id: string;
  title: string;
  titleHi: string;
}

export const NIM_TOC: NimSection[] = [
  { id: 'description', title: 'Description', titleHi: 'विवरण' },
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
    description: 'Ingests layered weather fields (near-ground to upper air) so the rest of the cascade has a shared sky picture. This is the first hop: atmosphere, not mandi price.',
    descriptionHi: 'ज़मीन के पास से ऊपरी हवा तक मौसम की परतें एक साथ लाता है। यह पहली कड़ी है — आसमान, मंडी भाव नहीं।',
    intended: ['Farmer / FPO: “what is the sky doing over my coast in 72 hours?”', 'IMD-style briefing: pressure, wind, rain layers on one card', 'Input to later engines (anomaly, track, chance)'],
    intendedHi: ['किसान / FPO: अगले 72 घंटे आसमान कैसा है', 'ब्रिफिंग: हवा, बारिश, दबाव एक कार्ड पर', 'आगे के इंजनों का इनपुट'],
    limitations: ['Not a replacement for official IMD cyclone bulletins', 'Grid is regional, not a single farm sensor', 'Numbers in the demo studio are ensemble-style illustrations unless a live NWP feed is attached'],
    limitationsHi: ['IMD बुलेटिन की जगह नहीं', 'एक खेत का सेंसर नहीं', 'डेमो संख्याएँ परिदृश्य हो सकती हैं जब तक लाइव NWP न जुड़ा हो'],
    classes: [{ name: 'M01 Sky Watch', use: '4D field ingest', useHi: 'आसमान की परतें' }, { name: 'M03 EFI', use: 'How unusual', useHi: 'कितना असामान्य' }, { name: 'M06 Chance', use: 'Ensemble rain chance', useHi: 'बारिश की संभावना' }],
    variables: ['Rain', 'Wind', 'Pressure']
  },
  {
    moduleNumber: 2, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Volumetric Stratified Atmosphere',
    description: 'Shows air in layers — near the crop canopy versus higher wind — so a farmer can see whether rain is shallow or a deep storm column.',
    descriptionHi: 'हवा की परतें दिखाता है — फसल के पास बनाम ऊपर की तेज़ हवा — बारिश पतली है या गहरा तूफान।',
    intended: ['Explain why wind feels different at ground vs aloft', 'Teaching / demo of atmospheric structure', 'Support for downscaling (M07)'],
    intendedHi: ['ज़मीन और ऊपर की हवा अलग क्यों', 'समझाने वाला दृश्य', 'गाँव नक्शे (M07) के लिए आधार'],
    limitations: ['Visualisation-first; not a flight-level aviation forecast', 'Does not by itself estimate crop loss'],
    limitationsHi: ['दिखाने वाला इंजन, हवाई उड़ान का पूर्वानुमान नहीं', 'अकेले फसल नुकसान नहीं बताता'],
    classes: [{ name: 'M01', use: 'Parent sky fields', useHi: 'आसमान का इनपुट' }, { name: 'M02', use: 'Layer view', useHi: 'परत दृश्य' }],
    variables: ['Wind', 'Humidity', 'Height']
  },
  {
    moduleNumber: 3, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Climatological Extreme Anomaly (EFI)',
    description: 'Asks: is this weather strange compared with a long climate record? High EFI means “this is not a normal Tuesday,” not “the crop is already lost.”',
    descriptionHi: 'पूछता है: क्या यह मौसम आम साल से अलग है? ऊँचा EFI मतलब “आज सामान्य मंगलवार नहीं” — फसल पहले से बर्बाद नहीं।',
    intended: ['Detect extremes vs climatology', 'Trigger later yield and mandi engines only when weather is unusual', 'Jury talking point: weather is the first signal, not the last'],
    intendedHi: ['असामान्य मौसम पकड़ना', 'जब मौसम अजीब हो तभी उपज/मंडी इंजन', 'मौसम पहली घंटी है, आखिरी फैसला नहीं'],
    limitations: ['Thresholds are scenario settings, not a legal disaster declaration', 'Climatology window must be stated in a production deployment'],
    limitationsHi: ['थ्रेशोल्ड परिदृश्य हैं, सरकारी आपदा घोषणा नहीं', 'जलवायु अवधि प्रोडक्शन में साफ़ लिखनी चाहिए'],
    classes: [{ name: 'M03 EFI', use: 'Anomaly score', useHi: 'असामान्यता' }, { name: 'M13 Yield', use: 'Only after exposure + stage', useHi: 'उपज बाद में' }],
    variables: ['Rain anomaly', 'Heat anomaly', 'Wind anomaly']
  },
  {
    moduleNumber: 4, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Dynamic Hazard Footprint',
    description: 'Draws the danger zone: core / nearby / outer halo. Villages inside the footprint are exposed. Exposed is still not lost.',
    descriptionHi: 'खतरे का घेरा खींचता है। घेरे के गाँव प्रभावित हो सकते हैं — नुकसान पक्का नहीं।',
    intended: ['District admin: which blocks sit under the storm', 'FPO: which collection points may go quiet', 'Handoff to cadastral crop overlay (M09)'],
    intendedHi: ['जिला: कौन से ब्लॉक घेरे में', 'FPO: कौन सी मंडी चुप पड़ सकती है', 'फसल नक्शे (M09) को सौंपना'],
    limitations: ['Footprint moves with each forecast hour', 'Coastline and river flooding need local drainage data'],
    limitationsHi: ['घेरा हर पूर्वानुमान घंटे बदलता है', 'नदी-नाला पानी के लिए स्थानीय निकासी चाहिए'],
    classes: [{ name: 'M04 Footprint', use: 'Spatial envelope', useHi: 'क्षेत्र' }, { name: 'M09 Exposure', use: 'Crops inside envelope', useHi: 'घेरे की फसल' }],
    variables: ['Rain', 'Wind', 'Storm core']
  },
  {
    moduleNumber: 5, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Spherical GNN Storm Track',
    description: 'Estimates where a Bay storm is likely to walk over the next 3–10 days, with displacement error spoken honestly.',
    descriptionHi: 'खाड़ी का तूफान अगले 3–10 दिन कहाँ जा सकता है — गलती की गुंजाइश के साथ।',
    intended: ['Coastal preparedness lead time', 'Port / fishing advisory context', 'Input to rain-chance (M06)'],
    intendedHi: ['तटीय तैयारी', 'मछली/बंदरगाह संदर्भ', 'बारिश संभावना का इनपुट'],
    limitations: ['Tracks fork; always show more than one member', 'Not a substitute for IMD cone of uncertainty'],
    limitationsHi: ['रास्ते कई हो सकते हैं', 'IMD शंकु की जगह नहीं'],
    classes: [{ name: 'M05 Track', use: 'Path', useHi: 'रास्ता' }, { name: 'M06', use: 'Chance along path', useHi: 'रास्ते पर संभावना' }],
    variables: ['Track', 'Forward speed', 'Landfall window']
  },
  {
    moduleNumber: 6, family: 'Atmosphere', familyHi: 'आसमान', scientificName: 'Ensemble Rain / Hazard Chance',
    description: 'Turns many forecast members into a plain chance: how many agree on heavy rain. Prefer P10–P90, never one fake-precise millimetre.',
    descriptionHi: 'कई अनुमानों से सादी संभावना: कितने भारी बारिश पर सहमत। P10–P90 रखें, एक नकली मिलीमीटर नहीं।',
    intended: ['Farmer: should I harvest / cover / wait', 'Relief cell: how confident is the rain call', 'Feeds village map (M07)'],
    intendedHi: ['किसान: काटें, ढकें या रुकें', 'राहत: बारिश कितनी पक्की', 'गाँव नक्शा (M07)'],
    limitations: ['Agreement is not ground truth', 'Local cloudbursts can still miss a 5–12 km grid'],
    limitationsHi: ['सहमति ज़मीन की सच्चाई नहीं', 'बहुत स्थानीय तूफान छूट सकते हैं'],
    classes: [{ name: 'M06 Chance', use: 'Ensemble CDF', useHi: 'संभावना' }, { name: 'M07 Map', use: 'Local field', useHi: 'स्थानीय नक्शा' }],
    variables: ['Rain chance', 'Ensemble members', 'Lead time']
  },
  {
    moduleNumber: 7, family: 'Village', familyHi: 'गाँव', scientificName: '12 km → 5 km Village Map',
    description: 'Brings a coarse weather map down to a village-scale picture so ponding and wind lanes are visible enough to act.',
    descriptionHi: 'बड़े मौसम नक्शे को गाँव जितना पास लाता है — पानी कहाँ रुकेगा, हवा कहाँ तेज़।',
    intended: ['Gram panchayat / FPO route planning', 'Which low fields may pond', 'Input to soil (M11) and pest (M14)'],
    intendedHi: ['पंचायत / FPO रास्ता', 'निचले खेत', 'मिट्टी और रोग का इनपुट'],
    limitations: ['5 km is still not a 10-metre drain map', 'Orography helps; cadastral drainage is separate'],
    limitationsHi: ['5 किमी नाला-नक्शा नहीं', 'पहाड़ी मदद करती है, निकासी अलग डेटा है'],
    classes: [{ name: 'M07 Downscale', use: '5 km field', useHi: '5 किमी नक्शा' }, { name: 'M11 Soil', use: 'Water sitting', useHi: 'खड़ा पानी' }],
    variables: ['Rain', 'Wind', 'Local map']
  },
  {
    moduleNumber: 8, family: 'Village', familyHi: 'गाँव', scientificName: 'Run-to-Run Intensification Drift',
    description: 'Compares this forecast run with the last one. If the storm jumped in strength, say so — that is the honest “then vs now.”',
    descriptionHi: 'यह पूर्वानुमान पिछले वाले से कितना तेज़ हुआ। अगर तूफान अचानक बढ़ा, साफ़ बोलो।',
    intended: ['Detect rapid intensification', 'Stop showing stale yesterday maps', 'Briefings that admit the model moved'],
    intendedHi: ['अचानक तेज़ी', 'पुराना नक्शा मत दिखाओ', 'मॉडल बदला तो कहो'],
    limitations: ['Needs at least two cycles', 'Drift is diagnostic, not a yield number'],
    limitationsHi: ['कम से कम दो चक्र चाहिए', 'यह उपज की संख्या नहीं'],
    classes: [{ name: 'M08 Compare', use: 'Δ intensity', useHi: 'बदलाव' }],
    variables: ['This run', 'Last run', 'Δ intensity']
  },
  {
    moduleNumber: 9, family: 'Field', familyHi: 'खेत', scientificName: 'Cadastral Crop Exposure',
    description: 'Overlays the weather footprint on crop maps. Hectares in harm’s way. This is EXPOSURE, not LOSS — the strongest scientific claim in ATMOS 4D.',
    descriptionHi: 'मौसम के घेरे पर फसल नक्शा। कितने हेक्टेयर रास्ते में हैं। यह प्रभावित क्षेत्र है, नुकसान नहीं — ATMOS की सबसे ज़रूरी बात।',
    intended: ['FPO: how much standing crop sits under the rain', 'Insurer: exposure inventory', 'Must be paired with stage (M10) and soil (M11) before yield (M13)'],
    intendedHi: ['FPO: बारिश के नीचे कितनी फसल', 'बीमा: एक्सपोज़र', 'उपज से पहले अवस्था और मिट्टी ज़रूरी'],
    limitations: ['Crop layer quality depends on cadastral / LULC freshness', 'Never convert hectares exposed into rupees automatically'],
    limitationsHi: ['फसल परत पुरानी हो सकती है', 'हेक्टेयर को अपने आप रुपये मत बनाओ'],
    classes: [{ name: 'M09 Exposure', use: 'Area in footprint', useHi: 'घेरे का क्षेत्र' }, { name: 'M13 Loss', use: 'Separate engine', useHi: 'अलग इंजन' }],
    variables: ['Crop', 'District', 'Hectares exposed']
  },
  {
    moduleNumber: 10, family: 'Field', familyHi: 'खेत', scientificName: 'Crop Growth Stage (GDD)',
    description: 'Flowering and grain-filling are fragile; vegetative stages often are not. Same rain, different story — that is why stage exists.',
    descriptionHi: 'फूल और दाना भरना नाज़ुक; पत्ती वाली अवस्था अक्सर सह लेती है। वही बारिश, अलग कहानी।',
    intended: ['Punjab wheat flowering heat', 'Odisha paddy panicle + wind', 'Unlocks honest yield ranges'],
    intendedHi: ['पंजाब गेहूं फूल + गर्मी', 'ओडिशा धान बाली + हवा', 'सच्ची उपज रेंज'],
    limitations: ['Needs sowing date or a regional calendar assumption', 'Variety differences are not fully resolved in the shell demo'],
    limitationsHi: ['बुवाई तारीख या कैलेंडर चाहिए', 'किस्म का फ़र्क डेमो में पूरा नहीं'],
    classes: [{ name: 'M10 Stage', use: 'Phenology clock', useHi: 'अवस्था' }, { name: 'M13', use: 'Yield after stage', useHi: 'अवस्था के बाद उपज' }],
    variables: ['Crop', 'Sowing / stage', 'Heat / rain']
  },
  {
    moduleNumber: 11, family: 'Field', familyHi: 'खेत', scientificName: '3D Soil Moisture & Waterlogging',
    description: 'Is the field too wet, too dry, or is water sitting? Drainage and duration matter as much as millimetres.',
    descriptionHi: 'खेत बहुत गीला, सूखा, या पानी खड़ा? मिलीमीटर जितना निकासी और समय भी मायने रखते हैं।',
    intended: ['Waterlogging risk for paddy vs upland', 'Pest leaf-wetness handoff (M14)', 'Yield left-tail when hypoxia lasts'],
    intendedHi: ['धान बनाम ऊँचे खेत', 'पत्ते गीले → रोग (M14)', 'लंबा खड़ा पानी → उपज गिरावट'],
    limitations: ['Without soil series maps, results are regional archetypes', 'Pumped drainage is not modelled unless provided'],
    limitationsHi: ['मिट्टी नक्शा न हो तो इलाका-प्रकार', 'पंप निकासी तभी जब डेटा हो'],
    classes: [{ name: 'M11 Soil', use: 'Water table / saturation', useHi: 'नमी / जलस्तर' }, { name: 'M14 Pest', use: 'Leaf wetness hours', useHi: 'पत्ते गीले घंटे' }],
    variables: ['Soil moisture', 'Ponding', 'Duration']
  },
  {
    moduleNumber: 12, family: 'Field', familyHi: 'खेत', scientificName: 'Explainable Crop Advice',
    description: 'Suggests what to grow or switch, with reasons you can read — not a black-box “the model said soybean.”',
    descriptionHi: 'क्या बोएँ, वजह के साथ — “मॉडल ने सोयाबीन कहा” का अंधेरा नहीं।',
    intended: ['Counterfactual: 15% less rain, should I switch', 'Extension officer talking points', 'Never auto-executes a sowing order'],
    intendedHi: ['15% कम बारिश तो क्या बदलें', 'सलाहकार की बात', 'बुवाई अपने आप नहीं होती'],
    limitations: ['Advice is contextual; mandi offtake still sits in M15', 'Seed availability is outside the engine'],
    limitationsHi: ['सलाह संदर्भ है, भाव M15 में', 'बीज उपलब्धता इंजन के बाहर'],
    classes: [{ name: 'M12 Advice', use: 'Readable reasons', useHi: 'पठनीय वजह' }],
    variables: ['Current crop', 'Rain scenario', 'Suggestion']
  },
  {
    moduleNumber: 13, family: 'Field', familyHi: 'खेत', scientificName: 'Yield Risk P10 / P50 / P90',
    description: 'Estimated harvest range after weather + exposure + stage + soil. Show three numbers. Never “yield will fall exactly 18%.”',
    descriptionHi: 'मौसम + क्षेत्र + अवस्था + मिट्टी के बाद उपज की तीन संख्याएँ। “ठीक 18% गिरेगी” कभी नहीं।',
    intended: ['Insurer / FPO planning', 'District food-balance conversations', 'Input to mandi arrivals (M15), not a price print'],
    intendedHi: ['बीमा / FPO', 'जिला अनाज चर्चा', 'मंडी आवक का इनपुट, भाव की छपाई नहीं'],
    limitations: ['Demo bands are scenario-shaped unless a calibrated skew-t is wired', 'Cannot skip M09/M10/M11 and still claim loss science'],
    limitationsHi: ['डेमो बैंड परिदृश्य हो सकते हैं', 'M09/M10/M11 छोड़कर नुकसान विज्ञान मत कहो'],
    classes: [{ name: 'M13 Yield', use: 'P10 P50 P90', useHi: 'तीन स्तर' }, { name: 'M15 Mandi', use: 'Arrivals after yield', useHi: 'उपज के बाद आवक' }],
    variables: ['P10', 'P50', 'P90']
  },
  {
    moduleNumber: 14, family: 'Field', familyHi: 'खेत', scientificName: 'Pest & Disease Climate Risk',
    description: 'Wet leaves and warm nights raise blight / hopper pressure. This is climate favorability, then “check the local agri advisory before spray.”',
    descriptionHi: 'गीले पत्ते और गर्म रातें झुलसा / फुदका बढ़ाती हैं। पहले मौसम अनुकूलता, फिर स्थानीय सलाह के बिना दवा नहीं।',
    intended: ['Leaf-wetness hours as a warning', 'Pair with stage (M10)', 'Not a pesticide prescription'],
    intendedHi: ['पत्ते कितनी देर गीले', 'अवस्था के साथ', 'दवा का पर्चा नहीं'],
    limitations: ['Pathogen strain and spray inventory are local', 'False alarms in dry-wind years'],
    limitationsHi: ['कीट नस्ल स्थानीय', 'सूखी हवा वाले साल में झूठा अलर्ट'],
    classes: [{ name: 'M14 Pest', use: 'Favorability', useHi: 'अनुकूलता' }, { name: 'M11', use: 'Wetness source', useHi: 'नमी का स्रोत' }],
    variables: ['Leaf wetness', 'Night heat', 'Crop']
  },
  {
    moduleNumber: 15, family: 'Mandi', familyHi: 'मंडी', scientificName: 'APMC Arrivals & Price Context',
    description: 'Weather does not print the mandi rate. Physical shocks (yield, roads) can change arrivals; prices are estimated from history, shown as a range.',
    descriptionHi: 'मौसम मंडी भाव नहीं छापता। उपज और सड़क आवक बदल सकते हैं; भाव इतिहास से अनुमान, रेंज में।',
    intended: ['Nashik onion / coastal paddy arrivals', 'Trader watch, not a trading bot', 'Pair with logistics (M16) and buffer (M17)'],
    intendedHi: ['नाशिक प्याज / तटीय धान आवक', 'व्यापारी निगरानी, ट्रेडिंग बॉट नहीं', 'रसद और बफर के साथ'],
    limitations: ['Do not hard-code “rain → +16.8% price” as a law', 'MSP, imports, and festival demand also move prices'],
    limitationsHi: ['“बारिश = +16.8% भाव” कानून नहीं', 'MSP, आयात, त्योहार भी भाव हिलाते हैं'],
    classes: [{ name: 'M15 Mandi', use: 'Arrivals / spot context', useHi: 'आवक / भाव संदर्भ' }, { name: 'M13', use: 'Yield shock in', useHi: 'उपज झटका' }],
    variables: ['Arrivals', 'Spot vs MSP', 'Volatility band']
  },
  {
    moduleNumber: 16, family: 'Mandi', familyHi: 'मंडी', scientificName: 'Farm-to-Mandi Corridor',
    description: 'If NH-16 or a feeder road waterlogs, trucks stop, arrivals fall even if the crop is standing. Route A vs Route B is the FPO sentence.',
    descriptionHi: 'सड़क डूबी तो गाड़ी रुकी, फसल खड़ी होने पर भी आवक गिरे। रास्ता A बनाम B — FPO की भाषा।',
    intended: ['48-hour logistics disruption scenarios', 'Alternate warehouse / route prompts', 'Not a live GPS of every truck'],
    intendedHi: ['48 घंटे रसद रुकावट', 'दूसरा रास्ता / गोदाम', 'हर ट्रक का GPS नहीं'],
    limitations: ['Needs a corridor list; unnamed village tracks are inferred', 'Police/NHAI closures arrive via news, not this engine alone'],
    limitationsHi: ['कॉरिडोर सूची चाहिए', 'NHAI बंद समाचार से आते हैं'],
    classes: [{ name: 'M16 Corridor', use: '5-hop cascade link', useHi: 'खेत-मंडी कड़ी' }],
    variables: ['Road / corridor', 'Hours closed', 'Crop on trucks']
  },
  {
    moduleNumber: 17, family: 'Mandi', familyHi: 'मंडी', scientificName: 'District Supply Deficit & Buffer',
    description: 'Rolls village shocks to district tonnes. Then: “review buffer stock and procurement” — a prompt, not an automatic PDS order.',
    descriptionHi: 'गाँव के झटके को ज़िला टन में जोड़ता है। फिर बफर और खरीद देखो — बटन दबाने से राशन नहीं निकलता।',
    intended: ['State planner brief', 'FCI / civil supplies conversation starter', 'Always labeled scenario'],
    intendedHi: ['राज्य योजना', 'आपूर्ति की बातचीत', 'हमेशा परिदृश्य लिखा हो'],
    limitations: ['Official stock ledgers are not scraped in the public demo', 'Politics of release are out of scope'],
    limitationsHi: ['आधिकारिक स्टॉक डेमो में नहीं', 'रिलीज़ की राजनीति दायरे से बाहर'],
    classes: [{ name: 'M17 Shock', use: 'District deficit', useHi: 'ज़िला कमी' }, { name: 'M18 What-if', use: 'Release scenarios', useHi: 'क्या-अगर' }],
    variables: ['Deficit tonnes', 'Buffer ask', 'District']
  },
  {
    moduleNumber: 18, family: 'Mandi', familyHi: 'मंडी', scientificName: 'Counterfactual What-If',
    description: '“If rain is 15% higher, what happens from sky to mandi?” Baseline vs scenario, uncertainty kept at every hop.',
    descriptionHi: 'अगर बारिश 15% ज़्यादा हो तो आसमान से मंडी तक क्या? पहले जैसा बनाम नया, हर पायदान पर अनिश्चितता।',
    intended: ['Jury demo of the full cascade', 'FPO / admin tabletop exercises', 'Must keep OBSERVED vs SCENARIO labels'],
    intendedHi: ['पूरी कड़ी का डेमो', 'FPO / प्रशासन अभ्यास', 'देखा गया बनाम कल्पना लिखो'],
    limitations: ['A what-if is not a forecast', 'Do not hide the baseline'],
    limitationsHi: ['कल्पना पूर्वानुमान नहीं', 'मूल रेखा मत छुपाओ'],
    classes: [{ name: 'M18 Simulator', use: 'Baseline vs scenario', useHi: 'पहले vs अगर' }, { name: 'M01–M17', use: 'Full hop list', useHi: 'पूरी कड़ी' }],
    variables: ['What-if rain', 'What-if wind', 'Baseline']
  }
];

const EVENTS = [
  { label: 'Bay depression — coastal Odisha', labelHi: 'खाड़ी डिप्रेशन — तटीय ओडिशा', query: 'Odisha coast, next 3 days, paddy — what is the risk?' },
  { label: 'Flowering heat — Punjab wheat', labelHi: 'फूल अवस्था गर्मी — पंजाब गेहूं', query: 'Punjab wheat flowering this week — what should we do?' },
  { label: 'Heavy rain — Nashik onion mandi', labelHi: 'भारी बारिश — नाशिक प्याज मंडी', query: 'How will heavy rain move Nashik onion mandi prices?' }
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
