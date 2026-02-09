// path: src/lib/api.ts
import axios from "axios";
import { store } from "@/store";
import { clearAuthContext } from "@/store/authContextSlice";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/* ============================
   REQUEST INTERCEPTOR (YOURS)
============================ */
api.interceptors.request.use((config) => {
  const state = store.getState();
  const unitId = state.authContext?.unitId;

  // UNIT CONTEXT
  if (unitId) {
    config.headers = config.headers ?? {};
    config.headers["X-UNIT-ID"] = unitId.toString();
  }

  // CSRF (non-GET)
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

/* ============================
   RESPONSE INTERCEPTOR (ADD)
============================ */
let isRefreshing = false;
let pendingRequests: ((tokenRefreshed: boolean) => void)[] = [];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Queue requests while refresh is in progress
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((ok) => {
          ok ? resolve(api(originalRequest)) : reject(error);
        });
      });
    }

    isRefreshing = true;

    try {
      await api.post("/auth/refresh");

      // Resume queued requests
      pendingRequests.forEach((cb) => cb(true));
      pendingRequests = [];

      return api(originalRequest);
    } catch (refreshError) {
      pendingRequests.forEach((cb) => cb(false));
      pendingRequests = [];

      // 🔥 HARD LOGOUT
      store.dispatch(clearAuthContext());
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
