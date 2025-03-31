import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/userSlice";
import authService from "../../services/authService";
import { Edit2 } from "lucide-react";

const AccountPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout
    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(logout());
            navigate("/login"); // Redirect to login page
        }
    };

    // Placeholder profile image if none is provided
    const profileImage = user.profilePicture || "/images/user.png";

    return (
        <div className="p-6 min-h-screen w-full flex justify-center bg-gray-50">
            <div className="w-full max-w-3xl">
                {/* Profile Card */}
                <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border border-gray-300"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-400">@{user.username || "User Name"}</p>
                        </div>
                    </div>

                    {/* Edit button */}
                    <button className="flex right-0 items-center gap-1 text-blue-500 hover:text-blue-700">
                        <Edit2 size={18} />
                        Edit
                    </button>
                </div>

                {/* Information Section */}
                <div className="bg-white shadow-md rounded-xl p-6 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-800">Information</h4>
                        <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                            <Edit2 size={18} />
                            Edit
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p className="text-sm text-gray-500">First Name</p>
                            <p>{user.firstName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Last Name</p>
                            <p>{user.lastName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">User name</p>
                            <p>{user.username || "Not provided"}</p>
                        </div>
                    </div>
                </div>


                {/* Logout Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
