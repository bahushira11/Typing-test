import { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMsg(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(formData.username, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cyan-300 font-[Orbitron] px-6">
      <div className="w-full max-w-md p-8 rounded-xl bg-neutral-900 border border-cyan-500 shadow-[0_0_20px_#00ffff80]">
        <h2 className="text-3xl font-bold text-center text-lime-400 mb-6 tracking-widest animate-pulse">
          SIGN UP
        </h2>

        {errorMsg && (
          <div className="bg-rose-800/30 text-rose-400 border border-rose-600 px-4 py-2 rounded-lg mb-4 shadow-[0_0_10px_#ff005580] text-sm tracking-wider text-center animate-pulse">
            ⚠ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-cyan-500 rounded-lg shadow-[0_0_10px_#00ffff40] focus:outline-none focus:border-lime-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-cyan-500 rounded-lg shadow-[0_0_10px_#00ffff40] focus:outline-none focus:border-lime-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-black border border-cyan-500 rounded-lg shadow-[0_0_10px_#00ffff40] focus:outline-none focus:border-lime-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-700 hover:bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_15px_#00ffff] transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-cyan-400">
          Already have an account?{" "}
          <a href="/login" className="text-lime-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
