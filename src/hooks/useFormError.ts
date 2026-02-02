import { useMemo } from "react";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/api";

export function useFormError(error: unknown) {
  return useMemo(() => {
    if (!error) {
      return {
        message: "",
        fieldErrors: {} as Record<string, string[]>,
        code: undefined,
        correlationId: undefined,
      };
    }

    const axiosError = error as AxiosError;
    const data = axiosError.response?.data;

    // ApiErrorResponse from backend
    if (typeof data === "object" && data !== null) {
      const apiError = data as ApiError;

      return {
        message: apiError.message ?? "",
        fieldErrors: apiError.details ?? {},
        code: apiError.code,
        correlationId: apiError.correlationId,
      };
    }

    // Plain-text errors (429, infra)
    if (typeof data === "string") {
      return {
        message: data,
        fieldErrors: {} as Record<string, string[]>,
        code: axiosError.code,
        correlationId: undefined,
      };
    }

    return {
      message: "Something went wrong. Please try again.",
      fieldErrors: {} as Record<string, string[]>,
      code: axiosError.code,
      correlationId: undefined,
    };
  }, [error]);
}
