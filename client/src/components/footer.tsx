import React from "react";
import { Link } from "wouter";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-primary font-bold text-xl">RenewAlert</span>
            <p className="text-gray-500 text-sm mt-1">© {new Date().getFullYear()} RenewAlert. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center items-center">
          <div>
            <span className="text-sm text-gray-500">Made with ❤️ for hassle-free renewals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
