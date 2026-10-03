'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import FeedPostCard from '@/components/feed/FeedPostCard';
import { t } from '@/i18n/copy';

const PAGE = 4;

export default function NewsDeskView() {
  const { posts, fetchLiveNews, locale, isNewsLiveSyncing } = useShellStore();
  const [page, setPage] = useState(0);
  const hi = locale === 'hi';

  useEffect(() => {
    void fetchLiveNews('weather', 'India', locale);
    void fetchLiveNews('mandi', 'India', locale);
  }, [fetchLiveNews, locale]);

  const total = Math.max(1, Math.ceil(posts.length / PAGE));
  const slice = useMemo(() => posts.slice(page * PAGE, page * PAGE + PAGE), [posts, page]);

  useEffect(() => {
    if (page > total - 1) setPage(0);
  }, [page, total]);

  return (
    <div className="nv-page nv-tweets">
      <div className="nv-page-head">
        <p>{t(locale, 'news')}</p>
        <h1>{hi ? 'टाइमलाइन' : 'Timeline'}</h1>
        <span>{isNewsLiveSyncing ? (hi ? 'लाइव आ रहा है…' : 'Live updating…') : (hi ? 'लाइव समाचार + डेस्क' : 'Live news + desk')}</span>
      </div>

      <div className="nv-tweet-col">
        {slice.length === 0 ? (
          <div className="nv-empty">{hi ? 'अभी ट्वीट नहीं।' : 'No tweets yet.'}</div>
        ) : slice.map((post) => <FeedPostCard key={post.id} post={post} compact />)}
      </div>

      <div className="nv-pager">
        <button type="button" disabled={page === 0} onClick={() => setPage((n) => Math.max(0, n - 1))}>
          <ChevronLeft size={14} /> {hi ? 'पिछला' : 'Prev'}
        </button>
        <span>{hi ? `पृष्ठ ${page + 1} / ${total}` : `Page ${page + 1} / ${total}`}</span>
        <button type="button" disabled={page >= total - 1} onClick={() => setPage((n) => Math.min(total - 1, n + 1))}>
          {hi ? 'अगला' : 'Next'} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
