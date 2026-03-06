import { z } from "zod";

export const stateSchema = z.object({
  parentCodeValue: z.string().min(1, "Country required"),
  codeValue: z.string().min(1, "State code required"),
  codeDesc: z.string().min(2, "State name required"),
  remarks: z.string().optional(),
});

export type StateFormValues = z.infer<typeof stateSchema>;