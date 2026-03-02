import { ReactNode } from "react";
import type { ZodSchema } from "zod";

export type FormMode = "ADD" | "VIEW" | "EDIT";

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
  parentCodeId?: string;

  lookupConfig?: any;
 
  onValueChange?: (field: keyof T, value: any) => void;
  externalData?: Partial<T>;

  hideInModes?: FormMode[];
  disableInModes?: FormMode[];
  hideFilterInModes?: FormMode[];

}

export interface FormProps<T> {
  fields: FormFieldConfig<T>[];
  heading?:string;
  initialValues: T;
  schema: ZodSchema<T>;
  onSubmit: (values: T) => Promise<any>;
  mode: FormMode;

  onValueChange?: (field: keyof T, value: any) => void;
  externalData?: Partial<T>;

  formClassName?: string;
  gridClassName?: string;

  loadingActions?: string[];
disabledActions?: string[];

  // ✅ ADD THIS
  children?: (tab: string) => ReactNode;

}
