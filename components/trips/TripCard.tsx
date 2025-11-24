'use client';

import Link from 'next/link';
import { Id } from '../../convex/_generated/dataModel';

interface Trip {
  _id: Id<'trips'>;
  title: string;
  startDate: string;
  endDate: string;
  destination?: string;
}

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/dashboard/trips/${trip._id}`}>
      <article className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:bg-slate-900/60 transition-colors cursor-pointer">
        <h2 className="text-lg font-semibold mb-2">{trip.title}</h2>
        {trip.destination && (
          <p className="text-sm text-slate-300 mb-2">{trip.destination}</p>
        )}
        <p className="text-xs text-slate-400">
          {trip.startDate} → {trip.endDate}
        </p>
      </article>
    </Link>
  );
}

