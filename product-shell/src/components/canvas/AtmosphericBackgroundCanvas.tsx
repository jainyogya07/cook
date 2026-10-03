'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Global Background Surface (Cloned Galaxy Hyperspeed Warp from Ascend)
// Provides 360-degree incoming warp rays, cosmic dust, mouse parallax tilt,
// and scroll-velocity acceleration across all views.
// ============================================================================

import React from 'react';
import HyperspeedBackground from './HyperspeedBackground';

export interface AtmosphericBackgroundCanvasProps {
  variant?: 'landing' | 'shell' | 'explore' | 'workspace';
}

export default function AtmosphericBackgroundCanvas(_props?: AtmosphericBackgroundCanvasProps) {
  return <HyperspeedBackground />;
}

export { HyperspeedBackground };
