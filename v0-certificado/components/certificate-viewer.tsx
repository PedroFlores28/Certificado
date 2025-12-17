"use client"

import { useRef, useState } from "react"

interface Certificate {
  id: string
  nombre_completo: string
  dni: string
  motivo_emision: string
  clasificacion: string
  mensaje_agradecimiento: string
  fecha_emision: string
  status: string
  rector: string
  vicerrectora: string
}

interface CertificateViewerProps {
  certificate: Certificate
}

export default function CertificateViewer({ certificate }: CertificateViewerProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const copyCertificateUrl = async () => {
    const url = `${window.location.origin}/certificado/${certificate.id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con información */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 
                className="text-xl md:text-2xl font-bold text-[#1F2A37] mb-2"
                style={{ fontFamily: "var(--font-upc), sans-serif" }}
              >
                Certificado Digital de Embajador UPC
              </h1>
              <p className="text-[#1F2A37]/70 text-sm md:text-base flex items-center gap-2">
                ID: <span className="font-mono text-xs md:text-sm">{certificate.id}</span>
                <button
                  onClick={copyCertificateUrl}
                  className="ml-2 text-[#E50A17] hover:text-[#C00914] transition-colors text-xs font-medium flex items-center gap-1 underline"
                  title="Copiar URL del certificado"
                >
                  {copied ? (
                    <>
                      <span>✓ Copiado</span>
                    </>
                  ) : (
                    <>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path>
                      </svg>
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>
              </p>
              <p className="text-xs md:text-sm text-green-600 font-semibold mt-2">
                ✓ Certificado Verificado y Activo
              </p>
            </div>
            <img 
              src="/images/logo_upc_red.png" 
              alt="Logo UPC" 
              className="w-12 h-12 md:w-16 md:h-16" 
            />
          </div>
        </div>

        {/* Certificado */}
        <div ref={certificateRef} className="bg-transparent shadow-2xl overflow-hidden rounded-lg" style={{ borderRadius: "8px" }}>
          <div
            className="relative w-full"
            style={{
              aspectRatio: "842 / 596",
              backgroundImage: `url(/images/certificado-upc-2.svg)`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "8px",
            }}
          >
            {/* Contenido dinámico superpuesto sobre el SVG */}
            {/* El SVG certificado-upc-2.svg ya contiene todo el diseño de fondo */}
            
            {/* Banner pequeño "UPC OTORGA EL PRESENTE DIPLOMA A:" */}
            <div className="absolute top-[39.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-[#D4AF37] px-4 py-1.5 rounded-sm shadow-md">
                <p 
                  className="text-white font-bold uppercase text-center whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
                  }}
                >
                  UPC OTORGA EL PRESENTE DIPLOMA A:
                </p>
              </div>
            </div>

            {/* Sección inferior con contenido del certificado */}
            <div className="absolute bottom-0 left-0 right-0 h-[calc(60.5%-4px)] flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 lg:pb-10 z-10">
                {/* Nombre - Grande, azul oscuro, mayúsculas */}
                <h2
                  className="font-black mb-4 md:mb-6 text-center leading-tight uppercase tracking-tight"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
                    color: "#1F2A37",
                    lineHeight: "1.1",
                  }}
                >
                  {certificate.nombre_completo.toUpperCase()}
                </h2>

                {/* Motivo */}
                <p
                  className="font-bold mb-2 text-center uppercase"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(0.875rem, 1.8vw, 1.125rem)",
                    color: "#1F2A37",
                  }}
                >
                  {certificate.motivo_emision.toUpperCase()}
                </p>

                {/* Clasificación */}
                <p
                  className="font-semibold mb-3 md:mb-4 text-center uppercase"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(0.75rem, 1.6vw, 1rem)",
                    color: "#1F2A37",
                  }}
                >
                  {certificate.clasificacion.toUpperCase()}
                </p>

                {/* Mensaje */}
                <p
                  className="font-bold mb-4 md:mb-6 text-center"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(0.875rem, 1.8vw, 1.125rem)",
                    color: "#1F2A37",
                  }}
                >
                  {certificate.mensaje_agradecimiento.toUpperCase()}
                </p>

                {/* Fecha */}
                <p
                  className="mb-6 md:mb-8 text-center"
                  style={{
                    fontFamily: "var(--font-upc), sans-serif",
                    fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                    color: "#1F2A37",
                  }}
                >
                  {certificate.fecha_emision}
                </p>

                {/* Firmas */}
                <div className="w-full max-w-2xl flex justify-between items-start px-2 md:px-4 lg:px-8 gap-3 md:gap-4 mt-auto">
                  <div className="text-center flex-1">
                    <div className="border-t-2 border-[#1F2A37]/40 pt-2">
                      <p
                        className="font-bold"
                        style={{
                          fontFamily: "var(--font-upc), sans-serif",
                          fontSize: "clamp(0.625rem, 1.3vw, 0.875rem)",
                          color: "#1F2A37",
                        }}
                      >
                        {certificate.rector}
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "var(--font-upc), sans-serif",
                          fontSize: "clamp(0.5rem, 1.1vw, 0.75rem)",
                          color: "#1F2A37",
                        }}
                      >
                        Rector
                      </p>
                    </div>
                  </div>

                  <div className="text-center flex-1">
                    <div className="border-t-2 border-[#1F2A37]/40 pt-2">
                      <p
                        className="font-bold"
                        style={{
                          fontFamily: "var(--font-upc), sans-serif",
                          fontSize: "clamp(0.625rem, 1.3vw, 0.875rem)",
                          color: "#1F2A37",
                        }}
                      >
                        {certificate.vicerrectora}
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "var(--font-upc), sans-serif",
                          fontSize: "clamp(0.5rem, 1.1vw, 0.75rem)",
                          color: "#1F2A37",
                        }}
                      >
                        Vicerrectora Académica
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-upc), sans-serif",
                          fontSize: "clamp(0.5rem, 1.1vw, 0.75rem)",
                          color: "#1F2A37",
                        }}
                      >
                        y de Investigación
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 
            className="text-base md:text-lg font-bold text-[#1F2A37] mb-4"
            style={{ fontFamily: "var(--font-upc), sans-serif" }}
          >
            Sobre este Certificado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#1F2A37]/70 mb-1">Nombre Completo</p>
              <p className="font-semibold text-[#1F2A37]">{certificate.nombre_completo}</p>
            </div>
            <div>
              <p className="text-[#1F2A37]/70 mb-1">DNI</p>
              <p className="font-semibold text-[#1F2A37]">{certificate.dni}</p>
            </div>
            <div>
              <p className="text-[#1F2A37]/70 mb-1">Fecha de Emisión</p>
              <p className="font-semibold text-[#1F2A37]">{certificate.fecha_emision}</p>
            </div>
            <div>
              <p className="text-[#1F2A37]/70 mb-1">Estado</p>
              <p className="font-semibold text-green-600 uppercase">{certificate.status}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-[#1F2A37]/60 text-center">
              Este certificado es válido y ha sido emitido oficialmente por la Universidad Peruana de Ciencias Aplicadas
              (UPC). Para verificar la autenticidad, utiliza el ID único del certificado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
