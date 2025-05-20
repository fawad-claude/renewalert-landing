// Mapping of country codes to phone dial codes
interface CountryMapping {
  [countryCode: string]: string;
}

// Map of ISO country codes to phone dial codes
export const countryCodeMapping: CountryMapping = {
  // GCC countries (primary focus)
  'KW': '+965', // Kuwait
  'SA': '+966', // Saudi Arabia
  'AE': '+971', // United Arab Emirates  
  'QA': '+974', // Qatar
  'OM': '+968', // Oman
  'BH': '+973', // Bahrain
  
  // US and UK
  'US': '+1',   // United States
  'GB': '+44',  // United Kingdom
  
  // South Asian countries
  'IN': '+91',  // India
  'PK': '+92',  // Pakistan
  'BD': '+880', // Bangladesh
  'LK': '+94',  // Sri Lanka
  
  // Default fallback to Kuwait
  'DEFAULT': '+965'
};

// Function to get user's country based on their IP address
export async function getUserCountry(): Promise<string> {
  // Skip API calls and return DEFAULT to avoid errors in preview/development
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('.replit.dev')) {
    console.log('Development environment detected, using default country');
    return 'DEFAULT';
  }
  
  try {
    // Only try the API call in production to avoid rate limiting
    try {
      // Set a timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('https://ipapi.co/json/', { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      // Clear the timeout
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.country) {
          console.log('Country detected:', data.country);
          return data.country;
        }
      }
    } catch (err) {
      console.log('Using default country due to geolocation error');
    }
    
    // If we reach here, something went wrong, use default
    return 'DEFAULT';
  } catch (error) {
    console.error('Error in geolocation:', error);
    return 'DEFAULT';
  }
}

// Get the dial code based on country code
export function getDialCode(countryCode: string): string {
  return countryCodeMapping[countryCode] || countryCodeMapping['DEFAULT'];
}

// Main function to get the appropriate dial code based on user's location
export async function getLocationBasedDialCode(): Promise<string> {
  try {
    const countryCode = await getUserCountry();
    const dialCode = getDialCode(countryCode);
    return dialCode;
  } catch (error) {
    console.error('Error getting location-based dial code:', error);
    return countryCodeMapping['DEFAULT']; // Default to Kuwait
  }
}