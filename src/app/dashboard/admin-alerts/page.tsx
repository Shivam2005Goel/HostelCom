"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info, ShieldAlert, Clock } from "lucide-react";

const alerts = [
  { id: 1, type: "urgent", icon: AlertTriangle, title: "Curfew Breach — Neha Gupta", body: "Student has been off-campus for 7+ hours without extension.", time: "Just now", color: "red" },
  { id: 2, type: "warning", icon: ShieldAlert, title: "Late Entry — Rahul Dev", body: "Returned 45 mins past curfew. Penalty review required.", time: "18 min ago", color: "orange" },
  { id: 3, type: "info", icon: Info, title: "Leave Approval Pending", body: "Amit Singh requested weekend leave. Review by 6 PM.", time: "1 hr ago", color: "blue" },
  { id: 4, type: "success", icon: CheckCircle, title: "Maintenance Resolved", body: "Plumbing issue in Block B Washroom 2 has been fixed.", time: "2 hrs ago", color: "green" },
  { id: 5, type: "info", icon: Bell, title: "Package Arrival", body: "Amazon delivery for Room 304A is at the reception.", time: "3 hrs ago", color: "slate" },
  { id: 6, type: "success", icon: CheckCircle, title: "SOS Resolved", body: "Emergency alert from Room 102 resolved — false alarm.", time: "5 hrs ago", color: "green" },
];

const colorMap: Record<string, string> = {
  red: "border-red-500/30 bg-red-500/5 text-red-500",
  orange: "border-orange-500/30 bg-orange-500/5 text-orange-500",
  blue: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  green: "border-green-500/30 bg-green-500/5 text-green-500",
  slate: "border-white/10 bg-white/5 text-slate-400",
};

export default function AdminAlertsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">Live Feed</span>
        </div>
        <h2 className="text-4xl font-heading font-bold text-white tracking-tight">Notifications</h2>
        <p className="text-slate-400 mt-1">All system alerts, breaches and pending actions.</p>
      </motion.div>

      {/* Unread count */}
      <div className="flex items-center gap-4">
        <div className="glass-card px-5 py-3 flex items-center gap-3">
          <Bell className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">6 Notifications</span>
          <span className="px-2 py-0.5 rounded-full bg-red-500 text-black text-xs font-bold">3 new</span>
        </div>
        <button className="text-xs font-semibold text-slate-500 hover:text-white transition-colors">
          Mark all read
        </button>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`glass-card p-5 flex items-start gap-4 border ${colorMap[alert.color]}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[alert.color]}`}>
              <alert.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-white">{alert.title}</h4>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-1">{alert.body}</p>
            </div>
            {i < 3 && (
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
