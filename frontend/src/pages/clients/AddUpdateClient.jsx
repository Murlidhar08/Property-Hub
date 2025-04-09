import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "@/utils/ReactToastify.js";
import clientService from "../../services/clientService";

export default function AddUpdateClientPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get client ID if updating
  const isEditing = Boolean(id);
  const [clientDetails, setClientDetails] = useState({
    name: "",
    contact: "",
    address: "",
    occupation: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!isEditing) return;

    clientService.getClientById(id)
      .then(data => {
        setClientDetails(data.client);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id, isEditing]);

  const handleChange = (e) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientDetails.name || !clientDetails.contact || !clientDetails.address || !clientDetails.occupation) {
      toast.error("All fields except Description are required!");
      return;
    }

    try {
      if (isEditing) {
        await clientService.updateClient(id, clientDetails);
        toast.success("Client updated successfully!");
      } else {
        await clientService.addClient(clientDetails);
        toast.success("Client added successfully!");
      }

      navigate("/clients");
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleReset = () => {
    setClientDetails({
      name: "",
      contact: "",
      address: "",
      occupation: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="px-6 pt-6 bg-white-100 min-h-screen w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div onClick={goBack} className="flex items-center text-blue-600 cursor-pointer hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          {isEditing ? "Client details" : "Clients List"}
        </div>
        <h2 className="text-xl font-bold text-center flex-grow mr-28">{isEditing ? "Update" : "Add"} Client</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="flex items-center border-t pt-4 space-x-4">
          <img
            src={clientDetails?.image || "/images/user.png"}
            alt={clientDetails?.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-2xl font-semibold">{clientDetails?.name}</h3>
            <p className="text-gray-500">{clientDetails?.occupation}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 border-t pt-4">Client Name</label>
          <input
            type="text"
            name="name"
            value={clientDetails.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={clientDetails.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={clientDetails.occupation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={clientDetails.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <textarea
            name="description"
            value={clientDetails.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
          />
        </div>
      </form>

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
          {isEditing ? "Update" : "Add"} Client
        </button>
      </div>
    </div>
  );
}
