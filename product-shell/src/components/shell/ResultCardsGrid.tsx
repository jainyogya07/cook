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
  const { locale, openModuleWorkspace, showToast } = useShellStore();
  const hi = locale === 'hi';

  return (
    <div className="nv-result-grid">
      {headline ? <p className="nv-result-headline">{headline}</p> : null}
      {cards.map((card) => (
        <article key={card.moduleNumber} className="nv-result-card">
          <div className="nv-result-card-kicker">M{String(card.moduleNumber).padStart(2, '0')}</div>
          <h3>{card.title}</h3>
          <p><strong>{hi ? 'क्यों चला' : 'Why it ran'}</strong> {card.why}</p>
          <p><strong>{hi ? 'नतीजा' : 'What it found'}</strong> {card.result}</p>
          <div className="nv-result-metric">{card.metric}</div>
          <button
            type="button"
            onClick={() => {
              openModuleWorkspace(card.moduleNumber, 3000 + card.moduleNumber, card.title);
              showToast(hi ? '3D इंजन खुला' : 'Opened 3D engine', 'info');
            }}
          >
            {hi ? '3D खोलें' : 'Open 3D'}
          </button>
        </article>
      ))}
    </div>
  );
}
