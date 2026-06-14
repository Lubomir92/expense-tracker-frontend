import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!title.trim()) return;
    if (!amount || Number(amount) <= 0) return;

    try {
      setLoading(true);

      await addExpense({
        title: title.trim(),
        amount: Number(amount),
        category,
      });

      // reset až po úspechu
      setTitle("");
      setAmount("");
      setCategory("general");

    } catch (err) {
      console.error("ADD EXPENSE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded mb-6">
      <h2 className="text-xl mb-3">Add Expense</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <input
          className="p-2 rounded bg-slate-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <input
          className="p-2 rounded bg-slate-700"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />

        <select
          className="p-2 rounded bg-slate-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option value="general">general</option>
          <option value="food">food</option>
          <option value="transport">transport</option>
          <option value="shopping">shopping</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-3 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}