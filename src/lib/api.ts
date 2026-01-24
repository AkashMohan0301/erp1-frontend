// src/lib/api.ts
import axios, { AxiosError } from "axios";
import type { ApiError, ApiResponse } from "@/types/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

/**
 * REQUEST interceptor
 * Attach access token if present
 */
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * RESPONSE interceptor
 * Normalize ALL errors into ApiError
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiError>) => {
    const originalRequest: any = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/refresh");

    /**
     * Handle 401 with refresh flow
     */
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post<ApiResponse<{ accessToken: string }>>(
          "/auth/refresh"
        );

        const newAccessToken = res.data.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(normalizeError(error));
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

/**
 * Converts AxiosError → ApiError
 */
function normalizeError(error: AxiosError<ApiError>): ApiError {
  if (error.response?.data) {
    return error.response.data;
  }

  return {
    correlationId: "unknown",
    code: "NETWORK_ERROR",
    message: "Unable to reach server",
  };
}
