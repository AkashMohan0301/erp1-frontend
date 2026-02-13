export interface ButtonNode {
  buttonId: number;
  name: string;
  fromRole: boolean;
  fromUser: boolean;
}

export interface MenuNode {
  menuId: number;
  label: string;
  parentMenuId?: number | null;
  buttons: ButtonNode[];
}

export interface ModuleNode {
  moduleId: string;
  moduleName: string;
  menus: MenuNode[];
}

export interface MenuAssignmentResponse {
  modules: ModuleNode[];
}

export interface SaveMenuAssignmentRequest {
  unitId: number;
  moduleIds: string[];
  permissions: {
    menuId: number;
    buttonId: number;
  }[];
}
