'use client';

import React, { useEffect, useMemo } from 'react';
import { useShellStore } from '@/services/useShellStore';
import { cleanNewsText } from '@/lib/cleanNews';

const MANDI_EN = [
  { label: 'Nashik onion', price: '₹1,840 /qtl', delta: '+4.2%', module: 15 },
  { label: 'Khanna wheat', price: '₹2,310 /qtl', delta: '+1.1%', module: 15 },
  { label: 'Cuttack paddy', price: '₹2,155 /qtl', delta: '-2.6%', module: 15 },
  { label: 'Lasalgaon arrival', price: '−14% trucks', delta: 'shock', module: 16 }
];
const MANDI_HI = [
  { label: 'नाशिक प्याज', price: '₹1,840 /क्विंटल', delta: '+4.2%', module: 15 },
  { label: 'खन्ना गेहूं', price: '₹2,310 /क्विंटल', delta: '+1.1%', module: 15 },
  { label: 'कटक धान', price: '₹2,155 /क्विंटल', delta: '-2.6%', module: 15 },
  { label: 'लासलगाँव आवक', price: 'ट्रक −14%', delta: 'झटका', module: 16 }
];

export default function LivePulseTicker() {
  const { locale, liveNews, fetchLiveNews, setActiveNav, setSelectedModelId } = useShellStore();
  const hi = locale === 'hi';

  useEffect(() => {
    void fetchLiveNews('mandi', 'India', locale);
  }, [fetchLiveNews, locale]);

  const items = useMemo(() => {
    const mandi = (hi ? MANDI_HI : MANDI_EN).map((row) => ({
      id: row.label,
      kind: 'mandi' as const,
      text: hi ? `${row.label} ${row.price}` : `${row.label} ${row.price}`,
      module: row.module
    }));
    const news = liveNews.slice(0, 8).map((item) => ({
      id: item.id,
      kind: 'news' as const,
      text: cleanNewsText(item.headline).slice(0, 72),
      module: 0
    }));
    return [...mandi, ...news];
  }, [hi, liveNews]);

  const loop = items.concat(items);
  if (!loop.length) return null;

  return (
    <div className="live-ticker" aria-label={hi ? 'लाइव मंडी और समाचार' : 'Live mandi and news'}>
      <em>{hi ? 'लाइव' : 'LIVE'}</em>
      <div className="live-ticker-mask">
        <div className="live-ticker-track">
          {loop.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              onClick={() => {
                if (item.kind === 'news') setActiveNav('news');
                else {
                  setSelectedModelId(item.module);
                  setActiveNav('models');
                  window.history.pushState(null, '', `#models/${item.module}`);
                }
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
