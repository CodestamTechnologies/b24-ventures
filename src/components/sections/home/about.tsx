"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, stagger, useAnimate } from 'framer-motion';
import { Inter } from 'next/font/google';

const geist = Inter({ subsets: ['latin'] });

const services = [
  {
    title: "Curated For You",
    description: "delivers meticulously selected news, timely funding updates, and cutting-edge tech breakthroughs tailored precisely to your interests. Stay informed with our carefully curated content, ensuring you're always ahead in the latest developments that matter most to you."
  },
  {
    title: "Intelligent Engine",
    description: "Our advanced recommendation engine continuously learns from your preferences, behaviors, and areas of interest to deliver personalized insights that truly matter. By analyzing your engagement patterns, it surfaces the most relevant updates, emerging trends, and must-know developments—ensuring you stay focused, informed, and ahead in your field."
  },
  {
    title: "Global Reach, Local Focus",
    description: "Access a unified, real-time feed that captures the pulse of startup ecosystems and investment trends from around the world. Whether it's a breakthrough in Silicon Valley, a funding surge in Bangalore, or an emerging trend in Berlin, our platform filters the noise to deliver insights tailored to your interests—giving you a global perspective with a local lens."
  },
  {
    title: "Community & Collaboration",
    description: "Engage with a vibrant network of founders, investors, and innovators through thoughtful discussions and shared insights. Exchange perspectives, collaborate on ideas, and build meaningful relationships that fuel growth, spark innovation, and keep you connected to the pulse of the startup and investment world."
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".service-item",
      { opacity: 1, x: 0 },
      { delay: stagger(0.1), duration: 0.8, ease: "backOut" }
    );
  }, [animate]);

  return (
    <div className={`${geist.className} relative w-full overflow-hidden -mt-1`}>
      {/* Full background with gradient overlay */}
      <div className="absolute inset-0 bg-background z-10 ">
        {/* Animated gradient background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-gray-100/50"
        />
        
        {/* Animated background elements */}
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

      {/* Content container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
                animate={{ color: "#800020" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block"
              >
                Brown24
              </motion.span>?
            </h2>
            <p className='text-lg md:text-xl text-gray-600'>
              We combine expert curation with smart technology to deliver the startup intelligence you need, without the noise.
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
                  key={activeService}
                  initial={{ opacity: 0, x: -100, rotateY: 30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 100, rotateY: -30 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.7
                  }}
                  className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-xl shadow-sm h-full border border-gray-200/50 relative overflow-hidden"
                >
                  {/* Decorative elements */}
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
                  
                  <motion.h3 
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {services[activeService].title}
                  </motion.h3>
                  <motion.p 
                    className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed md:leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, staggerChildren: 0.1 }}
                  >
                    {services[activeService].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Right side - Navigation */}
            <motion.div 
              className="lg:w-1/2" 
              ref={scope}
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
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className={`service-item opacity-0 -x-20 cursor-pointer p-5 sm:p-6 md:p-7 rounded-lg transition-all relative overflow-hidden ${
                      activeService === index 
                        ? 'bg-brand-maroon text-white shadow-lg' 
                        : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-gray-50 border border-gray-200/50 shadow-md'
                    }`}
                    onClick={() => setActiveService(index)}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
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
                    {/* Hover effect background */}
                    <motion.div 
                      className={`absolute inset-0 z-0 ${
                        activeService === index ? 'bg-brand-maroon' : 'bg-gray-100/50'
                      }`}
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1, opacity: activeService === index ? 1 : 0.1 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    />
                    
                    <div className="relative z-10">
                      <motion.h3 
                        className={`text-xl sm:text-2xl font-semibold ${
                          activeService === index ? 'text-white' : 'text-gray-900'
                        }`}
                        layoutId={`service-title-${index}`}
                      >
                        {service.title}
                      </motion.h3>
                      {activeService === index && (
                        <motion.div
                          layoutId="service-indicator"
                          className="mt-2 h-1 w-8 bg-white rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    
                    {/* Subtle floating dots animation */}
                    {activeService === index && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 overflow-hidden"
                      >
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            initial={{ 
                              x: Math.random() * 100 - 50,
                              y: Math.random() * 100 - 50
                            }}
                            animate={{
                              x: Math.random() * 100 - 50,
                              y: Math.random() * 100 - 50,
                              transition: { 
                                duration: 5 + Math.random() * 10,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating animated elements in background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500 blur-[90px] z-0"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-500 blur-[100px] z-0"
      />
    </div>
  );
}