// components/sections/home/Features.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Handshake, Cpu, Globe, MessagesSquare, ListChecks, TrendingUp, DollarSign, Bookmark, Users, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem { title: string; description: string; icon: LucideIcon; }
interface SnapshotItem { name: string; icon: LucideIcon; }

const whyFeatures: FeatureItem[] = [
    { title: "Curated for You", description: "Handpicked news, funding updates, and tech breakthroughs relevant to your interests – no fluff.", icon: Handshake },
    { title: "AI-Powered Intelligence", description: "Our engine learns what matters to you, recommending critical insights based on your focus.", icon: Cpu },
    { title: "Global Reach, Local Focus", description: "Unified feed covering global startup ecosystems and investment trends, tailored to your view.", icon: Globe },
    { title: "Community & Collaboration", description: "Discuss insights, share perspectives, and connect with fellow founders and investors.", icon: MessagesSquare }
];
const snapshotFeatures: SnapshotItem[] = [
    { name: "Personalized Feed", icon: ListChecks }, { name: "Trending Stories", icon: TrendingUp },
    { name: "Funding Analysis", icon: DollarSign }, { name: "Smart Bookmarks", icon: Bookmark },
    { name: "Team Collaboration", icon: Users }, { name: "Topic Alerts", icon: Bell },
];

const itemFadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function Features() {
    if (!whyFeatures.length && !snapshotFeatures.length) return null;

    return (
        <section id="features" className="py-24 md:py-32 bg-secondary border-y border-border">
            <div className="container mx-auto px-4">
                 <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                     <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block group"> Why Brown24? <span className="section-header-underline"></span> </h2>
                      <p className="text-lg text-muted-foreground mt-6"> We combine expert curation with AI to deliver the startup intelligence you need, without the noise. </p>
                 </motion.div>

                {whyFeatures.length > 0 && (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24" initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }} viewport={{ once: true, amount: 0.1 }}>
                        {whyFeatures.map((feature) => (
                            <motion.div key={feature.title} variants={itemFadeUp} className="group bg-background rounded-xl border border-border p-6 md:p-8 text-left transition-all duration-300 ease-out hover:shadow-lg">
                                <div className="flex flex-col h-full">
                                    <div className="mb-5 w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 text-primary flex-shrink-0"> <feature.icon className="h-6 w-6" /> </div>
                                    <h3 className="text-xl lg:text-2xl font-semibold font-display mb-3 text-foreground"> {feature.title} </h3>
                                    <p className="text-muted-foreground text-base leading-relaxed flex-grow"> {feature.description} </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {snapshotFeatures.length > 0 && (
                    <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} viewport={{ once: true, amount: 0.1 }}>
                        <motion.h3 variants={itemFadeUp} className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground font-display group"> Features Snapshot <span className="section-header-underline"></span> </motion.h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {snapshotFeatures.map((item) => (
                                <motion.div key={item.name} variants={itemFadeUp} className="flex items-center space-x-3 bg-background/50 rounded-lg p-3.5 border border-border transition-colors duration-200 hover:bg-background hover:border-muted">
                                    <div className="text-primary flex-shrink-0"> <item.icon className="h-5 w-5" /> </div>
                                    <span className="text-foreground/80 text-base">{item.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}