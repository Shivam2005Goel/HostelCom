"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Vandalur VITC Coordinates
const CAMPUS_LAT = 12.8406;
const CAMPUS_LNG = 80.1534;

export default function LeafletMap({ isActive }: { isActive: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ lat: CAMPUS_LAT, lng: CAMPUS_LNG });

  useEffect(() => {
    if (!mapRef.current || !isActive) return;

    // Initialize Map with custom coordinates based on user snippet
    const map = L.map(mapRef.current).setView([position.lat, position.lng], 16);

    // Load OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Override Leaflet's default icon URLs because Next.js webpack breaks local image imports inside node_modules sometimes
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const studentMarker = L.marker([position.lat, position.lng], { icon: customIcon }).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();

    // VITC GeoFence indicator (200m circle)
    L.circle([CAMPUS_LAT, CAMPUS_LNG], {
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.1,
      radius: 200
    }).addTo(map).bindPopup('VITC Geo-fence bounds (200m)');

    // Start watching position
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        
        // Update marker and map view on position change
        studentMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    // Cleanup: destroy map and stop watching
    return () => {
      navigator.geolocation.clearWatch(watchId);
      map.remove();
    };
  }, [isActive]); // Only re-run if isActive changes to strictly manage single map instance

  if (!isActive) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-700/50 p-1 shadow-xl flex flex-col h-[400px]">
      <div className="absolute top-4 right-4 z-[400] bg-slate-900/80 backdrop-blur text-white px-3 py-1.5 rounded-lg border border-slate-700 shadow flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live OSM Feed
      </div>
      {/* Map Target Div defined here */}
      <div ref={mapRef} id="map" className="w-full h-full rounded-2xl z-0" />
    </div>
  );
}
