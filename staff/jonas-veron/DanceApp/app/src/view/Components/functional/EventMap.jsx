import React from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

export default function EventMap({ center, events, coordinates, address }) {
  return (
    <MapContainer center={center} zoom={13} className="w-full h-96">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {coordinates ? (
        <Marker position={coordinates}>
          <Tooltip permanent>{address}</Tooltip>
        </Marker>
      ) : (
        events.map((event) => (
          <Marker key={event.id} position={event.location.coordinates}>
            <Popup>
              <strong>{event.name}</strong>
              <p>{event.location.address}</p>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  )
}
