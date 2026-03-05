import { api } from "@/lib/api";
import type { UserSavePayload } from "./userTypes";

export const userApi = {

  save: async (data: UserSavePayload): Promise<number> => {
    const res = await api.post("/usermaster", data);
    return res.data.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/usermaster/${id}`);
    return res.data.data;
    
  },
};