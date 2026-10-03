'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Dedicated Bespoke Scientific Simulators for Modules 2 through 18
// Renders tailored, interactive high-fidelity visualizations for each module's
// specific scientific domain (Boundary Layer, EFI, Satellite, Radar, Downscaling,
// Soil, Phenology, Hydrology, Yield, Pest, Mandi, DAG, Deficit, Scenario AI).
// Whisper-quiet, thermal-optimized with pure SVG & CSS rendering (0 CPU burn).
// ============================================================================

import React, { useState } from 'react';
import {
  Activity,
  Layers,
  CloudRain,
  Wind,
  Droplets,
  AlertTriangle,
  Store,
  TrendingUp,
  Compass,
  Radio,
  Sliders,
  CheckCircle2,
  Box,
  Truck,
  RotateCcw,
  Sparkles,
  BarChart3,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Bug,
  Thermometer,
  Trees,
  Scale,
  MapPin,
  Maximize2
} from 'lucide-react';

interface DedicatedModuleSimulatorProps {
  moduleNumber: number;
  title: string;
  category?: string;
  basin: {
    id: string;
    nameEn: string;
    nameHi: string;
    coords: string;
    hazardEn: string;
    hazardHi: string;
    soilTypeEn: string;
    soilTypeHi: string;
  };
  horizon: string;
  locale: 'en' | 'hi';
  realtimeData: any;
  port?: number;
}

