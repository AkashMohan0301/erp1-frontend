import type { ApiError } from "@/types/api";

export function useFormError(error: unknown) {
  const apiError = error as ApiError | null;

  return {
    message: apiError?.message,
    fieldErrors: apiError?.details ?? {},
    code: apiError?.code,
    correlationId: apiError?.correlationId,
  };
}
