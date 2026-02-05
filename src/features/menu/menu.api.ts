import { api } from "@/lib/api";
import { MenuNode } from "./menu";

export const getMenus = async (): Promise<MenuNode[]> => {
  const res = await api.get("/auth/menus");
  return res.data.data; // unwrap ApiResponse
};
