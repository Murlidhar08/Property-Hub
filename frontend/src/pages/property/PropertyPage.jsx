import { useState, useEffect } from "react";
import { Plus, Grid, List, MapPin, Ruler, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import propertyService from "@/services/propertyService";
import commonFunction from '../../utils/commonFunction';

export default function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching properties
  useEffect(() => {
    propertyService.getAllProperties()
      .then(data => {
        if (data.success) { setProperties(data.properties); }
        else { throw new Error(data.message || "Failed to fetch properties."); }
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter properties based on search query
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Link to="/properties/add">
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
            placeholder="Search Properties"
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

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading properties...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : filteredProperties.length > 0 ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              to={`/properties/${property.id}`}
              className="block transform transition duration-300 hover:scale-[1.02]"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden relative border border-gray-200">

                {/* Status Label */}
                <div className="absolute left-0 top-0 h-8 w-8 z-10">
                  <div
                    className={`${property.status === "Selling" ? "bg-green-500" : "bg-blue-500"} absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-30px] top-[19px] w-[130px]`}>
                    {property.status}
                  </div>
                </div>

                {/* Image with Overlay */}
                <div className="relative">
                  <img
                    src={commonFunction.getDocumentPath(property.image) || "/images/property_image.png"}
                    alt={property.title}
                    className="w-full h-48 object-cover transition duration-300 hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">{property.title}</h2>

                  <p className="text-sm text-gray-500 flex items-center gap-1 truncate">
                    <MapPin className="h-4 w-4 text-gray-600" /> {property.address}
                  </p>

                  <p className="text-xl font-bold text-gray-900 mt-2">{property.price}</p>

                  <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
                    <span className="flex items-center gap-1">
                      <Ruler className="h-4 w-4 text-gray-600" />
                      {property.measurementValue} {property.measurementType}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4 text-gray-600" />
                      {property.pricePerUnit} {property.priceType}/{property.measurementType}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No properties found.</p>
      )
      }
    </div >
  );
}
