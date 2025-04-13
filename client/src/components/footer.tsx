import React from "react";
import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#privacy">
              <a className="text-sm text-gray-500 hover:text-primary">Privacy Policy</a>
            </Link>
            <Link href="#terms">
              <a className="text-sm text-gray-500 hover:text-primary">Terms of Service</a>
            </Link>
            <Link href="#contact">
              <a className="text-sm text-gray-500 hover:text-primary">Contact Us</a>
            </Link>
          </div>
          <div>
            <span className="text-sm text-gray-500">Made with ❤️ for hassle-free renewals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
