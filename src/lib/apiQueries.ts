// src/lib/apiQueries.ts
import { api } from "./api";

export const apiQueries = {
  dashboardStats: () => ({
    queryKey: ["dashboard-stats"] as const,
    queryFn: async () => await api.get("/dashboard/stats"),
  }),

  userProfile: () => ({
    queryKey: ["user-profile"] as const,
    queryFn: async () => await api.get("/user/profile"),
  }),
};
