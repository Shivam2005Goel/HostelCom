"use client";

import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Building, CreditCard, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Student Profile
        </h2>
        <p className="text-slate-400 mt-1">Manage your records and personal details.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
      >
        <div className="w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0 relative">
          <User className="w-16 h-16 text-indigo-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#030712] flex items-center justify-center" title="Active Status">
            <Shield className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-bold text-slate-100 mb-2">Alex Doe</h3>
          <div className="flex justify-center md:justify-start gap-4 text-sm font-medium">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">Registration: STD-2024-8921</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">Citizenship: 98/100</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 space-y-6"
        >
          <h4 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
            <User className="w-5 h-5 text-indigo-400" />
            Personal Details
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Email Address</p>
                <p className="text-slate-200">alex.doe@example.com</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Phone Number</p>
                <p className="text-slate-200">+1 (555) 019-2831</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
              <Phone className="w-5 h-5 text-rose-400" />
              <div>
                <p className="text-xs text-slate-500">Emergency Contact</p>
                <p className="text-slate-200">+1 (555) 018-9922 (Father)</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Home Address</p>
                <p className="text-slate-200">123 Maple Street, Dreamville, CA 90210</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6"
          >
            <h4 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
              <Building className="w-5 h-5 text-cyan-400" />
              Allocation Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-xs text-cyan-400 font-medium mb-1">Current Block</p>
                <p className="text-xl font-bold text-slate-200">Block A</p>
              </div>
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-xs text-indigo-400 font-medium mb-1">Room Number</p>
                <p className="text-xl font-bold text-slate-200">304 (2-Seater)</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6"
          >
            <h4 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Fee Overview
            </h4>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-sm font-medium text-slate-200">Fall Semester 2026</p>
                <p className="text-xs text-emerald-400 mt-1">Status: Paid in Full</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/10">
                View Receipt
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
