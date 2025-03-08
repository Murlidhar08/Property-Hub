import { useState } from "react";
import { Search, Plus, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const clients = [
  {
    name: "Linnie Richardson",
    role: "Account Manager",
    email: "binhan628@gmail.com",
    phone: "(302) 555-0107",
  },
  {
    name: "Miguel Daniels",
    role: "Salon Owner",
    email: "tienlapspktnd@gmail.com",
    phone: "(629) 555-0129",
  },
  {
    name: "Rose Walker",
    role: "Account Manager",
    email: "nvt.isst.nute@gmail.com",
    phone: "(480) 555-0103",
  },
  {
    name: "Edwin Frank",
    role: "Account Manager",
    email: "manhhatk08@gmail.com",
    phone: "(405) 555-0128",
  },
  // Add more clients as needed
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link to="/requirements/add">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm flex items-center">
            <Plus className="mr-2" size={16} /> Add New
          </button>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Clients"
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center ml-5">
          <button
            className={`p-2 rounded-md ${view === "grid" ? "bg-gray-300" : "bg-gray-200"
              }`}
            onClick={() => setView("grid")}
          >
            <Grid size={20} />
          </button>
          <button
            className={`p-2 rounded-md ${view === "list" ? "bg-gray-300" : "bg-gray-200"
              }`}
            onClick={() => setView("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-4"
        }
      >
        {filteredClients.map((client, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold">{client.name}</h2>
            <p className="text-sm text-gray-500">{client.role}</p>
            <p className="text-sm mt-2">📧 {client.email}</p>
            <p className="text-sm">📞 {client.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
