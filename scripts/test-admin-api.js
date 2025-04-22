// Simple script to test the admin API endpoint with the correct ADMIN_API_KEY
import { get } from 'node:https';
import { env } from 'node:process';

// Get the ADMIN_API_KEY from environment
const apiKey = env.ADMIN_API_KEY;

if (!apiKey) {
  console.error('Error: ADMIN_API_KEY environment variable is not set');
  process.exit(1);
}

console.log('Using ADMIN_API_KEY with length:', apiKey.length);

// Use curl command for testing instead
import { exec } from 'node:child_process';

// Run curl request with the API key
exec(`curl -s -H "X-API-KEY: ${apiKey}" http://localhost:5000/api/admin/signups`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing curl:', error);
    return;
  }
  
  if (stderr) {
    console.error('Curl stderr:', stderr);
    return;
  }
  
  try {
    const response = JSON.parse(stdout);
    console.log('Response status:', response.success ? 'Success' : 'Failed');
    console.log('Response data:', JSON.stringify(response, null, 2));
  } catch (e) {
    console.error('Error parsing response:', e);
    console.log('Raw response:', stdout);
  }
});