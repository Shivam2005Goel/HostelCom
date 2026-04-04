"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Award, AlertTriangle, ArrowRight, Ticket, PackageCheck, Utensils, ShoppingBag, ShieldCheck } from "lucide-react";

export function StudentDashboard() {
  const score = useMotionValue(0);
  const roundedScore = useTransform(score, Math.round);

  useEffect(() => {
    const animation = animate(score, 98, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
    return animation.stop;
  }, [score]);

  return (
    <div className="space-y-8 font-sans pb-20 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-xs font-semibold text-green-500">Live Connection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Welcome back, Alex.
          </h2>
          <p className="text-slate-400 mt-2 font-medium">Your personal operations center.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
           <ShieldCheck className="w-4 h-4 text-slate-300" />
           <span className="text-sm font-semibold text-slate-300">Verified</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* SCORE */}
        <div className="glass-card md:col-span-4 p-8 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-heading font-bold mb-8 text-white">Trust Score</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4%" />
              <motion.circle 
                cx="50%" cy="50%" r="45%" fill="none" 
                stroke="#22c55e" strokeWidth="4%" 
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 * (1 - 0.98) }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span className="text-6xl font-heading font-bold text-white">
                {roundedScore}
              </motion.span>
              <span className="text-xs font-semibold text-green-500 mt-1">Tier 1</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/5 w-full text-left">
            <div className="flex items-center gap-2 text-slate-300">
               <Award className="w-5 h-5 text-green-500" />
               <p className="text-sm font-semibold">Top 5% of residents.</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="md:col-span-8 p-0 flex flex-col gap-6 border-none bg-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-full">
            
            <button className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-red-500/50 transition-all text-left flex flex-col items-start justify-between">
              <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 group-hover:bg-red-500 group-hover:text-black transition-colors">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="mt-8">
                <h4 className="font-heading font-bold text-white text-xl mb-1">SOS Alert</h4>
                <p className="text-sm text-slate-400">Emergency notify.</p>
              </div>
            </button>

            <button className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-white/30 transition-all text-left flex flex-col items-start justify-between">
              <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:bg-white group-hover:text-black transition-colors">
                <Ticket className="w-6 h-6" />
              </div>
              <div className="mt-8">
                <h4 className="font-heading font-bold text-white text-xl mb-1">Pass</h4>
                <p className="text-sm text-slate-400">Request leave.</p>
              </div>
            </button>

            <button className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-white/30 transition-all text-left flex flex-col items-start justify-between">
               <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="mt-8">
                <h4 className="font-heading font-bold text-white text-xl mb-1">Market</h4>
                <p className="text-sm text-slate-400">P2P trades.</p>
              </div>
            </button>

          </div>
        </div>

        {/* DINING */}
        <div className="glass-card md:col-span-7 p-8">
          <h3 className="text-lg font-heading font-bold text-white mb-6">Live Dining Feed</h3>
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <h4 className="font-heading font-bold text-white">Lunch Time</h4>
                     <p className="text-sm text-slate-400">Paneer Masala, Rice, Roti</p>
                   </div>
                </div>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black rounded-lg text-sm font-semibold transition-colors">
                  QR Code
                </button>
             </div>
          </div>
        </div>

        {/* PARCELS */}
        <div className="glass-card md:col-span-5 p-8">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-heading font-bold text-white">Logistics</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Amazon Prime</h4>
                  <p className="text-xs text-slate-400">Block A</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
