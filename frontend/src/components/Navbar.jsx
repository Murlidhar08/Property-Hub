import { useState } from "react";
import {
  Home,
  Users,
  Workflow,
  Settings,
  Archive,
  Bell,
  User,
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Clients", icon: Users },
  { name: "Workflows", icon: Workflow },
  { name: "Templates", icon: Archive },
  { name: "Settings", icon: Settings },
  { name: "Archive", icon: Archive },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

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
      <nav className="flex-1 mt-8">
        {menuItems.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className={clsx(
              "flex items-center gap-4 p-3 rounded-md cursor-pointer",
              selected === name ? "bg-white text-black" : "hover:bg-gray-700"
            )}
            onClick={() => setSelected(name)}
          >
            <Icon
              className={clsx(
                "h-5 w-5",
                selected === name ? "text-black" : "text-white"
              )}
            />
            <span className={clsx(!isOpen && "hidden")}>{name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto">
        <div
          className={clsx(
            "flex items-center gap-4 p-3 rounded-md cursor-pointer",
            selected === "Notifications"
              ? "bg-white text-black"
              : "hover:bg-gray-700"
          )}
          onClick={() => setSelected("Notifications")}
        >
          <Bell
            className={clsx(
              "h-5 w-5",
              selected === "Notifications" ? "text-black" : "text-white"
            )}
          />
          <span className={clsx(!isOpen && "hidden")}>Notifications</span>
        </div>
        <div
          className={clsx(
            "flex items-center gap-4 p-3 rounded-md cursor-pointer",
            selected === "Account" ? "bg-white text-black" : "hover:bg-gray-700"
          )}
          onClick={() => setSelected("Account")}
        >
          <User
            className={clsx(
              "h-5 w-5",
              selected === "Account" ? "text-black" : "text-white"
            )}
          />
          <span className={clsx(!isOpen && "hidden")}>Account</span>
        </div>
      </div>
    </div>
  );
}
