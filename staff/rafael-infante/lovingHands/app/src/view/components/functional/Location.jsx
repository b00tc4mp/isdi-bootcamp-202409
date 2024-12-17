import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet'
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
  console.debug('Map -> render')

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
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
            <Popup>
              <div className="flex flex-col items-center space-y-1">
                <img src={ad.files[0]} alt={ad.author.name} className="w-20 h-20 object-cover rounded-lg mb-1" />
                <h3 className="font-bold text-base">{ad.author.name}</h3>
                <p className="text-xs leading-tight">{ad.location.address}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${ad.location.coordinates[0]},${ad.location.coordinates[1]}`}
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
    </div>
  )
}
