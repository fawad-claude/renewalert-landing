import React from "react";

interface IPhoneMockupProps {
  screenImage?: string;
  alt?: string;
  className?: string;
}

export function IPhoneMockup({ screenImage, alt = "App Screenshot", className = "" }: IPhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone 15 Pro Max Frame */}
      <div className="relative w-[260px] h-[530px] mx-auto">
        {/* Phone Frame */}
        <div className="absolute inset-0 bg-gray-900 rounded-[2.8rem] shadow-2xl">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-22 h-5 bg-black rounded-full"></div>

          {/* Side Buttons */}
          <div className="absolute -left-1 top-20 w-1 h-7 bg-gray-700 rounded-l"></div>
          <div className="absolute -left-1 top-28 w-1 h-11 bg-gray-700 rounded-l"></div>
          <div className="absolute -left-1 top-44 w-1 h-11 bg-gray-700 rounded-l"></div>
          <div className="absolute -right-1 top-28 w-1 h-14 bg-gray-700 rounded-r"></div>

          {/* Screen Area */}
          <div className="absolute top-3 left-3 right-3 bottom-3 bg-black rounded-[2.3rem] overflow-hidden">
            {screenImage ? (
              <img 
                src={screenImage} 
                alt={alt}
                className="w-full h-full object-cover rounded-[2.3rem]"
              />
            ) : (
              /* Placeholder Screen */
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-[2.3rem]">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">RenewAlert</p>
                  <p className="text-xs opacity-75">Document Renewals</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[2.8rem] pointer-events-none"></div>
      </div>
    </div>
  );
}