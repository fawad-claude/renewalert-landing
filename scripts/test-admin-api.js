// Simple script to test the admin API endpoint with the correct ADMIN_API_KEY
const http = require('http');

// Get the ADMIN_API_KEY from environment
const apiKey = process.env.ADMIN_API_KEY;

if (!apiKey) {
  console.error('Error: ADMIN_API_KEY environment variable is not set');
  process.exit(1);
}

console.log('Using ADMIN_API_KEY with length:', apiKey.length);

// Make a GET request to the API
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/signups',
  method: 'GET',
  headers: {
    'X-API-KEY': apiKey
  }
};

const req = http.request(options, (res) => {
  console.log('Response status code:', res.statusCode);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(data);
      console.log('Response:', JSON.stringify(jsonResponse, null, 2));
    } catch (error) {
      console.error('Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.end();