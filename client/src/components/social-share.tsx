import React from 'react';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from "@/contexts/LanguageContext";

interface SocialShareProps {
  className?: string;
}

export function SocialShare({ className = '' }: SocialShareProps) {
  const { t } = useLanguage();
  
  // Base URL of the website
  const baseUrl = window.location.origin;
  
  // Share message with translation support
  const shareTitle = t("share_title") || "RenewAlert - Never miss important document renewals again!";
  const shareMessage = t("share_message") || 
    "I just signed up for RenewAlert to get timely reminders for my passport, visa, and ID renewals. No more last-minute panic! Join me here:";
  
  // Encoded share text for URL parameters
  const encodedText = encodeURIComponent(`${shareMessage} ${baseUrl}`);
  const encodedTitle = encodeURIComponent(shareTitle);
  
  // Social sharing URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodedText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}`;
  
  // For Instagram (which doesn't support direct sharing links), we'll copy the text to clipboard
  const handleInstagramShare = () => {
    // Copy share text to clipboard
    navigator.clipboard.writeText(`${shareMessage} ${baseUrl}`)
      .then(() => {
        alert('Share text copied to clipboard! Now open Instagram to share.');
        // Try to open Instagram if on mobile
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'instagram://';
          
          // Fallback to Instagram website if app doesn't open
          setTimeout(() => {
            window.location.href = 'https://www.instagram.com/';
          }, 2000);
        } else {
          window.open('https://www.instagram.com/', '_blank');
        }
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Could not copy text. Please manually share to Instagram.');
        window.open('https://www.instagram.com/', '_blank');
      });
  };
  
  return (
    <div className={`social-share ${className}`}>
      <h3 className="text-lg font-medium mb-3">{t("share_heading") || "Help friends and family stay updated too!"}</h3>
      <p className="text-sm text-gray-600 mb-4">{t("share_subheading") || "Share RenewAlert with your network"}</p>
      
      <div className="flex justify-center space-x-4">
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon whatsapp"
          aria-label="Share on WhatsApp"
        >
          <div className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
            <FaWhatsapp size={24} />
          </div>
          <span className="text-xs mt-1 block">WhatsApp</span>
        </a>
        
        <a 
          href={facebookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon facebook"
          aria-label="Share on Facebook"
        >
          <div className="w-12 h-12 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
            <FaFacebookF size={20} />
          </div>
          <span className="text-xs mt-1 block">Facebook</span>
        </a>
        
        <a 
          href={twitterUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon twitter"
          aria-label="Share on X (Twitter)"
        >
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
            <FaTwitter size={20} />
          </div>
          <span className="text-xs mt-1 block">X</span>
        </a>
        
        <button 
          onClick={handleInstagramShare}
          className="social-icon instagram border-0 bg-transparent p-0 cursor-pointer"
          aria-label="Share on Instagram"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-all" 
               style={{background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}}>
            <FaInstagram size={24} className="text-white" />
          </div>
          <span className="text-xs mt-1 block">Instagram</span>
        </button>
        
        <a 
          href={emailUrl}
          className="social-icon email"
          aria-label="Share via Email"
        >
          <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all">
            <FaEnvelope size={20} />
          </div>
          <span className="text-xs mt-1 block">Email</span>
        </a>
      </div>
    </div>
  );
}