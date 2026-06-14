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

      setExpenses(exp ?? []);
      setTotal(Number(totalRes ?? 0));
      setCategories(cat ?? {});

    } catch (e) {
      console.error(e);
      toast.error("Load failed");
    }
  }, []);

  const addExpense = useCallback(async (data) => {
    await api.createExpense(data);
    await load(); // OK
  }, [load]);

  const deleteExpense = useCallback(async (id) => {
    await api.deleteExpense(id);
    await load();
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