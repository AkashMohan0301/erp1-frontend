import type { ZodError } from "zod";

export function mapBackendErrors<T>(
  error: any
): Partial<Record<keyof T & string, string>> {
  const result: Partial<Record<keyof T & string, string>> = {};

  const details = error?.response?.data?.details;
  if (!details) return result;

  Object.entries(details).forEach(([key, messages]) => {
    result[key as keyof T & string] = (messages as string[])[0];
  });

  return result;
}

export function mapZodErrors<T>(
  zodError: ZodError
): Partial<Record<keyof T & string, string>> {
  const result: Partial<Record<keyof T & string, string>> = {};

  zodError.issues.forEach((err) => {
    if (err.path.length) {
      result[err.path[0] as keyof T & string] = err.message;
    }
  });

  return result;
}
