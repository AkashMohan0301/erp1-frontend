import { api } from "@/lib/api";

export const saveCountry = async (data: any) => {
  const payload = {
    codeId: "COUNTRY",
    codeValue: data.codeValue,
    codeDesc: data.codeDesc,
    remarks: data.remarks,
  };

  const res = await api.post("/genfixedcode/save", payload);
  return res.data.data;
};