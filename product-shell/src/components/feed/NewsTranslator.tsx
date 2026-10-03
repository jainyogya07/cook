'use client';

import React, { useMemo, useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';
import { translateEndpoint } from '@/lib/api';

interface NewsTranslatorProps {
  headline: string;
  context?: string;
  locale: 'en' | 'hi';
}

function guessLang(text: string): 'en' | 'hi' {
  return /[\u0900-\u097F]/.test(text) ? 'hi' : 'en';
}

export default function NewsTranslator({ headline, context, locale }: NewsTranslatorProps) {
  const source = useMemo(() => guessLang(`${headline} ${context || ''}`), [headline, context]);
  const target: 'en' | 'hi' = source === 'hi' ? 'en' : 'hi';
  const [busy, setBusy] = useState(false);
  const [shown, setShown] = useState<'original' | 'translated'>('original');
  const [translatedHeadline, setTranslatedHeadline] = useState('');
  const [translatedContext, setTranslatedContext] = useState('');

  const run = async () => {
    if (shown === 'translated') {
      setShown('original');
      return;
    }
    if (translatedHeadline) {
      setShown('translated');
      return;
    }
    setBusy(true);
    try {
      const endpoint = translateEndpoint();
      const [headRes, ctxRes] = await Promise.all([
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: headline, source, target })
        }),
        context
          ? fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: context, source, target })
            })
          : Promise.resolve(null)
      ]);
      const headJson = await headRes.json();
      setTranslatedHeadline(headJson.text || headline);
      if (ctxRes) {
        const ctxJson = await ctxRes.json();
        setTranslatedContext(ctxJson.text || context || '');
      }
      setShown('translated');
    } catch {
      setTranslatedHeadline(headline);
      setTranslatedContext(context || '');
      setShown('translated');
    } finally {
      setBusy(false);
    }
  };

  const label =
    locale === 'hi'
      ? shown === 'translated'
        ? 'मूल दिखाएँ'
        : target === 'hi'
          ? 'हिन्दी में'
          : 'English में'
      : shown === 'translated'
        ? 'Show original'
        : target === 'hi'
          ? 'Hindi'
          : 'English';

  return (
    <div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          void run();
        }}
        disabled={busy}
        style={{
          marginTop: 8,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 8px',
          borderRadius: 999,
          border: '1px solid rgba(167,139,250,.35)',
          background: shown === 'translated' ? 'rgba(167,139,250,.16)' : 'rgba(255,255,255,.03)',
          color: '#ddd6fe',
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          fontWeight: 700
        }}
      >
        {busy ? <Loader2 size={11} className="animate-spin" /> : <Languages size={11} />}
        {busy ? (locale === 'hi' ? 'अनुवाद…' : 'Translating…') : label}
      </button>
      {shown === 'translated' && translatedHeadline && (
        <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 10, background: 'rgba(167,139,250,.08)', border: '1px solid rgba(167,139,250,.2)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F8FAFC', lineHeight: 1.4 }}>{translatedHeadline}</div>
          {translatedContext && (
            <div style={{ marginTop: 6, fontSize: 11.5, color: '#CBD5E1', lineHeight: 1.45 }}>{translatedContext}</div>
          )}
        </div>
      )}
    </div>
  );
}
