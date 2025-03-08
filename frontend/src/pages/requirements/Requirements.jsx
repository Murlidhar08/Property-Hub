import { useState } from "react";
import { Plus, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const requirements = [
    { id: 1, type: "Flat", location: "New York, NY", measurement: "1200 sq ft", priceRange: "20-30 Lakh", client: "John Doe" },
    { id: 2, type: "Agriculture", location: "Texas, USA", measurement: "4 Acres", priceRange: "15-25 Lakh", client: "Alice Smith" },
    { id: 3, type: "NonAgriculture", location: "California, USA", measurement: "5000 sq ft", priceRange: "1000-2000 Hundred", client: "David Brown" },
];

export default function RequirementsPage() {
    const [filters, setFilters] = useState({ type: "", location: "", measurement: "", priceRange: "" });
    const [view, setView] = useState("grid");

    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const filteredRequirements = requirements.filter((req) =>
        Object.keys(filters).every((key) =>
            filters[key] ? req[key].toLowerCase().includes(filters[key].toLowerCase()) : true
        )
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            {/* Title & Add Button */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Requirements</h1>
                <Link to="/requirements/add">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm flex items-center">
                        <Plus className="mr-2" size={16} /> Add New
                    </button>
                </Link>
            </div>

            <hr className="mb-4 border-gray-300" />

            {/* Filters & View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Filters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-1.5 border rounded-md bg-white text-sm"
                    >
                        <option value="">All Types</option>
                        <option value="Flat">Flat</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="NonAgriculture">Non-Agriculture</option>
                    </select>

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                    />

                    <input
                        type="text"
                        name="measurement"
                        placeholder="Measurement"
                        value={filters.measurement}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                    />

                    <input
                        type="text"
                        name="priceRange"
                        placeholder="Price Range"
                        value={filters.priceRange}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                    />
                </div>

                {/* View Toggle */}
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

            {/* List/Grid View */}
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredRequirements.map((req, index) => (
                    <Link key={index} to={`/requirements/${index}`} className="block">
                        <div key={req.id} className="bg-white p-4 rounded-lg hover:shadow-lg border">
                            <h2 className="text-lg font-semibold">{req.type}</h2>
                            <p className="text-sm text-gray-500">📍 {req.location}</p>
                            <p className="text-sm">📏 {req.measurement}</p>
                            <p className="text-sm">💰 {req.priceRange}</p>
                            <p className="text-sm font-semibold text-gray-700">👤 {req.client}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
