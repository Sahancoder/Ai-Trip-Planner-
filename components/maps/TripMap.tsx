'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

type Marker = { lat: number; lng: number; title?: string };

export default function TripMap({ markers }: { markers: Marker[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || !mapboxgl.accessToken) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: markers[0] ? [markers[0].lng, markers[0].lat] : [0, 0],
      zoom: markers[0] ? 11 : 1,
    });

    mapRef.current = map;

    // Add markers
    markers.forEach((m) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([m.lng, m.lat])
        .setPopup(new mapboxgl.Popup().setText(m.title ?? 'Stop'))
        .addTo(map);
      markersRef.current.push(marker);
    });

    // Fit bounds if multiple markers
    if (markers.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((m) => bounds.extend([m.lng, m.lat]));
      map.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
    };
  }, [markers]);

  if (!mapboxgl.accessToken) {
    return (
      <div className="h-80 w-full rounded-xl bg-slate-800 flex items-center justify-center">
        <p className="text-slate-400">Mapbox token not configured</p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-80 w-full rounded-xl" />;
}

