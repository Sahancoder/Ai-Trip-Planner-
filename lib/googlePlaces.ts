export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  rating?: number;
  photos?: Array<{
    photo_reference: string;
  }>;
}

export interface PlacesSearchResponse {
  results: GooglePlace[];
  status: string;
}

/**
 * Search for places using Google Places API
 */
export async function searchPlaces(query: string): Promise<GooglePlace[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY not configured');
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.set('query', query);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  const data: PlacesSearchResponse = await response.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places API error: ${data.status}`);
  }

  return data.results || [];
}

