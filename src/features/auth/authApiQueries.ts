// src/features/auth/authApiQueries.ts

import { api } from "@/lib/api";
import type { AuthBootstrapResponse } from "./authTypes";
import { queryKeys } from "./authQueryKeys";

export const apiQueries = {
  bootstrap: () => ({
    queryKey: queryKeys.bootstrap(),

    queryFn: async (): Promise<AuthBootstrapResponse> => {
      const res = await api.get("/auth/bootstrap");
      return res.data.data;
    },
  }),

  csrf: () => ({
    queryKey: queryKeys.csrf,
    queryFn: async () => {
      const res = await api.get("/auth/csrf");
      return res.data.data;
    },
    staleTime: Infinity,
  }),
};

