export interface UserModulePrivilege {
  moduleId: string;
  companyId: number;
  unitId: number;
  role: "O" | "A" | "S";
  modulePriority: number;
}

export interface UserMenuPrivilege {
  menuId: number;
  moduleId: string;
  companyId: number;
  unitId: number;
}

export interface UserButtonPrivilege {
  menuId: number;
  moduleId: string;
  buttonId: string;
  companyId: number;
  unitId: number;
}

export interface UserDashboardPrivilege {
  dashboardId: number;
  companyId: number;
  unitId: number;
}

export interface UserSearchRow {
  userId: number;
  loginId: string;
  userName: string;
  status: string;
}
export interface UserSavePayload {
  userId?: number;
  loginId: string;
  userName: string;
  companyId: number;
  userType: "S" | "A" | "O" | "E";
  employeeId?: number;
  remarks?: string;
  status: "R" | "A" | "I";
  password?: string;

  modulePrivileges: UserModulePrivilege[];
  menuPrivileges: UserMenuPrivilege[];
  buttonPrivileges: UserButtonPrivilege[];
  dashboardPrivileges: UserDashboardPrivilege[];
}