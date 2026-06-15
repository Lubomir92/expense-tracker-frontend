import { motion, AnimatePresence } from "framer-motion";

export default function ExpenseList({ expenses, deleteExpense }) {
  if (!expenses?.length) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No expenses yet. Add your first one 🚀
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 rounded">
      <h2 className="text-xl mb-4">Expenses</h2>

      <AnimatePresence>
        {expenses.map((e) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between items-center border-b border-slate-700 py-2"
          >
            <div>
              <p>{e.title}</p>
              <p className="text-sm text-gray-400">
                {e.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold">
                {e.amount} €
              </span>

              <button
                onClick={() => deleteExpense(e.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}