'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import { ENGINE_FIELD_GUIDE, QUERY_INPUT_RULE } from '@/data/engineFieldGuide';
import { useShellStore } from '@/services/useShellStore';

export default function EngineFieldGuide() {
  const { fieldGuideOpen, setFieldGuideOpen, openModuleWorkspace, setModelsDrawerOpen, locale } = useShellStore();

  return (
    <AnimatePresence>
      {fieldGuideOpen ? (
        <motion.div
          className="field-guide-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFieldGuideOpen(false)}
        >
          <motion.section
            className="field-guide-panel"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="field-guide-header">
              <div>
                <div className="field-guide-kicker">
                  <BookOpen size={14} />
                  {locale === 'hi' ? 'गाइड' : 'FIELD GUIDE'}
                </div>
                <h2>{locale === 'hi' ? 'क्या लिखें' : 'What to type'}</h2>
                <p>{locale === 'hi' ? QUERY_INPUT_RULE : 'Place, time, crop or hazard.'}</p>
              </div>
              <button onClick={() => setFieldGuideOpen(false)} aria-label="Close field guide">
                <X size={18} />
              </button>
            </header>

            <div className="field-guide-grid">
              {ENGINE_FIELD_GUIDE.map((engine, index) => (
                <motion.button
                  key={engine.moduleNumber}
                  className={`field-guide-card engine-sig engine-sig-${engine.moduleNumber}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    setFieldGuideOpen(false);
                    setModelsDrawerOpen(false);
                    openModuleWorkspace(engine.moduleNumber, 3000 + engine.moduleNumber, locale === 'hi' ? engine.titleHi : engine.title);
                  }}
                >
                  <span className="field-guide-symbol" aria-hidden>{engine.symbol}</span>
                  <div>
                    <div className="field-guide-id">M{String(engine.moduleNumber).padStart(2, '0')} · {locale === 'hi' ? engine.titleHi : engine.title}</div>
                    <div className="field-guide-need">{locale === 'hi' ? engine.needHi : engine.need}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
