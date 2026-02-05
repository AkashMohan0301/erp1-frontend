import axios from "axios";
import { store } from "@/store";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const unitId = state.authContext?.unitId;

  // =========================
  // UNIT CONTEXT (ALL REQUESTS)
  // =========================
  if (unitId) {
    config.headers = config.headers ?? {};
    config.headers["X-UNIT-ID"] = unitId.toString();
  }

  // =========================
  // CSRF (NON-GET REQUESTS)
  // =========================
  const method = config.method?.toUpperCase();

  if (method && method !== "GET") {
    const match = document.cookie.match(/(?:^|; )csrf_token=([^;]+)/);

    if (match) {
      config.headers = config.headers ?? {};
      config.headers["X-CSRF-Token"] = decodeURIComponent(match[1]);
    }
  }

  return config;
});
