export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string;
  budget?: string;
  interests?: string[];
}

/**
 * Generate the base prompt for the LLM to create an itinerary
 */
export function generateItineraryPrompt(trip: TripDetails): string {
  const days = calculateDays(trip.startDate, trip.endDate);
  
  return `You are an expert travel planner. Create a detailed ${days}-day itinerary for a trip to ${trip.destination}.

Trip Details:
- Destination: ${trip.destination}
- Start Date: ${trip.startDate}
- End Date: ${trip.endDate}
${trip.preferences ? `- Preferences: ${trip.preferences}` : ''}
${trip.budget ? `- Budget: ${trip.budget}` : ''}
${trip.interests && trip.interests.length > 0 ? `- Interests: ${trip.interests.join(', ')}` : ''}

For each day, provide:
1. Day number
2. Time of day (morning, afternoon, evening)
3. Activity/place name
4. Brief description (2-3 sentences)
5. Estimated duration
6. Location (city/area name for geocoding)

Format the response as JSON array of items:
[
  {
    "day": 1,
    "time": "09:00",
    "title": "Activity Name",
    "description": "Detailed description...",
    "location": "City/Area name"
  }
]

Make the itinerary realistic, well-paced, and include a mix of activities, meals, and rest time.`;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end days
}

