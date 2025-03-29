import { useState, useEffect } from "react";
import { Plus, Grid, List, MapPin, Ruler, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";
import requirementService from '@/services/requirementService';

export default function RequirementsPage() {
    const [requirements, setRequirements] = useState([]);
    const [search, setSearch] = useState("");
    const [view, setView] = useState("list");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching requirements
    useEffect(() => {
        requirementService.getAllRequirements()
            .then(data => {
                if (data.success) { setRequirements(data.requirements); }
                else { throw new Error(data.message || "Failed to fetch requirements."); }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Filter requirements based on search query
    const filteredRequirements = requirements.filter((req) =>
        req.location.toLowerCase().includes(search.toLowerCase()) ||
        req.clientName.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Requirements</h1>
                <Link to="/requirements/add">
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
                        placeholder="Search Requirements"
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
                <p className="text-center text-gray-500 mt-6">Loading requirements...</p>
            ) : error ? (
                <p className="text-center text-red-500 mt-6">{error}</p>
            ) : filteredRequirements.length > 0 ? (
                <div
                    className={
                        view === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            : "space-y-4"
                    }
                >
                    {filteredRequirements.map((req) => (
                        <Link key={req.id} to={`/requirements/${req.id}`} className="block">
                            <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition flex items-center space-x-4 hover:bg-gray-100">
                                {/* Requirement Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-semibold text-gray-800 truncate w-full flex items-center">
                                        {req.requirementType} - {req.title}
                                    </p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <MapPin size={16} /> <span className='truncate w-full'>{req.location}</span>
                                    </p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <Ruler size={16} /> <span className='truncate w-full'>{req.minMeasurement} - {req.maxMeasurement} {req.measurementType}</span>
                                    </p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <DollarSign size={16} /> <span className='truncate w-full'>{req.minPrice} - {req.maxPrice} {req.priceType}</span>
                                    </p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <User size={16} /> <span className='truncate w-full'>{req.clientName}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">No requirements found.</p>
            )}
        </div>
    );
}
