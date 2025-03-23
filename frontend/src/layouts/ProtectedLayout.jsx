import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [location.pathname, navigate]);

    return localStorage.getItem("token") ? <Outlet /> : null;
};

export default ProtectedLayout;
