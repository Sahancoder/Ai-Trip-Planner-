import { action } from './_generated/server';
import { v } from 'convex/values';

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

interface PlacesSearchResponse {
  results: GooglePlace[];
  status: string;
}

/**
 * Search for places using Google Places API
 */
export const searchPlacesAction = action({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY not configured');
    }

    try {
      const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
      url.searchParams.set('query', args.query);
      url.searchParams.set('key', apiKey);

      const response = await fetch(url.toString());
      const data: PlacesSearchResponse = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status}`);
      }

      return data.results || [];
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  },
});

/**
 * Get place details by place_id
 */
export const getPlaceDetails = action({
  args: { placeId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY not configured');
    }

    const url = new URL(
      'https://maps.googleapis.com/maps/api/place/details/json'
    );
    url.searchParams.set('place_id', args.placeId);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('fields', 'name,formatted_address,geometry,rating,photos');

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    return data.result;
  },
});

