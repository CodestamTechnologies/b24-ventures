"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Rocket } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8
    }
  }
};

// const successVariants = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100
//     }
//   }
// };

const rocketVariants = {
  float: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  launch: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeIn"
    }
  }
};

export default function CtaSection() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRocketLaunching, setIsRocketLaunching] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Check if mobile and set loaded state
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(loadTimer);
    };
  }, []);

  // Animation controls
  useEffect(() => { 
    if (inView && !isMobile && isLoaded) { 
      controls.start("visible"); 
    } 
  }, [controls, inView, isMobile, isLoaded]);

  // Handle email input changes
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setEmail(e.target.value); 
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({ 
        title: "Invalid Email", 
        description: "Please enter a valid email address.", 
        variant: "destructive" 
      });
      return;
    }
    
    setIsLoading(true);
    if (!isMobile) setIsRocketLaunching(true);

    try {
      // Add to Firestore waitlist collection
      await addDoc(collection(db, "joinwaitlist"), {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp(),
        status: "pending",
        source: "website-cta",
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : null
      });

      setIsSubmitted(true);
      toast({ 
        title: "Success!", 
        description: "You're on the list! We'll be in touch soon." 
      });

    } catch (error) {
      console.error("Waitlist submission error:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ 
        title: "Submission Failed", 
        description: message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsRocketLaunching(false), 1000);
    }
  };

  // Animation variant for fade up effect
  const itemFadeUp = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } 
  };

  return (
    <motion.section
      className={`relative flex flex-col lg:flex-row justify-center bg-background z-50 -mt-1 items-center p-6 md:p-12 max-w-7xl mx-auto gap-12 overflow-hidden`}
    >
      {/* Background Elements */}
      {isLoaded && (
        <div className="absolute inset-0 bg-background z-0">
          {isMobile ? (
            <>
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-maroon/5 blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />
            </>
          ) : (
            <>
              <motion.div 
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-maroon/5 blur-[80px]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {isMobile ? (
          <div className="max-w-3xl mx-auto text-center bg-background/80 backdrop-blur-sm p-10 md:p-16 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden">
            {/* Mobile static version */}
            <div className="mb-10 relative z-10 bg-background">
              <div id="waitlist">
                <Mail className="h-12 w-12 mx-auto mb-4 text-primary opacity-80"/>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block">
                Get Early Access
                <span className="section-header-underline"></span> 
              </h2>
              
              <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
                Be the first to experience the future of startup intelligence. Join the waitlist today.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-primary/10 rounded-xl border border-primary/20 relative z-10">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex items-center justify-center mb-2">
                    
                    <h3 className="text-lg font-bold text-green-600">
                      Successfully submitted!
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We have added{" "}
                    <span className="block font-semibold text-primary mt-1 break-all">
                      {email}
                    </span>{" "}
                    to our waitlist.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={email}
                    onChange={handleEmailChange} 
                    required 
                    disabled={isLoading}
                    className="flex-grow bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg h-12 text-base px-4 shadow-inner-sm"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !email} 
                    size="lg" 
                    className={cn(
                      "relative overflow-hidden",
                      "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                      "text-white font-medium shadow-lg hover:shadow-primary/30"
                    )}
                  >
                    {isLoading ? "Joining..." : (
                      <>
                        Join Waitlist <Rocket className="h-5 w-5 inline-block ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                {`  Your privacy is important to us. We'll never spam you.`}
                </p>
              </form>
            )}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-3xl mx-auto text-center bg-background/80 backdrop-blur-sm p-10 md:p-16 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden"
          >
            {/* Desktop animated version */}
            <motion.div 
              variants={itemVariants}
              className="mb-10 relative z-10"
            >
              <motion.div 
                id="waitlist"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    type: "spring",
                    stiffness: 200
                  }
                }}
              >
                <Mail className="h-12 w-12 mx-auto mb-4 text-primary opacity-80"/>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block group"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div variants={itemFadeUp} className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold font-display mb-3 text-foreground relative inline-block group"> 
                    Get Early Access{" "}
                    <span className="section-header-underline"></span> 
                  </h1>
                </motion.div>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.6,
                    duration: 0.8
                  }
                }}
              >
                Be the first to experience the future of startup intelligence. Join the waitlist today.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              {isSubmitted ? (
                <div
                  // variants={successVariants}
                  className="p-6 bg-primary/10 rounded-xl border border-primary/20 relative z-10 w-full max-w-xs sm:max-w-sm mx-auto"
                >
                  <motion.div 
                    className="flex flex-col items-center text-center space-y-2"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center mb-2"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      
                      <h3 className="text-lg font-bold text-green-600">
                        Successfully submitted!
                      </h3>
                    </motion.div>
                    <motion.p 
                      className="text-muted-foreground text-sm"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      We have added{" "}
                      <span className="block font-semibold text-primary mt-1 break-all text-xs">
                        {email}
                      </span>{" "}
                      to our waitlist.
                    </motion.p>
                  </motion.div>
                </div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email}
                      onChange={handleEmailChange} 
                      required 
                      disabled={isLoading}
                      className="flex-grow bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg h-12 text-base px-4 shadow-inner-sm"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !email} 
                      size="lg" 
                      className={cn(
                        "relative overflow-hidden",
                        "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                        "text-white font-medium shadow-lg hover:shadow-primary/30"
                      )}
                    >
                      {isLoading ? (
                        "Joining..."
                      ) : (
                        <>
                          Join Waitlist{" "}
                          <motion.span
                            animate={isRocketLaunching ? "launch" : "float"}
                            variants={rocketVariants}
                            className="inline-block ml-2"
                          >
                            <Rocket className="h-5 w-5" />
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </div>
                 
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}