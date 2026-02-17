// path: src/features/auth/authApiMutations.ts

import { api } from "@/lib/api";
import type { LoginInput } from "@/features/auth/authTypes";

export const apiMutations = {
  login: async (data: LoginInput): Promise<void> => {
    await api.post("/auth/login", data);
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
