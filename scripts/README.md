# 📜 Generador de Certificados UPC

Este conjunto de scripts te permite procesar un archivo Excel con datos de usuarios y generar certificados HTML individuales con URLs únicas, además de una tabla HTML con todos los certificados.

## 📋 Requisitos Previos

1. **Node.js** instalado (versión 16 o superior)
2. **Archivo Excel** con los datos de los usuarios

## 📦 Instalación

1. Navega a la carpeta `scripts`:
```bash
cd scripts
```

2. Instala las dependencias:
```bash
npm install
```

## 📊 Formato del Archivo Excel

Tu archivo Excel debe tener las siguientes columnas (los nombres pueden variar, el script los detecta automáticamente):

### Columnas Requeridas:
- **nombre** (o Nombre, Nombres)
- **apellido** (o Apellido, Apellidos)
- **reconocimiento** (o Reconocimiento)
- **genero** (o Género, Genero, Sexo)
- **motivo** (o Motivo, Motivo del Certificado)

### Columnas Opcionales:
- **dni** (o DNI, Documento)
- **fecha_emision** (o Fecha de Emisión, Fecha)

### Ejemplo de estructura Excel:

| nombre | apellido | reconocimiento | genero | motivo | dni | fecha_emision |
|--------|----------|----------------|--------|--------|-----|---------------|
| Juan | Pérez | Por ser un Embajador UPC | Masculino | Deportista destacado de fútbol | 12345678 | Diciembre, 2025 |
| María | García | Por ser una Embajadora UPC | Femenino | Deportista destacada de natación | 87654321 | Diciembre, 2025 |

## 🚀 Uso

### Opción 1: Proceso Completo (Recomendado)

Ejecuta todos los scripts en secuencia:

```bash
npm run all
```

Esto ejecutará:
1. Procesamiento del Excel → JSON (MongoDB)
2. Generación de certificados HTML
3. Generación de tabla HTML

### Opción 2: Ejecutar Scripts Individualmente

#### 1. Procesar Excel a JSON (MongoDB)

```bash
npm run process-excel [ruta-al-excel] [ruta-salida-json]
```

**Ejemplo:**
```bash
npm run process-excel ../data/usuarios.xlsx ../data/certificados.json
```

**Por defecto:**
- Entrada: `../data/datos.xlsx`
- Salida: `../data/certificados.json`

#### 2. Generar Certificados HTML

```bash
npm run generate-certificates [ruta-json] [ruta-template] [directorio-salida]
```

**Ejemplo:**
```bash
npm run generate-certificates ../data/certificados.json ../templates/certificado-template.html ../output/certificados
```

**Por defecto:**
- JSON: `../data/certificados.json`
- Template: `../templates/certificado-template.html`
- Salida: `../output/certificados`

#### 3. Generar Tabla HTML

```bash
npm run generate-table [ruta-json] [ruta-salida-html] [url-base]
```

**Ejemplo:**
```bash
npm run generate-table ../data/certificados.json ../output/tabla-certificados.html https://certificados.upc.edu.pe
```

**Por defecto:**
- JSON: `../data/certificados.json`
- Salida: `../output/tabla-certificados.html`
- URL base: `https://certificados.upc.edu.pe`

## 📁 Estructura de Archivos Generados

Después de ejecutar los scripts, tendrás:

```
e-certs-upc-master/
├── data/
│   └── certificados.json          # Datos en formato MongoDB
├── output/
│   ├── certificados/
│   │   ├── [id-1].html            # Certificado individual 1
│   │   ├── [id-2].html            # Certificado individual 2
│   │   └── ...
│   └── tabla-certificados.html    # Tabla con todos los certificados
```

## 📄 Formato JSON para MongoDB

El script genera documentos con el siguiente formato:

```json
{
  "_id": "uuid-unico",
  "id": "uuid-unico",
  "nombre": "Juan",
  "apellido": "Pérez",
  "nombre_completo": "Juan Pérez",
  "reconocimiento": "Por ser un Embajador UPC",
  "genero": "Masculino",
  "motivo": "Deportista destacado de fútbol",
  "motivo_emision": "Deportista destacado de fútbol",
  "fecha_emision": "Diciembre, 2025",
  "dni": "12345678",
  "url_slug": "juan-perez-abc12345",
  "url": "/certificado/uuid-unico",
  "status": "activo",
  "fecha_creacion": "2025-12-01T10:00:00.000Z",
  "fecha_actualizacion": "2025-12-01T10:00:00.000Z"
}
```

## 🔗 URLs de Certificados

Cada certificado tiene una URL única:
- **Formato:** `https://certificados.upc.edu.pe/certificado/[uuid]`
- **Ejemplo:** `https://certificados.upc.edu.pe/certificado/123e4567-e89b-12d3-a456-426614174000`

## 📊 Tabla HTML

La tabla HTML generada incluye:
- ✅ Búsqueda en tiempo real
- ✅ Exportación a CSV
- ✅ Exportación a JSON
- ✅ Botón para copiar URLs
- ✅ Diseño responsive
- ✅ Estadísticas de certificados

## 📤 Cómo Compartir tu Archivo Excel

Tienes varias opciones para compartir tu archivo Excel:

### Opción 1: Colocar en la carpeta `data`
1. Coloca tu archivo Excel en la carpeta `e-certs-upc-master/data/`
2. Renómbralo a `datos.xlsx` (o usa el nombre que prefieras y especifícalo al ejecutar el script)

### Opción 2: Usar ruta completa
Al ejecutar el script, puedes especificar la ruta completa:
```bash
npm run process-excel "C:\Users\flore\Downloads\mi-archivo.xlsx" ../data/certificados.json
```

### Opción 3: Convertir a CSV
Si prefieres, puedes convertir tu Excel a CSV y luego modificar el script para leer CSV en lugar de Excel.

## ⚠️ Notas Importantes

1. **Fuentes:** Asegúrate de que las fuentes estén disponibles en `../assets/`:
   - `upc_sgothic-bdcap-webfont.ttf`
   - `Zizou Slab-Medium.otf`

2. **Imagen de fondo:** El template usa una imagen de fondo desde una URL externa. Puedes cambiarla en el template si lo deseas.

3. **URLs:** Las URLs generadas son relativas. Asegúrate de configurar la URL base correcta según tu dominio.

## 🐛 Solución de Problemas

### Error: "Cannot find module 'xlsx'"
```bash
cd scripts
npm install
```

### Error: "El archivo Excel está vacío"
- Verifica que tu archivo Excel tenga datos
- Asegúrate de que la primera fila contenga los encabezados de las columnas
- Verifica que no haya filas completamente vacías al inicio

### Error: "Cannot find template"
- Verifica que el archivo `certificado-template.html` exista en `../templates/`
- O especifica la ruta correcta al ejecutar el script

## 📞 Soporte

Si tienes problemas o preguntas, verifica:
1. Que todas las dependencias estén instaladas
2. Que el formato del Excel sea correcto
3. Que las rutas de archivos sean correctas

