# 📜 Sistema de Certificados Digitales UPC

Sistema completo para generar y gestionar certificados digitales verificables para el programa de Embajadores UPC.

## 🚀 Características

- ✅ Procesamiento de datos desde Excel a MongoDB
- ✅ Generación automática de certificados HTML individuales
- ✅ URLs únicas para cada certificado
- ✅ Tabla HTML con todos los certificados y sus URLs
- ✅ Integración con Next.js para visualización dinámica
- ✅ Búsqueda por UUID o ID UPC

## 📁 Estructura del Proyecto

```
e-certs-upc-master/
├── scripts/              # Scripts de procesamiento
│   ├── process-excel.js   # Convierte Excel a JSON (MongoDB)
│   ├── generate-certificates.js  # Genera certificados HTML
│   └── generate-table.js # Genera tabla HTML con URLs
├── v0-certificado/       # Aplicación Next.js
│   ├── app/              # Páginas y rutas
│   ├── lib/              # Utilidades y conexión MongoDB
│   └── components/       # Componentes React
├── templates/            # Templates HTML
├── data/                 # Archivos de datos (Excel, JSON)
└── output/               # Archivos generados
```

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/PedroFlores28/Certificado.git
cd Certificado
```

### 2. Instalar dependencias

#### Para los scripts de procesamiento:
```bash
cd scripts
npm install
```

#### Para la aplicación Next.js:
```bash
cd v0-certificado
npm install
```

### 3. Configurar MongoDB

1. Instala MongoDB o usa MongoDB Atlas
2. Crea un archivo `.env.local` en `v0-certificado/`:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```
   (O tu cadena de conexión de MongoDB Atlas)

## 📊 Uso

### Procesar Excel y Generar Certificados

1. Coloca tu archivo Excel en `data/embajadores-upc.xlsx`
2. Ejecuta desde `scripts/`:
   ```bash
   npm run all
   ```
3. Esto generará:
   - `data/certificados.json` - Datos para MongoDB
   - `output/certificados/` - Certificados HTML individuales
   - `output/tabla-certificados.html` - Tabla con todas las URLs

### Importar a MongoDB

1. Abre MongoDB Compass
2. Conéctate a tu base de datos
3. Crea la base de datos `upc_certificados`
4. Crea la colección `certificados`
5. Importa `data/certificados.json`

### Ejecutar la Aplicación Next.js

```bash
cd v0-certificado
npm run dev
```

Visita: `http://localhost:3000/certificado/[id-del-certificado]`

## 📋 Formato del Excel

El archivo Excel debe tener estas columnas:
- `nombre` o `Nombres`
- `apellido` o `Apellidos`
- `reconocimiento` o `RECONOCIMIENTO_GENERO`
- `genero` o `Género`
- `motivo` o `MOTIVO_CERTIFICADO`

Opcionales:
- `dni` o `DNI`
- `fecha_emision` o `Fecha de Emisión`

## 🔗 URLs de Certificados

Cada certificado tiene una URL única:
- Formato: `https://tu-dominio.com/certificado/[uuid]`
- También funciona con ID UPC: `https://tu-dominio.com/certificado/[id-upc]`

## 📚 Documentación

- `scripts/README.md` - Documentación de los scripts
- `v0-certificado/CONFIGURACION-MONGODB.md` - Configuración de MongoDB
- `v0-certificado/COMO-PROBAR.md` - Guía de pruebas

## 🛡️ Seguridad

- ⚠️ **NUNCA** subas el archivo `.env.local` a GitHub
- ⚠️ **NUNCA** subas credenciales de MongoDB
- El archivo `.gitignore` ya está configurado para proteger estos archivos

## 📝 Licencia

Este proyecto es propiedad de la Universidad Peruana de Ciencias Aplicadas (UPC).

## 👤 Autor

Desarrollado para el programa de Embajadores UPC

