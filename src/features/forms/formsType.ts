export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "textarea"

export type SelectOption = {
  label: string
  value: string | number
}

export type FieldUIConfig = {
  wrapperClass?: string
  labelClass?: string
  inputClass?: string
  errorClass?: string

  hidden?: boolean
  disabled?: boolean
  readOnly?: boolean
}


export type FormFieldConfig = {
  name: string
  label: string
  type: FieldType

  ui?: FieldUIConfig

  // for select (static only in Step 3)
  options?: SelectOption[]

  placeholder?: string
  defaultValue?: any
}
