import { useQuery } from "@tanstack/react-query";
import { privilegeApi } from "./privilegeApi";

export function usePrivilegeSetup() {
  return useQuery({
    queryKey: ["privilege", "setup"],
    queryFn: privilegeApi.setup,
    staleTime: Infinity, 
    gcTime: Infinity,
  });
}