// components/layout/FloatingNavAndMobileTrigger.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, Info, Mail, Rocket, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem { 
  href: string; 
  label: string; 
  icon?: React.ElementType; 
}

const mainNavLinks: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

const ctaLink: NavItem = { 
  href: "/#waitlist", 
  label: "Join Waitlist", 
  icon: Rocket 
};

const FloatingNavAndMobileTrigger = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Find footer on initial render
  useEffect(() => { 
    footerRef.current = document.getElementById('site-footer') || document.querySelector('footer'); 
  }, []);

  // Hide nav when footer is visible
  useEffect(() => { 
    const footerElement = footerRef.current; 
    
    if (!footerElement) { 
      setIsNavVisible(true); 
      return; 
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => { 
        setIsNavVisible(!entry.isIntersecting); 
      }, 
      { 
        root: null, 
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0 
      }
    ); 
    
    observer.observe(footerElement); 
    
    return () => { 
      if (footerElement) observer.unobserve(footerElement); 
    }; 
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => { 
    const originalStyle = window.getComputedStyle(document.body).overflow; 
    
    if (mobileMenuOpen) { 
      document.body.style.overflow = 'hidden'; 
    } else { 
      document.body.style.overflow = originalStyle; 
    } 
    
    return () => { 
      document.body.style.overflow = originalStyle; 
    }; 
  }, [mobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animation variants
  const navVariants: Variants = { 
    hidden: { y: "110%", opacity: 0 }, 
    visible: { y: "0%", opacity: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }, 
    exit: { y: "110%", opacity: 0, transition: { duration: 0.3, ease: [0.5, 0, 0.75, 0] } } 
  };
  
  const mobileOverlayVariants: Variants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { duration: 0.3 } }, 
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } } 
  };
  
  const mobileMenuContentVariants: Variants = { 
    hidden: { opacity: 0, y: -20 }, 
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }, 
    exit: { opacity: 0, y: 10, transition: { staggerChildren: 0.05, staggerDirection: -1 } } 
  };
  
  const mobileMenuItemVariants: Variants = { 
    hidden: { opacity: 0, x: -15 }, 
    visible: { opacity: 1, x: 0 }, 
    exit: { opacity: 0, x: 10 } 
  };

  return (
    <>
      {/* Floating Navigation Bar */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            key="floating-nav" 
            variants={navVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="fixed bottom-4 md:bottom-5 left-1/2 transform -translate-x-1/2 w-auto z-[99]"
          >
            <div className="inline-flex items-center justify-center space-x-1 bg-background/85 backdrop-blur-lg border border-border shadow-lg rounded-full p-1.5">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1.5">
                {mainNavLinks.map((item) => { 
                  const isActive = (item.href === '/' && pathname === '/') || 
                    (item.href !== '/' && !item.href.startsWith('/#') && pathname.startsWith(item.href)); 
                  
                  return (
                    <Link 
                      key={`desktop-${item.href}`} 
                      href={item.href} 
                      aria-current={isActive ? 'page' : undefined} 
                      title={item.label} 
                      className={cn(
                        "flex items-center justify-center px-4 h-9 rounded-full transition-colors duration-200 text-sm font-medium whitespace-nowrap",
                        isActive 
                          ? "bg-foreground text-background" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {item.icon && <item.icon className={cn("h-4 w-4", isActive ? 'mr-1.5' : 'mr-1.5')} />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link 
                  href={ctaLink.href} 
                  aria-label={ctaLink.label} 
                  className={cn(
                    "flex items-center justify-center px-3.5 h-9 rounded-full transition-colors duration-200",
                    "bg-primary text-primary-foreground hover:bg-brand-maroon-dark"
                  )}
                >
                  {ctaLink.icon && <ctaLink.icon className="h-4 w-4" />}
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center justify-center">
                <button 
                  onClick={toggleMobileMenu} 
                  aria-label="Open menu" 
                  className="flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            key="mobile-menu-overlay" 
            variants={mobileOverlayVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(false);
            }}
          >
            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }} 
              transition={{ delay: 0.2 }} 
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
              }} 
              className="absolute top-5 right-4 text-muted-foreground bg-transparent hover:bg-secondary hover:text-primary rounded-full p-2 transition-colors z-[101]" 
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </motion.button>
            
            {/* Menu Content */}
            <motion.div 
              variants={mobileMenuContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit" 
              className="flex flex-col items-center w-full max-w-xs" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links */}
              <ul className="flex flex-col items-center space-y-5 mb-10 w-full">
                {mainNavLinks.map((link) => (
                  <motion.li 
                    key={`mobile-${link.href}`} 
                    variants={mobileMenuItemVariants} 
                    className="w-full"
                  >
                    <Link 
                      href={link.href} 
                      className="block text-center text-xl font-medium text-foreground/90 hover:text-primary transition-colors py-2 w-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <motion.div variants={mobileMenuItemVariants} className="w-full">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-brand-maroon-dark transition-colors px-8 py-3 text-base font-medium rounded-full shadow-sm" 
                  asChild
                >
                  <Link 
                    href={ctaLink.href}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {ctaLink.icon && <ctaLink.icon className="mr-2 h-5 w-5" />}
                    {ctaLink.label}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavAndMobileTrigger;