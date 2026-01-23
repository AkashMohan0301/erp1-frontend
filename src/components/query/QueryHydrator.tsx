// src/components/query/QueryHydrator.tsx
"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";

export function QueryHydrator({
  children,
  state,
}: {
  children: React.ReactNode;
  state?: DehydratedState | null;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
