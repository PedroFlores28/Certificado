import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Genera certificados HTML individuales basados en el template
 */
function generateCertificateHTML(certificado, templatePath, outputDir) {
  // Leer el template
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Extraer datos del certificado
  const nombreCompleto = certificado.nombre_completo || `${certificado.nombre} ${certificado.apellido}`.trim();
  const reconocimiento = certificado.reconocimiento || '';
  const motivo = certificado.motivo || certificado.motivo_emision || '';
  const genero = certificado.genero || '';
  const fechaEmision = certificado.fecha_emision || 'Diciembre, 2025';
  
  // Ajustar el texto según el género
  let textoReconocimiento = reconocimiento;
  if (genero) {
    const generoLower = genero.toLowerCase();
    if (generoLower.includes('femenino') || generoLower.includes('f') || generoLower.includes('mujer')) {
      textoReconocimiento = reconocimiento.replace(/EMBAJADOR/gi, 'EMBAJADORA');
    } else {
      textoReconocimiento = reconocimiento.replace(/EMBAJADORA/gi, 'EMBAJADOR');
    }
  }
  
  // Mensaje de agradecimiento (puede variar según el motivo)
  const mensajeAgradecimiento = "¡TU ENTREGA NOS LLENA DE ORGULLO!";
  
  // Reemplazar los placeholders en el template
  template = template.replace(
    /NOMBRE_COMPLETO/g,
    nombreCompleto.toUpperCase()
  );
  
  template = template.replace(
    /RECONOCIMIENTO/g,
    textoReconocimiento.toUpperCase() || 'POR SER UNA EMBAJADORA UPC'
  );
  
  template = template.replace(
    /MOTIVO/g,
    motivo.toUpperCase() || 'DEPORTISTA CALIFICADO DE ESCALADA'
  );
  
  template = template.replace(
    /MENSAJE_AGRADECIMIENTO/g,
    mensajeAgradecimiento
  );
  
  template = template.replace(
    /FECHA_EMISION/g,
    fechaEmision
  );
  
  // Actualizar el título del documento
  template = template.replace(
    /<title>Certificado UPC<\/title>/,
    `<title>Certificado UPC - ${nombreCompleto}</title>`
  );
  
  // Actualizar los IDs y data-names en los elementos SVG
  const nombreSlug = nombreCompleto.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
  
  template = template.replace(
    /id="NOMBRE_COMPLETO" data-name="NOMBRE_COMPLETO"/g,
    `id="${nombreSlug}" data-name="${nombreCompleto.toUpperCase()}"`
  );
  
  // Guardar el certificado HTML
  const fileName = `${certificado.id}.html`;
  const filePath = path.join(outputDir, fileName);
  
  fs.writeFileSync(filePath, template, 'utf-8');
  
  return filePath;
}

/**
 * Genera todos los certificados HTML desde el archivo JSON
 */
function generateAllCertificates(jsonFilePath, templatePath, outputDir) {
  try {
    // Leer el archivo JSON
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const certificados = JSON.parse(jsonData);
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log(`🔄 Generando ${certificados.length} certificados HTML...`);
    
    const certificadosGenerados = certificados.map((certificado, index) => {
      const filePath = generateCertificateHTML(certificado, templatePath, outputDir);
      console.log(`✅ [${index + 1}/${certificados.length}] Generado: ${path.basename(filePath)}`);
      return {
        ...certificado,
        html_file: filePath,
        html_filename: path.basename(filePath)
      };
    });
    
    console.log(`\n✅ Todos los certificados han sido generados en: ${outputDir}`);
    
    return certificadosGenerados;
  } catch (error) {
    console.error('❌ Error al generar certificados:', error.message);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const jsonFilePath = process.argv[2] || path.join(__dirname, '../data/certificados.json');
  const templatePath = process.argv[3] || path.join(__dirname, '../templates/certificado-template.html');
  const outputDir = process.argv[4] || path.join(__dirname, '../output/certificados');
  
  console.log('🔄 Generando certificados HTML...');
  console.log(`📁 Archivo JSON: ${jsonFilePath}`);
  console.log(`📁 Template: ${templatePath}`);
  console.log(`📁 Directorio de salida: ${outputDir}\n`);
  
  generateAllCertificates(jsonFilePath, templatePath, outputDir);
}

export { generateCertificateHTML, generateAllCertificates };

