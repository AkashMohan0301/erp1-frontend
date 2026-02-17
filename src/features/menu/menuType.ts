export interface MenuNode {
  menuId: number;
  menuCode: string;
  label: string;
  route: string | null;
  privileges: string[];
  children: MenuNode[];
}


