import { NextRequest, NextResponse } from 'next/server';

// Optional: proxy to Google Places API to hide API key
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  // TODO: Implement Google Places API proxy
  // This would call Google Places API server-side and return results
  // For now, return placeholder

  return NextResponse.json({ places: [] });
}

