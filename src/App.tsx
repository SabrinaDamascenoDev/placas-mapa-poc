import { useState } from "react"

import { PlacasMap } from "./components/MapLibre" 
import { PlacaModal } from "./components/PlacaModal"

import { placas } from "./data/placas"

import type { Placa } from "./types/placa"

function App() {
  const [placaSelecionada, setPlacaSelecionada] =
    useState<Placa | null>(null)

  return (
    <main className="flex h-screen flex-col bg-gray-50">
      <header className="flex h-20 shrink-0 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Mapa de Placas
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Visualização das placas cadastradas
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">
          {placas.length} placas
        </div>
      </header>

      <section className="min-h-0 flex-1">
        <PlacasMap
        placas={placas}
          onSelectPlaca={setPlacaSelecionada}
        />
      </section>

      <PlacaModal
        placa={placaSelecionada}
        onClose={() => setPlacaSelecionada(null)}
      />
    </main>
  )
}

export default App