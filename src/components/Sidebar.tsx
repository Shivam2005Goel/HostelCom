"use client";

import { useRoleStore } from "@/store/useRoleStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  CalendarCheck, 
  Ticket, 
  Wrench, 
  Package, 
  Utensils, 
  Dumbbell,
  Users,
  ShieldAlert,
  Bell,
  ShoppingBag,
  HelpCircle
} from "lucide-react";
import { clsx } from "clsx";

export function Sidebar() {
  const { role } = useRoleStore();
  const pathname = usePathname();

  const studentLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
    { name: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
    { name: "Leaves & Permissions", href: "/dashboard/leaves", icon: Ticket },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    { name: "Packages", href: "/dashboard/packages", icon: Package },
    { name: "Mess & Dining", href: "/dashboard/mess", icon: Utensils },
    { name: "Gym", href: "/dashboard/gym", icon: Dumbbell },
    { name: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
    { name: "Hold-on help", href: "/help", icon: HelpCircle },
  ];

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "All Students", href: "/dashboard/students", icon: Users },
    { name: "Monitoring & Safety", href: "/dashboard/safety", icon: ShieldAlert },
    { name: "Maintenance Approvals", href: "/dashboard/maintenance", icon: Wrench },
    { name: "Notifications", href: "/dashboard/admin-alerts", icon: Bell },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col h-full sticky top-0 border-r border-white/5 bg-black/60 backdrop-blur-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-4 h-4 text-black" />
          </div>
          <h1 className="text-base font-heading font-bold text-white tracking-tight">
            HostelCom<span className="text-green-500">.</span>
          </h1>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          <span className="text-[10px] font-semibold text-green-500 uppercase tracking-widest">
            {role === "admin" ? "Root Access" : "Resident"}
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 no-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group",
                isActive
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "text-slate-500 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <link.icon className={clsx(
                "w-4 h-4 transition-colors flex-shrink-0",
                isActive ? "text-green-400" : "text-slate-600 group-hover:text-white"
              )} />
              <span className="truncate">{link.name}</span>
              {isActive && (
                <span className="ml-auto w-1 h-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="text-[10px] font-medium text-slate-600 text-center tracking-widest uppercase">
          Secured &bull; Encrypted
        </div>
      </div>
    </aside>
  );
}
