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
  colSpan: 2,
  lookupConfig: companySearchConfig,
},
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    required: true,
    colSpan: 2,
  },
  {
    name: "customerShortName",
    label: "Short Name",
    type: "text",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "A" },
      { label: "Inactive", value: "I" },
    ],
  },

  // =====================
  // Address Tab
  // =====================
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    colSpan: 2,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
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
  },
  {
    name: "countryCode",
    label: "Country",
    type: "select",
    required: true,
    options: [{ label: "India", value: "IN" }],
  },

  // =====================
  // Contact Tab
  // =====================
  {
    name: "contactNo",
    label: "Contact No",
    type: "text",
  },
  {
    name: "emailId",
    label: "Email",
    type: "text",
  },
];
