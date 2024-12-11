import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from '../../../assets/gps.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [29, 35],
  iconAnchor: [12, 28],
  shadowSize: [20, 20],
  shadowAnchor: [12, 41],
})

export default function Location({ center, ads, showUserMarker = true }) {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {showUserMarker && (
          <Marker position={center} icon={customIcon}>
            <Tooltip permanent>
              <strong>You are here</strong>
            </Tooltip>
          </Marker>
        )}

        {ads.map((ad) => (
          <Marker key={ad.id} position={ad.location.coordinates}>
            <Tooltip permanent>
              <strong>{ad.author.name}</strong>
              <p>{ad.location.address}</p>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
