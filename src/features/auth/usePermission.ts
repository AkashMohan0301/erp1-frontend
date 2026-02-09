import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function usePermission(menuCode: string, permissionCode: string) {
  return useQuery({
    queryKey: ["permission", menuCode, permissionCode],
    queryFn: async () => {
      const res = await api.post("/auth/has-permission", {
        menuCode,
        permissionCode,
      });

      return res.data.data.allowed as boolean;
    },
    retry: false,
  });
}
