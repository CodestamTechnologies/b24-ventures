"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const carouselVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.4
    }
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    rotateY: direction > 0 ? 10 : -10
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.33, 1, 0.68, 1],
      scale: { duration: 0.8 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    rotateY: direction < 0 ? 10 : -10,
    transition: { 
      duration: 0.5, 
      ease: [0.33, 1, 0.68, 1] 
    }
  })
};

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3
    }
  }
};

const dotVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 0.7,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.5
    }
  }),
  active: {
    scale: 1.2,
    opacity: 1,
    backgroundColor: "var(--primary)",
    transition: { duration: 0.3 }
  }
};

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (testimonialsData.length <= 1 || isHovered) return;
    
    const intervalId = setInterval(() => {
      paginate(1);
    }, 7000);
    
    return () => clearInterval(intervalId);
  }, [current, isHovered]);

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
    <section className="py-24 md:py-32 bg-background overflow-hidden border-y border-border">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Trusted by Leaders
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mt-6"
              variants={quoteVariants}
            >
              Hear what founders and investors are saying about Brown24 Ventures.
            </motion.p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div
            variants={carouselVariants}
            className="max-w-4xl mx-auto relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating Quote Icons */}
            <motion.div
              className="absolute -top-6 -left-6 text-primary/10 z-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.1,
                transition: { delay: 0.8 }
              }}
            >
              <Quote className="h-24 w-24" />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 text-primary/10 z-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.1,
                transition: { delay: 1 }
              }}
            >
              <Quote className="h-24 w-24" />
            </motion.div>

            {/* Testimonial Card */}
            <div className="relative bg-background rounded-xl p-8 md:p-12 border border-border overflow-hidden min-h-[300px] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] text-center z-10"
                >
                  <motion.div
                    variants={quoteVariants}
                    className="relative"
                  >
                    <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary/20 h-8 w-8" />
                    <blockquote className="text-2xl md:text-3xl font-display text-foreground mb-6 leading-snug italic">
                      &ldquo;{testimonialsData[current].quote}&rdquo;
                    </blockquote>
                  </motion.div>
                  <motion.div 
                    className="mt-6 flex flex-col items-center"
                    variants={quoteVariants}
                  >
                    <p className="text-foreground font-semibold text-lg">
                      {testimonialsData[current].author}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonialsData[current].position}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {testimonialsData.length > 1 && (
                <>
                  <motion.button 
                    onClick={() => paginate(-1)} 
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200 z-20 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    onClick={() => paginate(1)} 
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200 z-20 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                    {testimonialsData.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          `w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out`
                        )}
                        variants={dotVariants}
                        custom={index}
                        animate={current === index ? "active" : "visible"}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}