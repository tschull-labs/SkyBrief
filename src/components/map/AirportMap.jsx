import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FLIGHT_CATEGORIES } from '../../constants/index.js'

function createMarkerIcon(category) {
  const color = FLIGHT_CATEGORIES[category]?.color ?? '#64748b'
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  })
}

function FlyToController({ lat, lon }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lon], 12, { duration: 1.2 })
  }, [lat, lon, map])
  return null
}

export default function AirportMap({ lat, lon, icao, flightCategory }) {
  const icon = createMarkerIcon(flightCategory)

  return (
    <div className="mx-4 mb-2">
      <div className="h-52 rounded-2xl overflow-hidden shadow-[var(--shadow-glass)]">
        <MapContainer
          center={[lat, lon]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <Marker position={[lat, lon]} icon={icon} />
          <FlyToController lat={lat} lon={lon} />
        </MapContainer>
      </div>
      <p className="text-[10px] text-slate-400 text-right mt-1 pr-1">
        © OpenStreetMap · CARTO
      </p>
    </div>
  )
}
