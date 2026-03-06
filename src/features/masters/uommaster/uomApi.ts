import { api } from "@/lib/api";

export const saveUom = async (data: any) => {
  const payload = {
    codeId: "UOM",
    codeValue: data.codeValue,
    codeDesc: data.codeDesc,
    remarks: data.remarks,
  };

  const res = await api.post("/genfixedcode/save", payload);
  return res.data.data;
};