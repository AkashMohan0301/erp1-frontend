"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/auth.hooks";
import { useFormError } from "@/hooks/useFormError";
import { FormError } from "@/components/ui/PopupMessage";
import InputField from "@/components/ui/InputField";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
   const {message,fieldErrors,
  } = useFormError(loginMutation.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    loginMutation.mutate(
      {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4">
      {/* Error */}
      <FormError message={message} />
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
            <InputField
              name="username"
              label="Username"
              error={fieldErrors.username}
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              error={fieldErrors.password}
            />

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
