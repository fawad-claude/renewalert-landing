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
            No subscriptions, no premium tiers. Just a free app with optional document packs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
              <p className="text-gray-600">Perfect to get started</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Track up to 3 documents</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Smart OCR scanning (70-80% accuracy)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Manual entry and editing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Local storage (privacy first)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Renewal notifications</span>
              </li>
            </ul>
          </div>

          {/* Additional Documents */}
          <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">More Documents</h3>
              <div className="text-4xl font-bold text-primary mb-1">$0.99</div>
              <p className="text-gray-600">Per 3-document pack</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Add 3 more documents</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">One-time purchase</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">All free features included</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Perfect for families</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Buy multiple packs as needed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            <strong>Coming in V2:</strong> Enhanced OCR accuracy (99%+), cloud sync, and family sharing
          </p>
        </div>
      </div>
    </div>
  );
}