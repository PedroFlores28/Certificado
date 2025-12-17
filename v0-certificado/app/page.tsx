import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="/images/logo_upc_red.png" 
              alt="Logo UPC" 
              className="h-12 w-auto" 
            />
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-[#1F2A37] hover:text-[#E50A17] font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/verificar" className="text-[#1F2A37] hover:text-[#E50A17] font-medium transition-colors">
                Verificar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="mb-8">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2A37] mb-4"
                style={{ fontFamily: "var(--font-upc), sans-serif" }}
              >
                Sistema de Certificados Digitales
              </h1>
              <p className="text-xl md:text-2xl text-[#1F2A37]/80 mb-2">
                Universidad Peruana de Ciencias Aplicadas
              </p>
              <p className="text-base md:text-lg text-[#1F2A37]/60 max-w-2xl mx-auto">
                Reconocimiento digital verificable para Embajadores UPC
              </p>
            </div>

            <div className="space-y-4 mt-10">
              <Link
                href="/certificado/123e4567-e89b-12d3-a456-426614174000"
                className="block w-full bg-[#E50A17] hover:bg-[#C00914] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-[1.02] shadow-md"
              >
                Ver Certificado de Ejemplo
              </Link>

              <Link
                href="/certificado"
                className="block w-full bg-white hover:bg-[#F3F4F6] text-[#1F2A37] font-semibold py-4 px-8 rounded-lg transition-all border-2 border-[#1F2A37]/20 hover:border-[#E50A17]"
              >
                Buscar Certificado
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-[#1F2A37]/60 mb-2">
                Certificado ID de ejemplo:
              </p>
              <p className="text-xs font-mono text-[#1F2A37]/80 bg-[#F3F4F6] px-4 py-2 rounded inline-block">
                123e4567-e89b-12d3-a456-426614174000
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-[#E50A17] mb-2" style={{ fontFamily: "var(--font-upc), sans-serif" }}>
                ✓
              </div>
              <h3 className="font-semibold text-[#1F2A37] mb-2">Verificable</h3>
              <p className="text-sm text-[#1F2A37]/60">
                Cada certificado tiene un ID único para verificación
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-[#E50A17] mb-2" style={{ fontFamily: "var(--font-upc), sans-serif" }}>
                🔒
              </div>
              <h3 className="font-semibold text-[#1F2A37] mb-2">Seguro</h3>
              <p className="text-sm text-[#1F2A37]/60">
                Certificados digitales protegidos y autenticados
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-[#E50A17] mb-2" style={{ fontFamily: "var(--font-upc), sans-serif" }}>
                📱
              </div>
              <h3 className="font-semibold text-[#1F2A37] mb-2">Compatible</h3>
              <p className="text-sm text-[#1F2A37]/60">
                Compatible con LinkedIn y otras plataformas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#1F2A37]/60">
            © 2025 Universidad Peruana de Ciencias Aplicadas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
