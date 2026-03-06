import { z } from "zod";

export const countrySchema = z.object({
  codeValue: z.string().min(2, "Country code required"),
  codeDesc: z.string().min(2, "Country name required"),
  remarks: z.string().optional(),
});

export type CountryFormValues = z.infer<typeof countrySchema>;