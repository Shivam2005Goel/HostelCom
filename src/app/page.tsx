"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { 
  ShieldAlert, User, ShieldCheck, MapPin, 
  Camera, Activity, Brain, Database, ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FloatingLines from "@/components/FloatingLines";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { setRole } = useRoleStore();
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleLogin = (role: "student" | "admin") => {
    setRole(role);
    router.push("/dashboard");
  };

  return (
    <div className="bg-black min-h-screen text-slate-100 overflow-hidden font-sans">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-heading font-bold tracking-tight text-white">
              HostelCom<span className="text-green-500">.</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
            <a href="#security" className="hover:text-green-400 transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={() => handleLogin('student')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Resident Login
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-400 text-black text-sm font-semibold transition-all transform hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.4)]"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <motion.main 
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative pt-40 pb-20 md:pt-56 md:pb-32 flex flex-col items-center justify-center min-h-[90vh]"
      >
        <div className="absolute inset-0 pointer-events-auto">
          <FloatingLines 
            enabledWaves={["top", "bottom"]}
            lineCount={4}
            lineDistance={6}
            bendRadius={4}
            bendStrength={-0.4}
            interactive={true}
            parallax={true}
            linesGradient={['#000000', '#22C55E', '#16A34A', '#000000']}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 mb-8 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">UI UX Pro Max Standards Applied</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] font-heading font-bold tracking-tighter leading-[1.05] text-white mb-6"
          >
            The Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Hostel Interface.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-regular"
          >
            Replace manual registers and physical hardware with precision geo-fencing, zero-shot computer vision, and real-time state management.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => handleLogin('admin')}
              className="px-8 py-4 rounded-xl bg-green-500 text-black font-semibold transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Start Deployment
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleLogin('student')}
              className="px-8 py-4 rounded-xl bg-[#111] border border-white/10 text-white font-medium hover:bg-[#1a1a1a] transition-all w-full sm:w-auto"
            >
              Resident Access
            </button>
          </motion.div>
        </div>
      </motion.main>

      {/* METRICS */}
      <section className="border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-8">
           {[
             { label: "Active Nodes", val: "4,208" },
             { label: "Uptime", val: "99.99%" },
             { label: "Latency", val: "12ms" },
             { label: "Integrations", val: "MediaPipe" },
           ].map((stat, i) => (
             <FadeIn key={i} delay={i * 0.1}>
               <div className="flex flex-col gap-1">
                 <span className="text-4xl font-heading font-bold text-white">{stat.val}</span>
                 <span className="text-sm font-medium text-slate-500">{stat.label}</span>
               </div>
             </FadeIn>
           ))}
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="features" className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Designed for absolute <span className="text-slate-500">control.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              A unified platform ensuring zero friction for students and omniscient visibility for admins.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Card 1 */}
             <FadeIn delay={0.1} className="md:col-span-2">
               <div className="glass-card h-[400px] p-10 flex flex-col justify-end relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[80px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 w-full md:w-3/4">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-3">Live Geo-Fencing</h3>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Continuous coordinate mapping ensures students are bounded within campus limits. Curfews are automatically calculated without physical ledgers.
                    </p>
                  </div>
               </div>
             </FadeIn>

             {/* Card 2 */}
             <FadeIn delay={0.2}>
               <div className="glass-card h-[400px] p-8 flex flex-col relative overflow-hidden group">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">Vision AI</h3>
                  <p className="text-slate-400 text-sm">
                    Google MediaPipe integration for zero-latency facial analysis. Detect anomalies and distress markers instantly.
                  </p>
               </div>
             </FadeIn>

             {/* Card 3 */}
             <FadeIn delay={0.3}>
               <div className="glass-card h-[300px] p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">Wellness Hub</h3>
                    <p className="text-slate-400 text-sm">Secure channels for psychological support and peer reporting.</p>
                  </div>
               </div>
             </FadeIn>

             {/* Card 4 */}
             <FadeIn delay={0.4} className="md:col-span-2">
               <div className="glass-card h-[300px] p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Database className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white mb-3">Immutable Audit Logs</h3>
                      <p className="text-slate-400 text-base max-w-md">
                        Every gate movement, package scan, and automated curfew alert is securely locked in our high-availability state modules.
                      </p>
                    </div>
                  </div>
               </div>
             </FadeIn>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#000] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-slate-500" />
            <span className="text-lg font-heading font-bold text-slate-400 tracking-tight">HostelCom.</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Designed adhering strictly to UI UX Pro Max standards.
          </p>
        </div>
      </footer>

    </div>
  );
}
