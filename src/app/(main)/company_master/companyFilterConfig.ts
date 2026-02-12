import type { LookupConfig } from "@/components/filter/filtertype";
import type { CompanyDto } from "@/features/company/companyTypes";

export const companyLookupConfig = {
  title: "Company Search",
  endpoint: "/company/search",
  idField: "companyId",
  displayField: "companyName",

  fields: [
    { name: "companyName", label: "Name", type: "text" },
    { name: "city", label: "City", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "A" },
        { label: "Inactive", value: "I" },
      ],
    },
  ],

  columns: [
    { header: "ID", accessor: "companyId" },
    { header: "Name", accessor: "companyName" },
    { header: "City", accessor: "city" },
    { header: "Status", accessor: "status" },
  ],
};
