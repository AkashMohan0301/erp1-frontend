import { MenuAction } from "./rbac"

export async function fetchMenuActions(menuId: number): Promise<MenuAction[]> {
  const res = await fetch(`/api/rbac/menu-actions/${menuId}`, {
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to load menu actions")
  }

  return res.json()
}
