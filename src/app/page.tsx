export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Nav */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-xs font-semibold">
              ERP1
            </div>
            <span className="text-sm font-medium text-slate-300">
              Enterprise Suite
            </span>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#features" className="text-slate-300 hover:text-white">
              Features
            </a>
            <a href="#modules" className="text-slate-300 hover:text-white">
              Modules
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-white">
              Pricing
            </a>
            <a
              href="/login"
              className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-white"
            >
              Login
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-start justify-center gap-8 py-10 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-500/40">
              Modern ERP dashboard for growing teams
            </p>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Control your entire{" "}
              <span className="text-blue-400">business workflow</span> from one
              dashboard.
            </h1>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              ERP1 helps you manage finance, inventory, HR, and sales in a
              single, real‑time system. Designed for speed, clarity, and better
              decisions.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600"
              >
                Go to Login
              </a>
              <button className="inline-flex items-center justify-center rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900">
                View Dashboard Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live KPIs & reports
              </span>
              <span>Role‑based access</span>
              <span>Optimized for desktop dashboards</span>
            </div>
          </div>

          {/* Right side panel */}
          <div className="mt-8 flex-1 md:mt-0">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg shadow-black/40">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>Today overview</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  Realtime
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-slate-900/60 p-3">
                  <p className="text-slate-400">Revenue</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    ₹4.3L
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-400">
                    +18.2% vs last week
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-3">
                  <p className="text-slate-400">Open Orders</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    127
                  </p>
                  <p className="mt-1 text-[11px] text-amber-300">
                    24 require approval
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-3">
                  <p className="text-slate-400">Inventory Status</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    96.3%
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    5 SKUs low in stock
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-3">
                  <p className="text-slate-400">HR & Attendance</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    98%
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    3 pending leave requests
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-500">
                This is a preview of the ERP1 dashboard layout you will build
                next.
              </p>
            </div>
          </div>
        </section>

        {/* Simple footer for landing */}
        <footer className="flex h-12 items-center justify-between border-t border-slate-800/60 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ERP1. All rights reserved.</p>
          <p>Made with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  )
}
