# 🔧 Configuración de MongoDB para Next.js

## 📋 Paso 1: Instalar Dependencias

Ejecuta este comando en la carpeta `v0-certificado`:

```bash
cd v0-certificado
npm install
```

Esto instalará el driver de MongoDB (`mongodb`) que acabamos de agregar.

## 🔐 Paso 2: Configurar la Conexión a MongoDB

1. **Crea un archivo `.env.local`** en la carpeta `v0-certificado`:

   ```bash
   # En Windows PowerShell:
   cd v0-certificado
   New-Item -Path .env.local -ItemType File
   ```

2. **Abre el archivo `.env.local`** y agrega tu cadena de conexión:

   ### Para MongoDB Local (si MongoDB está corriendo en tu computadora):
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```

   ### Para MongoDB Atlas (nube):
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/
   ```
   *(Reemplaza `usuario`, `password` y `cluster` con tus datos reales)*

   ### Si tu MongoDB local tiene autenticación:
   ```
   MONGODB_URI=mongodb://usuario:password@localhost:27017/upc_certificados
   ```

## ✅ Paso 3: Verificar la Conexión

1. **Asegúrate de que MongoDB esté corriendo:**
   - Si es local, verifica que el servicio de MongoDB esté iniciado
   - Si es Atlas, verifica que tu IP esté en la lista blanca

2. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Prueba accediendo a un certificado:**
   - Abre: `http://localhost:3000/certificado/[algún-id-de-tu-base-de-datos]`
   - Por ejemplo, usa uno de los IDs que viste en MongoDB Compass

## 🧪 Probar con un Certificado Real

Para probar, puedes usar uno de los IDs de los certificados que importaste:

1. Abre MongoDB Compass
2. Selecciona la base de datos `upc_certificados`
3. Selecciona la colección `certificados`
4. Copia el valor del campo `id` de cualquier documento
5. Visita: `http://localhost:3000/certificado/[id-copiado]`

## 🐛 Solución de Problemas

### Error: "MONGODB_URI is not defined"
- Verifica que el archivo `.env.local` exista en la carpeta `v0-certificado`
- Verifica que la variable se llame exactamente `MONGODB_URI`
- Reinicia el servidor de desarrollo después de crear/modificar `.env.local`

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo (si es local)
- Verifica que la cadena de conexión sea correcta
- Si es Atlas, verifica que tu IP esté en la lista blanca

### Error: "Database not found"
- Verifica que la base de datos se llame `upc_certificados`
- Verifica que la colección se llame `certificados`
- Puedes cambiar estos nombres en `lib/mongodb.ts` y `lib/certificates.ts` si es necesario

## 📝 Notas Importantes

- El archivo `.env.local` NO debe subirse a Git (ya está en `.gitignore`)
- La conexión se reutiliza en desarrollo para mejor rendimiento
- En producción, cada request crea una nueva conexión

## 🚀 Siguiente Paso

Una vez configurado, tu aplicación Next.js buscará los certificados directamente en MongoDB cuando alguien visite una URL como:
```
http://localhost:3000/certificado/[uuid-del-certificado]
```

¡Listo! Tu aplicación ahora está conectada a MongoDB. 🎉

