"use client";
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Animation variants
const itemFadeUp = { 
  hidden: { opacity: 0, y: 40 }, 
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

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 1
    }
  }
};

const staggerContainer = { 
  hidden: {}, 
  visible: { 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  } 
};

// No animation variants
const noAnimation = {
  hidden: { opacity: 1, y: 0, x: 0 },
  visible: { opacity: 1, y: 0, x: 0 }
};

export default function AboutUsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
      };
      
      // Initial check
      checkIfMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  // Determine which variants to use
  // const getVariants = () => {
  //   if (isMobile || prefersReducedMotion) return noAnimation;
  //   return {
  //     itemFadeUp,
  //     fadeInRight,
  //     staggerContainer
  //   };
  // };

  // const variants = getVariants();

  return (
     <motion.section
              //  ref={ref}
               initial="hidden"
              //  animate={isInView ? "visible" : "hidden"}
              //  variants={containerVariants}
               className={`relative flex flex-col lg:flex-row justify-center bg-background z-10 -mb-2 items-center  p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
             >
      <motion.section 
        id="about-us" 
        className="py-24 md:py-32 bg-background z-10 border-y border-border overflow-hidden relative"
        initial={{ opacity: isMobile || prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile || prefersReducedMotion ? 0 : 0.5 }}
      >
        {/* Decorative background elements */}
        <motion.div 
          initial={{ scale: isMobile || prefersReducedMotion ? 1 : 0.8, opacity: isMobile || prefersReducedMotion ? 0.1 : 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: isMobile || prefersReducedMotion ? 0 : 1.5, delay: isMobile || prefersReducedMotion ? 0 : 0.3 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-maroon blur-[120px] pointer-events-none"
        />
        <motion.div 
          initial={{ scale: isMobile || prefersReducedMotion ? 1 : 0.8, opacity: isMobile || prefersReducedMotion ? 0.1 : 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: isMobile || prefersReducedMotion ? 0 : 1.5, delay: isMobile || prefersReducedMotion ? 0 : 0.5 }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500 blur-[150px] pointer-events-none"
        />

        <div className="container mx-auto px-4">
          <motion.div
            variants={isMobile || prefersReducedMotion ? noAnimation : staggerContainer}
            initial="hidden"
            whileInView={isMobile || prefersReducedMotion ? "visible" : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto"
          >
            {/* Text Content */}
            <div className="text-left relative z-10">
              <motion.h2 
                variants={isMobile || prefersReducedMotion ? noAnimation : itemFadeUp} 
                className="text-4xl md:text-5xl font-bold font-display mb-6 text-foreground"
              >
                Built for the <motion.span 
                  className="text-brand-maroon inline-block"
                  initial={{ opacity: isMobile || prefersReducedMotion ? 1 : 0, scale: isMobile || prefersReducedMotion ? 1 : 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: isMobile || prefersReducedMotion ? false : "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: isMobile || prefersReducedMotion ? 0 : 0.4
                  }}
                >
                  Venture Economy
                </motion.span>.
              </motion.h2>
              
              <motion.p 
                variants={isMobile || prefersReducedMotion ? noAnimation : itemFadeUp} 
                className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
              >
                Brown24 Ventures cuts through the noise, delivering curated startup intelligence and smart insights directly to decision-makers.
              </motion.p>
              
              <motion.div 
                variants={isMobile || prefersReducedMotion ? noAnimation : itemFadeUp} 
                className="prose max-w-none prose-p:text-muted-foreground prose-strong:text-foreground/80 mb-8 about-card relative"
              >
                <motion.div
                  initial={{ width: isMobile || prefersReducedMotion ? "100%" : 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: isMobile || prefersReducedMotion ? 0 : 1, delay: isMobile || prefersReducedMotion ? 0 : 0.8 }}
                  className="absolute -left-2 top-0 h-full w-1 rounded-full"
                />
                <p className="relative">
                  Founded by industry insiders, VCs, and technologists, we understand the need for speed, accuracy, and relevance in today&apos;s fast-paced market.
                </p>
              </motion.div>
              
              <motion.div variants={isMobile || prefersReducedMotion ? noAnimation : itemFadeUp}>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary hover:text-brand-maroon-dark font-semibold text-lg group" 
                  asChild
                >
                  <Link href="/about">
                    <motion.div
                      whileHover={{ x: isMobile || prefersReducedMotion ? 0 : 5 }}
                      transition={{ type: isMobile || prefersReducedMotion ? false : "spring", stiffness: 400 }}
                    >
                      Discover Our Mission 
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 inline-block" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div
              variants={isMobile || prefersReducedMotion ? noAnimation : fadeInRight}
              className="relative aspect-4/3 rounded-xl border border-border shadow-lg overflow-hidden group"
            >
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Brown24 Ventures - workspace"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 group-hover:scale-105"
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <motion.div
                initial={{ opacity: isMobile || prefersReducedMotion ? 0.1 : 0.3 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: isMobile || prefersReducedMotion ? 0 : 1, delay: isMobile || prefersReducedMotion ? 0 : 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              />
              
              {!isMobile && !prefersReducedMotion && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="absolute inset-0 overflow-hidden"
                  viewport={{ once: true }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full"
                      initial={{ 
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        scale: 0
                      }}
                      whileInView={{ 
                        scale: 1,
                        transition: { 
                          duration: 0.8,
                          delay: 0.8 + i * 0.1
                        } 
                      }}
                      viewport={{ once: true }}
                      animate={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        transition: { 
                          duration: 8 + Math.random() * 10,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.section>
  );
}