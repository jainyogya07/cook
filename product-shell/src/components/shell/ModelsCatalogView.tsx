'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { GROUPED_MODEL_CATEGORIES } from '@/data/mockFeedData';
import { ENGINE_FIELD_GUIDE } from '@/data/engineFieldGuide';
import {
  NIM_TOC,
  SHARED_LICENSE_EN,
  SHARED_LICENSE_HI,
  SHARED_STACK,
  allAtmosNimCards,
  farmerTitle,
  getAtmosNimCard
} from '@/data/modelNimCards';
import { parseAndRouteQuery } from '@/services/intentRouter';
import { buildHumanReply } from '@/services/plainReply';
import { useShellStore } from '@/services/useShellStore';
import { t, canUseEngines } from '@/i18n/copy';
import FeatureLock from '@/components/shell/FeatureLock';
import GlassMenu from '@/components/shell/GlassMenu';
import EngineScene from '@/components/shell/EngineScene';
import ResultCardsGrid from '@/components/shell/ResultCardsGrid';
import { cardsFromModules, ResultCard } from '@/services/resultCards';
import { MODEL_EXAMPLES } from '@/data/modelExamples';

type Tab = 'experience' | 'scene' | 'card' | 'result';
type Family = 'All' | 'Atmosphere' | 'Village' | 'Field' | 'Mandi';

