"use client";
import React from 'react';
import Image from 'next/image';
import { CircularDiv } from '@/components/circlulardiv';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
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

  const itemFadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const itemFadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    }
  };


  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className='sticky top-0 '>
    <motion.div 
      className='relative bg-background  overflow-hidden min-h-[90vh] flex items-center justify-center'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Animated background elements */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-brand-maroon blur-[120px] pointer-events-none"
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500 blur-[150px] pointer-events-none"
      />

      {/* Mobile Content */}
      <div className='lg:hidden flex flex-col items-center justify-center w-full p-6 relative z-10'>
        {/* Animated circular background */}
        <motion.div 
          className='absolute inset-0 z-0 flex items-center justify-center'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              rotate: 360,
              transition: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className='w-[150vw] h-[150vw]'
          >
            <CircularDiv />
          </motion.div>
        </motion.div>

        {/* Logo with floating animation */}
        <motion.div 
          className="relative z-10 mb-8"
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="rounded-lg object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Main content with staggered animations */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center w-full max-w-2xl px-4 relative z-10"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight"
            variants={itemFadeUp}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-foreground to-brand-maroon bg-clip-text text-transparent"
              variants={itemFadeUp}
            >
              Actionable
            </motion.span>{' '}
            <motion.span className="inline-block" variants={itemFadeUp}>
              Startup
            </motion.span>
            <br />
            <motion.span 
              className="inline-block bg-gradient-to-r from-brand-maroon to-foreground bg-clip-text text-transparent"
              variants={itemFadeUp}
            >
              Intelligence
            </motion.span>
            <br />
            <motion.span className="inline-block" variants={itemFadeUp}>
              Delivered Daily
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto"
            variants={itemFadeUp}
          >
            Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </motion.p>
          
          {/* Animated buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={itemFadeUp}
          >
            <Link href={'#waitlist'} className="w-full max-w-xs">
              <motion.button 
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 w-full relative overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">JOIN COMMUNITY</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.button>
            </Link>
            <Link href={'/startup-form'} className="w-full max-w-xs">
              <motion.button 
                className="bg-brand-maroon text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 w-full relative overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(128,0,32,0.3)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Get featured</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-brand-maroon to-red-800 opacity-0 hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative animated elements */}
          <motion.div 
            className="mt-12 flex justify-center"
            variants={itemFadeUp}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Floating bubbles */}
          <motion.div 
            className="absolute -bottom-20 left-10 w-16 h-16 rounded-full bg-brand-maroon/10 blur-md"
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          <motion.div 
            className="absolute -bottom-10 right-10 w-24 h-24 rounded-full bg-blue-400/10 blur-md"
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, -40, 0],
              x: [0, -20, 0],
              transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </div>
  
      {/* Desktop Layout */}
      <div className='hidden relative lg:flex justify-center w-full'>
        {/* Container with max-width and responsive padding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='w-full max-w-[1800px] mx-auto px-8 xl:px-12 2xl:px-16 4k:px-24 relative sm:h-screen h-screen lg:h-screen 2xl:h-[800px]'
        >
          {/* Left Side Elements */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="absolute top-2 2xl:mt-3 2xl:ml-28 left-36 w-48 h-48 2xl:w-52 2xl:h-52 z-20"
          >
            <motion.div variants={scaleUp}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={208}
                height={208}
                className="rounded-lg z-50 object-contain"
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className='absolute left-0 w-1/2 h-full 2xl:mt-14'
          >
            {/* Main 3D Model */}
            {/* Main 3D Model */}
            <div className='absolute top-56 2xl:top-48 2xl:left-96 2xl:ml-4 left-60 transform -translate-x-1/2 -translate-y-1/2 w-52 h-64 2xl:w-64 2xl:h-80 z-20'>
              <Image 
                src="/main.webp" 
                alt="Main model" 
                width={224}
                height={272}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>

            {/* Bottom Left White Box */}
            <motion.div 
              variants={itemFadeLeft}
              transition={{ delay: 0.2 }}
              className='absolute top-72 2xl:top-44 left-96  z-10 2xl:ml-32 mr-10 w-36 h-36 2xl:w-52 2xl:h-52 rounded-3xl bg-white shadow-lg flex justify-center items-center'
              whileHover={{ 
                y: -5,
                rotate: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 2xl:w-16 2xl:h-16">
                <path d="M2 2h20v20H2V2zm2 2v4h4v4H4v4h4v4h4v-4h4v4h4v-4h-4v-4h4V8h-4V4h-4v4H8V4H4zm8 8H8v4h4v-4zm0-4v4h4V8h-4z" fill="black" />
              </svg>
            </motion.div>
            
            {/* Curved SVG */}
          <div className="absolute left-80 ml-5 2xl:ml-32  2xl:top-[20rem] top-[22rem] w-24 h-40 2xl:w-26 2xl:h-42 transform rotate-45">
              <svg viewBox="0 0 48 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0,0 H48 V32 C48,48 30,64 48,96 V128 H0 V96 C0,80 18,64 0,32 Z" fill="#ffffff" />
              </svg>
            </div>

            {/* Bottom Right White Box */}
            <motion.div 
              variants={itemFadeLeft}
              transition={{ delay: 0.4 }}
              className='absolute 2xl:top-80 2xl:mt-20 top-96 mt-14 2xl:ml-12 left-60 w-36 h-36 2xl:w-52 2xl:h-52 rounded-3xl bg-white z-10 shadow-lg flex flex-col justify-center items-center p-4'
              whileHover={{ 
                y: -5,
                rotate: -2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >
              <div className='flex flex-col -space-y-1 mb-2'>
                <span className='font-bold text-black text-sm 2xl:text-xl'>Our</span>
                <span className='font-bold text-black text-sm 2xl:text-xl'>Creators</span>
              </div>
              <motion.div 
                className="flex -space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                {['/part1.webp', '/part2.webp', '/part3.webp'].map((src, i) => (
                  <motion.div 
                    key={i} 
                    className="w-8 2xl:w-10 2xl:h-10 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <Image src={src} alt={`Creator ${i + 1}`} width={36} height={36} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Circular Div */}
            <motion.div 
              variants={itemFadeLeft}
              transition={{ delay: 0.2 }}
              className='absolute top-[26rem] 2xl:top-[24rem] left-96 2xl:ml-36 2xl:mt-2 ml-5 w-20 h-20 2xl:w-32 2xl:h-32 z-0'
              whileHover={{ rotate: 10 }}
            >
              <CircularDiv/>
            </motion.div>
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="absolute right-10 w-1/2 lg:mt-16 2xl:mt-12 2xl:right-20 lg:right 2xl:ml-24 h-full flex pl-12 4k:pl-16"
          >
            <motion.div 
              className="w-full max-w-[600px] 4k:max-w-[650px]"
              variants={itemFadeRight}
            >
              {/* Main Content Box */}
              <motion.div 
                className="p-8 4k:p-10 rounded-2xl border border-gray-300"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <motion.h1 
                  className="text-4xl 2xl:text-6xl font-bold tracking-tight mb-6 leading-tight"
                  variants={itemFadeRight}
                >
                  <motion.span 
                    className="inline-block bg-gradient-to-r from-foreground to-brand-maroon bg-clip-text text-transparent"
                    variants={itemFadeRight}
                  >
                    Actionable
                  </motion.span>{' '}
                  <motion.span className="inline-block" variants={itemFadeRight}>
                    Startup
                  </motion.span>
                  <br />
                  <motion.span 
                    className="inline-block bg-gradient-to-r from-brand-maroon to-foreground bg-clip-text text-transparent"
                    variants={itemFadeRight}
                  >
                    Intelligence
                  </motion.span>
                  <br />
                  <motion.span className="inline-block" variants={itemFadeRight}>
                    Delivered Daily
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-base 2xl:text-lg text-gray-600 mt-4 leading-relaxed"
                  variants={itemFadeRight}
                >
                  Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
                </motion.p>

                <motion.div 
                  className="flex flex-row items-center mt-8 space-x-4"
                  variants={itemFadeRight}
                >
                  <div className='flex gap-4'>
                    <Link href={'#waitlist'}>
                      <motion.button 
                        className="bg-black text-white px-6 py-2.5 rounded-full text-sm 4k:text-sm font-semibold shadow-sm hover:opacity-90"
                        whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        JOIN COMMUNITY
                      </motion.button>
                    </Link>
                    <Link href={'/startup-form'}>
                      <motion.button 
                        className="bg-brand-maroon text-white px-6 py-2.5 rounded-full text-sm 4k:text-sm font-semibold shadow-sm hover:opacity-90"
                        whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(128,0,32,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get featured
                      </motion.button>
                    </Link>
                  </div>
                  
                  <motion.div 
                    className="flex -space-x-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="w-10 h-10 4k:w-11 4k:h-11 rounded-full bg-black flex items-center justify-center text-white z-10 text-lg"
                      whileHover={{ rotate: 90 }}
                    >
                      ⬡
                    </motion.div>
                    <motion.div 
                      className="w-10 h-10 4k:w-11 4k:h-11 rounded-full bg-brand-maroon flex items-center justify-center text-white z-10 text-lg"
                      whileHover={{ rotate: -90 }}
                    >
                      ✴
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Additional Content */}
              <motion.div 
                className="mt-6 2xl:mt-6 flex justify-between items-center"
                variants={itemFadeRight}
              >
                <div>
                  <motion.p 
                    className="text-sm 4k:text-sm font-semibold text-gray-500 mb-1"
                    variants={itemFadeRight}
                  >
                    NEW RELEASE
                  </motion.p>
                  <motion.p 
                    className="text-xl 4k:text-xl font-semibold text-gray-900 leading-snug"
                    variants={itemFadeRight}
                  >
                    Get ready to embark <br />
                    on a new workload
                  </motion.p>
                </div>
                <motion.div 
                  className="relative w-28 h-28 4k:w-30 4k:h-30 rounded-full overflow-hidden shadow-md"
                  variants={itemFadeRight}
                  whileHover={{ rotate: 15 }}
                >
                  <Image
                    src="/circl.png"
                    alt="circular feature"
                    width={120}
                    height={120}
                    className="object-center w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom media query for tall screens */}
      <style jsx global>{`
        @media (min-width: 2000px) and (min-height: 900px) {
          .tall-screen\\:h-\\[75vh\\] {
            height: 75vh;
          }
        }
        @media (min-width: 1920px) {
          .4k\\:w-30 { width: 7.5rem; }
          .4k\\:h-30 { height: 7.5rem; }
          .4k\\:w-11 { width: 2.75rem; }
          .4k\\:h-11 { height: 2.75rem; }
        }
      `}</style>
    </motion.div>
    </section>
  );
};

export default HeroSection;