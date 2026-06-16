export default function Dashboard({
  logout,
  expenses,
  total,
  categories,
  addExpense,
  deleteExpense,
}) {
  const safeCategories =
    categories && typeof categories === "object"
      ? categories
      : {};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Expense Tracker</h1>
          <p className="text-gray-400">Track spending</p>
        </div>

        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-slate-800 p-5 rounded">
          <p>Total</p>
          <p className="text-2xl">{Number(total) || 0} €</p>
        </div>

        <div className="bg-slate-800 p-5 rounded">
          <p>Expenses</p>
          <p className="text-2xl">{expenses?.length || 0}</p>
        </div>

        <div className="bg-slate-800 p-5 rounded">
          <p>Categories</p>
          <p className="text-2xl">
            {Object.keys(safeCategories).length}
          </p>
        </div>

      </div>

      {/* LIST */}
      {expenses?.length > 0 && (
        <div>
          {/* form + list nechaj ako máš */}
        </div>
      )}
    </div>
  );
}