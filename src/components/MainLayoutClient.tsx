"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/AppFooter";
import TopBar from "@/components/AppTopbar";
import { MainLayoutGuard } from "@/components/MainLayoutGuard";
import dynamic from "next/dynamic";
import { useRestoreUnit } from "@/features/auth/authHooks";

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
      <div className="flex h-screen w-screen"> {/* important */}
        <AppSidebar />

        <main className="flex flex-1 flex-col">
          <TopBar />

          {/* Scrollable area */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </SidebarProvider>
  </MainLayoutGuard>
);
}
