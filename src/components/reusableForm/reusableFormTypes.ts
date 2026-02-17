import type { ZodSchema } from "zod";

export type FormMode = "CREATE" | "VIEW" | "EDIT";

export type FormFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "dynamic-select"
  | "lookup"
  | "textarea";

export interface FormFieldConfig<T> {
  name: keyof T & string;
  label: string;
  type: FormFieldType;

  tab?: string; // grouping
  required?: boolean;

  colSpan?: number;
  className?: string;

  options?: { label: string; value: string }[];

  endpoint?: string;
  dependsOn?: keyof T & string;

  lookupConfig?: any;
}

export interface FormProps<T> {
  fields: FormFieldConfig<T>[];
  heading?:string;
  initialValues: T;
  schema: ZodSchema<T>;
  onSubmit: (values: T) => Promise<any>;
  mode: FormMode;

  formClassName?: string;
  gridClassName?: string;
}
