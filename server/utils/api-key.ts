// API key validator for secure admin endpoints

// Use the environment variable for the API key
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!ADMIN_API_KEY) {
  console.warn("WARNING: ADMIN_API_KEY environment variable is not set. Admin endpoints will be inaccessible.");
}

/**
 * Validate the API key from the request
 * Implements a secure comparison to prevent timing attacks
 */
export function validateApiKey(providedKey: string): boolean {
  console.log("Validating API key, provided key length:", providedKey?.length);
  
  // If the API key is not set, always return false
  if (!ADMIN_API_KEY) {
    console.warn("ADMIN_API_KEY is not set in environment variables");
    return false;
  }
  
  console.log("Environment ADMIN_API_KEY length:", ADMIN_API_KEY.length);
  
  // If the lengths don't match, the keys are different
  if (providedKey.length !== ADMIN_API_KEY.length) {
    console.log("API key length mismatch");
    return false;
  }
  
  // Use a constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < providedKey.length; i++) {
    result |= providedKey.charCodeAt(i) ^ ADMIN_API_KEY.charCodeAt(i);
  }
  
  const isValid = result === 0;
  console.log("API key validation result:", isValid);
  return isValid;
}