export default function ModelsCatalogView() {
  const { locale, accessPlan, selectedModelId, setSelectedModelId } = useShellStore();
  const catalog = useMemo(() => allAtmosNimCards(), []);
  const ports = useMemo(
    () => Object.fromEntries(GROUPED_MODEL_CATEGORIES.flatMap((g) => g.models.map((m) => [m.moduleNumber, m]))),
    []
  );
  const [family, setFamily] = useState<Family>('All');
  const [tab, setTab] = useState<Tab>('scene');
  const [eventIdx, setEventIdx] = useState(0);
  const [variable, setVariable] = useState('Rain');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<{ text: string; metrics: { label: string; value: string }[]; cards: ResultCard[] } | null>(null);

  const visible = catalog.filter((card) => family === 'All' || card.family === family);
  const card = selectedModelId ? getAtmosNimCard(selectedModelId) : null;
  const guide = card ? ENGINE_FIELD_GUIDE.find((g) => g.moduleNumber === card.moduleNumber) : null;
  const meta = card ? ports[card.moduleNumber] : null;
  const hi = locale === 'hi';

  const run = () => {
    if (!card) return;
    const query = card.sampleEvents[eventIdx]?.query || guide?.example || '';
    setRunning(true);
    window.setTimeout(() => {
      const result = parseAndRouteQuery(`${query} ${variable}`, 'ANALYZE');
      setOutput({
        text: buildHumanReply(result, locale),
        metrics: result.activatedModules.map((step) => ({ label: step.moduleName, value: step.metricOutput })),
        cards: cardsFromModules(result.activatedModules, locale)
      });
      useShellStore.getState().pushResearchRun({
        query: `${query} ${variable}`,
        headline: buildHumanReply(result, locale),
        cards: cardsFromModules(result.activatedModules, locale),
        links: []
      });
      setTab('result');
      setRunning(false);
    }, 800);
  };

  if (!card) {
    return (
      <div className="nv-page">
        <div className="nv-page-head">
          <p>{t(locale, 'models')}</p>
          <h1>{hi ? '18 इंजन' : '18 engines'}</h1>
          <span>{hi ? 'कार्ड चुनो, 3D चलाओ।' : 'Pick a card. Run 3D.'}</span>
        </div>
        <div className="nv-filters">
          {(['All', 'Atmosphere', 'Village', 'Field', 'Mandi'] as Family[]).map((item) => (
            <button key={item} type="button" className={family === item ? 'is-active' : ''} onClick={() => setFamily(item)}>
              {item === 'All' ? (hi ? 'सब' : 'All') : item === 'Atmosphere' ? (hi ? 'आसमान' : 'Atmosphere') : item === 'Village' ? (hi ? 'गाँव' : 'Village') : item === 'Field' ? (hi ? 'खेत' : 'Field') : (hi ? 'मंडी' : 'Mandi')}
            </button>
          ))}
        </div>
        <div className="nv-catalog">
          {visible.map((item, index) => (
            <motion.button
              key={item.moduleNumber}
              type="button"
              className="nv-feature-card"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.035, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => { setSelectedModelId(item.moduleNumber); setTab('scene'); setOutput(null); window.history.pushState(null, '', `#models/${item.moduleNumber}`); }}
            >
              <div className={`nv-engine-poster is-${item.family === 'Atmosphere' ? 'sky' : item.family === 'Village' ? 'village' : item.family === 'Field' ? 'crop' : 'mandi'} is-mini`} aria-hidden="true">
                <div className="nv-engine-art"><i /><i /><i /></div>
              </div>
              <div className="nv-feature-top">
                <span>M{String(item.moduleNumber).padStart(2, '0')}</span>
                <em>{hi ? item.familyHi : item.family}</em>
              </div>
              <h2>{farmerTitle(item.moduleNumber, locale)}</h2>
              <p>{hi ? item.descriptionHi : item.description}</p>
              <p className="nv-ex">{hi ? MODEL_EXAMPLES[item.moduleNumber]?.farmerHi : MODEL_EXAMPLES[item.moduleNumber]?.farmer}</p>
              <p className="nv-ex is-public">{hi ? MODEL_EXAMPLES[item.moduleNumber]?.publicHi : MODEL_EXAMPLES[item.moduleNumber]?.publicUser}</p>
              <div className="nv-tags">
                {item.variables.slice(0, 3).map((v) => <i key={v}>{v}</i>)}
                <i className={item.moduleNumber > 6 ? 'is-pro' : ''}>{item.moduleNumber > 6 ? 'Atmos Pro' : (hi ? 'फ्री' : 'Free')}</i>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const title = farmerTitle(card.moduleNumber, locale);
  const event = card.sampleEvents[eventIdx];
  const poster = <EngineScene moduleNumber={card.moduleNumber} title={title} variant="poster" />;
  const liveScene = <EngineScene moduleNumber={card.moduleNumber} title={title} variant="live" />;

  return (
    <div className="nv-page nv-nim">
      <button type="button" className="nv-back" onClick={() => { setSelectedModelId(null); window.history.pushState(null, '', '#models'); }}>
        <ArrowLeft size={14} /> {hi ? 'सभी मॉडल' : 'All models'}
      </button>

      <header className="nv-nim-hero">
        <div>
          <div className="nv-card-kicker">ATMOS · M{String(card.moduleNumber).padStart(2, '0')} · {hi ? card.familyHi : card.family} · {card.moduleNumber > 6 ? 'Pro' : (hi ? 'फ्री' : 'Free')}</div>
          <h1>{title}</h1>
          <p className="nv-sci">{card.scientificName}</p>
        </div>
      </header>

      <div className="nv-subtabs">
        {(['scene', 'experience', 'card', 'result'] as Tab[]).map((id) => (
          <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {id === 'scene'
              ? (hi ? '🎮 3D सिमुलेशन' : '🎮 Live 3D Simulation')
              : id === 'experience'
              ? (hi ? '🧪 आज़माएँ' : '🧪 Try Forecast')
              : id === 'card'
              ? (hi ? '📋 मॉडल कार्ड व कहानी' : '📋 Model Card & Story')
              : t(locale, 'result')}
          </button>
        ))}
      </div>

      {tab === 'experience' && (
        <FeatureLock need="signin">
          <div className="nv-io nv-io-pro">
            <div>
              <div className="nv-io-title">{hi ? 'इनपुट' : 'Input'}</div>
              <GlassMenu
                label={hi ? 'घटना' : 'Event'}
                value={String(eventIdx)}
                onChange={(v) => setEventIdx(Number(v))}
                options={card.sampleEvents.map((item, idx) => ({
                  value: String(idx),
                  label: hi ? item.labelHi : item.label
                }))}
              />
              <GlassMenu
                label={hi ? 'चर' : 'Variable'}
                value={variable}
                onChange={setVariable}
                options={card.variables.map((item) => ({ value: item, label: item }))}
              />
              <details>
                <summary>{hi ? 'उदाहरण' : 'Example'}</summary>
                <p>{hi ? guide?.exampleHi : guide?.example}</p>
                <p>{hi ? MODEL_EXAMPLES[card.moduleNumber]?.farmerHi : MODEL_EXAMPLES[card.moduleNumber]?.farmer}</p>
                <p>{hi ? MODEL_EXAMPLES[card.moduleNumber]?.publicHi : MODEL_EXAMPLES[card.moduleNumber]?.publicUser}</p>
              </details>
              <div className="nv-run-row">
                <button type="button" className="nv-chip" onClick={() => { setOutput(null); setEventIdx(0); }}>{hi ? 'रीसेट' : 'Reset'}</button>
                <button type="button" className="nv-run" onClick={run} disabled={running || !canUseEngines(accessPlan, card.moduleNumber)}>
                  <Play size={14} /> {running ? '…' : (hi ? 'पूर्वानुमान' : 'Forecast')}
                </button>
              </div>
              {!canUseEngines(accessPlan, card.moduleNumber) && (
                <p className="nv-hint">{hi ? 'यह इंजन Pro है। फ्री पर कार्ड पढ़ो, Forecast के लिए Pro।' : 'This engine is Pro. Free can read the card; Forecast needs Pro.'}</p>
              )}
            </div>
            <div>
              <div className="nv-io-title">{hi ? 'इंजन थंबनेल' : 'Engine thumbnail'}</div>
              {poster}
              <div className="nv-output">
                {output ? (
                  <>
                    <p>{output.text}</p>
                    <ResultCardsGrid cards={output.cards} />
                  </>
                ) : (
                  <p>{hi ? 'Forecast दबाएँ।' : 'Press Forecast.'}</p>
                )}
              </div>
            </div>
          </div>
        </FeatureLock>
      )}

      {tab === 'scene' && (
        <FeatureLock need="signin">
          <div className="nv-scene-full">
            {liveScene}
            <p className="nv-hint">{hi ? 'पूरा 3D यहाँ है। Full दबाकर चौड़ा खोलो।' : 'Full live 3D lives here. Use Full if the HUD needs room.'}</p>
          </div>
        </FeatureLock>
      )}

      {tab === 'card' && (
        <div className="nv-doc">
          <article>
            {/* 1. FIELD SCENARIO & DISTRICT BULLETIN */}
            <section id="story">
              <h2>{hi ? '01. ज़िला बुलेटिन व ज़मीनी स्थिति' : '01. Field Scenario & District Bulletin'}</h2>
              <div className="nv-clean-card">
                <p className="nv-story-lead">{hi ? card.realLifeStoryHi : card.realLifeStory}</p>
              </div>
            </section>

            {/* 2. EXECUTIVE INPUT & OUTPUT TELEMETRY WITH 3D PREVIEW */}
            <section id="telemetry">
              <h2>{hi ? '02. इनपुट व आउटपुट टेलीमेट्री बोर्ड' : '02. Executive Input & Output Telemetry'}</h2>
              <div className="nv-clean-card">
                <p className="nv-guide-lead">{hi ? card.howToUseHi : card.howToUse}</p>
                
                {/* 2-Column I/O Matrix */}
                <div className="nv-telemetry-board">
                  {/* Left Column: Operational Inputs */}
                  <div className="nv-telemetry-col">
                    <div className="nv-telemetry-col-head">
                      <span>📥 {hi ? 'संचालन इनपुट (Operational Inputs)' : 'Operational Inputs'}</span>
                      <span className="nv-tier-badge nv-tier-advisory">{hi ? 'फ़ील्ड डेटा' : 'Field Ingest'}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">📍 {hi ? 'लक्षित क्षेत्र / ज़िला' : 'Target Region / District'}</span>
                      <span className="nv-field-value">{hi ? card.ioSpec.inputs.regionHi : card.ioSpec.inputs.region}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">⏱️ {hi ? 'पूर्वानुमान समय सीमा' : 'Forecast Horizon'}</span>
                      <span className="nv-field-value mono">{hi ? card.ioSpec.inputs.horizonHi : card.ioSpec.inputs.horizon}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">📡 {hi ? 'मौसम डेटा व उपग्रह फ़ीड' : 'Sensor & NWP Feeds'}</span>
                      <span className="nv-field-value">{hi ? card.ioSpec.inputs.feedsHi : card.ioSpec.inputs.feeds}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">🌾 {hi ? 'निगरानी फसल / परिसंपत्ति' : 'Monitored Crop / Asset'}</span>
                      <span className="nv-field-value">{hi ? card.ioSpec.inputs.targetAssetHi : card.ioSpec.inputs.targetAsset}</span>
                    </div>
                  </div>

                  {/* Right Column: Calibrated Outputs */}
                  <div className="nv-telemetry-col">
                    <div className="nv-telemetry-col-head">
                      <span>📤 {hi ? 'कैलिब्रेटेड आउटपुट (Outputs)' : 'Calibrated Outputs'}</span>
                      <span className={`nv-tier-badge nv-tier-${card.ioSpec.outputs.riskTier.toLowerCase()}`}>
                        {hi ? card.ioSpec.outputs.riskTierLabelHi : card.ioSpec.outputs.riskTierLabel}
                      </span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">📊 {hi ? 'मुख्य अवलोकन / माप' : 'Core Observation Metric'}</span>
                      <span className="nv-field-value mono">{hi ? card.ioSpec.outputs.coreMetricHi : card.ioSpec.outputs.coreMetric}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">📈 {hi ? 'संभाव्यता रेंज (P10 · P50 · P90)' : 'Ensemble Band (P10 · P50 · P90)'}</span>
                      <span className="nv-field-value mono">{hi ? card.ioSpec.outputs.ensembleBandHi : card.ioSpec.outputs.ensembleBand}</span>
                    </div>
                    <div className="nv-field-row">
                      <span className="nv-field-label">⚡ {hi ? 'आधिकारिक सलाह निर्देश' : 'Official Advisory Directive'}</span>
                      <span className="nv-field-value">{hi ? card.ioSpec.outputs.actionDirectiveHi : card.ioSpec.outputs.actionDirective}</span>
                    </div>
                  </div>
                </div>

                {/* 3D Visual Simulation Preview Poster */}
                <div className="nv-preview-container">
                  <div className="nv-preview-header">
                    <span>🎮 {hi ? 'इंजन 3D टेलीमेट्री विज़ुअल प्रिव्यू' : 'Engine 3D Telemetry Visual Preview'}</span>
                    <button 
                      type="button" 
                      onClick={() => setTab('scene')}
                      className="nv-preview-launch-btn"
                    >
                      {hi ? 'पूर्ण 3D सिमुलेशन चलाएँ ↗' : 'Launch Full 3D Interactive ↗'}
                    </button>
                  </div>
                  <div className="nv-preview-body">
                    {poster}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 4D CASCADE DOMINO IMPACT */}
            <section id="cascade">
              <h2>{hi ? '03. 4D बहु-भौतिकी प्रभाव श्रृंखला' : '03. 4D Multi-Physics Domino Cascade'}</h2>
              <div className="nv-clean-card">
                <p className="nv-clean-text">{hi ? card.cascadeImpactHi : card.cascadeImpact}</p>
              </div>
            </section>

            {/* 4. ACTIONABLE ADVISORY & DECISIONS */}
            <section id="advisory">
              <h2>{hi ? '04. सीधे फैसले व परिचालन निर्देश' : '04. Actionable Advisory & Field Decisions'}</h2>
              <div className="nv-clean-card">
                <p className="nv-clean-text">{hi ? card.actionableDecisionHi : card.actionableDecision}</p>
              </div>
            </section>

            {/* 5. SCIENTIFIC SPECIFICATION */}
            <section id="description">
              <h2>{hi ? 'वैज्ञानिक विवरण' : 'Scientific Description'}</h2>
              <p>{hi ? card.descriptionHi : card.description}</p>
              <p>{hi ? guide?.resultHi : guide?.result}</p>
            </section>

            <section id="license">
              <h2>{hi ? 'लाइसेंस / उपयोग की शर्तें' : 'License / Terms of Use'}</h2>
              <p>{hi ? SHARED_LICENSE_HI : SHARED_LICENSE_EN}</p>
            </section>

            <section id="intended">
              <h2>{hi ? 'किसके लिए है' : 'Intended Use'}</h2>
              <ul>{(hi ? card.intendedHi : card.intended).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section id="limitations">
              <h2>{hi ? 'सीमाएँ' : 'Known Limitations'}</h2>
              <ul>{(hi ? card.limitationsHi : card.limitations).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section id="geography">
              <h2>{hi ? 'कहाँ चलता है' : 'Deployment Geography'}</h2>
              <p>{hi ? 'भारत केंद्र: तटीय ओडिशा, पंजाब, नाशिक गलियारा। क्लाउड: Vercel + Render।' : 'India-first: coastal Odisha, Punjab, Nashik corridor. Cloud: Vercel product shell + Render API.'}</p>
            </section>

            <section id="release">
              <h2>{hi ? 'रिलीज़' : 'Release'}</h2>
              <p>ATMOS 4D product shell · live app https://atmos-4d.vercel.app · engine port {meta?.port || 3000 + card.moduleNumber}</p>
            </section>

            <section id="classes">
              <h2>{hi ? 'कौन-से इंजन जुड़े हैं' : 'Program Classes'}</h2>
              <table>
                <thead><tr><th>{hi ? 'नाम' : 'Name'}</th><th>{hi ? 'काम' : 'Use case'}</th></tr></thead>
                <tbody>
                  {card.classes.map((row) => (
                    <tr key={row.name}><td>{row.name}</td><td>{hi ? row.useHi : row.use}</td></tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="deployment">
              <h2>{hi ? 'कैसे चलता है' : 'Deployment Details'}</h2>
              <p>{hi ? 'डेव में अलग पोर्ट, प्रोडक्शन में एक ऑर्केस्ट्रेशन परत। किसान को पोर्ट याद रखने की ज़रूरत नहीं।' : 'Independent ports in development; one orchestration layer in production. Farmers never type a port number.'}</p>
            </section>

            <section id="stack">
              <h2>{hi ? 'सॉफ़्टवेयर स्टैक' : 'Software Stack'}</h2>
              <table>
                <thead><tr><th>Component</th><th>Version / note</th></tr></thead>
                <tbody>{SHARED_STACK.map((row) => <tr key={row.component}><td>{row.component}</td><td>{row.version}</td></tr>)}</tbody>
              </table>
            </section>

            <section id="security">
              <h2>{hi ? 'सुरक्षा' : 'Security'}</h2>
              <p>{hi ? 'सेशन कुकी/टोकन सर्वर साइड। डेटाबेस पासवर्ड गिट पर नहीं होने चाहिए।' : 'Auth tokens stay with the API. Database passwords must not live in git. News HTML is stripped before render.'}</p>
            </section>

            <section id="ethics">
              <h2>{hi ? 'ईमानदारी' : 'Ethical Considerations'}</h2>
              <p>{hi ? 'एक्सपोज़र ≠ नुकसान। OBSERVED / SCENARIO / FORECAST अलग लिखो। नीति अपने आप नहीं बनती।' : 'Exposure is not loss. Label OBSERVED vs SCENARIO vs FORECAST. The system must not pretend to issue policy.'}</p>
            </section>

            <section id="help">
              <h2>{hi ? 'शुरू कैसे करें' : 'Getting started'}</h2>
              <ol>
                <li>{hi ? '3D सिमुलेशन टैब पर इंटरैक्टिव 3D इंजन चलाएँ।' : 'On 3D Simulation tab, inspect the full interactive 3D physics engine.'}</li>
                <li>{hi ? 'आज़माएँ टैब पर घटना चुनें और Forecast दबाएँ।' : 'On Try Forecast, select an event and press Forecast.'}</li>
                <li>{hi ? 'नतीजा टैब पर तीन संख्याएँ (कम / सामान्य / ज़्यादा) और सादा जवाब पढ़ें।' : 'On Result tab, inspect the P10 / P50 / P90 ensemble bands and advisory.'}</li>
              </ol>
              <p>{hi ? 'क्या टाइप करें' : 'What to type'}: {hi ? guide?.needHi : guide?.need}</p>
            </section>
          </article>
          <nav className="nv-toc">
            <strong>{hi ? 'इस पेज पर' : 'On this page'}</strong>
            {NIM_TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`}>{hi ? item.titleHi : item.title}</a>
            ))}
          </nav>
        </div>
      )}

      {tab === 'result' && (
        <div className="nv-result-page">
          {poster}
          <div className="nv-output nv-output-full">
            {output ? (
              <>
                <p className="nv-event">{hi ? event.labelHi : event.label}</p>
                <h2>{hi ? 'सादा नतीजा' : 'Plain result'}</h2>
                <ResultCardsGrid cards={output.cards} headline={output.text} />
                <p className="nv-hint">{hi ? 'यह परिदृश्य / संभावना है, पक्का नुकसान नहीं।' : 'Scenario / probability — not a guaranteed loss.'}</p>
              </>
            ) : (
              <p>{hi ? 'पहले Experience पर Forecast चलाएँ।' : 'Run Forecast on Experience first.'}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
