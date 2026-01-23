import React from 'react'

export default function LandingPage () {
  return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="mx-auto flex min-h-screen w-screen flex-col px-4 sm:px-6 lg:px-8">
        {/* Simple Nav */}
        <header className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center text-white font-semibold text-sm">
              ERP1
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Enterprise Suite
            </span>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              Features
            </a>
            <a href="#modules" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              Modules
            </a>
            <a href="/login" className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
              Login
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-start justify-center gap-8 py-12 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Modern ERP for growing teams
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Control your entire{" "}
              <span className="text-blue-600 dark:text-blue-400">business</span> 
              from one dashboard
            </h1>

            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400">
              Manage finance, inventory, HR, and sales in real-time. Built for speed and clarity.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/login"
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700"
              >
                Get Started
              </a>
              <button className="px-6 py-2.5 border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                View Demo
              </button>
            </div>
          </div>

          {/* Simple preview cards */}
          <div className="mt-12 flex-1 md:mt-0 md:pl-8">
            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Live Preview</span>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-xs font-medium text-emerald-700 dark:text-emerald-300 rounded-full">
                  Real-time
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Revenue</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">₹4.3L</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">+18.2%</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Orders</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">127</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">24 pending</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="h-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ERP1. All rights reserved.</p>
          <p>Built with Next.js & Tailwind</p>
        </footer>
      </div>
    </main>
  )
}
