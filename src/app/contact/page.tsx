// app/contact/page.tsx
"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
// Removed Phone, MapPin imports as they are not used in the JSX below
import { Send, Mail } from 'lucide-react';
import { cn } from "@/lib/utils"; // Keep cn as it's used for button

interface FormData { name: string; email: string; message: string; }
const itemFadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false); // Keep isLoading
  const { toast } = useToast(); // Keep toast

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFormData(prev => ({ ...prev, [e.target.id]: e.target.value })); };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Keep 'e' parameter
    e.preventDefault(); // Use 'e'
    if (isLoading) return;
     if (!formData.name || !formData.email || !formData.message || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast({ title: "Missing Information", description: "Please fill in all fields with a valid email.", variant: "destructive" }); // Use toast
        return;
     }
    setIsLoading(true); // Use setIsLoading
    try {
      console.log('Submitting contact form:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({ title: "Message Sent!", description: "Thanks for reaching out. We'll get back to you soon." }); // Use toast & '
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send message due to an error.";
      toast({ title: "Submission Error", description: message, variant: "destructive" }); // Use toast
    } finally {
      setIsLoading(false); // Use setIsLoading
    }
  };

  return (
    <div className="bg-gradient-to-b from-background via-secondary to-background min-h-[calc(100vh-100px)] pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="max-w-2xl mx-auto" >
           {/* Header */}
           <div className="text-center mb-16 md:mb-20">
             <motion.div variants={itemFadeUp}><Mail className="h-12 w-12 mx-auto mb-4 text-primary opacity-80"/></motion.div>
             <motion.h1 variants={itemFadeUp} className="text-5xl md:text-6xl font-bold font-display mb-4 text-foreground relative inline-block group"> Get In Touch <span className="section-header-underline"></span> </motion.h1>
             <motion.p variants={itemFadeUp} className="text-lg md:text-xl text-muted-foreground mt-6"> We'd love to hear from you. Send us a message or reach out via the details below. </motion.p> {/* Use ' */}
           </div>

           {/* Contact Info & Form Grid */}
           <div className="grid lg:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto">
                {/* Column 1: Contact Info */}
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1 space-y-8 text-left">
                     <motion.div variants={itemFadeUp}>
                         <h2 className="text-2xl font-semibold font-display mb-4">Contact Details</h2>
                         <div className="space-y-3 text-muted-foreground">
                             <p className="flex items-start gap-3"> <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0"/> <a href="mailto:privacy@brown24.ventures" className="link-primary break-all">privacy@brown24.ventures</a> </p>
                             {/* Phone/Address commented out - ensure Phone/MapPin icons are removed from import if not used */}
                         </div>
                     </motion.div>
                      <motion.div variants={itemFadeUp}>
                         <h2 className="text-2xl font-semibold font-display mb-4">Office Hours</h2>
                          <p className="text-muted-foreground">Monday - Friday<br/>9:00 AM - 5:00 PM (PST)</p>
                     </motion.div>
                </motion.div>

                {/* Column 2: Form Card */}
                 <motion.div variants={itemFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} transition={{delay: 0.1}} className="lg:col-span-2 card-enhanced p-8 md:p-10">
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5"> <Label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</Label> <Input id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={isLoading} className="bg-background border-border text-foreground h-12 px-4 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-inner-sm text-base" /> </div>
                          <div className="space-y-1.5"> <Label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address</Label> <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required disabled={isLoading} className="bg-background border-border text-foreground h-12 px-4 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-inner-sm text-base" /> </div>
                      </div>
                     <div className="space-y-1.5"> <Label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</Label> <Textarea id="message" placeholder="How can we help?" rows={6} value={formData.message} onChange={handleChange} required disabled={isLoading} className="bg-background border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-inner-sm text-base p-4" /> </div>
                     <div className="text-right pt-4">
                       <Button type="submit" disabled={isLoading} size="lg" className={cn("relative overflow-hidden group w-full sm:w-auto bg-primary text-primary-foreground font-medium px-8 py-3 transition-all duration-300 text-base rounded-lg disabled:opacity-60 shadow-lg-maroon hover:shadow-xl-maroon hover:bg-brand-maroon-dark transform hover:scale-[1.03]")}>
                          <span className="absolute inset-0 bg-gradient-shine bg-200% bg-left opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"></span>
                           <span className="relative z-10 flex items-center justify-center">
                               {isLoading ? ( <> <div className="h-5 w-5 border-2 border-white/50 border-t-transparent rounded-full animate-spin mr-2.5"></div> Sending... </> ) : ( <> Send Message <Send className="ml-2 h-4 w-4" /> </> )}
                           </span>
                       </Button>
                     </div>
                   </form>
                </motion.div>
           </div>
         </motion.div>
      </div>
    </div>
  );
}