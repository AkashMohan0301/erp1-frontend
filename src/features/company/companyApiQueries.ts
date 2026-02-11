import { api } from "@/lib/api";
import type { CompanyDto } from "./companyTypes";

export const companyApiQueries = {
  getById: (id: number) => ({
    queryKey: ["company", id],
    queryFn: async (): Promise<CompanyDto> => {
      const res = await api.get(`/company/${id}`);
      return res.data.data;
    },
  }),
};
