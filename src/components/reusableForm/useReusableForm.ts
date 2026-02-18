import { useState } from "react";
import type { ZodSchema } from "zod";
import { mapBackendErrors, mapZodErrors } from "./errorMapper";

export function useReusableForm<T>({
  initialValues,
  schema,
  onSubmit,
}: {
  initialValues: T;
  schema: ZodSchema<T>;
  onSubmit: (values: T) => Promise<any>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof T & string, string>>
  >({});

  const handleChange = (name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // 🔥 FIXED VERSION
  const handleSubmit = async (): Promise<{
    hasError: boolean;
    isFieldError?: boolean;
    message?: string;
  }> => {
    try {
      schema.parse(values);

      await onSubmit(values);

      setErrors({});
      return { hasError: false };

    } catch (err: any) {
      if (err?.name === "ZodError") {
        setErrors(mapZodErrors<T>(err));
        return { hasError: true, isFieldError: true };
      }

      const backendErrors = err?.response?.data?.details;

      if (backendErrors) {
        setErrors(mapBackendErrors<T>(err));
        return { hasError: true, isFieldError: true };
      }

      // General backend error
      return {
        hasError: true,
        isFieldError: false,
        message:
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      };
    }
  };


  return {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
  };
}
