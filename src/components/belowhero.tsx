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
    title:
      "Prime customers, that have access to bank credit and are not satisfied with the current service",
    image: "/pot2.webp",
    label: "Underserved",
    color: "bg-blue-400",
  },
  {
    id: 3,
    title:
      "Customers from near-prime and sub-prime segments with no access to bank credit",
    image: "/pot3.webp",
    label: "Underbanked",
    color: "bg-lime-400",
  },
];

export default function CustomerSegmentation() {
  return (
    <div
      className={`relative flex lg:flex-row justify-center items-center flex-col ${roboto.className} p-[1.5rem] max-w-[87.5rem] mx-auto gap-[0.5rem] min-h-screen md:min-h-[95vh]`}
    >
      {/* Left text content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="inline-block bg-black text-white text-[1.125rem] text-center px-[0.75rem] py-[0.25rem] w-[13rem] rounded-full uppercase mb-[0.75rem] font-semibold">
          Target Audience
        </div>
        <h1 className="text-[1.5rem] md:text-[2.25rem] lg:text-[3.75rem] font-bold mb-[1rem] leading-snug mt-[1.25rem]">
          Prospective customer segmentation
        </h1>
        <p className="text-gray-600 text-[1rem] md:text-[1.125rem] lg:text-[1.5rem] mb-[2rem] max-w-[24rem]">
          Depending on customer satisfaction and access to banking products,
          potential target audience can be divided into three groups
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.75rem"
          height="2.75rem"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="mt-[1rem]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M7 7h10v10"
          />
        </svg>
      </div>

      {/* Right card layout */}
      <div className="w-full md:w-1/2 flex flex-col sm:flex-row lg:flex-row gap-[1rem]">
        {segments.map(({ id, title, image, label, color }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.2 }}
            className="flex-1 min-w-[16.25rem] sm:min-w-[12.5rem] lg:min-w-[15.625rem] max-w-[24rem]"
          >
            <Card className="overflow-hidden w-full h-[43.75rem] sm:h-[25rem] md:h-[31.25rem] lg:h-[37.5rem] rounded-2xl shadow-md relative">
              {/* Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Overlay content */}
              <CardContent className="relative h-full flex flex-col justify-end p-[1rem] z-10">
                <p className="text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] mb-[0.75rem]">
                  {title}
                </p>
                <Button
                  className={`${color} text-black hover:opacity-90 rounded-full px-[0.75rem] py-[0.25rem] text-[0.875rem] md:text-[1.125rem] w-full h-[3rem] flex items-center justify-between`}
                >
                  {label} <ArrowUpRight className="ml-[0.5rem] w-[0.75rem] h-[0.75rem]" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}