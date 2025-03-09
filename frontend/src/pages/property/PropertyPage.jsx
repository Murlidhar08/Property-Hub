import { useState } from "react";
import { Plus, MapPin, Ruler, Grid, List, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Serenity Heights Villas",
    location: "Bogor Tengah",
    price: "$250,000",
    measurement: "4413 sq ft",
    status: "Sell",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Emerald Bay Residences",
    location: "Gunungkidul, Yogyakarta",
    price: "$320,000",
    measurement: "3500 sq ft",
    status: "Rent",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Palm Grove Estate",
    location: "Semarang Selatan",
    price: "$290,000",
    measurement: "4100 sq ft",
    status: "Sell",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function PropertyPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Link to="/properties/add">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm flex items-center">
            <Plus className="mr-2" size={16} /> Add New
          </button>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Property"
          className="w-full max-w-sm px-3 py-1.5 border rounded-md text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center ml-4 space-x-2">
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

      {/* Property Cards */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredProperties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="block"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden relative">
              {/* Status Label */}
              <span
                className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold text-white rounded-md ${
                  property.status === "Sell" ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {property.status}
              </span>

              {/* Image */}
              <img
                src={property.img}
                alt={property.name}
                className="w-full h-48 object-cover"
              />

              {/* Card Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{property.name}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                  <MapPin className="h-4 w-4" /> {property.location}
                </p>
                <p className="text-lg font-bold mt-2">{property.price}</p>
                <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" /> {property.measurement}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
