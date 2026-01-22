import { useMutation } from "@tanstack/react-query";
import { api, setAccessToken } from "@/lib/api";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },

    onSuccess: () => {
      setAccessToken(null);
    },
  });
}
