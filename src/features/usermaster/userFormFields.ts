import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { z } from "zod";
import { userSchema } from "./userSchema";
import { userSearchConfig } from "./userSearchConfig";
import { companySearchConfig } from "../companymaster/companySearchConfig";

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
  label: "Company ID",
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
    disableInModes : ["VIEW"],
    required: true,
  },
  {
    name: "userName",
    label: "User Name",
    type: "text",
    disableInModes : ["VIEW"],
    required: true,
  },
  {
    name: "userType",
    label: "User Role",
    type: "select",
    disableInModes : ["VIEW"],
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
    disableInModes : ["VIEW"],
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
    type: "password",
    tab: "Password",
    disableInModes : ["VIEW"],
    colSpan :12
  },
    {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    tab: "Password",
    disableInModes : ["VIEW"],
    colSpan :12
  },

{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Companies",
  disableInModes : ["VIEW"],
  hideInModes: ["ADD", "EDIT", "VIEW"],
},
{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Privileges",
  disableInModes : ["VIEW"],
  hideInModes: ["ADD", "EDIT", "VIEW"],
},
{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Dashboards",
  disableInModes : ["VIEW"],
  hideInModes: ["ADD", "EDIT", "VIEW"],
},
];