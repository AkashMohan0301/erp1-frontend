import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyApi } from "./companyApi";
import { companyQueryKeys } from "./companyQueryKeys";


export function useCompany(id?: number) {
  return useQuery({
    queryKey: companyQueryKeys.detail(id!),
    queryFn: () => companyApi.getById(id!),
    enabled: !!id,
  });
}

export function useSaveCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyApi.save,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.all,
      });

      queryClient.setQueryData(
        companyQueryKeys.detail(data.companyId!),
        data
      );
    },
  });
}