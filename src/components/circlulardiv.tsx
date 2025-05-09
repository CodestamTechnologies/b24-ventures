"use client";

import { motion } from "framer-motion";

export const CircularDiv = () => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-32 h-32 mx-auto my-8"
    >
      {/* Main circle with black background */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-300 bg-black shadow-xl">
        {/* Circular border text - white and closer to edge */}
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full"
        >
          <path
            id="circlePath"
            d="M100,35 a65,65 0 1,1 0,130 a65,65 0 1,1 0,-130"
            fill="none"
          />
          <text className="text-[1.0rem] font-normal fill-white">
            <textPath href="#circlePath" startOffset="0">
              • ACTIONABLE STARTUP INTELLIGENCE •  STARTUP 
            </textPath>
          </text>
        </svg>

        {/* Center grid SVG - exactly like in the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M2 2H22V22H2V2ZM4 4V8H8V4H4ZM4 10V14H8V10H4ZM4 16V20H8V16H4ZM10 4V8H14V4H10ZM10 10V14H14V10H10ZM10 16V20H14V16H10ZM16 4V8H20V4H16ZM16 10V14H20V10H16ZM16 16V20H20V16H16Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Thin white border inside */}
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};