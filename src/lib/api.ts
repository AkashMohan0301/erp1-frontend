import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();

  if (method && method !== "GET") {
    const match = document.cookie.match(/(?:^|; )csrf_token=([^;]+)/);

    if (match) {
      config.headers["X-CSRF-Token"] = decodeURIComponent(match[1]);
    }
  }

  return config;
});