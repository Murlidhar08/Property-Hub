import { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "@/utils/ReactToastify.js";
import authService from "@/services/authService"; // Adjust based on project structure

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect to login if token is missing
    useEffect(() => {
        if (!token) {
            toast.error("Invalid or expired reset link.");
            navigate("/login");
        }
        else {
            // Verify token
            authService.verifyToken(token)
                .catch(res => {
                    if (!res.success)
                        navigate('/token-expired')
                });
        }
    }, []);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            toast.error("Both fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await authService.resetPassword({ token, password });
            toast.success(response.message || "Password reset successfully!");

            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center items-center mb-4"
                >
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-200 p-3 rounded-full"
                    >
                        <FiLock className="text-gray-600 text-2xl" />
                    </motion.div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-semibold"
                >
                    Create a New Password
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 text-sm mt-1 mb-4"
                >
                    Enter a new password to reset your account.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                >
                    <motion.input
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                    <motion.input
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    />
                    <motion.button
                        whileHover={!loading ? { scale: 1.05 } : {}}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                        onClick={handleResetPassword}
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-medium ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </motion.button>
                </motion.div>

                <div className="mt-4">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
