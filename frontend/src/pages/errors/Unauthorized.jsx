import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6">
      <img
        src="/images/error_403.jpg"
        alt="403 Forbidden"
        className="w-4/12 mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Hold Up!</h1>
      <p className="text-lg text-gray-600">
        Error 403: You don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
