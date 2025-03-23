import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Workflow,
  PenBoxIcon,
  // Bell,
  User,
  AlbumIcon,
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Properties", icon: Workflow, path: "/properties" },
  { name: "Requirements", icon: AlbumIcon, path: "/requirements" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Agents", icon: PenBoxIcon, path: "/agents" },
  // { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("Dashboard");

  // Update selected menu item when route changes
  useEffect(() => {
    const currentItem = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    setSelected(currentItem ? currentItem.name : "");
  }, [location.pathname]);

  const handleNavigation = (name, path) => {
    navigate(path);
  };

  return (
    <div
      className={clsx(
        "h-screen bg-[#0A1624] text-white shadow-md p-4 flex flex-col transition-all duration-300 rounded-tr-2xl rounded-br-2xl",
        isOpen ? "w-64" : "w-16 items-center"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={clsx("text-xl font-bold", !isOpen && "hidden")}>
          PropertyHub
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md focus:outline-none"
        >
          {isOpen ? "➖" : "➕"}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 mt-8">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <div
            key={name}
            className={clsx(
              "flex items-center gap-4 p-3 rounded-md cursor-pointer transition",
              selected == name
                ? "bg-white text-black"
                : "hover:bg-gray-700"
            )}
            onClick={() => handleNavigation(name, path)}
          >
            <Icon
              className={clsx(
                "h-5 w-5",
                location.pathname.startsWith(path) ? "text-black" : "text-white"
              )}
            />
            <span className={clsx(!isOpen && "hidden")}>{name}</span>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto">
        {/* <div
          className={clsx(
            "flex items-center gap-4 p-3 rounded-md cursor-pointer transition",
            location.pathname === "/notifications"
              ? "bg-white text-black"
              : "hover:bg-gray-700"
          )}
          onClick={() => navigate("/notifications")}
        >
          <Bell
            className={clsx(
              "h-5 w-5",
              location.pathname === "/notifications"
                ? "text-black"
                : "text-white"
            )}
          />
          <span className={clsx(!isOpen && "hidden")}>Notifications</span>
        </div> */}
        <div
          className={clsx(
            "flex items-center gap-4 p-3 rounded-md cursor-pointer transition",
            location.pathname === "/account"
              ? "bg-white text-black"
              : "hover:bg-gray-700"
          )}
          onClick={() => navigate("/account")}
        >
          <User
            className={clsx(
              "h-5 w-5",
              location.pathname === "/account" ? "text-black" : "text-white"
            )}
          />
          <span className={clsx(!isOpen && "hidden")}>Account</span>
        </div>
      </div>
    </div>
  );
}
