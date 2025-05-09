"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Lightbulb, Zap, Globe, BarChart2, Rocket, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Inter } from "next/font/google";



const geist = Inter({ subsets: ['latin'] });
// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const hoverCard = {
  hover: { 
    y: -10,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export default function WhyClayPage() {
  return (
    <div className={cn(
      "bg-background text-black min-h-screen pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden",
      
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto text-center mb-24"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className={`inline-block px-4 py-2 bg-brand-maroon text-white rounded-full text-sm font-medium mb-4 ${geist.className}`}>
              Why Choose Brown24 Venture
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${geist.className}`}
          >
            <span className="bg-brand-maroon bg-clip-text text-transparent">
            Brown24 Ventures
            </span> on Every Project
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
          We're simplifying the complex world of startup intelligence for investors, founders, and operators worldwide.

          </motion.p>
        </motion.section>

        {/* Image Section with Parallax Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-video w-full max-w-6xl mx-auto rounded-3xl overflow-hidden mb-24 shadow-2xl"
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

        {/* Differentiator Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24"
        >
          <motion.div variants={fadeIn}>
            <Card className="h-full p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg text-brand-maroon">
                  <Users className="text-brand-maroon w-6 h-6" />
                </div>
                <h2 className={`text-2xl md:text-3xl ${geist.className}`}>Who We Are</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>Brown24 Ventures was founded by a team of experienced VCs, startup operators, and technologists who saw a critical need for focused, actionable intelligence in the venture ecosystem.</p>
                <p>We combine our smart engine with expert human insight to filter out the noise and deliver the signals that truly matter for strategic decision-making.</p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3  rounded-lg text-brand-maroon">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h2 className={`text-2xl md:text-3xl ${geist.className}`}>Our Vision</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>To be the indispensable global platform for venture intelligence. We aim to empower our users with the clarity and foresight needed to navigate and succeed in the dynamic world of startups and venture capital.</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Approach Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-24"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl ${geist.className}`}>Our Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How we deliver exceptional results for every client
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { 
                icon: Lightbulb, 
                title: "Strategic", 
                description: "Co-founder involvement ensures high-level thinking",
                color: " text-brand-maroon"
              },
              { 
                icon: Target, 
                title: "Focused", 
                description: "Senior teams dedicated to your success",
                color: " text-brand-maroon"
              },
              { 
                icon: Zap, 
                title: "Integrated", 
                description: "Cross-disciplinary expertise in every team",
                color: " text-brand-maroon"
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                variants={fadeIn}
                whileHover="hover"
              >
                <Card className="p-6 h-full text-center rounded-xl bg-white">
                  <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${geist.className}`}>{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-maroon text-white rounded-3xl p-8 md:p-12 mb-24"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { number: "100%", label: "Co-Founder Led Projects" },
              { number: "10+", label: "Years Average Experience" },
              { number: "90%", label: "Client Retention Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className={`text-2xl md:text-3xl ${geist.className} mb-4`}>Ready to work with senior leadership on your project?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the Clay difference with co-founder led teams and exceptional results.
          </p>
          <Link href={'/contact'}>
          <Button size="lg" className="px-8 py-6 rounded-full text-lg bg-brand-maroon hover:bg-bg-brand-maroon">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}