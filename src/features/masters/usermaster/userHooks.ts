import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "./userApi";
import { userQueryKeys } from "./userQueryKeys";

export function useUser(id?: number) {
  return useQuery({
    queryKey: userQueryKeys.detail(id!),
    queryFn: () => userApi.getById(id!),
    enabled: !!id,
  });
}

export function useSaveUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.save,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: userQueryKeys.detail(id),
      });
    },
  });
}