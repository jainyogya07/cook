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
        html, body {
          background: #07090d !important;
          overflow-x: hidden !important;
        }
        canvas {
          border-radius: 8px;
        }
        header h1, .text-sm.font-bold {
          font-size: clamp(11px, 1.1vw, 14px) !important;
          line-height: 1.25 !important;
        }
        /* Submodule sidebar width constraints to leave 3D canvas spacious */
        .w-80 {
          width: clamp(190px, 20vw, 240px) !important;
        }
        .w-\\[500px\\] {
          width: clamp(240px, 26vw, 320px) !important;
        }
        /* M12 Crop Cards container responsive fit */
        .w-\\[1140px\\] {
          width: calc(100% - 24px) !important;
          max-width: 100% !important;
          left: 12px !important;
          right: 12px !important;
        }
        /* M08 comparison badge collision prevention: offset Y so they never overlap horizontally */
        .absolute.top-16.left-6 {
          top: 10px !important;
          left: 8px !important;
          font-size: 9px !important;
          padding: 2px 6px !important;
        }
        .absolute.top-16.right-6 {
          top: 36px !important;
          right: 8px !important;
          font-size: 9px !important;
          padding: 2px 6px !important;
        }
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: '#FFFFFF' }}>M{String(moduleNumber).padStart(2, '0')} · {title}</span>
          <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', fontFamily: 'var(--font-mono)' }}>LIVE 3D</span>
        </div>
        <div className="nv-scene-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => window.open(src, '_blank')}
            title="Open in Full Standalone Window"
            style={{ fontSize: '11px', padding: '4px 10px', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px' }}
          >
            ↗ Standalone
          </button>
          {!showFrame ? (
            <button type="button" onClick={openLive} style={{ fontSize: '11px', padding: '4px 12px', cursor: 'pointer', background: '#38BDF8', color: '#05070B', border: 'none', fontWeight: 700, borderRadius: '999px' }}>
              <Play size={12} /> Launch 3D
            </button>
          ) : (
            <button type="button" onClick={() => setFull((v) => !v)} style={{ fontSize: '11px', padding: '4px 10px', cursor: 'pointer', background: full ? '#EF4444' : 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px' }}>
              {full ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              {full ? ' Exit Fullscreen' : ' ⛶ Fullscreen'}
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
