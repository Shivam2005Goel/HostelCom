"use client";

import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";
import { useEffect, MouseEvent } from "react";
import { Award, AlertTriangle, ArrowRight, Ticket, PackageCheck, Utensils, ShoppingBag, ShieldCheck } from "lucide-react";

// --- Custom Spotlight Component for the Dashboard ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] bg-[#050508] border border-white/5 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

export function StudentDashboard() {
  const score = useMotionValue(0);
  const roundedScore = useTransform(score, Math.round);

  useEffect(() => {
    const animation = animate(score, 98, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
    return animation.stop;
  }, [score]);

  return (
    <div className="space-y-8 font-sans pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">Live System Link</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tighter">
            Welcome back, Alex.
          </h2>
          <p className="text-slate-400 mt-2 font-medium">Your personal operations center is fully synced.</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
           <ShieldCheck className="w-5 h-5 text-emerald-400" />
           <span className="text-sm font-bold text-emerald-300">Campus Status: Verified</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GAMIFIED CITIZENSHIP SCORE */}
        <SpotlightCard className="lg:col-span-4 lg:row-span-2 p-8 flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <h3 className="text-xl font-bold mb-8 text-white tracking-widest uppercase text-[11px]">System Clearance</h3>
          
          <div className="relative w-56 h-56 flex items-center justify-center mb-8">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="6%" />
              <motion.circle 
                cx="50%" cy="50%" r="45%" fill="none" 
                stroke="url(#scoreGradient)" strokeWidth="6%" 
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 * (1 - 0.98) }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                strokeLinecap="round" 
                className="drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                {roundedScore}
              </motion.span>
              <span className="text-[10px] font-bold text-cyan-400 mt-2 tracking-[0.2em] uppercase">Alpha Tier</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 w-full text-left relative overflow-hidden group-hover:border-indigo-500/40 transition-colors">
            <div className="absolute -inset-x-10 top-0 h-[100px] bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Award className="w-6 h-6 text-indigo-400 relative z-10" />
            <p className="text-xs text-slate-300 relative z-10 font-medium leading-relaxed">
              You are in the <strong className="text-white drop-shadow-[0_0_5px_currentColor]">Top 5%</strong> of residents. Priority room selection unlocked.
            </p>
          </div>
        </SpotlightCard>

        {/* QUICK ACTIONS GRID */}
        <SpotlightCard className="lg:col-span-8 p-8 flex flex-col justify-center border-white/5">
          <h3 className="text-[11px] font-bold text-slate-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-700" /> Command Modules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            <button className="relative overflow-hidden group p-6 rounded-[1.5rem] bg-gradient-to-br from-[#1a0a0f] to-[#0d0305] border border-rose-500/20 hover:border-rose-500/50 transition-all text-left flex flex-col items-start gap-4">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="absolute -inset-10 bg-rose-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="p-4 bg-rose-500/10 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform relative z-10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              </div>
              <div className="relative z-10">
                <h4 className="font-black text-rose-200 text-lg mb-1 tracking-tight">SOS ALERT</h4>
                <p className="text-xs text-rose-500/80 font-medium">Notify campus security instantly.</p>
              </div>
            </button>

            <button className="group relative p-6 rounded-[1.5rem] bg-[#0a0a0f] hover:bg-[#0f0f15] border border-white/5 hover:border-indigo-500/30 transition-all text-left flex flex-col items-start gap-4 overflow-hidden">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Ticket className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-white text-lg mb-1 tracking-tight">Request Leave</h4>
                <p className="text-xs text-slate-500 font-medium">Geofenced outing passes.</p>
              </div>
            </button>

            <button className="group relative p-6 rounded-[1.5rem] bg-[#0a0a0f] hover:bg-[#0f0f15] border border-white/5 hover:border-cyan-500/30 transition-all text-left flex flex-col items-start gap-4 overflow-hidden">
               <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-white text-lg mb-1 tracking-tight">Marketplace</h4>
                <p className="text-xs text-slate-500 font-medium">P2P student trading hub.</p>
              </div>
            </button>
          </div>
        </SpotlightCard>

        {/* MESS MENU WIDGET */}
        <SpotlightCard className="lg:col-span-4 p-8 relative">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />
          <h3 className="text-[11px] font-bold text-slate-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-700" /> Live Dining feed
          </h3>
          <div className="p-6 rounded-[1.5rem] bg-[#0a0a0f] border border-emerald-500/10 hover:border-emerald-500/30 transition-colors relative z-10 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5 pointer-events-none mix-blend-screen" />
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                    <Utensils className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_currentColor]" />
                 </div>
                 <h4 className="font-black text-white uppercase tracking-wider">Lunch</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> LIVE
              </span>
            </div>
            <p className="text-slate-300 font-medium text-sm leading-relaxed mb-6 relative z-10 relative z-10 h-12">
              Paneer Butter Masala, Tandoori Roti, Jeera Rice, Dal Tadka
            </p>
            <button className="w-full py-4 bg-white hover:bg-slate-200 text-black rounded-xl text-xs font-black tracking-widest uppercase transition-colors relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Scan QR Token
            </button>
          </div>
        </SpotlightCard>

        {/* LOGISTICS WIDGET */}
        <SpotlightCard className="lg:col-span-4 p-8">
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="flex justify-between items-center mb-6 relative z-10">
             <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-slate-700" /> Logistics
            </h3>
            <button className="text-[10px] uppercase tracking-widest text-blue-400 font-bold hover:text-white transition-colors">History</button>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between p-4 rounded-[1.5rem] bg-[#0a0a0f] border border-blue-500/20 hover:border-blue-500/40 hover:bg-[#0f0f15] transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <PackageCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5 tracking-wide">Amazon Prime</h4>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Secure at Block A</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
            </div>
            
            <div className="flex items-center justify-center h-16 p-4 rounded-[1.5rem] border border-dashed border-white/10 bg-white/5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600">No active parcels</p>
            </div>
          </div>
        </SpotlightCard>

      </div>
    </div>
  );
}
