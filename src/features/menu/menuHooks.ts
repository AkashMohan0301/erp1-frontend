// src/features/menu/menuHooks.ts

import { useQuery } from "@tanstack/react-query";
import { menuApiQueries } from "./menuApiQueries";

export function useMenus(unitId: number | null) {
  return useQuery({
    ...menuApiQueries.getMenus(unitId),
    enabled: !!unitId,        // wait until unit ready
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
