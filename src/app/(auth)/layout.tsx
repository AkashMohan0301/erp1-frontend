"use client";

import { ProvidersClient } from "@/components/providers/ProvidersClient";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvidersClient>{children}</ProvidersClient>;
}
