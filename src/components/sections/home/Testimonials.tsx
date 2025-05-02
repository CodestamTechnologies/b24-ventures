// components/sections/home/Testimonials.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Removed unused Quote import
import { cn } from "@/lib/utils"; // Keep cn as it's used for dots

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}
// Ensure this data is populated or fetched
const testimonialsData: Testimonial[] = [
  { quote: "As a VC, Brown24 has become my daily briefing. It saves hours of scanning multiple sites.", author: "Arjun Mehta", position: "General Partner, WestCap" },
  { quote: "It feels like a Bloomberg Terminal for the startup world. The insights are incredibly focused.", author: "Nidhi Roy", position: "Startup Founder" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance logic
  // Kept dependency array [testimonialsData.length] to avoid build errors,
  // removed the unnecessary eslint-disable comment.
  useEffect(() => {
    if (testimonialsData.length <= 1) return;
    const intervalId = setInterval(() => {
      paginate(1); // Auto-advance forward
    }, 7000); // Auto-advance every 7 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pagination logic - includes setting direction for animation hint
  const paginate = (newDirection: number) => {
      setDirection(newDirection);
      setCurrent((prev) => (prev + newDirection + testimonialsData.length) % testimonialsData.length);
  };

   // Function to directly set the slide (for dots)
   const goToSlide = (slideIndex: number) => {
     // Set direction based on whether the target is ahead or behind current
     setDirection(slideIndex > current ? 1 : -1);
     setCurrent(slideIndex);
   };

  // Don't render if no data
  if (!testimonialsData || testimonialsData.length === 0) {
     console.warn("No testimonials data provided to Testimonials component.");
     return null;
  }

  // Animation variants for the sliding card
  const slideVariants = {
      enter: (direction: number) => ({
          x: direction > 0 ? "100%" : "-100%", // Slide in from left or right
          opacity: 0,
          scale: 0.98
      }),
      center: {
          zIndex: 1, // Ensure current slide is on top
          x: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } // Smooth transition
      },
      exit: (direction: number) => ({
          zIndex: 0, // Send exiting slide behind
          x: direction < 0 ? "100%" : "-100%", // Slide out to opposite side
          opacity: 0,
          scale: 0.98,
          transition: { duration: 0.4, ease: [0.8, 0.2, 0.8, 0.2] } // Faster exit
      })
  };

  return (
    // Use alternating background: Secondary
    <section className="py-24 md:py-32 bg-secondary overflow-hidden border-y border-border">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card: Cleaner B2V style */}
          <div className="relative bg-background rounded-xl p-8 md:p-12 border border-border overflow-hidden min-h-[300px] flex items-center justify-center shadow-lg">
             {/* AnimatePresence handles enter/exit animations */}
             <AnimatePresence initial={false} custom={direction}>
               <motion.div
                 key={current} // Key change triggers animation
                 custom={direction} // Pass direction to variants
                 variants={slideVariants}
                 initial="enter"
                 animate="center"
                 exit="exit"
                 // Removed drag properties
                 className="absolute w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] text-center z-10" // Ensure content is clickable
               >
                 {/* Quote - Larger, display font */}
                 <blockquote className="text-2xl md:text-3xl font-display text-foreground mb-6 leading-snug italic">
                    “{testimonialsData[current].quote}”
                 </blockquote>
                 {/* Author - Clearer hierarchy */}
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

             {/* Navigation Controls - More subtle */}
            {testimonialsData.length > 1 && ( <>
                {/* Arrows */}
                <button onClick={() => paginate(-1)} className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-background/40 text-muted-foreground p-2 rounded-full hover:bg-background hover:text-primary hover:shadow-sm transition-all duration-200 z-20 backdrop-blur-sm disabled:opacity-40" aria-label="Previous testimonial"> <ChevronLeft className="h-5 w-5" /> </button>
                <button onClick={() => paginate(1)} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-background/40 text-muted-foreground p-2 rounded-full hover:bg-background hover:text-primary hover:shadow-sm transition-all duration-200 z-20 backdrop-blur-sm disabled:opacity-40" aria-label="Next testimonial"> <ChevronRight className="h-5 w-5" /> </button>
                {/* Dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                  {testimonialsData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            `w-2 h-2 rounded-full transition-all duration-300 ease-out`,
                             current === index
                                ? "bg-primary scale-110" // Active style
                                : "bg-muted hover:bg-muted-foreground/50 opacity-70" // Inactive style
                        )}
                        aria-label={`Go to testimonial ${index + 1}`} />
                   ))}
                </div>
               </> )}
          </div>
        </div>
      </div>
    </section>
  );
}