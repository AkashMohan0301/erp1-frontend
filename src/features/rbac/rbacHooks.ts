// src/features/rbac/rbacHooks.ts

import { useQuery } from "@tanstack/react-query";
import { rbacApiQueries } from "./rbacApiQueries";

export function useMenuActions(menuId: number | null) {
  return useQuery({
    ...rbacApiQueries.menuActions(menuId),
    enabled: !!menuId,
    staleTime: 5 * 60 * 1000,
  });
}
