# 🧪 Cómo Probar tu Sistema de Certificados

## ✅ Paso 1: Verificar que MongoDB esté Corriendo

### Opción A: Usando MongoDB Compass (Más Fácil)

1. **Abre MongoDB Compass**
2. **Conéctate** a `localhost:27017` (o tu conexión guardada)
3. **Verifica** que puedas ver la base de datos `upc_certificados`
4. **Abre** la colección `certificados`
5. **Deberías ver** 872 documentos

✅ **Si puedes ver los datos, MongoDB está funcionando correctamente.**

### Opción B: Usando la Terminal

```powershell
# Verificar que MongoDB esté corriendo
mongosh --eval "db.adminCommand('ping')"
```

Si ves `{ ok: 1 }`, MongoDB está corriendo.

---

## ✅ Paso 2: Verificar que Next.js esté Corriendo

1. **Abre una terminal** en la carpeta `v0-certificado`
2. **Ejecuta:**
   ```bash
   npm run dev
   ```
3. **Deberías ver:**
   ```
   ▲ Next.js 16.0.10
   - Local:        http://localhost:3000
   - Ready in X seconds
   ```

✅ **Si ves esto, Next.js está funcionando.**

---

## ✅ Paso 3: Obtener un ID de Certificado Real

### Opción A: Desde MongoDB Compass

1. Abre MongoDB Compass
2. Ve a `upc_certificados` → `certificados`
3. Haz clic en cualquier documento
4. Busca el campo `id` (es un UUID largo)
5. **Copia ese ID completo**

Ejemplo de ID:
```
c6e805fa-5f9c-4050-9142-f0271469891b
```

### Opción B: Desde el Archivo JSON

1. Abre: `data/certificados.json`
2. Busca cualquier objeto
3. Copia el valor del campo `"id"`

---

## ✅ Paso 4: Probar en el Navegador

1. **Abre tu navegador** (Chrome, Firefox, Edge, etc.)

2. **Ve a esta URL** (reemplaza `[ID]` con el ID que copiaste):
   ```
   http://localhost:3000/certificado/[ID]
   ```

   **Ejemplo con un ID real:**
   ```
   http://localhost:3000/certificado/c6e805fa-5f9c-4050-9142-f0271469891b
   ```

3. **¿Qué deberías ver?**
   - ✅ Un certificado bonito con el nombre del estudiante
   - ✅ El motivo del certificado
   - ✅ La fecha de emisión
   - ✅ Información de verificación

---

## ✅ Paso 5: Probar con Diferentes Certificados

Prueba con varios IDs diferentes para asegurarte de que todos funcionan:

1. **Certificado 1:** `c6e805fa-5f9c-4050-9142-f0271469891b`
   - Nombre: Francisco Armando Lazo Aponte
   
2. **Certificado 2:** `0ec37044-7d1c-46d9-bf01-e359d7358c9d`
   - Nombre: César Alonso Herencia Huamán

3. **Certificado 3:** (cualquier otro ID de tu base de datos)

---

## ❌ Qué Hacer si Algo No Funciona

### Error: "Cannot connect to MongoDB"

**Solución:**
1. Verifica que MongoDB esté corriendo
2. Abre MongoDB Compass y prueba conectarte
3. Si no puedes, inicia el servicio de MongoDB

**En Windows:**
```powershell
# Buscar el servicio de MongoDB
Get-Service | Where-Object {$_.Name -like "*mongo*"}

# Iniciar el servicio (si está detenido)
Start-Service MongoDB
```

### Error: "MONGODB_URI is not defined"

**Solución:**
1. Verifica que el archivo `.env.local` exista en `v0-certificado/`
2. Abre el archivo y verifica que tenga:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```
3. **Reinicia el servidor Next.js** (Ctrl+C y luego `npm run dev`)

### Error: "Certificado no encontrado" o Página 404

**Solución:**
1. Verifica que el ID que estás usando sea correcto
2. Copia el ID directamente desde MongoDB Compass
3. Asegúrate de que el certificado tenga `status: "activo"`

### Error: "Database not found"

**Solución:**
1. Verifica que la base de datos se llame exactamente `upc_certificados`
2. Verifica que la colección se llame exactamente `certificados`
3. Si tienen otros nombres, actualiza `lib/mongodb.ts` y `lib/certificates.ts`

---

## 🎯 Prueba Rápida (Todo en Uno)

Ejecuta estos comandos en orden:

```powershell
# 1. Verificar MongoDB
mongosh --eval "db.adminCommand('ping')"

# 2. Ir a la carpeta del proyecto
cd "C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\v0-certificado"

# 3. Verificar que .env.local existe
Get-Content .env.local

# 4. Iniciar el servidor
npm run dev
```

Luego abre en el navegador:
```
http://localhost:3000/certificado/c6e805fa-5f9c-4050-9142-f0271469891b
```

---

## 📋 Checklist de Pruebas

- [ ] MongoDB está corriendo
- [ ] Puedo ver los datos en MongoDB Compass
- [ ] El archivo `.env.local` existe y tiene `MONGODB_URI`
- [ ] Next.js está corriendo en `http://localhost:3000`
- [ ] Puedo ver un certificado cuando visito una URL con un ID válido
- [ ] El certificado muestra el nombre correcto
- [ ] El certificado muestra el motivo correcto
- [ ] Puedo probar con diferentes IDs y todos funcionan

---

## 🎉 ¡Listo!

Si todas las pruebas pasan, tu sistema está funcionando correctamente. Ahora puedes:

1. **Compartir URLs** de certificados con los estudiantes
2. **Verificar certificados** usando los IDs únicos
3. **Agregar más certificados** importando nuevos datos a MongoDB

