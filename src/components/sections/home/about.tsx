'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const geist = Inter({ subsets: ['latin'] });

const reasons = [
  {
    title: "Global Entrepreneurial Coverage",
    description: "Traditional media and platforms focus on Silicon Valley, Delhi, and London leaving out 90% of the world's entrepreneurial energy. We bring visibility to underdog founders everywhere."
  },
  {
    title: "Actionable Funding Insights",
    description: "Most funding news is cluttered and insight-light, providing little tactical value. We deliver contextual, actionable insights—not clickbait—to help you make informed decisions."
  },
  {
    title: "Underdog Founder Spotlights",
    description: "Underdog founders everywhere are missing out on visibility and strategic trends. We fix that with sharp spotlights on grassroots founders and their innovations."
  },
  {
    title: "Real-time Funding Intelligence",
    description: "Get real-time, relevant startup funding news with global and regional funding trend breakdowns. Stay ahead with data-driven insights tailored for investors and founders."
  },
];

export default function ServicesSection() {
  const [activeReason, setActiveReason] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timer);
    };
  }, []);

  // Simplified mobile version
  if (isMobile) {
    return (
      <motion.section
        className={`${geist.className} relative flex flex-col lg:flex-row justify-center bg-background z-50 -mb-2 items-center p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
      >
        <div className="relative z-10 w-full py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className='mb-8 text-center max-w-3xl mx-auto'>
              <h2 className={`text-3xl font-bold mb-4 text-gray-900`}>
                Why <span className="text-brand-maroon">B24</span>?
              </h2>
              <p className='text-lg text-gray-600'>
                We shine a light on the 90% of entrepreneurial energy that traditional media ignores.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Content */}
              <div className="bg-white p-6 rounded-xl shadow-sm h-full border border-gray-200">
                <h3 className={`text-2xl font-bold mb-4 text-black`}>
                  {reasons[activeReason].title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {reasons[activeReason].description}
                </p>
              </div>
              
              {/* Navigation */}
              <div className="space-y-4">
                {reasons.map((reason, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-5 rounded-lg relative ${
                      activeReason === index 
                        ? 'bg-brand-maroon text-white shadow-lg' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200 shadow-md'
                    }`}
                    onClick={() => setActiveReason(index)}
                  >
                    <div className="relative z-10">
                      <h3 className={`text-xl font-semibold ${
                        activeReason === index ? 'text-white' : 'text-gray-900'
                      }`}>
                        {reason.title}
                      </h3>
                      {activeReason === index && (
                        <div className="mt-2 h-1 w-8 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Desktop version with animations
  return (
    <motion.section
      className={`relative flex flex-col lg:flex-row justify-center bg-background z-10 -mb-2 items-center p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
    >
      <div className={`relative py-16 md:py-32 bg-background border-y border-border transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {isLoaded && (
          <>
            <div className="absolute inset-0 bg-background z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-gray-100/50" />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.05 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-maroon blur-[100px]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 blur-[120px]"></div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 1 }}
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500 blur-[90px] z-0"
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.05, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-500 blur-[100px] z-0"
            />
          </>
        )}

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className='mb-8 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto'
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900`}>
                Why <motion.span 
                  initial={{ color: "#000000" }}
                  animate={isLoaded ? { color: "#800020" } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block"
                >
                  B24
                </motion.span>?
              </h2>
              <p className='text-lg md:text-xl text-gray-600'>
                We shine a light on the 90% of entrepreneurial energy that traditional media ignores.
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {/* Left side - Content */}
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8,
                  delay: 0.3
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReason}
                    initial={{ opacity: 0, x: -100, rotateY: 30 }}
                    animate={isLoaded ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    exit={{ opacity: 0, x: 100, rotateY: -30 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.7
                    }}
                    className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-sm h-full border border-gray-200/50 relative overflow-hidden"
                  >
                    {isLoaded && (
                      <>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-0 right-0 w-16 h-16 bg-brand-maroon rounded-bl-full opacity-10"
                        />
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 }}
                          className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-tr-full opacity-10"
                        />
                      </>
                    )}
                    
                    <motion.h3 
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 }}
                    >
                      {reasons[activeReason].title}
                    </motion.h3>
                    <motion.p 
                      className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed md:leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isLoaded ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      {reasons[activeReason].description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              {/* Right side - Navigation */}
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8,
                  delay: 0.5
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      className={`cursor-pointer p-5 sm:p-6 md:p-7 rounded-lg relative overflow-hidden ${
                        activeReason === index 
                          ? 'bg-brand-maroon text-white shadow-lg' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-gray-50 border border-gray-200/50 shadow-md'
                      }`}
                      onClick={() => setActiveReason(index)}
                      whileHover={isLoaded ? { 
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.3 }
                      } : {}}
                      whileTap={isLoaded ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1
                      }}
                    >
                      <div className="relative z-10">
                        <motion.h3 
                          className={`text-xl sm:text-2xl font-semibold ${
                            activeReason === index ? 'text-white' : 'text-gray-900'
                          }`}
                          layoutId={`reason-title-${index}`}
                        >
                          {reason.title}
                        </motion.h3>
                        {activeReason === index && (
                          <motion.div
                            layoutId="reason-indicator"
                            className="mt-2 h-1 w-8 bg-white rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={isLoaded ? { scaleX: 1 } : {}}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}