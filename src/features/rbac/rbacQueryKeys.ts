// src/features/rbac/rbacQueryKeys.ts

export const rbacQueryKeys = {
  menuActions: (menuId: number | null) =>
    ["rbac", "menu-actions", menuId] as const,
};
