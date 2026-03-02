import { z } from "zod";

export const companySchema = z.object({
  companyId: z.number().optional(),

  companyName: z
    .string()
    .min(1, "Company Name is required"),

  address: z
    .string()
    .min(1, "Address is required"),

  city: z
    .string()
    .min(1, "City is required"),

  stateCode: z
    .string()
    .min(1, "State is required"),

  pin: z
    .string()
    .min(1, "PIN is required"),
     
  countryCode: z
    .string()
    .min(1, "Country is required"),

  customerShortName: z
    .string()
    .min(1, "Customer Short Name is required"),

  contactNo: z.string().optional(),

  emailId: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  status: z.string(),
});

export type CompanySchema =
  z.infer<typeof companySchema>;
