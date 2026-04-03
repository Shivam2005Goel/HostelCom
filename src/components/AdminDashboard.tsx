"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Users, AlertCircle, Wrench, ShieldAlert, CheckCircle, Activity, Box, Database, Radar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useOutingStore } from "@/store/useOutingStore";
import { MouseEvent } from "react";

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
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      {children}
    </div>
  );
}

export function AdminDashboard() {
  const { outings } = useOutingStore();
  const overdueOutings = outings.filter(o => o.status === "overdue");
  
  const stats = [
    { label: "Total Occupancy", value: "342/400", icon: Users, color: "text-indigo-400", bg: "from-indigo-500/20 to-indigo-900/10", border: "border-indigo-500/20" },
    { label: "Security Anomalies", value: "12", icon: Radar, color: "text-rose-400", bg: "from-rose-500/20 to-rose-900/10", border: "border-rose-500/20" },
    { label: "Hardware Nodes", value: "18", icon: CpuIcon, color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-900/10", border: "border-cyan-500/20" },
    { label: "Active Geo-Leaves", value: "45", icon: ShieldAlert, color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-900/10", border: "border-emerald-500/20" },
  ];

  const attendanceData = [
    { day: "Mon", present: 320, leave: 80 },
    { day: "Tue", present: 342, leave: 58 },
    { day: "Wed", present: 350, leave: 50 },
    { day: "Thu", present: 345, leave: 55 },
    { day: "Fri", present: 290, leave: 110 },
    { day: "Sat", present: 210, leave: 190 },
    { day: "Sun", present: 300, leave: 100 },
  ];

  return (
    <div className="space-y-8 font-sans pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">Omniscient Root Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-500 tracking-tighter">
            Command Center
          </h2>
          <p className="text-slate-400 mt-2 font-medium">Global oversight telemetry and live anomaly tracking.</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
           <Database className="w-5 h-5 text-indigo-400" />
           <span className="text-sm font-black uppercase text-indigo-300 tracking-widest">Network Synced</span>
        </div>
      </motion.div>

      {/* TOP STATS HUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <SpotlightCard key={stat.label} className="p-6 relative">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.bg} blur-2xl opacity-50 pointer-events-none`} />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${stat.border} bg-[#0a0a0f] relative z-10 shadow-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color} drop-shadow-[0_0_8px_currentColor]`} />
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-black text-white mb-1 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECHARTS AREA CHART */}
        <SpotlightCard className="lg:col-span-8 p-8 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-8 relative z-10 border-b border-indigo-500/20 pb-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-indigo-400">
              <Activity className="w-4 h-4" /> Global Presence Telemetry
            </h3>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-indigo-300"><div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_currentColor]"></div> On Base</span>
              <span className="flex items-center gap-2 text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-600"></div> Deployed/Leave</span>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickMargin={10} fontWeight="bold" />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickMargin={10} fontWeight="bold" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(5, 5, 8, 0.9)', borderColor: 'rgba(99,102,241,0.2)', borderRadius: '12px', padding: '12px' }}
                  itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="leave" stroke="#334155" strokeWidth={2} fillOpacity={1} fill="url(#colorLeave)" />
                <Area type="monotone" dataKey="present" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" activeDot={{ r: 6, fill: '#818cf8', strokeWidth: 0, stroke: 'none', style: { filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.8))' } }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        {/* INCIDENT REPORT / ACTION LOG */}
        <SpotlightCard className="lg:col-span-4 p-8 flex flex-col h-full border-rose-500/10">
          <div className="absolute right-0 top-0 w-full h-[200px] bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-rose-500 mb-8 relative z-10 border-b border-rose-500/20 pb-4">
            <AlertCircle className="w-4 h-4 animate-pulse" /> Threat / Action Log
          </h3>
          
          <div className="space-y-4 relative z-10 overflow-y-auto pr-2 no-scrollbar">
            
            {overdueOutings.map(o => (
              <div key={o.id} className="group flex flex-col p-5 rounded-[1.5rem] bg-[#0a0a0f] border border-orange-500/30 hover:border-orange-500/60 transition-colors shadow-[inset_0_0_20px_rgba(249,115,22,0.05),0_0_15px_rgba(249,115,22,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-400 drop-shadow-[0_0_5px_currentColor]" />
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Geo-Fence Breach</span>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-500/20 text-[9px] text-orange-500 font-black tracking-widest animate-pulse">URGENT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <strong className="text-white drop-shadow-sm">{o.studentName}</strong> is actively out-of-bounds for &gt;6 hours.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 py-2 bg-orange-500 hover:bg-orange-400 text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(249,115,22,0.3)]">Override</button>
                  <button className="flex-1 py-2 border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Acknowledge</button>
                </div>
              </div>
            ))}

            {/* Simulated Critical Incident Segment */}
            <div className="group flex flex-col p-5 rounded-[1.5rem] bg-[#0a0a0f] border border-rose-500/30 hover:border-rose-500/60 transition-colors shadow-[inset_0_0_20px_rgba(244,63,94,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Biometric Failure</span>
                <span className="ml-auto text-[9px] font-bold text-slate-500">T-02:00</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">Agent <strong className="text-white">Rahul Dev</strong> attempted entry via Block B. Unmatched vector array.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 py-2 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors border border-rose-500/30">Lockdown</button>
              </div>
            </div>

            {/* Standard Notice */}
            <div className="group flex flex-col p-5 rounded-[1.5rem] bg-[#0a0a0f] border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Leave Matrix</span>
                <span className="ml-auto text-[9px] font-bold text-slate-500">T-60:00</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Amit Singh submitted trajectory coords. Review required.</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Process</button>
                <button className="px-3 py-1.5 border border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
                  <CheckCircle className="w-4 h-4"/>
                </button>
              </div>
            </div>

          </div>
        </SpotlightCard>

      </div>
    </div>
  );
}

// Inline Icon Helper since lucide-react doesn't have "CpuIcon" directly
function CpuIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}
