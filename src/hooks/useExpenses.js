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

      setExpenses(Array.isArray(exp) ? exp : []);
      setTotal(Number(totalRes?.total_spent ?? 0));
      setCategories(cat && typeof cat === "object" ? cat : {});
    } catch (e) {
      console.error("LOAD ERROR:", e);
      toast.error("Failed to load expenses");
      setExpenses([]);
      setTotal(0);
      setCategories({});
    }
  }, []);

  // ---------------- ADD ----------------
  const addExpense = useCallback(async (data) => {
  try {
    await api.createExpense(data);

    // 🔥 IMPORTANT: force fresh reload
    const [exp, totalRes, cat] = await Promise.all([
      api.getExpenses(),
      api.getStatsTotal(),
      api.getStatsCategory(),
    ]);

    setExpenses(Array.isArray(exp) ? exp : []);
    setTotal(Number(totalRes?.total_spent ?? 0));
    setCategories(cat && typeof cat === "object" ? cat : {});

    toast.success("Expense added");
  } catch (e) {
    console.error("ADD ERROR:", e);
    toast.error("Failed to add expense");
  }
}, []);

  // ---------------- DELETE ----------------
  const deleteExpense = useCallback(async (id) => {
    try {
      await api.deleteExpense(id);
      await load(); // always sync backend
      toast.success("Expense deleted");
    } catch (e) {
      console.error("DELETE ERROR:", e);
      toast.error("Failed to delete expense");
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