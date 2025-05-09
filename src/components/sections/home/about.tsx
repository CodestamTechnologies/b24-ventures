"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import { Card } from '@/components/ui/card';
import { 
  Bookmark, 
  Cpu, 
  Globe, 
  Users,
  Sparkles,
  Lightbulb,
  Target,
  Zap 
} from 'lucide-react';

const geist = Inter({ subsets: ['latin'] });

const services = [
  {
    title: "Curated For You",
    description: "Delivers meticulously selected news, timely funding updates, and cutting-edge tech breakthroughs tailored precisely to your interests.",
    icon: <Bookmark className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Intelligent Engine",
    description: "Our advanced recommendation engine continuously learns from your preferences to deliver personalized insights that truly matter.",
    icon: <Cpu className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Global Reach, Local Focus",
    description: "Access a unified, real-time feed that captures the pulse of startup ecosystems and investment trends from around the world.",
    icon: <Globe className="w-6 h-6" />,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Community & Collaboration",
    description: "Engage with a vibrant network of founders, investors, and innovators through thoughtful discussions and shared insights.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-600"
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className={`${geist.className} min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className='mb-16 text-center'>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Why Brown24?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We combine expert curation with smart technology to deliver the startup intelligence you need, without the noise.
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Content with Card */}
          <div className="lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="h-full p-8 rounded-xl border border-gray-200 shadow-sm">
                  <div className={`w-12 h-12 rounded-lg ${services[activeService].color} flex items-center justify-center mb-6`}>
                    {services[activeService].icon}
                  </div>
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {services[activeService].title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {services[activeService].description}
                  </motion.p>
                  
                  {/* Additional decorative elements */}
                  <div className="mt-8 flex items-center gap-2">
                    <div className="flex space-x-[-8px]">
                      {['/part1.webp', '/part2.webp', '/part3.webp'].map((src, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <img src={src} alt={`User ${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Trusted by 10+ founders</span>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right side - Navigation */}
          <div className="lg:w-1/2">
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer p-6 rounded-lg transition-all ${
                    activeService === index 
                      ? 'bg-brand-maroon text-white shadow-lg' 
                      : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center`}>
                      {service.icon}
                    </div>
                    <motion.h3 
                      className={`text-lg font-semibold ${activeService === index ? 'text-white' : 'text-gray-900'}`}
                      layoutId={`service-title-${index}`}
                    >
                      {service.title}
                    </motion.h3>
                  </div>
                  {activeService === index && (
                    <motion.div
                      layoutId="service-indicator"
                      className="mt-3 h-1 w-8 rounded-full"
                      style={{ background: activeService === index ? 'white' : 'transparent' }}
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