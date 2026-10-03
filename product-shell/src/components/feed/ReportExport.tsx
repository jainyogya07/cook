'use client';

import React, { useMemo } from 'react';
import { FileDown } from 'lucide-react';
import { FeedPost } from '@/types/shell';
import { canExportPdf, t } from '@/i18n/copy';
import { useShellStore } from '@/services/useShellStore';

interface ReportExportProps {
  post: FeedPost;
}

export default function ReportExport({ post }: ReportExportProps) {
  const { accessPlan, locale, showToast, setActiveNav } = useShellStore();

  const reportHtml = useMemo(() => {
    const body = locale === 'hi' && post.contentHi ? post.contentHi : post.content;
    const bullets = post.intelCard?.evidenceBullets?.map((item) => `<li>${item}</li>`).join('') || '';
    return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"/><title>${t(locale, 'reportTitle')}</title>
      <style>body{font-family:Georgia,serif;background:#0b0e14;color:#f4f4f2;padding:48px;max-width:720px;margin:auto;line-height:1.55}
      h1{font-size:28px;letter-spacing:-.03em} .meta{color:#94a3b8;font-size:13px;margin:8px 0 24px}
      .card{border:1px solid #1f2937;border-radius:16px;padding:20px;margin-top:20px;background:#111827} li{margin:8px 0}</style></head>
      <body><h1>${t(locale, 'reportTitle')}</h1>
      <div class="meta">${post.author.name} · ${post.timestamp} · ${post.intelCard?.region || ''}</div>
      <p>${body.replace(/\n/g, '<br/>')}</p>
      ${post.imageUrl ? `<img src="${post.imageUrl}" style="width:100%;border-radius:12px;margin-top:16px"/>` : ''}
      ${post.intelCard ? `<div class="card"><h3>${post.intelCard.title}</h3><ul>${bullets}</ul></div>` : ''}
      </body></html>`;
  }, [locale, post]);

  const exportPdf = () => {
    if (!canExportPdf(accessPlan)) {
      showToast(t(locale, 'reportPremium'), 'warning');
      setActiveNav('subscription');
      return;
    }
    const frame = window.open('', '_blank', 'width=900,height=1100');
    if (!frame) {
      showToast('Allow pop-ups to export the report.', 'warning');
      return;
    }
    frame.document.write(reportHtml);
    frame.document.close();
    frame.focus();
    setTimeout(() => frame.print(), 350);
  };

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        exportPdf();
      }}
      title={t(locale, 'exportPdf')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid rgba(230,198,92,.35)',
        background: 'rgba(230,198,92,.08)',
        color: '#E6C65C',
        fontSize: 11,
        fontWeight: 700
      }}
    >
      <FileDown size={13} />
      {t(locale, 'exportPdf')}
    </button>
  );
}
