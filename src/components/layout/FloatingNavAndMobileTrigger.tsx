// components/layout/FloatingNavAndMobileTrigger.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants, useAnimationControls } from 'framer-motion';
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
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const rocketControls = useAnimationControls();
  const trailControls = useAnimationControls();

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

  const handleRocketClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRocketLaunching) return;
    
    setIsRocketLaunching(true);
    
    // Get the rocket's starting position
    const rocketButton = e.currentTarget as HTMLElement;
    const rect = rocketButton.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Get the waitlist section position
    const waitlistSection = document.getElementById('waitlist');
    let endX = window.innerWidth / 2;
    let endY = window.innerHeight / 2;
    
    if (waitlistSection) {
      const waitlistRect = waitlistSection.getBoundingClientRect();
      endX = waitlistRect.left + waitlistRect.width / 2;
      endY = waitlistRect.top + waitlistRect.height / 2;
    }

    // First phase: Rocket goes up to the top of the screen
    const topY = 50; // 50px from top
    const topX = window.innerWidth / 2; // Center horizontally
    
    // Second phase: Rocket comes down to the target
    // const controlX = (topX + endX) / 2 + (Math.random() * 100 - 50);
    // const controlY = (topY + endY) / 2 - 100;

    // Define the rocket's path for the trail
    // const path = `M${startX},${startY} L${topX},${topY} Q${controlX},${controlY} ${endX},${endY}`;

    // First animation: Rocket goes up
    await rocketControls.start({
      x: [0, topX - startX],
      y: [0, topY - startY],
      rotate: [0, 15, -10, 5, 0],
      scale: [1, 1.5, 1.2, 1.3, 1],
      transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1]
      }
    });

    // Start scrolling to the section while rocket is at the top
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
      
      // Wait for scroll to complete (approximately)
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Second animation: Rocket comes down to the target
    await rocketControls.start({
      x: [topX - startX, endX - startX],
      y: [topY - startY, endY - startY],
      rotate: [0, 15, -10, 5, 0],
      scale: [1, 1.3, 1.1, 1.2, 1],
      transition: {
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1]
      }
    });

    // Show explosion effect at the end
    await Promise.all([
      rocketControls.start({
        scale: [1, 1.5, 0.8, 1.2, 1],
        transition: { duration: 0.4 }
      }),
      trailControls.start({
        opacity: [1, 0],
        transition: { duration: 0.5 }
      })
    ]);

    // Reset rocket position
    await rocketControls.start({
      x: 0,
      y: 0,
      transition: { duration: 0 }
    });

    setIsRocketLaunching(false);
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
      {/* Floating Navigation Bar */}
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
                <motion.div
                  animate={rocketControls}
                  style={{ position: 'relative' }}
                >
                  <Link 
                    href={ctaLink.href} 
                    onClick={handleRocketClick}
                    aria-label={ctaLink.label} 
                    className={cn(
                      "flex items-center justify-center px-3.5 h-9 rounded-full transition-colors duration-200",
                      "bg-primary text-primary-foreground hover:bg-brand-maroon-dark",
                      isRocketLaunching ? "pointer-events-none" : ""
                    )}
                  >
                    {ctaLink.icon && (
                      <motion.div
                        animate={{
                          rotate: isRocketLaunching ? [0, 180, 360] : 0,
                          transition: { duration: 1.5 }
                        }}
                      >
                        <ctaLink.icon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
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
                    <motion.div
                      animate={rocketControls}
                      style={{ position: 'relative' }}
                    >
                      <Link 
                        href={ctaLink.href}
                        onClick={(e) => {
                          handleRocketClick(e);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg",
                          isRocketLaunching ? "pointer-events-none" : ""
                        )}
                      >
                        {ctaLink.icon && (
                          <motion.div
                            animate={{
                              rotate: isRocketLaunching ? [0, 180, 360] : 0,
                              transition: { duration: 1.5 }
                            }}
                          >
                            <ctaLink.icon className="h-5 w-5" />
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
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

      {/* Rocket Trail Effect */}
      <AnimatePresence>
        {isRocketLaunching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
          >
            {/* Animated rocket trail */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 9998 }}>
              <motion.path
                d={`M0,0`}
                stroke="url(#rocketGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1] }
                }}
              />
              <defs>
                <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Particle effects */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-red-400'}`}
                initial={{ 
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: [0, (Math.random() * 200 - 100)],
                  y: [0, -window.innerHeight * (0.5 + Math.random())],
                  opacity: [1, 0],
                  scale: [1, 0],
                  transition: {
                    duration: 0.8 + Math.random() * 0.7,
                    ease: "easeOut",
                    delay: i * 0.05
                  }
                }}
              />
            ))}
            
            {/* Explosion effect at destination */}
            <motion.div
              initial={{ 
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                transition: {
                  duration: 0.6,
                  delay: 1.2
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-md"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavAndMobileTrigger;