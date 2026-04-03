"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { ShieldAlert, User, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const { setRole } = useRoleStore();
  const router = useRouter();

  const handleLogin = (role: "student" | "admin") => {
    setRole(role);
    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-4xl w-full p-8 md:p-12 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-32 -mr-16 -mt-16 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 p-32 -ml-16 -mb-16 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
            <ShieldAlert className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient pr-1">
            Smart Hostel System
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            AI-powered, occupancy-aware platform tailored for SOLVE-A-THON 2026. 
            Experience transparent management and proactive resident services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          <button 
            onClick={() => handleLogin("student")}
            className="group relative p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all text-left flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-slate-200">Resident Portal</h3>
              <p className="text-sm text-slate-400">
                Check attendance, request leaves, report maintenance, and track your mess quota.
              </p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin("admin")}
            className="group relative p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all text-left flex items-start gap-4"
          >
            <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-slate-200">Admin Dashboard</h3>
              <p className="text-sm text-slate-400">
                Monitor student safety, approve requests, and oversee facility analytics seamlessly.
              </p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
