'use client'
import { usePermission } from "@/features/auth/usePermission";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//path app (main)/dashboard/page.tsx
export default function DashboardPage() {
  const router = useRouter();

  const { data: allowed, isLoading, isError } =
    usePermission("dashboard", "VIEW");

  useEffect(() => {
    if (!isLoading && (isError || allowed === false)) {
      router.replace("/unauthorized"); // or /403
    }
  }, [isLoading, allowed, isError, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          Checking permissions…
        </span>
      </div>
    );
  }

  if (!allowed) return null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Dashboard Overview
      </h1>
    </div>
  );
}