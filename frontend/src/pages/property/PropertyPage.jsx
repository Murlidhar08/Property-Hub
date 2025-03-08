import { useState } from "react";
import { Plus, MapPin, Bed, Bath, Ruler, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Serenity Heights Villas",
    location: "Bogor Tengah",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Emerald Bay Residences",
    location: "Gunungkidul, Yogyakarta",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Palm Grove Estate",
    location: "Semarang Selatan",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  }
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
        <h1 className="text-2xl font-bold">Property</h1>
        <Link to="/properties/add">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm flex items-center">
            <Plus className="mr-2" size={16} /> Add New
          </button>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            name="Search Property"
            placeholder="Search Property"
            className="w-full px-3 py-1.5 border rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center ml-4">
          <button
            className={`p-2 rounded-md ${view === "grid" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            className={`p-2 rounded-md ${view === "list" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("list")}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {view === "grid" ? (
              <>
                <img src={property.img} alt={property.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{property.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {property.location}
                  </p>
                  <p className="text-lg font-bold mt-2">{property.price}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" /> 8
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" /> 2.5
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" /> 4413 sq ft
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center p-4 space-x-4">
                <img src={property.img} alt={property.name} className="w-32 h-32 object-cover rounded-md" />
                <div>
                  <h2 className="text-lg font-semibold">{property.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {property.location}
                  </p>
                  <p className="text-lg font-bold mt-2">{property.price}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" /> 8
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" /> 2.5
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" /> 4413 sq ft
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}