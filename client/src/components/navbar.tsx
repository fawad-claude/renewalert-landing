import React from "react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-primary font-bold text-xl">RenewAlert</a>
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="#about">
              <a className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                About
              </a>
            </Link>
            <Link href="#features">
              <a className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                Features
              </a>
            </Link>
            <Link href="#faq">
              <a className="text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium">
                FAQ
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
