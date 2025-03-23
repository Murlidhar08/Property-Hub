import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PublicLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true }); // Redirect authenticated users to dashboard
        }
    }, [location.pathname, navigate]);

    return !localStorage.getItem("token") ? <Outlet /> : null;
};

export default PublicLayout;
