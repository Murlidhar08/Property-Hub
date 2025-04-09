// Packages
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "@/utils/ReactToastify.js";

// Services
import authService from "@/services/authService";

const GoolgeLogin = () => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                // Clear previous token
                localStorage.clear("token");

                // Call the login function with the authResult code
                const result = await authService.googleLogin(authResult.code);

                if (result.success) {
                    toast.success("Login successful! Redirecting...");

                    // Set token
                    if (result.token)
                        localStorage.setItem("token", result.token);

                    // navigate to dashboard with hard refresh
                    window.location.href = '/';
                }
                else if (result.message == 'pendingVerification') {
                    navigate("/pending-verification");
                }
                else if (result.message == 'pendingApproval') {
                    navigate("/pending-approval");
                }
            } else {
                toast.error("Login failed. Please try again.");
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <motion.button
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => googleLogin()}
        >
            <FaGoogle className="text-red-500 text-xl" />
        </motion.button>
    );
};

export default GoolgeLogin;