"use client";

import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";

// Next.js dynamic import ensures Leaflet (and the `window` object) is strictly loaded on the client side only
const ClientLeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-3xl border border-slate-700 mx-auto">
      <Navigation className="w-8 h-8 text-cyan-500 animate-pulse mb-4" />
      <span className="text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">Initializing Map Engine...</span>
    </div>
  ),
});

export function LiveMap({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="w-full">
      <ClientLeafletMap isActive={isActive} />
    </div>
  );
}
