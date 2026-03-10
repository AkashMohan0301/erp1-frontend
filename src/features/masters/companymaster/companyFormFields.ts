import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { CompanySchema } from "./companySchema";
import { companySearchConfig } from "./companySearchConfig";

export const companyFormFields: FormFieldConfig<CompanySchema>[] = [
  // =====================
  // General Tab
  // =====================
  {
  name: "companyId",
  label: "Company ID",
  type: "lookup",
  colSpan: 6,
  lookupConfig: companySearchConfig,
  disableInModes : ["ADD"]
  
},
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    required: true,
    colSpan: 6,
    disableInModes : ["VIEW"]
  },
  {
    name: "customerShortName",
    label: "Customer Short Name",
    type: "text",
    required: true,
    disableInModes : ["VIEW"]
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    colSpan: 6,
    disableInModes : ["VIEW"],
  },
  {
    name: "city",
    label: "City",
    type: "text",
    colSpan:6,
    required: true,
    disableInModes : ["VIEW"],
  },
  {
    name: "countryCode",
    label: "Country",
    type: "dynamic-select",
    required: true,
    endpoint: "/genfixedcode/COUNTRY",
    disableInModes: ["VIEW"],
    colSpan:4
  },
  {
    name: "stateCode",
    label: "State",
    type: "dynamic-select",
    required: true,
    endpoint: "/genfixedcode/STATE",
    dependsOn: "countryCode",
    parentCodeId: "COUNTRY",
    disableInModes: ["VIEW"],
     colSpan:4
  },
    {
    name: "pin",
    label: "PIN",
    type: "text",
    required: true,
    disableInModes : ["VIEW"],
     colSpan:4
  },

  {
    name: "contactNo",
    label: "Contact No",
    type: "text",
    colSpan:6,
    disableInModes : ["VIEW"]
  },
  {
    name: "emailId",
    label: "Email",
    type: "text",
    colSpan:6,
    disableInModes : ["VIEW"]
  },
    {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "A" },
      { label: "Inactive", value: "I" },
    ],
    disableInModes : ["VIEW"]
  },
];
