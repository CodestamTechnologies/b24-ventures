// components/sections/home/Testimonials.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

const testimonialsData: Testimonial[] = [
  { quote: "As a VC, Brown24 has become my daily briefing. It saves hours of scanning multiple sites.", author: "Arjun Mehta", position: "General Partner, WestCap" },
  { quote: "It feels like a Bloomberg Terminal for the startup world. The insights are incredibly focused.", author: "Nidhi Roy", position: "Startup Founder" },
  // Add more testimonials here if needed
];

// Animation Variants
const headerFadeIn = { 
  hidden: { opacity: 0, y: -10 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  } 
};

const carouselContainerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      when: "beforeChildren"
    } 
  } 
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.8, 0.2, 0.8, 0.2] }
  })
};

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // 0 = initial, 1 = next, -1 = prev
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Trigger animations when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-advance logic
  useEffect(() => {
    if (testimonialsData.length <= 1) return;
    
    const intervalId = setInterval(() => {
      paginate(1); // Auto-advance forward
    }, 7000); // Auto-advance every 7 seconds
    
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [current]); // Re-run effect if current changes

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonialsData.length) % testimonialsData.length);
  };

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > current ? 1 : -1);
    setCurrent(slideIndex);
  };

  if (!testimonialsData || testimonialsData.length === 0) {
    console.warn("No testimonials data provided to Testimonials component.");
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-secondary overflow-hidden border-y border-border">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={headerFadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block group">
            Trusted by Leaders
            <span className="section-header-underline"></span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            Hear what founders and investors are saying about Brown24 Ventures.
          </p>
        </motion.div>

        {/* Carousel Container with Animation */}
        <motion.div
          variants={carouselContainerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto relative"
        >
          {/* Testimonial Card */}
          <div className="relative bg-background rounded-xl p-8 md:p-12 border border-border overflow-hidden min-h-[300px] flex items-center justify-center shadow-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current} // Unique key triggers animation on change
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] text-center z-10"
              >
                <blockquote className="text-2xl md:text-3xl font-display text-foreground mb-6 leading-snug italic">
                  "{testimonialsData[current].quote}"
                </blockquote>
                <div className="mt-6">
                  <p className="text-foreground font-semibold text-lg">
                    {testimonialsData[current].author}
                  </p>
                  <p className="text-muted-foreground text-base">
                    {testimonialsData[current].position}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {testimonialsData.length > 1 && (
              <>
                <button 
                  onClick={() => paginate(-1)} 
                  className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-background/40 text-muted-foreground p-2 rounded-full hover:bg-background hover:text-primary hover:shadow-sm transition-all duration-200 z-20 backdrop-blur-sm disabled:opacity-40" 
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => paginate(1)} 
                  className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-background/40 text-muted-foreground p-2 rounded-full hover:bg-background hover:text-primary hover:shadow-sm transition-all duration-200 z-20 backdrop-blur-sm disabled:opacity-40" 
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                  {testimonialsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        `w-2 h-2 rounded-full transition-all duration-300 ease-out`,
                        current === index
                          ? "bg-primary scale-110"
                          : "bg-muted hover:bg-muted-foreground/50 opacity-70"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}