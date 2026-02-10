"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/AppFooter";
import TopBar from "@/components/AppTopbar";
import { MainLayoutGuard } from "@/components/MainLayoutGuard";
import dynamic from "next/dynamic";
import { useRestoreUnit } from "@/features/auth/auth.hooks";

const AppSidebar = dynamic(
  () => import("@/components/AppSidebar").then(m => m.AppSidebar),
  { ssr: false }
);

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
      useRestoreUnit(); 

  return (
    <MainLayoutGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex w-full flex-col">
          <TopBar />
          <div className="flex-1 overflow-auto">{children}</div>
          <Footer />
        </main>
      </SidebarProvider>
    </MainLayoutGuard>
  );
}
