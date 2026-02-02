import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, getMe } from "./auth.api";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.clear();
    },
  });
}
