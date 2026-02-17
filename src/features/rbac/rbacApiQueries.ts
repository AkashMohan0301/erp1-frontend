// src/features/rbac/rbacApiQueries.ts

import { api } from "@/lib/api";
import { rbacQueryKeys } from "./rbacQueryKeys";
import type { MenuAction } from "./rbacTypes";

export const rbacApiQueries = {
  menuActions: (menuId: number | null) => ({
    queryKey: rbacQueryKeys.menuActions(menuId),
    enabled: !!menuId,
    queryFn: async (): Promise<MenuAction[]> => {
      const res = await api.get(`/rbac/menu-actions/${menuId}`);
      return res.data ?? [];
    },
  }),
};
