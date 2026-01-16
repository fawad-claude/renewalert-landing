import React from "react";
import { Link } from "wouter";
import logoPath from "@assets/Renewal Alert Logo - no BG.png";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Navbar() {
  const { dir } = useLanguage();
  
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src={logoPath}
                  alt="RenewAlert Logo"
                  className="w-32 h-auto"
                  style={{ width: "8rem" }}
                />
              </div>
            </Link>
          </div>
          
          {/* Contact and Language selector on the right */}
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-gray-600 hover:text-primary text-sm font-medium mr-4 transition-colors">
                  Contact
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600 text-sm mb-3">
                    Have questions or feedback? Reach out to us:
                  </p>
                  <a
                    href="mailto:fawadmohamed@gmail.com"
                    className="text-primary hover:underline font-medium"
                  >
                    fawadmohamed@gmail.com
                  </a>
                </div>
              </DialogContent>
            </Dialog>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
