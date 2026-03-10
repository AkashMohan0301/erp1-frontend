import type { FormFieldConfig } from "@/components/reusableForm/reusableFormTypes";
import type { z } from "zod";
import { userSchema } from "./userSchema";
import { userSearchConfig } from "./userSearchConfig";
import { companySearchConfig } from "../companymaster/companySearchConfig";
import { UserFormValues } from "./userSchema";


export const userFormFields: FormFieldConfig<UserFormValues>[] = [
  // GENERAL TAB
    {
    name: "userId",
    label: "User ID",
    type: "lookup",
    colSpan: 12,
    lookupConfig: userSearchConfig,
    disableInModes: ["ADD"],
    },
    {
  name: "companyId",
  label: "Default Company ID",
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
    colSpan:6
  },
  {
    name: "userName",
    label: "Username",
    type: "text",
    disableInModes : ["VIEW"],
    required: true,
    colSpan:6
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
    colSpan:6
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
    colSpan:6
  },

  // PASSWORD TAB
  {
    name: "password",
    label: "Password",
    type: "password",
    disableInModes : ["VIEW"],
    colSpan:6
  },
    {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    disableInModes : ["VIEW"],
    colSpan:6
  },

{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Company Privilege",
  disableInModes : ["VIEW"],
  hideInModes: ["ADD", "EDIT", "VIEW"],
},
{
  name: "loginId",
  label: "",
  type: "text",
  tab: "Menu Privilege",
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