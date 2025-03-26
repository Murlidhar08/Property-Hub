import { Link } from "react-router-dom";

const PendingApproval = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <img
                src="/images/pending_approval.svg"
                alt="Pending Approval"
                className="w-32 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Approval</h1>
            <p className="text-lg text-gray-600">
                Your account is awaiting admin approval. <br />
                You will be notified once your access is granted.
            </p>
            <Link
                to="/login"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Go Back to Login
            </Link>
        </div>
    );
};

export default PendingApproval;
