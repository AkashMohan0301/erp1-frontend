"use client";

import { ReactNode, useState ,useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { DehydratedState } from "@tanstack/react-query";

import { getCsrf } from "@/features/auth/auth.api";

interface ProvidersClientProps {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

export function ProvidersClient({
  children,
  dehydratedState,
}: ProvidersClientProps) {

  useEffect(() => {
    getCsrf().catch(() => {
      // optional: log / retry
    });
  }, []);

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
