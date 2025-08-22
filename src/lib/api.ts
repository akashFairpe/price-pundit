// Centralized API utilities
// In this environment, .env variables are not supported, so configure base URL here.

export const API_BASE_URL = "http://localhost:3000";

export const apiUrl = (path: string) => {
  const base = API_BASE_URL.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};
