"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { 
  ShieldAlert, User, ShieldCheck, MapPin, 
  Camera, Activity, Brain, Globe, Lock, Cpu, Database, ChevronRight, ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, MouseEvent } from "react";

// --- Mouse Spotlight Card Component ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

// --- Text Reveal Animation ---
const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" }
          }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const { setRole } = useRoleStore();
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const handleLogin = (role: "student" | "admin") => {
    setRole(role);
    router.push("/dashboard");
  };

  return (
    <div className="bg-[#020205] min-h-screen text-slate-200 selection:bg-cyan-500/30 overflow-hidden font-sans">
      
      {/* -------------------- NAVIGATION BAR -------------------- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-2xl border border-white/10 bg-black/50 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 rounded-full animate-pulse" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center border border-white/20">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-black tracking-widest text-white">
              HOSTEL<span className="text-cyan-400">COM</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <a href="#features" className="hover:text-cyan-400 transition-colors">OS Features</a>
            <a href="#systems" className="hover:text-cyan-400 transition-colors">AI Systems</a>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={() => handleLogin('student')}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
            >
              Resident
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="relative px-5 py-1.5 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-widest overflow-hidden group"
            >
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 group-hover:text-black">Admin App</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* -------------------- HERO SECTION -------------------- */}
      <motion.main 
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="relative pt-40 pb-20 md:pt-56 md:pb-40 flex flex-col items-center justify-center min-h-screen"
      >
        {/* Dynamic Space Background */}
        <div className="absolute inset-x-0 -top-[20%] h-[120vh] w-[150vw] left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%_,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
            <span className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase tracking-[0.2em]">Next-Gen Operations System v3.0</span>
          </motion.div>
          
          <div className="relative mb-8">
            <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl rounded-full opacity-50" />
            <motion.h1 
              initial={{ filter: "blur(20px)", opacity: 0, y: 50 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white"
            >
              HOSTEL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-sm">
                INTELLIGENCE
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            A fully autonomous ecosystem. Eliminate manual registers with military-grade geofencing and zero-shot facial behavior analysis.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <button 
              onClick={() => handleLogin('admin')}
              className="group relative px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Initialize Admin
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => handleLogin('student')}
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20 w-full sm:w-auto"
            >
              Resident Portal
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </motion.main>

      {/* -------------------- STATS TEASER -------------------- */}
      <section className="relative z-20 border-y border-white/5 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-8">
           {[
             { label: "Hardware Scans", val: "1.2M+" },
             { label: "Uptime guarantee", val: "99.9%" },
             { label: "Response latency", val: "<10ms" },
             { label: "Physical infrastructure", val: "Zero" },
           ].map((stat, i) => (
             <div key={i} className="flex flex-col gap-1">
               <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">{stat.val}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
             </div>
           ))}
        </div>
      </section>

      {/* -------------------- FEATURE BENTO GRID -------------------- */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <TextReveal 
               text="UNPRECEDENTED POWER IN A UNIFIED PLATFORM." 
               className="text-4xl md:text-5xl font-black text-white justify-center tracking-tighter leading-tight" 
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-slate-400 text-lg md:text-xl font-medium"
            >
              Every module is seamlessly integrated to form an omniscient, privacy-centric oversight web for your facility.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
             
             {/* Large Card: Geo Fence */}
             <SpotlightCard className="md:col-span-3 md:row-span-2 p-10 flex flex-col justify-end group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-cyan-500/20 to-transparent blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-10 pointer-events-none" />
                
                <div className="relative z-10 w-full md:w-2/3">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <MapPin className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">SATELLITE GEOFENCING</h4>
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    Continuous HTML5 Geolocation binding integrated with the Haversine formula calculates precise distance metrics to establish absolute digital boundaries.
                  </p>
                  <button className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                    Explore Tracker <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
             </SpotlightCard>

             {/* Small Card: MediaPipe */}
             <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between group">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Camera className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tighter mb-2">Google MediaPipe</h4>
                  <p className="text-slate-400 text-sm font-medium">Browser-native, zero-latency computer vision for distress modeling.</p>
                </div>
             </SpotlightCard>

             {/* Small Card: Wellness Database */}
             <SpotlightCard className="md:col-span-1 md:row-span-1 p-8 flex flex-col justify-between group">
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Brain className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tighter mb-2">Anonymous Wellness</h4>
                  <p className="text-slate-400 text-sm font-medium">Encrypted pipelines for psychological support and peer reporting.</p>
                </div>
             </SpotlightCard>

             {/* Medium Card: Analytics */}
             <SpotlightCard className="md:col-span-2 md:row-span-1 p-8 flex items-center justify-between group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 w-2/3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Database className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tighter mb-2">Immutable Metrics</h4>
                  <p className="text-slate-400 text-sm font-medium">Every action logged automatically via Zustand telemetry.</p>
                </div>
                <div className="relative z-0 opacity-20 group-hover:opacity-50 transition-opacity translate-x-1/4 group-hover:translate-x-0 duration-500 ease-out">
                  <Activity className="w-48 h-48 text-blue-500" />
                </div>
             </SpotlightCard>
             
             {/* Medium Card: Security */}
             <SpotlightCard className="md:col-span-2 md:row-span-1 p-8 flex items-center justify-between group">
                <div className="relative z-10 w-2/3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-md text-white">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tighter mb-2">Absolute Security</h4>
                  <p className="text-slate-400 text-sm font-medium">Role-based architecture ensures critical admin isolation.</p>
                </div>
                <div className="relative z-0 opacity-20 group-hover:opacity-50 transition-opacity">
                  <ShieldCheck className="w-32 h-32 text-white" />
                </div>
             </SpotlightCard>
             
          </div>
        </div>
      </section>

      {/* -------------------- FINAL CALL TO ACTION -------------------- */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] sm:w-[600px] sm:h-[600px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8"
          >
            READY TO UPRGRADE?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => handleLogin('admin')}
              className="px-10 py-5 rounded-2xl bg-white text-black text-sm md:text-base font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)] w-full sm:w-auto"
            >
              Enter Admin Portal
            </button>
          </motion.div>
        </div>
      </section>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="border-t border-white/10 bg-[#020205] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-bold tracking-widest uppercase text-slate-500">HostelCom 2026</span>
          </div>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
            A Next-Gen Solve-A-Thon Initiative
          </p>
        </div>
      </footer>

    </div>
  );
}
