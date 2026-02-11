// path:src/features/rbac/rbac.ts
export type MenuAction = {
  buttonCode: string
  label: string
  action: string

  // UI metadata (optional)
  icon?: string            // logical icon key
  className?: string       // custom css classes
  variant?: 
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"

  order?: number
}
