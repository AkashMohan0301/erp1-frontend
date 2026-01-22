"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );
  };


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-semibold text-lg">ERP1</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Sign In
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enter your credentials to access dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} ERP1. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
