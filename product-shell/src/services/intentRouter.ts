// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Smart Intent & Natural Language Query Router
// Translates natural user questions into dynamic multi-module cascades
// ============================================================================

import {
  InputMode,
  ExtractedEntities,
  ActivatedModuleStep,
  IntentRoutingResult
} from '@/types/shell';

export function parseAndRouteQuery(rawQuery: string, mode: InputMode): IntentRoutingResult {
  const q = rawQuery.toLowerCase();
  const raw = rawQuery;

  // 1. Entity Extraction via semantic regex / heuristics
  const entities: ExtractedEntities = {
    confidenceScore: 0.92
  };

  // Location detection
  if (q.includes('odisha') || q.includes('puri') || q.includes('kendrapara') || q.includes('bhubaneswar') || raw.includes('ओडिशा') || raw.includes('पुरी')) {
    entities.location = 'Odisha (Coastal Delta)';
  } else if (q.includes('punjab') || q.includes('ludhiana') || q.includes('amritsar') || raw.includes('पंजाब') || raw.includes('गेहूं')) {
    entities.location = 'Punjab (Indo-Gangetic Basin)';
  } else if (q.includes('nashik') || q.includes('lasalgaon') || q.includes('onion') || q.includes('pyaz') || raw.includes('नाशिक') || raw.includes('प्याज')) {
    entities.location = 'Nashik Mandi Corridor';
  } else if (q.includes('maharashtra') || q.includes('vidarbha') || q.includes('marathwada') || raw.includes('महाराष्ट्र') || raw.includes('विदर्भ')) {
    entities.location = 'Maharashtra (Deccan Plateau)';
  } else if (q.includes('bay of bengal') || q.includes('cyclone') || q.includes('coastal') || raw.includes('चक्रवात') || raw.includes('तट')) {
    entities.location = 'Bay of Bengal Basin';
  } else if (q.includes('delhi') || q.includes('ncr') || raw.includes('दिल्ली')) {
    entities.location = 'Delhi NCR';
  } else {
    entities.location = 'Odisha (Coastal Delta)';
  }

  // Crop detection
  if (q.includes('rice') || q.includes('paddy') || q.includes('swarna') || raw.includes('धान') || raw.includes('चावल')) {
    entities.crop = 'Kharif Lowland Paddy (Swarna)';
  } else if (q.includes('wheat') || q.includes('gehun') || raw.includes('गेहूं')) {
    entities.crop = 'Rabi Wheat (PBW 550)';
  } else if (q.includes('soybean') || q.includes('soya') || raw.includes('सोया')) {
    entities.crop = 'Soybean (JS 335)';
  } else if (q.includes('onion') || q.includes('pyaz') || raw.includes('प्याज')) {
    entities.crop = 'Onion';
  } else if (q.includes('cotton') || q.includes('kapas') || raw.includes('कपास')) {
    entities.crop = 'Bt Cotton';
  } else if (q.includes('pulse') || q.includes('tur') || q.includes('arhar')) {
    entities.crop = 'Pigeon Pea (Tur/Arhar)';
  }

  // Hazard detection
  if (q.includes('rain') || q.includes('precipitation') || q.includes('barish') || q.includes('flood') || q.includes('waterlog') || raw.includes('बारिश') || raw.includes('बाढ़')) {
    entities.hazard = 'Extreme Precipitation & Submergence';
  } else if (q.includes('heat') || q.includes('temperature') || q.includes('garmi') || q.includes('steril') || raw.includes('गर्मी') || raw.includes('लू')) {
    entities.hazard = 'Canopy Heat Stress (GDD > 35°C)';
  } else if (q.includes('wind') || q.includes('cyclone') || q.includes('gale') || q.includes('hawa') || q.includes('lodg') || raw.includes('चक्रवात') || raw.includes('आंधी')) {
    entities.hazard = 'Gale Wind Gusts & Stem Lodging';
  } else if (q.includes('drought') || q.includes('deficit') || q.includes('dry') || raw.includes('सूखा')) {
    entities.hazard = 'Root Zone Moisture Deficit / Drought';
  } else {
    entities.hazard = 'Compound Atmospheric Perturbation';
  }

  // Horizon detection
  if (q.includes('24h') || q.includes('tomorrow') || q.includes('kal')) {
    entities.horizon = '+24 Hours';
  } else if (q.includes('48h') || q.includes('48 hours') || q.includes('2 din')) {
    entities.horizon = '+48 Hours';
  } else if (q.includes('72h') || q.includes('72 hours') || q.includes('3 din')) {
    entities.horizon = '+72 Hours';
  } else if (q.includes('10 din') || q.includes('10 day') || q.includes('week') || q.includes('hafte')) {
    entities.horizon = '+10 Days';
  } else if (q.includes('season') || q.includes('mausam')) {
    entities.horizon = 'Seasonal (90d)';
  } else {
    entities.horizon = '+72 Hours (Default)';
  }

  // 2. Dynamic Module Planning Cascade based on mode and entities
  const activatedModules: ActivatedModuleStep[] = [];
  let executiveSummary = '';
  let executiveSummaryHi = '';
  const biophysicalDrivers: string[] = [];
  const suggestedFollowUps: string[] = [];
  let targetModuleLaunch = { moduleNumber: 6, port: 3006, actionName: 'Inspect Probability Field' };

  if (mode === 'SIMULATE' || q.includes('what if') || q.includes('agar') || q.includes('higher') || q.includes('lower') || q.includes('scenario')) {
    // Mode: SIMULATE (Counterfactuals -> M7 + M10 + M18)
    activatedModules.push(
      {
        moduleNumber: 7,
        moduleName: 'Probabilistic Downscaling',
        shortRole: 'Orographic terrain boundary layer',
        port: 3007,
        routeUrl: 'http://localhost:3007',
        status: 'RESOLVED',
        metricOutput: '5km Field Resampling'
      },
      {
        moduleNumber: 10,
        moduleName: 'Living Phenology',
        shortRole: 'Sowing date thermal alignment',
        port: 3010,
        routeUrl: 'http://localhost:3010',
        status: 'RESOLVED',
        metricOutput: 'Panicle Initiation Stage'
      },
      {
        moduleNumber: 11,
        moduleName: 'SWAT 3-Tier Hydrology',
        shortRole: 'Unsaturated hydraulic conductivity balance',
        port: 3011,
        routeUrl: 'http://localhost:3011',
        status: 'RESOLVED',
        metricOutput: 'Perched Table at 0.82m'
      },
      {
        moduleNumber: 18,
        moduleName: 'Counterfactual Decision Simulator',
        shortRole: 'Coupled Hydro-Thermal-Market Simulator',
        port: 3018,
        routeUrl: 'http://localhost:3018',
        status: 'RESOLVED',
        metricOutput: 'Δ Deficit: -3.76 LMT | Modal Price: ₹2,315/qtl'
      }
    );

    executiveSummary = `If rainfall runs 20% higher than expected in ${entities.location}, standing water can spread across paddy fields and mandi arrivals may fall. This is a what-if, not a forecast of loss.`;
    executiveSummaryHi = `${entities.location} में अगर बारिश अनुमान से 20% ज्यादा हुई, तो धान के खेतों में पानी खड़ा रह सकता है और मंडी में सामान कम आ सकता है। यह “अगर ऐसा हो तो” है — नुकसान पक्का नहीं।`;
    biophysicalDrivers.push(
      'Sluice gate drainage capacity bottleneck in Kendrapara and Puri coastal flap gates.',
      'Anthesis window vulnerability: submergence duration > 48h triggering floret abortion.',
      'Wholesale arrival deficit of -14.2% cushioned by 40,000 MT strategic warehouse buffer deployment.'
    );
    suggestedFollowUps.push(
      'What if sluice drainage speed is increased to 90%?',
      'Compare this scenario against the historical 2019 Fani benchmark.',
      'Show the multi-scenario comparison drawer.'
    );
    targetModuleLaunch = { moduleNumber: 18, port: 3018, actionName: 'Launch Module 18 Scenario Engine' };

  } else if (entities.crop || q.includes('crop') || q.includes('yield') || q.includes('fasal') || q.includes('kisan')) {
    // Mode: AGRONOMIC IMPACT (M3 -> M9 -> M10 -> M11 -> M13 -> M15)
    activatedModules.push(
      {
        moduleNumber: 3,
        moduleName: 'Extreme Anomaly Engine',
        shortRole: 'Quantile precipitation exceedance',
        port: 3003,
        routeUrl: 'http://localhost:3003',
        status: 'RESOLVED',
        metricOutput: 'EFI = +0.86 (> P95)'
      },
      {
        moduleNumber: 9,
        moduleName: 'Crop Exposure Engine',
        shortRole: 'Geospatial acreage intersection (Exposure ≠ Loss)',
        port: 3009,
        routeUrl: 'http://localhost:3009',
        status: 'RESOLVED',
        metricOutput: '342,400 ha Exposed (30.8%)'
      },
      {
        moduleNumber: 10,
        moduleName: 'Phenology & Growth Stage',
        shortRole: 'CSM-CERES-Rice anthesis vulnerability clock',
        port: 3010,
        routeUrl: 'http://localhost:3010',
        status: 'RESOLVED',
        metricOutput: 'Floret Sterility Risk: 12.4%'
      },
      {
        moduleNumber: 11,
        moduleName: 'Soil & Water Balance',
        shortRole: 'SWAT 3-tier root zone hypoxia duration',
        port: 3011,
        routeUrl: 'http://localhost:3011',
        status: 'RESOLVED',
        metricOutput: '44.5% Saturation (Hypoxia 42h)'
      },
      {
        moduleNumber: 13,
        moduleName: 'Quantile Yield Risk',
        shortRole: 'Skew-t continuous probability distribution',
        port: 3013,
        routeUrl: 'http://localhost:3013',
        status: 'RESOLVED',
        metricOutput: 'P50 Yield: 3.12 t/ha (P10: 2.45 t/ha)'
      },
      {
        moduleNumber: 15,
        moduleName: 'Mandi Market Intelligence',
        shortRole: 'Arrival elasticity & wholesale price spread',
        port: 3015,
        routeUrl: 'http://localhost:3015',
        status: 'RESOLVED',
        metricOutput: 'Modal Price: ₹2,315/qtl (+6.0%)'
      }
    );

    executiveSummary = `${entities.crop || 'The crop'} in ${entities.location} is in the weather’s path over ${entities.horizon}. Not all of that area is lost — flowering stages are the sensitive ones. Open the crop engine to see what to do.`;
    executiveSummaryHi = `${entities.location} में ${entities.crop || 'फसल'} ${entities.horizon} में मौसम की चपेट में है। सारी फसल बर्बाद नहीं मानी गई — फूल आने की अवस्था सबसे संवेदनशील है। सलाह के लिए फसल इंजन खोलें।`;
    biophysicalDrivers.push(
      'Phenological stage: Crop is in Panicle Initiation / Anthesis — highly sensitive to root oxygen starvation.',
      'Topsoil saturation at 44.5% with perched water table depth at 0.82m.',
      'Downside risk of breaching farmer breakeven yield (2.80 t/ha) is currently 18.2%.'
    );
    suggestedFollowUps.push(
      'Which crop cultivars offer highest flood tolerance?',
      'How will mandi wholesale prices respond in Cuttack and Berhampur?',
      'Inspect 3D soil water profile.'
    );
    targetModuleLaunch = { moduleNumber: 10, port: 3010, actionName: 'Open Module 10 Phenology View' };

  } else {
    // Mode: WEATHER & EXTREME EVENT TRACKING (M1 -> M3 -> M4 -> M5 -> M6)
    activatedModules.push(
      {
        moduleNumber: 1,
        moduleName: 'Planetary 4D Telemetry',
        shortRole: '5D NCUM/NEPS tensor ingestion',
        port: 3001,
        routeUrl: 'http://localhost:3001',
        status: 'RESOLVED',
        metricOutput: '850 hPa Moisture Convergence'
      },
      {
        moduleNumber: 3,
        moduleName: 'Climatological Anomaly',
        shortRole: '30-year normal exceedance calculation',
        port: 3003,
        routeUrl: 'http://localhost:3003',
        status: 'RESOLVED',
        metricOutput: 'EFI = +0.89 Extreme'
      },
      {
        moduleNumber: 4,
        moduleName: 'Dynamic Event Footprint',
        shortRole: 'Bounding-box adaptive isolation',
        port: 3004,
        routeUrl: 'http://localhost:3004',
        status: 'RESOLVED',
        metricOutput: 'Spatial IoU = 0.84'
      },
      {
        moduleNumber: 5,
        moduleName: 'Spherical Temporal GNN',
        shortRole: 'Icosahedral mesh trajectory solver',
        port: 3005,
        routeUrl: 'http://localhost:3005',
        status: 'RESOLVED',
        metricOutput: 'Coastward Track (32 km/h)'
      },
      {
        moduleNumber: 6,
        moduleName: 'Ensemble Probability Field',
        shortRole: '50-member probability surface',
        port: 3006,
        routeUrl: 'http://localhost:3006',
        status: 'RESOLVED',
        metricOutput: '78% Probability (+48h)'
      }
    );

    executiveSummary = `${entities.location} may see heavy rain or strong wind over ${entities.horizon}. Low-lying coastal blocks should prepare now. Open the rain-chance map, then the village map.`;
    executiveSummaryHi = `${entities.location} में ${entities.horizon} भारी बारिश या तेज़ हवा आ सकती है। निचले तटीय इलाके अभी से तैयार रहें। पहले बारिश की संभावना देखें, फिर गाँव वाला नक्शा।`;
    biophysicalDrivers.push(
      'Strong boundary layer moisture convergence from southern Bay of Bengal.',
      'Low vertical wind shear (< 10 kts) favoring rapid convective organization.',
      'Meso-gamma downscaling indicates coastal orographic enhancement along Puri–Kendrapara ridge.'
    );
    suggestedFollowUps.push(
      'Show 12km to 5km diffusion downscaled comparison.',
      'What is the projected agricultural exposure footprint?',
      'Track ensemble members spread.'
    );
    targetModuleLaunch = { moduleNumber: 6, port: 3006, actionName: 'Open Module 6 Probability Map' };
  }

  return {
    queryId: `QRY-${Date.now().toString(36).toUpperCase()}`,
    rawQuery,
    mode,
    entities,
    activatedModules,
    executiveSummary,
    executiveSummaryHi,
    biophysicalDrivers,
    suggestedFollowUps,
    targetModuleLaunch
  };
}
