"use client";
import React from 'react';
import Image from 'next/image';
import { CircularDiv } from '@/components/circlulardiv';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className='lg:min-h-screen h-[90vh] bg-background relative overflow-hidden'>
      {/* Background Elements for Mobile and Tablet */}
      <div className='lg:hidden absolute inset-0 z-0'>
        {/* Large background circle */}
        <div className='absolute -top-[6vw] -left-[25vw] w-[150vw] h-[150vw] opacity-10'>
          <CircularDiv />
        </div>
        {/* Decorative boxes */}
        <div className='absolute top-[25vh] left-[25vw] w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] rounded-xl bg-brand-maroon opacity-20'></div>
        <div className='absolute bottom-[25vh] right-[25vw] w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] rounded-xl bg-white opacity-20'></div>
      </div>

      {/* Desktop Left Side Elements - All 4 Boxes */}
      <div className='hidden lg:block relative h-full w-1/2'>
        <div className="absolute top-[1.5rem] left-[9rem] w-[12rem] h-[12rem] z-20">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={400}
            className="rounded-lg z-50 object-contain w-[18rem]"
          />
        </div>

        {/* Main 3D Model - Centered */}
        <div className='absolute top-[35vh] left-[15rem] transform -translate-x-1/2 -translate-y-1/2 w-[13rem] h-[16rem] z-20'>
          <Image 
            src="/main.webp" 
            alt="Main model" 
            width={300} 
            height={500} 
            className="rounded-3xl shadow-2xl"
          />
        </div>

        {/* Bottom Left White Box (Box 3) */}
        <div className='absolute top-[45vh] left-[24rem] mr-[2.5rem] w-[9rem] h-[9rem] rounded-3xl bg-white shadow-lg flex justify-center items-center'>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[2.5rem] h-[2.5rem]">
            <path d="M2 2h20v20H2V2zm2 2v4h4v4H4v4h4v4h4v-4h4v4h4v-4h-4v-4h4V8h-4V4h-4v4H8V4H4zm8 8H8v4h4v-4zm0-4v4h4V8h-4z" fill="black" />
          </svg>
        </div>
        
        <div className="absolute left-[20rem] ml-[1.25rem] top-[50vh] mt-[2rem] w-[6rem] h-[10rem] transform rotate-45">
          <svg viewBox="0 0 48 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M0,0 H48 V32 C48,48 30,64 48,96 V128 H0 V96 C0,80 18,64 0,32 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Bottom Right White Box (Box 4) */}
        <div className='absolute top-[60vh] mt-[2.5rem] left-[15rem] w-[9rem] h-[9rem] rounded-3xl bg-white z-10 shadow-lg flex flex-col justify-center items-center p-[1rem]'>
          <div className='flex flex-col -space-y-[0.25rem] mb-[0.5rem]'>
            <span className='font-bold text-black text-[0.875rem]'>Our</span>
            <span className='font-bold text-black text-[0.875rem]'>Creators</span>
          </div>
          <div className="flex -space-x-[0.5rem]">
            {['/part1.webp', '/part2.webp', '/part3.webp'].map((src, i) => (
              <div key={i} className="w-[2rem] h-[2rem] rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src={src} alt={`Creator ${i + 1}`} width={32} height={32} />
              </div>
            ))}
          </div>
        </div>

        {/* Circular Div Element */}
        <div className='absolute top-[60vh] right-[10rem] mt-[2.5rem] w-[5rem] h-[5rem] z-0'>
          <CircularDiv/>
        </div>
      </div>

      {/* Mobile & Tablet Content */}
      <div className='lg:hidden flex flex-col items-center justify-center min-h-screen p-[1.5rem] relative z-10'>
        <div className="text-center w-full max-w-[56rem] px-[1rem]">
          <motion.h1 
            className="text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-bold tracking-tight mb-[1.5rem] leading-tight font-space-grotesk"
          >
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
          
          <p className="text-[1rem] md:text-[1.125rem] text-gray-600 mb-[2rem] leading-relaxed max-w-[32rem] mx-auto">
            Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem]">
            <Link href={'#waitlist'}>
              <button className="bg-black text-white px-[2rem] py-[0.75rem] rounded-full text-[0.875rem] md:text-[1rem] font-semibold shadow-sm hover:opacity-90 w-full md:w-auto">
                JOIN COMMUNITY
              </button>
            </Link>
            <Link href={'/startup-form'}>
              <button className="bg-brand-maroon text-white px-[2rem] py-[0.75rem] rounded-full text-[0.875rem] md:text-[1rem] font-semibold shadow-sm hover:opacity-90 w-full md:w-auto">
                StartUp Register
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Right Side Content */}
      <div className="hidden lg:block absolute top-0 right-[6rem] w-[37.5rem] p-[2rem] rounded-3xl">
        <div className="p-[2.5rem] rounded-2xl border border-gray-300">
          <motion.h1 
            className="text-[1.5rem] sm:text-[1.875rem] md:text-[1.875rem] xl:text-[2.25rem] font-bold tracking-tight mb-[1.5rem] leading-tight font-space-grotesk"
          >
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
          
          <p className="text-[1rem] text-gray-600 mt-[1rem] leading-relaxed">
            Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </p>

          <div className="flex flex-row items-center mt-[2rem] space-x-[1rem]">
            <div className='flex sm:flex-row flex-col gap-[0.5rem]'>
              <Link href={'#waitlist'}>
                <button className="bg-black text-white px-[1.5rem] py-[0.625rem] rounded-full text-[0.875rem] font-semibold shadow-sm hover:opacity-90">
                  JOIN COMMUNITY
                </button>
              </Link>
              <Link href={'/startup-form'}>
                <button className="bg-brand-maroon text-white px-[1.5rem] py-[0.625rem] rounded-full text-[0.875rem] font-semibold shadow-sm hover:opacity-90">
                  Get featured
                </button>
              </Link>
            </div>
            
            <div className="flex -space-x-[0.75rem]">
              <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-black flex items-center justify-center text-white z-10 text-[1.125rem]">
                ⬡
              </div>
              <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-brand-maroon flex items-center justify-center text-white z-10 text-[1.125rem]">
                ✴
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[1.5rem] flex justify-between items-center">
          <div>
            <p className="text-[0.875rem] font-semibold text-gray-500 mb-[0.25rem]">NEW RELEASE</p>
            <p className="text-[1.25rem] font-semibold text-gray-900 leading-snug">
              Get ready to embark <br />
              on a new workload
            </p>
          </div>
          <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden shadow-md">
            <Image
              src="/circle34.png"
              alt="circular feature"
              width={400}
              height={400}
              className="object-center w-full h-full"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;