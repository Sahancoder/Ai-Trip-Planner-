# AI Trip Planner

Plan your perfect trips with AI, Google Places & Mapbox integration.

## Features

- 🤖 AI-powered itinerary generation using OpenAI
- 🗺️ Interactive maps with Mapbox
- 📍 Google Places integration for location search
- 🔐 Secure authentication with Clerk
- ⚡ Real-time data with Convex
- 🛡️ API protection with Arcjet

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database & serverless functions)
- **Auth**: Clerk
- **Maps**: Mapbox GL JS
- **Places**: Google Places API
- **AI**: OpenAI GPT-4
- **Security**: Arcjet

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Convex account
- Clerk account
- OpenAI API key
- Mapbox access token
- Google Places API key
- Arcjet account

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Initialize Convex:**

```bash
npx convex dev
```

This will create a `convex.json` file and guide you through setup.

3. **Set up environment variables:**

Copy `.env.local.example` to `.env.local` and fill in your actual API keys:

```bash
cp .env.local.example .env.local
```

4. **Run the development server:**

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Convex (if not already running)
npx convex dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
ai-trip-planner/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public landing pages
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Protected app pages
│   └── api/                # API routes
├── components/             # React components
│   ├── layout/            # Navigation components
│   ├── trips/             # Trip-related components
│   ├── maps/              # Map components
│   └── ui/                # UI primitives
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── trips.ts           # Trip queries/mutations
│   ├── itinerary.ts       # Itinerary queries/mutations
│   ├── ai.ts              # AI itinerary generation
│   └── places.ts          # Google Places integration
└── lib/                   # Utility functions
```

## Environment Variables

See `.env.local.example` for all required environment variables.

## Development

- `npm run dev` - Start Next.js dev server
- `npx convex dev` - Start Convex dev server
- `npm run build` - Build for production
- `npm run start` - Start production server

## License

MIT Created by Sahan viranga

