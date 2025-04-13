import React from "react";
import { Link } from "wouter";
import logoPath from "@assets/Renewal Alert Logo.png";

export function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img 
                  src={logoPath} 
                  alt="RenewAlert Logo" 
                  className="h-10" 
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
