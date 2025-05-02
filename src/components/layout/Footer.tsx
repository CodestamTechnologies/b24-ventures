// components/layout/Footer.tsx
import Link from "next/link";
import { Linkedin, Twitter, Instagram, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink { name: string; url: string; icon: LucideIcon; }
// !! REPLACE # with actual social links !!
const socialLinks: SocialLink[] = [
    { name: "LinkedIn", url: "#", icon: Linkedin },
    { name: "Twitter", url: "#", icon: Twitter },
    // { name: "Instagram", url: "#", icon: Instagram }, // Uncomment if needed
];

export default function Footer() {
    const currentYear: number = new Date().getFullYear();
    return (
        <footer id="site-footer" className="bg-gray-900 text-gray-400 py-16 border-t border-gray-700/50 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-8 mb-12 text-sm">
                    {/* Brand Info */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-5 group">
                            <span className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-200 font-display"> Brown24 Ventures </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-xs"> Startup intelligence, simplified. </p>
                    </div>
                    {/* Column 1 Links */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-500">Navigate</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                        </ul>
                    </div>
                     {/* Column 2 Links */}
                    <div className="col-span-1">
                         <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-500">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/#waitlist" className="text-gray-300 hover:text-white transition-colors">Join Waitlist</Link></li>
                        </ul>
                    </div>
                     {/* Column 3 Social/Legal */}
                    <div className="col-span-2 md:col-span-1"> {/* Adjusted span for better alignment */}
                         <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-500">Connect</h3>
                        {socialLinks.length > 0 && (
                            <div className="flex space-x-5 mb-6">
                                {socialLinks.map((social) => ( <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200" aria-label={`Follow on ${social.name}`}> <social.icon className="h-5 w-5" /> </a> ))}
                            </div>
                         )}
                         <ul className="space-y-3">
                           <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                {/* Copyright */}
                <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-gray-500 text-xs"> © {currentYear} Brown24 Ventures. All rights reserved. </div>
            </div>
        </footer>
    );
}