// app/privacy/page.tsx
import type { Metadata } from 'next';
import React from "react";
import { Lock } from 'lucide-react';
import { cn } from "@/lib/utils"; // Keep cn

export const metadata: Metadata = { title: "Privacy Policy - Brown24 Ventures", description: "Read the Brown24 Ventures privacy policy regarding data collection, usage, and protection.", };

export default function PrivacyPage() {
  const lastUpdated: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Define prose classes
   const proseClasses = cn(
      "prose max-w-none", // Base prose, remove max-width limit
      // Heading styles
      "prose-headings:font-display prose-headings:text-foreground prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0",
      // Paragraph styles
      "prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4 prose-p:max-w-prose", // Limit paragraph width inside article
      // List styles
      "prose-ul:list-disc prose-ul:pl-6 prose-li:my-2 prose-li:text-foreground/90 prose-li:marker:text-muted-foreground",
      // Strong/Bold styles
      "prose-strong:text-foreground prose-strong:font-semibold",
       // Link styles
      "prose-a:text-primary hover:prose-a:text-brand-maroon-dark prose-a:font-medium prose-a:transition-colors prose-a:no-underline hover:prose-a:underline"
   );

  return (
    <div className="bg-gradient-to-b from-background via-secondary to-background min-h-[calc(100vh-100px)] pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
           <div className="text-center mb-16 md:mb-20">
             <Lock className="h-10 w-10 mx-auto mb-4 text-primary opacity-80" />
             <h1 className="text-4xl md:text-5xl font-bold font-display mb-3 text-foreground relative inline-block group"> Privacy <span className="text-brand-maroon">Policy</span> <span className="section-header-underline"></span> </h1>
             <p className="text-base text-muted-foreground mt-4">Last Updated: {lastUpdated}</p>
           </div>

           {/* Content Card */}
            <div className="card-enhanced p-8 md:p-12">
               <article className={proseClasses}>
                 {/* Privacy Policy Content */}
                 {/* Using " for quotes inside text nodes to be safe */}
                 <h2>1. Introduction</h2>
                 <p>Welcome to Brown24 Ventures ("we", "us", or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

                 <h2>2. Information We Collect</h2>
                 <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                 <ul>
                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register for the waitlist or when you choose to participate in various activities related to the Site, such as contacting us via a form.</li>
                    <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    <li><strong>Data from Cookies:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.</li>
                 </ul>

                 <h2>3. How We Use Your Information</h2>
                 <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                 <ul>
                    <li>Respond to your inquiries, questions, and comments and provide customer support.</li>
                    <li>Send you updates about the waitlist status, product launches, or newsletters (if you have opted-in).</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Site and our offerings.</li>
                    <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                    <li>Request feedback and contact you about your use of the Site.</li>
                 </ul>

                 <h2>4. Disclosure of Your Information</h2>
                 <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                 <ul>
                     <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                     <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance (e.g., Google Analytics, Mailchimp/Resend).</li>
                     <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                 </ul>
                 <p>We do not sell your personal information to third parties.</p>

                 <h2>5. Tracking Technologies (Cookies)</h2>
                 <p>We may use cookies and other tracking technologies to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>

                 <h2>6. Security of Your Information</h2>
                 <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                 <h2>7. Your Rights (Options Regarding Your Information)</h2>
                 <ul>
                    <li><strong>Access and Correction:</strong> You may review, change, or terminate your account or request deletion of your data at any time by contacting us using the contact information provided below.</li>
                    <li><strong>Opt-Out:</strong> You may opt-out of receiving email communications from us by following the unsubscribe instructions included in those emails or by contacting us directly.</li>
                 </ul>

                 <h2>8. Policy for Children</h2>
                 <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

                 <h2>9. Changes to This Privacy Policy</h2>
                 <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on the Site and updating the "Last Updated" date.</p> {/* Use " */}

                 <h2>10. Contact Us</h2>
                 <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                 <p>Email: <a href="mailto:privacy@brown24.ventures">privacy@brown24.ventures</a></p>
               </article>
            </div>
         </div>
      </div>
    </div>
  );
}