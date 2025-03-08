import { Outlet, useLocation } from "react-router-dom";
import NavBar from "@/components/Navbar";

const NavLayout = () => {
  const location = useLocation();

  // Define paths where Navbar should NOT appear
  const noNavPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/unauthorized",
    "/404",
    "/server-error",
  ];

  return (
    <div>
      {/* Main content area */}
      <div className="flex flex-row">
        {/* Show Navbar unless it's an authentication or error page */}
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default NavLayout;
