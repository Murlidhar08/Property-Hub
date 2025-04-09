// Packages
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Fence, Users, GraduationCap, AlbumIcon, UserRoundCheck, MinusIcon, PlusIcon } from "lucide-react";
import clsx from "clsx";
import { useSelector } from "react-redux";

// Utils
import commonFunction from '../utils/commonFunction';

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Properties", icon: Fence, path: "/properties" },
  { name: "Requirements", icon: AlbumIcon, path: "/requirements" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Agents", icon: GraduationCap, path: "/agents" },
  { name: "Owners", icon: UserRoundCheck, path: "/owners" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return (
    <div
      className={clsx(
        "h-screen bg-[#0A1624] text-white shadow-md flex flex-col transition-all duration-300 rounded-tr-2xl rounded-br-2xl",
        isOpen ? "w-60 p-4" : "w-16 p-2"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={clsx("text-xl font-bold", !isOpen && "hidden")}>PropertyHub</div>
        <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
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
            <Icon className={clsx("h-5 w-5", location.pathname.startsWith(path) ? "text-black" : "text-white")} />
            <span className={clsx(!isOpen && "hidden")}>{name}</span>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        <div
          className={clsx(
            "flex items-center gap-4 p-2 rounded-md cursor-pointer transition",
            location.pathname === "/account" ? "bg-white text-black" : "hover:bg-gray-700"
          )}
          onClick={() => navigate("/account")}
        >
          <img
            className="w-8 h-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={
              user.profilePicture
                ? `${commonFunction.getDocumentPath(user.profilePicture)}?t=${new Date().getTime()}`
                : "/images/user.png"
            }
            alt={user.username}
            onError={(e) => { e.target.src = "/images/user.png" }}
          />

          <span className={clsx(!isOpen && "hidden")}>Account</span>
        </div>
      </div>
    </div>
  );
}
