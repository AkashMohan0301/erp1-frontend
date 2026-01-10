"use client"

import { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from "@/store"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { ThemeScript } from "./ThemeScript"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ThemeScript />
      </QueryClientProvider>
    </Provider> 
  )
}
