import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";

export const stateFormFields: FormFieldConfig<any>[] = [
  {
    name: "parentCodeValue",
    label: "Country",
    type: "dynamic-select",
    endpoint: "/genfixedcode/COUNTRY",
    required: true,
    colSpan: 2,
  },
  {
    name: "codeValue",
    label: "State Code",
    type: "text",
    required: true,
  },
  {
    name: "codeDesc",
    label: "State Name",
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