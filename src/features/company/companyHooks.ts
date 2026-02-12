//path : src/features/company/companyHooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { companyApiMutations } from "./companyApiMutations";
import { companyApiQueries } from "./companyApiQueries";

export function useCompany(id?: number) {
  return useQuery({
    ...companyApiQueries.getById(id!),
    enabled: !!id,
  });
}

export function useSaveCompany() {
  return useMutation({
    mutationFn: companyApiMutations.save,
  });
}
