"use client";
import React from 'react';
import Image from 'next/image';
import { CircularDiv } from '@/components/circlulardiv';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className=' bg-background relative  overflow-hidden'>
      {/* Mobile & Tablet Content */}
      <div className='lg:hidden flex flex-col items-center justify-center min-h-[80vh]  p-4 sm:p-6 relative z-10'>
        {/* Rotating Circular Background */}
        <div className='md:hidden absolute inset-0 z-0'>
          <div className='absolute -top-24 -left-1/4 w-[150vw] h-[150vw] opacity-10'>
            <CircularDiv />
          </div>
          <div className="w-56 mt-4 flex justify-center item-center h-12 z-20">
            <Image
              src="/logo.png"
              alt="Logo"
              width={208}
              height={208}
              className="rounded-lg z-50 object-contain"
            />
          </div>
          <div className='absolute top-1/4 left-1/4 w-24 h-24 rounded-xl bg-brand-maroon opacity-20'></div>
          <div className='absolute bottom-1/4 right-1/4 w-24 h-24 rounded-xl bg-white opacity-20'></div>
        </div>
        
        <div className="text-center w-full max-w-2xl px-4 relative z-10">
          <motion.h1 className="text-4xl sm:text-5xl md:text-7xl 2xl:text-8xl 4k:text-9xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-foreground to-brand-maroon bg-clip-text text-transparent">
              Actionable
            </span>{' '}
            <span className="inline-block">Startup</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-brand-maroon to-foreground bg-clip-text text-transparent">
              Intelligence
            </span>
            <br />
            <span className="inline-block">Delivered Daily</span>
          </motion.h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto">
            Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Link href={'#waitlist'}>
              <button className="bg-black text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-sm hover:opacity-90 w-full sm:w-auto">
                JOIN COMMUNITY
              </button>
            </Link>
            <Link href={'/startup-form'}>
              <button className="bg-brand-maroon text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-sm hover:opacity-90 w-full sm:w-auto">
                Get featured
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:flex justify-center w-full'>
        {/* Container with max-width and responsive padding */}
        <div className='w-full max-w-[1800px] mx-auto px-8 xl:px-12 2xl:px-16 4k:px-24 relative sm:h-screen h-screen lg:h-screen 2xl:h-[800px]'>
          {/* Left Side Elements */}
          <div className="absolute top-2 2xl:mt-3 2xl:ml-28  left-36 w-48 h-48 2xl:w-52 2xl:h-52 z-20">
            <Image
              src="/logo.png"
              alt="Logo"
              width={208}
              height={208}
              className="rounded-lg z-50 object-contain"
            />
          </div>
          
          <div className='absolute left-0 w-1/2 h-full 2xl:mt-14'>
            {/* Main 3D Model */}
            <div className='absolute top-56 2xl:top-48 2xl:left-96 left-60 transform -translate-x-1/2 -translate-y-1/2 w-52 h-64 2xl:w-64 2xl:h-80 z-20'>
              <Image 
                src="/main.webp" 
                alt="Main model" 
                width={224}
                height={272}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>

            {/* Bottom Left White Box */}
            <div className='absolute top-72 2xl:top-44 left-96 z-10  2xl:ml-28 mr-10 w-36 h-36 2xl:w-52 2xl:h-52 rounded-3xl bg-white shadow-lg flex justify-center items-center'>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 2xl:w-16 2xl:h-16">
                <path d="M2 2h20v20H2V2zm2 2v4h4v4H4v4h4v4h4v-4h4v4h4v-4h-4v-4h4V8h-4V4h-4v4H8V4H4zm8 8H8v4h4v-4zm0-4v4h4V8h-4z" fill="black" />
              </svg>
            </div>
            
            {/* Curved SVG */}
            <div className="absolute left-80 ml-5 2xl:ml-32  2xl:top-[20rem] top-[22rem] w-24 h-40 2xl:w-26 2xl:h-42 transform rotate-45">
              <svg viewBox="0 0 48 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0,0 H48 V32 C48,48 30,64 48,96 V128 H0 V96 C0,80 18,64 0,32 Z" fill="#ffffff" />
              </svg>
            </div>

            {/* Bottom Right White Box */}
            <div className='absolute 2xl:top-80 2xl:mt-20  top-96  mt-14 2xl:ml-12  left-60 w-36 h-36 2xl:w-52 2xl:h-52 rounded-3xl bg-white z-10 shadow-lg flex flex-col justify-center items-center p-4'>
              <div className='flex flex-col -space-y-1 mb-2'>
                <span className='font-bold text-black text-sm 2xl:text-xl'>Our</span>
                <span className='font-bold text-black text-sm 2xl:text-xl'>Creators</span>
              </div>
              <div className="flex -space-x-2">
                {['/part1.webp', '/part2.webp', '/part3.webp'].map((src, i) => (
                  <div key={i} className="w-8 2xl:w-10 2xl:h-10 h-8  rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <Image src={src} alt={`Creator ${i + 1}`} width={36} height={36} />
                  </div>
                ))}
              </div>
            </div>

            {/* Circular Div */}
            <div className='absolute  top-[26rem] 2xl:top-[24rem] left-96  2xl:ml-36 2xl:mt-2 ml-5 w-20 h-20 2xl:w-32 2xl:h-32 z-0'>
              <CircularDiv/>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="absolute right-10 w-1/2 lg:mt-16 2xl:mt-12 2xl:right-20 lg:right 2xl:ml-24 h-full flex pl-12 4k:pl-16">
            <div className="w-full max-w-[600px] 4k:max-w-[650px]">
              {/* Main Content Box */}
              <div className="p-8 4k:p-10 rounded-2xl border border-gray-300">
                <motion.h1 className="text-4xl 2xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  <span className="inline-block bg-gradient-to-r from-foreground to-brand-maroon bg-clip-text text-transparent">
                    Actionable
                  </span>{' '}
                  <span className="inline-block">Startup</span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-brand-maroon to-foreground bg-clip-text text-transparent">
                    Intelligence
                  </span>
                  <br />
                  <span className="inline-block">Delivered Daily</span>
                </motion.h1>
                
                <p className="text-base 2xl:text-lg text-gray-600 mt-4 leading-relaxed">
                  Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
                </p>

                <div className="flex flex-row items-center mt-8 space-x-4">
                  <div className='flex gap-4'>
                    <Link href={'#waitlist'}>
                      <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm 4k:text-sm font-semibold shadow-sm hover:opacity-90">
                        JOIN COMMUNITY
                      </button>
                    </Link>
                    <Link href={'/startup-form'}>
                      <button className="bg-brand-maroon text-white px-6 py-2.5 rounded-full text-sm 4k:text-sm font-semibold shadow-sm hover:opacity-90">
                        Get featured
                      </button>
                    </Link>
                  </div>
                  
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 4k:w-11 4k:h-11 rounded-full bg-black flex items-center justify-center text-white z-10 text-lg">
                      ⬡
                    </div>
                    <div className="w-10 h-10 4k:w-11 4k:h-11 rounded-full bg-brand-maroon flex items-center justify-center text-white z-10 text-lg">
                      ✴
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Content */}
              <div className="mt-6 2xl:mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm 4k:text-sm font-semibold text-gray-500 mb-1">NEW RELEASE</p>
                  <p className="text-xl 4k:text-xl font-semibold text-gray-900 leading-snug">
                    Get ready to embark <br />
                    on a new workload
                  </p>
                </div>
                <div className="relative w-28 h-28 4k:w-30 4k:h-30 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/circle34.png"
                    alt="circular feature"
                    width={120}
                    height={120}
                    className="object-center w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default HeroSection;