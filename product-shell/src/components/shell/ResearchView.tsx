'use client';

import React from 'react';
import { FileDown, FlaskConical } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { canExportPdf, t } from '@/i18n/copy';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function ResearchView() {
  const { researchLog, locale, accessPlan, showToast, setActiveNav } = useShellStore();
  const hi = locale === 'hi';

  const exportPdf = () => {
    if (!canExportPdf(accessPlan)) {
      showToast(t(locale, 'reportPremium'), 'warning');
      setActiveNav('subscription');
      return;
    }
    const rows = researchLog
      .map((run) => {
        const cards = run.cards
          .map(
            (card) =>
              `<tr><td>M${String(card.moduleNumber).padStart(2, '0')}</td><td>${escapeHtml(card.title)}</td><td>${escapeHtml(card.metric)}</td><td>${escapeHtml(card.result)}</td></tr>`
          )
          .join('');
        return `<section>
          <h2>${escapeHtml(run.query)}</h2>
          <p class="meta">${new Date(run.at).toLocaleString()} · ${escapeHtml(run.headline).slice(0, 280)}</p>
          <table><thead><tr><th>Engine</th><th>Name</th><th>Specialist record</th><th>Plain finding</th></tr></thead><tbody>${cards}</tbody></table>
        </section>`;
      })
      .join('');
    const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"/><title>ATMOS 4D research log</title>
      <style>
        body { font-family: Georgia, serif; color: #111; background: #fff; padding: 40px; }
        h1 { font-size: 22px; }
        h2 { font-size: 16px; margin: 28px 0 8px; }
        .meta { color: #444; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
        th { background: #f4f4f4; }
      </style></head><body>
      <h1>ATMOS 4D · ${hi ? 'शोध लॉग' : 'Research log'}</h1>
      <p>Specialist records. Exposure is not loss. OBSERVED / SCENARIO / FORECAST stay separate.</p>
      ${rows || `<p>${hi ? 'अभी कोई रन नहीं।' : 'No runs yet.'}</p>`}
      </body></html>`;
    const frame = window.open('', '_blank', 'width=900,height=1100');
    if (!frame) {
      showToast('Allow pop-ups to export PDF.', 'warning');
      return;
    }
    frame.document.write(html);
    frame.document.close();
    frame.focus();
    window.setTimeout(() => frame.print(), 350);
  };

  return (
    <div className="nv-page nv-research">
      <div className="nv-page-head">
        <p><FlaskConical size={14} /> {t(locale, 'research')}</p>
        <h1>{hi ? 'शोध / विशेषज्ञ' : 'Research / specialist'}</h1>
        <span>{hi ? 'यहाँ इंजन के तकनीकी रिकॉर्ड हैं। किसान कार्ड आसान भाषा में रहते हैं।' : 'Technical engine records live here. Farmer cards stay in plain language.'}</span>
      </div>
      <div className="nv-research-bar">
        <button type="button" className="nv-run" onClick={exportPdf}>
          <FileDown size={14} /> {t(locale, 'exportPdf')}
        </button>
      </div>
      {researchLog.length === 0 ? (
        <p className="nv-hint">{hi ? 'पहले Ask में एक सवाल पूछो — रन यहीं आएगा।' : 'Ask one question first. That run lands here.'}</p>
      ) : (
        researchLog.map((run) => (
          <article key={run.id} className="nv-research-run">
            <header>
              <strong>{run.query}</strong>
              <em>{new Date(run.at).toLocaleString()}</em>
            </header>
            <p>{run.headline}</p>
            <table>
              <thead>
                <tr>
                  <th>M</th>
                  <th>{hi ? 'इंजन' : 'Engine'}</th>
                  <th>{hi ? 'आसान बात' : 'Plain'}</th>
                  <th>{hi ? 'विशेषज्ञ माप' : 'Specialist metric'}</th>
                </tr>
              </thead>
              <tbody>
                {run.cards.map((card) => (
                  <tr key={`${run.id}-${card.moduleNumber}`}>
                    <td>M{String(card.moduleNumber).padStart(2, '0')}</td>
                    <td>{card.title}</td>
                    <td>{card.result}</td>
                    <td><code>{card.metric}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {run.links.length > 0 && (
              <div className="nv-source-row">
                {run.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))
      )}
    </div>
  );
}
