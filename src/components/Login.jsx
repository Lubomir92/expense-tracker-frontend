import { useState } from "react";

export default function Login({ login, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("LOGIN CLICKED");
    console.log("email:", email);
    console.log("password:", password);

    if (typeof login !== "function") {
      console.error("LOGIN PROP IS NOT FUNCTION ❌", login);
      alert("Login function missing");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      console.error("LOGIN FAILED:", err);
      alert("Login error - check backend");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl w-96">

        <h2 className="text-2xl mb-4 text-center">
          Expense Tracker
        </h2>

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-slate-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 p-2 rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}