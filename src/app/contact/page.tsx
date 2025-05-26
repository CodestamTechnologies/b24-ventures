"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, Mail, MailIcon } from 'lucide-react';
import { Inter } from "next/font/google";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const geist = Inter({ subsets: ['latin'] });

interface FormData { 
  name: string; 
  email: string; 
  message: string; 
}

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
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const cardVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const formVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const floatingVariants = {
  float: {
    y: [-5, 5],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};

const buttonHover = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.name || !formData.email || !formData.message || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({ 
        title: "Missing Information", 
        description: "Please fill in all fields with a valid email.", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store submission in Firestore
      const docRef = await addDoc(collection(db, 'contactSubmissions'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'new',
        read: false
      });

      console.log("Submission stored with ID: ", docRef.id);

      // Optional: Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send email');

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
      className="py-20 md:py-28 bg-background overflow-hidden min-h-screen"
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
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100
                }
              }}
              variants={floatingVariants}
            >
              <Mail className="h-12 w-12 mx-auto mb-4 text-brand-maroon opacity-80"/>
            </motion.div>
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold mb-4 text-gray-900 ${geist.className}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.8
                }
              }}
            >
              Get In <span className="text-brand-maroon">Touch</span> 
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: {
                  delay: 0.7,
                  duration: 0.8
                }
              }}
            >
              We love to hear from you. Send us a message or reach out via the details below.
            </motion.p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div 
                className="p-6 rounded-3xl bg-white border border-gray-100"
                custom={0}
                initial="hidden"
                animate="visible"
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
                <motion.div 
                  whileTap="tap"
                  variants={buttonHover}
                >
                  <Button asChild variant="outline" className="rounded-full gap-2 bg-brand-maroon text-white border-none hover:bg-brand-maroon/90">
                    <a href="mailto:privacy@brown24.ventures">
                      <Mail className="h-4 w-4" />
                      Contact us via e-mail
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="p-6 rounded-3xl bg-white border border-gray-100"
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <h2 className={`text-2xl font-semibold mb-4 ${geist.className}`}>
                  Office Hours
                </h2>
                <p className="text-gray-600 mb-6">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { delay: 1.2 }
                  }}
                >
                  <div className="h-[120px] lg:block hidden w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-maroon/10 to-gray-100">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{
                        x: [-200, 200],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div 
              className="lg:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-200"
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { 
                    delay: 0.5,
                    duration: 0.8
                  }
                }}
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: 0.6,
                      duration: 0.8
                    }
                  }}
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
                    className="bg-white hover:border-brand-maroon/50 focus:border-brand-maroon transition-colors"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: 0.7,
                      duration: 0.8
                    }
                  }}
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
                    className="bg-white hover:border-brand-maroon/50 focus:border-brand-maroon transition-colors"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: 0.8,
                      duration: 0.8
                    }
                  }}
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
                    className="bg-white hover:border-brand-maroon/50 focus:border-brand-maroon transition-colors"
                  />
                </motion.div>
                <motion.div 
                  className="pt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                      delay: 0.9,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                >
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    size="lg" 
                    className="w-full md:w-auto bg-brand-maroon hover:bg-brand-maroon/90"
                  >
                    {isLoading ? (
                      <motion.span
                        animate={{
                          opacity: [0.6, 1, 0.6],
                          transition: { 
                            duration: 1.5,
                            repeat: Infinity
                          }
                        }}
                      >
                        Sending...
                      </motion.span>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{
                            x: [0, 4, 0],
                            transition: { 
                              duration: 1.5,
                              repeat: Infinity
                            }
                          }}
                        >
                          <Send className="ml-2 h-4 w-4" />
                        </motion.span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}