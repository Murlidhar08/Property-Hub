import { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle registration
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Simulate API request (Replace with actual API call)
    console.log("User Registered:", { username, firstName, lastName, email });

    toast.success("Registration successful! Redirecting...");

    // Redirect to login page after 2 seconds
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        {/* Icon at the top */}
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

        {/* Header text */}
        <h2 className="text-xl font-semibold">Create an account</h2>
        <p className="text-gray-500 text-sm mt-1 mb-4">
          Sign up to start managing your workspace efficiently
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-3">
          {/* First Name & Last Name Fields (Side by Side) */}
          <div className="flex space-x-2">
            {/* First Name Input */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
              required
            />
            {/* Last Name Input */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
              required
            />
          </div>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            required
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
            required
          />

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800"
          >
            Register
          </button>

          {/* Link to Sign In */}
          <div className="mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Sign in
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="my-4 text-gray-400 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm">Or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Media Sign Up Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          {/* Google Sign-Up */}
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          {/* Facebook Sign-Up */}
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
