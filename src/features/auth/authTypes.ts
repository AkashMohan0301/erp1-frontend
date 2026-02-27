export type LoginInput = {
  subscriberId:number;
  username: string;
  password: string;
};

export interface UserCompany {
  companyId: number;
  companyName: string;
}


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

export interface UserCompany {
  companyId: number;
  companyName: string;
}

export interface AuthBootstrapResponse {
  user: {
    userId: number;
    username: string;
    companyId: number;
    unitId: number;
  };
  companies: UserCompany[];
  units: UserUnit[];
  menus: MenuNode[];
}