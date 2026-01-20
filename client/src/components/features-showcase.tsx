import React, { useState, useCallback } from "react";
import { IPhoneMockup } from "./iphone-mockup";
import { Camera, Edit3, Smartphone, Zap, Cloud, Users, Bell, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import GIFs and screenshots
import scanOcrGif from "@/assets/gifs/scan-ocr.gif";
import uploadDocsGif from "@/assets/gifs/upload-docs.gif";
import manualEntryImg from "@/assets/gifs/manual-entry.png";
import remindersGif from "@/assets/gifs/reminders.gif";
import localStorageImg from "@/assets/gifs/local-storage.svg";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenImage?: string;
  comingSoon: boolean;
}

export function FeaturesShowcase() {
  const { t, dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const features: Feature[] = [
    // V1 Features (Available Now)
    {
      icon: <Camera size={28} />,
      title: "Smart OCR Scanning",
      description: "Point your camera at any document and let our smart OCR technology extract the details automatically. With 70-80% accuracy, it's much faster than manual entry.",
      screenImage: scanOcrGif,
      comingSoon: false,
    },
    {
      icon: <Upload size={28} />,
      title: "Upload Documents",
      description: "Already have photos of your documents? Upload them directly from your gallery. Our advanced processing achieves 90% accuracy for clean, clear images.",
      screenImage: uploadDocsGif,
      comingSoon: false,
    },
    {
      icon: <Edit3 size={28} />,
      title: "Manual Entry & Review",
      description: "Complete control at your fingertips. Review OCR results, make corrections, or enter information manually. Every detail is exactly as you want it.",
      screenImage: manualEntryImg,
      comingSoon: false,
    },
    {
      icon: <Smartphone size={28} />,
      title: "Local Storage",
      description: "Your sensitive documents stay on your device. No cloud uploads, no third-party access. Complete privacy and security for your personal information.",
      screenImage: localStorageImg,
      comingSoon: false,
    },
    {
      icon: <Bell size={28} />,
      title: "Renewal Reminders",
      description: "Never miss a renewal date again. Get timely notifications before your documents expire, giving you enough time to plan and renew without stress.",
      screenImage: remindersGif,
      comingSoon: false,
    },
    // V2 Features (Coming Soon)
    {
      icon: <Zap size={28} />,
      title: "Enhanced OCR",
      description: "Next-generation AI processing with 99%+ accuracy. Even blurry or damaged documents will be read correctly, saving you time on corrections.",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Cloud size={28} />,
      title: "Cloud Sync",
      description: "Access your documents anywhere with secure iCloud synchronization. Switch between devices seamlessly while keeping your data encrypted.",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Users size={28} />,
      title: "Family Sharing",
      description: "Manage documents for your entire family in one place. Track renewals for spouse, children, and elderly parents with separate profiles.",
      screenImage: undefined,
      comingSoon: true,
    },
    {
      icon: <Bell size={28} />,
      title: "Advanced Notifications",
      description: "Customize your reminder schedule. Set multiple alerts at different intervals, choose notification methods, and never be caught off guard.",
      screenImage: undefined,
      comingSoon: true,
    },
  ];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  }, [features.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  }, [features.length]);

  const currentFeature = features[currentIndex];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("key_benefits")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            iOS app for GCC Citizens & Expats - Up to 3 documents <span className="font-semibold text-green-600">FREE</span>
          </p>
        </div>

        {/* Feature Showcase */}
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left - Feature Details */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${currentFeature.comingSoon ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}>
                {currentFeature.icon}
              </div>
              {currentFeature.comingSoon && (
                <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full border border-orange-200">
                  Coming Soon
                </span>
              )}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {currentFeature.title}
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {currentFeature.description}
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous feature"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? (features[index].comingSoon ? 'bg-orange-500 w-6' : 'bg-primary w-6')
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next feature"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Feature Counter */}
            <p className="mt-4 text-sm text-gray-500">
              {currentIndex + 1} of {features.length} features
            </p>
          </div>

          {/* Right - iPhone Mockup */}
          <div className="flex-shrink-0">
            <div className="relative">
              <IPhoneMockup
                screenImage={currentFeature.screenImage}
                alt={`${currentFeature.title} app screen`}
                className="transform hover:scale-105 transition-transform duration-300"
              />
              {currentFeature.comingSoon && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                  V2
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
