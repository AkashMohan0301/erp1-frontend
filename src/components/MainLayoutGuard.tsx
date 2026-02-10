"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMenus } from "@/features/menu/menu.hooks";
import { useAppSelector } from "@/store/hooks";
import { selectUnitId } from "@/store/authContextSlice";
import { SkeletonCard } from "@/components/SkeletonCard";
import {
  findMenuByRoute,
  getDefaultRoute,
} from "@/features/menu/menuUtils";

export function MainLayoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const unitId = useAppSelector(selectUnitId);

  const { data: menus, isLoading, isFetching } = useMenus(unitId);

  // 🔁 Re-evaluate route whenever unit or menus change
  useEffect(() => {
    if (unitId == null || isLoading || isFetching) return;

    const currentMenu = findMenuByRoute(menus, pathname);

    // 🚫 Current route not allowed in this unit
    if (!currentMenu) {
      const fallback = getDefaultRoute(menus);

      if (fallback) {
        router.replace(fallback);
      } else {
        router.replace("/403");
      }
    }

  console.log("UNIT:", unitId);
  console.log("PATH:", pathname);
  console.log("MENUS:", menus);


  }, [unitId, isLoading, isFetching, menus, pathname, router]);

  // ⛔ Block UI until context is ready
  if (unitId == null || isLoading || isFetching) {
    return <SkeletonCard />;
  }

  return <>{children}</>;
}