export default function DedicatedModuleSimulator({
  moduleNumber,
  title,
  category,
  basin,
  horizon,
  locale,
  realtimeData,
  port
}: DedicatedModuleSimulatorProps) {
  const isHi = locale === 'hi';
  const locName = isHi ? basin.nameHi : basin.nameEn;

  // Interactive states for different modules
  const [m02Altitude, setM02Altitude] = useState<number>(620);
  const [m03Percentile, setM03Percentile] = useState<number>(95);
  const [m04TimeStep, setM04TimeStep] = useState<number>(48);
  const [m05MemberFilter, setM05MemberFilter] = useState<'all' | 'extreme' | 'mean'>('all');
  const [m06Threshold, setM06Threshold] = useState<'p50' | 'p75' | 'p90'>('p75');
  const [m07CurtainPos, setM07CurtainPos] = useState<number>(55);
  const [m08Metric, setM08Metric] = useState<'csi' | 'crps' | 'sed'>('csi');
  const [m09SelectedCrop, setM09SelectedCrop] = useState<'paddy' | 'mustard' | 'pulses' | 'soybean'>('paddy');
  const [m10Stage, setM10Stage] = useState<'vegetative' | 'flowering' | 'grain' | 'maturity'>('flowering');
  const [m11Depth, setM11Depth] = useState<number>(30);
  const [m12CropRank, setM12CropRank] = useState<'mustard' | 'chana' | 'wheat'>('mustard');
  const [m13Confidence, setM13Confidence] = useState<'p10' | 'p50' | 'p90'>('p50');
  const [m14Pathogen, setM14Pathogen] = useState<'blast' | 'hopper' | 'blight'>('blast');
  const [m15Commodity, setM15Commodity] = useState<'wheat' | 'onion' | 'paddy' | 'mustard'>('wheat');
  const [m16ActiveNode, setM16ActiveNode] = useState<number>(3);
  const [m17District, setM17District] = useState<'balasore' | 'cuttack' | 'bhubaneswar'>('balasore');
  const [m18RainDelta, setM18RainDelta] = useState<number>(20);
  const [m18BufferRelease, setM18BufferRelease] = useState<boolean>(true);

  // Common Header Pill
  const renderHeader = (domainLabelEn: string, domainLabelHi: string, icon: React.ReactNode) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '14px 18px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.02em' }}>
            ENGINE M{moduleNumber < 10 ? `0${moduleNumber}` : moduleNumber} · {isHi ? domainLabelHi : domainLabelEn}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
            {locName} ({basin.coords}) · {horizon} Lead · Port :{port}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            padding: '3px 9px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}
        >
          {isHi ? 'कैलिब्रेटेड मॉडल सक्रिय' : 'CALIBRATED SIMULATOR'}
        </span>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // MODULE 2: BOUNDARY LAYER & CLOUD INVERSION
  // --------------------------------------------------------------------------
  if (moduleNumber === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Atmospheric Boundary Layer & Cloud Inversion', 'वायुमंडलीय सीमा परत व बादल व्युत्क्रमण', <Layers className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'ऊँचाई प्रोफाइल व तापमान व्युत्क्रमण (0–3000m)' : 'Vertical Altitude Profile & Temperature Inversion (0–3000m)'}
              </span>
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
                Inversion Ceiling: <strong style={{ color: '#EF4444' }}>{m02Altitude}m AGL</strong>
              </span>
            </div>

            {/* Skew-T Sounding Profile SVG */}
            <div style={{ height: '220px', width: '100%', position: 'relative' }}>
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                <line x1="50" y1="180" x2="550" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Inversion Layer band */}
                <rect x="50" y={180 - (m02Altitude / 3000) * 160} width="500" height="24" fill="rgba(239, 68, 68, 0.18)" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="4 4" />
                <text x="440" y={196 - (m02Altitude / 3000) * 160} fill="#EF4444" fontSize="10" fontFamily="monospace">{m02Altitude}m (Cloud Inversion Cap)</text>

                {/* Temperature curve */}
                <path d="M 120 180 Q 240 140 280 120 T 360 80 T 440 20" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                {/* Dewpoint curve */}
                <path d="M 100 180 Q 200 135 270 120 T 310 80 T 350 20" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5 3" />

                <text x="60" y="35" fill="#F59E0B" fontSize="10" fontFamily="monospace">Temperature T(z)</text>
                <text x="60" y="52" fill="#38BDF8" fontSize="10" fontFamily="monospace">Dewpoint Td(z)</text>
              </svg>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'ऊँचाई स्क्रबर:' : 'Probe Altitude:'}</span>
              <input
                type="range"
                min="200"
                max="2400"
                value={m02Altitude}
                onChange={(e) => setM02Altitude(parseInt(e.target.value, 10))}
                style={{ flex: 1, accentColor: '#38BDF8', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>TURBULENT KINETIC ENERGY (TKE)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>0.42 m²/s²</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Damped turbulence within surface interface</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>OPTICAL DEPTH (RAYLEIGH)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>τ = 4.8 Dense</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Solar insolation attenuated by 72%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 3: EXTREME ANOMALY DETECTION (EFI)
  // --------------------------------------------------------------------------
  if (moduleNumber === 3) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Extreme Forecast Index (EFI) Anomaly Detection', 'चरम विसंगति सूचकांक (EFI) व अभिसरण', <AlertTriangle className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444' }}>
                {isHi ? 'जलवायु वितरण बनाम चालू पूर्वानुमान (EFI = +0.89)' : 'M-Climate Climatology vs Current Ensemble (EFI = +0.89)'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                {isHi ? 'P95 सीमा पार' : 'EXCEEDS P95 THRESHOLD'}
              </span>
            </div>

            {/* Distribution Curve SVG */}
            <div style={{ height: '200px', width: '100%' }}>
              <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%' }}>
                {/* Climatological normal bell curve */}
                <path d="M 40 160 Q 200 160 250 40 Q 300 160 460 160" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
                <text x="180" y="30" fill="#94A3B8" fontSize="10" fontFamily="monospace">30-Yr Climate Normal</text>

                {/* Shifted Ensemble Curve (Extreme tail) */}
                <path d="M 120 160 Q 340 160 400 25 Q 460 160 560 160" fill="none" stroke="#EF4444" strokeWidth="3" />
                {/* Shaded Extreme Tail */}
                <path d="M 430 160 Q 460 160 560 160 L 430 160 Z" fill="rgba(239, 68, 68, 0.35)" />

                {/* P95 Line */}
                <line x1="420" y1="20" x2="420" y2="160" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />
                <text x="425" y="45" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">P95 Climatological Cutoff</text>
                <line x1="30" y1="160" x2="570" y2="160" stroke="rgba(255,255,255,0.15)" />
              </svg>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'चरम सीमा फिल्टर:' : 'Tail Percentile Cutoff:'}</span>
              {[90, 95, 99].map((p) => (
                <button
                  key={p}
                  onClick={() => setM03Percentile(p)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    backgroundColor: m03Percentile === p ? '#EF4444' : '#1A2230',
                    color: m03Percentile === p ? '#FFFFFF' : '#94A3B8',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  P{p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>EFI SHIFT MAGNITUDE</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>+0.89 Index</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Standard deviations above regional normal: +4.2σ</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>ACTIVE ALERT CELLS</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>148 NWP Voxels</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Concentrated along coastal Balasore & Bhadrak</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 4: DYNAMIC HAZARD FOOTPRINT (GNN POLYGON)
  // --------------------------------------------------------------------------
  if (moduleNumber === 4) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Dynamic Hazard Footprint (GNN Dynamic Polygon)', 'गतिशील खतरा पदचिह्न (GNN बहुभुज सीमा)', <Compass className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'समय के साथ फैलता GNN बहुभुज पदचिह्न' : 'Spatio-Temporal Deforming Bounding Polygon'}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#38BDF8' }}>
                Expansion Rate: <strong>+34 km/h</strong>
              </span>
            </div>

            {/* Radar Polygon Canvas SVG */}
            <div style={{ height: '220px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                {/* Concentric distance rings */}
                {[40, 70, 100].map((r) => (
                  <circle key={r} cx="300" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                ))}
                {/* Coastal orientation line */}
                <path d="M 120 180 Q 240 120 300 90 T 480 30" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x="490" y="35" fill="rgba(56, 189, 248, 0.6)" fontSize="9" fontFamily="monospace">Odisha Coastline</text>

                {/* Dynamic Polygon that scales with m04TimeStep */}
                {(() => {
                  const scale = m04TimeStep / 48;
                  const pts = `
                    ${300 - 90 * scale},${100 - 50 * scale}
                    ${300 + 40 * scale},${100 - 75 * scale}
                    ${300 + 120 * scale},${100 - 10 * scale}
                    ${300 + 80 * scale},${100 + 60 * scale}
                    ${300 - 50 * scale},${100 + 70 * scale}
                  `;
                  return (
                    <polygon
                      points={pts}
                      fill="rgba(239, 68, 68, 0.22)"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Vortex eye */}
                <circle cx="300" cy="100" r="4" fill="#F59E0B" />
                <text x="310" y="104" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">Vortex Core</text>
              </svg>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'समय अग्रिम:' : 'Timeline Step:'}</span>
              {[24, 48, 72].map((t) => (
                <button
                  key={t}
                  onClick={() => setM04TimeStep(t)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    backgroundColor: m04TimeStep === t ? '#38BDF8' : '#1A2230',
                    color: m04TimeStep === t ? '#07090E' : '#94A3B8',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  T+{t}h
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>POLYGON FOOTPRINT AREA</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>
                {Math.round(48200 * (m04TimeStep / 48))} km²
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Spanning 7 coastal districts</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>GNN VERTEX UNCERTAINTY</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>±6.4 km Bounding</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Graph Neural Network edge cohesion 94.2%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 5: STORM TRAJECTORY & ENSEMBLE SPAGHETTI
  // --------------------------------------------------------------------------
  if (moduleNumber === 5) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Event Trajectory & Ensemble Spaghetti Tracking', 'तूफान प्रक्षेपवक्र व एन्सेम्बल पाथ ट्रैकर', <Wind className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? '10-सदस्यीय NEPS-G एन्सेम्बल पाथ (स्पैगेटी स्ट्रैंड्स)' : '10-Member Ensemble Trajectory Strands (Landfall Corridor)'}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#F59E0B' }}>
                Landfall Target: <strong>Puri–Paradip Delta</strong>
              </span>
            </div>

            {/* Spaghetti Trajectories SVG */}
            <div style={{ height: '220px', width: '100%' }}>
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                {/* Coastal boundary */}
                <path d="M 80 190 Q 200 130 280 90 T 520 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <text x="100" y="185" fill="#94A3B8" fontSize="10" fontFamily="monospace">Odisha Delta Coastline</text>

                {/* 10 Spaghetti strands */}
                {[
                  { d: "M 480 180 Q 400 140 330 110 T 260 85", col: "rgba(56,189,248,0.4)" },
                  { d: "M 480 180 Q 410 145 340 105 T 270 80", col: "rgba(56,189,248,0.4)" },
                  { d: "M 480 180 Q 420 150 350 120 T 290 95", col: "rgba(56,189,248,0.4)" },
                  { d: "M 480 180 Q 390 135 320 100 T 240 70", col: "rgba(239,68,68,0.6)" }, // outlier
                  { d: "M 480 180 Q 430 160 360 130 T 310 105", col: "rgba(56,189,248,0.4)" },
                  { d: "M 480 180 Q 405 138 335 108 T 265 82", col: "rgba(56,189,248,0.4)" },
                ].map((s, i) => (
                  <path key={i} d={s.d} fill="none" stroke={s.col} strokeWidth="1.8" />
                ))}

                {/* Ensemble Mean Path (Bold) */}
                <path d="M 480 180 Q 405 142 335 110 T 265 83" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
                
                {/* Landfall point marker */}
                <circle cx="265" cy="83" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                <text x="220" y="70" fill="#EF4444" fontSize="11" fontWeight="bold" fontFamily="monospace">Landfall T+72h</text>

                {/* Origin point */}
                <circle cx="480" cy="180" r="4" fill="#38BDF8" />
                <text x="490" y="184" fill="#38BDF8" fontSize="9" fontFamily="monospace">T+0 (Bay of Bengal)</text>
              </svg>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CENTRAL PRESSURE DROP</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>982 hPa (-24 hPa)</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Rapid cyclonic deepening detected</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>LANDFALL CONE DISPERSION</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>±32 km Spread</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>High agreement across 8 of 10 members</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 6: ENSEMBLE PROBABILITY FIELD
  // --------------------------------------------------------------------------
  if (moduleNumber === 6) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Ensemble Hazard Probability Field', 'संभाव्यता क्षेत्र व आइसोप्रेसीपिटेशन रूपरेखा', <BarChart3 className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'वर्षा सीमा पार करने की प्रायिकता (P > 100mm/24h)' : 'Exceedance Probability Isolines (P > 100mm/24h)'}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10B981' }}>
                Peak Exceedance: <strong>94% Probability</strong>
              </span>
            </div>

            {/* Probability Iso-contours SVG */}
            <div style={{ height: '220px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                {/* 30% outer contour */}
                <ellipse cx="300" cy="100" rx="220" ry="80" fill="rgba(56, 189, 248, 0.1)" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
                <text x="110" y="95" fill="#38BDF8" fontSize="10" fontFamily="monospace">30% Isoline</text>

                {/* 50% contour */}
                <ellipse cx="310" cy="100" rx="160" ry="60" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" strokeWidth="1.5" />
                <text x="180" y="95" fill="#F59E0B" fontSize="10" fontFamily="monospace">50% Isoline</text>

                {/* 75% contour */}
                <ellipse cx="320" cy="100" rx="100" ry="40" fill="rgba(239, 68, 68, 0.22)" stroke="#EF4444" strokeWidth="2" />
                <text x="245" y="95" fill="#EF4444" fontSize="10" fontFamily="monospace">75% Core</text>

                {/* 90% Bullseye */}
                <ellipse cx="330" cy="100" rx="45" ry="20" fill="rgba(239, 68, 68, 0.5)" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="315" y="104" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">90%+</text>
              </svg>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'प्रायिकता स्तर:' : 'Confidence Filter:'}</span>
              {(['p50', 'p75', 'p90'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setM06Threshold(t)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    backgroundColor: m06Threshold === t ? '#38BDF8' : '#1A2230',
                    color: m06Threshold === t ? '#07090E' : '#94A3B8',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t.toUpperCase()} ({t === 'p50' ? '50%' : t === 'p75' ? '75%' : '90%'})
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CALIBRATED BRIER SCORE</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>0.082 (Optimal)</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Sharp probabilistic calibration against radar</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>EXCEEDANCE POPULATION</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>3.4 Million</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Citizens within 75%+ inundation zone</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 7: HIGH-RES DOWNSCALING (12KM -> 1KM)
  // --------------------------------------------------------------------------
  if (moduleNumber === 7) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('12km → 1km High-Resolution Diffusion Downscaling', '12किमी से 1किमी सुपर-रिज़ॉल्यूशन डाउनस्केलिंग', <Maximize2 className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'मोटा 12km NWP ग्रिड बनाम 1km डिफ्यूज़न एआई (स्लाइडर खिसकाएँ)' : 'Coarse 12km NWP vs 1km Diffusion AI Mesh (Drag Curtain)'}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10B981' }}>
                Resolution: <strong>144x Spatial Multiplier</strong>
              </span>
            </div>

            {/* Interactive Split Curtain SVG */}
            <div style={{ height: '220px', width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '10px', backgroundColor: '#0A0F1D' }}>
              <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%' }}>
                {/* Left Side: Pixelated 12km Blocks */}
                <g>
                  {[0, 1, 2, 3, 4, 5].map((col) =>
                    [0, 1, 2].map((row) => (
                      <rect
                        key={`${col}-${row}`}
                        x={col * 100}
                        y={row * 70}
                        width="96"
                        height="66"
                        fill={`rgba(56, 189, 248, ${0.1 + (col + row) * 0.05})`}
                        stroke="rgba(255,255,255,0.08)"
                      />
                    ))
                  )}
                  <text x="30" y="30" fill="#94A3B8" fontSize="11" fontFamily="monospace">COARSE 12km GRID (BLURRED)</text>
                </g>

                {/* Right Side: Smooth 1km Diffusion Contours (Clipped by m07CurtainPos) */}
                <clipPath id="curtainClip">
                  <rect x={(m07CurtainPos / 100) * 600} y="0" width={600 - (m07CurtainPos / 100) * 600} height="200" />
                </clipPath>
                <g clipPath="url(#curtainClip)">
                  <rect x="0" y="0" width="600" height="200" fill="#0C1427" />
                  <path d="M 0 140 Q 150 40 300 120 T 600 60" fill="none" stroke="#10B981" strokeWidth="3" />
                  <path d="M 0 160 Q 200 60 380 140 T 600 90" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                  <path d="M 0 180 Q 240 90 420 160 T 600 130" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="450" cy="80" r="14" fill="rgba(239, 68, 68, 0.4)" stroke="#EF4444" strokeWidth="2" />
                  <text x="470" y="85" fill="#EF4444" fontSize="10" fontWeight="bold" fontFamily="monospace">1km Local Micro-Peak</text>
                  <text x="380" y="30" fill="#10B981" fontSize="11" fontFamily="monospace">FINE 1km DIFFUSION MESH</text>
                </g>

                {/* Vertical Curtain Divider Line */}
                <line
                  x1={(m07CurtainPos / 100) * 600}
                  y1="0"
                  x2={(m07CurtainPos / 100) * 600}
                  y2="200"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{isHi ? 'पर्दा खिसकाएँ:' : 'Curtain Position:'}</span>
              <input
                type="range"
                min="10"
                max="90"
                value={m07CurtainPos}
                onChange={(e) => setM07CurtainPos(parseInt(e.target.value, 10))}
                style={{ flex: 1, accentColor: '#38BDF8', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#38BDF8' }}>{m07CurtainPos}%</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>PEAK LOCALIZED RAIN DETECTION</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>82 mm/h Core</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Averaged out to only 28 mm/h in 12km models</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>OROGRAPHIC GRADIENT FIDELITY</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>96.4% Structural Sim</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Topographic wind channeling captured</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 8: EXTREME-PRESERVATION EVALUATION & BENCHMARK
  // --------------------------------------------------------------------------
  if (moduleNumber === 8) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Extreme-Preservation Evaluation & Benchmark', 'चरम-संरक्षण सत्यापन व तुलनात्मक बेंचमार्क', <Scale className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? '4-मॉडल तुलना: कच्चा NWP vs बाईलिनियर vs 4D डिफ्यूज़न vs ग्राउंड ट्रुथ' : '4-Panel Comparison: Coarse NWP vs Bilinear vs 4D Diffusion vs Ground Truth'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontWeight: 700 }}>
                CSI: 0.74 (LEADER)
              </span>
            </div>

            {/* 4 Quadrants Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#0C111C', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>1. COARSE NWP (12KM)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#94A3B8', marginTop: '4px' }}>Peak: 38 mm/h</div>
                <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '2px' }}>Underestimates peak deluge by 54%</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#0C111C', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>2. BILINEAR INTERPOLATION</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>Peak: 42 mm/h</div>
                <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '2px' }}>Over-smooths variance; drops tail peaks</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#0C1A2E', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                <div style={{ fontSize: '11px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: 700 }}>3. 4D DIFFUSION (OURS)</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>Peak: 82 mm/h</div>
                <div style={{ fontSize: '11px', color: '#10B981', marginTop: '2px' }}>Preserves extreme tail + spectral density</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#0F1A15', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                <div style={{ fontSize: '11px', color: '#10B981', fontFamily: 'monospace', fontWeight: 700 }}>4. IN-SITU RADAR TRUTH</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>Peak: 84 mm/h</div>
                <div style={{ fontSize: '11px', color: '#10B981', marginTop: '2px' }}>Doppler radar ground verification</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CRITICAL SUCCESS INDEX (CSI)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>0.74 vs 0.42 Baseline</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>+76% improvement in extreme hit rate</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CONTINUOUS RANKED PROB (CRPS)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>1.18 mm (Optimal)</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Significantly tighter forecast spread</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 9: CROP EXPOSURE GEOSPATIAL INTERSECTION
  // --------------------------------------------------------------------------
  if (moduleNumber === 9) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Crop Exposure Geospatial Intersection Layer', 'फसल भूस्थानिक जोखिम व क्षेत्रफल चौराहा', <Trees className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'फसल चुनें:' : 'Select Crop Belt:'}</span>
            {(['paddy', 'mustard', 'pulses', 'soybean'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setM09SelectedCrop(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m09SelectedCrop === c ? '#10B981' : '#121826',
                  color: m09SelectedCrop === c ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#10B981' }}>
                {isHi ? 'जिलावार फसल जोखिम व जलमग्न क्षेत्रफल (हेक्टेयर)' : 'District-Wise Crop Inundation Exposure Breakdown'}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#EF4444' }}>
                Total Exposed: <strong>118,400 Hectares</strong>
              </span>
            </div>

            {/* Exposure Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { district: 'Balasore Coastal Delta', ha: 42000, pct: 85, level: 'CRITICAL' },
                { district: 'Bhadrak Low-Lying Basin', ha: 34000, pct: 72, level: 'HIGH' },
                { district: 'Kendrapara Estuary', ha: 26400, pct: 60, level: 'MODERATE' },
                { district: 'Jagatsinghpur Alluvial', ha: 16000, pct: 45, level: 'MODERATE' }
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#F8FAFC', fontWeight: 600 }}>{d.district}</span>
                    <span style={{ color: '#EF4444', fontFamily: 'monospace', fontWeight: 700 }}>{d.ha.toLocaleString()} ha ({d.level})</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', backgroundColor: d.pct > 75 ? '#EF4444' : d.pct > 50 ? '#F59E0B' : '#10B981', borderRadius: '9999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>REGIONAL HARVEST VALUE AT RISK</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>₹168.2 Crores</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Calculated at MSP ₹2,183/qtl base</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>STAND DENSITY LOSS RATIO</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>38.4% Lodging</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Stem collapse from 42m/s coastal gusts</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 10: CROP GROWTH STAGE VULNERABILITY (PHENOLOGY)
  // --------------------------------------------------------------------------
  if (moduleNumber === 10) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Crop Phenology & Growth Stage Vulnerability', 'फसल विकास चरण व संवेदनशीलता विश्लेषण', <Thermometer className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Stage Selector */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'विकास चरण:' : 'Phenology Stage:'}</span>
            {[
              { id: 'vegetative', labelEn: '1. Vegetative', labelHi: '1. वानस्पतिक' },
              { id: 'flowering', labelEn: '2. Flowering / Anthesis', labelHi: '2. फूल आना (अति-संवेदनशील)' },
              { id: 'grain', labelEn: '3. Grain Filling', labelHi: '3. दाना भराव' },
              { id: 'maturity', labelEn: '4. Physiological Maturity', labelHi: '4. परिपक्वता' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setM10Stage(s.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  backgroundColor: m10Stage === s.id ? '#F59E0B' : '#121826',
                  color: m10Stage === s.id ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {isHi ? s.labelHi : s.labelEn}
              </button>
            ))}
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>
                {isHi ? 'चरणवार तापमान व जलभराव संवेदनशीलता' : 'Stage-Specific Stress Sensitivity Coefficient'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: m10Stage === 'flowering' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: m10Stage === 'flowering' ? '#EF4444' : '#10B981', fontWeight: 700 }}>
                {m10Stage === 'flowering' ? '⚠️ MAXIMUM VULNERABILITY' : 'MODERATE TOLERANCE'}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6, padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.03)' }}>
              {m10Stage === 'vegetative' && 'Canopy recovery potential is high. Submergence under 48 hours results in minimal permanent stand loss.'}
              {m10Stage === 'flowering' && 'CRITICAL DANGER: Pollen sterility occurs within 4 hours if temperature exceeds 35°C or panicle submergence occurs. Irreversible -18.2% yield loss penalty triggered.'}
              {m10Stage === 'grain' && 'Grain shriveling risk from interrupted assimilate transport. 1000-grain weight reduced by 12% under prolonged root hypoxia.'}
              {m10Stage === 'maturity' && 'Crop lodging causes grain shattering and in-situ sprouting if standing water persists beyond 24 hours.'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>GROWING DEGREE DAYS (GDD)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>1,240 °C-days</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>+4 days ahead of seasonal phenology clock</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>POLLEN VIABILITY INDEX</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: m10Stage === 'flowering' ? '#EF4444' : '#10B981', marginTop: '4px' }}>
                {m10Stage === 'flowering' ? '52% Suppressed' : '91% Optimal'}
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Severe spikelet sterility under current storm</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 11: WATER & SOIL INTELLIGENCE
  // --------------------------------------------------------------------------
  if (moduleNumber === 11) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Water & Soil Dynamics (Root-Zone Hydrology)', 'जल व मृदा गतिकी (जड़ क्षेत्र नमी संतृप्ति)', <Droplets className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'मृदा गहराई स्तर (0–100cm) व संतृप्ति प्रोफाइल' : 'Volumetric Soil Moisture Gradient (0–100 cm Profile)'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                ⚠️ 92% ROOT SATURATION (ANOXIC)
              </span>
            </div>

            {/* Vertical Soil Layer Graphic */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { layer: 'Surface Layer (0–10 cm)', val: '98% Saturated', col: '#EF4444', note: 'Active surface ponding / Runoff' },
                { layer: 'Root Zone (10–40 cm)', val: '92% Saturated', col: '#EF4444', note: 'Root-zone hypoxia; nutrient uptake halt' },
                { layer: 'Subsoil Horizon (40–100 cm)', val: '74% Field Capacity', col: '#38BDF8', note: 'Percolation ceiling reached' }
              ].map((l, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: '#0A0F1D', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{l.layer}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{l.note}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: l.col, fontFamily: 'monospace' }}>{l.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>EVAPOTRANSPIRATION DEFICIT</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>-0 mm (Zero Deficit)</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Massive water surplus over 7-day window</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>INFILTRATION RATE</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>0.2 mm/h (Depleted)</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Soil pore volume completely locked</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 12: EXPLAINABLE CROP SCENARIO (KRISHI.AI SHAP)
  // --------------------------------------------------------------------------
  if (moduleNumber === 12) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Explainable Crop Recommendation (KRISHI.AI SHAP)', 'व्याख्यात्मक फसल अनुशंसा व SHAP श्रेय', <Sparkles className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8' }}>
                {isHi ? 'TreeSHAP वॉटरफॉल चार्ट: अनुशंसा के पीछे का वैज्ञानिक कारण' : 'TreeSHAP Waterfall Feature Contributions (Why this crop?)'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontWeight: 700 }}>
                EXPLAINABLE AI ACTIVE
              </span>
            </div>

            {/* TreeSHAP Waterfall bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { feature: 'Soil Water Retention Envelope', shap: '+0.28', positive: true, desc: 'High clay fraction retains moisture after deluge' },
                { feature: 'Terminal Heatwave Resilience', shap: '-0.22', positive: false, desc: 'Anthesis window overlaps with March heat spikes' },
                { feature: 'Local APMC Mandi Liquidity', shap: '+0.18', positive: true, desc: 'Direct procurement center within 14 km radius' },
                { feature: 'Pathogen / Blight Sensitivity', shap: '-0.14', positive: false, desc: 'High relative humidity escalates fungal risk' }
              ].map((f, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#0A0F1D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{f.feature}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{f.desc}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: f.positive ? '#10B981' : '#EF4444', fontFamily: 'monospace' }}>
                    {f.shap}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>RECOMMENDED ROTATION</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>Short-Duration Moong</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Escapes waterlogging with 65-day harvest</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>SUITABILITY SCORE</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>88 / 100 Index</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Rank 1 across 14 agronomic candidates</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 13: YIELD RISK SURFACE
  // --------------------------------------------------------------------------
  if (moduleNumber === 13) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Yield Risk Surface & Probabilistic Loss', 'पैदावार जोखिम सतह व संभावित नुकसान फैलाव', <TrendingUp className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444' }}>
                {isHi ? 'मोंटे कार्लो पैदावार हानि वितरण (P10 / P50 / P90)' : 'Monte Carlo Yield Loss Distribution (P10 / P50 / P90)'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                MEDIAN LOSS: -18.2%
              </span>
            </div>

            {/* Distribution Curve SVG */}
            <div style={{ height: '200px', width: '100%' }}>
              <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%' }}>
                {/* Distribution area */}
                <path d="M 60 160 Q 180 160 250 40 Q 320 160 520 160 Z" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="2.5" />
                
                {/* P10 line */}
                <line x1="170" y1="30" x2="170" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
                <text x="120" y="50" fill="#EF4444" fontSize="10" fontFamily="monospace">P10: -28% (Severe)</text>

                {/* P50 median */}
                <line x1="250" y1="20" x2="250" y2="160" stroke="#F59E0B" strokeWidth="2.5" />
                <text x="255" y="35" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace">P50: -18.2% (Median)</text>

                {/* P90 line */}
                <line x1="330" y1="40" x2="330" y2="160" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
                <text x="335" y="55" fill="#10B981" fontSize="10" fontFamily="monospace">P90: -7% (Mild)</text>

                <line x1="40" y1="160" x2="560" y2="160" stroke="rgba(255,255,255,0.15)" />
              </svg>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>EXPECTED PER-HECTARE LOSS</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>₹14,200 / ha</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Triggers PMFBY insurance claim threshold</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CONFIDENCE BAND</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>95% CI [-28%, -7%]</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Derived from 1,000 synthetic biophysical draws</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 14: PEST & DISEASE ALERT (NPSS)
  // --------------------------------------------------------------------------
  if (moduleNumber === 14) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Weather-Driven Pest & Disease Engine (NPSS)', 'मौसम जनित कीट व रोग चेतावनी (NPSS)', <Bug className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444' }}>
                {isHi ? 'NPSS रोगजनक बीजाणु अंकुरण खिड़की (RH > 85% + 24°C)' : 'Pathogen Spore Germination Micro-Climate Window'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                STAGE 3: OUTBREAK IMMINENT
              </span>
            </div>

            {/* Pathogen Alert Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#0C111C', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#EF4444' }}>Rice Blast (Magnaporthe)</span>
                  <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700, fontFamily: 'monospace' }}>88% Risk</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                  Continuous leaf wetness for 18h triggers explosive mycelial penetration into vascular tissue.
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#0C111C', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#F59E0B' }}>Brown Plant Hopper (BPH)</span>
                  <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, fontFamily: 'monospace' }}>64% Risk</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                  Canopy micro-humidity elevation accelerates nymph maturation cycle by 3.2 days.
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>RECOMMENDED INTERVENTION</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#38BDF8', marginTop: '4px' }}>Tricyclazole 75 WP</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Apply @ 0.6g/L immediately before storm landfall</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>LEAF WETNESS DURATION</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>22 Consecutive Hours</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Surpasses standard fungal incubation barrier</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 15: APMC MANDI MARKET INTELLIGENCE
  // --------------------------------------------------------------------------
  if (moduleNumber === 15) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('APMC Mandi Market & Arrival Deficit Network', 'थोक मंडी आवक व भाव झटका नेटवर्क', <Store className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Commodity Selector */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', marginRight: '6px' }}>{isHi ? 'जिंस चुनें:' : 'Select Commodity:'}</span>
            {(['wheat', 'onion', 'paddy', 'mustard'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setM15Commodity(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  backgroundColor: m15Commodity === c ? '#F59E0B' : '#121826',
                  color: m15Commodity === c ? '#07090E' : '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mandi Arrival vs Price Shock Chart */}
          <div style={{ padding: '18px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#F59E0B' }}>
                  {isHi ? 'दैनिक आवक में गिरावट बनाम थोक मूल्य उछाल' : 'Daily Mandi Arrivals Deficit vs Modal Spot Price'}
                </span>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>Correlated against {locName} road haulage access & field waterlogging</div>
              </div>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                ⚠️ ARRIVALS -18.5%
              </span>
            </div>

            {/* SVG Arrival vs Price Graph */}
            <div style={{ height: '200px', width: '100%' }}>
              <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%' }}>
                <line x1="40" y1="150" x2="560" y2="150" stroke="rgba(255,255,255,0.1)" />
                <line x1="40" y1="100" x2="560" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="40" y1="50" x2="560" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                {/* Arrival Bar chart (Falling) */}
                {[
                  { day: 'T-3', arr: 140, px: 80 },
                  { day: 'T-2', arr: 130, px: 160 },
                  { day: 'T-1', arr: 110, px: 240 },
                  { day: 'T+0', arr: 85, px: 320 },
                  { day: 'T+1', arr: 68, px: 400 },
                  { day: 'T+2', arr: 58, px: 480 }
                ].map((b, idx) => (
                  <g key={idx}>
                    <rect x={b.px - 14} y={150 - b.arr * 0.75} width="28" height={b.arr * 0.75} rx="4" fill="rgba(56, 189, 248, 0.35)" stroke="#38BDF8" />
                    <text x={b.px} y="168" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="monospace">{b.day}</text>
                  </g>
                ))}

                {/* Spot Price Line (Surging) */}
                <path d="M 80 120 L 160 115 L 240 102 L 320 78 L 400 48 L 480 32" fill="none" stroke="#F59E0B" strokeWidth="3" />
                <circle cx="480" cy="32" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                <text x="440" y="24" fill="#F59E0B" fontSize="11" fontWeight="bold" fontFamily="monospace">₹2,420/qtl (+18%)</text>
              </svg>
            </div>
          </div>

          {/* Mandi Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>MODAL PRICE SHOCK</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>+₹370 / quintal</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Projected over next 4 market sessions</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>HAULAGE DISRUPTION INDEX</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>64% Constrained</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Inundated transport arteries to Cuttack/Bhubaneswar</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 16: 5-PHASE CAUSAL NETWORK DAG (SKY TO MANDI)
  // --------------------------------------------------------------------------
  if (moduleNumber === 16) {
    const nodes = [
      { id: 1, phase: 'Phase 1', labelEn: '850hPa Vortex', labelHi: '850hPa चक्रवात', desc: 'Moisture inflow +42m/s' },
      { id: 2, phase: 'Phase 2', labelEn: '1km Downscale', labelHi: '1किमी ज़ूम ग्रिड', desc: 'Localized precipitation core' },
      { id: 3, phase: 'Phase 3', labelEn: 'Soil Saturation', labelHi: 'मिट्टी संतृप्ति (92%)', desc: 'Waterlogging & root hypoxia' },
      { id: 4, phase: 'Phase 4', labelEn: 'Yield Penalty', labelHi: 'पैदावार हानि (-18.2%)', desc: 'Canopy lodging & harvest loss' },
      { id: 5, phase: 'Phase 5', labelEn: 'Mandi Shock', labelHi: 'मंडी मूल्य झटका', desc: 'Arrivals -18.5%, +₹370/qtl' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('5-Phase Coupled Causal Network (Sky ➔ Mandi DAG)', '5-कड़ियों का संपूर्ण श्रृंखला नेटवर्क (आसमान से मंडी)', <Activity className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '18px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(129, 140, 248, 0.3)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#818CF8', marginBottom: '14px' }}>
              {isHi ? 'निर्देशित अचक्रीय ग्राफ (Directed Acyclic Graph) - किसी नोड पर क्लिक करें:' : 'Directed Acyclic Graph (DAG) Telemetry Flow - Click node to inspect:'}
            </div>

            {/* Interactive DAG Nodes */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', position: 'relative' }}>
              {nodes.map((n, i) => (
                <React.Fragment key={n.id}>
                  <div
                    onClick={() => setM16ActiveNode(n.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: m16ActiveNode === n.id ? 'rgba(129, 140, 248, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                      border: m16ActiveNode === n.id ? '2px solid #818CF8' : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      minWidth: '150px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#818CF8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{n.phase}</div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>{isHi ? n.labelHi : n.labelEn}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{n.desc}</div>
                  </div>
                  {i < nodes.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#818CF8] shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(129, 140, 248, 0.08)', border: '1px solid rgba(129, 140, 248, 0.25)' }}>
            <div style={{ fontSize: '12px', color: '#818CF8', fontWeight: 700 }}>
              {isHi ? `नोड विवरण · चरण ${m16ActiveNode}` : `Active Node Telemetry · Phase ${m16ActiveNode}`}
            </div>
            <div style={{ fontSize: '14px', color: '#FFFFFF', marginTop: '4px', lineHeight: 1.5 }}>
              {m16ActiveNode === 1 && (isHi ? '850 hPa चक्रवाती हवाएं बंगाल की खाड़ी से भारी समुद्री वाष्प खींच रही हैं। अनिश्चितता सीमा: ±12%।' : 'Low-level cyclonic jet at 850 hPa drives continuous water vapor advection from Bay of Bengal. Initial uncertainty: ±12%.')}
              {m16ActiveNode === 2 && (isHi ? '12 किमी मॉडल को 1 किमी सूक्ष्म ग्रिड पर लाया गया। स्थानीय वर्षा केंद्र निर्धारित।' : 'Downscaling layer resolves regional orographic rainfall gradients down to 1km x 1km resolution.')}
              {m16ActiveNode === 3 && (isHi ? 'मिट्टी में 92% संतृप्ति। जड़ क्षेत्र में ऑक्सीजन रुकने से जलभराव।' : 'Soil water retention envelope exceeded. Infiltration capacity drops to zero, triggering immediate ponding.')}
              {m16ActiveNode === 4 && (isHi ? 'खेत में पानी भरने से पैदावार में -18.2% गिरावट। ₹14,200/हेक्टेयर नुकसान।' : 'Phenology-adjusted lodging and submergence yield loss model projects median -18.2% harvest shortfall.')}
              {m16ActiveNode === 5 && (isHi ? 'मंडी आवक में -18.5% कमी, थोक भाव ₹2,420/क्विंटल (+18%) तक उछलने की संभावना।' : 'APMC daily wholesale arrivals fall by 18.5%, generating a modal spot price spike of +18.4%. Total graph uncertainty: ±38%.')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 17: SUPPLY SHOCK REGIONAL HOTSPOT MAP
  // --------------------------------------------------------------------------
  if (moduleNumber === 17) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Regional Supply Shock & Procurement Hotspot Map', 'क्षेत्रीय आपूर्ति झटका व खरीद हॉटस्पॉट मानचित्र', <Truck className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444' }}>
                {isHi ? 'प्रमुख मंडियों में आवक घाटा व लॉजिस्टिक्स रुकावट' : 'Inter-District Mandi Supply Corridor Delays & Deficits'}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', fontWeight: 700 }}>
                CORRIDOR DELAY: +36 HOURS
              </span>
            </div>

            {/* District Hotspot Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {[
                { district: 'Balasore APMC Hub', deficit: '-28.4% Deficit', delay: '+48h Haulage', level: 'HIGH SHOCK', color: '#EF4444' },
                { district: 'Cuttack Central Mandi', deficit: '-22.1% Deficit', delay: '+36h Haulage', level: 'SEVERE SHOCK', color: '#EF4444' },
                { district: 'Bhubaneswar Consumer Market', deficit: '-16.8% Deficit', delay: '+24h Haulage', level: 'MODERATE', color: '#F59E0B' }
              ].map((m, i) => (
                <div key={i} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#0C111C', border: `1px solid ${m.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>{m.district}</span>
                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.2)', color: m.color, fontWeight: 700 }}>{m.level}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: m.color, marginTop: '6px', fontFamily: 'monospace' }}>
                    {m.deficit}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    Transport Inundation: {m.delay}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>PROCUREMENT GAP TO TARGET</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>-38,000 MT</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>State food agency buffer shortfall</div>
            </div>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>CORRIDOR BOTTLENECKS</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>NH-16 & Coastal Arteries</div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>Waterlogged culverts halting heavy grain trucks</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODULE 18: COUNTERFACTUAL SCENARIO AI & POLICY SOLVER
  // --------------------------------------------------------------------------
  if (moduleNumber === 18) {
    const projectedLoss = Math.round(18.2 * (m18RainDelta / 20));
    const projectedInflation = m18BufferRelease ? 4 : Math.round(18 * (m18RainDelta / 20));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#07090E', color: '#F8FAFC' }}>
        {renderHeader('Counterfactual "What-If" Scenario AI & Policy Solver', 'क्या-अगर सिमुलेटर व नीतिगत समाधान', <Sparkles className="w-4 h-4" />)}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Controls */}
          <div style={{ padding: '18px', borderRadius: '16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#38BDF8', marginBottom: '14px' }}>
              {isHi ? 'परिकल्पित पैरामीटर बदलें (Counterfactual Levers):' : 'Interactive Counterfactual Policy Levers:'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                  <span>{isHi ? 'अतिरिक्त बारिश विचलन:' : 'Rainfall Anomaly Delta:'}</span>
                  <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>+{m18RainDelta}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={m18RainDelta}
                  onChange={(e) => setM18RainDelta(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#38BDF8', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="buffer"
                  checked={m18BufferRelease}
                  onChange={(e) => setM18BufferRelease(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#10B981', cursor: 'pointer' }}
                />
                <label htmlFor="buffer" style={{ fontSize: '12px', color: '#FFFFFF', cursor: 'pointer' }}>
                  {isHi ? '45,000 टन बफर स्टॉक तुरंत जारी करें (FCI)' : 'Preemptively Release 45,000 MT FCI Buffer Stock'}
                </label>
              </div>
            </div>
          </div>

          {/* Outcome comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <div style={{ fontSize: '11px', color: '#EF4444', fontFamily: 'var(--font-mono)' }}>REVISED CROP SUBMERGENCE</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
                -{projectedLoss}% Yield Loss
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>
                {Math.round(48000 * (m18RainDelta / 20))} ha under standing water
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: m18BufferRelease ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)', border: `1px solid ${m18BufferRelease ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` }}>
              <div style={{ fontSize: '11px', color: m18BufferRelease ? '#10B981' : '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                {isHi ? 'अंतिम मंडी भाव झटका' : 'PROJECTED MANDI INFLATION'}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: m18BufferRelease ? '#10B981' : '#F59E0B', marginTop: '4px' }}>
                +{projectedInflation}% Spurt
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '2px' }}>
                {m18BufferRelease ? 'Dampened by strategic buffer stock intervention' : 'Uncontrolled price volatility spike'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (Should not occur as 2-18 are all explicitly handled)
  return null;
}
