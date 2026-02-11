"use client";

import { ReactNode, useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";

import { apiQueries } from "@/features/auth/authApiQueries";

interface ProvidersClientProps {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

export function ProvidersClient({
  children,
  dehydratedState,
}: ProvidersClientProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // CSRF 
  useEffect(() => {
    queryClient.prefetchQuery(apiQueries.csrf());
  }, [queryClient]);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
