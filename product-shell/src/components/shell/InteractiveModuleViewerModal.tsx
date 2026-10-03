'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Interactive Module Viewer Modal (In-Situ 3D Engine Inspection Deck)
// Allows the module's own rich scientific visual environment to dominate
// Top-Left: "← Back to Intelligence"
// ============================================================================

import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import DedicatedModuleSimulator from './DedicatedModuleSimulator';

export default function InteractiveModuleViewerModal() {
  const { activeModuleViewer, closeModuleViewer, locale } = useShellStore();
  const [key, setKey] = useState(0);

  if (!activeModuleViewer) return null;

  const { moduleNumber, title } = activeModuleViewer;

  const defaultBasin = {
    id: 'odisha',
    nameEn: 'Coastal Odisha / Bay of Bengal',
    nameHi: 'तटीय ओडिशा / बंगाल की खाड़ी',
    coords: '85.8°E, 19.8°N',
    hazardEn: 'Heavy Rain / Cyclone Alert',
    hazardHi: 'भारी बारिश / चक्रवात',
    soilTypeEn: 'Alluvial / Coastal Saturated Clay',
    soilTypeHi: 'जलोढ़ / तटीय संतृप्त मिट्टी'
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07111F]/95 backdrop-blur-xl flex flex-col font-sans select-none animate-in fade-in duration-200">
      {/* Viewer Top Navigation Bar */}
      <header className="h-14 border-b border-[rgba(110,170,220,0.16)] bg-[#07111F] px-4 flex items-center justify-between text-[#F4F8FC] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={closeModuleViewer}
            className="px-3 py-1.5 rounded-full bg-[#0B1728] border border-[rgba(110,170,220,0.2)] hover:bg-[#13253B] text-[#F4F8FC] flex items-center gap-2 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#36C5FF]" />
            <span>Back to Intelligence</span>
          </button>

          <div className="h-5 w-px bg-[rgba(110,170,220,0.16)]" />

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18A9E8]/10 text-[#36C5FF] border border-[#18A9E8]/30 font-bold">
              ENGINE {moduleNumber < 10 ? `0${moduleNumber}` : moduleNumber}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0B1728] text-[#10B981] border border-[#10B981]/30 font-bold">
              3D ACCELERATED
            </span>
            <h2 className="text-sm font-bold text-white font-mono tracking-wide truncate max-w-md">
              {title}
            </h2>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="p-2 rounded-full hover:bg-[#13253B] text-[#9BAFC3] hover:text-white transition-colors"
            title="Reset Engine Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={closeModuleViewer}
            className="p-2 rounded-full hover:bg-[#13253B] text-[#9BAFC3] hover:text-white transition-colors"
            title="Close Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Embedded High-Performance Live 3D Module */}
      <div className="flex-1 w-full h-full relative bg-[#040914] overflow-hidden">
        {moduleNumber === 1 ? (
          <iframe
            key={key}
            src="/module01/index.html"
            className="w-full h-full border-none"
            title="Module 01 Planetary Volumetric Earth Globe"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
          />
        ) : (
          <DedicatedModuleSimulator
            key={key}
            moduleNumber={moduleNumber}
            title={title}
            basin={defaultBasin}
            horizon="+72h"
            locale={locale || 'en'}
            realtimeData={{
              riskCategory: 'CRITICAL CONVERGENCE',
              advisoryBullet: 'Active 3D biophysical monitoring along coastal river corridor.'
            }}
          />
        )}
      </div>
    </div>
  );
}
