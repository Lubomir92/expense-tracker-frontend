import { useState, useCallback } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState({});

  // ---------------- LOAD ----------------
  const load = useCallback(async () => {
    const [exp, totalRes, cat] = await Promise.all([
      api.getExpenses(),
      api.getStatsTotal(),
      api.getStatsCategory(),
    ]);

    setExpenses(Array.isArray(exp) ? exp : []);
    setTotal(Number(totalRes?.total_spent ?? 0));
    setCategories(cat && typeof cat === "object" ? cat : {});
  }, []);

  // ---------------- ADD ----------------
  const addExpense = useCallback(async (data) => {
    try {
      await api.createExpense(data);

      // 🔥 FORCE FULL SYNC (IMPORTANT FIX)
      const [exp, totalRes, cat] = await Promise.all([
        api.getExpenses(),
        api.getStatsTotal(),
        api.getStatsCategory(),
      ]);

      setExpenses(Array.isArray(exp) ? exp : []);
      setTotal(Number(totalRes?.total_spent ?? 0));
      setCategories(cat && typeof cat === "object" ? cat : {});

      toast.success("Added");
    } catch (e) {
      toast.error("Add failed");
    }
  }, []);

  // ---------------- DELETE ----------------
  const deleteExpense = useCallback(async (id) => {
    try {
      await api.deleteExpense(id);

      // 🔥 FORCE FULL SYNC
      const [exp, totalRes, cat] = await Promise.all([
        api.getExpenses(),
        api.getStatsTotal(),
        api.getStatsCategory(),
      ]);

      setExpenses(Array.isArray(exp) ? exp : []);
      setTotal(Number(totalRes?.total_spent ?? 0));
      setCategories(cat && typeof cat === "object" ? cat : {});

      toast.success("Deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  }, []);

  return {
    expenses,
    total,
    categories,
    load,
    addExpense,
    deleteExpense,
  };
};