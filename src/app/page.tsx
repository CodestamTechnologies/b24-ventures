// app/page.tsx
import Hero from "@/components/sections/home/Hero";
import Features from "@/components/sections/home/Features";
import AboutUsSection from "@/components/sections/home/AboutUsSection";
import Testimonials from "@/components/sections/home/Testimonials";
import CtaSection from "@/components/sections/home/CtaSection";
import React from "react";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Subtle Divider Example */}
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