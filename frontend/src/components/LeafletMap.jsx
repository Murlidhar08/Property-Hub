import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search } from "lucide-react";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LocationMarker = ({ onClick, readOnly = true }) => {
  useMapEvents({
    click(e) {
      if (readOnly) return;
      const { lat, lng } = e.latlng;
      onClick({ lat, lng });
    },
  });
  return null;
};

const MapController = ({ mapRef }) => {
  const map = useMap();
  mapRef.current = map;
  return null;
};

export default function LeafletMap({ onLocationSelect, readOnly = false }) {
  const [position, setPosition] = useState({ lat: 27.7172, lng: 85.324 });
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const mapRef = useRef(null);

  const handleMapClick = (coords) => {
    if (readOnly) return;
    setPosition(coords);
    onLocationSelect?.(coords);
  };

  const handleSearch = async () => {
    const query = searchRef.current.value;
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newCoords);
        onLocationSelect?.(newCoords);
        mapRef.current?.setView(newCoords, mapRef.current.getZoom());
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController mapRef={mapRef} />

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!readOnly && (
          <LocationMarker onClick={handleMapClick} readOnly={readOnly} />
        )}
        {position && (
          <Marker position={[position.lat, position.lng]} icon={markerIcon} />
        )}
      </MapContainer>

      {/* Search Toggle Button */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="absolute top-4 right-4 z-[9999] bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      {/* Search Field */}
      {showSearch && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-opacity duration-300 opacity-100">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search location..."
            className="outline-none bg-transparent w-64"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            {loading ? "Loading..." : "Go"}
          </button>
        </div>
      )}
    </div>
  );
}
