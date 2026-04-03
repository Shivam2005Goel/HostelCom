"use client";

import { motion } from "framer-motion";
import { Dumbbell, Users, Activity, CheckCircle, Clock } from "lucide-react";

export default function GymPage() {
  const schedule = [
    { time: "06:00 AM - 08:00 AM", status: "Crowded", percentage: 90 },
    { time: "08:00 AM - 10:00 AM", status: "Moderate", percentage: 55 },
    { time: "10:00 AM - 04:00 PM", status: "Quiet", percentage: 15 },
    { time: "04:00 PM - 06:00 PM", status: "Moderate", percentage: 60 },
    { time: "06:00 PM - 09:00 PM", status: "Very Crowded", percentage: 95 },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400">
            Fitness Center
          </h2>
          <p className="text-slate-400 mt-1">Live gym capacity and schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 lg:col-span-2 relative overflow-hidden group"
        >
          {/* Animated Background Pulse */}
          <div className="absolute -inset-4 bg-gradient-to-br from-rose-500/5 to-orange-500/5 group-hover:from-rose-500/10 group-hover:to-orange-500/10 transition-colors blur-xl z-0"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" /> Live Status
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-12 justify-center py-6">
              <div className="relative w-48 h-48">
                {/* Circular Progress Ring Mock */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="url(#gradient)" strokeWidth="8" 
                    strokeDasharray="283" strokeDashoffset="120" 
                    strokeLinecap="round" 
                    className="drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400">18</span>
                  <span className="text-sm font-medium text-slate-400 mt-1">/ 30 Pax</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Equipment Available</h4>
                    <p className="text-sm text-slate-400">Treadmills, Weights open</p>
                  </div>
                </div>
                <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 flex items-center gap-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Filling Fast</h4>
                    <p className="text-sm text-slate-400">Expect peak in 30 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" /> Daily Forecast
          </h3>
          <div className="space-y-4">
            {schedule.map((slot, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{slot.time}</span>
                  <span className={slot.percentage > 80 ? 'text-rose-400 font-semibold' : slot.percentage > 40 ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                    {slot.status}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${slot.percentage > 80 ? 'bg-rose-500' : slot.percentage > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`} 
                    style={{ width: `${slot.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-lg font-medium transition-colors">
            Book a Slot
          </button>
        </motion.div>
      </div>
    </div>
  );
}
