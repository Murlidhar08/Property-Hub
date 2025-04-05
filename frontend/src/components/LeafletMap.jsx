// src/components/LeafletMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet default icon issue in some builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LeafletMap({ center = [27.700769, 85.300140], zoom = 13, markerText = "Here I am!" }) {
  useEffect(() => {
    
  }, []);

  return (
    <div className="w-full h-96 rounded-lg shadow">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>{markerText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
