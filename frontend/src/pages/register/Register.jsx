import { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
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
          <div className="bg-gray-200 p-3 rounded-full">
            <FiUserPlus className="text-gray-600 text-2xl" />
          </div>
        </motion.div>
        <h2 className="text-xl font-semibold">Create an account</h2>
        <p className="text-gray-500 text-sm mt-1 mb-4">
          Sign up to start managing your workspace efficiently
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
          />
          <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800">
            Register
          </button>
          <div className="mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </motion.div>

        <div className="my-4 text-gray-400 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm">Or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
