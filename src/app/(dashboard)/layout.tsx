"use client"

import { ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleSidebar } from "@/store/uiSlice"
import { ThemeToggle } from "@/components/common/ThemeToggle"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  return (
    <main className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Simple Sidebar */}
      {sidebarOpen && (
        <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sm:flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-500 rounded text-white flex items-center justify-center font-semibold text-sm">
                ERP1
              </div>
              <div>
                <p className="text-sm font-semibold">ERP1 Dashboard</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            <a href="/dashboard" className="flex items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
              Overview
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Finance
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Inventory
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              HR
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Sales
            </a>
          </nav>
        </aside>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col min-h-screen">
        {/* Simple Topbar */}
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Demo Corp</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <button className="px-3 py-1 text-xs border rounded-lg border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Settings
            </button>
            <button className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
              Logout
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-slate-900">
          {children}
        </main>

        {/* Simple Footer */}
        <footer className="h-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 text-xs text-slate-500 dark:text-slate-400">
          <span>ERP1 Dashboard</span>
          <span>v1.0.0</span>
        </footer>
      </div>
    </main>
  )
}
