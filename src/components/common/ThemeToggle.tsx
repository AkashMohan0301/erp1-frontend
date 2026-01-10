"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleTheme } from "@/store/uiSlice"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.ui.theme)

  const handleToggle = () => {
    dispatch(toggleTheme()) // Redux updates state
    // Force immediate class change
    document.documentElement.classList.toggle("dark")
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
