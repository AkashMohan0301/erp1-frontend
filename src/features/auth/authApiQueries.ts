//path:src/features/auth/authApiQueries.ts
import { api } from "@/lib/api";
import type {
  AuthContextResponse,
  UserUnit,
} from "@/features/auth/authTypes";
import { queryKeys } from "@/features/auth/authQueryKeys";

export const apiQueries = {
  // --------------------
  // AUTH CONTEXT
  // --------------------
  authContext: () => ({
    queryKey: queryKeys.authContext,
    queryFn: async (): Promise<AuthContextResponse> => {
      const res = await api.get("/auth/me");
      return res.data.data;
    },
  }),

  // --------------------
  // USER UNITS
  // --------------------
  userUnits: () => ({
    queryKey: queryKeys.userUnits,
    queryFn: async (): Promise<UserUnit[]> => {
      const res = await api.get("/auth/units");
      return res.data.data;
    },
  }),

  // --------------------
  // CSRF
  // --------------------
  csrf: () => ({
    queryKey: queryKeys.csrf,
    queryFn: async () => {
      const res = await api.get("/auth/csrf");
      return res.data.data;
    },
    staleTime: Infinity, // CSRF token rarely changes
  }),
};
