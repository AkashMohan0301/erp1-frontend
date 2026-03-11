import { useState, useRef, useEffect } from "react";
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

  // ⭐ holds latest reset baseline
  const initialValuesRef = useRef(initialValues);

  // ⭐ update baseline when initialValues change (ADD mode)
  useEffect(() => {
    initialValuesRef.current = initialValues;
    setValues(initialValues);
  }, [initialValues]);

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

  // ⭐ proper reset
  const reset = () => {
    setValues(initialValuesRef.current);
    setErrors({});
  };

  // ⭐ allow EDIT mode to set new baseline
  const setNewBaseline = (data: T) => {
    initialValuesRef.current = data;
    setValues(data);
    setErrors({});
  };

  const handleSubmit = async (): Promise<{
    hasError: boolean;
    fieldErrors?: Partial<Record<keyof T & string, string>>;
    message?: string;
  }> => {
    try {
      schema.parse(values);

      const response = await onSubmit(values);

      setErrors({});

      return {
        hasError: false,
        message: response?.message || "Success",
      };

    } catch (err: any) {
      if (err?.name === "ZodError") {
        const zodErrors = mapZodErrors<T>(err);
        setErrors(zodErrors);

        return { hasError: true, fieldErrors: zodErrors };
      }

      const backendErrors = err?.response?.data?.details;

      if (backendErrors) {
        const mapped = mapBackendErrors<T>(err);
        setErrors(mapped);

        return { hasError: true, fieldErrors: mapped };
      }

      return {
        hasError: true,
        message:
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      };
    }
  };

  return {
    values,
    errors,
    reset,
    setValues,
    setNewBaseline, // ⭐ important
    handleChange,
    handleSubmit,
  };
}