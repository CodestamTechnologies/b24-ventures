// components/sections/home/Hero.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Animation Variants
const simpleFadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const simpleScaleIn = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-28 pb-20 md:pt-32 md:pb-24 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
             <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-90"></div>
             <div className="absolute top-[10%] left-[-10%] w-72 h-72 bg-primary/5 rounded-full filter blur-2xl opacity-70" />
             <div className="absolute bottom-[15%] right-[-10%] w-80 h-80 bg-muted/20 rounded-full filter blur-3xl opacity-70" />
             <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C2A4E' fill-opacity='0.02'%3E%3Ccircle fill-opacity='0.03' cx='40' cy='40' r='40'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3C/g%3E%3C/svg%3E&quot;)] opacity-30"></div>
        </div>

        {/* Logo Top Left */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 z-30">
            <Link href="/" aria-label="Brown24 Ventures Home">
                <Image src="/logo.png" alt="Brown24 Ventures Logo" width={210} height={158} priority className="h-auto w-40 md:w-48 lg:w-52" />
            </Link>
        </motion.div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 relative z-10">
            <motion.div className="grid lg:grid-cols-12 lg:gap-16 items-center" variants={staggerContainer} initial="hidden" animate="visible">
                {/* Text Column */}
                <div className="lg:col-span-7 text-left">
                    <motion.h1 variants={simpleFadeUp} className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.75rem] font-bold font-display mb-5 leading-tight text-foreground">
                        Actionable Startup <br className="hidden sm:block"/> Intelligence,
                        <span className="text-brand-maroon relative inline-block pb-1 border-b-4 border-primary/60 ml-2"> Delivered Daily. </span>
                    </motion.h1>
                    <motion.p variants={simpleFadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
                        Cut through the noise. Get curated venture news, AI-powered insights, and essential market trends built for founders and investors.
                    </motion.p>
                    <motion.div variants={simpleFadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Button size="lg" className={cn("relative overflow-hidden group bg-primary text-primary-foreground text-lg px-8 py-3.5 rounded-lg shadow-lg-maroon hover:shadow-xl-maroon hover:bg-brand-maroon-dark transition-all duration-300 ease-out transform hover:scale-[1.03]")} asChild>
                            <Link href="#waitlist">
                                <span className="absolute inset-0 bg-gradient-shine bg-200% bg-left opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></span>
                                <span className="relative z-10 flex items-center"> <Rocket className="mr-2 h-5 w-5" /> Join Waitlist </span>
                            </Link>
                        </Button>
                         <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary hover:bg-secondary px-4 py-3.5 text-lg rounded-lg group" asChild>
                            <Link href="#features"> Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /> </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Visual Column - NEW VALID Unsplash Image */}
                <motion.div variants={simpleScaleIn} className="lg:col-span-5 mt-12 lg:mt-0">
                    <div className="relative aspect-[4/3.5] rounded-2xl bg-secondary p-2 shadow-xl border border-border overflow-hidden">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                             <Image
                                 // !! NEW VALID IMAGE SRC !!
                                 // Source: https://unsplash.com/photos/person-using-macbook-pro-on-table-BesrCeM0M8Y
                                 src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                 alt="Collaboration workspace with laptops, representing data analysis"
                                 layout="fill"
                                 objectFit="cover"
                                 className="transition-transform duration-500 hover:scale-105"
                                 quality={85}
                                 priority
                             />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent"></div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </section>
  );
}