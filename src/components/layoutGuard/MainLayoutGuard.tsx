"use client";

import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
import { findMenuByRoute, getDefaultRoute } from "@/features/menu/menuUtils";
import { SkeletonCard } from "@/components/SkeletonCard";
import { redirect } from "next/navigation";

export function MainLayoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const menus = useAppSelector(selectMenus);

  // 1️⃣ Loading
  if (!menus || menus.length === 0) {
    return <SkeletonCard />;
  }

  // 2️⃣ Check access
  const currentMenu = findMenuByRoute(menus, pathname);

  if (!currentMenu) {
    const fallback = getDefaultRoute(menus);

    if (fallback && fallback !== pathname) {
      redirect(fallback);   // 🔥 render-phase redirect
    }

    redirect("/403");       // 🔥 render-phase redirect
  }

  return <>{children}</>;
}