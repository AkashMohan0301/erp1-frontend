// src/app/(dashboard)/layout.tsx
"use client";

import { ProvidersClient } from "@/components/providers/providersClient";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersClient>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProvidersClient>
  );
}
