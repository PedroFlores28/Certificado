# 🚀 Procesar tu Google Sheet - Instrucciones Rápidas

## 📥 Paso 1: Descargar el Archivo Excel

1. **Abre tu Google Sheet:**
   https://docs.google.com/spreadsheets/d/1IZ_YiwgsDr7ZGVv2bjD_-Bt6tbkx5TgyLrDBfFCIwpY/edit?usp=sharing

2. **Descarga como Excel:**
   - Ve a **Archivo** (File) en el menú superior
   - Selecciona **Descargar** (Download)
   - Elige **Microsoft Excel (.xlsx)**

3. **Guarda el archivo:**
   - Nómbralo: `embajadores-upc.xlsx`
   - Guárdalo en esta carpeta:
     ```
     C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\data\
     ```

## ⚙️ Paso 2: Procesar los Datos

Abre PowerShell o Terminal y ejecuta:

```powershell
cd "C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\scripts"
npm run all
```

Esto generará:
- ✅ `data/certificados.json` - Datos en formato MongoDB (listo para importar)
- ✅ `output/certificados/` - Un certificado HTML por cada usuario
- ✅ `output/tabla-certificados.html` - Tabla con todos los usuarios y sus URLs

## 📊 Resultados

Después de ejecutar, tendrás:

### 1. Archivo JSON para MongoDB
Ubicación: `data/certificados.json`

Cada documento tiene este formato:
```json
{
  "_id": "uuid-único",
  "id_upc": "201817361",
  "correo": "u201817361@upc.edu.pe",
  "nombre": "Francisco Armando",
  "apellido": "Lazo Aponte",
  "nombre_completo": "Francisco Armando Lazo Aponte",
  "reconocimiento": "UN EMBAJADOR UPC",
  "genero": "Masculino",
  "motivo": "INTEGRANTE DEL ELENCO DE MUSICA PERUANA",
  "url": "/certificado/uuid-único",
  "status": "activo"
}
```

### 2. Certificados HTML Individuales
Ubicación: `output/certificados/[id].html`

Cada certificado tiene una URL única que puedes compartir.

### 3. Tabla HTML con URLs
Ubicación: `output/tabla-certificados.html`

Abre este archivo en tu navegador para ver:
- Lista completa de usuarios
- URLs de cada certificado
- Botón para copiar URLs
- Búsqueda en tiempo real
- Exportación a CSV/JSON

## 🔗 URLs Generadas

Cada certificado tendrá una URL única:
```
https://certificados.upc.edu.pe/certificado/[uuid-único]
```

Ejemplo:
```
https://certificados.upc.edu.pe/certificado/123e4567-e89b-12d3-a456-426614174000
```

## ❓ Problemas

### Error: "Cannot find module"
```powershell
cd scripts
npm install
```

### Error: "No se encontraron registros"
- Verifica que el archivo Excel tenga datos
- Asegúrate de que la primera fila tenga los encabezados

### Error: "No se puede leer el archivo"
- Verifica que el archivo esté guardado como `.xlsx` (no `.xls`)
- Asegúrate de que el archivo no esté abierto en Excel

## 📞 Siguiente Paso

Una vez que tengas el archivo JSON, puedes importarlo a MongoDB usando:

```bash
mongoimport --db upc_certificados --collection certificados --file data/certificados.json --jsonArray
```

O usando MongoDB Compass:
1. Abre MongoDB Compass
2. Conecta a tu base de datos
3. Selecciona la colección
4. Importa el archivo `certificados.json`

