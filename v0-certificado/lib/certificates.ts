import { getDatabase } from './mongodb'

export interface CertificateData {
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
  url_slug: string
  url: string
  status: string
  fecha_creacion: string
  fecha_actualizacion: string
}

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

/**
 * Busca un certificado por su ID único (UUID) o por ID UPC
 */
export async function getCertificateById(id: string): Promise<Certificate | null> {
  try {
    const db = await getDatabase()
    const collection = db.collection<CertificateData>('certificados')
    
    // Buscar por el campo 'id' (UUID) o por 'id_upc' (ID del Excel)
    let certificate = await collection.findOne({ id })
    
    // Si no se encuentra por UUID, intentar buscar por id_upc
    if (!certificate) {
      // Verificar si el ID es numérico (probablemente id_upc)
      const numericId = Number(id)
      if (!isNaN(numericId)) {
        certificate = await collection.findOne({ id_upc: numericId })
      }
    }
    
    // También intentar buscar como string en id_upc
    if (!certificate) {
      certificate = await collection.findOne({ id_upc: id })
    }
    
    if (!certificate) {
      return null
    }
    
    // Mapear los datos de MongoDB al formato esperado por el componente
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

