// Versión simplificada sin MongoDB - usa archivo JSON estático
import fs from 'fs'
import path from 'path'

export interface Certificate {
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

interface CertificateData {
  _id: string
  id: string
  id_upc?: string | number
  correo?: string
  nombre: string
  apellido: string
  nombre_completo: string
  reconocimiento: string
  genero: string
  motivo: string
  motivo_emision: string
  fecha_emision: string
  dni: string | number
  status: string
}

// Cache para los certificados (se carga una vez)
let certificatesCache: CertificateData[] | null = null

function loadCertificates(): CertificateData[] {
  if (certificatesCache) {
    return certificatesCache
  }

  try {
    // En producción, el archivo debe estar en public/data/
    // En desarrollo, puede estar en data/
    const jsonPath = process.env.NODE_ENV === 'production'
      ? path.join(process.cwd(), 'public', 'data', 'certificados.json')
      : path.join(process.cwd(), 'data', 'certificados.json')

    const fileContent = fs.readFileSync(jsonPath, 'utf-8')
    certificatesCache = JSON.parse(fileContent)
    return certificatesCache!
  } catch (error) {
    console.error('Error al cargar certificados:', error)
    return []
  }
}

/**
 * Busca un certificado por su ID único (UUID) o por ID UPC
 */
export async function getCertificateById(id: string): Promise<Certificate | null> {
  try {
    const certificates = loadCertificates()
    
    // Buscar por UUID
    let certificate = certificates.find(c => c.id === id)
    
    // Si no se encuentra, buscar por id_upc
    if (!certificate) {
      const numericId = Number(id)
      if (!isNaN(numericId)) {
        certificate = certificates.find(c => c.id_upc === numericId)
      }
    }
    
    // También buscar como string en id_upc
    if (!certificate) {
      certificate = certificates.find(c => String(c.id_upc) === id)
    }
    
    if (!certificate) {
      return null
    }
    
    // Mapear los datos al formato esperado
    return {
      id: certificate.id,
      nombre_completo: certificate.nombre_completo,
      dni: String(certificate.dni || certificate.id_upc || ''),
      motivo_emision: certificate.reconocimiento || certificate.motivo_emision,
      clasificacion: certificate.motivo || certificate.motivo_emision,
      mensaje_agradecimiento: '¡Tu entrega nos llena de orgullo!',
      fecha_emision: certificate.fecha_emision,
      status: certificate.status || 'activo',
      rector: 'Edward Roekaert',
      vicerrectora: 'Milagros Morgan',
    }
  } catch (error) {
    console.error('Error al buscar certificado:', error)
    return null
  }
}

/**
 * Verifica si un certificado existe y está activo
 */
export async function verifyCertificate(id: string): Promise<boolean> {
  try {
    const certificate = await getCertificateById(id)
    return certificate !== null && certificate.status === 'activo'
  } catch (error) {
    console.error('Error al verificar certificado:', error)
    return false
  }
}

