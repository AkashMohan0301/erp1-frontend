"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/uiSlice";
import { ThemeToggle } from "@/components/common/themes/ThemeToggle";

export default function TopBar() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
        >
          {sidebarOpen ? "←" : "→"}
        </button>

        <div>
          <h1 className="text-sm font-semibold">Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Demo Corp</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <button className="px-3 py-1 text-xs border rounded-lg border-slate-300 dark:border-slate-700">
          Settings
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg">
          Logout
        </button>
      </div>
    </header>
  );
}
