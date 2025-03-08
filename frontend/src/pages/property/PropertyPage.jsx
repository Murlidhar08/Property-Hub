import { useState } from "react";
import { Search, Plus, MapPin, Bed, Bath, Ruler } from "lucide-react";
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
  },
  {
    id: 4,
    name: "Golden Horizon Residences",
    location: "Malang Barat",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Sapphire Riverfront Villas",
    location: "Jakarta Selatan",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "Sunset Cliffside Homes",
    location: "Surabaya Timur",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    name: "Breeze Valley Residences",
    location: "Yogyakarta Utara",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 8,
    name: "Ocean Pearl Estate",
    location: "Tangerang Selatan",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 9,
    name: "Whispering Pines Retreat",
    location: "Medan Kota",
    price: "$250,000",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function PropertyPage() {
  const [search, setSearch] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col">
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
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Property"
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <hr className="my-4" />
      {/* Property List */}
      <div
        className="flex-1 overflow-y-auto p-6 bg-gray-100"      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={property.img}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
