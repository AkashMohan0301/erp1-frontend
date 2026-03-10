import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";

export const uomFormFields: FormFieldConfig<any>[] = [
  {
    name: "codeValue",
    label: "UOM Code",
    type: "text",
    uppercase: true,
    required: true,
  },
  {
    name: "codeDesc",
    label: "UOM Name",
    type: "text",
    required: true,
  },
  {
    name: "remarks",
    label: "Remarks",
    type: "textarea",
    colSpan: 2,
  },
];