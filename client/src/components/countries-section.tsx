import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Country code data from phone-input.tsx
const countryCodes = [
  // GCC countries (primary focus)
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  
  // US and UK
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  
  // South Asian countries
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" }
];

export function CountriesSection() {
  const { t } = useLanguage();
  
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{t("countries_title")}</h2>
          <p className="text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            {t("countries_subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {countryCodes.map((country) => (
            <div 
              key={country.code} 
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <span className="text-5xl mb-3" aria-label={`Flag of ${country.name}`}>
                {country.flag}
              </span>
              <span className="text-sm font-medium text-gray-800 text-center">{country.name}</span>
              <span className="text-xs text-gray-500 mt-1">{country.code}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>{t("countries_footer")}</p>
        </div>
      </div>
    </div>
  );
}