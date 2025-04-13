import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <a href="/" className="inline-flex items-center text-primary hover:underline mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Home
      </a>
      
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to RenewAlert. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy will inform you about how we look after your personal data when you visit our website 
            and use our services, and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform, and other technology on the devices you use to access our website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>To register you as a new customer.</li>
            <li>To provide and improve our services to you.</li>
            <li>To manage our relationship with you.</li>
            <li>To send you renewal reminders and notifications as specified in your preferences.</li>
            <li>To administer and protect our business and website.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Storage and Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, 
            or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, 
            and other third parties who have a business need to know.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Data Protection Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The right to request access to your personal data.</li>
            <li>The right to request correction of your personal data.</li>
            <li>The right to request erasure of your personal data.</li>
            <li>The right to object to processing of your personal data.</li>
            <li>The right to request restriction of processing your personal data.</li>
            <li>The right to request transfer of your personal data.</li>
            <li>The right to withdraw consent.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to the Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@renewalert.com<br />
            <strong>Address:</strong> 123 Renewal Street, Suite 101, San Francisco, CA 94105
          </p>
        </div>
      </div>
    </div>
  );
}