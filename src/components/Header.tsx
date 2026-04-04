"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { Bell, LogOut, UserCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const { role, logout } = useRoleStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 border-b border-white/5 bg-black/60 backdrop-blur-2xl flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <ShieldAlert className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-sm font-heading font-bold text-white">HostelCom<span className="text-green-500">.</span></span>
        </div>

        {/* Portal label */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {role === "admin" ? "Admin Portal" : "Student Portal"}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 flex items-center justify-center transition-all">
          <Bell className="w-4 h-4 text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
        </button>
        
        <div className="h-6 w-px bg-white/5" />
        
        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-white">{role === "admin" ? "Warden Smith" : "Alex Doe"}</div>
            <div className="text-xs text-slate-500">{role === "admin" ? "Block A Admin" : "Room 304"}</div>
          </div>
          <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-slate-300" />
          </div>
        </div>
        
        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-9 h-9 rounded-xl border border-white/5 bg-white/5 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 flex items-center justify-center transition-all text-slate-500"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
