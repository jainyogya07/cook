import { IntentRoutingResult } from '@/types/shell';

function placeHi(location?: string) {
  if (!location) return 'आपके इलाके';
  if (location.toLowerCase().includes('odisha')) return 'ओडिशा तट';
  if (location.toLowerCase().includes('punjab')) return 'पंजाब';
  if (location.toLowerCase().includes('maharashtra') || location.toLowerCase().includes('vidarbha')) return 'महाराष्ट्र / विदर्भ';
  if (location.toLowerCase().includes('nashik')) return 'नाशिक';
  if (location.toLowerCase().includes('bengal') || location.toLowerCase().includes('bay')) return 'बंगाल की खाड़ी';
  if (location.toLowerCase().includes('delhi')) return 'दिल्ली एनसीआर';
  return location;
}

function cropHi(crop?: string) {
  if (!crop) return 'फसल';
  if (crop.toLowerCase().includes('paddy') || crop.toLowerCase().includes('rice')) return 'धान';
  if (crop.toLowerCase().includes('wheat')) return 'गेहूं';
  if (crop.toLowerCase().includes('soy')) return 'सोयाबीन';
  if (crop.toLowerCase().includes('cotton')) return 'कपास';
  if (crop.toLowerCase().includes('onion')) return 'प्याज';
  return crop;
}

function timeHi(horizon?: string) {
  if (!horizon) return 'अगले 3 दिन';
  if (horizon.includes('24')) return 'अगले 1 दिन';
  if (horizon.includes('48')) return 'अगले 2 दिन';
  if (horizon.includes('72') || horizon.toLowerCase().includes('default')) return 'अगले 3 दिन';
  if (horizon.includes('96') || horizon.includes('120')) return 'अगले 5 दिन';
  return horizon.replace('Hours', 'घंटे').replace('Lead', '');
}

function timeEn(horizon?: string) {
  if (!horizon) return 'the next 3 days';
  if (horizon.includes('24')) return 'the next 24 hours';
  if (horizon.includes('48')) return 'the next 2 days';
  if (horizon.includes('72') || horizon.toLowerCase().includes('default')) return 'the next 3 days';
  if (horizon.includes('96') || horizon.includes('120')) return 'the next 5 days';
  return horizon.replace('Lead', '').replace('Hours', 'hours').trim();
}

export function buildHumanReply(result: IntentRoutingResult, locale: 'en' | 'hi' = 'en'): string {
  const place = result.entities.location || 'your region';
  const placeH = placeHi(result.entities.location);
  const crop = result.entities.crop;
  const cropH = cropHi(crop);
  const time = locale === 'hi' ? timeHi(result.entities.horizon) : timeEn(result.entities.horizon);
  const engine = result.targetModuleLaunch?.moduleNumber || 6;

  if (result.mode === 'SIMULATE' || result.rawQuery.toLowerCase().includes('agar') || result.rawQuery.includes('अगर')) {
    return locale === 'hi'
      ? `सीधी बात: ${placeH} में अगर बारिश अनुमान से ज़्यादा हुई, तो पानी खड़ा रह सकता है और ${cropH} को नुकसान हो सकता है। मंडी में सामान कम आएगा, भाव बढ़ सकते हैं।\n\nअब क्या करें: इंजन ${engine} खोलें।`
      : `If rain in ${place} runs higher than expected, water can sit on ${crop || 'the crop'}. Mandi arrivals may fall and prices can rise.\n\nNext: open engine ${engine}.`;
  }

  if (crop || /crop|yield|fasal|kisan|धान|गेहूं|प्याज|soy/i.test(result.rawQuery)) {
    return locale === 'hi'
      ? `सीधी बात: ${placeH} में ${cropH} अगले ${time} में मौसम की चपेट में है। सब फसल बर्बाद नहीं होगी — फूल आने की अवस्था संवेदनशील है।\n\nअब क्या करें: इंजन ${engine} खोलें।`
      : `${crop || 'The crop'} in ${place} is exposed over ${time}. Exposure is not the same as loss. Flowering stages are the sensitive ones.\n\nNext: open engine ${engine}.`;
  }

  return locale === 'hi'
    ? `सीधी बात: ${placeH} पर ${time} में भारी बारिश या तेज़ हवा का खतरा है। निचले इलाकों में पानी भर सकता है। अभी से तैयारी कर लें।\n\nअब क्या करें: इंजन ${engine} पर बारिश देखें, इंजन 7 पर गाँव नक्शा।`
    : `${place} may see heavy rain or strong wind over ${time}. Low-lying areas can flood. Prepare now.\n\nNext: open engine ${engine}, then the village map.`;
}
