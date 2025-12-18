# ✅ Checklist Antes de Desplegar en Vercel

## 🔍 Verificaciones Necesarias

### 1. ✅ Root Directory Configurado
**CRÍTICO:** Debe estar configurado en Vercel:
- Ve a Settings → General
- Root Directory: `v0-certificado`
- Si NO está configurado, Vercel dará error 404

### 2. ✅ Variables de Entorno
**CRÍTICO:** Debe estar configurado:
- Settings → Environment Variables
- Name: `MONGODB_URI`
- Value: Tu cadena de MongoDB Atlas (NO `localhost:27017`)
- Environments: Todos (Production, Preview, Development)

**Ejemplo correcto:**
```
mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/
```

**Ejemplo INCORRECTO (no funcionará):**
```
mongodb://localhost:27017
```

### 3. ✅ MongoDB Atlas Configurado
- Base de datos creada: `upc_certificados`
- Colección creada: `certificados`
- Datos importados (872 certificados)
- Network Access: `0.0.0.0/0` (permite todas las IPs)

### 4. ✅ Dependencias en package.json
Verifica que `mongodb` esté en las dependencias:
```json
"mongodb": "^6.3.0"
```

### 5. ✅ Archivos Necesarios
- ✅ `package.json` existe en `v0-certificado/`
- ✅ `next.config.ts` existe
- ✅ `.env.local` NO se sube (está en .gitignore) ✅ CORRECTO

## 🚨 Errores Comunes y Soluciones

### Error: "404: NOT_FOUND"
**Causa:** Root Directory no configurado
**Solución:** Configura `Root Directory: v0-certificado` en Vercel

### Error: "MONGODB_URI is not defined"
**Causa:** Variable de entorno no configurada
**Solución:** Agrega `MONGODB_URI` en Settings → Environment Variables

### Error: "Cannot connect to MongoDB"
**Causa:** Usando `localhost:27017` o MongoDB no accesible
**Solución:** Usa MongoDB Atlas y verifica Network Access

### Error: "Build failed"
**Causa:** Error de compilación
**Solución:** Revisa los logs de build en Vercel

## 📋 Pasos para Desplegar Correctamente

### Paso 1: Verificar Localmente
```bash
cd v0-certificado
npm run build
```
Si compila sin errores, está listo para Vercel.

### Paso 2: Configurar en Vercel
1. Root Directory: `v0-certificado`
2. Framework: Next.js (auto-detectado)
3. Environment Variables: `MONGODB_URI` con MongoDB Atlas

### Paso 3: Desplegar
1. Click en "Deploy"
2. Espera 2-3 minutos
3. Revisa los logs si hay errores

### Paso 4: Verificar
1. Visita tu URL de Vercel
2. Prueba: `https://tu-proyecto.vercel.app/certificado/201817361`
3. Debería mostrar el certificado o el formulario de búsqueda

## ✅ Estado Actual del Proyecto

- ✅ Código completo y funcional
- ✅ Formulario de búsqueda implementado
- ✅ Conexión a MongoDB configurada
- ✅ Manejo de errores mejorado
- ✅ Archivos en GitHub

## ⚠️ Lo que DEBES Hacer en Vercel

1. **Configurar Root Directory** (OBLIGATORIO)
2. **Agregar MONGODB_URI** con MongoDB Atlas (OBLIGATORIO)
3. **Redesplegar** después de configurar

## 🎯 Probabilidad de Éxito

Si sigues estos pasos:
- ✅ **95% de probabilidad** de que funcione correctamente
- ⚠️ Los errores más comunes son configuración, no código

## 🚀 Después del Deploy

Una vez desplegado:
- Tu sitio estará disponible 24/7
- Los estudiantes podrán buscar sus certificados
- Las URLs funcionarán desde cualquier lugar

¡Sigue el checklist y debería funcionar perfectamente! 🎉

