import { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
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
        <h2 className="text-xl font-semibold">Sign in with email</h2>
        <p className="text-gray-500 text-sm mt-1 mb-4">
          Make a new doc to bring your words, data, and teams together. For free
        </p>

        <div className="space-y-3">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Forgot password?
          </div>
          <motion.button
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
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
