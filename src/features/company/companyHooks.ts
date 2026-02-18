import { useMutation, useQuery } from "@tanstack/react-query";
import type { CompanyDto } from "./companyTypes";
import { companyApiMutations } from "./companyApiMutations";
import { companyApiQueries } from "./companyApiQueries";

export function useCompany(id?: number) {
  return useQuery<CompanyDto>({
    ...companyApiQueries.getById(id!),

    enabled: !!id,

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

export function useSaveCompany() {
  return useMutation({
    mutationFn: companyApiMutations.save,
  });
}
