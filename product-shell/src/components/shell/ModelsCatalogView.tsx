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
  const [tab, setTab] = useState<Tab>('experience');
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
              onClick={() => { setSelectedModelId(item.moduleNumber); setTab('experience'); setOutput(null); window.history.pushState(null, '', `#models/${item.moduleNumber}`); }}
            >
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
  const scene = <EngineScene moduleNumber={card.moduleNumber} title={title} />;

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
        {(['experience', 'scene', 'card', 'result'] as Tab[]).map((id) => (
          <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {id === 'experience' ? (hi ? 'आज़माएँ' : 'Try') : id === 'scene' ? (hi ? '3D इंजन' : '3D engine') : id === 'card' ? (hi ? 'कार्ड' : 'Card') : t(locale, 'result')}
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
              <div className="nv-io-title">{hi ? '3D इंजन' : 'Live 3D'}</div>
              {scene}
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
            {scene}
            <p className="nv-hint">{hi ? 'यह वही 3D इंजन है जो forecast चलाता है।' : 'This is the same 3D engine the forecast uses.'}</p>
          </div>
        </FeatureLock>
      )}

      {tab === 'card' && (
        <div className="nv-doc">
          <article>
            <section id="description">
              <h2>{hi ? 'विवरण' : 'Description'}</h2>
              <p>{hi ? card.descriptionHi : card.description}</p>
              <p>{hi ? guide?.resultHi : guide?.result}</p>
            </section>
            <section id="license">
              <h2>{hi ? 'लाइसेंस / उपयोग' : 'License / Terms of Use'}</h2>
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
                <li>{hi ? 'Experience पर नमूना घटना चुनें।' : 'On Experience, pick a sample weather event.'}</li>
                <li>{hi ? 'Forecast दबाएँ — जवाब दाईं ओर।' : 'Press Forecast — answer on the right.'}</li>
                <li>{hi ? 'नतीजा टैब पर सादा जवाब पढ़ें।' : 'Read the plain answer on Result.'}</li>
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
          {scene}
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
