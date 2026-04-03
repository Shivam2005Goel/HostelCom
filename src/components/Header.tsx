"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { Bell, LogOut, Menu, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const { role, logout } = useRoleStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 glass-panel border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-slate-400 hover:text-slate-200">
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          {role === "admin" ? "Admin Portal" : "Student Portal"}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-slate-400 hover:text-indigo-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-700 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium">{role === "admin" ? "Warden Smith" : "Alex Doe"}</div>
            <div className="text-xs text-slate-500">{role === "admin" ? "Block A Admin" : "Room 304"}</div>
          </div>
          <UserCircle className="w-8 h-8 text-indigo-300" />
        </div>
        
        <button 
          onClick={handleLogout}
          className="ml-2 text-slate-500 hover:text-rose-400 transition-colors"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
