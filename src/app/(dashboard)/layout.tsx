export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-950/80 px-4 py-4 sm:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold">
            ERP1
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-100">
              ERP1 Dashboard
            </p>
            <p className="text-[11px] text-slate-500">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <a
            href="/dashboard"
            className="flex items-center justify-between rounded-md bg-slate-900 px-3 py-2 text-slate-100"
          >
            <span>Overview</span>
            <span className="text-[10px] text-emerald-400">Live</span>
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900"
          >
            Finance
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900"
          >
            Inventory
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900"
          >
            HR & Payroll
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900"
          >
            Sales & CRM
          </a>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 backdrop-blur">
          <div className="text-xs text-slate-400">
            <p className="font-medium text-slate-100">Today&apos;s Overview</p>
            <p>Company: Demo Corp</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button className="rounded-md border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-900">
              Settings
            </button>
            <button className="rounded-md bg-slate-100 px-3 py-1 text-slate-900 hover:bg-white">
              Logout
            </button>
          </div>
        </header>

        {/* Scrollable main + footer */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto bg-slate-950 px-4 py-4">
            {children}
          </div>

          <footer className="flex h-10 items-center justify-between border-t border-slate-800 bg-slate-950 px-4 text-[11px] text-slate-500">
            <span>ERP1 · Internal dashboard</span>
            <span>v1.0.0</span>
          </footer>
        </div>
      </div>
    </main>
  )
}
