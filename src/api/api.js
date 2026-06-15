import { client } from "./client";

export const api = {
  getExpenses: async () => {
    const res = await client.get("/expenses");
    return res.data ?? [];
  },

  createExpense: async (data) => {
    const res = await client.post("/expenses", data);
    return res.data;
  },

  deleteExpense: async (id) => {
    const res = await client.delete(`/expenses/${id}`);
    return res.data;
  },

  getStatsTotal: async () => {
    const res = await client.get("/stats/total");
    return res.data ?? { total_spent: 0 };
  },

  getStatsCategory: async () => {
    const res = await client.get("/stats/category");
    return res.data ?? {};
  },
};