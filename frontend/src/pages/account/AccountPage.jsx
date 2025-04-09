import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser } from "@/redux/slices/userSlice";
import { Edit2, X } from "lucide-react";

// Service
import authService from "@/services/authService";
import accountService from "@/services/accountService";
import toast from "@/utils/ReactToastify.js";

// Utils
import commonFunction from '@/utils/commonFunction';

const AccountPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [username, setUsername] = useState(user.username || "");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(logout());
            navigate("/login");
        }
    };

    const profileImage = selectedImage
        ? URL.createObjectURL(selectedImage)
        : commonFunction.getDocumentPath(user.profilePicture) || "/images/user.png";

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("files", file);

            // Upload Image
            await accountService.updateProfile(formData);
            setSelectedImage(file);
        }
    };

    const handleEditSave = async () => {
        try {
            const updatedUser = {
                firstName,
                lastName,
                username
            };
            await accountService.updateUser(updatedUser)
            dispatch(updateUser({ ...user, ...updatedUser }));
            toast.success('User information updated successfully.')
            setShowEditModal(false);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="p-6 min-h-screen w-full flex justify-center bg-gray-50">
            <div className="w-full max-w-3xl">
                {/* Profile Card */}
                <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <label htmlFor="profile-upload" className="cursor-pointer relative">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-16 h-16 rounded-full border border-gray-300 object-cover"
                                onError={(e) => { e.target.src = "/images/user.png" }}
                            />
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-400">@{user.username || "User Name"}</p>
                        </div>
                    </div>
                    <label htmlFor="profile-upload" className="flex items-center gap-1 text-blue-500 hover:text-blue-700 cursor-pointer">
                        <Edit2 size={18} />
                        Edit
                    </label>
                </div>

                {/* Information Section */}
                <div className="bg-white shadow-md rounded-xl p-6 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-800">Information</h4>
                        <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                            onClick={() => {
                                setFirstName(user.firstName || "");
                                setLastName(user.lastName || "");
                                setUsername(user.username || "");
                                setShowEditModal(true);
                            }}
                        >
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
                            <p className="text-gray-400 cursor-not-allowed">{user.email}</p>
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

                {/* Edit Info Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleEditSave}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
