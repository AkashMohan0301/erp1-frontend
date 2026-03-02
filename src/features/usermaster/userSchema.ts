import { z } from "zod";

export const userSchema = z.object({
  userId: z.number().optional(),

  loginId: z.string().min(1).max(50),

  userName: z.string().min(1).max(75),

  companyId: z.number().min(1, "Company is required"),

  userType: z.enum(["S", "A", "O", "E"]),

  employeeId: z.number().optional(),

  remarks: z.string().max(100).optional().or(z.literal("")),

  status: z.enum(["R", "A", "I"]),

  password: z.string().optional()
});