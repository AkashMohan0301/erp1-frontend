"use client";

import { ProvidersClient } from "@/components/providers/providersClient";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvidersClient>{children}</ProvidersClient>;
}
