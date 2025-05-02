// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import FloatingNavAndMobileTrigger from "@/components/layout/FloatingNavAndMobileTrigger";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['400', '700'] });

// !! REPLACE PLACEHOLDER URLS !!
export const metadata: Metadata = {
  title: "Brown24 Ventures - Startup Intelligence, Simplified",
  description: "Your daily edge in the venture world. Curated news & AI insights for investors and founders.",
  icons: { icon: '/favicon.ico' }, // Ensure favicon.ico is in /public
  openGraph: {
      title: "Brown24 Ventures - Startup Intelligence, Simplified",
      description: "Curated news & AI insights for investors & founders.",
      url: "https://your-actual-domain.com", // Replace!
      siteName: "Brown24 Ventures",
      images: [ { url: 'https://your-actual-domain.com/og-image.png', width: 1200, height: 630 } ], // Replace!
      locale: 'en_US',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: "Brown24 Ventures - Startup Intelligence, Simplified",
      description: "Curated news & AI insights for investors & founders.",
      // site: '@yourtwitterhandle', // Optional: Add Twitter handle
      images: ['https://your-actual-domain.com/twitter-image.png'], // Replace!
  },
};

interface RootLayoutProps { children: React.ReactNode; }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body
        className={cn(
          "min-h-full h-full bg-background font-sans flex flex-col",
          "pb-24 md:pb-28", // Space for floating nav
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
           <main className="flex-grow flex-shrink-0">
             {children}
           </main>
          <FloatingNavAndMobileTrigger />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}