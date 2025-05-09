"use client";
import React from 'react';
import Image from 'next/image';
import { CircularDiv } from '@/components/circlulardiv';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className='min-h-screen bg-background relative overflow-hidden'>
        {/* Mobile Background Elements */}
            <div className='md:hidden absolute inset-0 z-0'>
              {/* Large background circle */}
              <div className='absolute -top-24 -left-1/4 w-[150vw] h-[150vw] opacity-10'>
                <CircularDiv />
              </div>
              {/* Decorative boxes */}
              <div className='absolute top-1/4 left-1/4 w-24 h-24 rounded-xl bg-brand-maroon  opacity-20'></div>
              <div className='absolute bottom-1/4 right-1/4 w-24 h-24 rounded-xl bg-white opacity-20'></div>
            </div>
      {/* Desktop Left Side Elements - All 4 Boxes */}
      <div className='hidden md:block relative h-full w-1/2'>
       <div className="absolute top-5 left-60 w-36 h-36 z-20">
    <Image
      src="/logo.png"
      alt="Logo"
      width={300} // smaller to fit the box
      height={200}
      className="rounded-lg z-50 object-contain w-72"
    />
  </div>
        {/* Top Left Blue Box (Box 1) */}
        <div className='absolute -top-16 left-60 w-36 h-36 rounded-3xl bg-brand-maroon z-10 shadow-lg'>
        
          <div className="absolute left-24 top-14 w-24 h-40  transform -rotate-45">
            <svg viewBox="0 0 48 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0,0 H48 V32 C48,48 30,64 48,96 V128 H0 V96 C0,80 18,64 0,32 Z" fill="#9A3251" />
            </svg>
          </div>
        </div>

        {/* Top Right Blue Box (Box 2) */}
        <div className='absolute top-16 right-28 w-36 h-36 rounded-3xl bg-brand-maroon z-10 shadow-lg flex justify-center items-center'>
          <Image 
            src="/img2.png" 
            alt="Product image" 
            width={120} 
            height={120} 
            className="rounded-2xl"
          />
        </div>

        {/* Main 3D Model - Centered */}
        <div className='absolute top-56 left-60 transform -translate-x-1/2 -translate-y-1/2 w-52 h-64 z-20'>
          <Image 
            src="/main.webp" 
            alt="Main model" 
            width={300} 
            height={500} 
            className="rounded-3xl shadow-2xl"
          />
        </div>

        {/* Bottom Left White Box (Box 3) */}
        <div className='absolute top-72 right-28 w-36 h-36  rounded-3xl bg-white  shadow-lg flex justify-center items-center'>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
            <path d="M2 2h20v20H2V2zm2 2v4h4v4H4v4h4v4h4v-4h4v4h4v-4h-4v-4h4V8h-4V4h-4v4H8V4H4zm8 8H8v4h4v-4zm0-4v4h4V8h-4z" fill="black" />
          </svg>
        </div>
         <div className="absolute right-52 top-80 mt-8 w-24 h-40 transform rotate-45">
            <svg viewBox="0 0 48 128" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0,0 H48 V32 C48,48 30,64 48,96 V128 H0 V96 C0,80 18,64 0,32 Z" fill="#ffffff" />
            </svg>
          </div>

        {/* Bottom Right White Box (Box 4) */}
        <div className='absolute top-96 mt-10 left-60 w-36 h-36 rounded-3xl bg-white z-10 shadow-lg flex flex-col justify-center items-center p-4'>
          <div className='flex flex-col -space-y-1 mb-2'>
            <span className='font-bold text-black text-sm'>Our</span>
            <span className='font-bold text-black text-sm'>Creators</span>
          </div>
          <div className="flex -space-x-2">
            {['/part1.webp', '/part2.webp', '/part3.webp'].map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image src={src} alt={`Creator ${i + 1}`} width={32} height={32} />
              </div>
            ))}
          </div>
      
        </div>

        {/* Circular Div Element */}
        <div className='absolute top-96 right-40 mt-10 w-20 h-20 z-0'>
          <CircularDiv/>
        </div>
      </div>

     
      {/* Mobile Content */}
      <div className='md:hidden flex flex-col items-center justify-center min-h-screen p-6 relative z-10'>
        <div className="w-full flex justify-end mb-12">
          
        </div>

        <div className="text-center w-full max-w-md">
         <motion.h1 
              // variants={item}
              className="text-4xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight font-space-grotesk"
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
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
           Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <div className='flex flex-col gap-2'>
            <Link href={'#waitlist'}>

            <button className=" bg-black text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:opacity-90">
              JOIN COMMUNITY
            </button>
            </Link>
            <Link href={'/startup-form'}>
            <button className=" bg-brand-maroon text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-sm hover:opacity-90">
              StartUp Register
            </button>
            </Link>
            </div>
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white z-10 text-lg">
                ⬡
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-maroon flex items-center justify-center text-white z-10 text-lg">
                ✴
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Right Side Content */}
      <div className="hidden md:block absolute top-0 right-10 w-[600px] p-8 rounded-3xl">
        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-10 text-base font-semibold text-gray-800">
            <span>Collections</span>
            <span>Product</span>
            <span>Our Story</span>
          </div>
         
        </div> */}

        <div className="p-10 rounded-2xl border border-gray-300">
            <motion.h1 
              // variants={item}
              className="text-2xl sm:text-3xl md:text-3xl xl:text-4xl font-bold tracking-tight mb-6 leading-tight font-space-grotesk"
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
          <p className="text-base text-gray-600 mt-4 leading-relaxed">
           Cut through the noise. Get curated venture news, smart insights, and essential market trends built for founders and investors.
          </p>

          <div className="flex flex-row  items-center mt-8 space-x-4">
            <div className='flex sm:flex-row flex-col gap-2 '>
            <Link href={'#waitlist'}>

            <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:opacity-90">
              JOIN COMMUNITY
            </button>
             </Link>
            <Link href={'/startup-form'}>
             <button className="   bg-brand-maroon text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:opacity-90">
              StartUp Register
            </button>
            </Link>
            </div>
           
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white z-10 text-lg">
                ⬡
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-maroon flex items-center justify-center text-white z-10 text-lg">
                ✴
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">NEW RELEASE</p>
            <p className="text-xl font-semibold text-gray-900 leading-snug">
              Get ready to embark <br />
              on a new workload
            </p>
          </div>
          <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
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