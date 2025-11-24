# Quick Start Guide

## ✅ Already Configured

Your `.env.local` file has been created with:
- ✅ **Arcjet Key**: Configured
- ✅ **OpenAI API Key**: Configured
- ✅ **Convex Referral**: https://convex.dev/referral/SAHANV1051

## 🔧 Still Need to Configure

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Convex
```bash
npx convex dev
```
This will:
- Create your Convex account (use the referral link above)
- Generate your `NEXT_PUBLIC_CONVEX_URL`
- Update your `.env.local` automatically

### 3. Get Clerk Keys
1. Go to [clerk.com](https://clerk.com) and sign up/login
2. Create a new application
3. Copy your publishable key and secret key
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   ```

### 4. Get Mapbox Token (Optional - for maps)
1. Go to [mapbox.com](https://mapbox.com) and sign up
2. Get your access token from the account page
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
   ```

### 5. Get Google Places API Key (Optional - for place search)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Places API"
3. Create an API key
4. Update `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=AIza...
   ```

## 🚀 Start Development

Once you have at least Clerk configured:

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Convex (if not already running)
npx convex dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📝 Notes

- **Minimum required**: Clerk keys (for authentication)
- **For AI features**: OpenAI key is already set ✅
- **For maps**: Mapbox token (optional)
- **For place search**: Google Places API key (optional)

You can start building and testing the app with just Clerk + Convex + OpenAI!

