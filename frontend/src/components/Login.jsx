import { useState } from "react";
import { loginUser } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);
      localStorage.setItem("email", email);
      onLogin(res.username);
      navigate("/profile");
    } catch (err) {
      console.error("Login failed", err);
      setError(err?.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-300 font-[Orbitron] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 p-8 rounded-lg border border-cyan-500 shadow-[0_0_20px_#00ffff90] w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl text-lime-400 tracking-widest uppercase text-center">Login</h2>

        {error && (
          <div className="bg-red-900 text-rose-300 border border-rose-400 px-4 py-3 rounded text-center shadow-[0_0_12px_#ff005580] animate-pulse">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-black text-cyan-300 border border-cyan-500 focus:outline-none focus:border-lime-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black text-cyan-300 border border-cyan-500 focus:outline-none focus:border-lime-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-lime-400 text-black font-bold py-3 rounded shadow-[0_0_12px_#00ffff] transition-all duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
