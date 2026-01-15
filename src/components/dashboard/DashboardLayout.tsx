// src/components/dashboard/DashboardLayout.tsx
import { ReactNode } from "react";
import Footer from "./Footer";
import Sidebar from "./SideBar";
import TopBar from "./Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-slate-900">
          {children}
        </main>
        <Footer />
      </div>
    </main>
  );
}
