import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Configuración para evitar que los íconos desaparezcan
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Location({ coordinates, address }) {
  if (!coordinates || coordinates.length !== 2) {
    return <p>No location available</p>
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
        {/* Cargar el mapa base */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcador con Popup que muestra la dirección */}
        <Marker position={coordinates}>
          <Tooltip permanent>{address}</Tooltip>
        </Marker>
      </MapContainer>
    </div>
  )
}
