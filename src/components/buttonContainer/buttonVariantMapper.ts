import { MenuAction } from "@/features/rbac/rbacTypes"

/**
 * Maps logical RBAC button codes to shadcn Button variants
 */
export function mapVariant(btn: MenuAction) {
  switch (btn.buttonCode) {
    case "EDIT":
      return "default"        // primary action
    case "DELETE":
      return "destructive"
    default:
      return "secondary"
  }
}
