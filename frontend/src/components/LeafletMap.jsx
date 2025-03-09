import React, { useState, useRef, useMemo, useCallback } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const center = {
  lat: 51.505,
  lng: -0.09,
};

const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <></>
    // <Marker
    //   draggable={draggable}
    //   eventHandlers={eventHandlers}
    //   position={position}
    //   ref={markerRef}
    // >
    //   <Popup minWidth={90}>
    //     <span onClick={toggleDraggable}>
    //       {draggable
    //         ? "Marker is draggable"
    //         : "Click here to make marker draggable"}
    //     </span>
    //   </Popup>
    // </Marker>
  );
};

const LeafletMap = () => {
  return (
    <></>
    // <MapContainer
    //   center={center}
    //   zoom={13}
    //   scrollWheelZoom={false}
    //   style={{ height: "500px", width: "100%" }}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <DraggableMarker />
    // </MapContainer>
  );
};

export default LeafletMap;
