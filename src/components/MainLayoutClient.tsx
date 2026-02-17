"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/AppFooter";
import TopBar from "@/components/AppTopbar";
import { MainLayoutGuard } from "@/components/MainLayoutGuard";
import dynamic from "next/dynamic";
import { useInitAuthContext } from "@/features/auth/authHooks";

const AppSidebar = dynamic(
  () => import("@/components/AppSidebar").then(m => m.AppSidebar),
  { ssr: false }
);

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  useInitAuthContext(); 
  return (
  // ✅ MUST BE HERE

    <MainLayoutGuard>
      <SidebarProvider>
        <div className="flex h-screen min-w-screen overflow-hidden">
          <AppSidebar />

          <main className="flex flex-1 flex-col w-full">
            <TopBar />

            <div className="flex-1 overflow-auto">
              {children}
            </div>

            <Footer />
          </main>
        </div>
      </SidebarProvider>
    </MainLayoutGuard>
  );
}
