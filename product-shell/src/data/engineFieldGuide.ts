export interface EngineGuideEntry {
  moduleNumber: number;
  symbol: string;
  title: string;
  titleHi: string;
  need: string;
  needHi: string;
  example: string;
  exampleHi: string;
  result: string;
  resultHi: string;
}

export const ENGINE_FIELD_GUIDE: EngineGuideEntry[] = [
  { moduleNumber: 1, symbol: '⊕', title: 'Sky Watch', titleHi: 'आसमान की निगरानी', need: 'Place + next how many hours', needHi: 'जगह + कितने घंटे आगे', example: 'Odisha coast, next 3 days', exampleHi: 'ओडिशा तट, अगले 3 दिन', result: 'Wind, cloud and rain picture', resultHi: 'हवा, बादल और बारिश का हाल' },
  { moduleNumber: 2, symbol: '≋', title: 'Air Layers', titleHi: 'हवा की परतें', need: 'Place + height you care about', needHi: 'जगह + ऊँचाई', example: 'Western Ghats, near ground', exampleHi: 'पश्चिमी घाट, जमीन के पास', result: 'How air is moving in layers', resultHi: 'हवा ऊपर-नीचे कैसे चल रही है' },
  { moduleNumber: 3, symbol: 'Δ', title: 'Strange Weather', titleHi: 'अनोखा मौसम', need: 'Hazard + place', needHi: 'खतरा + जगह', example: 'Heatwave, Punjab wheat belt', exampleHi: 'लू, पंजाब गेहूं पट्टी', result: 'How unusual this weather is', resultHi: 'यह मौसम कितना असामान्य है' },
  { moduleNumber: 4, symbol: '◻', title: 'Affected Area', titleHi: 'प्रभावित इलाका', need: 'Storm or event + place', needHi: 'तूफान या घटना + जगह', example: 'Bay storm, Odisha', exampleHi: 'बंगाल की खाड़ी का तूफान, ओडिशा', result: 'Which villages sit inside the danger zone', resultHi: 'कौन से गाँव खतरे के घेरे में हैं' },
  { moduleNumber: 5, symbol: '⤷', title: 'Storm Path', titleHi: 'तूफान का रास्ता', need: 'Storm + days ahead', needHi: 'तूफान + कितने दिन आगे', example: 'Cyclone, next 5 days', exampleHi: 'चक्रवात, अगले 5 दिन', result: 'Where the storm is likely to go', resultHi: 'तूफान कहाँ जाएगा' },
  { moduleNumber: 6, symbol: '◉', title: 'Rain Chance', titleHi: 'बारिश की संभावना', need: 'Place + time window', needHi: 'जगह + समय', example: 'Coastal Andhra, next 48 hours', exampleHi: 'तटीय आंध्र, अगले 48 घंटे', result: 'Chance of heavy rain, in plain numbers', resultHi: 'भारी बारिश कितनी संभव है' },
  { moduleNumber: 7, symbol: '⊞', title: 'Village Map', titleHi: 'गाँव वाला नक्शा', need: 'District or coast + rain/wind', needHi: 'जिला या तट + बारिश/हवा', example: 'Odisha coast, heavy rain', exampleHi: 'ओडिशा तट, भारी बारिश', result: 'A local 5km map you can act on', resultHi: '5 किमी का स्थानीय नक्शा' },
  { moduleNumber: 8, symbol: '⧉', title: 'Then vs Now', titleHi: 'पहले बनाम अब', need: 'Two events to compare', needHi: 'दो घटनाएँ', example: 'This storm vs last landfall', exampleHi: 'यह तूफान बनाम पिछला लैंडफॉल', result: 'What changed, and how fast', resultHi: 'क्या बदला और कितनी तेजी से' },
  { moduleNumber: 9, symbol: '▣', title: 'Crop in Harm’s Way', titleHi: 'फसल कितनी क्षेत्र में', need: 'Crop + district', needHi: 'फसल + जिला', example: 'Kharif paddy, Puri–Kendrapara', exampleHi: 'खरीफ धान, पुरी–केन्द्रापारा', result: 'Hectares exposed — not yet lost', resultHi: 'कितने हेक्टेयर प्रभावित हो सकते हैं, नुकसान नहीं माना गया' },
  { moduleNumber: 10, symbol: '⚘', title: 'Crop Stage', titleHi: 'फसल की अवस्था', need: 'Crop + sowing time', needHi: 'फसल + बुवाई का समय', example: 'Wheat, Punjab, flowering', exampleHi: 'गेहूं, पंजाब, फूल आने की अवस्था', result: 'Whether this stage can take the weather', resultHi: 'इस अवस्था में मौसम कितना नुकसान कर सकता है' },
  { moduleNumber: 11, symbol: '▽', title: 'Soil & Water', titleHi: 'मिट्टी और पानी', need: 'Place + soil concern', needHi: 'जगह + मिट्टी की चिंता', example: 'Vidarbha black soil, dry spell', exampleHi: 'विदर्भ काली मिट्टी, सूखा', result: 'Too wet, too dry, or water sitting', resultHi: 'बहुत गीली, बहुत सूखी, या पानी खड़ा' },
  { moduleNumber: 12, symbol: '⎇', title: 'What to Grow', titleHi: 'क्या बोएँ', need: 'Current crop + problem', needHi: 'अभी की फसल + समस्या', example: 'Switch soybean if rain is 15% less', exampleHi: 'बारिश 15% कम हो तो सोयाबीन बदलें', result: 'A clear crop suggestion with reasons', resultHi: 'साफ सलाह, वजह के साथ' },
  { moduleNumber: 13, symbol: 'μ', title: 'Yield Risk', titleHi: 'उपज का खतरा', need: 'Crop + season', needHi: 'फसल + मौसम', example: 'Paddy yield, coastal Odisha kharif', exampleHi: 'धान उपज, तटीय ओडिशा खरीफ', result: 'Best / likely / worst harvest range', resultHi: 'सबसे अच्छा / सामान्य / खराब फसल अनुमान' },
  { moduleNumber: 14, symbol: '☣', title: 'Pest & Disease', titleHi: 'कीट और रोग', need: 'Crop + region', needHi: 'फसल + इलाका', example: 'Wheat, Punjab, long leaf wetness', exampleHi: 'गेहूं, पंजाब, पत्ते देर तक गीले', result: 'Which pest/disease is likely, and what to spray', resultHi: 'कौन सा रोग/कीट संभव है, क्या करें' },
  { moduleNumber: 15, symbol: '₹', title: 'Mandi Prices', titleHi: 'मंडी भाव', need: 'Crop + mandi', needHi: 'फसल + मंडी', example: 'Onion, Nashik / Lasalgaon', exampleHi: 'प्याज, नाशिक / लासलगांव', result: 'Arrivals down, prices up — in rupees', resultHi: 'आवक घटी, भाव बढ़ा — रुपये में' },
  { moduleNumber: 16, symbol: '⟳', title: 'Farm to Market', titleHi: 'खेत से मंडी', need: 'Crop + road / corridor', needHi: 'फसल + रास्ता', example: 'Tomato, Kolar to Bengaluru', exampleHi: 'टमाटर, कोलार से बेंगलुरु', result: 'If weather will block trucks and supply', resultHi: 'मौसम गाड़ियों और सप्लाई को रोकेगा या नहीं' },
  { moduleNumber: 17, symbol: '↯', title: 'Supply Shock', titleHi: 'आवक का झटका', need: 'Crop + how big the drop is', needHi: 'फसल + कितनी गिरावट', example: 'Soybean, 18% fewer arrivals', exampleHi: 'सोयाबीन, आवक 18% कम', result: 'How wholesale prices may jump', resultHi: 'थोक भाव कितना उछल सकता है' },
  { moduleNumber: 18, symbol: '⬡', title: 'What If', titleHi: 'अगर ऐसा हो तो', need: 'A what-if + place', needHi: 'कल्पना + जगह', example: '15% less rain in Vidarbha', exampleHi: 'विदर्भ में 15% कम बारिश', result: 'Weather → crop → mandi, in one story', resultHi: 'मौसम → फसल → मंडी, एक कहानी में' }
];

export const QUERY_INPUT_RULE =
  'सीधी बात: जगह, समय, फसल या खतरा, और आपको क्या चाहिए — यही लिखें।';

export const QUERY_INPUT_RULE_EN =
  'Type a place, a time window, a crop or hazard, and the decision you need.';
