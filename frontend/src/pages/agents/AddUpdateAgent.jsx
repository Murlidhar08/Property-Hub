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
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.contact ||
      !formData.address ||
      !formData.area
    ) {
      alert("All fields except Image & Description are required!");
      return;
    }
    console.log(isEditing ? "Agent Updated:" : "New Agent Added:", formData);
    navigate("/agents");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      contact: "",
      address: "",
      area: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditing ? "Update" : "Add"} Agent
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image URL (Optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
            />
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
              {isEditing ? "Update" : "Add"} Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
