import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "@/redux/slices/userSlice";
import authService from "@/services/authService";

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data); // Get user from Redux

    useEffect(() => {
        const initializeAuth = async () => {
            if (user) return; // 🚀 Prevent API calls if user already exists in Redux

            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found. Redirecting to login.");
                navigate("/login");
                return;
            }

            try {
                const userData = await authService.getProfile(); // Fetch user details
                if (userData) {
                    dispatch(setUser(userData)); // Store user in Redux
                    dispatch(setToken(token)); // Store token in Redux
                    console.log("User authenticated:", userData);
                } else {
                    throw new Error("Invalid user");
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                localStorage.removeItem("token"); // Clear invalid token
                navigate("/login"); // Redirect to login if token is invalid
            }
        };

        initializeAuth();
    }, []); // 🚀 Runs ONLY ONCE when the app loads

    return null; // No UI, only logic
};

export default AuthInitializer;
