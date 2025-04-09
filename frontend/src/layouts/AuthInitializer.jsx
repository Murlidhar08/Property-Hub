// Packages
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { setUser, setToken } from "@/redux/slices/userSlice";

// Services
import authService from "@/services/authService";

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialized) return; // Prevent multiple API calls

        const initializeAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setInitialized(true);
                return;
            }
            try {
                // TODO PENDING: Prevent 2 API calls
                const res = await authService.getProfile();

                if (res.user) {
                    dispatch(setUser(res.user));
                    dispatch(setToken(token));
                }
                else if (res.message == 'pendingVerification')
                    navigate("/pending-verification");
                else if (res.message == 'pendingApproval') {
                    navigate("/pending-approval");
                    localStorage.removeItem("token"); // Remove token if user is not approved
                }
                else
                    navigate("/login");
            } catch (error) {
                navigate("/login"); // Redirect to login if token is invalid
            } finally {
                setInitialized(() => true); // Mark as initialized
            }
        };

        initializeAuth();
    }, [dispatch, navigate, initialized]); // Dependency array ensures it runs only once

    return null; // No UI, only logic
};

export default AuthInitializer;
