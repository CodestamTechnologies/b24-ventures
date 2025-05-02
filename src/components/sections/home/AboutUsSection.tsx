// components/sections/home/AboutUsSection.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const itemFadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-24 md:py-32 bg-background border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">

          {/* Left Column: Text Content */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-left">
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-5xl font-bold font-display mb-6 text-foreground">
                  Built for the <span className="text-brand-maroon">Venture Economy</span>.
              </motion.h2>
              <motion.p variants={itemFadeUp} className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                  Brown24 Ventures cuts through the noise, delivering curated startup intelligence and AI-powered insights directly to decision-makers.
              </motion.p>
              <motion.div variants={itemFadeUp} className="prose max-w-none prose-p:text-muted-foreground prose-strong:text-foreground/80 mb-8">
                  <p>Founded by industry insiders, VCs, and technologists, we understand the need for speed, accuracy, and relevance in today's fast-paced market.</p>
              </motion.div>
              <motion.div variants={itemFadeUp}>
                  <Button variant="link" className="p-0 h-auto text-primary hover:text-brand-maroon-dark font-semibold text-lg" asChild>
                      <Link href="/about"> Discover Our Mission <ArrowRight className="ml-2 h-5 w-5" /> </Link>
                  </Button>
              </motion.div>
          </motion.div>

           {/* Right Column: Placeholder Image */}
           <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2 }} className="relative aspect-4/3 rounded-xl border border-border shadow-lg overflow-hidden">
                 {/* Placeholder Image: Replace with your own */}
                 {/* Source: https://unsplash.com/photos/person-using-macbook-pro-on-brown-wooden-table-5fNmWej4tAA */}
                 <Image
                     // !! REPLACE THIS IMAGE SRC !!
                     src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="Abstract representing data analysis or professional workspace"
                     layout="fill"
                     objectFit="cover"
                     className="transition-transform duration-500 hover:scale-105" // Subtle zoom on hover
                     quality={80}
                 />
                 {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent"></div>
           </motion.div>

        </div>
      </div>
    </section>
  );
}