import axios from "axios";
import { API_BASE_URL } from "./config";
import { clearToken, getToken } from "@/app/login/auth.service";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== "undefined") {
        clearToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
