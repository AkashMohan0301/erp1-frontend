import { api } from "@/lib/api";

export const privilegeApi = {
  setup: async () => {
    const res = await api.get("/privilege/setup");
    return res.data.data;
  },
};