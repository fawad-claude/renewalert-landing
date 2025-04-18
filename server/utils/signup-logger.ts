import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const signupLogFile = path.join(logsDir, 'signups.log');

export function logSignup(signupData: any): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...signupData
  };
  
  // Format the data nicely for the log
  const formattedData = JSON.stringify(logEntry, null, 2);
  
  // Append to log file
  fs.appendFileSync(
    signupLogFile, 
    `${formattedData},\n`,
    { encoding: 'utf8' }
  );
  
  // Log to console also for debugging
  console.log(`[Signup Log] New signup recorded at ${timestamp}`);
  console.log(`[Signup Log] Email: ${signupData.email || 'Not provided'}`);
  console.log(`[Signup Log] Phone: ${signupData.countryCode || ''}${signupData.phoneNumber || 'Not provided'}`);
  console.log(`[Signup Log] Name: ${signupData.fullName || 'Not provided'}`);
}

// Function to retrieve all signups
export function getSignups(): any[] {
  try {
    if (!fs.existsSync(signupLogFile)) {
      return [];
    }
    
    const fileContent = fs.readFileSync(signupLogFile, 'utf8');
    // Format the file content to make it valid JSON
    const jsonString = `[${fileContent.replace(/,\n$/, '\n')}]`;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error reading signup logs:', error);
    return [];
  }
}