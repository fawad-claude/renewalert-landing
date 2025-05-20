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
  try {
    // First try with ipapi.co
    try {
      // Using a free, no-API-key-required geolocation service
      const response = await fetch('https://ipapi.co/json/', { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.country) {
          console.log('Country detected from ipapi.co:', data.country);
          return data.country; // Return ISO country code (e.g., 'US', 'GB', 'KW')
        }
      } else {
        console.warn('ipapi.co response not OK:', response.status);
      }
    } catch (ipApiError) {
      console.warn('ipapi.co fetch failed:', ipApiError);
    }
    
    // Fallback to another API if ipapi.co fails
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (response.ok) {
        const data = await response.json();
        // We have the user's IP, but since we can't reliably determine country from IP without extra services,
        // return a default country code
        console.log('Using fallback IP detection with ipify');
        return 'DEFAULT';
      }
    } catch (ipifyError) {
      console.warn('ipify fallback failed:', ipifyError);
    }
    
    // Final fallback
    return 'DEFAULT';
  } catch (error) {
    console.error('Error detecting user country:', error);
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