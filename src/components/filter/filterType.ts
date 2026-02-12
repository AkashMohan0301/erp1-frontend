export type LookupFieldType = "text" | "number" | "date" | "select";

export interface LookupField {
  name: string;
  label: string;
  type: LookupFieldType;
  options?: { label: string; value: string }[]; // for select
}

export interface LookupColumn<T> {
  header: string;
  accessor: keyof T;
}

export interface LookupConfig<T> {
  title: string;
  endpoint: string; // API endpoint
  idField: keyof T;
  fields: LookupField[];
  columns: LookupColumn<T>[];
}
