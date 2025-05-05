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
const logoFadeIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" }
  }
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }
  }
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
    }
  };
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function Hero() {

  return (
    // Reduced top padding for mobile to fix spacing issue
    <section className="relative w-full min-h-screen flex flex-col justify-start md:justify-center overflow-hidden bg-background pt-4 pb-12 md:pt-32 md:pb-20 px-4">

        {/* Background Elements - Static (Keep as is) */}
        <div className="absolute inset-0 -z-10">
             <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-90"></div>
             <div className="absolute top-[10%] left-[-10%] w-72 h-72 bg-primary/5 rounded-full filter blur-2xl opacity-70 animate-subtle-pulse" style={{ animationDelay: '0s', '--pulse-opacity': 0.6 } as React.CSSProperties} />
             <div className="absolute bottom-[15%] right-[-10%] w-80 h-80 bg-muted/20 rounded-full filter blur-3xl opacity-70 animate-subtle-pulse" style={{ animationDelay: '2s', '--pulse-opacity': 0.5 } as React.CSSProperties}/>
             <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C2A4E' fill-opacity='0.02'%3E%3Ccircle fill-opacity='0.03' cx='40' cy='40' r='40'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
                  opacity: 0.3,
                }}
             ></div>
        </div>

        {/* Logo Container - Adjusted for mobile */}
        <motion.div
            variants={logoFadeIn}
            initial="hidden"
            animate="visible"
            className="relative w-full flex justify-start mb-3 md:absolute md:w-auto md:top-8 md:left-8 lg:top-10 lg:left-10 z-30 md:mb-0"
        >
            <Link href="/" aria-label="Brown24 Ventures Home">
                <Image
                    src="/logo.png" // Ensure path is correct
                    alt="Brown24 Ventures Logo"
                    width={275} // Increased Logo size
                    height={206}
                    priority
                    className="h-auto w-52 sm:w-60 md:w-48 lg:w-56" // Adjusted responsive widths
                />
            </Link>
        </motion.div>

        {/* Main Content Container */}
        <div className="container mx-auto relative z-10 mt-1 md:mt-0">
            <motion.div
                className="grid lg:grid-cols-12 lg:gap-16 items-center w-full"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Text Column - Kept text-left */}
                <div className="lg:col-span-7 text-left">
                    <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.75rem] font-bold font-display mb-4 md:mb-5 leading-tight text-foreground">
                        Actionable Startup
                        <span className="block sm:inline md:block"> Intelligence,</span>
                        {/* Fixed alignment of "Delivered Daily" with the rest of the heading */}
                        <span className="text-brand-maroon block pb-1 mt-1 sm:mt-0">
                            Delivered Daily.
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-xl">
                        Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
                    </motion.p>

                    {/* --- RESTORED APP/PLAY STORE BUTTONS --- */}
                    <motion.div variants={fadeUp} className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4 mb-6 md:mb-8">
                        {/* !! IMPORTANT: Replace # with actual store links and ensure badge images are in /public !! */}
                        <Link href="#appstore" className="transform hover:scale-105 transition-transform duration-200 inline-block">
                            <Image
                                src="/app-store-badge.png" // You need this image
                                alt="Download on the App Store"
                                width={180}
                                height={60}
                                className="h-auto w-40 sm:w-44 md:w-auto rounded-lg shadow-sm" // Adjusted sizes
                            />
                        </Link>
                        <Link href="#googleplay" className="transform hover:scale-105 transition-transform duration-200 inline-block">
                            <Image
                                src="/google-play-badge.png" // You need this image
                                alt="Get it on Google Play"
                                width={180}
                                height={60}
                                className="h-auto w-[170px] sm:w-[177px] md:w-auto rounded-lg shadow-sm" // Adjusted sizes slightly differently
                            />
                        </Link>
                    </motion.div>
                    {/* --- END OF RESTORED BUTTONS --- */}


                    {/* Main CTA and Secondary Action */}
                    <motion.div variants={fadeUp} className="flex flex-col items-start space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4">
                         {/* Primary CTA */}
                        <Button size="lg" className={cn("w-full sm:w-auto relative overflow-hidden group bg-primary text-primary-foreground text-lg px-8 py-3.5 rounded-lg shadow-lg-maroon hover:shadow-xl-maroon hover:bg-brand-maroon-dark transition-all duration-300 ease-out transform hover:scale-[1.03]")} asChild>
                            <Link href="#waitlist">
                                <span className="absolute inset-0 bg-gradient-shine bg-200% bg-left opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></span>
                                <span className="relative z-10 flex items-center justify-center sm:justify-start"> <Rocket className="mr-2 h-5 w-5" /> Join Waitlist </span>
                            </Link>
                        </Button>
                        {/* Secondary Action */}
                         <Button variant="ghost" size="lg" className="w-full sm:w-auto text-muted-foreground hover:text-primary hover:bg-secondary px-4 py-3.5 text-lg rounded-lg group" asChild>
                            <Link href="#features" className="flex items-center justify-center sm:justify-start"> Learn More <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /> </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Visual Column - Hidden on mobile */}
                <motion.div variants={scaleIn} className="lg:col-span-5 mt-10 lg:mt-0 hidden lg:block">
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
                                 sizes="(max-width: 1024px) 0vw, 40vw"
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