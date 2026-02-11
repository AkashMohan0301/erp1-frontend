import { api } from "@/lib/api";
import type { CompanyDto } from "./companyTypes";

export const companyApiMutations = {
  save: async (data: CompanyDto): Promise<CompanyDto> => {
    const res = await api.post("/company", data);
    return res.data.data;
  },
};
