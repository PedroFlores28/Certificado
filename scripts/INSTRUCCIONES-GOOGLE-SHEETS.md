# 📥 Cómo Procesar tu Google Sheet

Tienes dos opciones para procesar los datos de tu Google Sheet:

## Opción 1: Descarga Automática (Recomendado)

Ejecuta este comando desde la carpeta `scripts`:

```bash
cd scripts
npm run download-and-process
```

O con la URL completa:

```bash
node download-and-process.js "https://docs.google.com/spreadsheets/d/1IZ_YiwgsDr7ZGVv2bjD_-Bt6tbkx5TgyLrDBfFCIwpY/edit?usp=sharing"
```

**Nota:** Si el archivo es privado o requiere autenticación, usa la Opción 2.

## Opción 2: Descarga Manual (Si la automática no funciona)

### Paso 1: Descargar el archivo

1. Abre tu Google Sheet en el navegador:
   https://docs.google.com/spreadsheets/d/1IZ_YiwgsDr7ZGVv2bjD_-Bt6tbkx5TgyLrDBfFCIwpY/edit?usp=sharing

2. Ve a **Archivo > Descargar > Microsoft Excel (.xlsx)**

3. Guarda el archivo en esta carpeta:
   ```
   e-certs-upc-master/data/embajadores-upc.xlsx
   ```

### Paso 2: Procesar el archivo

Desde la carpeta `scripts`, ejecuta:

```bash
npm run all
```

Esto generará:
- ✅ JSON para MongoDB
- ✅ Certificados HTML individuales
- ✅ Tabla HTML con todas las URLs

## 📊 Estructura de Columnas Detectada

El script detecta automáticamente estas columnas de tu Google Sheet:

- **ID** → Se guarda como `id_upc`
- **CORREO** → Se guarda como `correo`
- **RECONOCIMIENTO_GENERO** → Se usa para `reconocimiento` y se extrae el `genero`
- **Apellidos** → Se usa como `apellido`
- **Nombres** → Se usa como `nombre`
- **MOTIVO_CERTIFICADO** → Se usa como `motivo`

## 🔍 Verificación

Después de ejecutar los scripts, verifica que se hayan generado:

1. `data/certificados.json` - Datos en formato MongoDB
2. `output/certificados/` - Carpeta con certificados HTML (uno por usuario)
3. `output/tabla-certificados.html` - Tabla con todos los usuarios y URLs

## ❓ Problemas Comunes

### Error: "No se pudo descargar"
- El archivo puede ser privado. Usa la Opción 2 (descarga manual).
- Verifica que el archivo esté compartido públicamente o que tengas acceso.

### Error: "No se encontraron registros"
- Verifica que el Excel tenga datos en la primera hoja.
- Asegúrate de que la primera fila contenga los encabezados.

### Error: "Cannot find module"
- Ejecuta `npm install` en la carpeta `scripts`.

