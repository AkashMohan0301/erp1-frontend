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

  loginId:   z.string().min(5,"Minimum 5 Characters is Required").max(50),

  userName:  z.string().min(1,"Username is required").max(75),

  companyId: z.number().min(1, "Company is required"),

  userType:   z.enum(["S", "A", "O", "E"]),

  employeeId: z.number().optional(),

  remarks: z.string().max(100).optional().or(z.literal("")),

  status: z.enum(["R", "A", "I"]),

password: z
  .string()
  .nullable()
  .optional()
  .transform(v => v ?? "")
  .refine(
    (val) =>
      val === "" ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val),
    {
      message:
        "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 number",
    }
  ),

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

export type UserFormValues = z.infer<typeof userSchema>;