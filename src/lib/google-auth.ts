import { google } from 'googleapis';
import path from 'path';

export async function getGoogleAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY 
    ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
    : undefined;

  const auth = new google.auth.GoogleAuth({
    credentials,
    keyFile: !credentials ? path.join(process.cwd(), 'service-account.json') : undefined,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly',
    ],
  });
  return auth;
}
