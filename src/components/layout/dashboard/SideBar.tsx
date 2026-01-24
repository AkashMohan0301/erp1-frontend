"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function Sidebar() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  if (!sidebarOpen) return null;

  return (
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
        <Link href="/dashboard" className="flex items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
          Overview
        </Link>
        {["Finance", "Inventory", "HR", "Sales"].map((item) => (
          <Link
            key={item}
            href="#"
            className="flex items-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
