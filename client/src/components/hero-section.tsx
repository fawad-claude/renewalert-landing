import React from "react";
import { FeatureItem } from "./feature-item";
import { IPhoneMockup } from "./iphone-mockup";
import { DownloadButtons } from "./download-buttons";
import { Bell, ShieldCheck, Smartphone, Users, Camera, Edit3, Zap, Cloud } from "lucide-react";
import logoPath from "@assets/Renewal Alert Logo - no BG.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

function TabbedBenefits() {
  const [activeTab, setActiveTab] = useState<'v1' | 'v2'>('v1');

  const v1Benefits = [
    {
      icon: <Camera className="text-primary" />,
      title: "Smart OCR Scanning",
      description: "Camera capture with 70-80% accuracy, much faster than manual entry"
    },
    {
      icon: <Edit3 className="text-primary" />,
      title: "Manual Entry & Review", 
      description: "Complete control to edit and verify all document information"
    },
    {
      icon: <Smartphone className="text-primary" />,
      title: "Local Storage",
      description: "Your documents stay on your device, complete privacy"
    },
    {
      icon: <Bell className="text-primary" />,
      title: "Renewal Reminders",
      description: "Get notifications before your documents expire"
    }
  ];

  const v2Benefits = [
    {
      icon: <Zap className="text-blue-600" />,
      title: "Enhanced OCR",
      description: "99%+ accuracy with advanced AI processing"
    },
    {
      icon: <Cloud className="text-blue-600" />,
      title: "Cloud Sync", 
      description: "Access your documents across all devices with iCloud"
    },
    {
      icon: <Users className="text-blue-600" />,
      title: "Family Sharing",
      description: "Share and manage documents for your entire family"
    },
    {
      icon: <Bell className="text-blue-600" />,
      title: "Advanced Notifications",
      description: "Custom reminder schedules and multiple alerts"
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Key Benefits
      </h3>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('v1')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'v1'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Available Now
        </button>
        <button
          onClick={() => setActiveTab('v2')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
            activeTab === 'v2'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Premium Features
          <span className="ml-1 text-xs">✨</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {(activeTab === 'v1' ? v1Benefits : v2Benefits).map((benefit, index) => (
          <FeatureItem
            key={benefit.title}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
}

function MobileTabbedBenefits() {
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'v1' | 'v2'>('v1');

  const v1Benefits = [
    {
      icon: <Camera className="text-primary" />,
      title: "Smart OCR Scanning",
      description: "Camera capture with 70-80% accuracy, much faster than manual entry"
    },
    {
      icon: <Edit3 className="text-primary" />,
      title: "Manual Entry & Review", 
      description: "Complete control to edit and verify all document information"
    },
    {
      icon: <Smartphone className="text-primary" />,
      title: "Local Storage",
      description: "Your documents stay on your device, complete privacy"
    },
    {
      icon: <Bell className="text-primary" />,
      title: "Renewal Reminders",
      description: "Get notifications before your documents expire"
    }
  ];

  const v2Benefits = [
    {
      icon: <Zap className="text-blue-600" />,
      title: "Enhanced OCR",
      description: "99%+ accuracy with advanced AI processing"
    },
    {
      icon: <Cloud className="text-blue-600" />,
      title: "Cloud Sync", 
      description: "Access your documents across all devices with iCloud"
    },
    {
      icon: <Users className="text-blue-600" />,
      title: "Family Sharing",
      description: "Share and manage documents for your entire family"
    },
    {
      icon: <Bell className="text-blue-600" />,
      title: "Advanced Notifications",
      description: "Custom reminder schedules and multiple alerts"
    }
  ];

  return (
    <div>
      <h3 className={`text-xl font-semibold text-gray-800 mb-4 ${dir === 'rtl' ? 'text-right' : 'text-center'}`}>
        Key Benefits
      </h3>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1 max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('v1')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === 'v1'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Available Now
        </button>
        <button
          onClick={() => setActiveTab('v2')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all relative ${
            activeTab === 'v2'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Premium Features
          <span className="ml-1 text-xs">✨</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeTab === 'v1' ? v1Benefits : v2Benefits).map((benefit, index) => (
          <div key={benefit.title} className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              activeTab === 'v1' ? 'bg-primary/10' : 'bg-blue-100'
            }`}>
              {React.cloneElement(benefit.icon as React.ReactElement, { size: 20 })}
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
            <p className="text-gray-600 text-sm">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { t, dir } = useLanguage();
  
  return (
    <div className="pt-32 flex-grow flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm" dir={dir}>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {/* Left content section */}
          <div className="flex-1 max-w-2xl">
            <div className="text-center lg:text-left mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Available Now
              </span>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${dir === 'rtl' ? 'text-right w-full' : ''}`}>
                Never Miss an ID Renewal for You or Your Family
              </h1>
              <h2 className={`text-base md:text-lg text-gray-600 mb-2 ${dir === 'rtl' ? 'text-right w-full' : ''}`}>
                Get timely reminders for everyone's passports, licenses, residency permits (Iqama), and visas before they expire
              </h2>
            </div>

            <div className={`prose prose-sm max-w-none text-gray-600 mb-8 ${dir === 'rtl' ? 'text-right' : 'text-center lg:text-left'}`}>
              <div className={`text-sm md:text-base ${dir === 'rtl' ? 'text-right w-full' : ''}`}>
                <p className="mb-4">
                  Whether you're an Expat, Resident, or Citizen managing documents for yourself or your entire family, we get it — keeping track of renewals is a headache. Passports, licenses, residency permits (Iqama), visas for multiple family members — it's overwhelming and easy to miss important dates.
                </p>
                <p className="mb-4">
                  Our upcoming mobile app is designed to send you timely reminders for all your family's important renewals, helping everyone stay ahead and stress-free. Track documents for your spouse, children, and elderly parents all in one place.
                </p>
                <p>
                  Be the first to experience the convenience of staying organized with ease.
                </p>
              </div>
            </div>

            <div className="space-y-6 hidden lg:block">
              <TabbedBenefits />
            </div>
          </div>

          {/* Right app showcase section */}
          <div className="lg:w-96 w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Free iOS App
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  3 documents free • Extra packs $0.99 • No subscriptions
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <IPhoneMockup className="transform hover:scale-105 transition-transform duration-300" />
              </div>
              
              <DownloadButtons className="justify-center" />
            </div>
          </div>
        </div>

        {/* Features section for mobile only */}
        <div className="mt-12 lg:hidden">
          <MobileTabbedBenefits />
        </div>
      </div>
    </div>
  );
}
