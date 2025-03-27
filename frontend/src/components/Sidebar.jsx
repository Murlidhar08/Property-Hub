import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Fence, Users, GraduationCap, CircleUserRound, AlbumIcon } from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Properties", icon: Fence, path: "/properties" },
  { name: "Requirements", icon: AlbumIcon, path: "/requirements" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Agents", icon: GraduationCap, path: "/agents" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={clsx(
        "h-screen bg-[#0A1624] text-white shadow-md flex flex-col transition-all duration-300 rounded-tr-2xl rounded-br-2xl",
        isOpen ? "w-64 p-4" : "w-16 p-2"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={clsx("text-xl font-bold", !isOpen && "hidden")}>PropertyHub</div>
        <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none">
          {isOpen ? "➖" : "➕"}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 mt-8 space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <div
            key={name}
            className={clsx(
              "flex items-center gap-4 p-3 rounded-md cursor-pointer transition",
              location.pathname.startsWith(path) ? "bg-white text-black" : "hover:bg-gray-700"
            )}
            onClick={() => navigate(path)}
          >
            <Icon className="h-5 w-5 text-white" />
            <span className={clsx(!isOpen && "hidden")}>{name}</span>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <div
          className={clsx(
            "flex items-center gap-4 p-3 rounded-md cursor-pointer transition",
            location.pathname === "/account" ? "bg-white text-black" : "hover:bg-gray-700"
          )}
          onClick={() => navigate("/account")}
        >
          <CircleUserRound className="h-5 w-5 text-white" />
          <span className={clsx(!isOpen && "hidden")}>Account</span>
        </div>
      </div>
    </div>
  );
}
