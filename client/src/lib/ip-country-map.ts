/**
 * Utility function to convert IP addresses to country names
 * 
 * Note: This is a simplified implementation for demonstration purposes.
 * In a production environment, you would use a proper IP geolocation service
 * that would provide much more accurate data based on real IP geolocation databases.
 */

export function getCountryFromIP(ip: string): string {
  // First check for special cases
  if (!ip) return "Unknown";
  
  if (ip === '127.0.0.1' || ip === '::1') return "Local";
  
  // Check for private networks
  if (ip.startsWith('10.') || 
      ip.startsWith('172.16.') || 
      ip.startsWith('192.168.')) {
    return "Private Network";
  }
  
  // For simplicity, use this mapping based on first octet
  // This is not accurate but works for demonstration
  const firstOctet = parseInt(ip.split('.')[0], 10);
  
  if (isNaN(firstOctet)) return "Unknown";
  
  if (firstOctet >= 0 && firstOctet <= 126) return "North America";
  if (firstOctet >= 128 && firstOctet <= 191) {
    if (firstOctet === 128) return "Japan";
    if (firstOctet === 129) return "South Korea";
    if (firstOctet === 130) return "China";
    if (firstOctet >= 131 && firstOctet <= 140) return "Europe";
    if (firstOctet >= 141 && firstOctet <= 150) return "Middle East";
    if (firstOctet >= 151 && firstOctet <= 160) return "Asia Pacific";
    if (firstOctet >= 161 && firstOctet <= 170) return "South America";
    if (firstOctet >= 171 && firstOctet <= 180) return "Africa";
    return "Europe";
  }
  if (firstOctet >= 192 && firstOctet <= 223) {
    if (firstOctet === 192) return "Australia/NZ";
    if (firstOctet === 193) return "India";
    if (firstOctet === 194) return "Middle East (GCC)";
    if (firstOctet === 195) return "Russia";
    if (firstOctet === 196) return "Southeast Asia";
    return "Asia/Pacific";
  }
  
  return "Unknown";
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