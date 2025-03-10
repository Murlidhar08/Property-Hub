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
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.type ||
      !formData.location ||
      !formData.measurement ||
      !formData.priceRange ||
      !formData.client
    ) {
      alert("All fields are required!");
      return;
    }

    // Simulate storing data
    console.log("Requirement Added:", formData);

    // Redirect to Requirements Page
    navigate("/requirements");
  };

  const handleReset = () => {
    setFormData({
      type: "",
      location: "",
      measurement: "",
      priceRange: "",
      client: "",
      description: "",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Add New Requirement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requirement Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
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
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Measurement */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Measurement
            </label>
            <input
              type="text"
              name="measurement"
              value={formData.measurement}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Price Range
            </label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client Name
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
            ></textarea>
          </div>

          {/* Buttons - Aligned Bottom Right */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              Add Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
