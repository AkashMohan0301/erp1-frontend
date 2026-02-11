//path:src/features/auth/authApiMutations.ts
import { api } from "@/lib/api";
import type { LoginInput, LoginResponse } from "@/features/auth/authTypes";

export const apiMutations = {

  login: async (data: LoginInput): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", data);
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

};
