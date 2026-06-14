export default function ExpenseList({
  expenses,
  deleteExpense,
}) {
  if (!expenses?.length) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-center text-gray-400">
        <h2 className="text-xl mb-2">
          No expenses yet
        </h2>

        <p>Add your first expense above.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-5">
        Expenses
      </h2>

      <div className="space-y-3">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition"
          >
            <div>
              <p className="font-medium">
                {e.title}
              </p>

              <p className="text-sm text-gray-400 capitalize">
                {e.category}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">
                {e.amount} €
              </span>

              <button
                onClick={() => deleteExpense(e.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}