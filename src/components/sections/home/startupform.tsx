"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, Rocket, Loader2 } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  website: string;
  problemSolution: string;
  sector: string;
  fundingStage: string;
  region: string;
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

const successVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function SubmitStartupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    website: '',
    problemSolution: '',
    sector: '',
    fundingStage: '',
    region: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user selects
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Startup name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      newErrors.website = 'Invalid website URL';
    }
    
    if (!formData.problemSolution.trim()) {
      newErrors.problemSolution = 'Problem & solution description is required';
    }
    
    if (!formData.sector) {
      newErrors.sector = 'Sector is required';
    }
    
    if (!formData.fundingStage) {
      newErrors.fundingStage = 'Funding stage is required';
    }
    
    if (!formData.region) {
      newErrors.region = 'Region is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const q = query(collection(db, 'startupSubmissions'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setErrors(prev => ({ ...prev, email: 'This email has already been used to submit a startup' }));
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'startupSubmissions'), {
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      // Send confirmation emails (simplified for example)
      await Promise.all([
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            subject: 'Your Startup Submission Confirmation',
            text: `Thank you for submitting your startup "${formData.name}".`,
          }),
        }),
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            subject: 'New Startup Submission',
            text: `New submission: ${formData.name}`,
          }),
        })
      ]);

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        website: '',
        problemSolution: '',
        sector: '',
        fundingStage: '',
        region: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({ ...prev, form: 'An error occurred while submitting. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <motion.div
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
            className="bg-gradient-to-r from-primary/5 via-background to-primary/5 bg-[length:200%_100%]"
          >
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Submit Your Startup
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CardDescription className="text-center text-muted-foreground">
                  Join our network of innovative startups
                </CardDescription>
              </motion.div>
            </CardHeader>
          </motion.div>

          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 0.6 }
                    }}
                  >
                    <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Submission Successful!</h3>
                  <p className="text-muted-foreground mb-6">
                  {`  We've received your startup information and will review it shortly.`}
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="gap-2"
                    variant="outline"
                  >
                    Submit Another
                    <Rocket className="h-4 w-4" />
                  </Button>
                 </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* {errors.form && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 text-red-600 rounded-md text-sm"
                    >
                      {errors.form}
                    </motion.div>
                  )} */}

                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Startup Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your startup name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      Website <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourstartup.com"
                      className={errors.website ? 'border-red-500' : ''}
                    />
                    {errors.website && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.website}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="problemSolution" className="block text-sm font-medium mb-2">
                      Problem & Solution <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="problemSolution"
                      name="problemSolution"
                      value={formData.problemSolution}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the problem you're solving and your solution"
                      className={errors.problemSolution ? 'border-red-500' : ''}
                    />
                    {errors.problemSolution && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.problemSolution}
                      </motion.p>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="sector" className="block text-sm font-medium mb-2">
                        Sector <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.sector}
                        onValueChange={(value) => handleSelectChange('sector', value)}
                      >
                        <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fintech">Fintech</SelectItem>
                          <SelectItem value="Healthtech">Healthtech</SelectItem>
                          <SelectItem value="Edtech">Edtech</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.sector && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.sector}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="fundingStage" className="block text-sm font-medium mb-2">
                        Funding Stage <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.fundingStage}
                        onValueChange={(value) => handleSelectChange('fundingStage', value)}
                      >
                        <SelectTrigger className={errors.fundingStage ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                          <SelectItem value="Seed">Seed</SelectItem>
                          <SelectItem value="Series A">Series A</SelectItem>
                          <SelectItem value="Series B">Series B</SelectItem>
                          <SelectItem value="Series C+">Series C+</SelectItem>
                          <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.fundingStage && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.fundingStage}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="region" className="block text-sm font-medium mb-2">
                        Region <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => handleSelectChange('region', value)}
                      >
                        <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia">Asia</SelectItem>
                          <SelectItem value="Africa">Africa</SelectItem>
                          <SelectItem value="Latin America">Latin America</SelectItem>
                          <SelectItem value="Middle East">Middle East</SelectItem>
                          <SelectItem value="Oceania">Oceania</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.region && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.region}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gap-2"
                      size="lg"
                      // whileHover={{ scale: 1.02 }}
                      // whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Startup
                          <Rocket className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}