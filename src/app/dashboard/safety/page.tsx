"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Video, Eye, EyeOff, AlertTriangle, AlertOctagon } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-indigo-400">
          Safety & Monitoring
        </h2>
        <p className="text-slate-400 mt-1">Real-time alerts and anonymous reporting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 flex flex-col justify-center items-center text-center border-rose-500/20 hover:border-rose-500/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors"></div>
          <button className="relative z-10 w-32 h-32 rounded-full bg-rose-500/20 border-4 border-rose-500/50 flex flex-col items-center justify-center gap-2 text-rose-400 hover:scale-105 hover:bg-rose-500/30 transition-all shadow-[0_0_40px_rgba(244,63,94,0.3)]">
            <AlertOctagon className="w-12 h-12" />
            <span className="font-bold tracking-widest">SOS</span>
          </button>
          <p className="mt-6 text-slate-300 relative z-10">Press to notify warden and security immediately.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <EyeOff className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold">Anonymous Reporting</h3>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Issue Category</label>
              <select className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-indigo-500">
                <option>Bullying / Harassment</option>
                <option>Substance Abuse</option>
                <option>Rule Violation</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Description</label>
              <textarea 
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-indigo-500 h-24 resize-none"
                placeholder="Describe the situation safely & anonymously..."
              ></textarea>
            </div>
            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium text-white transition-colors">
              Submit Report
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" /> Current Safety Advisories
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-400">Extreme Weather Warning</h4>
              <p className="text-sm text-slate-300 mt-1">Heavy rainfall expected. All outings after 8:00 PM are suspended until further notice.</p>
              <p className="text-xs text-amber-400/60 mt-2">Issued by Admin • 3 hours ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
