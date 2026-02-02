//src/app/%28dashboard%29/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/auth.hooks";

import Footer from "@/components/layout/dashboard/Footer";
import Sidebar from "@/components/layout/dashboard/SideBar";
import TopBar from "@/components/layout/dashboard/Topbar";

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
        <span className="text-sm text-slate-500">
          Checking authentication…
        </span>
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
   
      <DashboardGuard>
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
      </DashboardGuard>
 
  );
}
