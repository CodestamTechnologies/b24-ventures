// components/sections/home/CtaSection.tsx
"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils"; // Keep cn

export default function CtaSection() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !email || !/\S+@\S+\.\S+/.test(email)) {
        if (!/\S+@\S+\.\S+/.test(email) && email) { toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" }); }
        return;
    };
    setIsLoading(true);
    try {
      console.log('Submitting waitlist email:', email); // Replace with API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast({ title: "Success!", description: "You're on the list! We'll be in touch." }); // Use '
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "Submission Failed", description: message, variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); };

  return (
    <section id="waitlist" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center bg-gradient-subtle p-10 md:p-16 rounded-2xl border border-border shadow-xl">
           <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }} className="mb-10">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary opacity-80"/>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground relative inline-block group"> Get Early Access <span className="section-header-underline"></span> </h2>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto"> Be the first to experience the future of startup intelligence. Join the waitlist today. </p>
           </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {isSubmitted ? (
                 <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-background/80 p-6 rounded-xl border border-green-500/50 shadow-lg max-w-md mx-auto">
                   <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                   <h3 className="text-xl font-semibold text-foreground mb-1 font-display"> Success! </h3>
                   <p className="text-muted-foreground text-base"> You're on the list. We'll be in touch. </p> {/* Use ' */}
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
                   <div className="flex flex-col sm:flex-row gap-3">
                     <Input type="email" placeholder="your.email@example.com" value={email} onChange={handleEmailChange} required disabled={isLoading} className="flex-grow bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg h-12 text-base px-4 shadow-inner-sm" />
                     <Button type="submit" disabled={isLoading || !email} size="lg" className={cn("relative overflow-hidden group flex-shrink-0 bg-primary text-primary-foreground font-medium px-6 h-12 rounded-lg text-base shadow-lg-maroon hover:shadow-xl-maroon hover:bg-brand-maroon-dark transition-all duration-300 ease-out transform hover:scale-[1.03]", "disabled:opacity-50 disabled:cursor-not-allowed")}>
                       <span className="absolute inset-0 bg-gradient-shine bg-200% bg-left opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></span>
                       <span className="relative z-10 flex items-center justify-center">
                           {isLoading ? (<> <div className="h-4 w-4 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full animate-spin mr-2.5"></div> </> ) : ( <> <span className="sm:hidden">Join</span><span className="hidden sm:inline">Join Waitlist</span> <ArrowRight className="ml-2 h-4 w-4" /> </> )}
                       </span>
                     </Button>
                   </div>
                   <p className="text-xs text-muted-foreground mt-3">Your privacy is important to us.</p>
                 </form>
               )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}