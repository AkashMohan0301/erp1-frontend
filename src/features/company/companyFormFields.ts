import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { CompanySchema } from "./companySchema";
import { companySearchConfig } from "./companySearchConfig";

export const companyFormFields: FormFieldConfig<CompanySchema>[] = [
  // =====================
  // General Tab
  // =====================
  {
  name: "companyId",
  label: "Search Company",
  type: "lookup",
  colSpan: 12,
  lookupConfig: companySearchConfig,
  disableInModes : ["ADD"]
  
},
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    required: true,
    colSpan: 2,
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
    colSpan: 2,
    disableInModes : ["VIEW"],
    tab : "Address"
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
    disableInModes : ["VIEW"],
     tab : "Address"
  },
  {
    name: "countryCode",
    label: "Country",
    type: "dynamic-select",
    required: true,
    endpoint: "/genfixedcode/COUNTRY",
    disableInModes: ["VIEW"],
    tab: "Address",
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
    tab: "Address",
  },
    {
    name: "pin",
    label: "PIN",
    type: "text",
    required: true,
    disableInModes : ["VIEW"],
     tab : "Address"
  },

  {
    name: "contactNo",
    label: "Contact No",
    type: "text",
    disableInModes : ["VIEW"]
  },
  {
    name: "emailId",
    label: "Email",
    type: "text",
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
