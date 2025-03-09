import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddUpdateAgentPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get agent ID if updating
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        area: "",
        image: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.contact || !formData.address || !formData.area) {
            alert("All fields are required!");
            return;
        }
        console.log(isEditing ? "Agent Updated:" : "New Agent Added:", formData);
        navigate("/agents");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{isEditing ? "Update" : "Add"} Agent</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Agent Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Agent Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Contact Number */}
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Area */}
                    <input
                        type="text"
                        name="area"
                        placeholder="Area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Profile Image URL */}
                    <input
                        type="text"
                        name="image"
                        placeholder="Profile Image URL (optional)"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm"
                    >
                        {isEditing ? "Update" : "Add"} Agent
                    </button>
                </form>
            </div>
        </div>
    );
}
