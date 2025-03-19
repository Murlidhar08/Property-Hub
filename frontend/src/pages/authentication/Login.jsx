import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import authService from "@/services/authService"

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await authService.login({
        identifier, // Send either email or username
        password,
      });

      if (response.token) {
        localStorage.setItem("token", response.token); // Store token
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500); // Redirect after success
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mb-4"
        >
          <div className="bg-gray-200 p-3 rounded-full">
            <FiLogIn className="text-gray-600 text-2xl" />
          </div>
        </motion.div>
        <h2 className="text-xl font-semibold">Sign in with email or username</h2>
        <p className="text-gray-500 text-sm mt-1 mb-4">
          Enter your email or username to access your account.
        </p>

        <div className="space-y-3">
          <motion.input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            whileFocus={{ scale: 1.05 }}
          />
          <div className="text-right text-sm text-blue-500 cursor-pointer">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <motion.button
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
          <motion.button
            className="w-full py-2 rounded-lg font-medium hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register">Create account</Link>
          </motion.button>
        </div>

        <div className="my-4 text-gray-400 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm">Or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <motion.button
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGoogle className="text-red-500 text-xl" />
          </motion.button>
          <motion.button
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook className="text-blue-600 text-xl" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
