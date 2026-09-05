"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="
      width: 25px;
      height: 25px;
      background: red;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    "></div>
  `,
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

function MapClick({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      onLocationSelect(lat, lng);
    },
  });

  return null;
}

const SalonMap = ({ position, onLocationSelect }) => {
  return (
    <MapContainer
      center={[41.3111, 69.2797]}
      zoom={12}
      style={{
        width: "100%",
        height: "400px",
        marginTop: "15px",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClick onLocationSelect={onLocationSelect} />

      {position && (
        <Marker
          position={[position.lat, position.lng]}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
};

export default SalonMap;