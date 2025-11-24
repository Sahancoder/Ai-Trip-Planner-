import { action } from './_generated/server';
import { v } from 'convex/values';

export interface ItineraryItem {
  day: number;
  time: string;
  title: string;
  description: string;
  location?: string;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end days
}

function generateItineraryPrompt(args: {
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string;
  budget?: string;
  interests?: string[];
}): string {
  const days = calculateDays(args.startDate, args.endDate);
  
  return `You are an expert travel planner. Create a detailed ${days}-day itinerary for a trip to ${args.destination}.

Trip Details:
- Destination: ${args.destination}
- Start Date: ${args.startDate}
- End Date: ${args.endDate}
${args.preferences ? `- Preferences: ${args.preferences}` : ''}
${args.budget ? `- Budget: ${args.budget}` : ''}
${args.interests && args.interests.length > 0 ? `- Interests: ${args.interests.join(', ')}` : ''}

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

/**
 * Generate itinerary using OpenAI
 */
export const generateItinerary = action({
  args: {
    tripId: v.id('trips'),
    destination: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    preferences: v.optional(v.string()),
    budget: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not signed in');

    // Verify trip belongs to user
    const trip = await ctx.db.get(args.tripId);
    if (!trip || trip.userId !== identity.subject) {
      throw new Error('Trip not found or unauthorized');
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const prompt = generateItineraryPrompt(args);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'You are a travel planning assistant. Always respond with valid JSON arrays only, no markdown formatting.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse JSON response (remove markdown code blocks if present)
      let items: ItineraryItem[];
      try {
        const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        items = JSON.parse(cleaned);
      } catch (parseError) {
        throw new Error(`Failed to parse OpenAI response: ${parseError}`);
      }

      // Save items to database
      const { createItineraryItem } = await import('./itinerary');
      const savedItems = [];

      for (const item of items) {
        const itemId = await ctx.runMutation(createItineraryItem, {
          tripId: args.tripId,
          day: item.day,
          time: item.time,
          title: item.title,
          description: item.description,
          location: item.location,
        });
        savedItems.push(itemId);
      }

      return { success: true, items: savedItems };
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw error;
    }
  },
});

