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

    // Load CartoDB Dark Matter tiles (Standard OLED requirement)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a> contributors',
      maxZoom: 20
    }).addTo(map);

    // Minimalist Neo-Green Marker
    const customIcon = L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="relative w-6 h-6 flex items-center justify-center">
          <div class="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-50"></div>
          <div class="relative w-3 h-3 bg-white rounded-full border-2 border-green-500"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });

    const studentMarker = L.marker([position.lat, position.lng], { icon: customIcon }).addTo(map)
        .bindPopup(`
          <div style="background: #000; padding: 4px; color: #fff; border-radius: 4px; font-family: 'Space Grotesk', sans-serif;">
             <strong style="color: #22c55e;">Loc.</strong><br />
             ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}
          </div>
        `);

    // Override Leaflet popup styles minimally
    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        background: #0A0A0A;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);

    // VITC GeoFence indicator (200m circle)
    L.circle([CAMPUS_LAT, CAMPUS_LNG], {
      color: '#22c55e',
      weight: 1,
      fillColor: '#22c55e',
      fillOpacity: 0.05,
      dashArray: '4, 8',
      radius: 200
    }).addTo(map);

    // Start watching position
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        
        studentMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    // Cleanup: destroy map and stop watching
    return () => {
      navigator.geolocation.clearWatch(watchId);
      document.head.removeChild(style);
      map.remove();
    };
  }, [isActive]); 

  if (!isActive) return null;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-2 shadow-2xl flex flex-col h-[500px]">
      {/* HUD Info Panel */}
      <div className="absolute top-6 left-6 z-[400] pointer-events-none">
        <div className="bg-[#000]/80 backdrop-blur-xl text-green-500 px-4 py-2 rounded-xl border border-white/10 flex flex-col gap-1 shadow-lg">
           <span className="text-xs font-heading font-bold text-white">Live Tracking</span>
           <span className="text-[10px] font-medium text-slate-400">Precision: High</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-[400] flex items-center gap-2 bg-[#000]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur pointer-events-none text-[10px] font-sans text-slate-400">
         GEO: {position.lat.toFixed(3)}, {position.lng.toFixed(3)}
      </div>

      {/* Map Target Div defined here */}
      <div ref={mapRef} id="map" className="w-full h-full rounded-2xl z-0 overflow-hidden relative">
      </div>
    </div>
  );
}
