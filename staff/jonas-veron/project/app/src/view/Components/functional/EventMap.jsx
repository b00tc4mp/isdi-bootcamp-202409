import React from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import L from "leaflet"
import { userLocationIcon, eventLocationIcon } from "../../../assets/index.js"

const customUserLocationIcon = new L.Icon({
  iconUrl: userLocationIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -24],
})

const customEventLocationIcon = new L.Icon({
  iconUrl: eventLocationIcon,
  iconSize: [24, 24],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

export default function EventMap({ center, events, showUserMarker = true }) {
  return (
    <MapContainer center={center} zoom={7} className="w-full h-96">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {showUserMarker && (
        <Marker position={center} icon={customUserLocationIcon}>
          <Tooltip>
            <strong>Tu ubicación</strong>
          </Tooltip>
        </Marker>
      )}

      {events.map((event) => (
        <Marker
          key={event.id}
          position={event.location.coordinates}
          icon={customEventLocationIcon}
        >
          <Tooltip>
            <strong>{event.author.name}</strong>
            <p>{event.location.address}</p>
          </Tooltip>
          <Popup>
            <div className="flex flex-col items-center">
              <img
                src={event.images[0]}
                alt={event.author.name}
                className="w-28 h-28 object-cover rounded-lg mb-2"
              />
              <h3 className="text-sm">{event.author.name}</h3>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.coordinates[0]},${event.location.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Cómo llegar
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
