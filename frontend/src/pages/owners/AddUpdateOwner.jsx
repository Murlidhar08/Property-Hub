import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "@/utils/ReactToastify.js";
import ownerService from "../../services/ownerService";

export default function AddUpdateOwnerPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get owner ID if updating
    const isEditing = Boolean(id);
    const [ownerDetails, setOwnerDetails] = useState({
        name: "",
        contact: "",
        address: "",
        email: "",
        image: "",
        description: "",
    });

    // Fetching owners
    useEffect(() => {
        if (!isEditing) return;

        ownerService.getOwnerById(id)
            .then(data => {
                setOwnerDetails(data.owner);
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    const handleChange = (e) => {
        setOwnerDetails({ ...ownerDetails, [e.target.name]: e.target.value });
    };

    const goBack = () => {
        navigate(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ownerDetails.name || !ownerDetails.contact || !ownerDetails.address || !ownerDetails.email) {
            toast.error("All fields except Description are required!");
            return;
        }

        try {
            if (isEditing) {
                await ownerService.updateOwner(id, ownerDetails);
                toast.success("Owner updated successfully!");
            } else {
                await ownerService.addOwner(ownerDetails);
                toast.success("Owner added successfully!");
            }

            navigate("/owners");
        } catch (err) {
            console.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    const handleReset = () => {
        setOwnerDetails({
            name: "",
            contact: "",
            address: "",
            email: "",
            image: "",
            description: "",
        });
    };

    return (
        <div className="px-6 pt-6 bg-white-100 min-h-screen w-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div onClick={goBack} className="flex items-center text-blue-600 cursor-pointer hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    {isEditing ? "Owner details" : "Owners List"}
                </div>
                <h2 className="text-xl font-bold text-center flex-grow mr-28">{isEditing ? "Update" : "Add"} Owner</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {/* Owner Image */}
                <div className="flex items-center border-t pt-4 space-x-4">
                    <img
                        src={ownerDetails?.image || "/images/owner.png"}
                        alt={ownerDetails?.name}
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">{ownerDetails?.name}</h3>
                        <p className="text-gray-500">{ownerDetails?.email}</p>
                    </div>
                </div>

                {/* Owner Name */}
                <div>
                    <label className="block text-sm font-medium mb-1 border-t pt-4">Owner Name</label>
                    <input
                        type="text"
                        name="name"
                        value={ownerDetails.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        required
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        value={ownerDetails.contact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={ownerDetails.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                        name="address"
                        value={ownerDetails.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
                        required
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                    <textarea
                        name="description"
                        value={ownerDetails.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
                    />
                </div>
            </form>

            {/* Buttons - Aligned Bottom Right */}
            <div className="flex justify-end space-x-2 pt-4 mt-auto bg-white py-4 w-full sticky bottom-0">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                >
                    {isEditing ? "Update" : "Add"} Owner
                </button>
            </div>
        </div>
    );
}