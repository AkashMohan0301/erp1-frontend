import { api } from "@/lib/api";
import type { CompanyDto } from "./companyTypes";

export const companyApi = {
  save: async (data: CompanyDto): Promise<CompanyDto> => {
    const res = await api.post("/company", data);
    return res.data.data;
  },

  getById: async (id: number): Promise<CompanyDto> => {
    const res = await api.get(`/company/${id}`);
    return res.data.data;
  },
};