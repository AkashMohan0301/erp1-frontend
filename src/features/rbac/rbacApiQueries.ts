// src/features/rbac/rbacApiQueries.ts

import { api } from "@/lib/api";
import { rbacQueryKeys } from "./rbacQueryKeys";
import type { MenuAction } from "./rbacTypes";

export const rbacApiQueries = {
  menuActions: (menuId: number | null) => ({
    queryKey: rbacQueryKeys.menuActions(menuId),

    queryFn: async (): Promise<MenuAction[]> => {
      if (!menuId) return [];

      const res = await api.get(`api/rbac/menu-actions/${menuId}`);
      return res.data.data; // unwrap ApiResponse
    },
  }),
};
