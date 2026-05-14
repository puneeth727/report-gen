import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getGoogleAuth } from '@/lib/google-auth';

export async function POST(req: NextRequest) {
  try {
    const { propertyUrl, startDate, endDate } = await req.json();
    
    const auth = await getGoogleAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const response = await searchconsole.searchanalytics.query({
      siteUrl: propertyUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 1000,
      },
    });

    return NextResponse.json(response.data.rows || []);
  } catch (error: any) {
    console.error('GSC API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
