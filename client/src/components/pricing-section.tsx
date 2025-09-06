import React from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function PricingSection() {
  const { t, dir } = useLanguage();

  return (
    <div className="py-20 bg-white" dir={dir}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            V1: Free app with optional document packs. V2: Basic tier stays free + Premium subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Basic Tier */}
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Tier</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <p className="text-gray-600">Always free</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Track up to 3 documents</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Smart OCR scanning (70-80% accuracy)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Manual entry and editing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Local storage (privacy first)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Renewal notifications</span>
              </li>
            </ul>
          </div>

          {/* Additional Documents */}
          <div className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/20">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">More Documents</h3>
              <div className="text-3xl font-bold text-primary mb-1">$0.99</div>
              <p className="text-gray-600">Per 3-document pack</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Add 3 more documents</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">One-time purchase</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">All basic features included</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Perfect for families</span>
              </li>
            </ul>
          </div>

          {/* V2 Premium */}
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                COMING SOON
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium (V2)</h3>
              <div className="text-3xl font-bold text-blue-600 mb-1">$4.99</div>
              <p className="text-gray-600">Per month</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">All Basic features</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">99%+ OCR accuracy</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">iCloud sync</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Family sharing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Advanced notifications</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            V1 available now • V2 Premium features launching soon
          </p>
        </div>
      </div>
    </div>
  );
}