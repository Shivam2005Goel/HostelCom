"use client";

import { useEffect, useState } from "react";
import { useOutingStore } from "@/store/useOutingStore";
import { MapPin, Navigation, MapPinOff, AlertTriangle, Clock, Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const CAMPUS_LAT = 12.8406;
const CAMPUS_LNG = 80.1534;
const GEOFENCE_RADIUS_METERS = 200;

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export function GeoFenceTracker({ studentId }: { studentId: string }) {
  const { outings, returnOuting, fastForward } = useOutingStore();
  const activeOuting = outings.find(o => o.studentId === studentId && (o.status === "out" || o.status === "overdue"));

  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [percentThrough, setPercentThrough] = useState(0);

  useEffect(() => {
    if (!activeOuting) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = now - activeOuting.exitTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setTimeElapsed(`${hours}h ${mins}m`);
      
      const maxMs = 6 * 60 * 60 * 1000;
      setPercentThrough(Math.min((diff / maxMs) * 100, 100));
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 60000);

    if (!navigator.geolocation) {
      setError("Location API not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const dist = getDistance(latitude, longitude, CAMPUS_LAT, CAMPUS_LNG);
        setDistance(Math.round(dist));
        setError(null);
        if (dist <= GEOFENCE_RADIUS_METERS) {
          returnOuting(activeOuting.id);
        }
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      clearInterval(timerInterval);
      navigator.geolocation.clearWatch(watchId);
    };
  }, [activeOuting, returnOuting]);

  if (!activeOuting) return null;

  const isOverdue = activeOuting.status === "overdue";
  const primaryColor = isOverdue ? "rose" : "indigo";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-900/40 border border-${primaryColor}-500/20 shadow-2xl`}
    >
      {/* Background gradients */}
      <div className={`absolute -top-32 -right-32 w-64 h-64 bg-${primaryColor}-500/20 rounded-full blur-[80px] pointer-events-none`} />
      <div className={`absolute -bottom-32 -left-32 w-64 h-64 bg-${isOverdue ? 'red' : 'cyan'}-500/10 rounded-full blur-[80px] pointer-events-none`} />
      
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${primaryColor}-500 to-transparent opacity-50`} />

      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-${primaryColor}-500/10 border border-${primaryColor}-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(var(--${primaryColor}-500-rgb),0.2)]`}>
              {isOverdue ? (
                <AlertTriangle className={`w-6 h-6 text-${primaryColor}-400 animate-pulse`} />
              ) : (
                <Activity className={`w-6 h-6 text-${primaryColor}-400 animate-pulse`} />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {isOverdue ? "Curfew Breach Detected" : "Active Outing Tracker"}
              </h3>
              <p className={`text-sm ${isOverdue ? 'text-rose-400' : 'text-slate-400'} mt-1 font-medium`}>
                ID: {activeOuting.id} &bull; Geo-Fence Active
              </p>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/50 border border-white/5 shadow-inner">
              <Clock className={`w-4 h-4 ${isOverdue ? 'text-rose-400' : 'text-indigo-400'}`} />
              <span className="font-mono text-xl font-bold text-white tracking-wider">{timeElapsed}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-widest">Elapsed Time</p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mb-8 relative">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Exit Logged</span>
            <span>6H Limit</span>
          </div>
          <div className="h-3 w-full bg-slate-950/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentThrough}%` }}
              className={`h-full bg-gradient-to-r ${isOverdue ? 'from-rose-600 to-rose-400' : 'from-indigo-600 to-cyan-400'} rounded-full relative`}
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20mix-blend-overlay"></div>
            </motion.div>
          </div>
        </div>

        {/* Distance Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-black/20 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              {error ? <MapPinOff className="w-5 h-5 text-amber-400" /> : <Navigation className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Distance</p>
              <h4 className="text-2xl font-black text-white mt-0.5">
                {error ? <span className="text-amber-400 text-lg">Signal Lost</span> : distance !== null ? `${distance} meters` : "Locating..."}
              </h4>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-black/20 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protection</p>
              <h4 className="text-sm font-semibold text-white mt-1">Auto Check-in Active</h4>
               <p className="text-xs text-slate-500 mt-0.5">At &lt; 200m range</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button 
            onClick={() => returnOuting(activeOuting.id)}
            className={`flex-1 relative group overflow-hidden py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 shadow-[0_0_20px_rgba(var(--${primaryColor}-500-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--${primaryColor}-500-rgb),0.5)] active:scale-95`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${isOverdue ? 'from-rose-600 to-red-500' : 'from-indigo-600 to-blue-500'}`}></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Manual Return Gate Scan
            </span>
          </button>

          <button 
            onClick={() => fastForward(activeOuting.id, 6.1)}
            className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-mono text-sm hover:bg-slate-800 transition-all active:scale-95 group"
            title="Developer Tool: Artificially age this outing by >6 hours to trigger Warden alert"
          >
            <Clock className="w-4 h-4 mb-1 mx-auto text-slate-500 group-hover:text-amber-400 transition-colors" />
            [DEV] +6 Hrs
          </button>
        </div>
      </div>
    </motion.div>
  );
}
