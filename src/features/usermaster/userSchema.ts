import { z } from "zod";


const userModulePrivilegeSchema = z.object({
  moduleId: z.string(),
  companyId: z.number(),
  role: z.enum(["O", "A", "S"]),
  modulePriority: z.number(),
});

const userMenuPrivilegeSchema = z.object({
  menuId: z.number(),
  moduleId: z.string(),
  companyId: z.number(),
});

const userButtonPrivilegeSchema = z.object({
  menuId: z.number(),
  moduleId: z.string(),
  buttonId: z.string(),
  companyId: z.number(),
});

const userDashboardPrivilegeSchema = z.object({
  dashboardId: z.number(),
  companyId: z.number(),
});

const userCompanyPrivilegeSchema = z.object({
  companyId: z.number(),

  modulePrivileges: z
    .array(userModulePrivilegeSchema)
    .default([]),

  menuPrivileges: z
    .array(userMenuPrivilegeSchema)
    .default([]),

  buttonPrivileges: z
    .array(userButtonPrivilegeSchema)
    .default([]),

  dashboardPrivileges: z
    .array(userDashboardPrivilegeSchema)
    .default([]),
});

export const userSchema = z.object({
  userId: z.number().optional(),

  loginId: z.string().min(1,"Login ID is required").max(50),

  userName: z.string().min(1,"Username is required").max(75),

  companyId: z.number().min(1, "Company is required"),

  userType: z.enum(["S", "A", "O", "E"]),

  employeeId: z.number().optional(),

  remarks: z.string().max(100).optional().or(z.literal("")),

  status: z.enum(["R", "A", "I"]),

password: z
  .string()
  .nullable()
  .optional()
  .transform(v => v ?? ""),

confirmPassword: z
  .string()
  .nullable()
  .optional()
  .transform(v => v ?? ""),

  companyPrivileges: z
    .array(userCompanyPrivilegeSchema)
    .optional()
    .default([]),

}
)  .refine(
    (data) => {
      // Only validate if password is provided
      if (data.password) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"], 
    },
  );
;