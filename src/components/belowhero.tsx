"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const segments = [
  {
    id: 2,
    title: "Prime customers, that have access to bank credit and are not satisfied with the current service",
    image: "/pot2.webp",
    label: "Underserved",
    color: "bg-blue-400",
  },
  {
    id: 3,
    title: "Customers from near-prime and sub-prime segments with no access to bank credit",
    image: "/pot3.webp",
    label: "Underbanked",
    color: "bg-lime-400",
  },
];

export default function CustomerSegmentation() {
  return (
    <div
      className={`relative flex flex-col lg:flex-row justify-center items-center ${roboto.className} p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-7xl mx-auto gap-4 md:gap-6 lg:gap-8 `}
    >
      {/* Left text content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center item center">
      <div className="flex flex-col justify-center items-center"> 

        <div className="inline-block justify center bg-black text-white text-sm sm:text-base md:text-lg text-center px-3 py-1 w-52 rounded-full uppercase mb-2 sm:mb-3 md:mb-4 font-semibold">
          Target Audience
        </div>
        <h1 className="text-2xl sm:text-3xl text-center md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-snug mt-4 sm:mt-6">
          Prospective customer segmentation
        </h1>
        <p className="text-gray-600 text-center flex justify-center text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          Depending on customer satisfaction and access to banking products,
          potential target audience can be divided into three groups
        </p>
      </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="mt-4 sm:mt-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M7 7h10v10"
          />
        </svg>
      </div>

      {/* Right card layout */}
      <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-6">
        {segments.map(({ id, title, image, label, color }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.2 }}
            className="flex-1 min-w-[260px] sm:min-w-[200px] lg:min-w-[250px] max-w-full sm:max-w-[400px]"
          >
            <Card className="overflow-hidden w-full h-[770px] sm:h-[700px] md:h-[800px] lg:h-[700px] xl:h-[600px] rounded-2xl shadow-md relative">
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Overlay content */}
              <CardContent className="relative h-full flex flex-col justify-end p-4 sm:p-6 z-10">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4">
                  {title}
                </p>
                <Button
                  className={`${color} text-black hover:opacity-90 rounded-full px-3 py-1 text-sm sm:text-base md:text-lg w-full h-12 flex items-center justify-between`}
                >
                  {label} <ArrowUpRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}