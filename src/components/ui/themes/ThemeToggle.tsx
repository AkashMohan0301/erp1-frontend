"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AppDropdown, type DropdownItem } from "@/components/DropdownMenu"
import { Laptop, Moon, Sun, SunMoonIcon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const menuItems: DropdownItem[] = [
  {
    type: "item",
    label: "Light",
    icon: <Moon className="h-4 w-4" />,
    onClick: () => setTheme("light"),
  },
    {
    type: "item",
    label: "Dark",
    icon: <Sun className="h-4 w-4" />,
    onClick: () => setTheme("dark"),
  },
   {
    type: "item",
    label: "System",
    icon: <Laptop className="h-4 w-4" />,
    onClick: () => setTheme("system"),
  },
]


  return (
      <AppDropdown trigger={<Button variant="outline" size="icon"><SunMoonIcon /></Button>} items={menuItems}/>
  )
}
