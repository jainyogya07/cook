'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type GlassOption = { value: string; label: string; hint?: string };

export default function GlassMenu({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: GlassOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((item) => item.value === value) || options[0];

  useEffect(() => {
    const hide = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', hide);
    return () => document.removeEventListener('mousedown', hide);
  }, []);

  return (
    <div className="glass-menu" ref={root}>
      <span className="nv-hint">{label}</span>
      <button type="button" className="glass-menu-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>
          {current?.label}
          {current?.hint ? <small>{current.hint}</small> : null}
        </span>
        <ChevronDown size={14} />
      </button>
      {open ? (
        <ul className="glass-menu-list">
          {options.map((item) => (
            <li key={item.value}>
              <button
                type="button"
                className={item.value === value ? 'is-on' : ''}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
                {item.hint ? <small>{item.hint}</small> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
