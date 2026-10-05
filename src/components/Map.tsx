import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import type { Placa } from "../types/placa"

interface MapProps {
  placas: Placa[]
  onSelectPlaca: (placa: Placa) => void
}

const MAX_ZOOM = 24

const placaIcon = new L.Icon({
  iconUrl: "/placa-marker.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  className: "marker-anim",
})

const createCustomClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount()
  const size = count >= 100 ? 56 : count >= 50 ? 48 : 40

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      border-radius:9999px;
      background:#2563eb;color:#fff;
      font-weight:600;font-size:14px;
      border:3px solid #fff;
      box-shadow:0 2px 8px rgba(0,0,0,.35);
    ">${count}</div>`,
    className: "marker-anim",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export function PlacasMap({ placas, onSelectPlaca }: MapProps) {
  return (
    <MapContainer
      center={[-4.9714, -39.0157]}
      zoom={15} 
      maxZoom={MAX_ZOOM} 
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={MAX_ZOOM} 
        maxNativeZoom={19} 
      />

      <MarkerClusterGroup
        chunkedLoading={true}
        iconCreateFunction={createCustomClusterIcon}
        maxClusterRadius={60} 
        showCoverageOnHover={false}
        disableClusteringAtZoom={21} 
        spiderfyOnMaxZoom={true} 
      >
        {placas.map((placa) => (
          <Marker
            key={placa.id}
            position={[placa.latitude, placa.longitude]}
            icon={placaIcon}
            eventHandlers={{
              click: () => onSelectPlaca(placa),
            }}
          >
            <Popup>
              <strong>{placa.titulo}</strong>
              <br />
              {placa.endereco}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}