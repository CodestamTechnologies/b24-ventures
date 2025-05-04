"use client";
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1
}: ScrollRevealProps) {
  // Set animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: duration, 
              delay: delay, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: duration, 
              delay: delay, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
              duration: duration, 
              delay: delay, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
              duration: duration, 
              delay: delay, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: duration, 
              delay: delay, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}