"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // fake delay, later replace with real API call
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-sm font-semibold text-white">
          ERP1
        </div>
        <h1 className="text-xl font-semibold text-slate-50">
          Sign in to ERP1
        </h1>
        <p className="text-xs text-slate-400">
          Use your company credentials to access the dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            required
            className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none ring-0 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-200">
            Password
          </label>
          <input
            type="password"
            required
            className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none ring-0 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-blue-500"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-xs font-medium text-blue-300 hover:text-blue-200"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-10 w-full items-center justify-center rounded-md bg-blue-500 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-center text-[11px] text-slate-500">
        By continuing, you agree to the{" "}
        <Link href="#" className="text-blue-300 hover:text-blue-200">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-blue-300 hover:text-blue-200">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
