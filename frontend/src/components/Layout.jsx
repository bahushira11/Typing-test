
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-20 min-h-screen bg-black text-white">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
