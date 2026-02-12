export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "dynamic-select"
  | "lookup"
  | "textarea";

export type FormMode = "CREATE" | "VIEW" | "EDIT";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormFieldConfig<T = any> {
  name: keyof T & string;
  label: string;
  type: FieldType;

  placeholder?: string;
  required?: boolean;

  // Mode control
  editableOnEdit?: boolean; // default true
  hideOnView?: boolean;

  // Styling
  containerClassName?: string;
  inputClassName?: string;
  colSpan?: number;

  // Static select
  options?: SelectOption[];

  // Dynamic select
  endpoint?: string;
  dependsOn?: keyof T & string;

  // Lookup
  lookupConfig?: any;
}

export type FormErrors<T> = Partial<
  Record<keyof T & string, string>
>;
