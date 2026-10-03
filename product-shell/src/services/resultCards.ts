import { ActivatedModuleStep } from '@/types/shell';
import { farmerTitle } from '@/data/modelNimCards';

export type ResultCard = {
  moduleNumber: number;
  title: string;
  why: string;
  result: string;
  action: string;
  metric: string;
};

export type SourceLink = { label: string; url: string };

export type ResearchRun = {
  id: string;
  at: number;
  query: string;
  headline: string;
  cards: ResultCard[];
  links: SourceLink[];
};

const WHY_HI: Record<number, string> = {
  1: 'आसमान एक साथ देखने के लिए',
  2: 'हल्की बौछार है या बड़ा तूफान',
  3: 'यह मौसम आम दिनों से अलग है या नहीं',
  4: 'कौन-से गाँव घेरे में हैं',
  5: 'तूफान आगे कहाँ जा सकता है',
  6: 'भारी बारिश कितनी संभव है',
  7: 'गाँव जितना पास नक्शा',
  8: 'यह रन पिछले से कितना बदला',
  9: 'कितनी फसल रास्ते में है — नुकसान नहीं',
  10: 'फसल नाज़ुक अवस्था में है या नहीं',
  11: 'खेत गीला, सूखा, या पानी खड़ा',
  12: 'क्या बोएँ, वजह के साथ',
  13: 'उपज कम / बीच / ज़्यादा',
  14: 'गीले पत्ते से रोग का मौसम',
  15: 'आवक घट सकती है, भाव एक अंक नहीं',
  16: 'सड़क डूबी तो ट्रक रुकते हैं',
  17: 'ज़िले की आवक पर झटका',
  18: 'अगर बारिश और ज़्यादा हो तो क्या'
};

const WHY_EN: Record<number, string> = {
  1: 'To see the whole sky in one picture',
  2: 'To see if rain is a shower or a tall storm',
  3: 'To check if this weather is unusual',
  4: 'To mark which villages sit inside',
  5: 'To say where the storm may walk',
  6: 'To give a plain chance of heavy rain',
  7: 'To zoom to village streets',
  8: 'To compare this run with the last',
  9: 'To count crop in harm’s way — not already lost',
  10: 'To check if the crop is in a fragile stage',
  11: 'To see wet, dry, or standing water',
  12: 'To suggest what to grow, with a reason',
  13: 'To show a harvest range, not one fake %',
  14: 'To flag disease-friendly weather',
  15: 'To bound mandi move, not print a spot rate',
  16: 'To see if a flooded road stops trucks',
  17: 'To roll village shocks into district tonnes',
  18: 'To ask what if rain is higher'
};

const FIND_EN: Record<number, string> = {
  1: 'The sky over this place looks wet. More rain can still come.',
  2: 'This is more than a light shower. Storm-height air is in play.',
  3: 'This weather is unusual for the season. Treat it as a warning, not a loss.',
  4: 'Low-lying villages sit inside the rain footprint.',
  5: 'The storm is still walking toward the coast.',
  6: 'Heavy rain is likely in the next 1–3 days.',
  7: 'A village-scale map is ready if you need streets, not a state blob.',
  8: 'This run is wetter than the last one.',
  9: 'A large area of crop is in the path. Area at risk is not crop already lost.',
  10: 'The crop is in a sensitive stage. Wind or wet can hurt flowering.',
  11: 'Fields may stay wet or hold standing water.',
  12: 'Keep the current crop unless rain clearly fails.',
  13: 'Harvest could be lower than a normal year. Use a range, not one number.',
  14: 'Wet leaves raise disease chance. Scout the field.',
  15: 'Arrivals may fall and prices can firm. Not a guaranteed rate.',
  16: 'Flooded roads can delay trucks to mandi.',
  17: 'District supply can tighten if many villages stay wet.',
  18: 'If rain runs higher, waterlogging and price jump both get worse.'
};

