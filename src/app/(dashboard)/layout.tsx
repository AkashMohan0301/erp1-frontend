"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { useAuthContext, useInitAuthContext, useRestoreUnit } from "@/features/auth/auth.hooks";

import Footer from "@/components/AppFooter";
import TopBar from "@/components/AppTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { SkeletonCard } from "@/components/SkeletonCard";

const AppSidebar = dynamic(
  () => import("@/components/AppSidebar").then((m) => m.AppSidebar),
  { ssr: false }
);

// ============================
// AUTH GUARD (React Query only)
// ============================
function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading, isError } = useAuthContext();

  useEffect(() => {
    if (!isLoading && (isError || !data)) {
      router.replace("/login");
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <SkeletonCard />
      </div>
    );
  }

  if (!data) return null;

  return <>{children}</>;
}

// ============================
// DASHBOARD LAYOUT (Redux init)
// ============================
export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {


    useRestoreUnit();
  return (
    <DashboardGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen flex flex-col gap-1">
          <TopBar />
          <div className="flex-1 overflow-auto">{children}</div>
          <Footer />
        </main>
      </SidebarProvider>
    </DashboardGuard>
  );
}
