"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users,  BarChart2, ArrowRight, Clock, Globe, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Inter } from "next/font/google";

const geist = Inter({ subsets: ['latin'] });

// Enhanced Animation variants


const slideInFromRight = {
  hidden: { 
    opacity: 0, 
    x: 100,
    rotate: 2 
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5
    }
  }
};

const slideInFromLeft = {
  hidden: { 
    opacity: 0, 
    x: -100,
    rotate: -2 
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5
    }
  }
};

const boxPopIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      mass: 0.5
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardHover = {
  hover: { 
    y: -10,
    scale: 1.03,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.3,
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

const textPopIn = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12
    }
  }
};

const backgroundPattern = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.03,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

export default function WhyClayPage() {
  return (
    <div className={cn(
      "bg-background text-black min-h-screen pt-28 pb-24 md:pt-36 md:pb-32 overflow-x-hidden",
      geist.className
    )}>
      {/* Decorative background elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={backgroundPattern}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto text-center mb-24"
        >
          <motion.div 
            variants={textPopIn}
            className="mb-8"
          >
            <motion.span 
              className={`inline-block px-4 py-2 bg-brand-maroon text-white rounded-full text-sm font-medium mb-4 ${geist.className}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Why Choose Brown24 Venture
            </motion.span>
          </motion.div>
          
          <motion.h1 
            variants={textPopIn}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${geist.className}`}
          >
            <motion.span 
              className="bg-brand-maroon bg-clip-text text-transparent inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Brown24 Ventures
            </motion.span> on Every Project
          </motion.h1>
          
          <motion.p 
            variants={textPopIn}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We are simplifying the complex world of startup intelligence for investors, founders, and operators worldwide.
          </motion.p>
        </motion.section>

        {/* Image Section with Enhanced Parallax Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.3
          }}
          className="relative aspect-video w-full max-w-6xl mx-auto rounded-3xl overflow-hidden mb-24 shadow-2xl"
          whileHover={{ scale: 1.01 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
            alt="Team collaborating"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </motion.div>

        {/* Differentiator Section with Slide Animations */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24"
        >
          <motion.div 
            variants={slideInFromLeft}
            whileHover="hover"
          >
            <motion.div
              variants={cardHover}
              className="h-full"
            >
              <Card className="h-full p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="p-3 rounded-lg text-brand-maroon"
                    variants={iconHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Users className="text-brand-maroon w-6 h-6" />
                  </motion.div>
                  <h2 className={`text-2xl md:text-3xl ${geist.className}`}>Who We Are</h2>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p>B24 Ventures is a real-time funding intelligence and discovery platform built for founders and investors in emerging, overlooked, and fast-growing startup markets across the world.</p>
                  <p> From Tier 2/3 cities in India to rising ecosystems in Africa, Latin America, Southeast Asia, and beyond.</p>
                  <p> We go beyond headlines to deliver clarity, context, and visibility to those building where no one’s watching.</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={slideInFromRight}
            whileHover="hover"
          >
            <motion.div
              variants={cardHover}
              className="h-full"
            >
              <Card className="h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="p-3 rounded-lg text-brand-maroon"
                    variants={iconHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <BarChart2 className="w-6 h-6" />
                  </motion.div>
                  <h2 className={`text-2xl md:text-3xl ${geist.className}`}>Our Vision</h2>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p>To be the indispensable global platform for venture intelligence. We aim to empower our users with the clarity and foresight needed to navigate and succeed in the dynamic world of startups and venture capital.</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Approach Section with Staggered Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-24 "
        >
          <motion.div variants={textPopIn} className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${geist.className}`}>Our Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How we deliver exceptional results for every client
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
  { 
    icon: Clock, 
    title: "Real-time Funding News", 
    description: "Get the most relevant startup funding updates as they happen",
    color: "text-brand-maroon",
    delay: 0.2
  },
  { 
    icon: Globe, 
    title: "Funding Trend Analysis", 
    description: "Global and regional funding trend breakdowns to spot opportunities",
    color: "text-brand-maroon",
    delay: 0.4
  },
  { 
    icon: User, 
    title: "Grassroots Founder Spotlights", 
    description: "Sharp spotlights on under-the-radar founders changing the game",
    color: "text-brand-maroon",
    delay: 0.6
  },

].map((value, index) => (
              <motion.div 
                key={value.title}
                variants={boxPopIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: value.delay }}
                whileHover="hover"
                custom={index}
               
              >
                <motion.div variants={cardHover}>
                  <Card className="p-6    h-full text-center rounded-xl bg-white hover:bg-gray-50 transition-colors">
                    <motion.div 
                      className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}
                      variants={iconHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      <value.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className={`text-xl font-semibold mb-2 ${geist.className}`}>{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section with Enhanced Animations */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-brand-maroon text-white rounded-3xl p-8 md:p-12 mb-24 overflow-hidden relative"
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
            variants={backgroundPattern}
          >
            <div className="grid grid-cols-3 gap-8 h-full">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white rounded-lg"></div>
              ))}
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {[
              { number: "100%", label: "Co-Founder Led Projects" },
              { number: "10+", label: "Years Average Experience" },
              { number: "90%", label: "Client Retention Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={slideInFromRight}
                custom={index}
                className="text-center"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-2"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section with Enhanced Animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className={`text-2xl md:text-3xl ${geist.className} mb-4`}
            variants={textPopIn}
          >
            Ready to work with senior leadership on your project?
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={textPopIn}
          >
            Experience the Brown24 Ventures difference with co-founder led teams and exceptional results.
          </motion.p>
          <motion.div
            variants={textPopIn}
          >
            <Link href={'/contact'}>
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="px-8 py-6 rounded-full text-lg bg-brand-maroon hover:bg-brand-maroon-dark relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-brand-maroon to-brand-maroon-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}