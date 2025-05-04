"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren" 
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: "afterChildren",
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50"
    >
      <motion.div
        variants={logoVariants}
        className="mb-10"
      >
        <Image
          src="/B24 Coin.png"
          alt="Brown24 Ventures Logo"
          width={250}
          height={188}
          priority
          className="h-auto"
        />
      </motion.div>
    </motion.div>
  );
}