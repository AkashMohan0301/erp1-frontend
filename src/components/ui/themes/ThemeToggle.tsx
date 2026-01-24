"use client"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleTheme } from "@/store/uiSlice"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const reduxTheme = useAppSelector((state) => state.ui.theme)
  const [mounted, setMounted] = useState(false)

  // Wait for client mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  // Don't render until client is ready
  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-800" />
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
      title={reduxTheme === "dark" ? "Light mode" : "Dark mode"}
    >
      {reduxTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
