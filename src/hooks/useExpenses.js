import { useState, useCallback } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState({});

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
      toast.error("Load failed");

      setExpenses([]);
      setTotal(0);
      setCategories({});
    }
  }, []);

  const addExpense = useCallback(async (data) => {
    try {
      await api.createExpense(data);
      await load(); // always fresh sync
      toast.success("Added");
    } catch (e) {
      toast.error("Add failed");
    }
  }, [load]);

  const deleteExpense = useCallback(async (id) => {
    try {
      await api.deleteExpense(id);
      await load(); // always fresh sync
      toast.success("Deleted");
    } catch (e) {
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