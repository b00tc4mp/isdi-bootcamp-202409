import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Location({ center, ads, coordinates, address }) {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates ? (
          <Marker position={coordinates}>
            <Tooltip permanent>{address}</Tooltip>
          </Marker>
        ) : (
          ads.map((ad) => (
            <Marker key={ad.id} position={ad.location.coordinates}>
              <Tooltip permanent>
                <strong>{ad.author.name}</strong>
                <p>{ad.location.address}</p>
              </Tooltip>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  )
}
