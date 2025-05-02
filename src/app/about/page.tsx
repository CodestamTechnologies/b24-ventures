// app/about/page.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Users, Target, Lightbulb, Zap } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn for potential utility use

const itemFadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-background via-secondary to-background min-h-[calc(100vh-100px)] pt-28 pb-24 md:pt-36 md:pb-32 text-foreground overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section 1: Header & Intro */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <motion.h1 variants={itemFadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 text-foreground"> Our Mission: <span className="text-brand-maroon">Clarity</span> in Venture </motion.h1>
            <motion.p variants={itemFadeUp} transition={{delay: 0.1}} className="text-xl md:text-2xl text-muted-foreground leading-relaxed"> We're simplifying the complex world of startup intelligence for investors, founders, and operators worldwide. </motion.p>
        </motion.div>

        {/* Section 2: Image placeholder */}
         <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="relative aspect-16/9 max-w-5xl mx-auto rounded-2xl border border-border shadow-xl overflow-hidden mb-16 md:mb-24">
             {/* Placeholder Image: Replace with your own relevant team/office/abstract image */}
             {/* Source: https://unsplash.com/photos/two-woman-and-man-sitting-on-chair-near-table-inside-room-during-daytime-5fNmWej4tAA */}
            <Image
                // !! REPLACE THIS IMAGE SRC !!
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team collaborating or abstract representation of Brown24 Ventures"
                layout="fill"
                objectFit="cover"
                quality={85}
                className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent"></div>
        </motion.div>


        {/* Section 3: Who We Are / Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto mb-16 md:mb-24">
            {/* Who We Are Card */}
            <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }} className="card-enhanced p-8 md:p-10 text-left flex flex-col bg-gradient-subtle"> {/* Subtle gradient card */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users className="w-5 h-5"/></div>
                    <h2 className="text-2xl md:text-3xl font-semibold font-display text-foreground">Who We Are</h2>
                </div>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed flex-grow about-card"> {/* Added class to prevent prose conflict */}
                    <p>Brown24 Ventures was founded by a team of experienced VCs, startup operators, and technologists who saw a critical need for focused, actionable intelligence in the venture ecosystem.</p>
                    <p>We leverage proprietary AI alongside expert human curation to filter out the noise and deliver the signals that truly matter for strategic decision-making.</p>
                </div>
            </motion.div>

             {/* Our Vision Card */}
            <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2 }} className="card-enhanced p-8 md:p-10 text-left flex flex-col bg-gradient-subtle">
                 <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Target className="w-5 h-5"/></div>
                    <h2 className="text-2xl md:text-3xl font-semibold font-display text-foreground">Our Vision</h2>
                </div>
                <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed flex-grow about-card">
                    <p>To be the indispensable global platform for venture intelligence. We aim to empower our users with the clarity and foresight needed to navigate and succeed in the dynamic world of startups and venture capital.</p>
                </div>
            </motion.div>
        </div>

         {/* Section 4: Values */}
         <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mx-auto text-center">
             <h3 className="text-3xl md:text-4xl font-semibold font-display mb-10 text-foreground group relative inline-block">Our Values <span className="section-header-underline"></span></h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground">
                 <div className="flex flex-col items-center gap-3 text-center">
                     <Lightbulb className="w-10 h-10 text-primary mb-2"/>
                     <span className="font-semibold text-xl font-display text-foreground/90">Clarity</span>
                     <p className="text-base">Cutting through the noise to deliver focused, relevant insights.</p>
                 </div>
                 <div className="flex flex-col items-center gap-3 text-center">
                     <Target className="w-10 h-10 text-primary mb-2"/>
                     <span className="font-semibold text-xl font-display text-foreground/90">Accuracy</span>
                     <p className="text-base">Prioritizing verified data and trustworthy sources.</p>
                 </div>
                  <div className="flex flex-col items-center gap-3 text-center">
                     <Zap className="w-10 h-10 text-primary mb-2"/>
                     <span className="font-semibold text-xl font-display text-foreground/90">Efficiency</span>
                     <p className="text-base">Saving you time by delivering critical intelligence faster.</p>
                 </div>
             </div>
         </motion.div>

      </div>
    </div>
  );
}