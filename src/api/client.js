import axios from "axios";

export const client = axios.create({
  baseURL: "https://jwt-auth-api-2-6oo7.onrender.com",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});