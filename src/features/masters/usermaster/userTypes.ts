export interface UserModulePrivilege {
  moduleId: string;
  companyId: number;
  role: "O" | "A" | "S";
  modulePriority: number;
}

export interface UserMenuPrivilege {
  menuId: number;
  moduleId: string;
  companyId: number;

}

export interface UserButtonPrivilege {
  menuId: number;
  moduleId: string;
  buttonId: string;
  companyId: number;
}

export interface UserDashboardPrivilege {
  dashboardId: number;
  companyId: number;
}

export interface UserSearchRow {
  userId: number;
  loginId: string;
  userName: string;
  status: string;
}
export interface UserCompanyPrivilege {
  companyId: number;
  companyName? :string;
  modulePrivileges: UserModulePrivilege[];
  menuPrivileges: UserMenuPrivilege[];
  buttonPrivileges: UserButtonPrivilege[];
  dashboardPrivileges: UserDashboardPrivilege[];
}

export interface UserSavePayload {
  userId?: number;
  loginId: string;
  userName: string;
  companyId: number; // default login company
  userType: "S" | "A" | "O" | "E";
  employeeId?: number;
  remarks?: string;
  status: "R" | "A" | "I";
  password?: string;
  confirmPassword?: string;

  companyPrivileges: UserCompanyPrivilege[];
}
