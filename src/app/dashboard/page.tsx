"use client";

import { useRoleStore } from "@/store/useRoleStore";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function DashboardHome() {
  const { role } = useRoleStore();

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}
