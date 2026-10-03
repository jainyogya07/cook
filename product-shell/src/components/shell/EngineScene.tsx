'use client';

import React, { useCallback, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function EngineScene({ moduleNumber, title }: { moduleNumber: number; title: string }) {
  const [full, setFull] = useState(false);
  const src = `/module${String(moduleNumber).padStart(2, '0')}/index.html`;

  const onLoad = useCallback((event: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const doc = event.currentTarget.contentDocument;
      if (!doc) return;
      const style = doc.createElement('style');
      style.textContent = `
        html, body { filter: saturate(0.55) hue-rotate(-14deg) contrast(1.04) !important; }
        canvas { filter: saturate(0.62) hue-rotate(-10deg); }
      `;
      doc.head?.appendChild(style);
    } catch {
      /* static modules without extra CSS still render */
    }
  }, []);

  return (
    <div className={`nv-scene-shell${full ? ' is-full' : ''}`}>
      <div className="nv-scene-bar">
        <span>M{String(moduleNumber).padStart(2, '0')} · {title}</span>
        <button type="button" onClick={() => setFull((v) => !v)}>
          {full ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          {full ? ' Exit' : ' Full'}
        </button>
      </div>
      <iframe className="nv-module-frame" title={title} src={src} allow="accelerometer; autoplay; camera; gyroscope" onLoad={onLoad} />
    </div>
  );
}
