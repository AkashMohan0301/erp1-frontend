import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, logout, getAuthContext } from "./auth.api";
import type { LoginInput } from "./auth.types";

import { useAppDispatch } from "@/store/hooks";
import { setAuthContext, clearAuthContext ,setActiveUnit } from "@/store/authContextSlice";

// ============================
// AUTH CONTEXT (React Query)
// ============================
export function useAuthContext() {
  return useQuery({
    queryKey: ["auth", "context"],
    queryFn: getAuthContext,
    retry: false,
  });
}

// ============================
// INIT AUTH CONTEXT (Redux)
// ============================
export function useInitAuthContext() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const ctx = await getAuthContext();

        dispatch(
          setAuthContext({
            userId: ctx.userId,
            companyId: ctx.companyId,
            unitId: ctx.unitId,
          })
        );
      } catch (err) {
        dispatch(clearAuthContext());
      }
    };

    init();
  }, [dispatch]);
}

// ============================
// LOGIN
// ============================
export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "context"] });
    },
  });
}

// ============================
// LOGOUT
// ============================
export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.clear();
    },
  });
}

// ============================
// USER UNITS
// ============================
import { getUserUnits } from "./auth.api";

export function useUserUnits() {
  return useQuery({
    queryKey: ["auth", "units"],
    queryFn: getUserUnits,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}


export function useRestoreUnit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedUnitId = localStorage.getItem("activeUnitId");

    if (savedUnitId) {
      dispatch(
        setActiveUnit({ unitId: Number(savedUnitId) })
      );
    }
  }, [dispatch]);
}
