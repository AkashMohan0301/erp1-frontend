import { useMutation } from "@tanstack/react-query";
import { api, setAccessToken } from "@/lib/api";
import type { LoginRequest, LoginResponse, ApiResponse } from "@/types/authtype";

export function useLogin() {
  return useMutation<ApiResponse<LoginResponse["data"]>, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const res = await api.post<ApiResponse<LoginResponse["data"]>>(
        "/auth/login",
        credentials
      );
      return res.data;
    },

    onSuccess: (response) => {
      setAccessToken(response.data.accessToken);
    },
  });
}
