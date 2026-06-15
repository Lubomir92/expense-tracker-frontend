import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import CategoryChart from "./CategoryChart";
import ExpenseSkeleton from "./ExpenseSkeleton";

export default function Dashboard({
  logout,
  expenses,
  total,
  categories,
  addExpense,
  deleteExpense,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 transition-all duration-300">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Expense Tracker
          </h1>
          <p className="text-gray-400 mt-1">
            Track and analyze your spending
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg font-medium active:scale-95"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-3xl font-bold mt-2">
            {Number(total) || 0} €
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-gray-400 text-sm">Expenses</p>
          <p className="text-3xl font-bold mt-2">
            {expenses?.length ?? 0}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-gray-400 text-sm">Categories</p>
          <p className="text-3xl font-bold mt-2">
            {Object.keys(categories || {}).length}
          </p>
        </div>
      </div>

      {/* CHART + FORM */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <CategoryChart categories={categories} />
        <ExpenseForm addExpense={addExpense} />
      </div>

      {/* LIST / SKELETON */}
      {expenses?.length === 0 ? (
        <ExpenseSkeleton />
      ) : (
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      )}
    </div>
  );
}