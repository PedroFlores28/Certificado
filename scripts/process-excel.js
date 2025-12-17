import XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Procesa un archivo Excel y lo convierte a formato JSON para MongoDB
 * 
 * El archivo Excel debe tener las siguientes columnas:
 * - nombre (o Nombre)
 * - apellido (o Apellido)
 * - reconocimiento (o Reconocimiento)
 * - genero (o Género, Genero)
 * - motivo (o Motivo)
 * 
 * Opcionalmente puede tener:
 * - fecha_emision (o Fecha de Emisión)
 * - dni (o DNI)
 */
function processExcelToMongoDB(excelFilePath, outputJsonPath) {
  try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    if (data.length === 0) {
      console.error('❌ El archivo Excel está vacío o no tiene datos válidos');
      return;
    }
    
    console.log(`✅ Se encontraron ${data.length} registros en el Excel`);
    
    // Normalizar los nombres de las columnas (case-insensitive)
    const normalizeKey = (key) => {
      const keyLower = key.toLowerCase().trim();
      const mappings = {
        'nombre': 'nombre',
        'nombres': 'nombre',
        'apellido': 'apellido',
        'apellidos': 'apellido',
        'reconocimiento': 'reconocimiento',
        'reconocimiento_genero': 'reconocimiento',
        'reconocimiento genero': 'reconocimiento',
        'genero': 'genero',
        'género': 'genero',
        'sexo': 'genero',
        'motivo': 'motivo',
        'motivo_certificado': 'motivo',
        'motivo del certificado': 'motivo',
        'fecha_emision': 'fecha_emision',
        'fecha de emisión': 'fecha_emision',
        'fecha': 'fecha_emision',
        'dni': 'dni',
        'documento': 'dni',
        'id': 'id',
        'correo': 'correo',
        'email': 'correo'
      };
      return mappings[keyLower] || key;
    };
    
    // Procesar y normalizar los datos
    const processedData = data.map((row, index) => {
      const normalizedRow = {};
      
      // Normalizar todas las claves
      Object.keys(row).forEach(key => {
        const normalizedKey = normalizeKey(key);
        normalizedRow[normalizedKey] = row[key];
      });
      
      // Generar ID único
      const id = uuidv4();
      
      // Construir nombre completo (manejar diferentes formatos de columnas)
      const nombre = normalizedRow.nombre || normalizedRow.nombres || '';
      const apellido = normalizedRow.apellido || normalizedRow.apellidos || '';
      const nombreCompleto = `${nombre} ${apellido}`.trim();
      
      // Extraer género del reconocimiento si está combinado
      let reconocimiento = normalizedRow.reconocimiento || '';
      let genero = normalizedRow.genero || '';
      
      // Si el reconocimiento contiene "EMBAJADOR" o "EMBAJADORA", extraer género
      if (reconocimiento && !genero) {
        if (reconocimiento.toUpperCase().includes('EMBAJADORA')) {
          genero = 'Femenino';
        } else if (reconocimiento.toUpperCase().includes('EMBAJADOR')) {
          genero = 'Masculino';
        }
      }
      
      // Generar URL única
      const urlSlug = generateSlug(nombreCompleto, id);
      
      // Preparar documento para MongoDB
      const mongoDocument = {
        _id: id,
        id: id,
        id_upc: normalizedRow.id || '',
        correo: normalizedRow.correo || '',
        nombre: nombre,
        apellido: apellido,
        nombre_completo: nombreCompleto,
        reconocimiento: reconocimiento,
        genero: genero,
        motivo: normalizedRow.motivo || '',
        motivo_emision: normalizedRow.motivo || '',
        fecha_emision: normalizedRow.fecha_emision || new Date().toLocaleDateString('es-PE', { 
          year: 'numeric', 
          month: 'long' 
        }),
        dni: normalizedRow.dni || normalizedRow.id || '',
        url_slug: urlSlug,
        url: `/certificado/${id}`,
        status: 'activo',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      };
      
      return mongoDocument;
    });
    
    // Guardar como JSON
    fs.writeFileSync(outputJsonPath, JSON.stringify(processedData, null, 2), 'utf-8');
    
    console.log(`✅ Datos procesados y guardados en: ${outputJsonPath}`);
    console.log(`📊 Total de documentos: ${processedData.length}`);
    
    // Mostrar ejemplo del primer documento
    if (processedData.length > 0) {
      console.log('\n📋 Ejemplo del primer documento:');
      console.log(JSON.stringify(processedData[0], null, 2));
    }
    
    return processedData;
  } catch (error) {
    console.error('❌ Error al procesar el archivo Excel:', error.message);
    throw error;
  }
}

/**
 * Genera un slug único para la URL
 */
function generateSlug(nombreCompleto, id) {
  const slug = nombreCompleto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Agregar parte del ID para garantizar unicidad
  const shortId = id.substring(0, 8);
  return `${slug}-${shortId}`;
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const excelFilePath = process.argv[2] || path.join(__dirname, '../data/datos.xlsx');
  const outputJsonPath = process.argv[3] || path.join(__dirname, '../data/certificados.json');
  
  // Crear directorio de salida si no existe
  const outputDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🔄 Procesando archivo Excel...');
  console.log(`📁 Archivo de entrada: ${excelFilePath}`);
  console.log(`📁 Archivo de salida: ${outputJsonPath}\n`);
  
  processExcelToMongoDB(excelFilePath, outputJsonPath);
}

export { processExcelToMongoDB };

