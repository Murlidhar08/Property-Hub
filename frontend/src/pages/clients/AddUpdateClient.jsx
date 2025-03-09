import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clientService from "../../services/clientService";

export default function AddUpdateClient({ clientData = null }) {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientData) {
      setClient({
        name: clientData.name || "",
        contact: clientData.contact || "",
        email: clientData.email || "",
        address: clientData.address || "",
        occupation: clientData.occupation || "",
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (clientData?.id) {
        // Update existing client
        await clientService.updateClient(clientData.id, client);
      } else {
        // Add new client
        await clientService.addClient(client);
      }
      navigate("/clients"); // Redirect to client list after success
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {clientData ? "Update Client" : "Add New Client"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={client.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Contact No.</label>
            <input
              type="tel"
              name="contact"
              value={client.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={client.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={client.occupation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
              onClick={() => setClient(clientData || { name: "", contact: "", email: "", address: "", occupation: "" })}
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : clientData ? "Update Client" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
