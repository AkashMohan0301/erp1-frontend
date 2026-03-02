import type { LookupConfig } from "@/components/reusableFilter/GenericFilterTypes";
import type { UserSearchRow } from "./userTypes";

export const userSearchConfig: LookupConfig<UserSearchRow> = {
  title: "User Search",

  endpoint: "/usermaster/search",

  idField: "userId",

  fields: [
    {
      name: "loginId",
      label: "Login ID",
      type: "text",
    },
    {
      name: "userName",
      label: "User Name",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Registered", value: "R" },
        { label: "Active", value: "A" },
        { label: "Inactive", value: "I" },
      ],
    },
  ],

  columns: [
    { header: "ID", accessor: "userId" },
    { header: "Login ID", accessor: "loginId" },
    { header: "User Name", accessor: "userName" },
    { header: "Status", accessor: "status" },
  ],
};