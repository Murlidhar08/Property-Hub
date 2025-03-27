import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const NavLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar - dynamic width */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default NavLayout;
