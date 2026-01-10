"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/store/hooks"

export function ThemeScript() {
  const theme = useAppSelector((state) => state.ui.theme)

useEffect(() => {
    // Only sync Redux with localStorage, don't change classes (head script handles that)
    if (theme !== localStorage.getItem('theme')) {
      localStorage.setItem('theme', theme)
    }
  }, [theme])
  
  return null
}
