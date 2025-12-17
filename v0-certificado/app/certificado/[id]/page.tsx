import { notFound } from "next/navigation"
import CertificateViewer from "@/components/certificate-viewer"
import { getCertificateById } from "@/lib/certificates"
import CertificateSearchForm from "./search-form"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CertificatePage({ params }: PageProps) {
  const { id } = await params

  // Buscar el certificado en MongoDB
  const certificate = await getCertificateById(id)

  // Si no se encuentra el certificado, mostrar formulario de búsqueda
  if (!certificate) {
    return <CertificateSearchForm initialId={id} />
  }

  // Verificar que el certificado esté activo
  if (certificate.status !== "activo") {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 
            className="text-2xl font-bold text-[#E50A17] mb-4"
            style={{ fontFamily: "var(--font-upc), sans-serif" }}
          >
            Certificado No Disponible
          </h1>
          <p className="text-[#1F2A37] mb-6">Este certificado ha sido revocado o ya no está disponible.</p>
          <CertificateSearchForm />
        </div>
      </div>
    )
  }

  return <CertificateViewer certificate={certificate} />
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const certificate = await getCertificateById(id)

  const certificateUrl = `https://certificados.upc.edu.pe/certificado/${id}`

  if (!certificate) {
    return {
      title: 'Certificado No Encontrado - UPC',
      description: 'El certificado solicitado no existe o ha sido revocado.',
    }
  }

  return {
    title: `Certificado de Embajador UPC - ${certificate.nombre_completo}`,
    description: `Certificado digital verificable otorgado a ${certificate.nombre_completo} como ${certificate.clasificacion} por la Universidad Peruana de Ciencias Aplicadas (UPC).`,
    keywords: ["UPC", "Embajador UPC", "Certificado Digital", "Universidad Peruana de Ciencias Aplicadas", "Badge Digital"],
    authors: [{ name: "Universidad Peruana de Ciencias Aplicadas" }],
    openGraph: {
      title: `Certificado de Embajador UPC - ${certificate.nombre_completo}`,
      description: `Certificado digital otorgado a ${certificate.nombre_completo} como ${certificate.clasificacion}`,
      type: "website",
      url: certificateUrl,
      siteName: "UPC - Certificados Digitales",
      images: [
        {
          url: certificateUrl,
          width: 842,
          height: 596,
          alt: `Certificado de ${certificate.nombre_completo}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Certificado de Embajador UPC - ${certificate.nombre_completo}`,
      description: `Certificado digital otorgado a ${certificate.nombre_completo}`,
    },
    // Metadatos para LinkedIn (Open Badges compatible)
    other: {
      "certificate:issuer": "Universidad Peruana de Ciencias Aplicadas",
      "certificate:issuer:url": "https://www.upc.edu.pe",
      "certificate:name": "Embajador UPC",
      "certificate:description": certificate.clasificacion,
      "certificate:issued": certificate.fecha_emision,
    },
  }
}
