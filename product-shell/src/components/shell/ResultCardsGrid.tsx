'use client';

import { ResultCard } from '@/services/resultCards';
import { useShellStore } from '@/services/useShellStore';

export default function ResultCardsGrid({
  cards,
  headline
}: {
  cards: ResultCard[];
  headline?: string;
}) {
  const { locale, openModuleWorkspace, showToast, setActiveNav } = useShellStore();
  const hi = locale === 'hi';

  return (
    <div className="nv-result-grid">
      {headline ? <p className="nv-result-headline">{headline}</p> : null}
      {cards.map((card) => (
        <article key={card.moduleNumber} className="nv-result-card">
          <div className="nv-result-card-kicker">{hi ? 'आसान कार्ड' : 'Plain card'} · M{String(card.moduleNumber).padStart(2, '0')}</div>
          <h3>{card.title}</h3>
          <p><strong>{hi ? 'क्या हुआ' : 'What this means'}</strong> {card.result}</p>
          <p><strong>{hi ? 'अब क्या करें' : 'Do this next'}</strong> {card.action}</p>
          <div className="nv-result-actions">
            <button
              type="button"
              onClick={() => {
                openModuleWorkspace(card.moduleNumber, 3000 + card.moduleNumber, card.title);
                showToast(hi ? '3D खुला' : 'Opened 3D', 'info');
              }}
            >
              {hi ? 'नक्शा / 3D' : 'Map / 3D'}
            </button>
            <button
              type="button"
              className="is-ghost"
              onClick={() => setActiveNav('research')}
            >
              {hi ? 'शोध रिकॉर्ड' : 'Research record'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
