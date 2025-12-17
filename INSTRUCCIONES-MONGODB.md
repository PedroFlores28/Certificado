# 📊 Guía para Importar Datos a MongoDB usando Compass

## 🎯 Paso 1: Conectar a tu Base de Datos

1. **En MongoDB Compass**, haz clic en el botón verde **"Add new connection"** o selecciona una conexión existente.

2. **Si es una conexión local:**
   - Usa: `mongodb://localhost:27017`
   - O simplemente selecciona `localhost:27017` de tu lista de conexiones

3. **Si es MongoDB Atlas (nube):**
   - Usa la cadena de conexión que te proporcionó MongoDB Atlas
   - Formato: `mongodb+srv://usuario:password@cluster.mongodb.net/`

4. Haz clic en **"Connect"**

## 📁 Paso 2: Crear la Base de Datos y Colección

1. Una vez conectado, verás la lista de bases de datos.

2. **Crear nueva base de datos:**
   - Haz clic en el botón **"+"** o **"Create Database"**
   - **Nombre de la base de datos:** `upc_certificados` (o el nombre que prefieras)
   - **Nombre de la colección:** `certificados`
   - Haz clic en **"Create Database"**

## 📥 Paso 3: Importar el Archivo JSON

### Opción A: Usando la Interfaz de Compass (Recomendado)

1. **Selecciona la colección** `certificados` que acabas de crear

2. Haz clic en el botón **"ADD DATA"** (arriba a la derecha)

3. Selecciona **"Import File"**

4. **Selecciona el archivo:**
   - Navega a: `C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\data\certificados.json`

5. **Configuración de importación:**
   - **Input File Type:** Selecciona `JSON` o `JSON Array`
   - **Import Mode:** Selecciona `Insert documents` (para agregar nuevos) o `Replace documents` (para reemplazar)
   - Verifica que detecte los campos correctamente

6. Haz clic en **"Import"**

7. Espera a que termine la importación. Deberías ver un mensaje como:
   ```
   ✅ Successfully imported 872 documents
   ```

### Opción B: Usando la Línea de Comandos (mongoimport)

Si prefieres usar la terminal:

```powershell
# Navega a la carpeta del proyecto
cd "C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master"

# Importa el archivo
mongoimport --db upc_certificados --collection certificados --file data/certificados.json --jsonArray
```

**Nota:** Asegúrate de que MongoDB esté corriendo y que `mongoimport` esté en tu PATH.

## ✅ Paso 4: Verificar la Importación

1. En MongoDB Compass, selecciona la colección `certificados`

2. Deberías ver **872 documentos** en la colección

3. Haz clic en cualquier documento para ver su contenido

4. Puedes usar la barra de búsqueda para buscar por:
   - Nombre completo
   - ID UPC
   - Correo
   - Motivo del certificado

## 🔍 Ejemplo de Consulta

Para buscar un certificado específico, puedes usar el filtro en Compass:

```json
{
  "nombre_completo": "Francisco Armando Lazo Aponte"
}
```

O buscar por ID UPC:

```json
{
  "id_upc": 201817361
}
```

## 📋 Estructura de los Documentos

Cada documento tiene esta estructura:

```json
{
  "_id": "uuid-único",
  "id": "uuid-único",
  "id_upc": 201817361,
  "correo": "u201817361@upc.edu.pe",
  "nombre": "Francisco Armando",
  "apellido": "Lazo Aponte",
  "nombre_completo": "Francisco Armando Lazo Aponte",
  "reconocimiento": "UN EMBAJADOR UPC",
  "genero": "Masculino",
  "motivo": "INTEGRANTE DEL ELENCO DE MUSICA PERUANA",
  "motivo_emision": "INTEGRANTE DEL ELENCO DE MUSICA PERUANA",
  "fecha_emision": "diciembre de 2025",
  "dni": 201817361,
  "url_slug": "francisco-armando-lazo-aponte-c6e805fa",
  "url": "/certificado/c6e805fa-5f9c-4050-9142-f0271469891b",
  "status": "activo",
  "fecha_creacion": "2025-12-17T23:16:47.258Z",
  "fecha_actualizacion": "2025-12-17T23:16:47.258Z"
}
```

## 🚨 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Revisa que la cadena de conexión sea correcta
- Si es local, asegúrate de que el servicio de MongoDB esté iniciado

### Error: "File not found"
- Verifica la ruta del archivo: `data/certificados.json`
- Asegúrate de que el archivo existe

### Error: "Invalid JSON"
- El archivo ya está en formato JSON válido
- Si hay problemas, verifica que el archivo no esté corrupto

### La importación es muy lenta
- Es normal con 872 documentos
- Puede tomar unos minutos dependiendo de tu conexión y hardware

## 📞 Siguiente Paso

Una vez importados los datos, puedes:
1. Integrar MongoDB con tu aplicación Next.js
2. Crear APIs para buscar certificados por URL
3. Conectar los certificados HTML con la base de datos

¿Necesitas ayuda con algún paso específico?

