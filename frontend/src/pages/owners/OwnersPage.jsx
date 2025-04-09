import { useState, useEffect } from "react";
import { Plus, Grid, List, Phone, Home } from "lucide-react";
import { Link } from "react-router-dom";
import ownerService from '@/services/ownerService';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setOwnerView } from "@/redux/slices/applicationSlice";

export default function OwnersPage() {
    const application = useSelector((state) => state.application);
    const dispatch = useDispatch();

    // States
    const [owners, setOwners] = useState([]);
    const [search, setSearch] = useState("");
    const [view, setView] = useState(application.ownerView);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching owners
    useEffect(() => {
        ownerService.getAllOwners()
            .then(data => {
                if (data.success) { setOwners(data.owners); }
                else { throw new Error(data.message || "Failed to fetch owners."); }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    // Filter owners based on search query
    const filteredOwners = owners.filter((owner) =>
        owner.name.toLowerCase().includes(search.toLowerCase())
    );

    // Handlers
    const handleViewChange = (viewName) => {
        setView(viewName);
        dispatch(setOwnerView(viewName));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Owners</h1>
                <Link to="/owners/add">
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
                        placeholder="Search Owners"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className={`p-2 rounded-l-md ${view === "list" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
                        onClick={() => handleViewChange("list")}
                        title="List View"
                    >
                        <List size={20} />
                    </button>
                    <button
                        className={`p-2 rounded-r-md ${view === "grid" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
                        onClick={() => handleViewChange("grid")}
                        title="Grid View"
                    >
                        <Grid size={20} />
                    </button>
                </div>
            </div>

            <hr className="my-4" />

            {/* Loading & Error Handling */}
            {loading ? (
                <p className="text-center text-gray-500 mt-6">Loading owners...</p>
            ) : error ? (
                <p className="text-center text-red-500 mt-6">{error}</p>
            ) : filteredOwners.length > 0 ? (
                <div
                    className={
                        view === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            : "space-y-4"
                    }
                >
                    {filteredOwners.map((owner) => (
                        <Link key={owner.id} to={`/owners/${owner.id}`} className="block">
                            <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition flex items-center space-x-4 hover:bg-gray-100">
                                {/* Owner Image */}
                                <img
                                    src={owner.image || "/images/owner.png"}
                                    alt={owner.name}
                                    className="w-20 h-20 rounded-full object-cover border shadow"
                                />

                                {/* Owner Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-semibold text-gray-800 truncate w-full">{owner.name}</p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <Phone size={16} /> <span className='truncate w-full'>{owner.contact}</span>
                                    </p>
                                    <p className="flex items-center space-x-2 text-gray-600">
                                        <Home size={16} /> <span className='truncate w-full'>{owner.address}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">No owners found.</p>
            )}
        </div>
    );
}