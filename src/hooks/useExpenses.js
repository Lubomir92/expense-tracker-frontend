import { useState, useCallback } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState({});

  // ---------------- LOAD ----------------
  const load = useCallback(async () => {
    try {
      const [exp, totalRes, cat] = await Promise.all([
        api.getExpenses(),
        api.getStatsTotal(),
        api.getStatsCategory(),
      ]);

      setExpenses(exp ?? []);
      setTotal(Number(totalRes?.total_spent ?? 0));
      setCategories(cat ?? {});
    } catch (e) {
      console.error(e);
      toast.error("Load failed");
    }
  }, []);

  // ---------------- ADD ----------------
  const addExpense = useCallback(async (data) => {
    try {
      await api.createExpense(data);
      await load(); // vždy sync z backendu
    } catch (e) {
      console.error(e);
      toast.error("Add failed");
    }
  }, [load]);

  // ---------------- DELETE ----------------
  const deleteExpense = useCallback(async (id) => {
    try {
      await api.deleteExpense(id);
      await load(); // vždy sync z backendu
    } catch (e) {
      console.error(e);
      toast.error("Delete failed");
    }
  }, [load]);

  return {
    expenses,
    total,
    categories,
    load,
    addExpense,
    deleteExpense,
  };
};