"use client";

import { useState } from 'react';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type FormData = {
  name: string;
  email: string;
  website: string;
  problemSolution: string;
  sector: string;
  fundingStage: string;
  region: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      alert('Startup name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      alert('Email is required');
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      alert('Invalid email address');
      return false;
    }
    
    if (!formData.website.trim()) {
      alert('Website is required');
      return false;
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      alert('Invalid website URL');
      return false;
    }
    
    if (!formData.problemSolution.trim()) {
      alert('Problem & solution description is required');
      return false;
    }
    
    if (!formData.sector) {
      alert('Sector is required');
      return false;
    }
    
    if (!formData.fundingStage) {
      alert('Funding stage is required');
      return false;
    }
    
    if (!formData.region) {
      alert('Region is required');
      return false;
    }

    return true;
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
      alert('This email has already been used to submit a startup');
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to Firestore
      await addDoc(collection(db, 'startupSubmissions'), {
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      // Send confirmation email to user via API
      const userEmailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          subject: 'Your Startup Submission Confirmation',
          text: `Thank you for submitting your startup "${formData.name}". We've received your information and will review it shortly.`,
          html: `<p>Thank you for submitting your startup <strong>${formData.name}</strong>. We've received your information and will review it shortly.</p>`,
        }),
      });

      // Send notification email to admin via API
      const adminEmailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          subject: 'New Startup Submission',
          text: `A new startup has been submitted:\n\nName: ${formData.name}\nWebsite: ${formData.website}\nProblem/Solution: ${formData.problemSolution}\nSector: ${formData.sector}\nFunding Stage: ${formData.fundingStage}\nRegion: ${formData.region}\nEmail: ${formData.email}`,
          html: `
            <h2>New Startup Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Website:</strong> <a href="${formData.website}">${formData.website}</a></p>
            <p><strong>Problem/Solution:</strong> ${formData.problemSolution}</p>
            <p><strong>Sector:</strong> ${formData.sector}</p>
            <p><strong>Funding Stage:</strong> ${formData.fundingStage}</p>
            <p><strong>Region:</strong> ${formData.region}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
          `,
        }),
      });

      if (!userEmailResponse.ok || !adminEmailResponse.ok) {
        throw new Error('Failed to send confirmation emails');
      }

      alert('Your startup has been submitted successfully! We\'ve sent a confirmation to your email.');

      // Reset form
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
      alert('An error occurred while submitting your startup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Submit Your Startup</CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to submit your startup for consideration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Startup Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your startup name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium">
                Website <span className="text-red-500">*</span>
              </label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourstartup.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="problemSolution" className="block text-sm font-medium">
                One-line Problem & Solution <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="problemSolution"
                name="problemSolution"
                value={formData.problemSolution}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the problem you're solving and your solution"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sector" className="block text-sm font-medium">
                Sector <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.sector}
                onValueChange={(value) => handleSelectChange('sector', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sector" />
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
            </div>

            <div className="space-y-2">
              <label htmlFor="fundingStage" className="block text-sm font-medium">
                Funding Stage <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.fundingStage}
                onValueChange={(value) => handleSelectChange('fundingStage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funding stage" />
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
            </div>

            <div className="space-y-2">
              <label htmlFor="region" className="block text-sm font-medium">
                Region <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleSelectChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
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
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Startup"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}