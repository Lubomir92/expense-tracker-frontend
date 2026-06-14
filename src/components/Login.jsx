// src/components/Login.jsx

import { useState } from "react";

export default function Login({ login, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl w-96">
        <h2 className="text-2xl mb-4 text-center">Expense Tracker</h2>

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-slate-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => login(email, password)}
          className="w-full bg-blue-500 p-2 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}