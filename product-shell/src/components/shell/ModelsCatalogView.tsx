'use client';

import React, { useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { GROUPED_MODEL_CATEGORIES } from '@/data/mockFeedData';
import { ENGINE_FIELD_GUIDE } from '@/data/engineFieldGuide';
import { parseAndRouteQuery } from '@/services/intentRouter';
import { buildHumanReply } from '@/services/plainReply';
import { useShellStore } from '@/services/useShellStore';
import { t } from '@/i18n/copy';
import FeatureLock from '@/components/shell/FeatureLock';
import { canUseEngines } from '@/i18n/copy';

type Tab = 'experience' | 'card' | 'result';

export default function ModelsCatalogView() {
  const { locale, openModuleWorkspace, accessPlan } = useShellStore();
  const models = useMemo(
    () => GROUPED_MODEL_CATEGORIES.flatMap((group) => group.models.map((model) => ({ ...model, group: group.categoryName }))),
    []
  );
  const [selected, setSelected] = useState(models[0]?.moduleNumber ?? 1);
  const [tab, setTab] = useState<Tab>('experience');
  const [query, setQuery] = useState(locale === 'hi' ? 'ओडिशा तट, अगले 3 दिन, धान — क्या खतरा है?' : 'Odisha coast, next 3 days, paddy — what is the risk?');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<{ text: string; metrics: { label: string; value: string }[] } | null>(null);

  const model = models.find((item) => item.moduleNumber === selected) || models[0];
  const guide = ENGINE_FIELD_GUIDE.find((item) => item.moduleNumber === model.moduleNumber);
  const title = locale === 'hi' ? guide?.titleHi || model.title : guide?.title || model.title;

  const run = () => {
    setRunning(true);
    window.setTimeout(() => {
      const result = parseAndRouteQuery(query, 'ANALYZE');
      setOutput({
        text: buildHumanReply(result, locale),
        metrics: result.activatedModules.slice(0, 4).map((step) => ({
          label: step.moduleName,
          value: step.metricOutput
        }))
      });
      setTab('result');
      setRunning(false);
    }, 700);
  };

  return (
    <div className="nv-page">
      <div className="nv-page-head">
        <p>{t(locale, 'models')}</p>
        <h1>{locale === 'hi' ? 'एक कार्ड. सवाल अंदर, जवाब सामने.' : 'One card. Question in, answer out.'}</h1>
      </div>

      <div className="nv-model-layout">
        <aside className="nv-model-list">
          {models.map((item) => {
            const g = ENGINE_FIELD_GUIDE.find((entry) => entry.moduleNumber === item.moduleNumber);
            const label = locale === 'hi' ? g?.titleHi || item.title : g?.title || item.title;
            return (
              <button
                key={item.moduleNumber}
                type="button"
                className={`nv-model-mini${item.moduleNumber === model.moduleNumber ? ' is-active' : ''}`}
                onClick={() => {
                  setSelected(item.moduleNumber);
                  setTab('experience');
                }}
              >
                <strong>M{String(item.moduleNumber).padStart(2, '0')}</strong>
                <span>{label}</span>
              </button>
            );
          })}
        </aside>

        <section className="nv-card nv-model-stage">
          <div className="nv-stage-hero">
            <div>
              <div className="nv-card-kicker">M{String(model.moduleNumber).padStart(2, '0')} · {model.tag}</div>
              <h2>{title}</h2>
              <p>{locale === 'hi' ? guide?.resultHi : guide?.result}</p>
            </div>
            <button type="button" className="nv-chip" onClick={() => openModuleWorkspace(model.moduleNumber, model.port, model.title)}>
              {locale === 'hi' ? 'पूरा स्टूडियो' : 'Full studio'}
            </button>
          </div>

          <div className="nv-subtabs">
            {(['experience', 'card', 'result'] as Tab[]).map((id) => (
              <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
                {id === 'experience' ? t(locale, 'experience') : id === 'card' ? t(locale, 'modelCard') : t(locale, 'result')}
              </button>
            ))}
          </div>

          {tab === 'experience' && (
            <FeatureLock need="signin">
              <div className="nv-io">
                <div>
                  <label>{locale === 'hi' ? 'इनपुट' : 'Input'}</label>
                  <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={5} />
                  <p className="nv-hint">{locale === 'hi' ? guide?.needHi : guide?.need}</p>
                  <button type="button" className="nv-run" onClick={run} disabled={running || !canUseEngines(accessPlan)}>
                    <Play size={14} /> {running ? '…' : t(locale, 'run')}
                  </button>
                </div>
                <div>
                  <label>{locale === 'hi' ? 'आउटपुट' : 'Output'}</label>
                  <div className="nv-output">
                    {output ? (
                      <>
                        <p>{output.text}</p>
                        <div className="nv-metrics">
                          {output.metrics.map((metric) => (
                            <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>{locale === 'hi' ? 'Run दबाने पर सादा जवाब यहीं दिखेगा।' : 'Press Run. The plain-language answer appears here.'}</p>
                    )}
                  </div>
                </div>
              </div>
            </FeatureLock>
          )}

          {tab === 'card' && (
            <div className="nv-about">
              <p><strong>{locale === 'hi' ? 'क्या चाहिए' : 'What to type'}:</strong> {locale === 'hi' ? guide?.needHi : guide?.need}</p>
              <p><strong>{locale === 'hi' ? 'उदाहरण' : 'Example'}:</strong> {locale === 'hi' ? guide?.exampleHi : guide?.example}</p>
              <p><strong>{locale === 'hi' ? 'क्या मिलेगा' : 'What you get'}:</strong> {locale === 'hi' ? guide?.resultHi : guide?.result}</p>
              <p className="nv-hint">{model.shortDescription}</p>
            </div>
          )}

          {tab === 'result' && (
            <div className="nv-output nv-output-full">
              {output ? (
                <>
                  <p>{output.text}</p>
                  <div className="nv-metrics">
                    {output.metrics.map((metric) => (
                      <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>
                    ))}
                  </div>
                </>
              ) : (
                <p>{locale === 'hi' ? 'पहले Try it पर Run करें।' : 'Run the model on Try it first.'}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
