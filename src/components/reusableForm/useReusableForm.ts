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

  const handleSubmit = async () => {
    try {
      schema.parse(values);

      await onSubmit(values);

      setErrors({});
    } catch (err: any) {
      if (err.name === "ZodError") {
        setErrors(mapZodErrors<T>(err));
      } else {
        setErrors(mapBackendErrors<T>(err));
      }
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
