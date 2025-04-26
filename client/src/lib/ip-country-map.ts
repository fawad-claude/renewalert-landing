/**
 * IP Geolocation Utility
 * 
 * This file provides functions to get country information from IP addresses
 * using both external API services and fallback methods for special cases.
 */

// Cache for storing previously looked up IP addresses
// This reduces API calls for repeated IPs
interface IPCacheEntry {
  country: string;
  timestamp: number;
}

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const ipCache: Record<string, IPCacheEntry> = {};

// Check if the IP is in a special category (local, private network, etc.)
function checkSpecialIP(ip: string): string | null {
  if (!ip) return "Unknown";
  
  if (ip === '127.0.0.1' || ip === '::1') return "Local";
  
  // Check for private networks
  if (ip.startsWith('10.') || 
      ip.startsWith('172.16.') || 
      ip.startsWith('172.17.') || 
      ip.startsWith('172.18.') || 
      ip.startsWith('172.19.') || 
      ip.startsWith('172.2') || 
      ip.startsWith('172.3') || 
      ip.startsWith('192.168.')) {
    return "Private Network";
  }
  
  // Check special mappings
  if (specialIPMappings[ip]) {
    return specialIPMappings[ip];
  }
  
  return null; // Not a special IP
}

/**
 * Get country information from an IP address using the ip-api.com service
 * 
 * This uses the free ip-api.com service which has a rate limit of 45 requests per minute.
 * For production use with higher volume, consider using their Pro service.
 */
export async function getCountryFromIPAsync(ip: string): Promise<string> {
  // First check cache
  const cachedResult = ipCache[ip];
  if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_EXPIRY) {
    return cachedResult.country;
  }
  
  // Then check special IPs
  const specialResult = checkSpecialIP(ip);
  if (specialResult) {
    // Cache the result
    ipCache[ip] = {
      country: specialResult,
      timestamp: Date.now()
    };
    return specialResult;
  }
  
  try {
    // Make API call to get country information
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Extract country name
    let countryName = "Unknown";
    if (data.country_name) {
      countryName = data.country_name;
    } else if (data.country) {
      countryName = data.country;
    }
    
    // Cache the result
    ipCache[ip] = {
      country: countryName,
      timestamp: Date.now()
    };
    
    return countryName;
  } catch (error) {
    console.error(`Error fetching country information for IP ${ip}:`, error);
    
    // If API fails, use the fallback method
    return getFallbackCountry(ip);
  }
}

/**
 * Synchronous fallback method for getting country information
 * This is used when the API call fails or for immediate rendering
 * while waiting for the async call to complete
 */
export function getFallbackCountry(ip: string): string {
  // Check special IPs first
  const specialResult = checkSpecialIP(ip);
  if (specialResult) {
    return specialResult;
  }
  
  // Otherwise return placeholder until API call completes
  return "Loading...";
}

// Special mapping for common testing IPs
export const specialIPMappings: Record<string, string> = {
  '127.0.0.1': 'Local',
  '::1': 'Local',
  '192.168.0.1': 'Private Network',
  '10.0.0.1': 'Private Network',
  '8.8.8.8': 'USA (Google DNS)',
  '1.1.1.1': 'Australia (Cloudflare)',
};

/**
 * Legacy synchronous function for backward compatibility
 * This now returns the fallback value until the real value is loaded
 */
export function getCountryFromIP(ip: string): string {
  return getFallbackCountry(ip);
}