import React from 'react'

export default function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string[];
}) {
  return (
        <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>

      <input
        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-800 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-slate-300 dark:border-slate-700"
        }`}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error[0]}</p>}
    </div>
  )
}
