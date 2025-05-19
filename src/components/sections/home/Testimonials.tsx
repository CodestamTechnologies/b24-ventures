"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

const testimonialsData: Testimonial[] = [
  { quote: "As a VC, Brown24 has become my daily briefing. It saves hours of scanning multiple sites.", author: "Arjun Mehta", position: "General Partner, WestCap" },
  { quote: "It feels like a Bloomberg Terminal for the startup world. The insights are incredibly focused.", author: "Nidhi Roy", position: "Startup Founder" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    setIsLoaded(true);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const paginate = (newDirection: number) => {
    setCurrent((prev) => (prev + newDirection + testimonialsData.length) % testimonialsData.length);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrent(slideIndex);
  };

  if (!testimonialsData || testimonialsData.length === 0) {
    console.warn("No testimonials data provided to Testimonials component.");
    return null;
  }

  // Mobile version without animations
  if (isMobile) {
    return (
     <motion.section
          //  ref={ref}
           initial="hidden"
          //  animate={isInView ? "visible" : "hidden"}
          //  variants={containerVariants}
           className={`relative flex flex-col lg:flex-row justify-center bg-background z-10 -mb-2 items-center  p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
         >
        <div className="container mx-auto px-4">
          <div className="w-full">
            {/* Header */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-3 text-foreground">
                Trusted by Leaders
              </h1>
              <p className="text-muted-foreground">
                Hear what founders and investors are saying about Brown24 Ventures.
              </p>
            </div>

            {/* Carousel */}
            <div className="w-full relative">
              <div className="relative bg-background rounded-xl p-6 border border-border/50 min-h-[280px] flex items-center justify-center">
                <div className="w-full text-center px-2">
                  <blockquote className="text-lg text-foreground mb-6 italic">
                    &ldquo;{testimonialsData[current].quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-foreground font-semibold">
                      {testimonialsData[current].author}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonialsData[current].position}
                    </p>
                  </div>
                </div>

                {testimonialsData.length > 1 && (
                  <>
                    <button 
                      onClick={() => paginate(-1)} 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full z-20"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => paginate(1)} 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full z-20"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                      {testimonialsData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${current === index ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
       </motion.section>
    );
  }

  // Desktop version with animations
  return (
    <section className={`relative py-16 md:py-32 bg-background border-y border-border ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-maroon/5 blur-[80px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground relative inline-block group"> 
                Trusted by Leaders 
                <span className="section-header-underline"></span> 
              </h1>
            </motion.div>
            <motion.p 
              className="text-lg text-muted-foreground mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hear what founders and investors are saying about Brown24 Ventures.
            </motion.p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            className="max-w-4xl mx-auto relative"
          >
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

            <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-border/50 overflow-hidden min-h-[300px] flex items-center justify-center shadow-lg">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100, scale: 0.95, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95, rotateY: -10 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] text-center z-10 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary/20 h-8 w-8" />
                    <blockquote className="text-2xl md:text-3xl text-foreground mb-6 leading-snug italic">
                      &ldquo;{testimonialsData[current].quote}&rdquo;
                    </blockquote>
                  </motion.div>
                  <motion.div 
                    className="mt-6 flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
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

              {testimonialsData.length > 1 && (
                <>
                  <motion.button 
                    onClick={() => paginate(-1)} 
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200 z-20 backdrop-blur-sm"
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    onClick={() => paginate(1)} 
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-background/80 text-muted-foreground p-2 rounded-full hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200 z-20 backdrop-blur-sm"
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
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
                          `w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out`,
                          current === index ? 'bg-primary' : 'bg-muted-foreground/50'
                        )}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}