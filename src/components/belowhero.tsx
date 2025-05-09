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
    id: 1,
    title: "Prime customers, that have access to bank credit and are satisfied with the current product",
    image: "/pot1.webp",
    label: "Satisfied",
    color: "bg-blue-600",
  },
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
    <div className={`relative flex flex-col md:flex-row ${roboto.className} p-6 md:p-12 max-w-7xl mx-auto gap-8 h-[90vh]`}>
      {/* Left text content - takes remaining space */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className="inline-block bg-black text-white text-[11px] px-3 py-1 w-32 rounded-full uppercase mb-3 font-semibold">
          Target Audience
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-snug mt-5">
          Prospective customer segmentation
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Depending on customer satisfaction and access to banking products, potential target audience can be divided into three groups
        </p>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="mt-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>

      {/* Right cards - 90% height and half width */}
      <div className="md:w-1/2 h-[90%] grid md:grid-cols-3 gap-4 ">
        {segments.map(({ id, title, image, label, color }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.2 }}
            className="h-full mt-15"
          >
            <Card className="overflow-hidden h-full rounded-2xl shadow-md relative ">
              {/* Full-cover image - 90% height */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={image} 
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={id === 1} // Only prioritize first image
                />
              </div>
              
              {/* Dark overlay */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-40" /> */}
              
              {/* Content overlay */}
              <CardContent className="relative h-full flex flex-col justify-end p-4 z-10">
                <p className="text-white text-sm mb-3">{title}</p>
                <Button
                  className={`${color} text-black hover:opacity-90 rounded-full px-3 py-1 text-xs w-full flex items-center justify-between`}
                >
                  {label} <ArrowUpRight className="ml-2 w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}