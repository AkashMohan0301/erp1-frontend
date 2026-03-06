import { api } from "@/lib/api";

export const saveState = async (data: any) => {
  const payload = {
    codeId: "STATE",
    codeValue: data.codeValue,
    codeDesc: data.codeDesc,
    parentCodeId: "COUNTRY",
    parentCodeValue: data.parentCodeValue,
    remarks: data.remarks,
  };

  const res = await api.post("/genfixedcode/save", payload);
  return res.data.data;
};