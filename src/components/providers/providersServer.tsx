// src/components/providers/ProvidersServer.tsx
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/queryClient";

export async function ProvidersServer(prefetch?: (qc: ReturnType<typeof createQueryClient>) => Promise<void>) {
  const queryClient = createQueryClient();

  if (prefetch) {
    await prefetch(queryClient);
  }

  return dehydrate(queryClient); // return dehydrated state for client hydration
}
