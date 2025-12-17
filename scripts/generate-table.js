import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Genera una tabla HTML con todos los usuarios y sus URLs
 */
function generateTableHTML(certificados, baseUrl = 'https://certificados.upc.edu.pe') {
  const tableRows = certificados.map((cert, index) => {
    const url = `${baseUrl}${cert.url}`;
    const nombreCompleto = cert.nombre_completo || `${cert.nombre} ${cert.apellido}`.trim();
    
    return `
    <tr>
      <td>${index + 1}</td>
      <td>${nombreCompleto}</td>
      <td>${cert.reconocimiento || '-'}</td>
      <td>${cert.genero || '-'}</td>
      <td>${cert.motivo || cert.motivo_emision || '-'}</td>
      <td><a href="${url}" target="_blank">${url}</a></td>
      <td><button onclick="copyToClipboard('${url}')">Copiar</button></td>
    </tr>`;
  }).join('');
  
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla de Certificados UPC</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        
        h1 {
            color: #E50A17;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        
        .stat-card {
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 6px;
            border-left: 4px solid #E50A17;
        }
        
        .stat-card .label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .stat-card .value {
            font-size: 24px;
            font-weight: bold;
            color: #13173c;
        }
        
        .table-container {
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        thead {
            background: #13173c;
            color: white;
        }
        
        th {
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
        }
        
        tbody tr:hover {
            background: #f8f9fa;
        }
        
        tbody tr:last-child td {
            border-bottom: none;
        }
        
        a {
            color: #E50A17;
            text-decoration: none;
            word-break: break-all;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        button {
            background: #E50A17;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s;
        }
        
        button:hover {
            background: #c00814;
        }
        
        .search-box {
            margin-bottom: 20px;
        }
        
        .search-box input {
            width: 100%;
            padding: 10px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: #E50A17;
        }
        
        .export-buttons {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .export-buttons button {
            background: #13173c;
            padding: 10px 20px;
            font-size: 14px;
        }
        
        .export-buttons button:hover {
            background: #1a2347;
        }
        
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #13173c;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: none;
            z-index: 1000;
        }
        
        .toast.show {
            display: block;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📜 Certificados UPC - Lista de Usuarios</h1>
        <p class="subtitle">Total de certificados generados: ${certificados.length}</p>
        
        <div class="stats">
            <div class="stat-card">
                <div class="label">Total de Certificados</div>
                <div class="value">${certificados.length}</div>
            </div>
            <div class="stat-card">
                <div class="label">Certificados Activos</div>
                <div class="value">${certificados.filter(c => c.status === 'activo').length}</div>
            </div>
        </div>
        
        <div class="export-buttons">
            <button onclick="exportToCSV()">📥 Exportar a CSV</button>
            <button onclick="exportToJSON()">📥 Exportar a JSON</button>
            <button onclick="window.print()">🖨️ Imprimir</button>
        </div>
        
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="🔍 Buscar por nombre, reconocimiento, motivo..." onkeyup="filterTable()">
        </div>
        
        <div class="table-container">
            <table id="certificatesTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Completo</th>
                        <th>Reconocimiento</th>
                        <th>Género</th>
                        <th>Motivo</th>
                        <th>URL del Certificado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="toast" id="toast">URL copiada al portapapeles</div>
    
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('URL copiada al portapapeles');
            }).catch(err => {
                // Fallback para navegadores antiguos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('URL copiada al portapapeles');
            });
        }
        
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
        
        function filterTable() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toLowerCase();
            const table = document.getElementById('certificatesTable');
            const tr = table.getElementsByTagName('tr');
            
            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName('td');
                let found = false;
                
                for (let j = 0; j < td.length; j++) {
                    if (td[j]) {
                        const txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue.toLowerCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                
                tr[i].style.display = found ? '' : 'none';
            }
        }
        
        function exportToCSV() {
            const table = document.getElementById('certificatesTable');
            const rows = Array.from(table.querySelectorAll('tr'));
            const csv = rows.map(row => {
                const cols = Array.from(row.querySelectorAll('th, td'));
                return cols.map(col => {
                    const text = col.textContent.trim();
                    // Remover el botón de copiar del CSV
                    return text.replace('Copiar', '').trim();
                }).join(',');
            }).join('\\n');
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'certificados-upc.csv';
            link.click();
        }
        
        function exportToJSON() {
            const certificados = ${JSON.stringify(certificados, null, 2)};
            const blob = new Blob([JSON.stringify(certificados, null, 2)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'certificados-upc.json';
            link.click();
        }
    </script>
</body>
</html>`;
  
  return html;
}

/**
 * Genera la tabla HTML desde el archivo JSON
 */
function generateTableFromJSON(jsonFilePath, outputPath, baseUrl) {
  try {
    // Leer el archivo JSON
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const certificados = JSON.parse(jsonData);
    
    console.log(`🔄 Generando tabla HTML para ${certificados.length} certificados...`);
    
    // Generar el HTML
    const html = generateTableHTML(certificados, baseUrl);
    
    // Guardar el archivo
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, html, 'utf-8');
    
    console.log(`✅ Tabla HTML generada en: ${outputPath}`);
    console.log(`📊 Total de certificados en la tabla: ${certificados.length}`);
    
    return outputPath;
  } catch (error) {
    console.error('❌ Error al generar la tabla:', error.message);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const jsonFilePath = process.argv[2] || path.join(__dirname, '../data/certificados.json');
  const outputPath = process.argv[3] || path.join(__dirname, '../output/tabla-certificados.html');
  const baseUrl = process.argv[4] || 'https://certificados.upc.edu.pe';
  
  console.log('🔄 Generando tabla HTML...');
  console.log(`📁 Archivo JSON: ${jsonFilePath}`);
  console.log(`📁 Archivo de salida: ${outputPath}`);
  console.log(`🌐 URL base: ${baseUrl}\n`);
  
  generateTableFromJSON(jsonFilePath, outputPath, baseUrl);
}

export { generateTableHTML, generateTableFromJSON };

