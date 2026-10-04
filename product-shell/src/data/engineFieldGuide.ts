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
  {
    moduleNumber: 1,
    symbol: '⊕',
    title: 'Sky Watch',
    titleHi: 'आसमान की निगरानी',
    need: 'Target coastal basin + Lead horizon (+24h/+48h/+72h/+120h) + Air layer',
    needHi: 'तटीय क्षेत्र + समय सीमा (+24 से +120 घंटे) + वायुमंडलीय दबाव स्तर',
    example: 'Puri coast kharif paddy: 72-hour cyclone low-pressure wind gust & moisture convergence',
    exampleHi: 'पुरी तट खरीफ धान: 72 घंटे में डिप्रेशन, 65 किमी/घंटा हवा और नमी का जमाव',
    result: '3D atmospheric volume, isobar wind circulation, and 72h moisture convergence field',
    resultHi: '3D वायुमंडलीय घनत्व, चक्रवाती हवाओं के समदाब रेखाएं और बारिश का जमाव'
  },
  {
    moduleNumber: 2,
    symbol: '≋',
    title: 'Air Layers',
    titleHi: 'हवा की परतें',
    need: 'Geographic transect + Pressure level slice (1000hPa surface to 200hPa upper air)',
    needHi: 'भौगोलिक अनुप्रस्थ काट + दबाव स्तर (1000hPa सतह से 200hPa ऊपरी हवा)',
    example: 'Western Ghats to Deccan plateau: vertical wind shear and cloud lift at 850hPa vs 500hPa',
    exampleHi: 'पश्चिमी घाट से दक्कन पठार: 850hPa और 500hPa पर लंबवत हवा की गति और बादलों का उठान',
    result: 'Vertical cross-section of wind speed vectors, convective updrafts, and cloud ceiling',
    resultHi: 'हवा की लंबवत गति, ऊपर उठती नमी और बादलों की निचली सीमा का वर्टिकल क्रॉस-सेक्शन'
  },
  {
    moduleNumber: 3,
    symbol: 'Δ',
    title: 'Strange Weather (EFI)',
    titleHi: 'अनोखा मौसम (EFI)',
    need: 'Agro-climatic zone + Hazard variable (Tmax heatwave, gust, deluge) + Climatology baseline',
    needHi: 'कृषि-जलवायु क्षेत्र + मौसमी चर (अधिकतम तापमान लू, हवा, भारी वर्षा) + 30-वर्षीय ऐतिहासिक औसत',
    example: 'Punjab wheat belt (Ludhiana/Bathinda): March terminal heat anomaly EFI > 0.85',
    exampleHi: 'पंजाब गेहूं पट्टी (लुधियाना/बठिंडा): मार्च अंतिम गर्मी EFI > 0.85 (सामान्य से +6°C ज्यादा)',
    result: 'Extreme Forecast Index (EFI) percentile score (0.0 to 1.0) compared to 30-year M-climate',
    resultHi: '30 साल के सामान्य मौसम के मुकाबले एक्सट्रीम इंडेक्स (0 से 1.0) और खतरे की श्रेणी'
  },
  {
    moduleNumber: 4,
    symbol: '◻',
    title: 'Affected Area',
    titleHi: 'प्रभावित इलाका',
    need: 'Disaster event envelope + District boundary + Vulnerable village polygon',
    needHi: 'आपदा प्रभाव क्षेत्र + ज़िला सीमा + संवेदनशील पंचायत व गाँव की सीमा',
    example: 'Kendrapara & Jagatsinghpur coastal blocks: 50mm/day rain footprint and tidal surge',
    exampleHi: 'केन्द्रापारा व जगतसिंहपुर तटीय ब्लॉक: 50 मिमी/दिन बारिश और खारे पानी का फैलाव',
    result: 'Geospatial hazard perimeter overlaying gram panchayats and local crop fields',
    resultHi: 'गाँव और पंचायतों के ऊपर खतरे का भौगोलिक घेरा (नुकसान नहीं, केवल जोखिम क्षेत्र)'
  },
  {
    moduleNumber: 5,
    symbol: '⤷',
    title: 'Storm Path',
    titleHi: 'तूफान का रास्ता',
    need: 'Tropical cyclone center + 50-member ensemble tracks + 5-day cone of uncertainty',
    needHi: 'चक्रवाती केंद्र + 50-सदस्यीय मॉडल मार्ग + 5-दिवसीय अनिश्चितता शंकु',
    example: 'Bay of Bengal Deep Depression: ensemble landfall spread between Gopalpur and Sagar Island',
    exampleHi: 'बंगाल की खाड़ी गहरा डिप्रेशन: गोपालपुर से सागर द्वीप के बीच 50 संभावित लैंडफॉल रास्ते',
    result: 'Probabilistic spaghetti tracks, weighted centroid path, and landfall timing window',
    resultHi: 'संभावित रास्तों का जाल, औसत मार्ग और तट से टकराने का सटीक समय-विंडो'
  },
  {
    moduleNumber: 6,
    symbol: '◉',
    title: 'Rain Chance',
    titleHi: 'बारिश की संभावना',
    need: 'Specific block/taluka + Rain thresholds (>25mm, >50mm, >100mm) + Next 48–72 hours',
    needHi: 'विशिष्ट ब्लॉक/तहसील + बारिश सीमा (>25mm, >50mm, >100mm) + अगले 48-72 घंटे',
    example: 'Coastal Andhra (Srikakulam/Visakhapatnam): probability of rainfall exceeding 75mm in 48h',
    exampleHi: 'तटीय आंध्र (श्रीकाकुलम/विशाखापट्टनम): अगले 48 घंटे में 75 मिमी से अधिक वर्षा की 78% संभावना',
    result: 'Direct percentage probabilities across operational rainfall threshold tiers',
    resultHi: '25mm, 50mm, 100mm वर्षा श्रेणियों में स्पष्ट प्रतिशत संभावना (P10/P50/P90)'
  },
  {
    moduleNumber: 7,
    symbol: '⊞',
    title: 'Village Map',
    titleHi: 'गाँव वाला नक्शा',
    need: 'District code + High-resolution 5 km downscaled terrain grid + Precipitation layer',
    needHi: 'ज़िला कोड + 5 किमी उच्च-रिज़ॉल्यूशन स्थानीय ग्रिड + वर्षा परत',
    example: 'Balasore district coastal panchayats: 5 km terrain-adjusted convective downburst map',
    exampleHi: 'बालासोर ज़िला तटीय पंचायतें: 5 किमी ग्रिड पर स्थानीय मूसलाधार बारिश का नक्शा',
    result: 'Hyper-local 5 km cell precipitation map with topography-induced precipitation gradients',
    resultHi: '5 किमी ग्रिड पर विस्तृत वर्षा नक्शा, ज़मीनी ढलान और नदियों के बहाव सहित'
  },
  {
    moduleNumber: 8,
    symbol: '⧉',
    title: 'Then vs Now',
    titleHi: 'पहले बनाम अब',
    need: 'Current active storm event vs Historical benchmark analogue (e.g. Cyclone Fani / Yaas)',
    needHi: 'वर्तमान सक्रिय चक्रवात बनाम ऐतिहासिक तुलनात्मक तूफ़ान (जैसे फ़ानी या यास)',
    example: 'Current Bay low vs 2019 Cyclone Fani: 5 km downscaled core vs Doppler observed radar',
    exampleHi: 'वर्तमान खाड़ी डिप्रेशन बनाम 2019 फ़ानी तूफ़ान: 5 किमी मॉडल बनाम डॉपलर रडार तुलना',
    result: 'Side-by-side verification slider showing spatial bias, peak intensity, and core shift',
    resultHi: 'स्लाइडर द्वारा मॉडल बनाम रडार की तुलना: तीव्रता, स्थिति और बारिश में अंतर'
  },
  {
    moduleNumber: 9,
    symbol: '▣',
    title: 'Crop in Harm’s Way',
    titleHi: 'फसल कितनी क्षेत्र में',
    need: 'Crop type (Paddy, Cotton, Soybean) + Sown acreage raster + Flood hazard boundary',
    needHi: 'फसल (धान, कपास, सोयाबीन) + बुवाई का रकबा + बाढ़/तूफ़ान का भौगोलिक घेरा',
    example: 'Coastal Odisha Kharif: Swarna paddy acreage overlapping 48-hour inundation zone',
    exampleHi: 'तटीय ओडिशा खरीफ: 48 घंटे के जलभराव घेरे में आने वाला 1,32,000 हेक्टेयर स्वर्णा धान',
    result: 'Exposed crop hectares (Exposure ≠ Loss) classified by elevation and soil drainage',
    resultHi: 'प्रभावित हेक्टेयर का सटीक आंकड़ा (एक्सपोज़र ≠ नुकसान) और जल निकासी वर्गीकरण'
  },
  {
    moduleNumber: 10,
    symbol: '⚘',
    title: 'Crop Stage',
    titleHi: 'फसल की अवस्था',
    need: 'Sowing date + Physiological growth stage (Tillering, Anthesis/Flowering, Grain-fill)',
    needHi: 'बुवाई की तारीख + फसल की जैविक अवस्था (कल्ले फूटना, फूल आना/दूध भरना, पकना)',
    example: 'Punjab wheat (HD-3086 sown Nov 10): Anthesis flowering sensitivity to 34°C dry wind',
    exampleHi: 'पंजाब गेहूं (HD-3086 बुवाई 10 नवं): फूल आने के समय 34°C गर्म हवा से दाना सिकुड़ने का खतरा',
    result: 'Vulnerability factor curve, physiological stress score, and pollen sterility window',
    resultHi: 'फसल की जैविक नाज़ुकता स्कोर, पराग बाँझपन का खतरा और दाना सिकुड़ने का अनुमान'
  },
  {
    moduleNumber: 11,
    symbol: '▽',
    title: 'Soil & Water',
    titleHi: 'मिट्टी और पानी',
    need: 'Soil texture (Vertisol black / Sandy loam) + Root-zone depth + Antecedent soil moisture',
    needHi: 'मिट्टी का प्रकार (काली कपासी / दोमट) + जड़ की गहराई (0-30 सेमी) + मौजूदा नमी',
    example: 'Vidarbha vertisol black soil: 72-hour root zone anoxia after 90mm convective rainfall',
    exampleHi: 'विदर्भ काली कपासी मिट्टी: 90 मिमी बारिश के बाद 72 घंटे तक जड़ों में ऑक्सीजन की कमी (वाटरलॉगिंग)',
    result: 'Volumetric soil moisture percentage, saturation days, and aeration deficit hours',
    resultHi: 'मिट्टी में नमी प्रतिशत, जलभराव के दिन और जड़ों के सांस लेने की स्थिति'
  },
  {
    moduleNumber: 12,
    symbol: '⎇',
    title: 'What to Grow',
    titleHi: 'क्या बोएँ',
    need: 'Agro-zone + Rainfall deficit/surplus scenario (-20% to +40%) + Market gross margin',
    needHi: 'कृषि क्षेत्र + वर्षा का परिदृश्य (-20% से +40%) + अपेक्षित मंडी भाव व मुनाफा',
    example: 'Marathwada dry-land: replace delayed Kharif cotton with short-duration soybean / pigeonpea',
    exampleHi: 'मराठवाड़ा सूखा क्षेत्र: देर से मानसून पर लंबी अवधि के कपास की जगह 90-दिन का सोयाबीन या अरहर',
    result: 'Ranked crop suitability matrix with gross margin ₹/ha, SHAP biophysical attribution',
    resultHi: 'फसलों की रैंकिंग, प्रति हेक्टेयर अपेक्षित मुनाफा और SHAP वैज्ञानिक कारण'
  },
  {
    moduleNumber: 13,
    symbol: 'μ',
    title: 'Yield Risk',
    titleHi: 'उपज का खतरा',
    need: 'Target crop + Agro-climatic district + Combined weather stress index (heat + waterlogging)',
    needHi: 'फसल + कृषि ज़िला + मौसम का संयुक्त तनाव (गर्मी + अधिक पानी + हवा)',
    example: 'Coastal Odisha kharif paddy: ensemble yield range under 36-hour waterlogging submergence',
    exampleHi: 'तटीय ओडिशा खरीफ धान: 36 घंटे पानी में डूबने के बाद उपज का कम / मध्यम / अधिक अनुमान',
    result: 'Calibrated P10 (stress) / P50 (likely) / P90 (favorable) harvest yield in quintals/acre',
    resultHi: 'कम (P10) / सामान्य (P50) / श्रेष्ठ (P90) उपज का तीन-संख्या वाला दायरा (क्विंटल/एकड़)'
  },
  {
    moduleNumber: 14,
    symbol: '☣',
    title: 'Pest & Disease',
    titleHi: 'कीट और रोग',
    need: 'Crop canopy + Leaf wetness duration (hours) + Mean ambient temperature + Relative humidity',
    needHi: 'फसल का फैलाव + पत्तियों के गीले रहने के घंटे + तापमान (18-24°C) + हवा में नमी (>85%)',
    example: 'Punjab wheat: 48h leaf wetness with 18–22°C temperature driving Yellow Rust (Puccinia striiformis)',
    exampleHi: 'पंजाब गेहूं: 48 घंटे लगातार पत्ते गीले रहने पर पीला रतुआ (येलो रस्ट) का तीव्र संक्रमण चक्र',
    result: 'Fungal spore germination probability, infection severity tier, and precise chemical spray timing',
    resultHi: 'रोग संक्रमण की संभावना प्रतिशत, गंभीरता स्तर और फफूंदनाशक छिड़काव की सही तारीख'
  },
  {
    moduleNumber: 15,
    symbol: '₹',
    title: 'Mandi Prices',
    titleHi: 'मंडी भाव',
    need: 'Commodity + APMC mandi hub + Weather-induced arrival deficit percentage (-10% to -40%)',
    needHi: 'फसल + प्रमुख APMC मंडी + मौसम के कारण आवक में अनुमानित गिरावट (-10% से -40%)',
    example: 'Nashik / Lasalgaon APMC onion: 18.5% arrival drop following cyclonic unseasonal rain',
    exampleHi: 'नाशिक / लासलगांव प्याज मंडी: बेमौसम भारी बारिश के बाद दैनिक आवक 18.5% गिरने पर भाव उछाल',
    result: 'Mandi arrival deficit volume (quintals), spot price projection band (₹/qtl), and 14-day volatility',
    resultHi: 'दैनिक आवक में कमी (क्विंटल), संभावित थोक भाव (₹/क्विंटल) और 14-दिन का उतार-चढ़ाव'
  },
  {
    moduleNumber: 16,
    symbol: '⟳',
    title: 'Farm to Market',
    titleHi: 'खेत से मंडी',
    need: 'Freight corridor / National Highway + Perishable commodity + Inundation choke points',
    needHi: 'माल ढुलाई हाईवे (NH) + जल्दी खराब होने वाली फसल + जलभराव व भूस्खलन रुकावट बिंदु',
    example: 'Kolar to Azadpur Delhi: refrigerated tomato transit disruption on NH-44 during peninsular deluge',
    exampleHi: 'कोलार से आजादपुर दिल्ली: NH-44 पर मूसलाधार बारिश से टमाटर ट्रकों में 48 घंटे की देरी व सड़न',
    result: 'Route transit delay hours, post-harvest spoilage risk percentage, and re-routing corridor',
    resultHi: 'हाईवे पर देरी के घंटे, रास्ते में सड़ने का खतरा प्रतिशत और वैकल्पिक सुरक्षित सड़क मार्ग'
  },
  {
    moduleNumber: 17,
    symbol: '↯',
    title: 'Supply Shock',
    titleHi: 'आवक का झटका',
    need: 'Regional procurement zone + Multi-district production loss + Buffer inventory level',
    needHi: 'क्षेत्रीय खरीद ज़ोन + कई ज़िलों में संयुक्त फसल नुकसान + सरकारी बफर स्टॉक की स्थिति',
    example: 'Central India Soybean belt (Indore/Ujjain): 22% regional production shock & domestic crushing deficit',
    exampleHi: 'मध्य प्रदेश सोयाबीन क्षेत्र: भारी बारिश से 22% उत्पादन गिरने पर सॉल्वेंट प्लांटों में आपूर्ति संकट',
    result: 'Statewide net supply deficit in Lakh Metric Tonnes (LMT), consumer inflation pressure',
    resultHi: 'राज्य स्तर पर शुद्ध आपूर्ति घाटा (लाख मीट्रिक टन), थोक आपूर्ति झटका और मूल्य दबाव'
  },
  {
    moduleNumber: 18,
    symbol: '⬡',
    title: 'What If',
    titleHi: 'अगर ऐसा हो तो',
    need: 'Counterfactual weather perturbation (e.g. +20% rain, 3-day dry spell) + Management intervention',
    needHi: 'काल्पनिक मौसम बदलाव (जैसे +20% अधिक बारिश, 3 दिन का सूखा) + प्रबंधन कदम (जल्दी कटाई, ड्रेनेज)',
    example: 'What-If: Sowing shifted early by 12 days + Drainage pumps deployed during cyclone landfall',
    exampleHi: 'अगर ऐसा हो: बुवाई 12 दिन पहले की जाए और तूफ़ान के समय खेत से पानी निकालने के पंप चलाए जाएं',
    result: 'Full 5-hop causal DAG cascade: Atmosphere → Soil → Yield (+28.5%) → Mandi gross margin (+₹18,500/ha)',
    resultHi: 'संपूर्ण 5-कड़ियों का प्रभाव: आसमान → मिट्टी → उपज सुधार (+28.5%) → किसान का मुनाफा (+₹18,500/हेक्टेयर)'
  }
];

export const QUERY_INPUT_RULE =
  'सटीक क्वेरी प्रारूप: [स्थान या ब्लॉक] + [फसल व अवस्था] + [मौसम या समय सीमा] + [अपेक्षित निर्णय]। जैसे: "पुरी खरीफ धान +72 घंटे चक्रवात हवा और जलभराव जोखिम"';

export const QUERY_INPUT_RULE_EN =
  'Target Query Format: [Location / District] + [Crop & Growth Stage] + [Lead Horizon / Hazard] + [Target Decision]. Example: "Puri coastal paddy +72h cyclone wind and waterlogging risk"';

