import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRequirementPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: "",
        location: "",
        measurement: "",
        priceRange: "",
        client: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.type || !formData.location || !formData.measurement || !formData.priceRange || !formData.client) {
            alert("All fields are required!");
            return;
        }

        // Simulate storing data
        console.log("Requirement Added:", formData);

        // Redirect to Requirements Page
        navigate("/requirements");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Add New Requirement</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Requirement Type */}
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-white text-sm"
                    >
                        <option value="">Select Type</option>
                        <option value="Flat">Flat</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="NonAgriculture">Non-Agriculture</option>
                    </select>

                    {/* Location */}
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Measurement */}
                    <input
                        type="text"
                        name="measurement"
                        placeholder="Measurement (e.g., 1200 sq ft)"
                        value={formData.measurement}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Price Range */}
                    <input
                        type="text"
                        name="priceRange"
                        placeholder="Price Range (e.g., 20-30 Lakh)"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Client Name */}
                    <input
                        type="text"
                        name="client"
                        placeholder="Client Name"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm"
                    >
                        Add Requirement
                    </button>
                </form>
            </div>
        </div>
    );
}
