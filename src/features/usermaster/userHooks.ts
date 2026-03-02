import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "./userApi";

export function useSaveUser() {
  return useMutation({
    mutationFn: userApi.save,
  });
}

export function useUser(id?: number) {
  return useQuery({
    queryKey: ["usermaster", id],
    queryFn: () => userApi.getById(id!),
    enabled: !!id,
  });
}