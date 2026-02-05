//src/app/%28dashboard%29/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/auth.hooks";

import Footer from "@/components/AppFooter";
import TopBar from "@/components/AppTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";

import dynamic from "next/dynamic";

const AppSidebar = dynamic(
  () => import("@/components/AppSidebar").then((m) => m.AppSidebar),
  { ssr: false }
);



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
