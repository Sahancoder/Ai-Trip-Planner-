'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import TripCard from './TripCard';
import Link from 'next/link';

export default function TripList() {
  const trips = useQuery(api.trips.listTrips) ?? [];

  return (
    <div>
      {trips.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <p className="text-slate-400 mb-4">No trips yet.</p>
          <Link
            href="/dashboard/trips/new"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Create Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

