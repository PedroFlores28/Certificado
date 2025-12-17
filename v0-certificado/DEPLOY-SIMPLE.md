# 🚀 Desplegar en Vercel - Versión Sencilla (SIN MongoDB)

## ✅ Solución Simplificada

Ahora puedes desplegar **SIN configurar MongoDB Atlas**. El sistema usa un archivo JSON estático.

---

## 📋 Pasos Súper Sencillos

### Paso 1: Copiar el archivo JSON

El archivo `certificados.json` ya debe estar en `v0-certificado/public/data/`

Si no está, cópialo:
```bash
# Desde la raíz del proyecto
cp data/certificados.json v0-certificado/public/data/certificados.json
```

### Paso 2: Subir a GitHub

```bash
cd v0-certificado
git add public/data/certificados.json
git commit -m "Agregar datos de certificados"
git push
```

### Paso 3: Desplegar en Vercel

1. Ve a: https://vercel.com
2. Importa tu repositorio de GitHub
3. **NO necesitas configurar variables de entorno** (ya no usa MongoDB)
4. Haz clic en "Deploy"

¡Eso es todo! 🎉

---

## ✅ Ventajas de esta Versión

- ✅ **No necesitas MongoDB Atlas**
- ✅ **No necesitas configurar variables de entorno**
- ✅ **Más rápido de desplegar**
- ✅ **Funciona inmediatamente**

---

## ⚠️ Limitaciones

- Los datos están en un archivo estático (no se pueden actualizar sin redesplegar)
- Para actualizar certificados, necesitas:
  1. Actualizar el JSON
  2. Hacer commit y push
  3. Vercel se actualizará automáticamente

---

## 🔄 Actualizar Certificados

Cuando tengas nuevos certificados:

1. Ejecuta los scripts para generar `data/certificados.json`
2. Copia el archivo a `v0-certificado/public/data/certificados.json`
3. Haz commit y push:
   ```bash
   git add v0-certificado/public/data/certificados.json
   git commit -m "Actualizar certificados"
   git push
   ```
4. Vercel se actualizará automáticamente

---

## 🎯 ¡Listo!

Tu aplicación funcionará en Vercel sin necesidad de configurar MongoDB. 

Prueba con:
```
https://tu-proyecto.vercel.app/certificado/c6e805fa-5f9c-4050-9142-f0271469891b
```

