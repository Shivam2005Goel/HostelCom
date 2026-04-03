"use client";

import { motion } from "framer-motion";
import { Wrench, Plus, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";

export default function MaintenancePage() {
  const requests = [
    { id: "MNT-2091", title: "AC Not Cooling", area: "Room 304", status: "In Progress", urgency: "High", date: "Today, 10:00 AM", color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: "MNT-2088", title: "Broken Desk Chair", area: "Room 304", status: "Resolved", urgency: "Low", date: "Oct 20, 2026", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "MNT-2075", title: "Leaking Tap", area: "Washroom A", status: "Resolved", urgency: "Medium", date: "Oct 15, 2026", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Maintenance
          </h2>
          <p className="text-slate-400 mt-1">Track and report facility issues.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-slate-400">Active Requests</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-slate-400">Resolved total</div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-indigo-500/10">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">Good</div>
            <div className="text-sm text-slate-400">Feedback Score</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((req, i) => (
          <motion.div 
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:border-white/10 transition-colors cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-lg font-semibold text-slate-200">{req.title}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${req.urgency === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-slate-300'}`}>
                  {req.urgency}
                </span>
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <span>{req.id}</span>
                <span>•</span>
                <span>{req.area}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-300">{req.date}</div>
                <div className="text-xs text-slate-500">Submitted</div>
              </div>
              <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${req.bg} ${req.color} border border-current`}>
                {req.status === 'Resolved' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                <span className="font-semibold">{req.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
