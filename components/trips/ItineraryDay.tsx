'use client';

interface ItineraryItem {
  _id: string;
  day: number;
  time: string;
  title: string;
  description: string;
  location?: string;
  duration?: string;
}

export default function ItineraryDay({
  day,
  items,
}: {
  day: number;
  items: ItineraryItem[];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <h3 className="text-lg font-semibold mb-4">Day {day}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="border-l-2 border-blue-600 pl-4">
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-medium text-blue-400">
                {item.time}
              </span>
              {item.duration && (
                <span className="text-xs text-slate-500">
                  {item.duration}
                </span>
              )}
            </div>
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-sm text-slate-300 mb-1">{item.description}</p>
            {item.location && (
              <p className="text-xs text-slate-500">{item.location}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

