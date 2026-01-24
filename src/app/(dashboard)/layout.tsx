// src/app/(dashboard)/layout.tsx
"use client";

import { ProvidersClient } from "@/components/providers/ProvidersClient";
import Footer from "@/components/layout/dashboard/Footer";
import Sidebar from "@/components/layout/dashboard/SideBar";
import TopBar from "@/components/layout/dashboard/Topbar";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersClient>
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
    </ProvidersClient>
  );
}
