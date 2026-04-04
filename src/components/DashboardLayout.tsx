"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Chatbot } from "./Chatbot";
import dynamic from "next/dynamic";

// SSR-safe FloatingLines
const FloatingLines = dynamic(() => import("./FloatingLines"), { ssr: false });

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-black relative">

      {/* FLOATING LINES GLOBAL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <FloatingLines
          enabledWaves={["middle"]}
          lineCount={3}
          lineDistance={8}
          bendRadius={3}
          bendStrength={-0.3}
          interactive={false}
          parallax={false}
          linesGradient={['#000000', '#14532d', '#22c55e', '#14532d', '#000000']}
          mixBlendMode="screen"
        />
      </div>
      {/* Fade the lines out at the very top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" style={{ zIndex: 1 }} />

      {/* SIDEBAR */}
      <div className="relative z-10">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 w-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
