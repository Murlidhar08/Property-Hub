import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search } from "lucide-react";

// Default marker fix for Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMarker = ({ onClick, setPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick({ lat, lng });
      setPosition({ lat, lng });
    },
  });

  return null;
};

const FlyToLocation = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      const currentZoom = map.getZoom(); // Get current zoom
      map.flyTo([coords.lat, coords.lng], currentZoom); // Use current zoom
    }
  }, [coords, map]);

  return null;
};

export default function LeafletMap({ onLocationSelect }) {
  const [position, setPosition] = useState({ lat: 27.7172, lng: 85.324 });
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCoords, setSearchedCoords] = useState(null);

  const handleMapClick = (coords) => {
    setPosition(coords);
    if (onLocationSelect) onLocationSelect(coords);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
      const data = await res.json();
      if (data?.length > 0) {
        const { lat, lon } = data[0];
        const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(coords);
        setSearchedCoords(coords);
        if (onLocationSelect) onLocationSelect(coords);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow">
      {/* Map container */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onClick={handleMapClick} setPosition={setPosition} />
        <Marker position={position} />
        {searchedCoords && <FlyToLocation coords={searchedCoords} />}
      </MapContainer>

      {/* Search toggle icon */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="bg-white shadow p-2 rounded-full hover:bg-gray-200 transition duration-200"
        >
          <Search className="text-gray-800" />
        </button>
      </div>

      {/* Search input */}
      <div className="absolute z-10 top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg">
        <div
          className={`transition-opacity duration-300 ${showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
            } bg-white shadow-md rounded-md px-3 py-2 flex gap-2 items-center`}
        >
          <input
            type="text"
            className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search location (e.g. Kathmandu)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
