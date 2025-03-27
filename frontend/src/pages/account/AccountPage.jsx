import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/userSlice";
import authService from '../../services/authService';

const AccountPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logout
    const handleLogout = async () => {
        try {
            await authService.logout();
        }
        catch (err) { /* empty */ }
        finally {
            dispatch(logout());
            navigate("/login"); // Redirect to login page
        }
    };

    // Placeholder profile image if none is provided
    const profileImage = user['profilePicture'] || "/images/user.png";

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full flex justify-center">
            <div className="max-w-2xl w-full bg-white shadow-sm rounded-xl p-6">
                <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-purple-600 shadow-md"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.firstName} {user.lastName}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                </div>

                <hr className="my-4" />

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">First Name:</span>
                        <span className="text-gray-900">{user.firstName}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Last Name:</span>
                        <span className="text-gray-900">{user.lastName}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-900">{user.email}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Role ID:</span>
                        <span className="text-gray-900">{user.roleId}</span>
                    </div>
                </div>

                {/* Centered Logout Button */}
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
