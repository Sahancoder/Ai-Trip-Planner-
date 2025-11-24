'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import ItineraryDay from './ItineraryDay';

export default function ItineraryList({ tripId }: { tripId: string }) {
  const items = useQuery(api.itinerary.getItineraryItems, {
    tripId: tripId as Id<'trips'>,
  }) ?? [];

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
        <p className="text-slate-400 mb-4">No itinerary items yet.</p>
        <p className="text-sm text-slate-500">
          Generate an AI itinerary to get started!
        </p>
      </div>
    );
  }

  // Group items by day
  const itemsByDay = items.reduce(
    (acc: Record<number, typeof items>, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<number, typeof items>
  );

  const days = Object.keys(itemsByDay)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <ItineraryDay
          key={day}
          day={day}
          items={itemsByDay[day]}
        />
      ))}
    </div>
  );
}

