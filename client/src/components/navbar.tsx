import React from "react";
import { Link } from "wouter";
import logoPath from "@assets/Renewal Alert Logo - no BG.png";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { dir } = useLanguage();
  
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src={logoPath} 
                  alt="RenewAlert Logo" 
                  className="w-40 h-auto" 
                  style={{ width: "10rem" }}
                />
              </div>
            </Link>
          </div>
          
          {/* Language selector on the right */}
          <div className="flex items-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
