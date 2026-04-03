"use client";

import { motion } from "framer-motion";
import { Users, AlertCircle, Wrench, ShieldAlert, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useOutingStore } from "@/store/useOutingStore";

export function AdminDashboard() {
  const { outings } = useOutingStore();
  const overdueOutings = outings.filter(o => o.status === "overdue");
  
  const stats = [
    { label: "Total Occupancy", value: "342/400", icon: Users, color: "text-indigo-400", bg: "bg-indigo-400/20" },
    { label: "Late Entries Today", value: "12", icon: AlertCircle, color: "text-rose-400", bg: "bg-rose-400/20" },
    { label: "Pending Maintenance", value: "18", icon: Wrench, color: "text-amber-400", bg: "bg-amber-400/20" },
    { label: "Active Leaves", value: "45", icon: ShieldAlert, color: "text-emerald-400", bg: "bg-emerald-400/20" },
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Admin Overview
        </h2>
        <p className="text-slate-400 mt-1">Real-time metrics and dynamic action feeds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-white/5 hover:border-indigo-500/30"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Area Chart representing Recharts Integration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              7-Day Attendance Overview
            </h3>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Present</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-600"></div> On Leave</span>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="leave" stroke="#475569" fillOpacity={1} fill="url(#colorLeave)" />
                <Area type="monotone" dataKey="present" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Actionable Event Feed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Action Items Feed</h3>
          </div>
          <div className="space-y-4">
            {overdueOutings.map(o => (
              <div key={o.id} className="group flex flex-col p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-colors animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-orange-400 uppercase tracking-wide">6-Hour Curfew Overdue</span>
                  <span className="ml-auto text-xs text-orange-500 font-bold">URGENT</span>
                </div>
                <p className="text-sm text-slate-200">
                  <strong className="text-white">{o.studentName}</strong> has been off-campus for over 6 hours.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-600 text-slate-900 rounded text-xs font-bold transition-colors">Call Student</button>
                  <button className="flex-1 py-1.5 border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded text-xs font-bold transition-colors">Mark Reviewed</button>
                </div>
              </div>
            ))}

            {/* High Priority Event */}
            <div className="group flex flex-col p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-rose-400 uppercase tracking-wide">Late Curfew Breach</span>
                <span className="ml-auto text-xs text-slate-500">2 min ago</span>
              </div>
              <p className="text-sm text-slate-200">Rahul Dev (Room 102) entered 45 mins late.</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded text-xs font-medium transition-colors">Issue Penalty</button>
                <button className="flex-1 py-1.5 border border-white/10 hover:bg-white/10 rounded text-xs font-medium transition-colors">Dismiss</button>
              </div>
            </div>

            {/* Medium Priority Event */}
            <div className="group flex flex-col p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-amber-400 uppercase tracking-wide">Plumbing Issue</span>
                <span className="ml-auto text-xs text-slate-500">30 min ago</span>
              </div>
              <p className="text-sm text-slate-200">Major leak reported in Block B Washroom 2.</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1.5 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded text-xs font-medium transition-colors">Assign Staff</button>
              </div>
            </div>

            {/* Normal Priority Event */}
            <div className="group flex flex-col p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Leave Approval</span>
                <span className="ml-auto text-xs text-slate-500">1 hr ago</span>
              </div>
              <p className="text-sm text-slate-200">Amit Singh requested outing for Oct 25-27.</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1.5 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 rounded text-xs font-medium transition-colors">Review</button>
                <button className="px-3 py-1.5 border border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 rounded text-xs font-medium transition-colors"><CheckCircle className="w-4 h-4"/></button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
