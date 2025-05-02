import ReactGA from 'react-ga4';

let initialized = false;

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (!initialized && measurementId) {
    ReactGA.initialize(measurementId);
    initialized = true;
    console.log('Google Analytics initialized with ID:', measurementId);
  }
};

// Track page views
export const trackPageView = (path: string) => {
  if (initialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log('Page view tracked:', path);
  }
};

// Track custom events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (initialized) {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log('Event tracked:', { category, action, label, value });
  }
};