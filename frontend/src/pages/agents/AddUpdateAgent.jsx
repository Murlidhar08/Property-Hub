import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agentService from "../../services/agentService";

export default function AddUpdateAgentPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get agent ID if updating
  const isEditing = Boolean(id);
  const [agentDetails, setAgentDetails] = useState({
    name: "",
    contact: "",
    address: "",
    area: "",
    image: "",
    description: "",
  });

  // Fetching agents
  useEffect(() => {
    if (!isEditing) return;

    agentService.getAgentById(id)
      .then(data => {
        setAgentDetails(data.agent);
      })
      .catch(err => {
        console.error(err)
      })
  }, []);

  const handleChange = (e) => {
    setAgentDetails({ ...agentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agentDetails.name || !agentDetails.contact || !agentDetails.address || !agentDetails.area) {
      toast.error("All fields except Image & Description are required!");
      return;
    }

    try {
      if (isEditing) {
        await agentService.updateAgent(id, agentDetails);
        toast.success("Agent updated successfully!");
      } else {
        await agentService.addAgent(agentDetails);
        toast.success("Agent added successfully!");
      }

      navigate("/agents");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleReset = () => {
    setAgentDetails({
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
              value={agentDetails.name}
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
              value={agentDetails.contact}
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
              value={agentDetails.address}
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
              value={agentDetails.area}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image URL (Optional)</label>
            <input
              type="text"
              name="image"
              value={agentDetails.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
            <textarea
              name="description"
              value={agentDetails.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
            />
          </div>

          {/* Buttons - Aligned Bottom Right */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
              onClick={() => { navigate("/agents") }}
            >
              Back
            </button>
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