"use client";

import { motion } from "framer-motion";
import { Clock, CalendarCheck, CalendarX, TrendingUp } from "lucide-react";

export default function AttendancePage() {
  const dummyLogs = [
    { date: "Oct 24, 2026", in: "10:15 PM", status: "On Time", type: "in" },
    { date: "Oct 24, 2026", out: "08:30 AM", type: "out" },
    { date: "Oct 23, 2026", in: "11:45 PM", status: "Late", type: "in", penalty: "-2 pts" },
    { date: "Oct 23, 2026", out: "09:00 AM", type: "out" },
    { date: "Oct 22, 2026", in: "09:30 PM", status: "On Time", type: "in" },
    { date: "Oct 22, 2026", out: "07:45 AM", type: "out" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-4xl font-heading font-bold text-white tracking-tight">
          Attendance Tracker
        </h2>
        <p className="text-slate-400 mt-1">Monitor your check-ins and late entries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
            <CalendarCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-100">95%</div>
            <div className="text-sm text-slate-400 font-medium mt-1">This Month&apos;s Attendance</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex flex-col justify-between border-rose-500/10 hover:border-rose-500/30"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-100">1</div>
            <div className="text-sm text-slate-400 font-medium mt-1">Late Entries (Oct)</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-100">10:00 PM</div>
            <div className="text-sm text-slate-400 font-medium mt-1">Curfew Deadline</div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Access Logs</h3>
          <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/10">
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Activity</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dummyLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${log.type === 'in' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {log.type === 'in' ? 'Check-In' : 'Check-Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{log.in || log.out}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.status === "On Time" && <span className="text-emerald-400 text-sm flex items-center gap-1"><CalendarCheck className="w-4 h-4"/> On Time</span>}
                    {log.status === "Late" && <span className="text-rose-400 text-sm flex items-center gap-1"><CalendarX className="w-4 h-4"/> Late {log.penalty && <span className="ml-2 px-2 py-0.5 bg-rose-500/20 rounded-md text-xs">{log.penalty}</span>}</span>}
                    {!log.status && <span className="text-slate-500 text-sm">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
