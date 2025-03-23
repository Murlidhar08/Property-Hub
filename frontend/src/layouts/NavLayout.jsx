import { Outlet } from "react-router-dom";
import NavBar from "@/components/Navbar";

const NavLayout = () => {
  return (
    <div>
      {/* Main content area */}
      <div className="flex flex-row">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default NavLayout;
