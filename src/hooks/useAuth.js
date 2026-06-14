import { useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const data = await api.login(email, password);

      if (!data.access_token) {
        toast.error("Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);

      toast.success("Logged in");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout, loading };
};