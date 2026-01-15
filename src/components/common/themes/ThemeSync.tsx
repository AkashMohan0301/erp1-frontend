"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/store/hooks"

export function ThemeSync() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    const html = document.documentElement
    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [theme])

  return null
}
