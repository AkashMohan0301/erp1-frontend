// src/features/auth/authHooks.ts

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiQueries } from "./authApiQueries";
import { apiMutations } from "./authApiMutations";
import { queryKeys } from "./authQueryKeys";
import type { LoginInput } from "./authTypes";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthContext,
  clearAuthContext,
  setUnits,
  setMenus,
  setCompanies
} from "@/store/authContextSlice";

// ============================
// BOOTSTRAP (UNIT SCOPED)
// ============================
export function useBootstrap() {
  return useQuery({
    ...apiQueries.bootstrap(),
    retry: false,
  });
}

// ============================
// INIT AUTH CONTEXT
// ============================
export function useInitAuthContext() {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useBootstrap();

  useEffect(() => {
    if (data) {
      dispatch(
        setAuthContext({
          userId: data.user.userId,        // ✅ FIXED
          companyId: data.user.companyId,
          unitId: data.user.unitId,
        })
      );

      dispatch(setCompanies(data.companies));   // ✅ THIS WAS MISSING
      dispatch(setUnits(data.units));
      dispatch(setMenus(data.menus));
    }

    if (isError) {
      dispatch(clearAuthContext());
    }
  }, [data, isError, dispatch]);

  return { isLoading };
}

export function useSwitchCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (companyId: number) =>
      apiMutations.switchCompany(companyId),

    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["auth-bootstrap"],
      });
    },
  });
}

// ============================
// LOGIN
// ============================
export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => apiMutations.login(data),

    onSuccess: async (_, __, ___) => {
      // invalidate ALL bootstrap caches
      await qc.invalidateQueries({
        queryKey: ["auth-bootstrap"],
      });
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
      qc.clear();
    },
  });
}
