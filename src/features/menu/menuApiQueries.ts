// src/features/menu/menuApiQueries.ts

import { api } from "@/lib/api";
import { menuQueryKeys } from "./menuQueryKeys";
import type { MenuNode } from "./menuType";

export const menuApiQueries = {
  getMenus: (unitId: number | null) => ({
    queryKey: menuQueryKeys.menus(unitId),
    queryFn: async (): Promise<MenuNode[]> => {
      const res = await api.get("/auth/menus");
      return res.data.data; // unwrap ApiResponse
    },
  }),
};
