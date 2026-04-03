"use client";

import { motion } from "framer-motion";
import { Utensils, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MessPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Occupancy-Aware Mess
        </h2>
        <p className="text-slate-400 mt-1">Smart dining based on hostel presence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-400" />
              Meal Token
            </h3>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-white/5 rounded-2xl mb-6 shadow-inner">
            <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center mb-4">
              <div className="w-full h-full border-4 border-slate-900 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Mock QR Code Pattern */}
                <div className="absolute inset-2 grid grid-cols-5 grid-rows-5 gap-1 opacity-80">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`bg-slate-900 ${i % 2 === 0 || i % 3 === 0 ? 'rounded-sm' : 'opacity-0'}`}></div>
                  ))}
                  <div className="absolute top-0 left-0 w-8 h-8 border-4 border-slate-900"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-4 border-slate-900"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-4 border-slate-900"></div>
                </div>
              </div>
            </div>
            <div className="font-mono text-xl tracking-[0.25em] text-slate-300">A83-9Z2</div>
          </div>

          <p className="text-center text-sm text-slate-400">Show this QR code at the dining hall entrance to mark your meal.</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full"></div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Live Dining Hall Capacity
            </h3>
            
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-bold">145</span>
              <span className="text-slate-400 font-medium pb-1">/ 300 seats</span>
            </div>
            
            <div className="w-full bg-slate-800 rounded-full h-3 mb-4 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-3 rounded-full" style={{ width: '48%' }}></div>
            </div>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Optimal time to visit
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
             <h3 className="text-xl font-semibold mb-4">Today's Menu</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-200">Breakfast</h4>
                    <p className="text-xs text-slate-400">07:30 AM - 09:30 AM</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.1)] relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-lg"></div>
                  <div>
                    <h4 className="font-bold text-indigo-100 flex items-center gap-2">
                      Lunch <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] uppercase rounded-full tracking-wider font-bold">Now</span>
                    </h4>
                    <p className="text-xs text-indigo-300 mt-0.5">Paneer Butter Masala, Roti, Rice, Dal</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg opacity-60">
                  <div>
                    <h4 className="font-medium text-slate-200">Dinner</h4>
                    <p className="text-xs text-slate-400">07:30 PM - 09:30 PM</p>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
