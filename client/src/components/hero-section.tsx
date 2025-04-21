import React from "react";
import { SignupForm } from "./signup-form";
import { FeatureItem } from "./feature-item";
import { Bell, ShieldCheck, Smartphone } from "lucide-react";
import logoPath from "@assets/Renewal Alert Logo - no BG.png";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t, dir } = useLanguage();
  
  return (
    <div className="pt-32 flex-grow flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Left content section */}
          <div className="flex-1 max-w-2xl">
            <div className="text-center lg:text-left mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Coming Soon
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t("hero_title")}
              </h1>
              <h2 className="text-base md:text-lg text-gray-600 mb-2">
                {t("hero_subtitle")}
              </h2>
            </div>

            <div className="prose prose-sm max-w-none text-gray-600 mb-8 text-center lg:text-left">
              <div className="text-sm md:text-base whitespace-pre-line">
                {t("expat_paragraph")}
              </div>
            </div>

            <div className="space-y-6 hidden lg:block">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Key Benefits
              </h3>
              <FeatureItem
                icon={<ShieldCheck className="text-primary" />}
                title={t("feature_secure_title")}
                description={t("feature_secure_desc")}
              />
              <FeatureItem
                icon={<Bell className="text-primary" />}
                title={t("feature_timely_title")}
                description={t("feature_timely_desc")}
              />
              <FeatureItem
                icon={<Smartphone className="text-primary" />}
                title={t("feature_simple_title")}
                description={t("feature_simple_desc")}
              />
            </div>
          </div>

          {/* Right form section */}
          <div className="lg:w-96 w-full max-w-md">
            <SignupForm />
          </div>
        </div>

        {/* Features section for mobile only */}
        <div className="mt-12 lg:hidden">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">
                {t("feature_secure_title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("feature_secure_desc")}
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <Bell size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">
                {t("feature_timely_title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("feature_timely_desc")}
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <Smartphone size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">{t("feature_simple_title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("feature_simple_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
