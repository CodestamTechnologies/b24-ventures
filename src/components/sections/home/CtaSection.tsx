// components/sections/home/CtaSection.tsx
"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"; // *** CORRECTED IMPORT PATH ***
import { Mail } from "lucide-react"; // Import the Mail icon from lucide-react
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

// ... Animation variants if used ...

export default function CtaSection() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); };

  // *** UPDATED handleSubmit to call API ***
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
        // *** Call the /api/waitlist route ***
        const response = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to join waitlist');
        }

        setIsSubmitted(true);
        // Don't clear email here so success message can potentially show it if needed
        toast({ title: "Success!", description: "You're on the list! We'll be in touch." });

    } catch (error) {
        console.error("Waitlist submission error:", error);
        const message = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({ title: "Submission Failed", description: message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  // --- The JSX part remains the same light-theme version ---
  return (
    <section  className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div

            /* ... animation variants ... */
            initial="hidden"
            animate={controls}
            className="max-w-3xl mx-auto text-center bg-gradient-subtle p-10 md:p-16 rounded-2xl border border-border shadow-xl"
        >
           <motion.div  id="waitlist" /* ... */ className="mb-10">
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
                 <motion.div /* ... success message ... */ >
                   {/* ... Success content ... */}
                 </motion.div>
               ) : (
                 <motion.form /* ... form props ... */ onSubmit={handleSubmit} >
                     <div className="flex flex-col sm:flex-row gap-3">
                         <Input
                            type="email" placeholder="your.email@example.com" value={email}
                            onChange={handleEmailChange} required disabled={isLoading}
                            className="flex-grow bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg h-12 text-base px-4 shadow-inner-sm"
                         />
                         <Button type="submit" disabled={isLoading || !email} size="lg" className={cn( /* ... button styles ... */ )} >
                              {isLoading ? "Joining..." : "Join Waitlist 🚀"}
                         </Button>
                     </div>
                     <p className="text-xs text-muted-foreground mt-3">Your privacy is important to us.</p>
                 </motion.form>
               )}
          </motion.div>
          {/* Social Links Removed - Assume they are in Footer */}
        </motion.div>
      </div>
    </section>
  );
}