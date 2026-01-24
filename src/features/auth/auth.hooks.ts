import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./auth.api";
import { setAccessToken } from "@/lib/api";

import type { LoginInput, LoginResponse } from "./auth.types";
import type { ApiError, ApiResponse } from "@/types/api";

export function useLogin() {
  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginInput>({
    mutationFn: login,

    onSuccess: (response) => {
      setAccessToken(response.data.accessToken);
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      setAccessToken(null);
    },
  });
}
