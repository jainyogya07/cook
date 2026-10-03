'use client';

import React, { useMemo } from 'react';
import { FileDown } from 'lucide-react';
import { FeedPost } from '@/types/shell';
import { canExportPdf, t } from '@/i18n/copy';
import { useShellStore } from '@/services/useShellStore';
import { cleanNewsText } from '@/lib/cleanNews';

interface ReportExportProps {
  post: FeedPost;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function ReportExport({ post }: ReportExportProps) {
  const { accessPlan, locale, showToast, setActiveNav } = useShellStore();

  const reportHtml = useMemo(() => {
    const body = cleanNewsText(locale === 'hi' && post.contentHi ? post.contentHi : post.content);
    const title = cleanNewsText(post.intelCard?.title || post.author.name);
    const bullets = (post.intelCard?.evidenceBullets || [])
      .map((item) => cleanNewsText(item))
      .filter(Boolean)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');
    return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"/><title>${escapeHtml(t(locale, 'reportTitle'))}</title>
      <style>
        * { box-sizing: border-box; }
        html, body { background: #ffffff !important; color: #111111 !important; }
        body { font-family: Georgia, 'Times New Roman', serif; padding: 48px; max-width: 720px; margin: auto; line-height: 1.6; }
        h1, h2, h3, p, li, div { color: #111111 !important; }
        a, a:link, a:visited { color: #111111 !important; text-decoration: none !important; }
        h1 { font-size: 26px; letter-spacing: -0.03em; margin: 0 0 8px; }
        .meta { color: #444444 !important; font-size: 13px; margin: 0 0 24px; }
        .card { border: 1px solid #dddddd; border-radius: 8px; padding: 20px; margin-top: 20px; background: #f7f7f7; }
        li { margin: 8px 0; }
        @media print {
          html, body { background: #ffffff !important; color: #111111 !important; }
          a { color: #111111 !important; }
        }
      </style></head>
      <body>
      <h1>${escapeHtml(t(locale, 'reportTitle'))}</h1>
      <div class="meta">${escapeHtml(post.author.name)} · ${escapeHtml(post.timestamp)} · ${escapeHtml(post.intelCard?.region || '')}</div>
      <p>${escapeHtml(body).replace(/\n/g, '<br/>')}</p>
      ${title ? `<div class="card"><h3>${escapeHtml(title)}</h3>${bullets ? `<ul>${bullets}</ul>` : ''}</div>` : ''}
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
