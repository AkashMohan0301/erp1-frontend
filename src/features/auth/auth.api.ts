import { api } from "@/lib/api";
import type { LoginInput, LoginResponse, AuthContextResponse, UserUnit } from "./auth.types";

// --------------------
// LOGIN
// --------------------
export const login = async (data: LoginInput): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data.data; // unwrap ApiResponse
};

// --------------------
// LOGOUT
// --------------------
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// --------------------
// AUTH CONTEXT (me)
// --------------------
export const getAuthContext = async (): Promise<AuthContextResponse> => {
  const res = await api.get("/auth/me");
  return res.data.data; // unwrap ApiResponse
};

// --------------------
// CSRF
// --------------------
export const getCsrf = async (): Promise<any> => {
  const res = await api.get("/auth/csrf");
  return res.data.data;
};

// --------------------
// USER UNITS
// --------------------
export const getUserUnits = async (): Promise<UserUnit[]> => {
  const res = await api.get("/auth/units");
  return res.data.data;
};