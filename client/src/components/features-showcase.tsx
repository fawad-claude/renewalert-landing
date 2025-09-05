import React from "react";
import { IPhoneMockup } from "./iphone-mockup";
import { Bell, ShieldCheck, Smartphone, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureShowcaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenImage?: string;
  reverse?: boolean;
}

function FeatureShowcase({ icon, title, description, screenImage, reverse = false }: FeatureShowcaseProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : ''} ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
      {/* Feature Description */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
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
    {
      icon: <Smartphone size={24} />,
      title: t("feature_simple_title"),
      description: t("feature_simple_desc"),
      screenImage: undefined, // You can add actual app screenshots here
    },
    {
      icon: <Bell size={24} />,
      title: t("feature_timely_title"),
      description: t("feature_timely_desc"),
      screenImage: undefined,
    },
    {
      icon: <ShieldCheck size={24} />,
      title: t("feature_secure_title"),
      description: t("feature_secure_desc"),
      screenImage: undefined,
    },
    {
      icon: <Users size={24} />,
      title: t("feature_family_title"),
      description: t("feature_family_desc"),
      screenImage: undefined,
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
            See how RenewAlert makes document management simple and stress-free
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}