// path: src/features/auth/auth.hooks.ts
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiQueries } from "@/features/auth/authApiQueries";
import { apiMutations } from "@/features/auth/authApiMutations";
import { queryKeys } from "@/features/auth/authQueryKeys";

import type { LoginInput } from "./authTypes";

import { useAppDispatch } from "@/store/hooks";
import {setAuthContext,clearAuthContext,setActiveUnit,} from "@/store/authContextSlice";


// ============================
// AUTH CONTEXT (React Query)
// ============================
export function useAuthContext() {
  return useQuery({
    ...apiQueries.authContext(),
    retry: false,
  });
}

// ============================
// INIT AUTH CONTEXT (Redux hydration)
// ============================
export function useInitAuthContext() {
  const dispatch = useAppDispatch();
  const { data, isError } = useAuthContext();

  useEffect(() => {
    if (data) {
      dispatch(
        setAuthContext({
          userId   : data.userId,
          companyId: data.companyId,
          unitId   : data.unitId,
        })
      );
    }
    if (isError) {
      dispatch(clearAuthContext());
    }
  }, [data, isError, dispatch]);
}

// ============================
// LOGIN
// ============================
export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => apiMutations.login(data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.authContext });
    },
  });
}

// ============================
// LOGOUT
// ============================
export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: apiMutations.logout,
    onSuccess: () => {
      qc.clear(); // clears all cached server state
    },
  });
}

// ============================
// USER UNITS
// ============================
export function useUserUnits() {
  return useQuery({
    ...apiQueries.userUnits(),
    staleTime: 5 * 60 * 1000,
  });
}

// ============================
// RESTORE UNIT (cookie → redux)
// ============================
export function useRestoreUnit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find(c => c.startsWith("activeUnitId="));

    if (!match) return;

    const unitId = Number(match.split("=")[1]);

    if (!Number.isNaN(unitId)) {
      dispatch(setActiveUnit({ unitId }));
    }
  }, [dispatch]);
}
