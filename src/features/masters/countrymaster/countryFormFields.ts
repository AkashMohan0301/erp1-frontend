import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";

export const countryFormFields: FormFieldConfig<any>[] = [
  {
    name: "codeValue",
    label: "Country Code",
    type: "text",
    required: true,
    uppercase: true,
  },
  {
    name: "codeDesc",
    label: "Country Name",
    type: "text",
    required: true,
  },
  {
    name: "remarks",
    label: "Remarks",
    type: "textarea",
  },
];