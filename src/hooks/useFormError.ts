import { useMemo } from "react";
import axios from "axios";

interface NormalizedError {
  message: string;
  fieldErrors: Record<string, string[]>;
  code?: string;
}

export function useFormError(error: unknown): NormalizedError {
  return useMemo(() => {
    if (!error || !axios.isAxiosError(error)) {
      return {
        message: "",
        fieldErrors: {},
      };
    }

    const data = error.response?.data;

    // Ensure object
    if (data && typeof data === "object") {
      return {
        message: data.message ?? "",
        fieldErrors:
          data.details && typeof data.details === "object"
            ? data.details
            : {},
        code: data.code,
      };
    }

    return {
      message: "",
      fieldErrors: {},
    };
  }, [error]);
}
