import { MenuAction } from "@/features/rbac/rbac"

/**
 * Maps logical RBAC button codes to shadcn Button variants
 */
export function mapVariant(btn: MenuAction) {
  switch (btn.buttonCode) {
    case "SAVE":
    case "UPDATE":
      return "default"        // primary action
    case "DELETE":
      return "destructive"
    default:
      return "secondary"
  }
}
