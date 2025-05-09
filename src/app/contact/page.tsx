"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, ChevronRight, MailIcon } from 'lucide-react';
// import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
// import FAQSection from "@/components/sections/home/faqs";

const geist = Inter({ subsets: ['latin'] });

interface FormData { name: string; email: string; message: string; }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const simulateTerminal = async () => {
    setTerminalOutput([]);
    setShowTerminal(true);
    
    const messages = [
      "> Connecting to server...",
      "> Establishing secure connection...",
      "> Validating form data...",
      "> Sending message via API...",
      "> Message successfully transmitted!",
      "> Closing connection..."
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTerminalOutput(prev => [...prev, messages[i]]);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowTerminal(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.name || !formData.email || !formData.message || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ title: "Missing Information", description: "Please fill in all fields with a valid email.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await simulateTerminal();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error("Contact form error:", error);
      toast({ 
        title: "Error Sending Message", 
        description: "Could not send message. Please try again later.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Mail className="h-12 w-12 mx-auto mb-4 text-brand-maroon opacity-80"/>
            </motion.div>
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold mb-4 text-gray-900 ${geist.className}`}
              variants={itemVariants}
            >
              Get In <span className="text-brand-maroon">Touch</span> 
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mt-6 "
              variants={itemVariants}
            >
              We love to hear from you. Send us a message or reach out via the details below.
            </motion.p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6 ">
              <motion.div 
                className="p-6 rounded-3xl bg-white "
                variants={cardVariants}
                whileHover="hover"
              >
                <h2 className={`text-2xl font-semibold mb-4 ${geist.className}`}>
                  General Inquiries
                </h2>
                <div className="text-gray-600 mb-6">
                  For all general inquiries and media-related matters, please reach out using the button below.
                  <p className="flex flex-row gap-2 mt-2"> 

                  <MailIcon/> privacy@brown24.ventures
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button asChild variant="outline" className="rounded-full gap-2 bg-brand-maroon text-white border-none">
                    <a href="privacy@brown24.ventures">
                      <Mail className="h-4 w-4" />
                      Contact us via e-mail
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="p-6 rounded-3xl bg-white"
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: 0.1 }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${geist.className}`}>
                Office Hours
                </h2>
                <p className="text-gray-600 mb-6">
              
Monday - Friday
9:00 AM - 5:00 PM
                </p>
                <motion.div whileHover={{ scale: 1.05 }}>
                  {/* <Button asChild variant="outline" className="rounded-full gap-2 bg-black text-white border-none">
                    <a href="mailto:investors@startupresources.com">
                      <Mail className="h-4 w-4" />
                      Contact us via e-mail
                    </a>
                  </Button> */}
                </motion.div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div 
              className="lg:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              variants={cardVariants}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {showTerminal ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-gray-900 rounded-lg p-6 font-mono text-sm h-full"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 ml-2">terminal</span>
                    </div>
                    <div className="space-y-2 text-gray-300">
                      {terminalOutput.map((line, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{line}</span>
                        </motion.div>
                      ))}
                      {terminalOutput.length === 6 && (
                        <motion.div
                          className="text-green-400 mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          ✓ Message sent successfully!
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Your Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                        className="bg-white"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                        className="bg-white"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      variants={itemVariants}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help?" 
                        rows={6} 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                        className="bg-white"
                      />
                    </motion.div>
                    <motion.div 
                      className="pt-4"
                      variants={itemVariants}
                      transition={{ delay: 0.3 }}
                    >
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        size="lg" 
                        className="w-full md:w-auto bg-brand-maroon hover:bg-brand-maroon"
                        // whileHover={{ scale: 1.03 }}
                        // whileTap={{ scale: 0.97 }}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* <FAQSection/> */}
    </motion.section>
  );
}