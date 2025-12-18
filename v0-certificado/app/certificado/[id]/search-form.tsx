"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface CertificateSearchFormProps {
  initialId?: string
}

export default function CertificateSearchForm({ initialId = "" }: CertificateSearchFormProps) {
  const [certificateId, setCertificateId] = useState(initialId)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (certificateId.trim()) {
      setIsLoading(true)
      router.push(`/certificado/${certificateId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center border border-white/20 max-w-md w-full">
        <div className="mb-8">
          <img 
            src="/images/logo_upc_red.png" 
            alt="Logo UPC" 
            className="h-16 w-auto mx-auto mb-6" 
          />
          <h1 className="text-3xl font-bold text-white mb-4">
            Genera tu certificado
          </h1>
          <p className="text-white/80 mb-6">
            Ingresa el ID del estudiante para ver su certificado.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="certificate-id" className="block text-white/80 text-sm mb-2 text-left">
              Buscar otro certificado:
            </label>
            <input
              id="certificate-id"
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Ingresa el ID del certificado"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <p className="text-white/60 text-xs mt-2 text-left">
              Puedes usar el UUID completo o el ID UPC (ejemplo: 201817361)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !certificateId.trim()}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            {isLoading ? "Buscando..." : "Buscar Certificado"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm mb-2">
            Ejemplo de ID:
          </p>
          <p className="text-white/80 text-xs font-mono bg-white/10 px-4 py-2 rounded break-all">
            c6e805fa-5f9c-4050-9142-f0271469891b
          </p>
          <p className="text-white/60 text-xs mt-2">
            o ID UPC: 201817361
          </p>
        </div>

        <a
          href="/"
          className="inline-block mt-6 text-white/80 hover:text-white text-sm underline"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}

