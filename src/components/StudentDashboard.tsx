"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Award, AlertTriangle, ArrowRight, Ticket, PackageCheck, Utensils } from "lucide-react";

export function StudentDashboard() {
  const score = useMotionValue(0);
  const roundedScore = useTransform(score, Math.round);

  useEffect(() => {
    const animation = animate(score, 98, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [score]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Welcome back, Alex
          </h2>
          <p className="text-slate-400 mt-1">Here is your daily hostel overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gamified Citizenship Score */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 lg:row-span-2 flex flex-col justify-center items-center text-center relative overflow-hidden group border-indigo-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent"></div>
          <h3 className="text-xl font-semibold mb-6 text-slate-200">Citizenship Score</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8%" />
              <motion.circle 
                cx="50%" cy="50%" r="45%" fill="none" 
                stroke="url(#scoreGradient)" strokeWidth="8%" 
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 * (1 - 0.98) }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round" 
                className="drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                {roundedScore}
              </motion.span>
              <span className="text-sm font-medium text-slate-400 mt-1">Excellent</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 w-full text-left">
            <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-slate-300">You are in the <strong className="text-amber-400">Top 5%</strong> of residents. Priority room selection unlocked!</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col justify-center"
        >
          <h3 className="text-xl font-semibold mb-6 border-b border-white/5 pb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="relative overflow-hidden group p-6 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-600/20 hover:from-rose-500/30 hover:to-red-600/30 border border-rose-500/30 transition-all text-left flex items-start gap-4">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="p-3 bg-rose-500/20 rounded-lg text-rose-400 group-hover:scale-110 transition-transform relative z-10">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-rose-300 text-lg mb-1 tracking-wide">SOS ALERT</h4>
                <p className="text-xs text-rose-400/80">Notify warden & security immediately</p>
              </div>
            </button>

            <button className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left flex items-start gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 text-lg mb-1">Request Leave</h4>
                <p className="text-xs text-slate-400">Outing or vacation permission</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Current Mess Menu */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" /> Dining Now
          </h3>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider text-sm">Lunch</h4>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse">LIVE</span>
            </div>
            <p className="text-sm text-slate-200 font-medium mb-3">Paneer Butter Masala, Roti, Rice, Dal Fry</p>
            <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-lg text-sm font-bold transition-colors">
              Show QR Token
            </button>
          </div>
        </motion.div>

        {/* Pending Packages */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-cyan-400" /> Parcels
            </h3>
            <button className="text-xs text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <PackageCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-200 text-sm">Amazon Delivery</h4>
                  <p className="text-xs text-slate-400">Ready at Block A</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex justify-center text-sm p-2 text-slate-500">
              No other pending packages
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
