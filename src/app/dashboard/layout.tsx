import { DashboardLayout } from "@/components/DashboardLayout";

// Ensure the dashboard requires no extra metadata right now
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
