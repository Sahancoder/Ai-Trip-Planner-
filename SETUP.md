# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Convex:**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a Convex account (if needed)
   - Generate `convex.json` and `convex/_generated/` files
   - Start the Convex dev server

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your actual API keys:
   - Get Clerk keys from [clerk.com](https://clerk.com)
   - Get Convex URL from the output of `npx convex dev`
   - Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
   - Get Mapbox token from [mapbox.com](https://mapbox.com)
   - Get Google Places API key from [Google Cloud Console](https://console.cloud.google.com)
   - Get Arcjet key from [arcjet.com](https://arcjet.com)

4. **Run the development servers:**
   ```bash
   # Terminal 1: Next.js
   npm run dev

   # Terminal 2: Convex (if not already running)
   npx convex dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### TypeScript Errors
- Most TypeScript errors will resolve after running `npx convex dev` (generates type definitions)
- If you see "Cannot find module 'convex/react'", make sure you've run `npm install`

### Convex Errors
- Make sure `npx convex dev` is running
- Check that `NEXT_PUBLIC_CONVEX_URL` in `.env.local` matches your Convex deployment URL

### Clerk Errors
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set correctly
- Check that your Clerk app is configured with the correct redirect URLs

## Next Steps

After setup, you can:
1. Create your first trip at `/dashboard/trips/new`
2. Generate an AI itinerary (requires OpenAI API key)
3. View trips on the map (requires Mapbox token)

