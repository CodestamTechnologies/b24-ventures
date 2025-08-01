// components/layout/Footer.tsx
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const socialLinks = [
  { name: "LinkedIn", url: "#", icon: Linkedin },
  { name: "Twitter", url: "#", icon: Twitter },
];

const footerLinks = {
  navigate: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/#features", label: "Features" },
  ],
  company: [
    { href: "/contact", label: "Contact" },
    { href: "/#waitlist", label: "Join Waitlist" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 py-16 relative z-10 overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full filter blur-3xl animate-float"></div>
        {/* Removed bottom-right background patch */}
        {/* <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary rounded-full filter blur-3xl animate-float-delay"></div> */}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 space-y-6">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="inline-block group relative w-fit">
                <h2 className={`text-center text-3xl text-white font-normal mb-2 ${inter.className}`}>
                  Brown24 Ventures
                </h2>
              </Link>
              <p className="text-gray-400/90 leading-relaxed max-w-md text-sm font-inter">
                Startup intelligence, simplified. We empower your vision with data-driven insights and strategic funding.
              </p>
            </div>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "text-gray-400 hover:text-primary hover:border-primary/50 bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 group",
                    "h-9 w-9"
                  )}
                  aria-label={`Follow on ${social.name}`}
                >
                  <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className={`text-xs font-semibold uppercase tracking-wider text-gray-500 ${inter.className}`}>
              Navigate
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.navigate.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 group flex items-center font-inter text-sm"
                  >
                    <span className="w-1.5 h-1.5 -ml-3.5 mr-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className={`text-xs font-semibold uppercase tracking-wider text-gray-500 ${inter.className}`}>
              Company
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 group flex items-center font-inter text-sm"
                  >
                    <span className="w-1.5 h-1.5 -ml-3.5 mr-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 md:col-span-2 space-y-6">
            <h3 className={`text-xs font-semibold uppercase tracking-wider text-gray-500 ${inter.className}`}>
              Legal
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 group flex items-center font-inter text-sm"
                  >
                    <span className="w-1.5 h-1.5 -ml-3.5 mr-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="  border-t border-primary/20 pt-8 text-gray-500 text-sm flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="flex flex-col gap-2 justify-center items-center">

          <div className="order-2 md:order-1 text-center md:text-left font-inter">
            © {currentYear} Brown24 Ventures. All rights reserved.
          </div>
          <div className="order-2 md:order-1 text-center md:text-left font-inter">
          <a href="https://www.codestam.com/">
           <i> Designed and Developed by Codestam</i>
          </a>
          </div>
        </div>
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </footer>
  );
}
