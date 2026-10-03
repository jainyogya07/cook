import { ActivatedModuleStep } from '@/types/shell';
import { farmerTitle } from '@/data/modelNimCards';

export type ResultCard = {
  moduleNumber: number;
  title: string;
  why: string;
  result: string;
  metric: string;
};

const WHY_HI: Record<number, string> = {
  1: 'आसमान की परतें एक साथ देखने के लिए',
  2: 'बारिश पतली है या गहरा तूफान, यह दिखाने के लिए',
  3: 'क्या मौसम आम मंगलवार से अलग है',
  4: 'कौन-से गाँव घेरे में हैं',
  5: 'तूफान अगले दिनों कहाँ जा सकता है',
  6: 'कितने अनुमान भारी बारिश पर सहमत',
  7: 'बड़े नक्शे को गाँव जितना पास लाने के लिए',
  8: 'यह रन पिछले से कितना बदला',
  9: 'कितने हेक्टेयर रास्ते में हैं — नुकसान नहीं, क्षेत्र',
  10: 'फसल की अवस्था नाज़ुक है या नहीं',
  11: 'खेत गीला है, सूखा है, या पानी खड़ा है',
  12: 'क्या बोएँ, वजह के साथ',
  13: 'उपज की तीन संख्याएँ (कम / बीच / ज़्यादा)',
  14: 'गीले पत्ते से रोग का मौसम',
  15: 'आवक बदल सकती है, भाव एक अंक नहीं',
  16: 'सड़क डूबी तो ट्रक रुकते हैं',
  17: 'ज़िले के टन में झटका',
  18: 'अगर बारिश और ज़्यादा हो तो क्या'
};

const WHY_EN: Record<number, string> = {
  1: 'To share one sky picture for every later engine',
  2: 'To see if rain is shallow or a tall storm',
  3: 'To ask if this weather is unusual, not if the crop is already lost',
  4: 'To draw who sits inside the footprint',
  5: 'To say where the storm may walk',
  6: 'To turn many forecasts into a plain chance',
  7: 'To bring the map down to village scale',
  8: 'To compare this run with the last one',
  9: 'To count hectares in harm’s way — exposure, not loss',
  10: 'To check if the crop is in a fragile stage',
  11: 'To see wet, dry, or standing water',
  12: 'To suggest what to grow, with a reason',
  13: 'To show a harvest range, never one fake percent',
  14: 'To flag disease-friendly weather',
  15: 'To bound mandi movement, not print a spot rate',
  16: 'To see if a flooded road stops trucks',
  17: 'To roll village shocks into district tonnes',
  18: 'To ask “what if rain is higher?”'
};

export function cardsFromModules(steps: ActivatedModuleStep[], locale: 'en' | 'hi'): ResultCard[] {
  return steps.map((step) => {
    const title = farmerTitle(step.moduleNumber, locale);
    const why = (locale === 'hi' ? WHY_HI : WHY_EN)[step.moduleNumber] || step.shortRole;
    return {
      moduleNumber: step.moduleNumber,
      title,
      why,
      metric: step.metricOutput,
      result:
        locale === 'hi'
          ? `नतीजा: ${step.metricOutput}. यह संभावना / परिदृश्य है, पक्का नुकसान नहीं.`
          : `Result: ${step.metricOutput}. Scenario / chance — not a guaranteed loss.`
    };
  });
}
