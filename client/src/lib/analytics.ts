// This file provides utility functions for Google Analytics tracking
// Using the global gtag.js script loaded in index.html

// Track page views
export const trackPageView = (path: string) => {
  try {
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('config', 'G-8MG9K676V5', {
        page_path: path
      });
      console.log('Page view tracked:', path);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track custom events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  try {
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
      console.log('Event tracked:', { category, action, label, value });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};