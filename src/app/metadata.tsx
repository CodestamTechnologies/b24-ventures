import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brown24 Ventures - Startup Intelligence, Simplified",
  description: "Your daily edge in the venture world. Curated news & smart insights for investors and founders.",
  icons: { icon: '/favicon.ico' },
  openGraph: {
      title: "Brown24 Ventures - Startup Intelligence, Simplified",
      description: "Curated news & smart insights for investors & founders.",
      url: "https://your-actual-domain.com", // Replace!
      siteName: "Brown24 Ventures",
      images: [ { url: 'https://your-actual-domain.com/og-image.png', width: 1200, height: 630 } ], // Replace!
      locale: 'en_US',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: "Brown24 Ventures - Startup Intelligence, Simplified",
      description: "Curated news & smart insights for investors & founders.",
      // site: '@yourtwitterhandle', // Optional: Add Twitter handle
      images: ['https://your-actual-domain.com/twitter-image.png'], // Replace!
  },
};