import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Descarga un archivo desde una URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Descargando desde: ${url}`);
    
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(url, (response) => {
      // Manejar redirecciones
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(outputPath);
        return downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(outputPath);
        return reject(new Error(`Error HTTP: ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('✅ Archivo descargado exitosamente');
        resolve(outputPath);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
  });
}

/**
 * Convierte URL de Google Sheets a URL de exportación
 */
function getExportUrl(sheetUrl) {
  // Extraer el ID de la hoja
  const sheetIdMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!sheetIdMatch) {
    throw new Error('No se pudo extraer el ID de la hoja de cálculo');
  }
  
  const sheetId = sheetIdMatch[1];
  
  // Intentar diferentes formatos de exportación
  const exportUrls = [
    // Formato Excel (xlsx)
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx&gid=0`,
    // Formato CSV (más compatible)
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`,
  ];
  
  return { sheetId, exportUrls };
}

/**
 * Intenta descargar el archivo desde Google Sheets
 */
async function downloadGoogleSheet(sheetUrl, outputPath) {
  try {
    const { sheetId, exportUrls } = getExportUrl(sheetUrl);
    console.log(`📊 ID de la hoja: ${sheetId}`);
    console.log(`📁 Archivo de salida: ${outputPath}\n`);
    
    // Intentar descargar como Excel primero
    console.log('🔄 Intentando descargar como Excel (xlsx)...');
    try {
      await downloadFile(exportUrls[0], outputPath);
      return outputPath;
    } catch (error) {
      console.log(`⚠️  No se pudo descargar como Excel: ${error.message}`);
      console.log('🔄 Intentando descargar como CSV...');
      
      // Si falla, intentar como CSV
      const csvPath = outputPath.replace('.xlsx', '.csv');
      try {
        await downloadFile(exportUrls[1], csvPath);
        console.log('✅ Descargado como CSV. Nota: Necesitarás convertir CSV a Excel o actualizar el script para leer CSV.');
        return csvPath;
      } catch (csvError) {
        throw new Error(`No se pudo descargar ni como Excel ni como CSV. El archivo puede ser privado o requerir autenticación.`);
      }
    }
  } catch (error) {
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const sheetUrl = process.argv[2] || 'https://docs.google.com/spreadsheets/d/1IZ_YiwgsDr7ZGVv2bjD_-Bt6tbkx5TgyLrDBfFCIwpY/edit?usp=sharing';
  const outputPath = process.argv[3] || path.join(__dirname, '../data/embajadores-upc.xlsx');
  
  // Crear directorio si no existe
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  downloadGoogleSheet(sheetUrl, outputPath)
    .then(result => {
      console.log(`\n✅ Archivo guardado en: ${result}`);
    })
    .catch(error => {
      console.error('\n❌ Error al descargar:', error.message);
      console.log('\n📋 INSTRUCCIONES ALTERNATIVAS:');
      console.log('1. Abre el Google Sheet en tu navegador');
      console.log('2. Ve a Archivo > Descargar > Microsoft Excel (.xlsx)');
      console.log('3. Guarda el archivo en: e-certs-upc-master/data/embajadores-upc.xlsx');
      console.log('4. Luego ejecuta: npm run process-excel');
      process.exit(1);
    });
}

export { downloadGoogleSheet, getExportUrl };

