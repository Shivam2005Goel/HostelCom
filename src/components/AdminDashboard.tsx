"use client";

import { motion } from "framer-motion";
import { Users, AlertCircle, Wrench, ShieldAlert, CheckCircle, Activity, Database, Radar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useOutingStore } from "@/store/useOutingStore";

export function AdminDashboard() {
  const { outings } = useOutingStore();
  const overdueOutings = outings.filter(o => o.status === "overdue");
  
  const stats = [
    { label: "Total Occupancy", value: "342/400", icon: Users },
    { label: "Anomalies", value: "12", icon: Radar },
    { label: "Nodes", value: "18", icon: Database },
    { label: "Leaves", value: "45", icon: ShieldAlert },
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
    <div className="space-y-8 font-sans pb-20 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-green-500">Root Access</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Command Center
          </h2>
        </div>
      </motion.div>

      {/* TOP STATS HUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="glass-card p-6 flex flex-col justify-between h-[180px]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECHARTS AREA CHART */}
        <div className="glass-card lg:col-span-8 p-8 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" /> Global Telemetry
            </h3>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-2 text-white"><div className="w-2 h-2 rounded-full bg-green-500"></div> On Base</span>
              <span className="flex items-center gap-2 text-slate-500"><div className="w-2 h-2 rounded-full bg-white/20"></div> Deployed</span>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.05}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="leave" stroke="#ffffff" strokeOpacity={0.2} strokeWidth={2} fillOpacity={1} fill="url(#colorLeave)" />
                <Area type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" activeDot={{ r: 6, fill: '#22c55e', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INCIDENT REPORT / ACTION LOG */}
        <div className="glass-card lg:col-span-4 p-8 flex flex-col h-full">
          <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/5 pb-4">
            Threat Log
          </h3>
          
          <div className="space-y-4 overflow-y-auto no-scrollbar">
            
            {overdueOutings.map(o => (
              <div key={o.id} className="group flex flex-col p-5 rounded-2xl bg-[#000] border border-orange-500/30 hover:border-orange-500/60 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-bold text-orange-500">Geo Breach</span>
                </div>
                <p className="text-sm text-slate-300">
                  <strong className="text-white">{o.studentName}</strong> out-of-bounds for &gt;6 hours.
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-black rounded-lg text-xs font-semibold transition-colors">Alert</button>
                  <button className="flex-1 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg text-xs font-semibold transition-colors">Dimiss</button>
                </div>
              </div>
            ))}

            <div className="group flex flex-col p-5 rounded-2xl bg-[#000] border border-red-500/30 hover:border-red-500/60 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs font-bold text-red-500">Biometric Fail</span>
              </div>
              <p className="text-sm text-slate-300">Rahul Dev attempted access via Block B.</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-black rounded-lg text-xs font-semibold transition-colors">Lockdown</button>
              </div>
            </div>

            <div className="group flex flex-col p-5 rounded-2xl bg-[#000] border border-white/10 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="w-5 h-5 text-slate-300" />
                <span className="text-xs font-bold text-slate-300">Leave Matrix</span>
              </div>
              <p className="text-sm text-slate-400">Amit Singh submitted coords.</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 hover:bg-white/5 text-white border border-white/10 rounded-lg text-xs font-semibold transition-colors">Review</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
