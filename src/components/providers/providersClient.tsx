// src/components/providers/ProvidersClient.tsx
"use client";

import { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeSync } from "@/components/common/themes/ThemeSync";

interface ProvidersClientProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export function ProvidersClient({ children, dehydratedState }: ProvidersClientProps) {
  const [queryClient] = useState(() => new QueryClient());

  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ThemeSync />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
