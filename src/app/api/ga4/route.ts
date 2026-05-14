import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getGoogleAuth } from '@/lib/google-auth';

export async function POST(req: NextRequest) {
  try {
    const { propertyId, startDate, endDate } = await req.json();
    
    const auth = await getGoogleAuth();
    const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'engagementRate' },
          { name: 'newUsers' }
        ],
        dimensions: [{ name: 'date' }],
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('GA4 API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