const FIND_HI: Record<number, string> = {
  1: 'यहाँ आसमान गीला दिख रहा है। बारिश और आ सकती है।',
  2: 'यह हल्की बौछार नहीं — ऊँचा तूफान वाला मौसम है।',
  3: 'यह मौसम मौसम के हिसाब से असामान्य है। चेतावनी है, नुकसान पक्का नहीं।',
  4: 'निचले गाँव बारिश के घेरे में हैं।',
  5: 'तूफान अभी तट की ओर चल सकता है।',
  6: 'अगले 1–3 दिन भारी बारिश संभव है।',
  7: 'गाँव जितना पास नक्शा तैयार है।',
  8: 'यह रन पिछले से ज़्यादा गीला है।',
  9: 'बहुत फसल रास्ते में है। रास्ते में होना नुकसान नहीं है।',
  10: 'फसल नाज़ुक अवस्था में है। हवा या गीलापन फूल को चोट पहुँचा सकता है।',
  11: 'खेत गीले रह सकते हैं या पानी खड़ा रह सकता है।',
  12: 'बारिश साफ न गिरे तो अभी की फसल रखो।',
  13: 'उपज सामान्य साल से कम हो सकती है — एक नंबर नहीं, तीन संख्याएँ।',
  14: 'पत्ते गीले हैं तो रोग का खतरा। खेत देखो।',
  15: 'आवक घट सकती है, भाव चढ़ सकते हैं। पक्का भाव नहीं।',
  16: 'डूबी सड़क ट्रक रोक सकती है।',
  17: 'कई गाँव गीले रहें तो ज़िले की आवक तंग हो सकती है।',
  18: 'बारिश और ज़्यादा हो तो जलभराव और भाव दोनों बढ़ सकते हैं।'
};

const DO_EN: Record<number, string> = {
  1: 'Watch the sky tonight. Move tools off low ground.',
  2: 'Do not send labour to open fields if thunder builds.',
  3: 'Tell the panchayat this is unusual weather.',
  4: 'People in low wards should keep dry bags ready.',
  5: 'Follow the next IMD bulletin before travel.',
  6: 'Harvest what is ready. Keep seed dry.',
  7: 'Open the village map for your panchayat.',
  8: 'If this run is wetter, raise the alert one step.',
  9: 'Count the acres in the path. Do not book them as lost.',
  10: 'Protect flowering crop from hard wind if you can.',
  11: 'Clear drains so water does not sit.',
  12: 'Do not switch crop on one wet week.',
  13: 'Plan sales on a low / mid / high harvest, not one guess.',
  14: 'Walk the field tomorrow morning for spots on leaves.',
  15: 'If you must sell, do not dump all stock the same morning.',
  16: 'Check the highway before loading trucks.',
  17: 'FPOs should stagger arrivals if the district is wet.',
  18: 'Keep a wetter backup plan: extra drying space, later sale.'
};

const DO_HI: Record<number, string> = {
  1: 'रात आसमान देखो। औज़ार निचली ज़मीन से हटाओ।',
  2: 'गरज बढ़े तो खुले खेत में मजदूर न भेजो।',
  3: 'पंचायत को बताओ — मौसम असामान्य है।',
  4: 'निचले वार्ड सूखा बैग तैयार रखें।',
  5: 'सफर से पहले IMD बुलेटिन देखो।',
  6: 'तैयार फसल काटो। बीज सूखा रखो।',
  7: 'अपनी पंचायत का गाँव नक्शा खोलो।',
  8: 'यह रन गीला है तो चेतावनी एक पायदान बढ़ाओ।',
  9: 'रास्ते के एकड़ गिनो। उन्हें बर्बाद मत लिखो।',
  10: 'फूल वाली फसल को तेज़ हवा से बचाओ।',
  11: 'नाली साफ रखो ताकि पानी न टिके।',
  12: 'एक गीले हफ्ते पर फसल मत बदलो।',
  13: 'कम / बीच / ज़्यादा उपज पर बिक्री सोचो।',
  14: 'सुबह खेत घूमो — पत्तों पर धब्बे देखो।',
  15: 'बेचना हो तो एक सुबह सब माल मत ढलो।',
  16: 'ट्रक लादने से पहले सड़क पूछो।',
  17: 'ज़िला गीला हो तो आवक बाँटकर भेजो।',
  18: 'गीला प्लान रखो: सुखाने की जगह, बाद में बिक्री।'
};

export function cardsFromModules(steps: ActivatedModuleStep[], locale: 'en' | 'hi'): ResultCard[] {
  const hi = locale === 'hi';
  return steps.map((step) => {
    const n = step.moduleNumber;
    return {
      moduleNumber: n,
      title: farmerTitle(n, locale),
      why: (hi ? WHY_HI : WHY_EN)[n] || step.shortRole,
      result: (hi ? FIND_HI : FIND_EN)[n] || (hi ? 'मौसम पर नज़र रखो।' : 'Watch the weather and act early.'),
      action: (hi ? DO_HI : DO_EN)[n] || (hi ? 'तैयार रहो।' : 'Prepare now.'),
      metric: step.metricOutput
    };
  });
}
