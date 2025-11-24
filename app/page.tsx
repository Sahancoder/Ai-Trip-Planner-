import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold">AI Trip Planner</h1>
        <p className="text-xl text-slate-400">
          Plan your perfect trips with AI, Google Places & Mapbox integration
        </p>
        <div className="flex gap-4 justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}

