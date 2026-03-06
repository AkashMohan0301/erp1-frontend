import { z } from "zod";

export const uomSchema = z.object({
  codeValue: z.string().min(1, "UOM code required"),
  codeDesc: z.string().min(2, "UOM name required"),
  remarks: z.string().optional(),
});

export type UomFormValues = z.infer<typeof uomSchema>;