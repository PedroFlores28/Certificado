# 🔧 Solución al Error 404 en Vercel

## ⚠️ Problema

Vercel muestra "404: NOT_FOUND" porque **NO está configurado el Root Directory**.

## ✅ Solución INMEDIATA

### Opción 1: Configurar Root Directory en Vercel (RECOMENDADO)

1. **Ve a tu proyecto en Vercel:**
   - https://vercel.com/dashboard
   - Selecciona tu proyecto

2. **Ve a Settings → General**

3. **Busca "Root Directory"**

4. **Configura:**
   - Click en "Edit"
   - Escribe: `v0-certificado`
   - Click "Save"

5. **REDESPLIEGA:**
   - Ve a "Deployments"
   - Click en los 3 puntos del último deployment
   - Click "Redeploy"

### Opción 2: Mover el proyecto a la raíz (ALTERNATIVA)

Si prefieres tener el proyecto en la raíz del repositorio:

1. Mueve todos los archivos de `v0-certificado/` a la raíz
2. Actualiza las rutas si es necesario
3. Redespliega en Vercel

## 🎯 Configuración Correcta en Vercel

Cuando importes o configures el proyecto, asegúrate de:

```
Framework Preset: Next.js
Root Directory: v0-certificado
Build Command: (vacío - Vercel lo detecta automáticamente)
Output Directory: (vacío - Vercel lo detecta automáticamente)
Install Command: (vacío - Vercel lo detecta automáticamente)
```

## ✅ Verificar que Funciona

Después de configurar el Root Directory y redesplegar:

1. Espera a que termine el build (2-3 minutos)
2. Visita tu URL de Vercel
3. Deberías ver la página principal con:
   - Logo UPC
   - "Sistema de Certificados Digitales"
   - Botones de navegación

## 🐛 Si Aún No Funciona

### Verifica los Logs de Build:

1. Ve a **Deployments**
2. Click en el deployment más reciente
3. Ve a la pestaña **Build Logs**
4. Busca errores como:
   - "Cannot find package.json"
   - "Root directory not found"
   - "Build failed"

### Errores Comunes:

**"Cannot find package.json"**
- Verifica que configuraste `Root Directory: v0-certificado`
- Verifica que el archivo existe en GitHub

**"Build failed"**
- Revisa los logs completos
- Verifica que todas las dependencias estén en `package.json`

## 📋 Checklist

- [ ] Root Directory configurado: `v0-certificado`
- [ ] Variable `MONGODB_URI` configurada (con MongoDB Atlas)
- [ ] Proyecto redesplegado después de cambiar configuración
- [ ] Build completó sin errores

## 🚀 Después de Configurar

Una vez que el Root Directory esté configurado correctamente:
- Vercel encontrará `package.json` en `v0-certificado/`
- Compilará el proyecto Next.js correctamente
- Desplegará la aplicación funcionando

¡Configura el Root Directory y redespliega! 🎉

