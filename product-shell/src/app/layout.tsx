import React, { type ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ATMOS 4D | गगनात् भूमौ, ज्ञानात् समृद्धौ',
  description:
    'Planetary to parcel physical intelligence shell. Natural language query orchestration across atmospheric physics, downscaled hazard probability, phenological exposure, and commodity market shocks.',
  icons: {
    icon: '/emblem.jpg'
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#000000', color: '#E7E9EA' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#000000', color: '#E7E9EA', minHeight: '100vh', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
