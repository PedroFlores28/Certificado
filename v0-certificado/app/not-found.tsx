export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center border border-white/20 max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Certificado No Encontrado</h2>
        <p className="text-white/80 mb-8">El certificado que buscas no existe o ha sido revocado.</p>
        <a
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}
