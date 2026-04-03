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
    <aside className="w-64 flex-shrink-0 glass-panel border-r border-white/5 hidden md:flex flex-col h-full sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-indigo-400" />
          SmartHostel
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <link.icon className={clsx("w-5 h-5", isActive ? "text-indigo-400" : "text-slate-500")} />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
