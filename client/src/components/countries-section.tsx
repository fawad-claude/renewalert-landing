import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Home } from "lucide-react";

// GCC Host Countries - where expats live and work
const gccCountries = [
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
];

// Home Countries - where expats are originally from
const homeCountries = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
];

export function CountriesSection() {
  const { t } = useLanguage();

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Built for Expats in the GCC
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track documents from both your <span className="font-semibold text-primary">host country</span> and your <span className="font-semibold text-primary">home country</span> — all in one app
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* GCC Host Countries */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Where You Live</h3>
                <p className="text-sm text-gray-500">GCC Host Countries</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Store your residency permits (Iqama), work visas, driving licenses, and other documents issued by your host country.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {gccCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <span className="text-3xl mb-2" aria-label={`Flag of ${country.name}`}>
                    {country.flag}
                  </span>
                  <span className="text-xs font-medium text-gray-700 text-center">{country.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Home Countries */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Where You're From</h3>
                <p className="text-sm text-gray-500">Your Home Country</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Keep track of your passport, national ID, and other important documents from your home country that need renewal.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {homeCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <span className="text-3xl mb-2" aria-label={`Flag of ${country.name}`}>
                    {country.flag}
                  </span>
                  <span className="text-xs font-medium text-gray-700 text-center">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Support for more nationalities coming soon. The app works with any document from any country!
          </p>
        </div>
      </div>
    </div>
  );
}
