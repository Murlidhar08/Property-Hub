import { useState } from "react";
import { Plus, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const agents = [
  {
    name: "John Doe",
    contact: "(302) 555-0123",
    address: "123 Main St, Springfield",
    area: "Downtown",
    image: "/images/agent.png",
  },
  {
    name: "Alice Johnson",
    contact: "(629) 555-0456",
    address: "456 Elm St, Riverside",
    area: "Uptown",
    image: "/images/agent.png",
  },
  {
    name: "Robert Smith",
    contact: "(480) 555-0789",
    address: "789 Oak St, Lakeside",
    area: "Suburb",
    image: "/images/agent.png",
  },
  {
    name: "Emma Brown",
    contact: "(405) 555-0112",
    address: "321 Pine St, Hillside",
    area: "Countryside",
    image: "/images/agent.png",
  },
];

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Link to="/agents/add">
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
            name="Search Agents"
            placeholder="Search Agents"
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

      {/* Agents List */}
      {filteredAgents.length > 0 ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "space-y-4"
          }
        >
          {filteredAgents.map((agent, index) => (
            <Link key={index} to={`/agents/${index}`} className="block">
              <div className="bg-white p-4 rounded-lg border hover:shadow-lg transition flex items-center space-x-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-lg font-semibold">{agent.name}</h2>
                  <p className="text-sm text-gray-500">📍 {agent.area}</p>
                  <p className="text-sm mt-2">📞 {agent.contact}</p>
                  <p className="text-sm">🏠 {agent.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No agents found.</p>
      )}
    </div>
  );
}
