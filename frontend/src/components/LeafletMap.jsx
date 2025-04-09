import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useRef, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search } from "lucide-react";

// Marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Helper: Validate coordinates
const isValidCoordinates = (coords) =>
  coords &&
  typeof coords.lat === "number" &&
  typeof coords.lng === "number" &&
  !isNaN(coords.lat) &&
  !isNaN(coords.lng);

// Helper: Validate zoom
const getValidZoom = (value, fallback = 10) =>
  typeof value === "number" && value >= 0 && value <= 22 ? value : fallback;

// Marker on map click
const LocationMarker = ({ onClick, readOnly = true }) => {
  const map = useMapEvents({
    click(e) {
      if (readOnly) return;
      const { lat, lng } = e.latlng;
      const zoom = map.getZoom();
      onClick({ lat, lng, zoom });
    },
  });
  return null;
};

// Access map instance
const MapController = ({ mapRef }) => {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
};

export default function LeafletMap({
  onLocationSelect,
  readOnly = false,
  zoom, // Optional prop
  coordinates, // Optional prop
}) {
  const fallbackCoordinates = { lat: 22.24421828559716, lng: 68.97302627563478 };
  const validCoordinates = isValidCoordinates(coordinates)
    ? coordinates
    : fallbackCoordinates;

  const initialZoom = getValidZoom(zoom, 14);

  const [position, setPosition] = useState(validCoordinates);
  const [chartZoom, setChartZoom] = useState(initialZoom);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const nextZoom = getValidZoom(zoom, 10);
    const nextCoords = isValidCoordinates(coordinates)
      ? coordinates
      : fallbackCoordinates;

    if (
      nextCoords.lat !== position.lat ||
      nextCoords.lng !== position.lng ||
      nextZoom !== chartZoom
    ) {
      setPosition(nextCoords);
      setChartZoom(nextZoom);
    }
  }, [coordinates, zoom]);

  const handleMapClick = ({ lat, lng, zoom }) => {
    if (readOnly) return;
    setPosition({ lat, lng });
    setChartZoom(zoom);
    onLocationSelect?.({ lat, lng, zoom });
  };

  const handleSearch = async () => {
    const query = searchRef.current.value;
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const result = data[0];
        const { lat, lon, boundingbox } = result;
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newCoords);

        if (boundingbox && mapRef.current) {
          const bounds = [
            [parseFloat(boundingbox[0]), parseFloat(boundingbox[2])],
            [parseFloat(boundingbox[1]), parseFloat(boundingbox[3])],
          ];
          mapRef.current.fitBounds(bounds);
        } else {
          mapRef.current.setView(newCoords, chartZoom);
        }

        const currentZoom = mapRef.current.getZoom();
        setChartZoom(currentZoom);
        onLocationSelect?.({ ...newCoords, zoom: currentZoom });
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
        zoom={chartZoom}
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
        {isValidCoordinates(coordinates) && (
          <Marker
            position={[position.lat, position.lng]}
            icon={markerIcon}
          />
        )}
      </MapContainer>

      <button
        type="button"
        onClick={() => setShowSearch(!showSearch)}
        className="absolute top-4 right-4 z-[9999] bg-white p-2 rounded-full shadow hover:scale-105 transition"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

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
            type="button"
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
