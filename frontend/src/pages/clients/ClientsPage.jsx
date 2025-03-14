import { useState } from "react";
import { Plus, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const clients = [
  {
    name: "Linnie Richardson",
    role: "Account Manager",
    email: "binhan628@gmail.com",
    area: "Downtown",
    phone: "(302) 555-0107",
    image: "/images/user.png",
  },
  {
    name: "Miguel Daniels",
    role: "Salon Owner",
    email: "tienlapspktnd@gmail.com",
    area: "Downtown",
    phone: "(629) 555-0129",
    image: "/images/user.png",
  },
  {
    name: "Rose Walker",
    role: "Account Manager",
    email: "nvt.isst.nute@gmail.com",
    area: "Downtown",
    phone: "(480) 555-0103",
    image: "/images/user.png",
  },
  {
    name: "Edwin Frank",
    role: "Account Manager",
    area: "Downtown",
    email: "manhhatk08@gmail.com",
    phone: "(405) 555-0128",
    image: "/images/user.png",
  },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
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
            name="Search Clients"
            placeholder="Search Clients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-sm"
          />
        </div>
        <div className="flex items-center">
          <button
            className={`p-2 rounded-md ${
              view === "grid" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            className={`p-2 rounded-md ${
              view === "list" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("list")}
            title="List View"
          >
            <List size={20} />
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
          {filteredClients.map((client, index) => (
            <Link key={index} to={`/clients/${index}`} className="block">
              <div className="bg-white p-4 rounded-lg border hover:shadow-lg transition flex items-center space-x-4">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{client.name}</h2>
                  <p className="text-sm text-gray-500">📍 {client.role}</p>
                  <p className="text-sm mt-2">📞 {client.phone}</p>
                  <p className="text-sm">🏠 {client.area}</p>
                </div>
              </div>

              {/* Sample */}
              {/* <div className="bg-white p-4 rounded-lg border hover:shadow-lg transition">
                <h2 className="text-lg font-semibold"></h2>
                <p className="text-sm text-gray-500"></p>
                <p className="text-sm mt-2">📧 {client.email}</p>
                <p className="text-sm">📞 </p>
              </div> */}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No clients found.</p>
      )}
    </div>
  );
}
