"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMenus } from "@/features/menu/menu.hooks";
import { useAppSelector } from "@/store/hooks";
import { selectUnitId } from "@/store/authContextSlice";
import { SkeletonCard } from "@/components/SkeletonCard";
import type { MenuNode } from "@/features/menu/menu";

function hasMenu(
  menus: MenuNode[] | undefined,
  menuCode: string
): boolean {
  if (!menus) return false;

  for (const m of menus) {
    if (m.menuCode === menuCode) return true;
    if (m.children?.length && hasMenu(m.children, menuCode)) {
      return true;
    }
  }
  return false;
}

export function RouteGuard({
  menuCode,
  children,
}: {
  menuCode: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const unitId = useAppSelector(selectUnitId);

  const { data: menus, isLoading, isFetching } = useMenus(unitId);
  const allowed = hasMenu(menus, menuCode);

  useEffect(() => {
    if (
      unitId != null &&
      !isLoading &&
      !isFetching &&
      !allowed &&
      pathname !== "/403"
    ) {
      router.replace("/403");
    }
  }, [unitId, isLoading, isFetching, allowed, pathname, router]);

  if (unitId == null || isLoading || isFetching) {
    return <SkeletonCard />;
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
