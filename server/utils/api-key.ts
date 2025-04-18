// This is a simple API key checker for admin endpoints
// In a production environment, this would be more sophisticated

// A simple API key that can be used to access the admin endpoints
export const ADMIN_API_KEY = "renewal-alert-admin-2024";

/**
 * Validate the API key from the request
 */
export function validateApiKey(providedKey: string): boolean {
  return providedKey === ADMIN_API_KEY;
}