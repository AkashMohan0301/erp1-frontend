import { useQuery, useMutation } from "@tanstack/react-query";
import { menuAssignmentApi } from "./menuAssignmentApi";

export function useMenuAssignment(
  userId?: number,
  unitId?: number,
  moduleIds?: string[]
) {
  return useQuery({
    queryKey: ["menu-assignment", userId, unitId, moduleIds],
    queryFn: () =>
      menuAssignmentApi.load(userId!, unitId!, moduleIds!),
    enabled:
      !!userId &&
      !!unitId &&
      !!moduleIds &&
      moduleIds.length > 0,
  });
}

export function useSaveMenuAssignment(userId: number) {
  return useMutation({
    mutationFn: (payload: any) =>
      menuAssignmentApi.save(userId, payload),
  });
}
