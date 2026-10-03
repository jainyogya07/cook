'use client';

import React, { useEffect } from 'react';
import { useShellStore } from '@/services/useShellStore';
import NewsTranslator from '@/components/feed/NewsTranslator';
import { cleanNewsText } from '@/lib/cleanNews';
import { t } from '@/i18n/copy';

export default function NewsDeskView() {
  const { liveNews, fetchLiveNews, locale, isNewsLiveSyncing } = useShellStore();

  useEffect(() => {
    void fetchLiveNews('weather', 'India', locale);
  }, [fetchLiveNews, locale]);

  return (
    <div className="nv-page">
      <div className="nv-page-head">
        <p>{t(locale, 'news')}</p>
        <h1>{locale === 'hi' ? 'आज मौसम और मंडी में क्या हुआ' : 'What happened in weather and mandi today'}</h1>
        <span>{isNewsLiveSyncing ? (locale === 'hi' ? 'अपडेट हो रहा है…' : 'Updating…') : (locale === 'hi' ? 'लाइव स्रोत' : 'Live sources')}</span>
      </div>
      <div className="nv-news-grid">
        {liveNews.length === 0 ? (
          <div className="nv-empty">{locale === 'hi' ? 'अभी समाचार नहीं मिले।' : 'No bulletins yet.'}</div>
        ) : liveNews.map((item) => {
          const title = cleanNewsText(item.headline);
          const body = cleanNewsText(item.aiRelevanceContext);
          return (
            <article key={item.id} className="nv-card">
              <div className="nv-card-kicker">{item.source} · {item.timestamp}</div>
              <h2>{title}</h2>
              {body && body !== title ? <p>{body}</p> : null}
              <div className="nv-card-foot">
                <NewsTranslator headline={`${title}\n\n${body}`} locale={locale} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
