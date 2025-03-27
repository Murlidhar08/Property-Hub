import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Component
import NavBar from "@/components/Navbar";

const NavLayout = () => {
  return (
    <div>
      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main content area */}
      <div className="flex flex-row">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default NavLayout;
