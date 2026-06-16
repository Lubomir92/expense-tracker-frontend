import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useExpenses } from "./hooks/useExpenses";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { token, login, logout, loading } = useAuth();

  const {
    expenses,
    total,
    categories,
    load,
    addExpense,
    deleteExpense,
  } = useExpenses();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) return;

    let active = true;

    const init = async () => {
      setReady(false);
      try {
        await load();
      } catch (e) {
        console.error(e);
      }
      if (active) setReady(true);
    };

    init();

    return () => {
      active = false;
    };
  }, [token, load]);

  if (!token) return <Login login={login} loading={loading} />;

  if (!ready) return <div className="text-white p-10">Loading...</div>;

  return (
    <>
      <Toaster position="top-right" />

      <Dashboard
        logout={logout}
        expenses={expenses}
        total={total}
        categories={categories}
        addExpense={addExpense}
        deleteExpense={deleteExpense}
      />
    </>
  );
}