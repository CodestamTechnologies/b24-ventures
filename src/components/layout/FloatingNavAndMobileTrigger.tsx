// components/layout/FloatingNavAndMobileTrigger.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Home, Info, Mail, Rocket, Menu, X } from 'lucide-react';
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
  
  // Menu item animation variants
  const menuItemVariants: Variants = { 
    hidden: { scale: 0.8, opacity: 0 }, 
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: i * 0.05,
        type: "spring",
        stiffness: 350,
        damping: 25
      } 
    }),
    exit: (i) => ({ 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        delay: i * 0.03,
        duration: 0.2 
      }
    })
  };

  return (
    <>
      {/* Floating Navigation Bar - Positioned to the right of the screen */}
      <AnimatePresence>
        {isNavVisible && (
          <motion.nav 
            key="floating-nav" 
            variants={navVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="fixed bottom-4 md:bottom-5 right-4 z-[99]"
          >
            <div className="inline-flex items-center justify-between bg-background/85 backdrop-blur-lg border border-border shadow-lg rounded-full p-1.5">
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
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={toggleMobileMenu} 
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  className="flex items-center justify-center h-9 w-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-primary transition-colors z-[101]"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Floating Menu Items */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <div className="absolute bottom-full right-0 mb-4 flex flex-col-reverse items-end space-y-reverse space-y-3 lg:hidden">
                  {/* CTA Button */}
                  <motion.div
                    key="mobile-cta" 
                    custom={0}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center"
                  >
                    <span className="mr-3 bg-background/85 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {ctaLink.label}
                    </span>
                    <Link 
                      href={ctaLink.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg"
                    >
                      {ctaLink.icon && <ctaLink.icon className="h-5 w-5" />}
                    </Link>
                  </motion.div>
                  
                  {/* Navigation Links */}
                  {mainNavLinks.map((link, i) => {
                    const isActive = (link.href === '/' && pathname === '/') || 
                      (link.href !== '/' && !link.href.startsWith('/#') && pathname.startsWith(link.href));
                    
                    return (
                      <motion.div
                        key={`mobile-${link.href}`}
                        custom={i + 1}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center"
                      >
                        <span className="mr-3 bg-background/85 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          {link.label}
                        </span>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-center h-12 w-12 rounded-full shadow-lg",
                            isActive 
                              ? "bg-foreground text-background" 
                              : "bg-secondary/90 text-foreground hover:bg-secondary"
                          )}
                        >
                          {link.icon && <link.icon className="h-5 w-5" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavAndMobileTrigger;