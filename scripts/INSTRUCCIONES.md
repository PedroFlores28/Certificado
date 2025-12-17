# 📋 Instrucciones Rápidas - Cómo Compartir tu Archivo Excel

## 🎯 Opciones para Compartir tu Archivo Excel

### ✅ Opción 1: Colocar en la Carpeta `data` (RECOMENDADO)

1. **Copia tu archivo Excel** a la carpeta:
   ```
   e-certs-upc-master/data/
   ```

2. **Renómbralo** a `datos.xlsx` (o usa cualquier nombre)

3. **Ejecuta el script** desde la carpeta `scripts`:
   ```bash
   cd scripts
   npm install
   npm run all
   ```

### ✅ Opción 2: Especificar Ruta Completa

Si prefieres mantener tu archivo en otra ubicación, puedes especificar la ruta completa al ejecutar:

```bash
cd scripts
npm install
npm run process-excel "C:\Users\flore\Downloads\tu-archivo.xlsx" ../data/certificados.json
npm run generate-certificates
npm run generate-table
```

### ✅ Opción 3: Arrastrar y Soltar

1. Abre la carpeta `e-certs-upc-master/data/` en el Explorador de Archivos
2. Arrastra tu archivo Excel a esa carpeta
3. Ejecuta los scripts

## 📊 Formato Requerido del Excel

Tu archivo Excel debe tener estas columnas (los nombres pueden variar):

| nombre | apellido | reconocimiento | genero | motivo |
|--------|----------|----------------|--------|--------|
| Juan | Pérez | Por ser un Embajador UPC | Masculino | Deportista destacado |
| María | García | Por ser una Embajadora UPC | Femenino | Deportista destacada |

### Columnas Opcionales:
- `dni` o `DNI`
- `fecha_emision` o `Fecha de Emisión`

## 🚀 Pasos Rápidos

1. **Prepara tu Excel** con las columnas requeridas
2. **Colócalo** en `e-certs-upc-master/data/datos.xlsx`
3. **Abre terminal** en la carpeta `scripts`
4. **Ejecuta:**
   ```bash
   npm install
   npm run all
   ```
5. **Revisa los resultados** en `e-certs-upc-master/output/`

## 📁 Archivos Generados

Después de ejecutar los scripts encontrarás:

- `data/certificados.json` - Datos en formato MongoDB
- `output/certificados/[id].html` - Certificados individuales
- `output/tabla-certificados.html` - Tabla con todos los usuarios y URLs

## ❓ ¿Problemas?

Si tienes problemas:
1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que el Excel tenga las columnas correctas
3. Verifica que el archivo no esté abierto en Excel mientras ejecutas el script

