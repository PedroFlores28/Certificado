# 🚀 Guía para Desplegar en Vercel

## ⚠️ Problemas Comunes y Soluciones

### 1. Variables de Entorno NO Configuradas

**Problema:** MongoDB no se conecta porque falta `MONGODB_URI`

**Solución:**
1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega:
   - **Name:** `MONGODB_URI`
   - **Value:** Tu cadena de conexión de MongoDB
     - Para MongoDB Atlas: `mongodb+srv://usuario:password@cluster.mongodb.net/`
     - Para MongoDB local: NO funcionará (necesitas MongoDB Atlas)
5. Selecciona todos los ambientes: **Production**, **Preview**, **Development**
6. Haz clic en **Save**
7. **REDESPLIEGA** tu proyecto (Settings → Deployments → Redeploy)

### 2. MongoDB Local NO Funciona en Vercel

**Problema:** `mongodb://localhost:27017` no funciona en Vercel porque es un servidor en la nube

**Solución:** Usa **MongoDB Atlas** (gratis):
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster gratuito
4. Obtén tu cadena de conexión
5. Agrega tu IP a la lista blanca (o permite todas: `0.0.0.0/0`)
6. Usa esa cadena en Vercel como `MONGODB_URI`

### 3. Base de Datos Vacía

**Problema:** La base de datos no tiene datos

**Solución:**
1. Importa tus datos a MongoDB Atlas usando MongoDB Compass
2. O usa el script de importación desde tu computadora local

### 4. Build Fails (Error de Compilación)

**Problema:** El proyecto no compila en Vercel

**Soluciones:**
- Verifica que `package.json` tenga todas las dependencias
- Verifica que no haya errores de TypeScript
- Revisa los logs de build en Vercel

## 📋 Pasos para Desplegar Correctamente

### Paso 1: Preparar MongoDB Atlas

1. **Crea cuenta en MongoDB Atlas:**
   - https://www.mongodb.com/cloud/atlas/register

2. **Crea un cluster gratuito:**
   - Elige la opción FREE (M0)
   - Selecciona una región cercana

3. **Configura seguridad:**
   - **Database Access:** Crea un usuario y contraseña
   - **Network Access:** Agrega `0.0.0.0/0` para permitir todas las IPs

4. **Obtén la cadena de conexión:**
   - Click en **Connect** → **Connect your application**
   - Copia la cadena (ejemplo: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/`)
   - Reemplaza `<password>` con tu contraseña real

### Paso 2: Importar Datos a MongoDB Atlas

1. **Usa MongoDB Compass:**
   - Conéctate a tu cluster de Atlas usando la cadena de conexión
   - Crea la base de datos `upc_certificados`
   - Crea la colección `certificados`
   - Importa el archivo `data/certificados.json`

2. **O usa mongoimport:**
   ```bash
   mongoimport --uri "mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/upc_certificados" --collection certificados --file data/certificados.json --jsonArray
   ```

### Paso 3: Configurar Vercel

1. **Conecta tu repositorio GitHub:**
   - Ve a https://vercel.com/new
   - Importa tu repositorio: `PedroFlores28/Certificado`
   - Selecciona la carpeta: `v0-certificado`

2. **Configura el proyecto:**
   - **Framework Preset:** Next.js (debería detectarlo automáticamente)
   - **Root Directory:** `v0-certificado`
   - **Build Command:** `npm run build` (o déjalo vacío, Vercel lo detecta)
   - **Output Directory:** `.next` (o déjalo vacío)

3. **Agrega Variables de Entorno:**
   - **MONGODB_URI:** `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/`
   - ⚠️ **IMPORTANTE:** Reemplaza `usuario`, `password` y `cluster0.xxxxx` con tus valores reales

4. **Despliega:**
   - Haz clic en **Deploy**
   - Espera a que termine el build

### Paso 4: Verificar el Despliegue

1. **Visita tu URL de Vercel:**
   - Ejemplo: `https://certificado.vercel.app`

2. **Prueba un certificado:**
   ```
   https://tu-proyecto.vercel.app/certificado/c6e805fa-5f9c-4050-9142-f0271469891b
   ```

## 🔧 Configuración Adicional

### Si tu proyecto está en una subcarpeta:

En Vercel, configura:
- **Root Directory:** `v0-certificado`

### Si necesitas cambiar el nombre de la base de datos:

Edita `lib/mongodb.ts`:
```typescript
return client.db('tu-nombre-de-base-de-datos')
```

### Si necesitas cambiar el nombre de la colección:

Edita `lib/certificates.ts`:
```typescript
const collection = db.collection<CertificateData>('tu-nombre-de-coleccion')
```

## 🐛 Debugging

### Ver logs en Vercel:
1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Click en el deployment más reciente
4. Ve a la pestaña **Functions** o **Logs**

### Errores comunes:

**Error: "MONGODB_URI is not defined"**
- Verifica que agregaste la variable en Vercel
- Verifica que seleccionaste todos los ambientes
- Redespliega el proyecto

**Error: "Cannot connect to MongoDB"**
- Verifica que tu IP esté en la lista blanca de MongoDB Atlas
- Verifica que la cadena de conexión sea correcta
- Verifica que el usuario y contraseña sean correctos

**Error: "Database not found"**
- Verifica que la base de datos existe en MongoDB Atlas
- Verifica que tiene datos
- Verifica el nombre en `lib/mongodb.ts`

## ✅ Checklist Pre-Deploy

- [ ] MongoDB Atlas configurado y funcionando
- [ ] Datos importados a MongoDB Atlas
- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto compila sin errores localmente (`npm run build`)
- [ ] Repositorio GitHub actualizado
- [ ] Root Directory configurado en Vercel (si es necesario)

## 🎯 Después del Deploy

Una vez desplegado, puedes:
1. Compartir URLs de certificados públicamente
2. Verificar certificados desde cualquier lugar
3. Integrar con otras aplicaciones

¡Tu sistema estará disponible 24/7 en la nube! 🚀

