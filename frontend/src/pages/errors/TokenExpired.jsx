import { Link } from "react-router-dom";

const UserVerified = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <img
                src={"/images/unverified.svg"}
                alt="Verification Status"
                className="w-64 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Verification Failed
            </h1>
            <p className="text-lg text-gray-600">
                The verification link is invalid or expired.
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
