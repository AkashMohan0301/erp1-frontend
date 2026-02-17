// path: src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store";
import { clearAuthContext } from "@/store/authContextSlice";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const state = store.getState();
  const unitId = state.authContext?.unitId;

  // ----------------------------
  // UNIT CONTEXT HEADER
  // ----------------------------
  const unitMatch = document.cookie.match(
    /(?:^|; )activeUnitId=([^;]+)/
  );

  if (unitMatch) {
    config.headers["X-UNIT-ID"] = unitMatch[1];
  }

  // ----------------------------
  // CSRF HEADER (Non-GET)
  // ----------------------------
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
   RESPONSE INTERCEPTOR
============================ */

let isRefreshing = false;
let pendingRequests: ((success: boolean) => void)[] = [];

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const isLoginRequest =
      originalRequest.url?.includes("/auth/login");

    const isRefreshRequest =
      originalRequest.url?.includes("/auth/refresh");

    // ---------------------------------------------------
    // DO NOT REFRESH:
    // - If not 401
    // - If already retried
    // - If login endpoint
    // - If refresh endpoint
    // ---------------------------------------------------
    if (
      status !== 401 ||
      originalRequest._retry ||
      isLoginRequest ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ---------------------------------------------------
    // If refresh already running → queue request
    // ---------------------------------------------------
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((success) => {
          success
            ? resolve(api(originalRequest))
            : reject(error);
        });
      });
    }

    isRefreshing = true;

    try {
      // Attempt token refresh
      await api.post("/auth/refresh");

      // Resume queued requests
      pendingRequests.forEach((cb) => cb(true));
      pendingRequests = [];

      return api(originalRequest);
    } catch (refreshError) {
      // Fail all queued requests
      pendingRequests.forEach((cb) => cb(false));
      pendingRequests = [];

      // HARD LOGOUT
      store.dispatch(clearAuthContext());
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
