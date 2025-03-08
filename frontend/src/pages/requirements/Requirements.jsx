import { useState } from "react";
import { Plus, Grid, List } from "lucide-react";
import { Link } from "react-router-dom";

const requirements = [
    { id: 1, type: "Flat", location: "New York, NY", measurement: "1200 sq ft", priceRange: "20-30 Lakh" },
    { id: 2, type: "Agriculture", location: "Texas, USA", measurement: "4 Acres", priceRange: "15-25 Lakh" },
    { id: 3, type: "NonAgriculture", location: "California, USA", measurement: "5000 sq ft", priceRange: "1000-2000 Hundred" },
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
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-6">
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
                <div className="flex items-center ml-5">
                    <button
                        className={`p-2 rounded-md ${view === "grid" ? "bg-gray-300" : "bg-gray-200"}`}
                        onClick={() => setView("grid")}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        className={`p-2 rounded-md ${view === "list" ? "bg-gray-300" : "bg-gray-200"}`}
                        onClick={() => setView("list")}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* List/Grid View */}
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredRequirements.map((req) => (
                    <div key={req.id} className="bg-white p-4 rounded-lg shadow-md border">
                        <h2 className="text-lg font-semibold">{req.type}</h2>
                        <p className="text-sm text-gray-500">📍 {req.location}</p>
                        <p className="text-sm">📏 {req.measurement}</p>
                        <p className="text-sm">💰 {req.priceRange}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
