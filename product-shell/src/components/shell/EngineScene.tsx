'use client';

import React, { useCallback, useState } from 'react';
import { Maximize2, Minimize2, Play } from 'lucide-react';

function familyOf(moduleNumber: number) {
  if (moduleNumber <= 6) return 'sky';
  if (moduleNumber <= 8) return 'village';
  if (moduleNumber <= 14) return 'crop';
  return 'mandi';
}

export default function EngineScene({
  moduleNumber,
  title,
  variant = 'live'
}: {
  moduleNumber: number;
  title: string;
  variant?: 'poster' | 'live';
}) {
  const [full, setFull] = useState(false);
  const [live, setLive] = useState(variant === 'live');
  const src = `/module${String(moduleNumber).padStart(2, '0')}/index.html`;
  const family = familyOf(moduleNumber);
  const showFrame = live || full;

  const onLoad = useCallback((event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const doc = event.currentTarget.contentDocument;
      if (!doc) return;
      const style = doc.createElement('style');
      style.textContent = `
        html, body { background: #07090d !important; }
        canvas { border-radius: 8px; }
      `;
      doc.head?.appendChild(style);
    } catch {
      /* static modules still render */
    }
  }, []);

  const openLive = () => {
    setLive(true);
    setFull(true);
  };

  return (
    <div className={`nv-scene-shell${full ? ' is-full' : ''}`}>
      <div className="nv-scene-bar">
        <span>M{String(moduleNumber).padStart(2, '0')} · {title}</span>
        <div className="nv-scene-actions">
          {!showFrame ? (
            <button type="button" onClick={openLive}>
              <Play size={14} /> Live 3D
            </button>
          ) : (
            <button type="button" onClick={() => setFull((v) => !v)}>
              {full ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {full ? ' Exit' : ' Full'}
            </button>
          )}
        </div>
      </div>

      {!showFrame && (
        <button type="button" className={`nv-engine-poster is-${family}`} onClick={openLive}>
          <div className="nv-engine-art" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="nv-engine-play"><Play size={18} /></span>
          <div className="nv-engine-poster-meta">
            <em>Thumbnail</em>
            <strong>{title}</strong>
            <span>Open live 3D — full screen, not cramped</span>
          </div>
        </button>
      )}

      {showFrame && (
        <iframe
          className="nv-module-frame"
          title={title}
          src={src}
          allow="accelerometer; autoplay; camera; gyroscope"
          onLoad={onLoad}
        />
      )}
    </div>
  );
}
