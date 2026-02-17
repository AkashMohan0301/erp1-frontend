export type LoginInput = {
  username: string;
  password: string;
};

export interface UserUnit {
  unitId: number;
  unitName: string;
}

export interface MenuNode {
  menuId: number;
  menuCode: string;
  label: string;
  route: string | null;
  privileges: string[];
  children: MenuNode[];
}

export interface AuthBootstrapResponse {
  user: {
    userId: number;
    username: string;
    companyId: number;
    unitId: number;
  };
  units: UserUnit[];
  menus: MenuNode[];
}
