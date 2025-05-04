"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

// Animation Variants
const containerFadeIn = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      when: "beforeChildren"
    } 
  } 
};

const itemFadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  } 
};

const formFadeIn = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      delay: 0.1, 
      ease: "easeOut" 
    } 
  }
};

const successFadeScaleIn = { 
  hidden: { opacity: 0, scale: 0.8 }, 
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    } 
  } 
};

export default function CtaSection() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Trigger animations when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !email || !/\S+@\S+\.\S+/.test(email)) {
      if (!/\S+@\S+\.\S+/.test(email) && email) {
        toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      }
      return;
    }
    setIsLoading(true);
    try {
      console.log('Submitting waitlist email:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({ title: "Success!", description: "You&apos;re on the list! We&apos;ll be in touch." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "Submission Failed", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); };

  return (
    <section id="waitlist" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
            variants={containerFadeIn}
            initial="hidden"
            animate={controls}
            className="max-w-3xl mx-auto text-center bg-gradient-subtle p-10 md:p-16 rounded-2xl border border-border shadow-xl"
        >
           <motion.div variants={itemFadeUp} className="mb-10">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary opacity-80"/>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block group">
                  Get Early Access <span className="section-header-underline"></span>
              </h2>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
                  Be the first to experience the future of startup intelligence. Join the waitlist today.
              </p>
           </motion.div>

          <motion.div>
              {isSubmitted ? (
                 <motion.div
                    key="success-message"
                    variants={successFadeScaleIn}
                    className="bg-background/80 p-6 rounded-xl border border-green-500/50 shadow-lg max-w-md mx-auto"
                >
                   <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                   <h3 className="text-xl font-semibold text-foreground mb-1 font-display"> Success! </h3>
                   <p className="text-muted-foreground text-base"> You&apos;re on the list. We&apos;ll be in touch soon. </p>
                 </motion.div>
               ) : (
                 <motion.form
                    key="waitlist-form"
                    variants={formFadeIn}
                    onSubmit={handleSubmit}
                    className="mt-8 max-w-lg mx-auto"
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
                                "whitespace-nowrap font-medium transition-all",
                                isLoading ? "opacity-80 cursor-not-allowed" : "hover:shadow-md",
                                !email && !isLoading ? "opacity-60 cursor-not-allowed" : ""
                            )}
                         >
                              {isLoading ? "Joining..." : "Join Waitlist 🚀"}
                         </Button>
                     </div>
                     <p className="text-xs text-muted-foreground mt-3">Your privacy is important to us.</p>
                 </motion.form>
               )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
