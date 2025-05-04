"use client";
import React, { useState, useEffect } from 'react';
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import FloatingNavAndMobileTrigger from "@/components/layout/FloatingNavAndMobileTrigger";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { motion, AnimatePresence } from 'framer-motion';
import { LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import "./globals.css";

// Import fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['400', '700'] });

interface RootLayoutProps { 
  children: React.ReactNode; 
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Reduced loading time for better UX

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

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
          {/* Use LazyMotion to properly load Framer Motion features */}
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <Preloader key="preloader" />
              ) : (
                <motion.div
                  key="main-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col flex-grow"
                >
                  <main className="flex-grow flex-shrink-0">
                    {children}
                  </main>
                  <FloatingNavAndMobileTrigger />
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
          </LazyMotion>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}