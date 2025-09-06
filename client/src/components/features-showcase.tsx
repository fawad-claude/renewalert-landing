import React from "react";
import { IPhoneMockup } from "./iphone-mockup";
import { Camera, Edit3, Smartphone, DollarSign, Zap, Cloud, Users, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureShowcaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenImage?: string;
  reverse?: boolean;
  comingSoon?: boolean;
}

function FeatureShowcase({ icon, title, description, screenImage, reverse = false, comingSoon = false }: FeatureShowcaseProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : ''} ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
      {/* Feature Description */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${comingSoon ? 'bg-blue-100 text-blue-600' : 'bg-primary/10 text-primary'}`}>
            {icon}
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            {comingSoon && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
          {description}
        </p>
      </div>
      
      {/* iPhone Mockup */}
      <div className="flex-shrink-0">
        <IPhoneMockup 
          screenImage={screenImage} 
          alt={`${title} app screen`}
          className="transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export function FeaturesShowcase() {
  const { t } = useLanguage();
  
  const features = [
    // V1 Features (Available Now)
    {
      icon: <Camera size={24} />,
      title: "Smart OCR Scanning",
      description: "Camera capture with 70-80% accuracy, much faster than manual entry",
      screenImage: undefined,
      comingSoon: false,
    },
    {
      icon: <Edit3 size={24} />,
      title: "Manual Entry & Review",
      description: "Complete control to edit and verify all document information",
      screenImage: undefined,
      comingSoon: false,
    },
    {
      icon: <Smartphone size={24} />,
      title: "Local Storage",
      description: "Your documents stay on your device, complete privacy",
      screenImage: undefined,
      comingSoon: false,
    },
    {
      icon: <Bell size={24} />,
      title: "Renewal Reminders",
      description: "Get notifications before your documents expire",
      screenImage: undefined,
      comingSoon: false,
    },
    // V2 Features (Coming Soon)
    {
      icon: <Zap size={24} />,
      title: "Enhanced OCR",
      description: "99%+ accuracy with advanced AI processing",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Sync",
      description: "Access your documents across all devices with iCloud",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Users size={24} />,
      title: "Family Sharing",
      description: "Share and manage documents for your entire family",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Bell size={24} />,
      title: "Advanced Notifications",
      description: "Custom reminder schedules and multiple alerts",
      screenImage: undefined,
      comingSoon: true,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("key_benefits")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free iOS app for GCC Citizens & Expats - Smart scanning meets complete manual control
          </p>
        </div>
        
        <div className="space-y-20">
          {features.map((feature, index) => (
            <FeatureShowcase
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              screenImage={feature.screenImage}
              reverse={index % 2 === 1}
              comingSoon={feature.comingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}