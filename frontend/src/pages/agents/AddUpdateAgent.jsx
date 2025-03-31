import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

  const goBack = () => {
    navigate(-1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agentDetails.name || !agentDetails.contact || !agentDetails.address || !agentDetails.area) {
      toast.error("All fields except Description are required!");
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
      console.error(err.response?.data?.message || "Something went wrong!");
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
    <div className="px-6 pt-6 bg-white-100 min-h-screen w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div onClick={goBack} className="flex items-center text-blue-600 cursor-pointer hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          {isEditing ? "Agent details" : "Agents List"}
        </div>
        <h2 className="text-xl font-bold text-center flex-grow mr-28">{isEditing ? "Update" : "Add"} Agent</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Agent Image */}
        <div className="flex items-center border-t pt-4 space-x-4">
          <img
            src={agentDetails?.image || "/images/agent.png"}
            alt={agentDetails?.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-2xl font-semibold">{agentDetails?.name}</h3>
            <p className="text-gray-500">{agentDetails?.area}</p>
          </div>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-medium mb-1 border-t pt-4">Agent Name</label>
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

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={agentDetails.address}
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
            value={agentDetails.description}
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
          {isEditing ? "Update" : "Add"} Agent
        </button>
      </div>
    </div>
  );
}
