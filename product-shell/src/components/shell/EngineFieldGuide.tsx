'use client';

import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { ENGINE_FIELD_GUIDE, QUERY_INPUT_RULE } from '@/data/engineFieldGuide';
import { useShellStore } from '@/services/useShellStore';

export default function EngineFieldGuide() {
  const { fieldGuideOpen, setFieldGuideOpen, openModuleWorkspace, setModelsDrawerOpen, locale } = useShellStore();
  if (!fieldGuideOpen) return null;

  return (
    <div
      className="field-guide-overlay"
      onClick={() => setFieldGuideOpen(false)}
    >
      <section className="field-guide-panel" onClick={(event) => event.stopPropagation()}>
        <header className="field-guide-header">
          <div>
            <div className="field-guide-kicker">
              <BookOpen size={14} />
              {locale === 'hi' ? 'गाइड' : 'FIELD GUIDE'}
            </div>
            <h2>{locale === 'hi' ? 'क्या लिखें, क्या मिलेगा' : 'What to enter. What you get.'}</h2>
            <p>{locale === 'hi' ? QUERY_INPUT_RULE : 'Type a place, a time, a crop or hazard, and the decision you need.'}</p>
          </div>
          <button onClick={() => setFieldGuideOpen(false)} aria-label="Close field guide">
            <X size={18} />
          </button>
        </header>

        <div className="field-guide-grid">
          {ENGINE_FIELD_GUIDE.map((engine) => (
            <button
              key={engine.moduleNumber}
              className={`field-guide-card engine-sig engine-sig-${engine.moduleNumber}`}
              onClick={() => {
                setFieldGuideOpen(false);
                setModelsDrawerOpen(false);
                openModuleWorkspace(engine.moduleNumber, 3000 + engine.moduleNumber, locale === 'hi' ? engine.titleHi : engine.title);
              }}
            >
              <span className="field-guide-symbol" aria-hidden>{engine.symbol}</span>
              <div>
                <div className="field-guide-id">M{String(engine.moduleNumber).padStart(2, '0')} · {locale === 'hi' ? engine.titleHi : engine.title}</div>
                <div className="field-guide-need">{locale === 'hi' ? `लिखें: ${engine.needHi}` : `Need: ${engine.need}`}</div>
                <div className="field-guide-example">{locale === 'hi' ? `जैसे: ${engine.exampleHi}` : `e.g. ${engine.example}`}</div>
                <div className="field-guide-result">{locale === 'hi' ? `मिलेगा: ${engine.resultHi}` : `Returns: ${engine.result}`}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
