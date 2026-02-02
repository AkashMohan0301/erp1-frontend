import { api } from "@/lib/api";

export const login = (data: { username: string; password: string }) =>
  api.post("/auth/login", data);

export const logout = () =>
  api.post("/auth/logout");

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const getCsrf = async () => {
  const res = await api.get("/auth/csrf");
  return res.data;
};
