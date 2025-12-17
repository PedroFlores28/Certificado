import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processExcelToMongoDB } from './process-excel.js';
import { generateAllCertificates } from './generate-certificates.js';
import { generateTableFromJSON } from './generate-table.js';
import { downloadGoogleSheet } from './download-google-sheet.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Procesa todo el flujo: descarga, procesa y genera certificados
 */
async function downloadAndProcess(sheetUrl, baseUrl = 'https://certificados.upc.edu.pe') {
  try {
    console.log(`🔗 URL de Google Sheets: ${sheetUrl}\n`);
    
    // Rutas de archivos
    const dataDir = path.join(__dirname, '../data');
    const outputDir = path.join(__dirname, '../output');
    const excelPath = path.join(dataDir, 'embajadores-upc.xlsx');
    const jsonPath = path.join(dataDir, 'certificados.json');
    const certificatesDir = path.join(outputDir, 'certificados');
    const tablePath = path.join(outputDir, 'tabla-certificados.html');
    const templatePath = path.join(__dirname, '../templates/certificado-template.html');
    
    // Crear directorios si no existen
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    
    // Paso 1: Descargar el archivo
    console.log('═══════════════════════════════════════════════════════');
    console.log('PASO 1: Descargando archivo desde Google Sheets');
    console.log('═══════════════════════════════════════════════════════\n');
    
    // Verificar si el archivo ya existe
    if (!fs.existsSync(excelPath)) {
      await downloadGoogleSheet(sheetUrl, excelPath);
    } else {
      console.log('✅ El archivo Excel ya existe, se usará el existente.');
      console.log(`📁 Archivo: ${excelPath}\n`);
    }
    
    // Paso 2: Procesar Excel a JSON
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('PASO 2: Procesando Excel a formato JSON (MongoDB)');
    console.log('═══════════════════════════════════════════════════════\n');
    const certificados = processExcelToMongoDB(excelPath, jsonPath);
    
    // Paso 3: Generar certificados HTML
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('PASO 3: Generando certificados HTML individuales');
    console.log('═══════════════════════════════════════════════════════\n');
    generateAllCertificates(jsonPath, templatePath, certificatesDir);
    
    // Paso 4: Generar tabla HTML
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('PASO 4: Generando tabla HTML con URLs');
    console.log('═══════════════════════════════════════════════════════\n');
    generateTableFromJSON(jsonPath, tablePath, baseUrl);
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ PROCESO COMPLETADO EXITOSAMENTE');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📁 Archivos generados:');
    console.log(`   • JSON para MongoDB: ${jsonPath}`);
    console.log(`   • Certificados HTML: ${certificatesDir}/`);
    console.log(`   • Tabla HTML: ${tablePath}\n`);
    
    return {
      excelPath,
      jsonPath,
      certificatesDir,
      tablePath,
      totalCertificados: certificados.length
    };
  } catch (error) {
    console.error('\n❌ Error durante el proceso:', error.message);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const sheetUrl = process.argv[2] || 'https://docs.google.com/spreadsheets/d/1IZ_YiwgsDr7ZGVv2bjD_-Bt6tbkx5TgyLrDBfFCIwpY/edit?usp=sharing';
  const baseUrl = process.argv[3] || 'https://certificados.upc.edu.pe';
  
  downloadAndProcess(sheetUrl, baseUrl)
    .then(result => {
      console.log(`\n🎉 ¡Listo! Se procesaron ${result.totalCertificados} certificados.`);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

export { downloadGoogleSheet, downloadAndProcess };

