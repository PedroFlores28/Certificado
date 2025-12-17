"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VerificarPage() {
  const [certificateId, setCertificateId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    status: "success" | "error" | null
    message: string
  }>({ status: null, message: "" })
  const router = useRouter()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setVerificationResult({ status: null, message: "" })

    // Simular verificación
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // ID del certificado de muestra
    const validId = "123e4567-e89b-12d3-a456-426614174000"

    if (certificateId.trim() === validId) {
      setVerificationResult({
        status: "success",
        message: "Certificado válido y activo",
      })

      // Redirigir al certificado después de 2 segundos
      setTimeout(() => {
        router.push(`/certificado/${certificateId}`)
      }, 2000)
    } else {
      setVerificationResult({
        status: "error",
        message: "Certificado no encontrado o inválido",
      })
    }

    setIsVerifying(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
        <div className="text-center mb-8">
          <img src="/images/logo_upc_red.png" alt="Logo UPC" className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Verificar Certificado</h1>
          <p className="text-white/80 text-lg">Ingresa el ID único del certificado para verificar su autenticidad</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label htmlFor="certificateId" className="block text-white font-semibold mb-2">
              ID del Certificado
            </label>
            <input
              type="text"
              id="certificateId"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Ej: 123e4567-e89b-12d3-a456-426614174000"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-all font-mono text-sm"
              required
            />
          </div>

          {verificationResult.status && (
            <div
              className={`p-4 rounded-lg ${
                verificationResult.status === "success"
                  ? "bg-green-500/20 border-2 border-green-500/50 text-green-100"
                  : "bg-red-500/20 border-2 border-red-500/50 text-red-100"
              }`}
            >
              <p className="font-semibold">
                {verificationResult.status === "success" ? "✓" : "✗"} {verificationResult.message}
              </p>
              {verificationResult.status === "success" && (
                <p className="text-sm mt-2 text-green-200">Redirigiendo al certificado...</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
          >
            {isVerifying ? "Verificando..." : "Verificar Certificado"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm text-center mb-4">ID de ejemplo para prueba:</p>
          <button
            onClick={() => setCertificateId("123e4567-e89b-12d3-a456-426614174000")}
            className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono py-2 px-4 rounded transition-all"
          >
            123e4567-e89b-12d3-a456-426614174000
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}
