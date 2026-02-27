import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { CompanyFormValues } from "./companySchema";
import { companySearchConfig } from "./companySearchConfig";

export const companyFormFields: FormFieldConfig<CompanyFormValues>[] = [
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
    name: "stateCode",
    label: "State",
    type: "select",
    required: true,
    options: [
      { label: "Tamil Nadu", value: "TN" },
      { label: "Karnataka", value: "KA" },
    ],
    disableInModes : ["VIEW"],
     tab : "Address"
  },
  {
    name: "countryCode",
    label: "Country",
    type: "select",
    required: true,
    options: [{ label: "India", value: "IN" }],
    disableInModes : ["VIEW"],
     tab : "Address"
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
