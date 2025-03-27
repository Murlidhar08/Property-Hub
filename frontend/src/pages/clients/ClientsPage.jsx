import { useState, useEffect } from "react";
import { Plus, Grid, List, MapPin, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import clientService from '../../services/clientService';

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [view, setView] = useState("list");

  // Fetch clients
  useEffect(() => {
    clientService.getAllClients()
      .then(response => {
        if (response.success) {
          setClients(response.clients);
        } else {
          throw new Error(response.message || "Failed to fetch clients.");
        }
      })
      .catch(error => console.error("Error fetching clients:", error));
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link to="/clients/add">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm flex items-center">
            <Plus className="mr-2" size={16} /> Add New
          </button>
        </Link>
      </div>

      <hr className="my-4" />

      {/* Search & View Toggle */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search Clients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-sm"
          />
        </div>
        <div className="flex items-center">
          <button
            className={`p-2 rounded-l-md ${view === "list" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("list")}
            title="List View"
          >
            <List size={20} />
          </button>
          <button
            className={`p-2 rounded-r-md ${view === "grid" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {/* Clients List */}
      {filteredClients.length > 0 ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-4"
          }
        >
          {filteredClients.map((client) => (
            <Link key={client.id} to={`/clients/${client.id}`} className="block">
              <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition flex items-center space-x-4 hover:bg-gray-100">
                {/* Client Image */}
                <img
                  src={client.image || "/images/user.png"}
                  alt={client.name}
                  className="w-20 h-20 rounded-full object-cover border shadow"
                />

                {/* Client Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-800 truncate w-full">{client.name || "Unknown"}</p>
                  <p className="flex items-center space-x-2 text-gray-600">
                    <User size={16} /> <span className='truncate w-full'>{client.occupation || "Not Specified"}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-600">
                    <MapPin size={16} /> <span className='truncate w-full'>{client.address || "Address Not Provided"}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-600">
                    <Phone size={16} /> <span className='truncate w-full'>{client.contact || "No Contact"}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No clients found.</p>
      )}
    </div>
  );
}
