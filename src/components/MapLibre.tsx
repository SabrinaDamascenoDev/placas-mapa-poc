import { useMemo, useState, useRef, useEffect, useCallback } from "react"
import Map, { Marker } from "react-map-gl/maplibre" 
import type { MapRef } from "react-map-gl/maplibre"
import useSupercluster from "use-supercluster"
import "maplibre-gl/dist/maplibre-gl.css"

import type { Placa } from "../types/placa"

const MAX_ZOOM = 24

const mapStyle = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap",
      maxzoom: 19, 
    },
  },
  layers: [
    {
      id: "osm-layer",
      type: "raster" as const,
      source: "osm",
      minzoom: 0,
      maxzoom: MAX_ZOOM,
    },
  ],
}

interface MapProps {
  placas: Placa[]
  onSelectPlaca: (placa: Placa) => void
}

export function PlacasMap({ placas, onSelectPlaca }: MapProps) {
  const mapRef = useRef<MapRef>(null)

  
  const [bounds, setBounds] = useState<[number, number, number, number] | undefined>(undefined)
  const [zoom, setZoom] = useState(15) 

  const points = useMemo(() => {
    return placas.map((placa) => ({
      type: "Feature" as const,
      properties: { cluster: false, placaId: placa.id, ...placa },
      geometry: {
        type: "Point" as const,
        coordinates: [Number(placa.longitude), Number(placa.latitude)],
      },
    }))
  }, [placas])

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { 
      radius: 60, 
      maxZoom: 21 
    },
  })

  const updateMapBounds = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap()
      const b = map.getBounds()
      setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()])
      setZoom(map.getZoom())
    }
  }, [])

  useEffect(() => {
    updateMapBounds()
  }, [updateMapBounds])

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -39.0157,
        latitude: -4.9714,
        zoom: 15,
      }}
      mapStyle={mapStyle}
      maxZoom={MAX_ZOOM}
      style={{ width: "100%", height: "100%", minHeight: "500px" }}
      onMoveEnd={updateMapBounds} 
      onZoomEnd={updateMapBounds}
      onLoad={updateMapBounds}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count: pointCount, placaId } = cluster.properties

        if (isCluster) {
          const size = pointCount >= 100 ? 56 : pointCount >= 50 ? 48 : 40
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation()

                if (!supercluster) return;
                
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id as number),
                  MAX_ZOOM
                )
                mapRef.current?.easeTo({
                  center: [longitude, latitude],
                  zoom: expansionZoom,
                  duration: 500,
                })
              }}
            >
              <div
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9999px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "3px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,.35)",
                  cursor: "pointer",
                }}
              >
                {pointCount}
              </div>
            </Marker>
          )
        }

        return (
          <Marker
            key={`placa-${placaId}`}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              const placa = cluster.properties as unknown as Placa
              onSelectPlaca(placa)
            }}
          >
            <img 
              src="/placa-marker.svg" 
              alt="Placa"
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))"
              }}
            />
          </Marker>
        )
      })}
      
    </Map>
  )
}