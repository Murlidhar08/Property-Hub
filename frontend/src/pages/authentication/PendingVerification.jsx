// Packages
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Services
import authService from '@/services/authService';

const PendingVerification = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleResendEmail = async () => {
        setLoading(true);

        try {
            // Email token
            const emailToken = localStorage.getItem('emailToken');

            // Resend verification email
            await authService.resendVerification(emailToken);

            toast.success("Verification email has been resent. Please check your inbox.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });

            localStorage.removeItem('emailToken');
            navigate('/login')
        } catch (error) {
            console.error("Failed to resend email. Please try again later.")
            // toast.error("Failed to resend email. Please try again later.", {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     theme: "colored",
            // });
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <img
                src="/images/user_not_verified.svg"
                alt="User Not Verified"
                className="w-64 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Not Verified</h1>
            <p className="text-lg text-gray-600">
                Your email has not been verified. <br />
                Please check your inbox and verify your email to proceed.
            </p>

            {/* Buttons Row */}
            <div className="flex gap-4 mt-6">
                {/* Resend Verification Email Button */}
                <button
                    onClick={handleResendEmail}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg shadow-md transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                >
                    {loading ? "Sending..." : "Resend Verification Email"}
                </button>

                {/* Go Back to Login Button */}
                <Link
                    to="/login"
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
                >
                    Go Back to Login
                </Link>
            </div>
        </div>
    );
};

export default PendingVerification;
