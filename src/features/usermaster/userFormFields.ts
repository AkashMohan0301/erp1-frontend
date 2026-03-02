import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { z } from "zod";
import { userSchema } from "./userSchema";
import { userSearchConfig } from "./userSearchConfig";
import { companySearchConfig } from "../company/companySearchConfig";

export type UserFormValues = z.infer<typeof userSchema>;

export const userFormFields: FormFieldConfig<UserFormValues>[] = [
  // GENERAL TAB
    {
    name: "userId",
    label: "Search User",
    type: "lookup",
    colSpan: 12,
    lookupConfig: userSearchConfig,
    disableInModes: ["ADD"],
    },
    {
  name: "companyId",
  label: "Company",
  type: "lookup",
  required: true,
  colSpan: 12,
  lookupConfig: companySearchConfig,
  disableInModes: ["VIEW"]
},
  {
    name: "loginId",
    label: "Login ID",
    type: "text",
    required: true,
  },
  {
    name: "userName",
    label: "User Name",
    type: "text",
    required: true,
  },
  {
    name: "userType",
    label: "User Role",
    type: "select",
    options: [
      { label: "Super User", value: "S" },
      { label: "Admin", value: "A" },
      { label: "Ordinary", value: "O" },
      { label: "External", value: "E" },
    ],
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

  // PASSWORD TAB
  {
    name: "password",
    label: "Password",
    type: "text",
    tab: "Password",
  },
  // 👇 Dummy tab markers for privilege sections

{
  name: "loginId", // dummy reuse (won't render if filtered properly)
  label: "",
  type: "text",
  tab: "Modules",
  hideInModes: ["ADD", "EDIT", "VIEW"], // hide field itself
},

{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Menus",
  hideInModes: ["ADD", "EDIT", "VIEW"],
},

{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Buttons",
  hideInModes: ["ADD", "EDIT", "VIEW"],
},

{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Dashboards",
  hideInModes: ["ADD", "EDIT", "VIEW"],
},
];