// app/privacy/page.tsx 
"use client"; // Add this since you're using framer-motion client components
// Remove or comment out the unused import
// import type { Metadata } from 'next';
import React from "react";
import { Lock } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Note: metadata cannot be exported from a client component
// This will need to be moved to a separate file like we did for layout
// For example: app/privacy/metadata.ts

/*
export const metadata: Metadata = {
  title: "Privacy Policy - Brown24 Ventures",
  description: "Read the Brown24 Ventures privacy policy regarding data collection, usage, and protection.",
};
*/

// Animation Variants
const itemFadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } 
};
const staggerContainer = { 
  hidden: {}, 
  visible: { transition: { staggerChildren: 0.1 } } 
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const proseClasses = cn(
    "prose max-w-none", // Base prose, remove max-width limit for article container
    // Heading styles
    "prose-headings:font-display prose-headings:text-foreground prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0",
    // Paragraph styles - limit width within article for readability
    "prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4 prose-p:max-w-prose",
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemFadeUp} className="text-center flex flex-col items-center justify-center mb-16 md:mb-20">
            <Lock className="h-10 w-10 mx-auto mb-4 text-primary opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-3 text-foreground relative inline-block group"> 
              Privacy <span className="text-brand-maroon">Policy</span> 
              <span className="section-header-underline"></span> 
            </h1>
            <p className="  text-base text-center text-muted-foreground mt-4">Last Updated: {lastUpdated}</p>
          </motion.div>

          {/* Content Card */}
          <motion.div variants={itemFadeUp} className="card-enhanced p-8 md:p-12">
            <article className={proseClasses}>
              {/* === PRIVACY POLICY CONTENT with corrected quotes === */}

              <h2>1. Introduction</h2>
              <p>Welcome to Brown24 Ventures (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the &quot;Site&quot;). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

              <h2>2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register for the waitlist or when you choose to participate in various activities related to the Site, such as contacting us via a form.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                <li><strong>Data from Cookies:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. You can control the use of cookies at the individual browser level.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul>
                <li>Create and manage your waitlist entry or account (if applicable).</li>
                <li>Email you regarding your waitlist status, account, or order (if applicable).</li>
                <li>Respond to your inquiries, questions, and comments and provide customer support.</li>
                <li>Send you updates about the waitlist status, product launches, or newsletters (only if you have explicitly opted-in).</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site and our offerings.</li>
                <li>Perform other business activities as needed.</li>
                <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                <li>Request feedback and contact you about your use of the Site (where appropriate and consented).</li>
              </ul>

              <h2>4. Disclosure of Your Information</h2>
              <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
              <ul>
                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery (e.g., Resend, Mailchimp), hosting services, customer service, and marketing assistance (e.g., Google Analytics). We require these third parties to maintain the confidentiality of your information and to use it only for the purposes for which we disclose it to them.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
              </ul>
              <p>We do not sell your personal information to third parties for their marketing purposes.</p>

              <h2>5. Tracking Technologies (Cookies & Web Beacons)</h2>
              <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of the Site.</p>

              <h2>6. Security of Your Information</h2>
              <p>We use administrative, technical, and physical security measures designed to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.</p>

              <h2>7. Your Rights (Options Regarding Your Information)</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul>
                <li><strong>Access and Update:</strong> You may review or change the information you provided us at any time by contacting us using the contact information provided below.</li>
                <li><strong>Opt-Out of Communications:</strong> You may opt-out of receiving email communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us directly.</li>
                <li><strong>Data Deletion:</strong> You may request deletion of your personal data, subject to certain exceptions provided by law.</li>
                <li><strong>Cookie Control:</strong> As mentioned, you can typically control cookies through your browser settings.</li>
              </ul>
              <p>To exercise these rights, please contact us using the contact information below.</p>

              <h2>8. Policy for Children</h2>
              <p>We do not knowingly solicit information from or market to children under the age of 13 (or other age as required by local law). If you become aware of any data we may have collected from children under the relevant age, please contact us using the contact information provided below so we can take appropriate action.</p>

              <h2>9. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on the Site and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>

              <h2>10. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <p>Email: <a href="mailto:privacy@brown24.ventures">privacy@brown24.ventures</a></p>
              {/* Add Address if applicable */}
              {/* <p>Address: [Your Company Address]</p> */}

              {/* === End Privacy Policy Content === */}
            </article>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}