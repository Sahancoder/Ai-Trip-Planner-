import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ItineraryList from '@/components/trips/ItineraryList';
import TripMap from '@/components/maps/TripMap';

export default async function TripDetailPage({
  params,
}: {
  params: { tripId: string };
}) {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');

  // TODO: Fetch trip data and itinerary items from Convex
  // For now, placeholder structure

  return (
    <main className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Trip Details</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">Itinerary</h2>
          <ItineraryList tripId={params.tripId} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Map</h2>
          <TripMap markers={[]} />
        </div>
      </div>
    </main>
  );
}

