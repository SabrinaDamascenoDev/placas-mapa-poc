import type { Placa } from "../types/placa"

interface PlacaModalProps {
  placa: Placa | null
  onClose: () => void
}

export function PlacaModal({
  placa,
  onClose,
}: PlacaModalProps) {
  if (!placa) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-xl text-white transition hover:bg-black/70"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Foto */}
        <img
          src={placa.foto}
          alt={placa.titulo}
          className="h-64 w-full object-cover"
        />

        {/* Conteúdo */}
        <div className="p-6">
          <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
            Placa
          </span>

          <h2 className="mt-3 text-xl font-semibold text-gray-900">
            {placa.titulo}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {placa.endereco}
          </p>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            {placa.descricao}
          </p>

          {/* Coordenadas */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Latitude
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {placa.latitude}
              </p>
            </div>

            <div className="rounded-lg border bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Longitude
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {placa.longitude}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}