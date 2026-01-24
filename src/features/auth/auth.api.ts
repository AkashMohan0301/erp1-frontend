import { api } from "@/lib/api";
import type { LoginInput, LoginResponse } from "./auth.types";
import type { ApiResponse } from "@/types/api";

export async function login(
  credentials: LoginInput
): Promise<ApiResponse<LoginResponse>> {
  const res = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    credentials
  );

  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
}
