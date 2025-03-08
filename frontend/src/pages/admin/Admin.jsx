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
            className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <Icon className="h-5 w-5 text-white" />
            <span className={clsx(!isOpen && "hidden")}>{name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
          <Bell className="h-5 w-5 text-white" />
          <span className={clsx(!isOpen && "hidden")}>Notifications</span>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-700 cursor-pointer">
          <User className="h-5 w-5 text-white" />
          <span className={clsx(!isOpen && "hidden")}>Account</span>
        </div>
      </div>
    </div>
  );
}
