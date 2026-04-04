"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, MapPin, ShieldCheck, Clock, ArrowRight } from "lucide-react";

const students = [
  { id: "2301", name: "Alex Doe", room: "304", block: "A", status: "On Campus", time: "Checked in 9:02 AM", score: 98 },
  { id: "2302", name: "Priya Sharma", room: "215", block: "B", status: "On Campus", time: "Checked in 8:45 AM", score: 95 },
  { id: "2303", name: "Rahul Dev", room: "102", block: "A", status: "On Leave", time: "Left at 3:00 PM", score: 72 },
  { id: "2304", name: "Amit Singh", room: "412", block: "C", status: "On Campus", time: "Checked in 10:15 AM", score: 88 },
  { id: "2305", name: "Neha Gupta", room: "306", block: "B", status: "Overdue", time: "Left 7 hrs ago", score: 61 },
  { id: "2306", name: "Karan Mehta", room: "501", block: "D", status: "On Campus", time: "Checked in 7:30 AM", score: 91 },
  { id: "2307", name: "Siya Patel", room: "103", block: "A", status: "On Campus", time: "Checked in 9:50 AM", score: 87 },
  { id: "2308", name: "Dev Anand", room: "220", block: "C", status: "On Leave", time: "Approved till 6 PM", score: 79 },
];

function statusColor(status: string) {
  if (status === "On Campus") return "text-green-500 bg-green-500/10 border-green-500/20";
  if (status === "On Leave") return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  if (status === "Overdue") return "text-red-500 bg-red-500/10 border-red-500/20";
  return "text-slate-400 bg-white/5 border-white/10";
}

export default function StudentsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <span className="text-xs font-semibold text-green-500 uppercase tracking-widest">Live Roster</span>
          </div>
          <h2 className="text-4xl font-heading font-bold text-white tracking-tight">All Students</h2>
          <p className="text-slate-400 mt-1">Real-time occupancy and leave tracking across all blocks.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-semibold transition-all">
            Export Roster <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "342", icon: Users },
          { label: "On Campus", value: "287", icon: ShieldCheck },
          { label: "On Approved Leave", value: "43", icon: Clock },
          { label: "Overdue", value: "12", icon: MapPin },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name, room, or block..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 transition-colors text-sm"
        />
      </div>

      {/* Student Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Student</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Room</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Activity</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Score</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{s.name}</div>
                        <div className="text-xs text-slate-500">ID: {s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">Block {s.block} · Room {s.room}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${statusColor(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400">{s.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white">{s.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-green-400 hover:text-green-300">
                      View →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
