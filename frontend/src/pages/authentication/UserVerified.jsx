import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from '@/services/authService';

const UserVerified = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            toast.error("Invalid verification link.");
            setLoading(false);
            return;
        }

        const verifyUser = async () => {
            try {
                const data = await authService.verifyAccount({ token });

                if (data.success) {
                    setStatus("success");
                    toast.success("Email verified successfully!");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                setStatus("error");
            }
            setLoading(false);
        };

        verifyUser();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <img
                src={status === "success" ? "/images/verified.svg" : "/images/unverified.svg"}
                alt="Verification Status"
                className="w-64 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {loading
                    ? "Verifying..."
                    : status === "success"
                        ? "Email Verified!"
                        : "Verification Failed"}
            </h1>
            <p className="text-lg text-gray-600">
                {loading
                    ? "Please wait while we verify your email..."
                    : status === "success"
                        ? "Your email has been successfully verified. You can now log in."
                        : "The verification link is invalid or expired."}
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
