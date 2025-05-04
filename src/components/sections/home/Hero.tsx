"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Simple animation variant for logo
const logoFadeIn = { 
  hidden: { opacity: 0, x: -20 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" } 
  } 
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16 pb-16 md:pt-28 md:pb-20 px-4">
        {/* Background Elements - Static */}
        <div className="absolute inset-0 -z-10">
             <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-90"></div>
             <div className="absolute top-[10%] left-[-10%] w-72 h-72 bg-primary/5 rounded-full filter blur-2xl opacity-70 animate-subtle-pulse" style={{ animationDelay: '0s', '--pulse-opacity': 0.6 } as React.CSSProperties} />
             <div className="absolute bottom-[15%] right-[-10%] w-80 h-80 bg-muted/20 rounded-full filter blur-3xl opacity-70 animate-subtle-pulse" style={{ animationDelay: '2s', '--pulse-opacity': 0.5 } as React.CSSProperties}/>
             <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C2A4E\' fill-opacity=\'0.02\'%3E%3Ccircle fill-opacity=\'0.03\' cx=\'40\' cy=\'40\' r=\'40\'/%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'10\'/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>

        {/* Logo Top Left with Animation - Moved closer to content */}
        <motion.div
            variants={logoFadeIn}
            initial="hidden"
            animate="visible" // Will animate on page load instead of scroll!
            className="absolute top-0 left-4 md:top-0 md:left-6 lg:top-0 lg:left-8 z-50"
        >
            <Link href="/" aria-label="Brown24 Ventures Home">
                <Image
                    src="/B24 Logo.png" 
                    alt="Brown24 Ventures Logo"
                    width={280}
                    height={210}
                    priority
                    className="h-auto w-40 md:w-52 lg:w-64"
                />
            </Link>
        </motion.div>

        {/* Main Content Grid with Animation - Reduced top margin */}
        <div className="container mx-auto px-4 relative z-10 mt-4 md:mt-6 lg:mt-8">
            <div className="grid lg:grid-cols-12 lg:gap-16 items-center">
                {/* Text Column - Using ScrollReveal */}
                <div className="lg:col-span-7 text-left">
                    <ScrollReveal direction="up">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.75rem] font-bold font-display mb-5 leading-tight text-foreground">
                            Actionable Startup Intelligence,
                            <span className="text-brand-maroon block mt-1 md:mt-0">Delivered Daily.</span>
                        </h1>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="up" delay={0.1}>
                        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
                            Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
                        </p>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="up" delay={0.2}>
                        {/* App Store and Google Play Buttons - Official Images */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <Link href="#appstore" className="transform hover:scale-105 transition-transform duration-200">
                                <Image 
                                    src="/app-store-badge.png" 
                                    alt="Download on the App Store" 
                                    width={180} 
                                    height={60}
                                    className="h-auto rounded-lg shadow-md"
                                />
                            </Link>
                            <Link href="#googleplay" className="transform hover:scale-105 transition-transform duration-200">
                                <Image 
                                    src="/google-play-badge.png" 
                                    alt="Get it on Google Play" 
                                    width={180} 
                                    height={60}
                                    className="h-auto rounded-lg shadow-md"
                                />
                            </Link>
                        </div>

                        {/* Original Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button size="lg" className={cn("relative overflow-hidden group bg-primary text-primary-foreground text-lg px-8 py-3.5 rounded-lg shadow-lg-maroon hover:shadow-xl-maroon hover:bg-brand-maroon-dark transition-all duration-300 ease-out transform hover:scale-[1.03]")} asChild>
                                <Link href="#waitlist">
                                    <span className="absolute inset-0 bg-gradient-shine bg-200% bg-left opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></span>
                                    <span className="relative z-10 flex items-center"> <Rocket className="mr-2 h-5 w-5" /> Join Waitlist </span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary hover:bg-secondary px-4 py-3.5 text-lg rounded-lg group" asChild>
                                <Link href="#features"> Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /> </Link>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Visual Column with Animation */}
                <ScrollReveal direction="right" className="lg:col-span-5 mt-12 lg:mt-0" delay={0.3}>
                    <div className="relative aspect-[4/3.5] rounded-2xl bg-secondary p-2 shadow-xl border border-border overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                             <Image
                                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                 alt="Collaboration workspace with laptops, representing data analysis"
                                 fill
                                 style={{ objectFit: "cover" }}
                                 className="transition-transform duration-500 group-hover:scale-105"
                                 quality={85}
                                 priority
                             />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent"></div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
  );
}