"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectMenus } from "@/store/authContextSlice";
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
  const menus = useAppSelector(selectMenus);

  const hasMenus = menus && menus.length > 0;

  useEffect(() => {
    if (!hasMenus || !pathname) return;

    const currentMenu = findMenuByRoute(menus, pathname);

    if (!currentMenu) {
      const fallback = getDefaultRoute(menus);

      if (fallback && fallback !== pathname) {
        router.replace(fallback);
      } else {
        router.replace("/403");
      }
    }
  }, [menus, pathname, hasMenus, router]);

  if (!hasMenus) {
    return <SkeletonCard />;
  }

  return <>{children}</>;
}
