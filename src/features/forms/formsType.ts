export type FieldType =
  | "text"
  | "number"
  | "select"
  | "textarea";

/* =========================================================
   SELECT OPTION
========================================================= */

export type SelectOption = {
  label: string;
  value: string | number;
};

/* =========================================================
   UI CONFIG
========================================================= */

export interface FieldUIConfig {
  wrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  hidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

/* =========================================================
   DATA SOURCE (GENERIC + SAFE)
========================================================= */

export interface DataSourceConfig<
  T extends Record<string, any>
> {
  endpoint: string;

  // 🔥 only string keys allowed
  dependsOn?: (Extract<keyof T, string>)[];

  valueKey?: string;
  labelKey?: string;
}

/* =========================================================
   MAIN FIELD CONFIG (GENERIC)
========================================================= */

export interface FormFieldConfig<
  T extends Record<string, any>
> {
  name: Extract<keyof T, string>;   // 🔥 string-only keys

  label: string;
  type: FieldType;

  options?: SelectOption[];
  dataSource?: DataSourceConfig<T>;

  placeholder?: string;
  ui?: FieldUIConfig;

  editableOnEdit?: boolean;
}
