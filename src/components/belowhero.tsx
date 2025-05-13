"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { useRef } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const segments = [
  {
    id: 2,
    title:
      "Prime customers, that have access to bank credit and are not satisfied with the current service",
    image: "/pot2.webp",
    label: "Know more",
    color: "bg-blue-400",
  },
  {
    id: 3,
    title:
      "Customers from near-prime and sub-prime segments with no access to bank credit",
    image: "/pot3.webp",
    label: "Know more",
    color: "bg-lime-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

const arrowHover = {
  rest: { x: 0 },
  hover: {
    x: 5,
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
};

export default function CustomerSegmentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`relative flex flex-col lg:flex-row justify-center items-center ${roboto.className} p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
    >
      {/* Left Section */}
      <motion.div
        className="w-full lg:w-1/2 text-center flex flex-col items-center"
        variants={textVariants}
      >
        <motion.div
          className="bg-black text-white px-4 py-2 rounded-full uppercase text-sm font-semibold mb-4"
          whileHover={{ scale: 1.05 }}
        >
          🎯 Target Audience
        </motion.div>

        <motion.h1 className="text-3xl md:text-5xl font-bold mb-4">
          Prospective customer segmentation
        </motion.h1>

        <motion.p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto mb-6">
          Depending on customer satisfaction and access to banking products,
          potential target audience can be divided into three groups.
        </motion.p>

        {/* Animated icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="text-black mt-4"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
        </motion.svg>
      </motion.div>

      {/* Right Section - Cards */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-6"
        variants={containerVariants}
      >
        {segments.map(({ id, title, image, label, color }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-[260px] max-w-full"
          >
            <Card className="relative overflow-hidden w-full h-[770px] sm:h-[700px] md:h-[800px] lg:h-[700px] xl:h-[600px] rounded-2xl shadow-lg bg-white">
              {/* Image */}
              <motion.div className="absolute inset-0 z-0">
                <Image
                  src={image}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Card Content */}
              <CardContent className="relative z-10 h-full flex flex-col justify-end p-6">
                <motion.p
                  className="text-white text-lg mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {title}
                </motion.p>

                <motion.div initial="rest" whileHover="hover">
                  <Button
                    className={`${color || "bg-gray-300"} text-black w-full h-12 rounded-full flex justify-between px-4`}
                  >
                    <motion.span variants={buttonHover}>{label}</motion.span>
                    <motion.span variants={arrowHover}>
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
