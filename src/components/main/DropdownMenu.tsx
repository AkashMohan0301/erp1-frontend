// components/ui/AppDropdown.tsx
"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ActionItem = {
  type: "item"
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: "default" | "destructive"
}

type SeparatorItem = {type: "separator"}
export type DropdownItem = ActionItem | SeparatorItem
type AppDropdownProps = {trigger: React.ReactNode
                         items: DropdownItem[]
                         align?: "start" | "center" | "end"
                        }

export function AppDropdown({
  trigger,
  items,
  align = "end",
}: AppDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {items.map((item, index) => {
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={index} />
          }

          return (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              variant={item.variant}
            >
              {item.icon && (
                <span className="mr-2 h-4 w-4">{item.icon}</span>
              )}
              {item.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

