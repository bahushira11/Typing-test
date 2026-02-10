import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar({ user, onLogout }) {
  const linkClass = ({ isActive }) =>
    `relative px-3 py-1 font-semibold transition-all duration-300 ${
      isActive
        ? "text-lime-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-lime-400 after:rounded-full"
        : "text-cyan-300 hover:text-lime-400 hover:drop-shadow-[0_0_8px_#00FFAA]"
    }`;

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black border-b border-cyan-500 text-cyan-300 font-[Orbitron] px-6 py-4 shadow-[0_0_12px_#00ffff] fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <motion.h1
          whileHover={{ scale: 1.05, textShadow: "0px 0px 8px #00ffff" }}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          TYPECAST
        </motion.h1>

        <div className="flex space-x-6 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/typingtest" className={linkClass}>Typing Test</NavLink>
          <NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>

          {!user ? (
            <>
              <NavLink to="/signup" className={linkClass}>Signup</NavLink>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <span className="text-sm text-cyan-400">Hello, {user.name}</span>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#22d3ee",
                  boxShadow: "0px 0px 10px #22d3ee",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-cyan-700 px-3 py-1 rounded shadow-md text-sm"
              >
                Logout
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
