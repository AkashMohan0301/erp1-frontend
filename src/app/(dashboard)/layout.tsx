//src/app/%28dashboard%29/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/auth.hooks";

import Footer from "@/components/layout/dashboard/Footer";
import Sidebar from "@/components/layout/dashboard/SideBar";
import TopBar from "@/components/layout/dashboard/Topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading, isError } = useAuth();

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      router.replace("/login");
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <span className="text-sm text-slate-500">Checking authentication…</span>
      </div>
    );
  }

  if (!data) return null;

  return <>{children}</>;
}

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen flex flex-col gap-1">
        <TopBar />

        <div className="flex-1 overflow-auto">{children}</div>

        <Footer />
      </main>
    </SidebarProvider>

    // <DashboardGuard>
    //   <main className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
    //
    //     <div className="flex flex-1 flex-col min-h-screen">

    //       <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-slate-900">
    //         {children}
    //       </main>

    //     </div>
    //   </main>
    // </DashboardGuard>
  );
}
