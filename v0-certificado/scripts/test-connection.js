import { getDatabase } from '../lib/mongodb.js'
import { getCertificateById } from '../lib/certificates.js'

async function testConnection() {
  try {
    console.log('🔄 Probando conexión a MongoDB...')
    
    const db = await getDatabase()
    console.log('✅ Conexión a MongoDB exitosa!')
    
    const collection = db.collection('certificados')
    const count = await collection.countDocuments()
    console.log(`📊 Total de certificados en la base de datos: ${count}`)
    
    if (count > 0) {
      // Probar buscar un certificado
      const testId = 'c6e805fa-5f9c-4050-9142-f0271469891b'
      console.log(`\n🔍 Buscando certificado con ID: ${testId}`)
      
      const certificate = await getCertificateById(testId)
      
      if (certificate) {
        console.log('✅ Certificado encontrado!')
        console.log(`   Nombre: ${certificate.nombre_completo}`)
        console.log(`   Motivo: ${certificate.motivo_emision}`)
        console.log(`   Estado: ${certificate.status}`)
      } else {
        console.log('❌ Certificado no encontrado')
      }
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('\n💡 Verifica que:')
    console.error('   1. MongoDB esté corriendo')
    console.error('   2. El archivo .env.local tenga MONGODB_URI configurado')
    console.error('   3. La cadena de conexión sea correcta')
    process.exit(1)
  }
}

testConnection()

