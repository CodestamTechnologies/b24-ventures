// app/page.tsx
import Hero from "@/components/sections/home/Hero";
import Features from "@/components/sections/home/Features";
import AboutUsSection from "@/components/sections/home/AboutUsSection";
import Testimonials from "@/components/sections/home/Testimonials";
import CtaSection from "@/components/sections/home/CtaSection";
import React from "react";
import CustomerSegmentation from "@/components/belowhero";
import ServicesSection from "@/components/sections/home/about";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <CustomerSegmentation/>
      {/* Subtle Divider Example */}

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <ServicesSection/>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <Features />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <AboutUsSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <Testimonials />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <CtaSection />
    </>
  );
}