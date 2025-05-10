"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <div className={`${geist.className} w-full bg-background py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-32 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className='mb-8 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto'>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900`}>
            Why Brown24?
          </h2>
          <p className='text-lg md:text-xl text-gray-600'>
            We combine expert curation with smart technology to deliver the startup intelligence you need, without the noise.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {/* Left side - Content */}
          <div className="lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-xl shadow-sm h-full border border-gray-200"
              >
                <motion.h3 
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {services[activeService].title}
                </motion.h3>
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed md:leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {services[activeService].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right side - Navigation */}
          <div className="lg:w-1/2">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer p-5 sm:p-6 md:p-7 rounded-lg transition-all ${
                    activeService === index 
                      ? 'bg-brand-maroon text-white' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setActiveService(index)}
                >
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
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}