'use client';

import dynamic from 'next/dynamic';

const BackgroundCanvas = dynamic(() => import('./AtmosphericBackgroundCanvas'), {
  ssr: false
});

export default BackgroundCanvas;
