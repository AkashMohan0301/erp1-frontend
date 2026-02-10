//path:src/features/menu/menu.hooks.ts
import { useQuery } from "@tanstack/react-query";
import { getMenus } from "./menu.api";

export function useMenus(unitId: number | null) {
  return useQuery({
    queryKey: ["menus", unitId],
    queryFn: getMenus,
    enabled: !!unitId,        // don’t fetch until unit is ready
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
