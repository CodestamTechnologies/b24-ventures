"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ListChecks, TrendingUp, DollarSign, Bookmark, Users, Bell, LucideIcon } from "lucide-react";

interface SnapshotItem {
  name: string;
  icon: LucideIcon;
}

const snapshotFeatures: SnapshotItem[] = [
  { name: "Personalized Feed", icon: ListChecks },
  { name: "Trending Stories", icon: TrendingUp },
  { name: "Funding Analysis", icon: DollarSign },
  { name: "Smart Bookmarks", icon: Bookmark },
  { name: "Team Collaboration", icon: Users },
  { name: "Topic Alerts", icon: Bell },
];

const itemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 10
    }
  }
};

// Simplified variants for mobile
const mobileVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 }
};

export default function Features() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener for resize
      window.addEventListener('resize', checkIfMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      // Only start animation if not on mobile
      if (!isMobile) {
        controls.start("visible");
      } else {
        // Immediately set to visible state on mobile
        controls.start("visible");
      }
    }
  }, [controls, inView, isMobile]);

  // Get the appropriate variants based on device
  const getVariants = () => isMobile ? mobileVariants : itemFadeUp;
  const getStaggerVariants = () => isMobile ? { hidden: {}, visible: {} } : staggerContainer;
  const getIconHoverVariants = () => isMobile ? { rest: {}, hover: {} } : iconHover;

  return (
    <section 
      id="features" 
      className="py-24 md:py-32 bg-background border-y border-border -mt-1 overflow-hidden relative"
      ref={ref}
    >
      {/* Background decorative elements - conditionally animated */}
      {!isMobile && (
        <>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.05, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-maroon blur-[100px] pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.05, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 blur-[120px] pointer-events-none"
          />
        </>
      )}

      <div className="container mx-auto px-4">
        {snapshotFeatures.length > 0 && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate={controls}
            variants={getStaggerVariants()}
          >
            {/* Header */}
            <motion.div className="text-center mb-12 md:mb-16">
              <motion.h3
                variants={getVariants()}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              >
                Features <motion.span 
                  className="text-brand-maroon inline-block"
                  initial={{ opacity: 0.8 }}
                  animate={isMobile ? { opacity: 1 } : { 
                    opacity: 1,
                    transition: { 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }
                  }}
                >
                  Snapshot
                </motion.span>
              </motion.h3>
              <motion.p 
                variants={getVariants()}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
              >
                Delivered Daily
              </motion.p>
              <motion.p 
                variants={getVariants()}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
              </motion.p>
            </motion.div>

            {/* Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              variants={getStaggerVariants()}
            >
              {snapshotFeatures.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={getVariants()}
                  custom={index}
                  whileHover={!isMobile ? {
                    y: -8,
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }
                  } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center space-x-3 bg-background rounded-xl p-4 border border-border transition-all duration-200 hover:bg-muted/50 cursor-pointer relative overflow-hidden group"
                >
                  {/* Hover effect background */}
                  {!isMobile && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-brand-maroon/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                  
                  {/* Icon with animation */}
                  <motion.div 
                    className="text-primary flex-shrink-0 p-2 rounded-lg bg-brand-maroon/10 group-hover:bg-brand-maroon/20 transition-colors"
                    variants={getIconHoverVariants()}
                    initial="rest"
                    whileHover={!isMobile ? "hover" : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  
                  <span className="text-foreground/90 text-base font-medium">{item.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}