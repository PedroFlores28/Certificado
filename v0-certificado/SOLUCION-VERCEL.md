# 🔧 Solución Rápida para Vercel

## ⚠️ Problema Principal

Cuando subes a Vercel, probablemente NO funciona porque:

1. ❌ **Falta la variable de entorno `MONGODB_URI`**
2. ❌ **MongoDB local (`localhost:27017`) NO funciona en Vercel**
3. ❌ **Vercel no sabe que el proyecto está en la carpeta `v0-certificado`**

## ✅ Solución Paso a Paso

### Paso 1: Configurar MongoDB Atlas (OBLIGATORIO)

Vercel NO puede conectarse a MongoDB local. Necesitas MongoDB Atlas:

1. **Ve a:** https://www.mongodb.com/cloud/atlas/register
2. **Crea cuenta gratuita**
3. **Crea un cluster FREE (M0)**
4. **Configura seguridad:**
   - Database Access: Crea usuario y contraseña
   - Network Access: Agrega `0.0.0.0/0` (permite todas las IPs)
5. **Obtén tu cadena de conexión:**
   - Click en "Connect" → "Connect your application"
   - Copia la cadena (ejemplo: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/`)
   - Reemplaza `<password>` con tu contraseña real

### Paso 2: Importar Datos a MongoDB Atlas

1. **Abre MongoDB Compass**
2. **Conéctate** usando tu cadena de conexión de Atlas
3. **Crea base de datos:** `upc_certificados`
4. **Crea colección:** `certificados`
5. **Importa:** `data/certificados.json`

### Paso 3: Configurar Vercel

1. **Ve a:** https://vercel.com/dashboard
2. **Selecciona tu proyecto** o crea uno nuevo
3. **Importa desde GitHub:** `PedroFlores28/Certificado`

4. **Configuración IMPORTANTE:**
   - **Root Directory:** `v0-certificado` ⚠️ ESTO ES CRÍTICO
   - **Framework Preset:** Next.js
   - **Build Command:** (déjalo vacío, Vercel lo detecta)
   - **Output Directory:** (déjalo vacío)

5. **Variables de Entorno:**
   - Ve a **Settings** → **Environment Variables**
   - Agrega:
     - **Name:** `MONGODB_URI`
     - **Value:** Tu cadena de MongoDB Atlas (ejemplo: `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/`)
     - **Environments:** Selecciona TODOS (Production, Preview, Development)
   - Click **Save**

6. **REDESPLIEGA:**
   - Ve a **Deployments**
   - Click en los 3 puntos del último deployment
   - Click **Redeploy**

## 🎯 Configuración Rápida en Vercel

Cuando importes el proyecto, asegúrate de configurar:

```
Root Directory: v0-certificado
```

Si NO configuras esto, Vercel buscará en la raíz y no encontrará `package.json`.

## ✅ Verificar que Funciona

Después de redesplegar:

1. Visita tu URL de Vercel (ejemplo: `https://certificado.vercel.app`)
2. Deberías ver la página principal con el diseño completo
3. Prueba un certificado:
   ```
   https://tu-proyecto.vercel.app/certificado/c6e805fa-5f9c-4050-9142-f0271469891b
   ```

## 🐛 Si Aún No Funciona

### Verifica los Logs:

1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Click en el deployment más reciente
4. Ve a la pestaña **Logs**
5. Busca errores como:
   - "MONGODB_URI is not defined"
   - "Cannot connect to MongoDB"
   - "Build failed"

### Errores Comunes:

**Error: "Root Directory not found"**
- Verifica que configuraste `Root Directory: v0-certificado`

**Error: "MONGODB_URI is not defined"**
- Verifica que agregaste la variable en Vercel
- Verifica que seleccionaste todos los ambientes
- Redespliega

**Error: "Cannot connect to MongoDB"**
- Verifica que estás usando MongoDB Atlas (NO localhost)
- Verifica que tu IP está en la lista blanca (o usa `0.0.0.0/0`)
- Verifica que la cadena de conexión es correcta

## 📋 Checklist Final

- [ ] MongoDB Atlas configurado
- [ ] Datos importados a MongoDB Atlas
- [ ] Root Directory configurado en Vercel: `v0-certificado`
- [ ] Variable `MONGODB_URI` agregada en Vercel
- [ ] Variable configurada para todos los ambientes
- [ ] Proyecto redesplegado

## 🚀 Después de Configurar

Una vez que todo esté configurado:
- Tu sitio estará disponible 24/7
- Los certificados funcionarán desde cualquier lugar
- Puedes compartir URLs públicas

¡Sigue estos pasos y debería funcionar! 🎉

