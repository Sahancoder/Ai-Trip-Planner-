import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import TripList from '@/components/trips/TripList';

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your trips</h1>
          <p className="text-sm text-slate-400">
            Plan journeys with AI, Google Places & Mapbox.
          </p>
        </div>
      </header>

      <TripList />
    </main>
  );
}

