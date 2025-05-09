// components/sections/home/Features.tsx
"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {  ListChecks, TrendingUp, DollarSign, Bookmark, Users, Bell } from "lucide-react";
import { useInView } from "react-intersection-observer";

// interface FeatureItem { title: string; description: string; icon: LucideIcon; }
interface SnapshotItem { name: string; icon: LucideIcon; }

// const whyFeatures: FeatureItem[] = [
//     { title: "Curated For You", description: "Handpicked news, funding updates, and tech breakthroughs relevant to your interests.", icon: Handshake },
//     { title: "Intelligent Engine", description: "Our engine learns what matters to you, recommending critical insights based on your focus.", icon: Cpu },
//     { title: "Global Reach, Local Focus", description: "Unified feed covering global startup ecosystems and investment trends, tailored to your view.", icon: Globe },
//     { title: "Community & Collaboration", description: "Discuss insights, share perspectives, and connect with fellow founders and investors.", icon: MessagesSquare }
// ];
const snapshotFeatures: SnapshotItem[] = [
    { name: "Personalized Feed", icon: ListChecks }, { name: "Trending Stories", icon: TrendingUp },
    { name: "Funding Analysis", icon: DollarSign }, { name: "Smart Bookmarks", icon: Bookmark },
    { name: "Team Collaboration", icon: Users }, { name: "Topic Alerts", icon: Bell },
];

const itemFadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  } 
};

const staggerContainer = { 
  hidden: {}, 
  visible: { 
    transition: { 
      staggerChildren: 0.07,
      delayChildren: 0.1
    } 
  } 
};

// const headerFadeIn = { 
//   hidden: { opacity: 0, y: -10 }, 
//   visible: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { 
//       duration: 0.7, 
//       ease: "easeOut" 
//     } 
//   } 
// };

export default function Features() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    // if (!whyFeatures.length && !snapshotFeatures.length) return null;

    return (
        <section id="features" className="py-24 md:py-32 bg-background border-y border-border overflow-hidden">
            <div className="container mx-auto px-4" ref={ref}>
                 {/* Section Header with Animation */}
              
                {/* Snapshot Features Section with Animation */}
                {snapshotFeatures.length > 0 && (
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial="hidden"
                        animate={controls}
                        variants={staggerContainer}
                    >
                        {/* Snapshot Header with Animation */}
                        <motion.div className="text-center mb-12">
                            <motion.h3
                                variants={itemFadeUp}
                                className="text-3xl md:text-4xl font-semibold text-foreground font-display relative inline-block group"
                            >
                                Features Snapshot <span className="section-header-underline"></span>
                            </motion.h3>
                        </motion.div>

                        {/* Snapshot Grid with Animation */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                            variants={staggerContainer}
                        >
                            {snapshotFeatures.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    variants={itemFadeUp}
                                    custom={index}
                                    className="flex items-center bg-white space-x-3 bg-background/50 rounded-lg p-3.5 border border-border transition-colors duration-200 hover:bg-background hover:border-muted"
                                >
                                    <div className="text-primary flex-shrink-0">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-foreground/80 text-base">{item.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}