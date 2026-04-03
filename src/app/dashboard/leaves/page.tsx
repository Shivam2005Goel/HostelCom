"use client";

import { motion } from "framer-motion";
import { Ticket, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

export default function LeavesPage() {
  const requests = [
    { id: "LR-9231", type: "Weekend Outing", dates: "Oct 28 - Oct 30", status: "Approved", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "LR-9012", type: "Medical Leave", dates: "Oct 15 - Oct 18", status: "Approved", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "LR-8845", type: "Night Out", dates: "Sep 22", status: "Rejected", icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Leaves & Permissions
          </h2>
          <p className="text-slate-400 mt-1">Request time away and track approval status.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5" />
          Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="glass-panel p-6">
            <h3 className="text-xl font-semibold mb-4 text-amber-400 flex items-center gap-2 border-b border-white/5 pb-4">
              <Clock className="w-5 h-5" /> Pending Requests
            </h3>
            
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50"></div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-slate-200">Diwali Vacation</h4>
                  <p className="text-xs text-slate-400 mt-1">ID: LR-9402</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-500/20 text-amber-400">Requires Warden Auth</span>
              </div>
              <p className="text-sm text-slate-300">Nov 5, 2026 - Nov 12, 2026</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-500">Submitted 2 days ago</span>
                <button className="text-xs text-amber-400 hover:text-amber-300 font-medium">Cancel Request</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-white/5 pb-4">
            <Ticket className="w-5 h-5 text-indigo-400" /> Past Requests
          </h3>
          
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className={`p-4 rounded-xl border ${req.bg.replace('/10', '/20')} ${req.bg} flex items-start gap-4`}>
                <req.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${req.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-200">{req.type}</h4>
                    <span className={`text-xs font-semibold ${req.color}`}>{req.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{req.dates}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
