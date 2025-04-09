import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import toast from "@/utils/ReactToastify.js";
import authService from '@/services/authService';

const UserVerified = () => {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            toast.error("Invalid verification link.");
            setLoading(false);
            navigate('/token-expired')
            return;
        }

        // Verify request
        authService.verifyAccount({ token })
            .then(data => {
                if (data.success) {
                    toast.success("Email verified successfully!");
                    setLoading(false);
                    localStorage.setItem('token', data.token);

                    // Hard refresh and navigate to dashboard
                    window.location.href = '/';
                }
                else navigate('/token-expired')
            })
            .catch(() => {
                navigate('/token-expired')
            })
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <img
                src={"/images/verified.svg"}
                alt="Verification Status"
                className="w-64 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {loading ? "Verifying..." : "Email Verified!"}
            </h1>
            <p className="text-lg text-gray-600">
                {loading
                    ? "Please wait while we verify your email..."
                    : "Your email has been successfully verified. You can now log in."}
            </p>

            <Link
                to="/login"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Back to Login
            </Link>
        </div>
    );
};

export default UserVerified;
